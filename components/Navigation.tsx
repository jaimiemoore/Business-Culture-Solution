'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-serif font-bold"
          >
            <span className={isScrolled ? 'text-primary-black' : 'text-primary-black'}>
              Business Culture Solution
            </span>
          </motion.div>
          
          <div className="hidden md:flex space-x-8">
            {[
              { id: 'why', label: 'Why It Matters' },
              { id: 'what', label: 'What We Do' },
              { id: 'investment', label: 'The Impact' },
              { id: 'testimonials', label: 'Success Stories' },
              { id: 'contact', label: 'Get Started' }
            ].map((section) => (
              <motion.button
                key={section.id}
                whileHover={{ y: -2 }}
                onClick={() => scrollToSection(section.id)}
                className={`transition-colors ${
                  isScrolled ? 'text-primary-grey hover:text-primary-black' : 'text-primary-black hover:text-gold-end'
                }`}
              >
                {section.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}