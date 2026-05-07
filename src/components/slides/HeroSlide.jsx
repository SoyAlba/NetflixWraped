import { motion } from 'framer-motion'

export default function HeroSlide({ stats }) {
  const year = stats.lastDate.getFullYear()

  return (
    <div
      className="slide"
      style={{
        background: 'linear-gradient(135deg, #1a0000 0%, #141414 50%, #000 100%)',
      }}
    >
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 40%, rgba(229,9,20,0.35) 0%, transparent 65%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ textAlign: 'center', zIndex: 1 }}
      >
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ color: '#E50914', fontSize: 14, fontWeight: 700, letterSpacing: 4, marginBottom: 20, textTransform: 'uppercase' }}
        >
          Tu resumen de
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            fontSize: 'clamp(64px, 15vw, 140px)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1,
            letterSpacing: -4,
            marginBottom: 8,
          }}
        >
          {year}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 40 }}
        >
          <div style={{ height: 2, width: 48, background: '#E50914' }} />
          <span style={{ color: '#E50914', fontSize: 22, fontWeight: 900, letterSpacing: 6, textTransform: 'uppercase' }}>
            Netflix Wrapped
          </span>
          <div style={{ height: 2, width: 48, background: '#E50914' }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          style={{ color: '#666', fontSize: 15 }}
        >
          Haz clic para continuar →
        </motion.p>
      </motion.div>

      {/* Decorative floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: 4, height: 4,
            borderRadius: '50%',
            background: '#E50914',
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 3) * 25}%`,
            opacity: 0.4,
          }}
          animate={{ y: [-10, 10, -10], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
