'use client'

import { motion } from 'framer-motion'

interface ServiceCardProps {
  title: string
  description: string
  items: string[]
  index: number
}

export default function ServiceCard({ title, description, items, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-primary-grey mb-6">{description}</p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + i * 0.05 }}
            viewport={{ once: true }}
            className="flex items-start"
          >
            <span className="text-gold-end mr-2 mt-1">•</span>
            <span className="text-primary-grey">{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}