import { FaApple } from 'react-icons/fa'
import { SiGoogleplay } from 'react-icons/si'
import { motion } from 'framer-motion'
import GlassCard from '../components/Glass/GlassCard'
import PhoneMockup from '../components/PhoneMockup'
import ScrollReveal from '../components/ScrollReveal'

const DEFAULT_PROJECTS = [
  { name: 'Tawuniya', description: 'Insurance application for policy management, claims, and customer services', emoji: '🏛️', gradient: 'linear-gradient(180deg,#312e81,#4338ca,#6366f1)', platforms: ['Android', 'iOS'], android_url: 'https://play.google.com/store/apps/details?id=com.tawuniya', ios_url: 'https://apps.apple.com/app/tawuniya' },
  { name: 'Beltone', description: 'Stock trading application for Egyptian stock exchange with real-time data', emoji: '📈', gradient: 'linear-gradient(180deg,#4f46e5,#6366f1,#818cf8)', platforms: ['Android', 'iOS'], android_url: 'https://play.google.com/store/apps/details?id=com.beltone', ios_url: 'https://apps.apple.com/app/beltone' },
  { name: 'Kafey', description: 'HR management application for employee services and workflows', emoji: '👔', gradient: 'linear-gradient(180deg,#6d28d9,#7c3aed,#8b5cf6)', platforms: ['iOS'], ios_url: 'https://apps.apple.com/app/kafey' },
  { name: 'London Eyes', description: 'Smart tour guide for London landmarks, events, and recommendations', emoji: '👁️', gradient: 'linear-gradient(180deg,#5b21b6,#6d28d9,#7c3aed)', platforms: ['Android', 'iOS'], android_url: 'https://play.google.com/store/apps/details?id=com.londoneyes', ios_url: 'https://apps.apple.com/app/london-eyes' },
]

const FLOAT_DELAYS = [0, 1.2, 0.6, 1.8]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Projects({ projects = [] }) {
  const data = projects.length > 0
    ? projects.map((p) => ({ ...(DEFAULT_PROJECTS.find((d) => d.name === p.name) || DEFAULT_PROJECTS[0]), ...p }))
    : DEFAULT_PROJECTS

  return (
    <section className="section-container" id="projects">
      <ScrollReveal variant="fadeInUp">
        <span className="gradient-accent" />
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">Apps I've built and shipped</p>
      </ScrollReveal>
      <motion.div className="projects-grid" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={container}>
        {data.map((project, i) => (
          <motion.div key={project.id || project.name} variants={item}>
            <GlassCard className="project-card">
              <div className="project-phone-col">
                <PhoneMockup
                  emoji={project.emoji || '📱'}
                  gradient={project.gradient || 'linear-gradient(180deg,#4f46e5,#7c3aed)'}
                  label={project.name}
                  floatDuration={7}
                  floatDelay={FLOAT_DELAYS[i % FLOAT_DELAYS.length]}
                  size="md"
                />
              </div>
              <div className="project-info">
                <h3 className="project-name">{project.name}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tags">
                  {(project.platforms || ['Android', 'iOS']).map((p) => (<span key={p} className="platform-tag">{p}</span>))}
                </div>
                <div className="project-links">
                  {project.android_url && (
                    <motion.a href={project.android_url} target="_blank" rel="noopener noreferrer" className="store-link" whileHover={{ scale: 1.05 }}>
                      <SiGoogleplay /> Play Store
                    </motion.a>
                  )}
                  {project.ios_url && (
                    <motion.a href={project.ios_url} target="_blank" rel="noopener noreferrer" className="store-link" whileHover={{ scale: 1.05 }}>
                      <FaApple /> App Store
                    </motion.a>
                  )}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
