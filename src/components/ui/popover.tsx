import { useAppearance } from '@/stores/appearance';
import { cn } from '@/lib/utils';
import { GlassPanel } from './glass-panel';

interface PopoverProps {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

export function Popover({ children, className, onClose }: PopoverProps) {
  const { animations } = useAppearance();

  return (
    <>
      {/* Backdrop */}
      {onClose && (
        <div
          className="fixed inset-0 z-40"
          onClick={onClose}
        />
      )}

      {/* Content */}
      <GlassPanel
        className={cn(
          "z-50",
          animations && "animate-in fade-in slide-in-from-top-1 duration-200",
          className
        )}
        intensity="low"
      >
        {children}
      </GlassPanel>
    </>
  );
}