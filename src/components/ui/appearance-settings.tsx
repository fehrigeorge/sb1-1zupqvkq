import { Settings } from 'lucide-react';
import { Modal } from './modal';
import { Slider } from './slider';
import { useAppearance } from '@/stores/appearance';
import { Switch } from './switch';
import { useTheme } from '@/stores/theme';

interface AppearanceSettingsProps {
  onClose: () => void;
}

export function AppearanceSettings({ onClose }: AppearanceSettingsProps) {
  const { animations, glassFactor, blurStrength, updateSettings } = useAppearance();
  const { mode, setTheme } = useTheme();

  return (
    <Modal
      title="Appearance Settings"
      icon={<Settings className="w-5 h-5 text-blue-400" />}
      onClose={onClose}
      className="max-w-lg"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-200">Animations</h3>
            <p className="text-sm text-gray-400">Enable smooth transitions and effects</p>
          </div>
          <Switch
            checked={animations}
            onChange={(checked) => updateSettings({ animations: checked })}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-200">Glass Effect</h3>
          <Slider
            label="Transparency"
            value={glassFactor}
            onChange={(value) => updateSettings({ glassFactor: value })}
            className="mb-4"
          />
          <Slider
            label="Blur Strength"
            value={blurStrength}
            onChange={(value) => updateSettings({ blurStrength: value })}
            min={0}
            max={20}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-200">Theme</h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setTheme('light')}
              className={`aspect-[4/3] rounded-lg p-4 border transition-colors ${
                mode === 'light'
                  ? 'border-blue-500/50 bg-gray-50/10'
                  : 'border-gray-800/50 bg-gray-900/50 hover:bg-gray-900/80'
              }`}
            >
              <div className="space-y-2">
                <div className="h-2 w-16 bg-gray-300 rounded" />
                <div className="h-2 w-24 bg-gray-300 rounded" />
                <div className="h-2 w-20 bg-gray-300 rounded" />
              </div>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`aspect-[4/3] rounded-lg p-4 border transition-colors ${
                mode === 'dark'
                  ? 'border-blue-500/50 bg-gray-900'
                  : 'border-gray-800/50 bg-gray-900/50 hover:bg-gray-900/80'
              }`}
            >
              <div className="space-y-2">
                <div className="h-2 w-16 bg-gray-700 rounded" />
                <div className="h-2 w-24 bg-gray-700 rounded" />
                <div className="h-2 w-20 bg-gray-700 rounded" />
              </div>
            </button>
            <button
              onClick={() => setTheme('catppuccin')}
              className={`aspect-[4/3] rounded-lg p-4 border transition-colors ${
                mode === 'catppuccin'
                  ? 'border-[#f5c2e7]/50 bg-[#1e1e2e]'
                  : 'border-gray-800/50 bg-[#1e1e2e]/50 hover:bg-[#1e1e2e]/80'
              }`}
            >
              <div className="space-y-2">
                <div className="h-2 w-16 bg-[#988ba2] rounded" />
                <div className="h-2 w-24 bg-[#988ba2] rounded" />
                <div className="h-2 w-20 bg-[#988ba2] rounded" />
              </div>
            </button>
            <button
              onClick={() => setTheme('dracula')}
              className={`aspect-[4/3] rounded-lg p-4 border transition-colors ${
                mode === 'dracula'
                  ? 'border-[#ff79c6]/50 bg-[#282a36]'
                  : 'border-gray-800/50 bg-[#282a36]/50 hover:bg-[#282a36]/80'
              }`}
            >
              <div className="space-y-2">
                <div className="h-2 w-16 bg-[#6272a4] rounded" />
                <div className="h-2 w-24 bg-[#6272a4] rounded" />
                <div className="h-2 w-20 bg-[#6272a4] rounded" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}