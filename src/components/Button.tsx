import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

const Button = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  fullWidth = false
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 border text-center leading-tight";
  
  const sizeStyles = {
    sm: "px-3 py-2 text-sm min-h-[36px]",
    md: "px-4 sm:px-6 py-3 text-sm sm:text-base min-h-[44px]", 
    lg: "px-5 sm:px-8 py-4 text-base sm:text-lg min-h-[52px]"
  };

  const variantStyles = {
    primary: "bg-primary-600 hover:bg-primary-700 text-white border-primary-600 hover:border-primary-700 shadow-lg hover:shadow-xl",
    secondary: "bg-white hover:bg-neutral-50 text-primary-700 border-primary-200 hover:border-primary-300 shadow-md hover:shadow-lg",
    outline: "bg-transparent hover:bg-primary-600 text-primary-600 hover:text-white border-2 border-primary-600"
  };

  const disabledStyles = "opacity-50 cursor-not-allowed pointer-events-none";
  const widthStyles = fullWidth ? "w-full" : "w-auto";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles} 
        ${sizeStyles[size]} 
        ${variantStyles[variant]}
        ${disabled ? disabledStyles : ''} 
        ${widthStyles}
        ${className}
      `.trim()}
    >
      {children}
    </button>
  );
};

export default Button; 