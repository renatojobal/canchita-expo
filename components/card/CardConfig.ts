export interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  onPress?: () => void;
  footer?: React.ReactNode;
}

export const cardStyles = {
  base: 'bg-white rounded-lg shadow-md overflow-hidden',
  pressable: 'active:bg-gray-50',
  title: {
    container: 'px-4 py-3 border-b border-gray-100',
    text: 'text-lg font-semibold text-gray-800'
  },
  content: 'p-4',
  footer: {
    container: 'px-4 py-3 bg-gray-50 border-t border-gray-100'
  }
};