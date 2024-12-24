import { cn } from '@/lib/utils';

export function ThemeSelectorSkeleton() {
  return (
    <div className="space-y-6 p-4 min-w-[320px]">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-6 w-24 bg-gray-800 rounded animate-pulse" />
        <div className="h-4 w-48 bg-gray-800/60 rounded animate-pulse" />
      </div>

      {/* Theme Options */}
      <div className="space-y-4">
        {/* Auto Theme */}
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <div className="h-5 w-32 bg-gray-800 rounded animate-pulse" />
            <div className="h-4 w-40 bg-gray-800/60 rounded animate-pulse" />
          </div>
          <div className="h-6 w-12 bg-gray-800 rounded-full animate-pulse" />
        </div>

        {/* Theme Preview Cards */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          {[0, 1].map((i) => (
            <div
              key={i}
              className={cn(
                "aspect-[4/3] rounded-lg p-4 border animate-pulse",
                i === 0 ? "bg-gray-900 border-gray-700" : "bg-gray-100 border-gray-300"
              )}
            >
              <div className="space-y-3">
                <div className="h-2 w-16 bg-current opacity-20 rounded" />
                <div className="h-2 w-24 bg-current opacity-20 rounded" />
                <div className="h-2 w-20 bg-current opacity-20 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Options */}
        <div className="space-y-2 pt-2">
          <div className="h-5 w-36 bg-gray-800 rounded animate-pulse" />
          <div className="grid grid-cols-2 gap-2">
            <div className="h-16 bg-gray-900 rounded animate-pulse" />
            <div className="h-16 bg-gray-800 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}