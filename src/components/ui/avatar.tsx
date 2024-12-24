import { cn } from '@/lib/utils';
import { UserCircle } from 'lucide-react';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
}

export function Avatar({ src, alt, fallback, className }: AvatarProps) {
  if (!src) {
    return fallback ? (
      <div className={cn(
        'w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600',
        className
      )}>
        {fallback}
      </div>
    ) : (
      <UserCircle className={cn('w-10 h-10 text-gray-400', className)} />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn('w-10 h-10 rounded-full object-cover', className)}
    />
  );
}