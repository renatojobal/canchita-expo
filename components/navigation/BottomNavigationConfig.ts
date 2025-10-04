export interface NavigationItem {
  key: string;
  label: string;
  icon: string;
  route: string;
  isActive?: boolean;
}

export interface BottomNavigationProps {
  currentRoute?: string;
  onNavigate?: (route: string) => void;
}

export const navigationItems: NavigationItem[] = [
  { key: 'dashboard', label: 'Home', icon: '🏠', route: '/dashboard' },
  { key: 'group', label: 'Group', icon: '👥', route: '/group' },
  { key: 'match', label: 'Match', icon: '⚽', route: '/match/create' },
  { key: 'tournament', label: 'Cups', icon: '🏆', route: '/tournament' },
  { key: 'profile', label: 'Profile', icon: '👤', route: '/profile' }
];

export const bottomNavigationStyles = {
  container: 'absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex-row justify-around items-center h-16 px-2',
  tab: 'flex-1 flex-col items-center justify-center py-1',
  activeTab: 'text-green-600',
  inactiveTab: 'text-gray-500',
  centerButton: {
    container: 'flex-col items-center justify-center',
    button: 'bg-green-600 rounded-full p-3 -mt-6 shadow-lg active:bg-green-700',
    icon: 'text-white text-2xl',
    label: 'text-xs mt-1 text-green-600'
  },
  icon: 'text-xl',
  label: 'text-xs mt-1'
};