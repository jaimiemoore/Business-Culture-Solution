'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function IcebergVisualization() {
  const [isInView, setIsInView] = useState(false)

  return (
    <motion.div 
      className="relative w-full max-w-3xl mx-auto"
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: true, amount: 0.3 }}
    >
      <svg
        viewBox="0 0 800 600"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sky gradient */}
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#87CEEB', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#B0E0E6', stopOpacity: 0.5 }} />
          </linearGradient>
          <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#1E3A5F', stopOpacity: 0.9 }} />
            <stop offset="50%" style={{ stopColor: '#0A2540', stopOpacity: 0.95 }} />
            <stop offset="100%" style={{ stopColor: '#051225', stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        {/* Sky */}
        <rect width="800" height="250" fill="url(#skyGradient)" />
        
        {/* Water line */}
        <motion.line
          x1="0"
          y1="250"
          x2="800"
          y2="250"
          stroke="#4A90E2"
          strokeWidth="2"
          strokeDasharray="10 5"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        {/* Water */}
        <rect y="250" width="800" height="350" fill="url(#waterGradient)" />

        {/* Iceberg top (conscious) */}
        <motion.path
          d="M 400 180 L 320 250 L 480 250 Z"
          fill="#E8F4F8"
          stroke="#B8D4E3"
          strokeWidth="2"
          initial={{ y: -50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Iceberg bottom (unconscious) */}
        <motion.path
          d="M 320 250 L 480 250 L 500 350 L 450 450 L 400 500 L 350 450 L 300 350 Z"
          fill="#A8C8D8"
          stroke="#7FA9C3"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.7 } : {}}
          transition={{ duration: 1.5, delay: 1 }}
        />

        {/* Percentage labels */}
        <motion.text
          x="400"
          y="215"
          textAnchor="middle"
          className="text-4xl font-bold fill-ocean-deep"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
        >
          10%
        </motion.text>

        <motion.text
          x="400"
          y="380"
          textAnchor="middle"
          className="text-6xl font-bold fill-white"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 2 }}
        >
          90%
        </motion.text>

        {/* Labels */}
        <motion.text
          x="550"
          y="215"
          className="text-xl font-semibold fill-ocean-deep"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          CONSCIOUS
        </motion.text>
        <motion.text
          x="550"
          y="235"
          className="text-xl font-semibold fill-ocean-deep"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 2.3 }}
        >
          MIND
        </motion.text>

        <motion.text
          x="520"
          y="380"
          className="text-xl font-semibold fill-white"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 2.5 }}
        >
          UNCONSCIOUS
        </motion.text>
        <motion.text
          x="520"
          y="400"
          className="text-xl font-semibold fill-white"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 2.6 }}
        >
          MIND
        </motion.text>

        {/* Decorative clouds */}
        <motion.g
          initial={{ x: -100 }}
          animate={{ x: 100 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        >
          <ellipse cx="150" cy="100" rx="40" ry="20" fill="white" opacity="0.5" />
          <ellipse cx="180" cy="95" rx="35" ry="18" fill="white" opacity="0.5" />
        </motion.g>
      </svg>

      {/* Wave effect overlay */}
      <motion.div
        className="absolute inset-x-0 top-[250px] h-2"
        animate={{
          y: [-2, 2, -2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="h-full bg-gradient-to-b from-transparent via-blue-400/20 to-transparent" />
      </motion.div>
    </motion.div>
  )
}