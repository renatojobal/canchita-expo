export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const buttonStyles = {
  base: 'rounded-lg font-medium flex-row items-center justify-center',
  variants: {
    primary: 'bg-green-600 active:bg-green-700',
    secondary: 'bg-blue-600 active:bg-blue-700',
    outline: 'bg-transparent border border-green-600 active:bg-green-50',
    danger: 'bg-red-600 active:bg-red-700'
  },
  variantText: {
    primary: 'text-white',
    secondary: 'text-white',
    outline: 'text-green-600',
    danger: 'text-white'
  },
  sizes: {
    sm: 'text-sm py-1.5 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-2.5 px-5'
  },
  width: {
    full: 'w-full',
    auto: ''
  },
  disabled: 'opacity-50'
};