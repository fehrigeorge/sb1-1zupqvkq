import { useState } from 'react';
import { Search, X, ChevronRight } from 'lucide-react';
import { Avatar } from '../ui/avatar';
import { cn } from '@/lib/utils';
import { formatRelativeDate } from '@/lib/utils/date';

interface ChatHeaderProps {
  name: string;
  avatarUrl?: string;
  lastActive: string;
  onOpenInfo: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
  isSearching: boolean;
}

export function ChatHeader({
  name,
  avatarUrl,
  lastActive,
  onOpenInfo,
  onSearch,
  searchQuery,
  isSearching,
}: ChatHeaderProps) {
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <div className="h-16 min-h-[4rem] flex items-center justify-between px-4 bg-gray-900 border-b border-gray-800">
      {showSearchBar ? (
        // Search Bar
        <div className="flex-1 flex items-center gap-2">
          <button
            onClick={() => {
              setShowSearchBar(false);
              onSearch('');
            }}
            className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search messages..."
              className="w-full bg-gray-800 text-gray-100 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            {isSearching && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            )}
          </div>
        </div>
      ) : (
        // Chat Info
        <>
          <button 
            onClick={onOpenInfo}
            className="flex items-center gap-3 hover:bg-gray-800/50 p-2 rounded-lg transition-colors"
          >
            <Avatar
              src={avatarUrl}
              alt={name}
              fallback={name[0]}
              className="w-10 h-10"
            />
            <div className="text-left">
              <h2 className="font-medium text-gray-100">{name}</h2>
              <p className="text-sm text-gray-400">
                Active {formatRelativeDate(lastActive)}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 ml-2" />
          </button>

          <button
            onClick={() => setShowSearchBar(true)}
            className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
          >
            <Search className="w-5 h-5 text-gray-400" />
          </button>
        </>
      )}
    </div>
  );
}