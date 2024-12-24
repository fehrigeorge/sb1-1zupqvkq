import { cn } from '@/lib/utils';

interface ModalBackdropProps {
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function ModalBackdrop({ onClose, children, className }: ModalBackdropProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Content */}
      <div className={cn("relative", className)}>
        {children}
      </div>
    </div>
  );
}