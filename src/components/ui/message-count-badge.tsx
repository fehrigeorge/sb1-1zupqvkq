import { cn } from '@/lib/utils';

interface MessageCountBadgeProps {
  count: number;
  className?: string;
}

export function MessageCountBadge({ count, className }: MessageCountBadgeProps) {
  if (count === 0) return null;

  const formatCount = (count: number): string => {
    if (count <= 999) return count.toString();
    return `${Math.floor(count / 1000)}k${count % 1000 >= 100 ? '+' : ''}`;
  };

  return (
    <div className={cn(
      "px-1.5 h-5 min-w-[1.25rem]",
      "flex items-center justify-center",
      "text-xs font-medium",
      "bg-blue-500/20 text-blue-400",
      "rounded-full",
      className
    )}>
      {formatCount(count)}
    </div>
  );
}