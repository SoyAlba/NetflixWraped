import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import HeroSlide from './slides/HeroSlide'
import TotalStatsSlide from './slides/TotalStatsSlide'
import TopShowSlide from './slides/TopShowSlide'
import TopShowsSlide from './slides/TopShowsSlide'
import BingeSlide from './slides/BingeSlide'
import StreakSlide from './slides/StreakSlide'
import MonthlySlide from './slides/MonthlySlide'
import FinalSlide from './slides/FinalSlide'

const SLIDE_COMPONENTS = [
  { key: 'hero', Component: HeroSlide },
  { key: 'total', Component: TotalStatsSlide },
  { key: 'topshow', Component: TopShowSlide },
  { key: 'topshows', Component: TopShowsSlide },
  { key: 'binge', Component: BingeSlide },
  { key: 'streak', Component: StreakSlide },
  { key: 'monthly', Component: MonthlySlide },
  { key: 'final', Component: FinalSlide },
]

const variants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
}

export default function Wrapped({ stats, onReset }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = useCallback((newIndex) => {
    if (newIndex < 0 || newIndex >= SLIDE_COMPONENTS.length) return
    setDirection(newIndex > index ? 1 : -1)
    setIndex(newIndex)
  }, [index])

  const next = useCallback(() => go(index + 1), [go, index])
  const prev = useCallback(() => go(index - 1), [go, index])

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); next() }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); prev() }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [next, prev])

  // Touch/swipe support
  useEffect(() => {
    let startX = 0
    function onTouchStart(e) { startX = e.touches[0].clientX }
    function onTouchEnd(e) {
      const diff = startX - e.changedTouches[0].clientX
      if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
    }
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [next, prev])

  const { key, Component } = SLIDE_COMPONENTS[index]

  return (
    <div
      style={{ width: '100%', height: '100vh', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}
      onClick={index < SLIDE_COMPONENTS.length - 1 ? next : undefined}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={key}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <Component
            stats={stats}
            onReset={onReset}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation dots */}
      <div
        style={{
          position: 'fixed',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 8,
          zIndex: 100,
        }}
        onClick={e => e.stopPropagation()}
      >
        {SLIDE_COMPONENTS.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            style={{
              width: i === index ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: i === index ? '#E50914' : '#333',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'width 0.3s, background 0.3s',
            }}
          />
        ))}
      </div>

      {/* Arrow nav */}
      {index > 0 && (
        <button
          onClick={e => { e.stopPropagation(); prev() }}
          style={{
            position: 'fixed', left: 20, top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.05)', border: '1px solid #222',
            color: '#666', borderRadius: 8, padding: '12px 14px',
            cursor: 'pointer', fontSize: 18, zIndex: 100,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => { e.target.style.color = '#fff' }}
          onMouseLeave={e => { e.target.style.color = '#666' }}
        >
          ←
        </button>
      )}
      {index < SLIDE_COMPONENTS.length - 1 && (
        <button
          onClick={e => { e.stopPropagation(); next() }}
          style={{
            position: 'fixed', right: 20, top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.05)', border: '1px solid #222',
            color: '#666', borderRadius: 8, padding: '12px 14px',
            cursor: 'pointer', fontSize: 18, zIndex: 100,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => { e.target.style.color = '#fff' }}
          onMouseLeave={e => { e.target.style.color = '#666' }}
        >
          →
        </button>
      )}

      {/* Slide counter */}
      <div
        style={{
          position: 'fixed', top: 20, right: 24,
          color: '#333', fontSize: 12, zIndex: 100,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {index + 1} / {SLIDE_COMPONENTS.length}
      </div>
    </div>
  )
}
