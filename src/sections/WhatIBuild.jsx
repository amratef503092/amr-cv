import { motion } from 'framer-motion'
import GlassChip from '../components/Glass/GlassChip'
import ScrollReveal from '../components/ScrollReveal'

const TECH = [
  { icon: '📱', label: 'Flutter Apps' },
  { icon: '🎯', label: 'Dart' },
  { icon: '🔥', label: 'Firebase' },
  { icon: '💳', label: 'Payment SDKs' },
  { icon: '🏗️', label: 'Clean Architecture' },
  { icon: '🔄', label: 'BLoC / MVVM' },
  { icon: '🌐', label: 'REST APIs' },
  { icon: '🛡️', label: 'Mobile Security' },
  { icon: '🍎', label: 'iOS & Android' },
  { icon: '🔗', label: 'Git' },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function WhatIBuild() {
  return (
    <section className="section-container" id="what-i-build">
      <ScrollReveal variant="fadeInUp">
        <span className="gradient-accent" />
        <h2 className="section-title">What I Build</h2>
        <p className="section-subtitle">Technologies I work with every day</p>
      </ScrollReveal>
      <motion.div className="chips-grid" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={container}>
        {TECH.map((t) => (
          <motion.div key={t.label} variants={item}><GlassChip icon={t.icon} label={t.label} /></motion.div>
        ))}
      </motion.div>
    </section>
  )
}
