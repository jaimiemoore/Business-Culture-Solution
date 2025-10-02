'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface StatisticCardProps {
  icon: React.ReactNode
  statistic: string
  description: string
  delay?: number
}

export default function StatisticCard({ icon, statistic, description, delay = 0 }: StatisticCardProps) {
  const [isInView, setIsInView] = useState(false)
  const [count, setCount] = useState(0)
  
  const targetNumber = parseInt(statistic.match(/\d+/)?.[0] || '0')
  
  useEffect(() => {
    if (isInView && targetNumber > 0) {
      const duration = 2000 // 2 seconds
      const steps = 50
      const increment = targetNumber / steps
      const stepDuration = duration / steps
      
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= targetNumber) {
          setCount(targetNumber)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, stepDuration)
      
      return () => clearInterval(timer)
    }
  }, [isInView, targetNumber])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: delay + 0.2, type: "spring" }}
        className="w-16 h-16 bg-ocean-gradient rounded-full flex items-center justify-center mb-6"
      >
        {icon}
      </motion.div>
      
      <div className="text-3xl font-bold text-ocean-deep mb-2">
        {isInView && targetNumber > 0 ? (
          <span>{count}{statistic.replace(/\d+/, '')}</span>
        ) : (
          statistic
        )}
      </div>
      
      <p className="text-primary-grey leading-relaxed">{description}</p>
    </motion.div>
  )
}