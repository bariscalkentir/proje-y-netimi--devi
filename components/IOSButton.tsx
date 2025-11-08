'use client'

import React from 'react'
import styles from './IOSButton.module.css'

export interface IOSButtonProps {
  variant?: 'filled' | 'tinted' | 'plain'
  size?: 'small' | 'medium' | 'large'
  color?: 'blue' | 'green' | 'red' | 'orange' | 'purple' | 'pink' | 'teal' | 'yellow' | 'gray'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  icon?: React.ReactNode
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export default function IOSButton({
  variant = 'filled',
  size = 'medium',
  color = 'blue',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  children,
  onClick,
  type = 'button',
  className = '',
}: IOSButtonProps) {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    styles[color],
    loading && styles.loading,
    fullWidth && styles.fullWidth,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  )
}
