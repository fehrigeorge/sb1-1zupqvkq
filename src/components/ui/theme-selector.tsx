import { useTheme } from '@/stores/theme';
import { cn } from '@/lib/utils';
import type { ThemeMode } from '@/lib/themes';

const themes: Array<{
  id: ThemeMode;
  name: string;
  preview: {
    bg: string;
    text: string;
    accent: string;
  };
}> = [
  {
    id: 'light',
    name: 'Light',
    preview: {
      bg: 'bg-gray-50',
      text: 'text-gray-900',
      accent: 'bg-blue-600',
    },
  },
  {
    id: 'dark',
    name: 'Dark',
    preview: {
      bg: 'bg-gray-950',
      text: 'text-gray-100',
      accent: 'bg-blue-600',
    },
  },
  {
    id: 'catppuccin',
    name: 'Catppuccin',
    preview: {
      bg: 'bg-[#1e1e2e]',
      text: 'text-[#d9e0ee]',
      accent: 'bg-[#f5c2e7]',
    },
  },
  {
    id: 'dracula',
    name: 'Dracula',
    preview: {
      bg: 'bg-[#282a36]',
      text: 'text-[#f8f8f2]',
      accent: 'bg-[#ff79c6]',
    },
  },
];

export function ThemeSelector() {
  const { mode, setTheme } = useTheme();

  return (
    <div className="grid grid-cols-2 gap-2">
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => setTheme(theme.id)}
          className={cn(
            "p-3 rounded-lg border transition-all",
            mode === theme.id
              ? "ring-2 ring-blue-500/50"
              : "hover:bg-gray-800/50",
            theme.preview.bg
          )}
        >
          <div className="space-y-2">
            <div className={cn("text-xs font-medium", theme.preview.text)}>
              {theme.name}
            </div>
            <div className="space-y-1">
              <div className={cn("h-1.5 w-8 rounded-full", theme.preview.accent)} />
              <div className={cn("h-1.5 w-12 rounded-full opacity-70", theme.preview.accent)} />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}