import { MessageBubble } from '../message-bubble';
import { REMCO_ID } from '@/lib/constants';
import type { MessageGroup as MessageGroupType } from '@/types';

interface MessageGroupProps {
  group: MessageGroupType;
  participantName: string;
  searchQuery?: string;
  highlightedMessageId?: string;
}

export function MessageGroup({
  group,
  participantName,
  searchQuery,
  highlightedMessageId,
}: MessageGroupProps) {
  return (
    <div className="p-4">
      <div className="text-center text-sm text-gray-500 mb-4">
        {group.timestamp}
      </div>
      {group.messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          isOwn={message.senderId === REMCO_ID}
          participantName={participantName}
          isHighlighted={
            (searchQuery &&
              message.message.toLowerCase().includes(searchQuery.toLowerCase())) ||
            message.id === highlightedMessageId
          }
        />
      ))}
    </div>
  );
}