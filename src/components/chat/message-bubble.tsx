import { cn } from '@/lib/utils';
import { formatTime } from '@/lib/utils/date';
import { REMCO_ID } from '@/lib/constants';
import type { ChatMessage } from '@/types';

interface MessageBubbleProps {
  message: ChatMessage;
  isOwn: boolean;
  participantName: string;
  showSender?: boolean;
}

export function MessageBubble({
  message,
  isOwn,
  participantName,
  showSender = true,
}: MessageBubbleProps) {
  const senderName = message.senderId === REMCO_ID ? 'Remco' : participantName;

  return (
    <div
      className={cn(
        'flex flex-col mb-4',
        isOwn ? 'items-end' : 'items-start'
      )}
    >
      {showSender && !isOwn && (
        <span className="text-xs text-gray-400 ml-3 mb-1">{senderName}</span>
      )}

      <div
        className={cn(
          'max-w-[70%] rounded-2xl px-4 py-2 shadow-sm',
          isOwn
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-800 text-gray-100 rounded-bl-none'
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {message.message}
        </p>
      </div>

      <div
        className={cn(
          'flex items-center gap-1.5 mt-1',
          'text-[11px] text-gray-500',
          isOwn ? 'mr-2' : 'ml-2'
        )}
      >
        {isOwn && <span>{senderName}</span>}
        <time dateTime={message.timestamp}>
          {formatTime(message.timestamp)}
        </time>
      </div>
    </div>
  );
}