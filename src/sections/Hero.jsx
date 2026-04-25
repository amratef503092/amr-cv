import { FaEnvelope, FaPhone, FaLinkedin } from 'react-icons/fa'
import { motion } from 'framer-motion'
import ParticleField from '../components/ParticleField'
import PhoneMockup from '../components/PhoneMockup'
import ScrollReveal from '../components/ScrollReveal'

const PHONES = [
  { emoji: '🏛️', label: 'Tawuniya', gradient: 'linear-gradient(180deg,#312e81,#4338ca,#6366f1)', rotateY: 22, rotateX: 5, offsetY: -10, size: 'sm', floatDuration: 7, floatDelay: 0 },
  { emoji: '📈', label: 'Beltone', gradient: 'linear-gradient(180deg,#4f46e5,#6366f1,#818cf8)', rotateY: -2, rotateX: 3, offsetY: 0, size: 'lg', floatDuration: 6, floatDelay: 1 },
  { emoji: '👔', label: 'Kafey', gradient: 'linear-gradient(180deg,#6d28d9,#7c3aed,#8b5cf6)', rotateY: -20, rotateX: 5, offsetY: -6, size: 'sm', floatDuration: 8, floatDelay: 0.5 },
]

export default function Hero({ profile }) {
  const p = {
    name: 'Amr Atef Goda',
    title: 'Flutter Developer',
    summary: '3+ years building enterprise mobile apps for insurance, fintech & more.',
    email: 'eng.amr.atef.goda@gmail.com',
    phone: '+201030193111',
    linkedin: 'amr-atef',
    ...profile,
  }

  return (
    <section className="hero-section">
      <ParticleField count={50} />
      <div className="hero-inner">
        <div className="hero-text">
          <ScrollReveal variant="fadeInUp">
            <span className="hero-badge">
              <span className="pulse-dot" />
              Available for opportunities
            </span>
          </ScrollReveal>
          <ScrollReveal variant="fadeInUp" delay={0.1}>
            <span className="gradient-accent" />
            <h1 className="hero-name">{p.name}</h1>
          </ScrollReveal>
          <ScrollReveal variant="fadeInUp" delay={0.2}>
            <p className="hero-title">{p.title} · Software Engineer</p>
          </ScrollReveal>
          <ScrollReveal variant="fadeInUp" delay={0.3}>
            <p className="hero-summary">{p.summary}</p>
          </ScrollReveal>
          <ScrollReveal variant="fadeInUp" delay={0.4}>
            <div className="hero-cta">
              <motion.a href="#contact" className="btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Hire Me</motion.a>
              <motion.a href="#projects" className="btn-secondary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>See Work</motion.a>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="fadeInUp" delay={0.5}>
            <div className="hero-socials">
              <motion.a href={`mailto:${p.email}`} whileHover={{ scale: 1.2, y: -3 }}><FaEnvelope /></motion.a>
              <motion.a href={`tel:${p.phone}`} whileHover={{ scale: 1.2, y: -3 }}><FaPhone /></motion.a>
              <motion.a href={`https://linkedin.com/in/${p.linkedin}`} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, y: -3 }}><FaLinkedin /></motion.a>
            </div>
          </ScrollReveal>
        </div>
        <ScrollReveal variant="fadeInRight" delay={0.2}>
          <div className="hero-phones">
            {PHONES.map((phone) => (<PhoneMockup key={phone.label} {...phone} />))}
          </div>
        </ScrollReveal>
      </div>
      <motion.div className="scroll-indicator" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <div className="mouse"><div className="wheel" /></div>
      </motion.div>
    </section>
  )
}
