# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild amratef.dev as a Glassmorphism 3D portfolio with tilt-on-hover, floating depth, and cinematic scroll reveal — on a `redesign` branch, keeping the live site untouched until merge.

**Architecture:** New `redesign` branch; same Supabase backend and React/Vite stack. All components split into `src/components/` (reusable) and `src/sections/` (page sections). One shared CSS file (`src/styles/redesign.css`) handles all layout and glass styles; a `design-tokens.css` holds all CSS custom properties.

**Tech Stack:** React 19, Framer Motion (already installed), @supabase/supabase-js (already installed), react-icons (already installed). Zero new dependencies.

---

## File Map

### New files
| File | Purpose |
|------|---------|
| `src/styles/design-tokens.css` | CSS custom properties (colors, spacing, glass vars) |
| `src/styles/redesign.css` | All layout, component, section, and responsive styles |
| `src/components/Glass/GlassCard.jsx` | Frosted glass card with 3D tilt on hover |
| `src/components/Glass/GlassChip.jsx` | Pill chip with glow on hover |
| `src/components/ScrollReveal.jsx` | Scroll-triggered animation wrapper |
| `src/components/ParticleField.jsx` | Floating dot particles (pure CSS, no canvas) |
| `src/components/AnimatedCounter.jsx` | Count-up number on scroll into view |
| `src/components/PhoneMockup.jsx` | 3D floating phone frame with app content |
| `src/sections/Hero.jsx` | Hero with text left, 3D phones right |
| `src/sections/WhatIBuild.jsx` | Tech chip grid |
| `src/sections/Skills.jsx` | Glass card grid with animated progress bars |
| `src/sections/Experience.jsx` | Vertical timeline |
| `src/sections/Projects.jsx` | 2-col project cards with phone mockup |
| `src/sections/Education.jsx` | Degree card + certificate list |
| `src/sections/Achievements.jsx` | Achievement grid with animated counters |
| `src/sections/Contact.jsx` | Contact info + form |

### Modified files
| File | Change |
|------|--------|
| `src/App.jsx` | Replace with new section assembly + Supabase data load |
| `src/index.css` | Minimal reset only; import design tokens + redesign CSS |

---

### Task 1: Create redesign branch + CSS design system

**Files:**
- Create: `src/styles/design-tokens.css`
- Create: `src/styles/redesign.css`
- Modify: `src/index.css`

- [ ] **Step 1: Create the redesign branch**

```bash
git checkout -b redesign
```

- [ ] **Step 2: Create `src/styles/design-tokens.css`**

```css
:root {
  --bg-base: #0f0c29;
  --bg-mid: #302b63;
  --bg-dark: #24243e;

  --indigo: #6366f1;
  --indigo-dark: #4f46e5;
  --violet: #8b5cf6;
  --lavender: #a78bfa;
  --indigo-light: #e0e7ff;

  --glass-bg: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.18);
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);

  --text-primary: rgba(255, 255, 255, 0.90);
  --text-secondary: rgba(255, 255, 255, 0.55);
  --text-muted: rgba(255, 255, 255, 0.30);
  --text-accent: #a78bfa;

  --section-max-width: 1100px;
}
```

- [ ] **Step 3: Create `src/styles/redesign.css`**

