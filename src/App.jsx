import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaGitAlt, FaApple
} from 'react-icons/fa'
import { SiFlutter, SiFirebase, SiGoogleplay } from 'react-icons/si'
import { getProfile, getExperiences, getProjects, getEducation, getSkills } from './lib/api'
import './App.css'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

// Floating particles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }))

  return (
    <div className="particles-container">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  )
}

// Hero Section
const Hero = ({ profile }) => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 200])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const defaultProfile = {
    name: 'Amr Atef Goda',
    title: 'Flutter Developer | Software Engineer',
    summary: 'Highly effective Software Engineer with 3+ years of experience specializing in Flutter application development for enterprise solutions.',
    email: 'eng.amr.atef.goda@gmail.com',
    phone: '+201030193111',
    linkedin: 'amr-atef'
  }

  const data = { ...defaultProfile, ...profile }

  return (
    <motion.section
      className="hero"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <FloatingParticles />
      <motion.div className="hero-content" style={{ y, opacity }}>
        <motion.div className="hero-badge" variants={fadeInUp}>
          <span className="pulse-dot"></span>
          Available for opportunities
        </motion.div>
        
        <motion.h1 variants={fadeInUp}>
          <span className="gradient-text">{data.name}</span>
        </motion.h1>
        
        <motion.div className="title-wrapper" variants={fadeInUp}>
          <h2 className="typewriter">
            <span className="text-primary">Flutter Developer</span>
            <span className="text-separator">|</span>
            <span className="text-secondary">Software Engineer</span>
          </h2>
        </motion.div>
        
        <motion.p className="hero-description" variants={fadeInUp}>
          {data.summary}
        </motion.p>
        
        <motion.div className="hero-cta" variants={fadeInUp}>
          <motion.a 
            href="#contact" 
            className="btn btn-primary"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(102, 126, 234, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.a>
          <motion.a 
            href="#projects" 
            className="btn btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
          </motion.a>
        </motion.div>
        
        <motion.div className="social-links" variants={fadeInUp}>
          <motion.a 
            href={`mailto:${data.email}`}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaEnvelope />
          </motion.a>
          <motion.a 
            href={data.phone ? `tel:${data.phone}` : '#'}
            whileHover={{ scale: 1.2, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaPhone />
          </motion.a>
          <motion.a 
            href={`https://linkedin.com/in/${data.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaLinkedin />
          </motion.a>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </motion.div>
    </motion.section>
  )
}

// Skills Section
const Skills = ({ skillsData = [] }) => {
  const defaultSkills = [
    { name: 'Flutter', level: 95, color: '#42A5F5' },
    { name: 'Dart', level: 90, color: '#00B4AB' },
    { name: 'Firebase', level: 85, color: '#FFCA28' },
    { name: 'Git', level: 85, color: '#F05032' },
    { name: 'State Management', level: 90, color: '#AB47BC' },
    { name: 'API Integration', level: 88, color: '#66BB6A' },
    { name: 'Clean Architecture', level: 85, color: '#FF7043' },
    { name: 'Mobile Security', level: 80, color: '#EC407A' },
  ]

  const skills = skillsData.length > 0 ? skillsData : defaultSkills

  return (
    <motion.section
      id="skills"
      className="skills-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={staggerContainer}
    >
      <motion.div className="section-header" variants={fadeInUp}>
        <h2 className="section-title">
          <span className="underline-animation">Technical Skills</span>
        </h2>
        <p className="section-subtitle">Technologies I work with</p>
      </motion.div>

      <motion.div className="skills-grid" variants={staggerContainer}>
        {skills.map((skill, index) => (
          <motion.div
            key={skill.id || skill.name}
            className="skill-card"
            variants={scaleIn}
            whileHover={{
              scale: 1.05,
              y: -10,
              boxShadow: `0 20px 40px ${skill.color}33`
            }}
            style={{ '--skill-color': skill.color }}
          >
            <div className="skill-icon" style={{ color: skill.color }}>
              {skill.name === 'Flutter' && <SiFlutter />}
              {skill.name === 'Firebase' && <SiFirebase />}
              {skill.name === 'Git' && <FaGitAlt />}
            </div>
            <h3>{skill.name}</h3>
            <div className="skill-bar">
              <motion.div
                className="skill-progress"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                style={{ backgroundColor: skill.color }}
              />
            </div>
            <span className="skill-level">{skill.level}%</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}

// Experience Section
const Experience = ({ experiencesData = [] }) => {
  const defaultExperiences = [
    {
      company: 'Tawuniya SA',
      role: 'Senior Flutter Developer',
      period: 'October 2025 - Present',
      location: 'Saudi Arabia',
      description: 'Lead development of mobile applications for Saudi Arabia\'s leading insurance provider\nArchitect features for policy management, claims submission, and customer portals\nImplement secure payment systems and insurance claim processing workflows',
      color: '#6366F1'
    },
    {
      company: 'Beltone Holding',
      role: 'Flutter Developer',
      period: 'Dec 2024 - October 2025',
      location: 'Egypt',
      description: 'Optimized Belton stock trading application for Egyptian stock exchange\nIntegrated payment gateways including Visa, Fawry\nImplemented robust security measures for financial transactions',
      color: '#EC407A'
    },
    {
      company: 'Msar (Brand Design & Advertising)',
      role: 'Flutter Developer',
      period: 'Apr 2024 - Dec 2024',
      location: 'Riyadh, Saudi Arabia',
      description: 'Architected cross-platform mobile applications with Flutter\nCollaborated with design teams to craft user-centric interfaces\nConducted code reviews and mentored development team',
      color: '#42A5F5'
    }
  ]

  const experiences = experiencesData.length > 0 ? experiencesData : defaultExperiences

  return (
    <motion.section
      id="experience"
      className="experience-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={staggerContainer}
    >
      <motion.div className="section-header" variants={fadeInUp}>
        <h2 className="section-title">
          <span className="underline-animation">Work Experience</span>
        </h2>
        <p className="section-subtitle">My professional journey</p>
      </motion.div>

      <div className="timeline">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id || exp.company}
            className="timeline-item"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
          >
            <motion.div
              className="timeline-dot"
              style={{ backgroundColor: exp.color }}
              whileHover={{ scale: 1.3 }}
            />
            <motion.div
              className="timeline-content"
              whileHover={{ x: 10 }}
              style={{ '--timeline-color': exp.color }}
            >
              <div className="timeline-header">
                <h3>{exp.role}</h3>
                <span className="timeline-period">{exp.period}</span>
              </div>
              <h4 className="timeline-company">{exp.company}</h4>
              <p className="timeline-location">
                <FaMapMarkerAlt /> {exp.location}
              </p>
              <ul className="timeline-details">
                {exp.description.split('\n').map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

// Projects Section
const Projects = ({ projectsData = [] }) => {
  const defaultProjects = [
    {
      name: 'Tawuniya',
      description: 'Insurance application for policy management, claims, and customer services',
      platforms: ['Android', 'iOS'],
      color: '#6366F1',
      android_url: 'https://play.google.com/store/apps/details?id=com.tawuniya',
      ios_url: 'https://apps.apple.com/app/tawuniya'
    },
    {
      name: 'Beltone',
      description: 'Stock trading application for Egyptian stock exchange',
      platforms: ['Android', 'iOS'],
      color: '#EC407A',
      android_url: 'https://play.google.com/store/apps/details?id=com.beltone',
      ios_url: 'https://apps.apple.com/app/beltone'
    },
    {
      name: 'Kafey',
      description: 'HR management application for employee services',
      platforms: ['Android', 'iOS'],
      color: '#42A5F5',
      ios_url: 'https://apps.apple.com/app/kafey'
    },
    {
      name: 'London Eyes',
      description: 'Smart tour guide app for London landmarks, events, and recommendations',
      platforms: ['Android', 'iOS'],
      color: '#AB47BC',
      android_url: 'https://play.google.com/store/apps/details?id=com.londoneyes',
      ios_url: 'https://apps.apple.com/app/london-eyes'
    }
  ]

  const projects = projectsData.length > 0 ? projectsData : defaultProjects

  return (
    <motion.section
      id="projects"
      className="projects-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={staggerContainer}
    >
      <motion.div className="section-header" variants={fadeInUp}>
        <h2 className="section-title">
          <span className="underline-animation">Featured Projects</span>
        </h2>
        <p className="section-subtitle">Apps I've built</p>
      </motion.div>

      <motion.div className="projects-grid" variants={staggerContainer}>
        {projects.map((project, index) => (
          <motion.div
            key={project.id || project.name}
            className="project-card"
            variants={scaleIn}
            whileHover={{
              y: -10,
              boxShadow: `0 25px 50px ${project.color}44`
            }}
            style={{ '--project-color': project.color }}
          >
            <div className="project-icon" style={{ backgroundColor: `${project.color}22` }}>
              <SiFlutter style={{ color: project.color }} />
            </div>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <div className="project-platforms">
              {(project.platforms || ['Android', 'iOS']).map(platform => (
                <span key={platform} className="platform-tag">{platform}</span>
              ))}
            </div>
            <div className="project-links">
              {project.android_url && (
                <motion.a
                  href={project.android_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <SiGoogleplay />
                </motion.a>
              )}
              {project.ios_url && (
                <motion.a
                  href={project.ios_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaApple />
                </motion.a>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}

// Education Section
const Education = ({ educationData = [] }) => {
  const defaultEducation = [
    {
      degree: 'Bachelor of Computer Science',
      school: 'Modern Academy',
      period: '2019 - 2023',
      gpa: '3.0',
      details: ['Graduation Project: A+']
    }
  ]

  const defaultCertificates = [
    'Flutter & Dart Complete Development Course | Udemy 2023',
    'Flutter Advanced Course Bloc and MVVM | Udemy 2023',
    'Google Challenge Solutions | 2nd Place Hackathon 2022',
    'Flutter Diploma | IT Sharks 2021-2022',
    'Certificates: Orange Digital Center, IT Sharks'
  ]

  const education = educationData.length > 0 ? educationData : defaultEducation

  return (
    <motion.section
      id="education"
      className="education-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={staggerContainer}
    >
      <motion.div className="section-header" variants={fadeInUp}>
        <h2 className="section-title">
          <span className="underline-animation">Education & Certificates</span>
        </h2>
        <p className="section-subtitle">My learning journey</p>
      </motion.div>

      <div className="education-grid">
        <motion.div
          className="education-card main-degree"
          variants={fadeInLeft}
          whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)' }}
        >
          <div className="education-icon">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              🎓
            </motion.div>
          </div>
          <h3>{education[0]?.degree || 'Bachelor of Computer Science'}</h3>
          <h4>{education[0]?.school || 'Modern Academy'}</h4>
          <p className="education-period">{education[0]?.period || '2019 - 2023'}</p>
          <div className="education-details">
            <span className="gpa">GPA: {education[0]?.gpa || '3.0'}</span>
            <span className="project">Graduation Project: A+</span>
          </div>
        </motion.div>

        <div className="certificates-grid">
          {defaultCertificates.map((cert, index) => (
            <motion.div
              key={index}
              className="certificate-card"
              variants={scaleIn}
              whileHover={{
                x: 5,
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.2)'
              }}
            >
              <span className="cert-icon">📜</span>
              <p>{cert}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="membership-card"
        variants={fadeInUp}
        whileHover={{ scale: 1.02 }}
      >
        <div className="membership-icon">🌟</div>
        <h3>GDSC Cairo - Flutter Head</h3>
        <p>Leading Flutter community initiatives and mentoring developers</p>
      </motion.div>
    </motion.section>
  )
}

// Contact Section
const Contact = ({ profile }) => {
  const defaultProfile = {
    email: 'eng.amr.atef.goda@gmail.com',
    phone: '+201030193111',
    location: 'Cairo, Egypt',
    linkedin: 'amr-atef'
  }
  
  const data = { ...defaultProfile, ...profile }
  
  const contactInfo = [
    { icon: FaEnvelope, label: 'Email', value: data.email, href: `mailto:${data.email}` },
    { icon: FaPhone, label: 'Phone', value: data.phone, href: data.phone ? `tel:${data.phone}` : null },
    { icon: FaMapMarkerAlt, label: 'Location', value: data.location, href: null },
    { icon: FaLinkedin, label: 'LinkedIn', value: `linkedin.com/in/${data.linkedin}`, href: data.linkedin ? `https://linkedin.com/in/${data.linkedin}` : null },
  ]

  return (
    <motion.section 
      id="contact" 
      className="contact-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <FloatingParticles />
      
      <motion.div className="section-header" variants={fadeInUp}>
        <h2 className="section-title">
          <span className="underline-animation">Get In Touch</span>
        </h2>
        <p className="section-subtitle">Let's work together</p>
      </motion.div>
      
      <motion.div className="contact-content" variants={staggerContainer}>
        <motion.div className="contact-text" variants={fadeInLeft}>
          <h3>Let's build something amazing together!</h3>
          <p>
            I'm always open to discussing new projects, creative ideas, or 
            opportunities to be part of your vision. Whether you need a 
            high-performance mobile app or want to discuss Flutter development, 
            feel free to reach out!
          </p>
          
          <div className="contact-cards">
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.label}
                className="contact-card"
                variants={scaleIn}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: '0 15px 35px rgba(102, 126, 234, 0.3)'
                }}
              >
                <item.icon />
                <span>{item.label}</span>
                {item.href ? (
                  <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined}>
                    {item.value}
                  </a>
                ) : (
                  <span>{item.value}</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.form 
          className="contact-form"
          variants={fadeInRight}
          onSubmit={(e) => e.preventDefault()}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <input type="text" placeholder="Your Name" required />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <input type="email" placeholder="Your Email" required />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <textarea placeholder="Your Message" rows="5" required></textarea>
          </motion.div>
          <motion.button
            type="submit"
            className="btn btn-primary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.section>
  )
}

// Footer
const Footer = () => {
  return (
    <footer className="footer">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p>© 2026 Amr Atef Goda. Built with 💙 using React & Framer Motion</p>
        <div className="footer-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/amr-atef" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
        </div>
      </motion.div>
    </footer>
  )
}

// Main App
function App() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [data, setData] = useState({
    profile: null,
    experiences: [],
    projects: [],
    education: [],
    skills: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [profile, experiences, projects, education, skills] = await Promise.all([
        getProfile(),
        getExperiences(),
        getProjects(),
        getEducation(),
        getSkills()
      ])
      setData({ profile, experiences: experiences || [], projects: projects || [], education: education || [], skills: skills || [] })
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="App" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          style={{ fontSize: 40 }}
        >
          🚀
        </motion.div>
      </div>
    )
  }

  return (
    <div className="App">
      <Hero profile={data.profile} />
      <Skills skillsData={data.skills} />
      <Experience experiencesData={data.experiences} />
      <Projects projectsData={data.projects} />
      <Education educationData={data.education} />
      <Contact profile={data.profile} />
      <Footer />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="scroll-top"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
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
