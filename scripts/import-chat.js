/**
 * @fileoverview This script imports chat data from a JSON file into a Supabase database.
 * It creates a participant and imports their messages in batches.
 * 
 * @author Remco Stoeten
 */

const { readFileSync } = require('fs');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

/**
 * Initialize Supabase client
 * @type {import('@supabase/supabase-js').SupabaseClient}
 */
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

/** @constant {string} */
const REMCO_ID = '77777777-7777-7777-7777-777777777777';

/** @constant {number} */
const BATCH_SIZE = 1000;

/**
 * Imports chat data from a file for a specific participant
 * @async
 * @param {string} filename - The name of the JSON file containing chat data
 * @param {string} participantName - The name of the participant
 * @throws {Error} If the import process fails
 */
async function importChat(filename, participantName) {
  try {
    console.log(`Starting import for ${participantName} from ${filename}`);
    
    // Read and parse JSON file
    const chatData = JSON.parse(readFileSync(filename, 'utf-8'));
    console.log(`Loaded ${chatData.length} messages`);

    // Get last active timestamp
    const lastActive = new Date(
      Math.max(...chatData.map(m => new Date(m.timestamp).getTime()))
    ).toISOString();

    // Create participant
    const { data: participant, error: participantError } = await supabase
      .from('participants')
      .insert({
        name: participantName,
        last_active: lastActive
      })
      .select('id')
      .single();

    if (participantError) {
      throw new Error(`Failed to create participant: ${participantError.message}`);
    }

    console.log(`Created participant ${participantName} with ID: ${participant.id}`);

    // Import messages in batches
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < chatData.length; i += BATCH_SIZE) {
      const batch = chatData.slice(i, i + BATCH_SIZE);
      
      try {
        const { error: importError } = await supabase
          .rpc('import_chat_messages', {
            p_participant_id: participant.id,
            p_messages: batch
          });

        if (importError) {
          console.error(`Batch ${i / BATCH_SIZE + 1} failed:`, importError);
          errorCount += batch.length;
        } else {
          successCount += batch.length;
          console.log(`Progress: ${successCount}/${chatData.length} messages imported`);
        }
      } catch (error) {
        console.error(`Batch ${i / BATCH_SIZE + 1} failed:`, error);
        errorCount += batch.length;
      }

      // Small delay to prevent rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('\nImport Summary:');
    console.log(`Total messages: ${chatData.length}`);
    console.log(`Successfully imported: ${successCount}`);
    console.log(`Failed to import: ${errorCount}`);

  } catch (error) {
    console.error('Import failed:', error);
    process.exit(1);
  }
}

// Handle command line arguments
const [,, filename, name] = process.argv;

if (!filename || !name) {
  console.error('Usage: node import-chat.js <filename> <participant_name>');
  process.exit(1);
}

importChat(filename, name)
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });