import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlassPanel } from './glass-panel';
import { useAppearance } from '@/stores/appearance';

interface ModalProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}

export function Modal({ title, icon, children, onClose, className }: ModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const { animations } = useAppearance();

  const handleClose = () => {
    if (!animations) {
      onClose();
      return;
    }
    
    setIsClosing(true);
    setTimeout(onClose, 200);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        animations && "animate-in fade-in duration-200",
        isClosing && "animate-out fade-out duration-200"
      )}
    >
      <GlassPanel
        className={cn(
          "w-full relative overflow-hidden",
          "border-gray-800/50",
          animations && "animate-in zoom-in-95 duration-200",
          isClosing && "animate-out zoom-out-95 duration-200",
          className
        )}
        intensity="high"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-800/50">
          <div className="flex items-center gap-3">
            {icon}
            <h2 className="text-xl font-semibold text-gray-100">{title}</h2>
          </div>
          <button
            onClick={handleClose}
            className={cn(
              "p-2 rounded-lg transition-colors",
              "hover:bg-gray-800/50",
              animations && "hover:rotate-90 transition-transform duration-200"
            )}
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          {children}
        </div>
      </GlassPanel>
    </div>
  );
}