```css
/* ===== BASE ===== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { background: var(--bg-base); color: var(--text-primary); font-family: system-ui, -apple-system, sans-serif; overflow-x: hidden; }
a { text-decoration: none; color: inherit; }

/* ===== APP ===== */
.app { background: var(--bg-base); min-height: 100vh; }
.loading-screen { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--bg-base); }

/* ===== LAYOUT ===== */
.section-container { max-width: var(--section-max-width); margin: 0 auto; padding: 100px 24px; }

/* ===== GLASS CARD ===== */
.glass-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
  border-radius: 16px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: border-color 0.3s;
}
.glass-card:hover { border-color: rgba(99, 102, 241, 0.4); }

/* ===== GLASS CHIP ===== */
.glass-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 24px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  color: var(--text-primary);
  font-size: 14px;
  cursor: default;
  transition: border-color 0.2s;
}
.glass-chip-icon { font-size: 16px; }

/* ===== TYPOGRAPHY ===== */
.section-title {
  font-size: clamp(28px, 5vw, 42px);
  font-weight: 900;
  background: linear-gradient(135deg, var(--indigo-light), var(--lavender));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
  line-height: 1.2;
}
.section-subtitle { color: var(--text-secondary); font-size: 16px; margin-bottom: 48px; }
.gradient-accent {
  display: block;
  width: 48px;
  height: 3px;
  background: linear-gradient(90deg, var(--indigo), var(--violet));
  border-radius: 2px;
  margin-bottom: 12px;
}

/* ===== BUTTONS ===== */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: 30px;
  background: linear-gradient(135deg, var(--indigo), var(--violet));
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  border: none;
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.35);
}
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: 30px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  color: var(--text-primary);
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: border-color 0.3s;
}
.btn-secondary:hover { border-color: var(--indigo); }

/* ===== PARTICLES ===== */
.particle-field { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
.particle { position: absolute; border-radius: 50%; background: var(--indigo); opacity: 0; }

/* ===== SCROLL TOP ===== */
.scroll-top-btn {
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--indigo), var(--violet));
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  z-index: 100;
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
}

/* ===== HERO ===== */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--bg-base) 0%, var(--bg-mid) 50%, var(--bg-dark) 100%);
  position: relative;
  overflow: hidden;
  padding: 80px 24px;
}
.hero-inner { max-width: 1100px; width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 48px; position: relative; z-index: 1; }
.hero-text { flex: 1; display: flex; flex-direction: column; }
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: 20px;
  background: rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(99, 102, 241, 0.3);
  color: var(--lavender);
  font-size: 13px;
  margin-bottom: 20px;
  width: fit-content;
}
.pulse-dot { width: 8px; height: 8px; border-radius: 50%; background: #10b981; box-shadow: 0 0 8px #10b981; animation: pulse 2s infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
.hero-name {
  font-size: clamp(32px, 6vw, 56px);
  font-weight: 900;
  background: linear-gradient(135deg, #e0e7ff, var(--lavender));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  margin-bottom: 12px;
}
.hero-title { color: var(--text-accent); font-size: 16px; font-family: monospace; letter-spacing: 2px; margin-bottom: 16px; }
.hero-summary { color: var(--text-secondary); font-size: 15px; line-height: 1.7; max-width: 420px; margin-bottom: 28px; }
.hero-cta { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 28px; }
.hero-socials { display: flex; gap: 16px; }
.hero-socials a {
  width: 40px; height: 40px; border-radius: 50%;
  background: var(--glass-bg); border: 1px solid var(--glass-border);
  display: flex; align-items: center; justify-content: center;
  color: var(--lavender); font-size: 18px; transition: background 0.3s, border-color 0.3s;
}
.hero-socials a:hover { background: rgba(99, 102, 241, 0.2); border-color: var(--indigo); }
.hero-phones { display: flex; align-items: flex-end; gap: 14px; flex-shrink: 0; }
.scroll-indicator { position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%); z-index: 1; }
.mouse { width: 24px; height: 38px; border: 2px solid rgba(255,255,255,0.3); border-radius: 12px; display: flex; justify-content: center; padding-top: 6px; }
.wheel { width: 4px; height: 8px; background: var(--indigo); border-radius: 2px; animation: wheel 1.5s infinite; }
@keyframes wheel { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(12px); opacity: 0; } }

/* ===== WHAT I BUILD ===== */
.chips-grid { display: flex; flex-wrap: wrap; gap: 12px; }

/* ===== SKILLS ===== */
.skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }
.skill-card { padding: 20px; text-align: center; }
.skill-icon { font-size: 32px; margin-bottom: 10px; }
.skill-name { font-size: 15px; font-weight: 700; color: var(--text-primary); margin-bottom: 12px; }
.skill-bar-bg { height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden; margin-bottom: 8px; }
.skill-bar-fill { height: 100%; background: linear-gradient(90deg, var(--indigo), var(--violet)); border-radius: 3px; }
.skill-percent { font-size: 12px; color: var(--lavender); font-family: monospace; }

/* ===== EXPERIENCE ===== */
.timeline { display: flex; flex-direction: column; }
.timeline-row { display: flex; gap: 20px; }
.timeline-dot-col { display: flex; flex-direction: column; align-items: center; padding-top: 4px; }
.timeline-dot { width: 14px; height: 14px; border-radius: 50%; background: var(--indigo); border: 2px solid var(--bg-base); box-shadow: 0 0 10px rgba(99,102,241,0.5); flex-shrink: 0; z-index: 1; }
.timeline-line { width: 2px; flex: 1; min-height: 24px; background: linear-gradient(180deg, rgba(99,102,241,0.5), transparent); margin-top: 4px; }
.timeline-card { flex: 1; padding: 20px; margin-bottom: 20px; }
.timeline-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 4px; }
.timeline-role { font-size: 16px; font-weight: 700; color: var(--text-primary); }
.timeline-period { font-size: 12px; color: var(--lavender); font-family: monospace; white-space: nowrap; }
.timeline-company { font-size: 14px; font-weight: 600; color: var(--text-accent); margin-bottom: 4px; }
.timeline-location { font-size: 13px; color: var(--text-secondary); display: flex; align-items: center; gap: 4px; margin-bottom: 10px; }
.timeline-bullets { list-style: none; display: flex; flex-direction: column; gap: 6px; }
.timeline-bullets li { font-size: 13px; color: var(--text-secondary); padding-left: 16px; position: relative; line-height: 1.5; }
.timeline-bullets li::before { content: '▸'; position: absolute; left: 0; color: var(--indigo); }

/* ===== PROJECTS ===== */
.projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(440px, 1fr)); gap: 20px; }
.project-card { padding: 20px; display: flex; gap: 20px; align-items: center; }
.project-phone-col { flex-shrink: 0; }
.project-info { flex: 1; }
.project-name { font-size: 18px; font-weight: 800; color: var(--text-primary); margin-bottom: 8px; }
.project-desc { font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 12px; }
.project-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; }
.platform-tag { padding: 3px 10px; border-radius: 12px; background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.3); font-size: 11px; color: var(--lavender); }
.project-links { display: flex; gap: 10px; flex-wrap: wrap; }
.store-link { display: inline-flex; align-items: center; gap: 5px; padding: 6px 14px; border-radius: 20px; background: var(--glass-bg); border: 1px solid var(--glass-border); font-size: 12px; color: var(--text-primary); transition: background 0.2s, border-color 0.2s; }
.store-link:hover { background: rgba(99,102,241,0.2); border-color: var(--indigo); }

/* ===== EDUCATION ===== */
.education-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }
.education-main-card { padding: 28px; }
.edu-icon { font-size: 48px; margin-bottom: 16px; }
.edu-degree { font-size: 20px; font-weight: 800; color: var(--text-primary); margin-bottom: 6px; }
.edu-school { font-size: 16px; color: var(--lavender); margin-bottom: 4px; }
.edu-period { font-size: 14px; color: var(--text-muted); margin-bottom: 16px; }
.edu-badges { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
.edu-badge { padding: 4px 12px; border-radius: 16px; font-size: 12px; font-weight: 600; }
.edu-badge--gpa { background: rgba(99,102,241,0.2); color: var(--lavender); border: 1px solid rgba(99,102,241,0.3); }
.edu-badge--grade { background: rgba(16,185,129,0.15); color: #10b981; border: 1px solid rgba(16,185,129,0.3); }
.edu-gdsc { display: flex; gap: 12px; align-items: center; padding: 12px 16px; border-radius: 12px; background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.2); }
.edu-gdsc > span { font-size: 24px; }
.gdsc-title { font-size: 14px; font-weight: 700; color: var(--text-primary); }
.gdsc-sub { font-size: 12px; color: var(--text-secondary); }
.certificates-list { display: flex; flex-direction: column; gap: 12px; }
.cert-card { padding: 14px 16px; }
.cert-card p { font-size: 13px; color: var(--text-secondary); line-height: 1.5; }

/* ===== ACHIEVEMENTS ===== */
.achievements-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }
.achievement-card { padding: 24px; text-align: center; }
.achievement-icon { font-size: 36px; margin-bottom: 10px; }
.achievement-count { font-size: 32px; font-weight: 900; background: linear-gradient(135deg, var(--indigo-light), var(--lavender)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; min-height: 38px; }
.achievement-title { font-size: 14px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
.achievement-sub { font-size: 12px; color: var(--text-secondary); }

/* ===== CONTACT ===== */
.contact-section { position: relative; overflow: hidden; background: linear-gradient(135deg, var(--bg-base), var(--bg-mid), var(--bg-dark)); }
.contact-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
.contact-headline { font-size: 22px; font-weight: 800; color: var(--text-primary); margin-bottom: 12px; }
.contact-body { font-size: 14px; color: var(--text-secondary); line-height: 1.7; margin-bottom: 24px; }
.contact-cards { display: flex; flex-direction: column; gap: 12px; }
.contact-card { padding: 14px 16px; display: flex; align-items: center; gap: 12px; }
.contact-icon { font-size: 18px; color: var(--indigo); flex-shrink: 0; }
.contact-label { font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px; }
.contact-value { font-size: 13px; color: var(--text-primary); }
.contact-value a { color: var(--lavender); transition: color 0.2s; }
.contact-value a:hover { color: var(--indigo-light); }
.contact-form-card { padding: 28px; }
.contact-form { display: flex; flex-direction: column; gap: 14px; }
.form-input { width: 100%; padding: 12px 16px; background: rgba(255,255,255,0.06); border: 1px solid var(--glass-border); border-radius: 10px; color: var(--text-primary); font-size: 14px; outline: none; transition: border-color 0.3s; resize: none; font-family: inherit; }
.form-input:focus { border-color: var(--indigo); background: rgba(99,102,241,0.08); }
.form-input::placeholder { color: var(--text-muted); }
.form-textarea { resize: vertical; min-height: 120px; }
.form-success { margin-top: 12px; padding: 10px 16px; border-radius: 10px; background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.3); color: #10b981; font-size: 14px; text-align: center; }

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .hero-inner { flex-direction: column; text-align: center; }
  .hero-phones { justify-content: center; }
  .hero-cta { justify-content: center; }
  .hero-socials { justify-content: center; }
  .hero-summary { max-width: 100%; }
  .gradient-accent { margin: 0 auto 12px; }
  .projects-grid { grid-template-columns: 1fr; }
  .education-layout { grid-template-columns: 1fr; }
  .contact-layout { grid-template-columns: 1fr; }
  .achievements-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .section-container { padding: 60px 16px; }
  .achievements-grid { grid-template-columns: 1fr; }
  .skills-grid { grid-template-columns: repeat(2, 1fr); }
}
```

