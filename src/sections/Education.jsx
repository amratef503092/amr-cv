import { motion } from 'framer-motion'
import GlassCard from '../components/Glass/GlassCard'
import ScrollReveal from '../components/ScrollReveal'

const DEFAULT_EDUCATION = [{ degree: 'Bachelor of Computer Science', school: 'Modern Academy', period: '2019 – 2023', gpa: '3.0' }]

const CERTIFICATES = [
  '🎓 Flutter & Dart Complete Development Course — Udemy 2023',
  '🎓 Flutter Advanced Course Bloc and MVVM — Udemy 2023',
  '🏆 Google Challenge Solutions — 2nd Place Hackathon 2022',
  '📜 Flutter Diploma — IT Sharks 2021–2022',
  '📜 Orange Digital Center Certificate',
]

export default function Education({ education = [] }) {
  const edu = education.length > 0 ? education[0] : DEFAULT_EDUCATION[0]

  return (
    <section className="section-container" id="education">
      <ScrollReveal variant="fadeInUp">
        <span className="gradient-accent" />
        <h2 className="section-title">Education & Certificates</h2>
        <p className="section-subtitle">My learning journey</p>
      </ScrollReveal>
      <div className="education-layout">
        <ScrollReveal variant="fadeInLeft">
          <GlassCard className="education-main-card">
            <motion.div className="edu-icon" animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }}>🎓</motion.div>
            <h3 className="edu-degree">{edu.degree || 'Bachelor of Computer Science'}</h3>
            <p className="edu-school">{edu.school || 'Modern Academy'}</p>
            <p className="edu-period">{edu.period || '2019 – 2023'}</p>
            <div className="edu-badges">
              <span className="edu-badge edu-badge--gpa">GPA: {edu.gpa || '3.0'}</span>
              <span className="edu-badge edu-badge--grade">Graduation Project: A+</span>
            </div>
            <div className="edu-gdsc">
              <span>🌟</span>
              <div>
                <p className="gdsc-title">GDSC Cairo — Flutter Head</p>
                <p className="gdsc-sub">Leading Flutter community & mentoring developers</p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
        <div className="certificates-list">
          {CERTIFICATES.map((cert, i) => (
            <ScrollReveal key={i} variant="fadeInRight" delay={i * 0.08}>
              <GlassCard className="cert-card"><p>{cert}</p></GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
