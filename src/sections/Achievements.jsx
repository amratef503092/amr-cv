import { motion } from 'framer-motion'
import GlassCard from '../components/Glass/GlassCard'
import AnimatedCounter from '../components/AnimatedCounter'
import ScrollReveal from '../components/ScrollReveal'

const ACHIEVEMENTS = [
  { icon: '🏆', title: 'Google Hackathon', subtitle: '2nd Place — 2022', counter: null },
  { icon: '🌟', title: 'GDSC Cairo', subtitle: 'Flutter Head', counter: null },
  { icon: '📱', title: 'Apps Shipped', subtitle: 'Enterprise-grade', counter: 6, suffix: '+' },
  { icon: '📜', title: 'Certifications', subtitle: 'Udemy, Google & more', counter: 5, suffix: '+' },
  { icon: '⏱️', title: 'Years Experience', subtitle: 'Flutter & Mobile', counter: 3, suffix: '+' },
  { icon: '🌍', title: 'Countries', subtitle: 'KSA, Egypt, UK apps', counter: 3, suffix: '' },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Achievements() {
  return (
    <section className="section-container" id="achievements">
      <ScrollReveal variant="fadeInUp">
        <span className="gradient-accent" />
        <h2 className="section-title">Achievements</h2>
        <p className="section-subtitle">Milestones that define my journey</p>
      </ScrollReveal>
      <motion.div className="achievements-grid" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={container}>
        {ACHIEVEMENTS.map((a) => (
          <motion.div key={a.title} variants={item}>
            <GlassCard className="achievement-card">
              <div className="achievement-icon">{a.icon}</div>
              <div className="achievement-count">
                {a.counter !== null ? <AnimatedCounter to={a.counter} suffix={a.suffix} /> : null}
              </div>
              <h3 className="achievement-title">{a.title}</h3>
              <p className="achievement-sub">{a.subtitle}</p>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
