import { motion } from 'framer-motion'

const SIZES = {
  sm: { width: 44, height: 82, borderRadius: 11, fontSize: 16, labelSize: 6 },
  md: { width: 54, height: 100, borderRadius: 14, fontSize: 20, labelSize: 7 },
  lg: { width: 62, height: 116, borderRadius: 16, fontSize: 24, labelSize: 8 },
}

export default function PhoneMockup({ emoji, gradient, label, floatDuration = 6, floatDelay = 0, rotateY = 0, rotateX = 0, offsetY = 0, size = 'md' }) {
  const s = SIZES[size]
  return (
    <motion.div
      style={{
        transform: `perspective(600px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
        width: s.width, height: s.height, borderRadius: s.borderRadius,
        background: 'rgba(255,255,255,0.10)',
        border: '1px solid rgba(255,255,255,0.25)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 20px rgba(99,102,241,0.15)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden', flexShrink: 0,
        backdropFilter: 'blur(8px)',
      }}
      animate={{ y: [offsetY, offsetY - 14, offsetY] }}
      transition={{ duration: floatDuration, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}
    >
      <div style={{ height: 7, background: 'rgba(255,255,255,0.12)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: 14, height: 2, borderRadius: 1, background: 'rgba(255,255,255,0.35)' }} />
      </div>
      <div style={{ flex: 1, background: gradient, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <span style={{ fontSize: s.fontSize }}>{emoji}</span>
        <span style={{ fontSize: s.labelSize, color: 'rgba(255,255,255,0.8)', textAlign: 'center', padding: '0 6px', fontWeight: 600 }}>{label}</span>
      </div>
      <div style={{ height: 4, background: 'rgba(255,255,255,0.06)' }} />
    </motion.div>
  )
}
