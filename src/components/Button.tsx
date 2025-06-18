import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button'
}: ButtonProps) => {
  const baseStyles = "inline-block font-medium border-2 rounded-sm transition-all duration-300 hover:text-white";
  
  const sizeStyles = {
    sm: "py-2 px-6 text-sm",
    md: "py-3 px-8 text-lg", 
    lg: "py-4 px-10 text-xl"
  };

  const variantStyles = {
    primary: {
      borderColor: '#ff6f68',
      color: '#ff6f68',
      backgroundColor: 'transparent'
    },
    secondary: {
      borderColor: '#ffc861',
      color: '#ffc861', 
      backgroundColor: 'transparent'
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const target = e.target as HTMLButtonElement;
    if (variant === 'primary') {
      target.style.backgroundColor = '#ff6f68';
    } else {
      target.style.backgroundColor = '#ffc861';
    }
    target.style.color = 'white';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const target = e.target as HTMLButtonElement;
    target.style.backgroundColor = 'transparent';
    if (variant === 'primary') {
      target.style.color = '#ff6f68';
    } else {
      target.style.color = '#ffc861';
    }
  };

  const styles = variantStyles[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={{
        borderColor: styles.borderColor,
        color: styles.color,
        backgroundColor: styles.backgroundColor
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
};

export default Button; 