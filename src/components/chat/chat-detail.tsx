import { useState } from 'react';
import { useMessages } from '@/hooks/use-messages';
import { useChatSearch } from '@/hooks/use-chat-search';
import { ChatDetailSkeleton } from './chat-detail-skeleton';
import { usePinProtection } from '@/hooks/use-pin-protection';
import { PinInputModal } from './pin-protection/pin-input-modal';
import { Lock } from 'lucide-react';
import { ChatSearch } from './chat-search';
import { MessageList } from './message-list/message-list';
import { ChatHeader } from './chat-header';
import { ChatInfoSidebar } from './chat-info-sidebar';
import { ChatMetricsModal } from '../metrics';
import { useParticipant } from '@/hooks/use-participant';
import { useFavorites } from '@/hooks/use-favorites';

interface ChatDetailProps {
  participantId: string;
}

export function ChatDetail({ participantId }: ChatDetailProps) {
  const [showMetrics, setShowMetrics] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  
  const { data: participant, isLoading: isLoadingParticipant } = useParticipant(participantId);
  const { data: favorites = [] } = useFavorites();
  const isFavorite = favorites.includes(participantId);

  const {
    data: messages,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useMessages(participantId);

  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading: isSearching,
  } = useChatSearch(participantId);

  const { isProtected, isVerified, verifyPin, remainingAttempts, error } =
    usePinProtection(participantId);

  if (isLoading || isLoadingParticipant) return <ChatDetailSkeleton />;
  if (!participant) return null;

  if (isProtected && !isVerified) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gray-950 text-gray-400 space-y-4">
        <Lock className="w-12 h-12" />
        <p className="text-lg">This chat is PIN protected</p>
        <button
          onClick={() => setShowPinModal(true)}
          className="px-4 py-2 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Enter PIN to view
        </button>
        {showPinModal && (
          <PinInputModal
            title="Enter PIN Code"
            onSubmit={verifyPin}
            onCancel={() => setShowPinModal(false)}
            error={error ?? undefined}
            remainingAttempts={remainingAttempts}
          />
        )}
      </div>
    );
  }

  const displayMessages = searchQuery ? searchResults : messages?.pages.flat() ?? [];

  return (
    <div className="h-full flex flex-col bg-gray-950 relative">
      <ChatHeader
        name={participant.name}
        avatarUrl={participant.avatar_url}
        lastActive={participant.last_active}
        onOpenInfo={() => setShowInfo(true)}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        isSearching={isSearching}
      />

      <div className="flex-1 overflow-hidden">
        <MessageList
          messages={displayMessages}
          participantName={participant.name}
          hasNextPage={hasNextPage}
          isLoading={isLoading}
          fetchNextPage={fetchNextPage}
          searchQuery={searchQuery}
        />
      </div>

      {showInfo && (
        <ChatInfoSidebar
          chatId={participantId}
          name={participant.name}
          avatarUrl={participant.avatar_url}
          lastActive={participant.last_active}
          messageCount={displayMessages.length}
          isFavorite={isFavorite}
          onClose={() => setShowInfo(false)}
          onShowMetrics={() => setShowMetrics(true)}
          onSetPin={() => setShowPinModal(true)}
        />
      )}

      {showMetrics && (
        <ChatMetricsModal
          chatId={participantId}
          chatName={participant.name}
          onClose={() => setShowMetrics(false)}
        />
      )}

      {showPinModal && (
        <PinInputModal
          title={isProtected ? "Change PIN Code" : "Set PIN Code"}
          onSubmit={verifyPin}
          onCancel={() => setShowPinModal(false)}
          error={error ?? undefined}
          confirmPin
        />
      )}
    </div>
  );
}