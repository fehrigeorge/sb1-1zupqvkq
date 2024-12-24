import { cn } from '@/lib/utils';
import { Avatar } from './avatar';
import { useAuth } from '@/lib/auth';

interface UserAvatarProps {
  className?: string;
}

export function UserAvatar({ className }: UserAvatarProps) {
  const { user } = useAuth();
  
  if (!user) return null;

  return (
    <div className="relative">
      <Avatar
        src={user.avatarUrl}
        alt={user.email}
        fallback={user.email[0].toUpperCase()}
        className={cn(
          className,
          user.isAdmin && "ring-2 ring-yellow-500/50 ring-offset-2 ring-offset-gray-950"
        )}
      />
      {user.isAdmin && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full border-2 border-gray-950" />
      )}
    </div>
  );
}