'use client'

import { motion } from 'framer-motion'

export default function WaveAnimation() {
  return (
    <div className="absolute inset-x-0 bottom-0 h-20 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      >
        <svg
          className="absolute bottom-0 w-[200%] h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C150,80 350,0 600,40 C850,80 1050,0 1200,40 L1200,120 L0,120 Z"
            fill="rgba(30,58,95,0.1)"
          />
          <path
            d="M0,60 C150,100 350,20 600,60 C850,100 1050,20 1200,60 L1200,120 L0,120 Z"
            fill="rgba(30,58,95,0.15)"
          />
          <path
            d="M0,80 C150,120 350,40 600,80 C850,120 1050,40 1200,80 L1200,120 L0,120 Z"
            fill="rgba(30,58,95,0.2)"
          />
        </svg>
      </motion.div>
      <motion.div
        className="absolute inset-0"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      >
        <svg
          className="absolute bottom-0 w-[200%] h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C150,80 350,0 600,40 C850,80 1050,0 1200,40 L1200,120 L0,120 Z"
            fill="rgba(30,58,95,0.1)"
          />
          <path
            d="M0,60 C150,100 350,20 600,60 C850,100 1050,20 1200,60 L1200,120 L0,120 Z"
            fill="rgba(30,58,95,0.15)"
          />
          <path
            d="M0,80 C150,120 350,40 600,80 C850,120 1050,40 1200,80 L1200,120 L0,120 Z"
            fill="rgba(30,58,95,0.2)"
          />
        </svg>
      </motion.div>
    </div>
  )
}