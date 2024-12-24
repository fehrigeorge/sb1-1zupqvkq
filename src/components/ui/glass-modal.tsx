import { useAppearance } from '@/stores/appearance';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface GlassModalProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}

export function GlassModal({ title, icon, children, onClose, className }: GlassModalProps) {
  const { animations, glassFactor, blurStrength } = useAppearance();

  const glassStyle = {
    backgroundColor: `rgba(17, 24, 39, ${glassFactor * 0.008})`,
    backdropFilter: `blur(${blurStrength * 0.5}px)`,
  };

  const backdropStyle = {
    backgroundColor: `rgba(0, 0, 0, ${glassFactor * 0.006})`,
    backdropFilter: `blur(${blurStrength}px)`,
  };

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        animations && "animate-in fade-in duration-200"
      )}
      style={backdropStyle}
      onClick={onClose}
    >
      <div 
        className={cn(
          "w-full relative overflow-hidden",
          "border border-gray-800/50 rounded-xl",
          animations && "animate-in zoom-in-95 duration-200",
          className
        )}
        style={glassStyle}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-800/50">
          <div className="flex items-center gap-3">
            {icon}
            <h2 className="text-xl font-semibold text-gray-100">{title}</h2>
          </div>
          <button
            onClick={onClose}
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
      </div>
    </div>
  );
}
