# Portfolio Redesign — Design Spec
**Date:** 2026-04-25
**Branch:** `redesign` (built alongside live site, merged when ready)

---

## Overview

A complete visual redesign of amratef.dev — same Supabase backend, same React/Vite stack, new UI. Goal: a jaw-dropping Glassmorphism 3D portfolio that makes recruiters screenshot it and share it.

---

## Design Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Style | Glassmorphism 3D | Frosted glass cards on dark bg — modern, premium |
| Colors | Indigo & Violet | Deep midnight (`#0f0c29`) + indigo (`#6366f1`) + violet (`#8b5cf6`) |
| Animation | Tilt + Float + Scroll reveal | Maximum wow, no overkill |
| Hero centerpiece | 3D floating phone mockups | Shows real apps, not just words |
| 3D library | CSS `perspective` + Framer Motion | No Three.js — same impact, 10x better performance |
| Build strategy | New `redesign` branch | Live site stays up at amratef.dev during development |

---

## Sections (in order)

### 01 — Hero
- Full-viewport dark background with floating indigo/violet particle field
- Left: name (`Amr Atef Goda`), title typewriter, 2-line summary, CTA buttons (Hire Me / See Work), social icons
- Right: 3 x 3D phone mockups floating at different depths — Tawuniya (insurance 🏛️), Beltone (fintech 📈), Kafey (HR 👔)
- Phones tilt slightly on mouse move (CSS perspective + Framer Motion `useMotionValue`)
- Scroll indicator at bottom

### 02 — What I Build
- Section title + subtitle slide in from bottom on scroll
- Tech chips in a wrapping flex row: Flutter Apps, Dart, Firebase, Payment SDKs, Clean Architecture, BLoC/MVVM, REST APIs, Mobile Security, Git
- Each chip is a frosted glass pill — glows indigo on hover
- Chips stagger-animate in from bottom, one by one

### 03 — Skills
- Grid of frosted glass cards (3 per row on desktop, 2 on tablet, 1 on mobile)
- Each card: icon, skill name, animated progress bar (fills on scroll into view)
- Cards tilt 3D on mouse hover (`rotateX` / `rotateY` via Framer Motion)
- Data from Supabase (falls back to hardcoded defaults)

### 04 — Experience
- Vertical timeline with glowing indigo dots
- Each entry: frosted glass card — company, role, period, location, bullet points
- Cards slide in from the left with depth (translateZ + opacity)
- Active/current role dot pulses

### 05 — Projects
- 2-column grid of project cards (1 column on mobile)
- Each card: mini 3D phone mockup (left) + app name, description, platform tags, store links (right)
- Full card tilts in 3D on hover with indigo glow shadow
- Data from Supabase

### 06 — Education
- Single large frosted glass card — degree, school, GPA, graduation project grade
- Certificates listed below as smaller glass pills
- GDSC Cairo Flutter Head as a featured achievement badge

### 07 — Achievements
- 3-column grid of achievement cards
- Google Hackathon 2nd Place, GDSC Flutter Head, 5+ Certifications, 3+ Years XP
- Animated counters: numbers count up from 0 when scrolled into view
- Cards scale up (scaleIn) on scroll reveal

### 08 — Contact
- Large frosted glass contact form: Name, Email, Message, Send button
- Contact info cards below: Email, Phone, Location, LinkedIn
- Floating particles in background (same as hero)
- Form is UI-only (no backend email — `onSubmit` prevents default, shows success toast)

---

## Animation System

### Tilt on Hover (all cards)
```
useMotionValue(0) for rotateX / rotateY
onMouseMove → calculate offset from card center → apply to motion values
spring config: stiffness 300, damping 30
onMouseLeave → reset to 0,0
```

### Floating Depth (hero phones + background elements)
```
Framer Motion animate prop:
  y: [0, -12, 0] — different duration per element (6s, 8s, 10s)
  repeat: Infinity, ease: easeInOut
Creates layered parallax depth
```

### Cinematic Scroll Reveal (all sections)
```
whileInView + viewport: { once: true, margin: '-80px' }
variants per section type:
  fadeInUp:   y: 60 → 0, opacity: 0 → 1
  fadeInLeft: x: -60 → 0, opacity: 0 → 1
  scaleIn:    scale: 0.85 → 1, opacity: 0 → 1
staggerChildren: 0.08s between items
```

---

## Component Structure

```
src/
  components/
    Glass/
      GlassCard.jsx        — base frosted glass card with 3D tilt
      GlassChip.jsx        — pill chip with glow hover
    PhoneMockup.jsx        — 3D phone frame with app content
    ParticleField.jsx      — floating dot particles (pure CSS, no canvas)
    AnimatedCounter.jsx    — counts from 0 to N on scroll
    ScrollReveal.jsx       — wrapper for cinematic reveal
  sections/
    Hero.jsx
    WhatIBuild.jsx
    Skills.jsx
    Experience.jsx
    Projects.jsx
    Education.jsx
    Achievements.jsx
    Contact.jsx
  App.jsx                  — assembles sections, loads Supabase data
```

---

## Tech Stack (unchanged)
- React 19 + Vite
- Framer Motion (already installed)
- @supabase/supabase-js (already installed)
- react-icons (already installed)
- CSS custom properties for color tokens
- No new dependencies needed

---

## Branch Strategy
1. `git checkout -b redesign` from `main`
2. Build and iterate on `redesign`
3. When approved: `git merge redesign` into `main`, push → Vercel auto-deploys

---

## Out of Scope
- Backend email sending for contact form
- Dark/light mode toggle
- Three.js / WebGL
- i18n / Arabic version
