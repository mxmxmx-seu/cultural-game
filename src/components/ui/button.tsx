import React from 'react'

interface ButtonProps {
  onClick?: () => void
  variant?: 'default' | 'outline' | 'destructive' | 'secondary'
  className?: string
  disabled?: boolean
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  variant = 'default',
  className,
  disabled = false,
  children
}) => {
  let buttonClass = ''

  // 根据variant设置不同样式
  switch (variant) {
    case 'default':
      buttonClass = 'bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'
      break
    case 'outline':
      buttonClass = 'border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors'
      break
    case 'destructive':
      buttonClass = 'bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors'
      break
    case 'secondary':
      buttonClass = 'bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors'
      break
    default:
      buttonClass = 'bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'
  }

  return (
    <button
      onClick={onClick}
      className={`${buttonClass} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button