export interface PlayerStats {
  goals?: number;
  assists?: number;
  matches?: number;
  wins?: number;
}

export interface PlayerCardProps {
  id: string;
  name: string;
  position: string;
  avatar?: string;
  stats?: PlayerStats;
  selected?: boolean;
  onPress?: () => void;
  size?: 'sm' | 'md' | 'lg';
  showStats?: boolean;
  team?: 'A' | 'B' | null;
}

export const playerCardStyles = {
  container: {
    base: 'relative rounded-lg overflow-hidden shadow-md active:opacity-80',
    selected: 'border-2 border-green-500',
    unselected: 'border border-gray-200'
  },
  teamColors: {
    A: 'border-blue-500 bg-blue-50',
    B: 'border-red-500 bg-red-50',
    null: 'border-gray-200 bg-white'
  },
  content: 'flex-col items-center p-2',
  avatar: {
    sizes: {
      sm: 'w-12 h-12',
      md: 'w-16 h-16',
      lg: 'w-20 h-20'
    },
    base: 'rounded-full overflow-hidden border-2',
    borders: {
      A: 'border-blue-500',
      B: 'border-red-500',
      null: 'border-gray-300'
    }
  },
  text: {
    sizes: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base'
    },
    name: 'font-semibold truncate',
    position: 'text-gray-500 -mt-0.5'
  },
  stats: {
    container: 'w-full grid grid-cols-2 gap-1 mt-2',
    item: 'flex items-center justify-center bg-gray-50 rounded p-1 flex-col',
    number: 'font-semibold text-xs',
    label: 'text-xs text-gray-600'
  },
  teamBadge: {
    container: 'absolute top-0 right-0 w-6 h-6 flex items-center justify-center rounded-bl-lg',
    teamA: 'bg-blue-500',
    teamB: 'bg-red-500',
    text: 'text-white font-bold text-sm'
  },
  selectedOverlay: 'absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center'
};