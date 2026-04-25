import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { getProfile, getExperiences, getProjects, getEducation, getSkills } from './lib/api'
import Hero from './sections/Hero'
import WhatIBuild from './sections/WhatIBuild'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Education from './sections/Education'
import Achievements from './sections/Achievements'
import Contact from './sections/Contact'

function App() {
  const [data, setData] = useState({ profile: null, experiences: [], projects: [], education: [], skills: [] })
  const [loading, setLoading] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    Promise.all([getProfile(), getExperiences(), getProjects(), getEducation(), getSkills()])
      .then(([profile, experiences, projects, education, skills]) =>
        setData({ profile, experiences: experiences || [], projects: projects || [], education: education || [], skills: skills || [] })
      )
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (loading) {
    return (
      <div className="loading-screen">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
          <span style={{ fontSize: 48 }}>🚀</span>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="app">
      <Hero profile={data.profile} />
      <WhatIBuild />
      <Skills skills={data.skills} />
      <Experience experiences={data.experiences} />
      <Projects projects={data.projects} />
      <Education education={data.education} />
      <Achievements />
      <Contact profile={data.profile} />
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="scroll-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