- [ ] **Step 4: Replace `src/index.css` with a minimal reset that imports the new styles**

```css
@import './styles/design-tokens.css';
@import './styles/redesign.css';
```

- [ ] **Step 5: Run dev server to verify no errors**

```bash
npm run dev
```
Expected: Dev server starts at `http://localhost:5173` with no console errors. The page will look broken until App.jsx is updated — that's expected.

- [ ] **Step 6: Commit**

```bash
git add src/styles/ src/index.css
git commit -m "feat: add design tokens and glassmorphism CSS system"
```

---

### Task 2: Build shared components

**Files:**
- Create: `src/components/Glass/GlassCard.jsx`
- Create: `src/components/Glass/GlassChip.jsx`
- Create: `src/components/ScrollReveal.jsx`
- Create: `src/components/ParticleField.jsx`
- Create: `src/components/AnimatedCounter.jsx`
- Create: `src/components/PhoneMockup.jsx`

- [ ] **Step 1: Create `src/components/Glass/GlassCard.jsx`**

```jsx
import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function GlassCard({ children, className = '', glowColor = 'rgba(99,102,241,0.25)', style = {}, onClick }) {
  const ref = useRef(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const springCfg = { stiffness: 300, damping: 30 }
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]), springCfg)
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), springCfg)

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`glass-card ${className}`}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ boxShadow: `0 24px 60px rgba(0,0,0,0.5), 0 0 30px ${glowColor}` }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Create `src/components/Glass/GlassChip.jsx`**

```jsx
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
```

- [ ] **Step 3: Create `src/components/ScrollReveal.jsx`**

```jsx
import { motion } from 'framer-motion'

