import { useCallback } from 'react';
import { cn } from '@/lib/utils';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  className?: string;
}

export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  className,
}: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  }, [onChange]);

  return (
    <div className={className}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">{label}</span>
          <span className="text-sm text-gray-500">{value}</span>
        </div>
      )}
      <div className="relative h-6 flex items-center">
        <div className="absolute inset-0 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-150"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className={cn(
            "absolute inset-0 w-full h-6 opacity-0 cursor-pointer",
            "range-thumb:w-4 range-thumb:h-4 range-thumb:rounded-full",
            "range-thumb:bg-blue-500 range-thumb:border-2 range-thumb:border-gray-900"
          )}
        />
        <div
          className="absolute w-4 h-4 bg-blue-500 rounded-full border-2 border-gray-900 transition-all duration-150 shadow-lg"
          style={{ left: `calc(${percentage}% - 0.5rem)` }}
        />
      </div>
    </div>
  );
}