'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md';
  
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white border border-blue-600 hover:border-blue-700',
    secondary: 'bg-gray-500 hover:bg-gray-600 focus:ring-gray-500 text-white border border-gray-500 hover:border-gray-600',
    success: 'bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white border border-green-600 hover:border-green-700',
    danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white border border-red-600 hover:border-red-700',
    warning: 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500 text-white border border-yellow-500 hover:border-yellow-600',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs leading-4',
    md: 'px-4 py-2.5 text-sm leading-5',
    lg: 'px-6 py-3 text-base leading-6',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = (disabled || isLoading) ? 'opacity-60 cursor-not-allowed hover:shadow-sm' : '';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`.trim();
  
  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
} 