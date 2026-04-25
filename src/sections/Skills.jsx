import { motion } from 'framer-motion'
import GlassCard from '../components/Glass/GlassCard'
import ScrollReveal from '../components/ScrollReveal'

const DEFAULT_SKILLS = [
  { name: 'Flutter', level: 95, icon: '🐦' },
  { name: 'Dart', level: 90, icon: '🎯' },
  { name: 'Firebase', level: 85, icon: '🔥' },
  { name: 'BLoC / MVVM', level: 90, icon: '🔄' },
  { name: 'Clean Architecture', level: 85, icon: '🏗️' },
  { name: 'REST API', level: 88, icon: '🌐' },
  { name: 'Git', level: 85, icon: '🔗' },
  { name: 'Mobile Security', level: 80, icon: '🛡️' },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Skills({ skills = [] }) {
  const data = skills.length > 0 ? skills : DEFAULT_SKILLS

  return (
    <section className="section-container" id="skills">
      <ScrollReveal variant="fadeInUp">
        <span className="gradient-accent" />
        <h2 className="section-title">Technical Skills</h2>
        <p className="section-subtitle">What I bring to the table</p>
      </ScrollReveal>
      <motion.div className="skills-grid" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={container}>
        {data.map((skill) => (
          <motion.div key={skill.id || skill.name} variants={item}>
            <GlassCard className="skill-card">
              <div className="skill-icon">{skill.icon || '💡'}</div>
              <h3 className="skill-name">{skill.name}</h3>
              <div className="skill-bar-bg">
                <motion.div
                  className="skill-bar-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                />
              </div>
              <span className="skill-percent">{skill.level}%</span>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
