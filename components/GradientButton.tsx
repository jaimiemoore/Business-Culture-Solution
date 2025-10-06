'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GradientButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
}

export default function GradientButton({ children, onClick, type = 'button', className = '', disabled = false }: GradientButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative px-8 py-4 text-white font-semibold rounded-lg bg-gold-gradient overflow-hidden ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <motion.span
        className="relative z-10"
        whileHover={{ letterSpacing: '0.05em' }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-gold-end to-gold-start opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
}