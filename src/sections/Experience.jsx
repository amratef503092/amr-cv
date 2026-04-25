import { FaMapMarkerAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'
import GlassCard from '../components/Glass/GlassCard'
import ScrollReveal from '../components/ScrollReveal'

const DEFAULT_EXPERIENCES = [
  {
    company: 'Tawuniya SA', role: 'Senior Flutter Developer', period: 'Oct 2025 – Present', location: 'Saudi Arabia', current: true,
    description: "Lead development of mobile applications for Saudi Arabia's leading insurance provider\nArchitect features for policy management, claims submission, and customer portals\nImplement secure payment systems and insurance claim processing workflows",
  },
  {
    company: 'Beltone Holding', role: 'Flutter Developer', period: 'Dec 2024 – Oct 2025', location: 'Egypt', current: false,
    description: 'Optimized Beltone stock trading application for Egyptian stock exchange\nIntegrated payment gateways including Visa, Fawry\nImplemented robust security measures for financial transactions',
  },
  {
    company: 'Msar (Brand Design & Advertising)', role: 'Flutter Developer', period: 'Apr 2024 – Dec 2024', location: 'Riyadh, Saudi Arabia', current: false,
    description: 'Architected cross-platform mobile applications with Flutter\nCollaborated with design teams to craft user-centric interfaces\nConducted code reviews and mentored development team',
  },
]

export default function Experience({ experiences = [] }) {
  const data = experiences.length > 0 ? experiences : DEFAULT_EXPERIENCES

  return (
    <section className="section-container" id="experience">
      <ScrollReveal variant="fadeInUp">
        <span className="gradient-accent" />
        <h2 className="section-title">Work Experience</h2>
        <p className="section-subtitle">My professional journey</p>
      </ScrollReveal>
      <div className="timeline">
        {data.map((exp, i) => (
          <ScrollReveal key={exp.id || exp.company} variant="fadeInLeft" delay={i * 0.1}>
            <div className="timeline-row">
              <div className="timeline-dot-col">
                <motion.div
                  className="timeline-dot"
                  animate={exp.current ? { boxShadow: ['0 0 0 0 rgba(99,102,241,0.5)', '0 0 0 10px rgba(99,102,241,0)', '0 0 0 0 rgba(99,102,241,0)'] } : {}}
                  transition={exp.current ? { duration: 1.5, repeat: Infinity } : {}}
                />
                {i < data.length - 1 && <div className="timeline-line" />}
              </div>
              <GlassCard className="timeline-card">
                <div className="timeline-header">
                  <h3 className="timeline-role">{exp.role}</h3>
                  <span className="timeline-period">{exp.period}</span>
                </div>
                <p className="timeline-company">{exp.company}</p>
                <p className="timeline-location"><FaMapMarkerAlt /> {exp.location}</p>
                <ul className="timeline-bullets">
                  {exp.description.split('\n').map((item, j) => (<li key={j}>{item}</li>))}
                </ul>
              </GlassCard>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
