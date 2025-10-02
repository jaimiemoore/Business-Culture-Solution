'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PillarCardProps {
  icon: ReactNode
  title: string
  description: string
  index: number
}

export default function PillarCard({ icon, title, description, index }: PillarCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className="text-center p-8"
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gold-gradient rounded-full"
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-primary-grey">{description}</p>
    </motion.div>
  )
}