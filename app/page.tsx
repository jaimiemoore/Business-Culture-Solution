'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedSection from '@/components/AnimatedSection'
import GradientButton from '@/components/GradientButton'
import Navigation from '@/components/Navigation'
import IcebergVisualization from '@/components/IcebergVisualization'
import TestimonialCarousel from '@/components/TestimonialCarousel'
import StatisticCard from '@/components/StatisticCard'
import WaveAnimation from '@/components/WaveAnimation'
import Image from 'next/image'

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    interest: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! We\'ll be in touch soon.',
        })
        // Clear form
        setFormData({
          name: '',
          email: '',
          company: '',
          interest: '',
        })
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Something went wrong. Please try again.',
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Unable to send message. Please try again later.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex items-center px-6 py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-soft-grey to-white" />
          <WaveAnimation />
          
          <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight"
              >
                Harness <span className="text-ocean-deep">Unconscious</span> Behaviour.{' '}
                <span className="bg-gold-gradient bg-clip-text text-transparent">Elevate Results.</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl text-primary-grey mb-8 leading-relaxed"
              >
                Transform workplace culture by understanding the unconscious drivers of performance
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <GradientButton onClick={scrollToContact} className="text-lg">
                  Take the next step
                </GradientButton>
              </motion.div>
            </AnimatedSection>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/rachel-speaking-1.jpg"
                alt="Rachel - Business Culture Solution"
                width={600}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </motion.div>
          </div>
        </section>

        {/* The Science Behind It Section */}
        <section id="why" className="py-20 px-6 bg-grey-gradient text-white relative overflow-hidden">
          <AnimatedSection className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16">
              The Science Behind It
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <p className="text-xl leading-relaxed mb-6">
                  Modern neuroscience and psychology agree most of our daily actions are driven by the unconscious mind. 
                  Research suggests that as much as <span className="font-bold text-gold-end">90-95%</span> of human thought, 
                  emotion, and behaviour happens outside of conscious awareness.
                </p>
                
                <p className="text-lg leading-relaxed opacity-90">
                  When organizations ignore the unconscious, they miss the single biggest driver of performance. 
                  By helping people recognize and work with these unseen patterns, you unlock their creativity, 
                  focus, and motivation, not just at work, but in life.
                </p>
              </div>
              
              <div className="flex justify-center">
                <IcebergVisualization />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <StatisticCard
                icon={
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                }
                statistic="95%"
                description="Brain activity linked to decisions occurs milliseconds before conscious awareness"
                delay={0.2}
              />
              
              <StatisticCard
                icon={
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                }
                statistic="Patterns"
                description="Unconscious biases and habits strongly shape how we communicate and collaborate"
                delay={0.4}
              />
              
              <StatisticCard
                icon={
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                }
                statistic="Roots"
                description="Emotional regulation, motivation, and resilience all have unconscious origins"
                delay={0.6}
              />
            </div>

            <AnimatedSection delay={0.8} className="text-center mt-16">
              <motion.div 
                className="relative bg-white/10 backdrop-blur-sm p-8 rounded-2xl max-w-4xl mx-auto overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 bg-shimmer-gradient"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut",
                  }}
                />
                <p className="relative text-2xl font-serif italic">
                  "Culture is the pulse of your business. When people show up happy, mature, and motivated, 
                  they organically apply more creativity and momentum in their day-to-day way of being."
                </p>
              </motion.div>
            </AnimatedSection>
          </AnimatedSection>
        </section>

        {/* What We Do Section */}
        <section id="what" className="py-20 px-6 bg-soft-grey">
          <AnimatedSection className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-6">
              What We Do
            </h2>
            <p className="text-xl text-center text-primary-grey mb-16 max-w-3xl mx-auto">
              At Business Culture Solution, we help teams and organizations uncover the unconscious 
              behaviours that influence their day-to-day way of being.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <div className="w-16 h-16 bg-ocean-gradient rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Custom Workshops</h3>
                <p className="text-primary-grey mb-4">
                  From half-day introductory sessions to 3-day immersive team-building workshops
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-gold-end mr-2">•</span>
                    Recognize unconscious patterns
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-end mr-2">•</span>
                    Ask "How else could it be?"
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-end mr-2">•</span>
                    Take inspired action
                  </li>
                </ul>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <div className="w-16 h-16 bg-ocean-gradient rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Corporate Training</h3>
                <p className="text-primary-grey mb-4">
                  Transform your organization with expertise in NLP and human behavior
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-gold-end mr-2">•</span>
                    Build compassionate teams
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-end mr-2">•</span>
                    Align vision and outcomes
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-end mr-2">•</span>
                    Spark innovation
                  </li>
                </ul>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <div className="w-16 h-16 bg-ocean-gradient rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Speaking Engagements</h3>
                <p className="text-primary-grey mb-4">
                  Inspiring keynotes and seminars that create lasting transformation
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-gold-end mr-2">•</span>
                    Re-invent conflict perception
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-end mr-2">•</span>
                    Foster personal growth
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-end mr-2">•</span>
                    Drive professional development
                  </li>
                </ul>
              </motion.div>
            </div>
          </AnimatedSection>
        </section>

        {/* Investment/Ripple Effect Section */}
        <section id="investment" className="py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-depth-gradient" />
          <AnimatedSection className="max-w-7xl mx-auto relative">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16">
              The Investment That Pays Forward
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6 text-ocean-deep">The Ripple Effect</h3>
                <p className="text-xl text-primary-grey mb-6">
                  When employers invest in the growth of their people, they create workplaces where:
                </p>
                <div className="space-y-4">
                  <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="w-12 h-12 bg-gold-gradient rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <p className="text-lg">Happy employees become creative employees</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="w-12 h-12 bg-gold-gradient rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <p className="text-lg">Motivated people step out of their own way and go after what they want</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="w-12 h-12 bg-gold-gradient rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <p className="text-lg">Teams align on vision, purpose, and results</p>
                  </motion.div>
                </div>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                  className="text-xl text-primary-grey mt-8 p-6 bg-soft-grey rounded-lg"
                >
                  <span className="font-bold text-ocean-deep">The ripple effect is massive.</span> Employees 
                  don't just apply these tools at work. They carry them into their relationships, families, 
                  and everyday lives. A better person makes a better teammate.
                </motion.p>
              </div>
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative mx-auto w-80 h-80">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-gold-gradient rounded-full opacity-20"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.15, 1],
                    }}
                    transition={{
                      duration: 3,
                      delay: 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-8 bg-gold-gradient rounded-full opacity-30"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      delay: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-16 bg-gold-gradient rounded-full opacity-40"
                  />
                  <div className="absolute inset-24 bg-gold-gradient rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">Impact</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </section>

        {/* The Ah-Ha Moment Section */}
        <section id="ahha" className="py-20 px-6 bg-ocean-deep text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep via-ocean-mid to-ocean-deep opacity-50" />
          <AnimatedSection className="max-w-7xl mx-auto relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gold-gradient rounded-full mb-6">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.75 20.85c1.78-.7 1.39-2.63.49-3.85-.89-1.25-2.12-2.11-3.36-2.94A9.817 9.817 0 014.54 12c-.28-.33-.85-.94-.27-1.06.59-.12.16-.78-.1-1.03C1.83 7.51.37 4.49 3.16 2.56c1.43-1.01 3.15-1.53 4.85-1.42C12.4.91 16.47 2.91 17.71 6.9c.91 2.91-.62 5.95-2.15 8.44-.32.52.37 1.27.82.81a15.77 15.77 0 005.6-8.75C23.06 2.05 16.56.03 12.26 0 5.54-.21 1.11 5.31 3.71 9.08c.1.15.32.24.36.42.04.18.06.37.08.57.08.68.36 1.3.63 1.93a5.55 5.55 0 013.72-1.66c1.98-.08 3.94.9 4.94 2.65 1.02 1.79 1.18 3.96.68 5.98-.11.42-.15.48.17.87a15.21 15.21 0 005.74-8.42c1.48-6.45-5.94-11.35-10.93-7.38-1.7 1.35-2.63 3.52-2.27 5.85.31 2.01 1.66 3.71 3.36 4.44.66.28 1.35.41 2.1.41l.47 1.65c-.17.46.2.94.68.94z" />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                The "Ah-Ha" Moment
              </h2>
            </motion.div>
            
            <div className="max-w-4xl mx-auto text-center">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-2xl mb-8 leading-relaxed"
              >
                In the very least, every person who experiences this training will be blown away 
                by how their unconscious behaviour is impacting their life.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-xl opacity-90 mb-12"
              >
                Whether it's a breakthrough in how they communicate, lead, or show up in their relationships, 
                every single participant will walk away with their own personal "ah-ha moment."
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-lg opacity-90 mb-8 max-w-3xl mx-auto"
              >
                For some, it's the spark that helps them finally step out of their own way. 
                For others, it's the insight that reshapes how they connect with their team, 
                family, or themselves.
              </motion.p>
              
              <motion.p
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="text-2xl font-serif italic mt-12"
              >
                "This isn't just training. It's a lasting experience that improves not only your business, 
                but also the lives of the people within it."
              </motion.p>
            </div>
          </AnimatedSection>
        </section>

        {/* Success Stories Section */}
        <section id="testimonials" className="py-20 px-6 bg-soft-grey">
          <AnimatedSection className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16">
              Success Stories
            </h2>
            <TestimonialCarousel />
          </AnimatedSection>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-20 px-6 bg-primary-black text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-ocean-deep/20 to-transparent" />
          <AnimatedSection className="max-w-7xl mx-auto relative">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-6">
              Ready to Transform Your Workplace Culture?
            </h2>
            <p className="text-xl text-center mb-12 text-gray-300 max-w-3xl mx-auto">
              The solution to workplace challenges isn't another policy, it's unlocking the 
              humanness of the people doing the work.
            </p>
            
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-serif mb-6">Ready to elevate your team? Let's chat</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-6 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-gold-end transition-all disabled:opacity-50"
                    required
                    disabled={isSubmitting}
                  />
                  
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-6 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-gold-end transition-all disabled:opacity-50"
                    required
                    disabled={isSubmitting}
                  />
                  
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-6 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-gold-end transition-all disabled:opacity-50"
                    required
                    disabled={isSubmitting}
                  />
                  
                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    placeholder="What are you interested in? (Workshops, Speaking, Corporate Training)"
                    value={formData.interest}
                    onChange={(e) => setFormData({...formData, interest: e.target.value})}
                    rows={4}
                    className="w-full px-6 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-gold-end transition-all resize-none disabled:opacity-50"
                    required
                    disabled={isSubmitting}
                  />
                  
                  <GradientButton type="submit" className="w-full text-lg" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Take the Next Step'}
                  </GradientButton>
                  
                  {submitStatus.type && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-4 p-4 rounded-lg text-center ${
                        submitStatus.type === 'success'
                          ? 'bg-green-500/20 text-green-100 border border-green-500/30'
                          : 'bg-red-500/20 text-red-100 border border-red-500/30'
                      }`}
                    >
                      {submitStatus.message}
                    </motion.div>
                  )}
                </form>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="sticky top-24">
                  <div className="rounded-2xl overflow-hidden shadow-2xl mb-6">
                    <Image
                      src="/rachel-contact.jpg"
                      alt="Rachel - Let's connect"
                      width={500}
                      height={500}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="text-2xl font-serif mb-2">Rachel Moore</h4>
                    <p className="text-gray-400 mb-4">
                      Human Behaviour Specialist
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </section>

        {/* Final Outcome Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-white to-soft-grey">
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
              The Outcome
            </h2>
            <p className="text-2xl text-primary-grey leading-relaxed">
              This is a transformation of mindset and culture that will be with you for life. 
              Your people will leave with clarity, motivation, and a renewed drive to create 
              results that matter both personally and professionally.
            </p>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <GradientButton onClick={scrollToContact} className="text-lg">
                Take the Next Step
              </GradientButton>
            </motion.div>
          </AnimatedSection>
        </section>
      </main>
    </>
  )
}