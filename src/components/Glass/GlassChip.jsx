import { motion } from 'framer-motion'

export default function GlassChip({ label, icon }) {
  return (
    <motion.span
      className="glass-chip"
      whileHover={{ boxShadow: '0 0 20px rgba(99,102,241,0.4)', borderColor: 'rgba(99,102,241,0.6)', y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {icon && <span className="glass-chip-icon">{icon}</span>}
      {label}
    </motion.span>
  )
}