const VARIANTS = {
  fadeInUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  },
}

export default function ScrollReveal({ children, variant = 'fadeInUp', delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={VARIANTS[variant]}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 4: Create `src/components/ParticleField.jsx`**

```jsx
import { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function ParticleField({ count = 40 }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5,
      })),
    [count]
  )

  return (
    <div className="particle-field">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="particle"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -80, 0], opacity: [0, 0.5, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'linear' }}
        />
      ))}
    </div>
  )
}
```

- [ ] **Step 5: Create `src/components/AnimatedCounter.jsx`**

```jsx
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export default function AnimatedCounter({ to, duration = 2, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let frame = 0
    const totalFrames = Math.round(duration * 60)
    const timer = setInterval(() => {
      frame++
      setCount(Math.round((frame / totalFrames) * to))
      if (frame === totalFrames) clearInterval(timer)
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [inView, to, duration])

  return <span ref={ref}>{count}{suffix}</span>
}
```

- [ ] **Step 6: Create `src/components/PhoneMockup.jsx`**

```jsx
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
```

- [ ] **Step 7: Commit**

```bash
git add src/components/
git commit -m "feat: add shared Glass, ScrollReveal, ParticleField, AnimatedCounter, PhoneMockup components"
```

---

### Task 3: Hero section

**Files:**
- Create: `src/sections/Hero.jsx`

- [ ] **Step 1: Create `src/sections/Hero.jsx`**

```jsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/sections/Hero.jsx
git commit -m "feat: add Hero section with 3D floating phone mockups"
```

---

### Task 4: WhatIBuild section

**Files:**
- Create: `src/sections/WhatIBuild.jsx`

- [ ] **Step 1: Create `src/sections/WhatIBuild.jsx`**

```jsx
import { motion } from 'framer-motion'
import GlassChip from '../components/Glass/GlassChip'
import ScrollReveal from '../components/ScrollReveal'

const TECH = [
  { icon: '📱', label: 'Flutter Apps' },
  { icon: '🎯', label: 'Dart' },
  { icon: '🔥', label: 'Firebase' },
  { icon: '💳', label: 'Payment SDKs' },
  { icon: '🏗️', label: 'Clean Architecture' },
  { icon: '🔄', label: 'BLoC / MVVM' },
  { icon: '🌐', label: 'REST APIs' },
  { icon: '🛡️', label: 'Mobile Security' },
  { icon: '🍎', label: 'iOS & Android' },
  { icon: '🔗', label: 'Git' },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function WhatIBuild() {
  return (
    <section className="section-container" id="what-i-build">
      <ScrollReveal variant="fadeInUp">
        <span className="gradient-accent" />
        <h2 className="section-title">What I Build</h2>
        <p className="section-subtitle">Technologies I work with every day</p>
      </ScrollReveal>
      <motion.div className="chips-grid" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={container}>
        {TECH.map((t) => (
          <motion.div key={t.label} variants={item}><GlassChip icon={t.icon} label={t.label} /></motion.div>
        ))}
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/sections/WhatIBuild.jsx
git commit -m "feat: add WhatIBuild section with staggered chip animation"
```

---

### Task 5: Skills section

**Files:**
- Create: `src/sections/Skills.jsx`

- [ ] **Step 1: Create `src/sections/Skills.jsx`**

```jsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/sections/Skills.jsx
git commit -m "feat: add Skills section with 3D tilt cards and animated progress bars"
```

---

### Task 6: Experience section

**Files:**
- Create: `src/sections/Experience.jsx`

- [ ] **Step 1: Create `src/sections/Experience.jsx`**

```jsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/sections/Experience.jsx
git commit -m "feat: add Experience section with animated timeline"
```

---

### Task 7: Projects section

**Files:**
- Create: `src/sections/Projects.jsx`

- [ ] **Step 1: Create `src/sections/Projects.jsx`**

```jsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/sections/Projects.jsx
git commit -m "feat: add Projects section with 3D phone mockups and tilt cards"
```

---

### Task 8: Education section

**Files:**
- Create: `src/sections/Education.jsx`

- [ ] **Step 1: Create `src/sections/Education.jsx`**

```jsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/sections/Education.jsx
git commit -m "feat: add Education section with animated degree card and certificates"
```

---

### Task 9: Achievements section

**Files:**
- Create: `src/sections/Achievements.jsx`

- [ ] **Step 1: Create `src/sections/Achievements.jsx`**

```jsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/sections/Achievements.jsx
git commit -m "feat: add Achievements section with animated counters"
```

---

### Task 10: Contact section

**Files:**
- Create: `src/sections/Contact.jsx`

- [ ] **Step 1: Create `src/sections/Contact.jsx`**

```jsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/sections/Contact.jsx
git commit -m "feat: add Contact section with glass form and success toast"
```

---

### Task 11: Wire up App.jsx and verify

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Replace `src/App.jsx` entirely**

```jsx
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { getProfile, getExperiences, getProjects, getEducation, getSkills } from './lib/api'
import Hero from './sections/Hero'
import WhatIBuild from './sections/WhatIBuild'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Education from './sections/Education'
import Achievements from './sections/Achievements'
import Contact from './sections/Contact'

function App() {
  const [data, setData] = useState({ profile: null, experiences: [], projects: [], education: [], skills: [] })
  const [loading, setLoading] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    Promise.all([getProfile(), getExperiences(), getProjects(), getEducation(), getSkills()])
      .then(([profile, experiences, projects, education, skills]) =>
        setData({ profile, experiences: experiences || [], projects: projects || [], education: education || [], skills: skills || [] })
      )
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (loading) {
    return (
      <div className="loading-screen">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
          <span style={{ fontSize: 48 }}>🚀</span>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="app">
      <Hero profile={data.profile} />
      <WhatIBuild />
      <Skills skills={data.skills} />
      <Experience experiences={data.experiences} />
      <Projects projects={data.projects} />
      <Education education={data.education} />
      <Achievements />
      <Contact profile={data.profile} />
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="scroll-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
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
```

- [ ] **Step 2: Run the dev server and do a full visual check**

```bash
npm run dev
```

Open `http://localhost:5173` and verify:
- Hero loads with 3 floating phone mockups
- Phones float up/down continuously
- Scrolling down triggers section reveal animations
- Hovering over any glass card causes 3D tilt
- Skills progress bars animate on scroll
- Achievement counters count up when scrolled into view
- Contact form shows success toast on submit
- Scroll-to-top button appears after scrolling 500px

- [ ] **Step 3: Run a production build to catch any errors**

```bash
npm run build
```
Expected: Build completes with no errors. Output in `dist/`.

- [ ] **Step 4: Final commit**

```bash
git add src/App.jsx
git commit -m "feat: wire up redesign App.jsx with all 8 sections"
```

---

### Task 12: Merge to main and deploy

- [ ] **Step 1: Switch to main and merge**

```bash
git checkout main
git merge redesign
```

- [ ] **Step 2: Push to trigger Vercel deployment**

```bash
git push origin main
```

- [ ] **Step 3: Verify live site at `https://www.amratef.dev`**

Check all sections load, animations work, and Supabase data appears (falls back to defaults if not configured for any section).
