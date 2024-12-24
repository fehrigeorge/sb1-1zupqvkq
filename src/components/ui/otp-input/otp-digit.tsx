import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface OTPDigitProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste: (e: React.ClipboardEvent) => void;
  onFocus: () => void;
  isActive: boolean;
  error?: boolean;
  disabled?: boolean;
}

export const OTPDigit = forwardRef<HTMLInputElement, OTPDigitProps>(({
  value,
  onChange,
  onKeyDown,
  onPaste,
  onFocus,
  isActive,
  error,
  disabled,
}, ref) => {
  return (
    <div className="relative">
      <input
        ref={ref}
        type="text"
        inputMode="numeric"
        pattern="\d*"
        maxLength={1}
        value={value}
        onChange={e => {
          const digit = e.target.value.replace(/\D/g, '');
          onChange(digit);
        }}
        onKeyDown={onKeyDown}
        onPaste={onPaste}
        onFocus={onFocus}
        disabled={disabled}
        className={cn(
          "w-12 h-16 sm:w-14 sm:h-18 text-2xl sm:text-3xl text-center",
          "bg-gray-900/50 border-2 rounded-xl",
          "focus:outline-none transition-all duration-200",
          isActive && !error && "border-blue-500 ring-2 ring-blue-500/20",
          !isActive && !error && "border-gray-700 hover:border-gray-600",
          error && "border-red-500 ring-2 ring-red-500/20",
          disabled && "opacity-50 cursor-not-allowed",
          "placeholder-gray-500 text-gray-100"
        )}
        aria-label={`Digit ${value || ''}`}
      />
      
      {/* Animated dot indicator */}
      <div className={cn(
        "absolute -bottom-4 left-1/2 -translate-x-1/2",
        "w-1.5 h-1.5 rounded-full transition-all duration-200",
        isActive ? "bg-blue-500 scale-100" : "bg-gray-700 scale-75",
        error && "bg-red-500"
      )} />
    </div>
  );
});

OTPDigit.displayName = 'OTPDigit';
