import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { OTPDigit } from './otp-digit';

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
  className?: string;
}

export function OTPInput({
  length = 6,
  value,
  onChange,
  error,
  disabled,
  className,
}: OTPInputProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize input refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const handleChange = (index: number, digit: string) => {
    const newValue = value.split('');
    newValue[index] = digit;
    const nextValue = newValue.join('');
    onChange(nextValue);

    // Move to next input if available
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setActiveIndex(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!value[index] && index > 0) {
        // Move to previous input on backspace if current is empty
        inputRefs.current[index - 1]?.focus();
        setActiveIndex(index - 1);
        
        // Clear previous digit
        const newValue = value.split('');
        newValue[index - 1] = '';
        onChange(newValue.join(''));
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setActiveIndex(index - 1);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setActiveIndex(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, length);
    const sanitizedData = pastedData.replace(/\D/g, '');
    onChange(sanitizedData.padEnd(length, ''));
    
    // Focus last input after paste
    const focusIndex = Math.min(sanitizedData.length, length - 1);
    inputRefs.current[focusIndex]?.focus();
    setActiveIndex(focusIndex);
  };

  return (
    <div 
      className={cn(
        "inline-flex gap-2 sm:gap-3",
        error && "animate-shake",
        className
      )}
    >
      {Array.from({ length }).map((_, index) => (
        <OTPDigit
          key={index}
          ref={el => inputRefs.current[index] = el}
          value={value[index] || ''}
          onChange={digit => handleChange(index, digit)}
          onKeyDown={e => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => setActiveIndex(index)}
          isActive={index === activeIndex}
          error={error}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
