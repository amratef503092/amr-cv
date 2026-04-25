import { useState } from 'react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import GlassCard from '../components/Glass/GlassCard'
import ParticleField from '../components/ParticleField'
import ScrollReveal from '../components/ScrollReveal'

export default function Contact({ profile }) {
  const [sent, setSent] = useState(false)
  const p = { email: 'eng.amr.atef.goda@gmail.com', phone: '+201030193111', location: 'Cairo, Egypt', linkedin: 'amr-atef', ...profile }

  const contacts = [
    { Icon: FaEnvelope, label: 'Email', value: p.email, href: `mailto:${p.email}` },
    { Icon: FaPhone, label: 'Phone', value: p.phone, href: `tel:${p.phone}` },
    { Icon: FaMapMarkerAlt, label: 'Location', value: p.location, href: null },
    { Icon: FaLinkedin, label: 'LinkedIn', value: `linkedin.com/in/${p.linkedin}`, href: `https://linkedin.com/in/${p.linkedin}` },
  ]

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section className="contact-section" id="contact">
      <ParticleField count={30} />
      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <ScrollReveal variant="fadeInUp">
          <span className="gradient-accent" />
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Let's build something amazing together</p>
        </ScrollReveal>
        <div className="contact-layout">
          <ScrollReveal variant="fadeInLeft">
            <div className="contact-info">
              <h3 className="contact-headline">Open to new opportunities</h3>
              <p className="contact-body">Whether you need a high-performance mobile app or want to discuss Flutter development, I'm ready to help turn your idea into reality.</p>
              <div className="contact-cards">
                {contacts.map(({ Icon, label, value, href }) => (
                  <GlassCard key={label} className="contact-card">
                    <Icon className="contact-icon" />
                    <div>
                      <p className="contact-label">{label}</p>
                      <div className="contact-value">
                        {href ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{value}</a> : <span>{value}</span>}
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="fadeInRight">
            <GlassCard className="contact-form-card">
              <form onSubmit={handleSubmit} className="contact-form">
                <input type="text" placeholder="Your Name" required className="form-input" />
                <input type="email" placeholder="Your Email" required className="form-input" />
                <textarea placeholder="Your Message" rows={5} required className="form-input form-textarea" />
                <motion.button type="submit" className="btn-primary" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  Send Message
                </motion.button>
              </form>
              <AnimatePresence>
                {sent && (
                  <motion.div className="form-success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    ✅ Message sent! I'll get back to you soon.
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
