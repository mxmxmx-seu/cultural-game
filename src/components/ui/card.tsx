import React from 'react'

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

interface CardTitleProps {
  children: React.ReactNode
  className?: string
}

interface CardDescriptionProps {
  children: React.ReactNode
  className?: string
}

interface CardContentProps {
  children: React.ReactNode
  className?: string
}

interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => {
  return <div className={`p-4 ${className}`}>{children}</div>
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => {
  return <h2 className={`text-xl font-bold ${className}`}>{children}</h2>
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ children, className }) => {
  return <p className={`text-gray-600 mt-1 ${className}`}>{children}</p>
}

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
  return <div className={`p-4 ${className}`}>{children}</div>
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => {
  return <div className={`p-4 border-t border-gray-200 ${className}`}>{children}</div>
}

interface CardProps {
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 ${className}`}>
      {children}
    </div>
  )
}