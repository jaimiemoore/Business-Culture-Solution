'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Testimonial {
  id: number
  quote: string
  author: string
  title: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "This training was extremely well delivered and received by my staff. Rachel was engaging and interactive with the group making the training extremely effective and impactful.",
    author: "M. Jones",
    title: "Corporate Manager"
  },
  {
    id: 2,
    quote: "I just wanted to thank you for your training. It has given me a chance for some good self reflection.",
    author: "B. Murray",
    title: "Project Manager"
  },
  {
    id: 3,
    quote: "Recognizing all of the unconscious details and behaviour theory is a real asset to us. This training was insightful, timely and inspiring.",
    author: "M. Holt",
    title: "Operations Director"
  }
]

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="relative h-64 flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute w-full px-12"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-6xl text-gold-end mb-4"
              >
                "
              </motion.div>
              <p className="text-xl italic text-primary-grey mb-6">
                {testimonials[currentIndex].quote}
              </p>
              <div className="font-semibold">
                {testimonials[currentIndex].author}
              </div>
              <div className="text-primary-grey">
                {testimonials[currentIndex].title}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevTestimonial}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-primary-grey hover:text-primary-black transition-colors"
        aria-label="Previous testimonial"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextTestimonial}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-primary-grey hover:text-primary-black transition-colors"
        aria-label="Next testimonial"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots indicator */}
      <div className="flex justify-center space-x-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'w-8 bg-gold-end'
                : 'bg-primary-grey/30 hover:bg-primary-grey/50'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}