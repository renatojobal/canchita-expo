export interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  rightAction?: React.ReactNode;
  onBackPress?: () => void;
}

export const headerStyles = {
  container: 'bg-white border-b border-gray-200',
  content: 'flex-row items-center justify-between h-14 px-4',
  leftSection: 'flex-row items-center',
  backButton: 'mr-2 p-1 rounded-full active:bg-gray-100',
  title: 'text-lg font-semibold text-gray-800',
  rightSection: ''
};