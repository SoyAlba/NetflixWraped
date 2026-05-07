import { motion } from 'framer-motion'

export default function TopShowSlide({ stats }) {
  const top = stats.topShows[0]
  if (!top) return null

  const pct = Math.round((top.count / stats.totalEpisodes) * 100)

  return (
    <div
      className="slide"
      style={{
        background: 'linear-gradient(160deg, #1a0000 0%, #0d0d0d 60%)',
      }}
    >
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 30% 50%, rgba(229,9,20,0.2) 0%, transparent 60%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ zIndex: 1, textAlign: 'center', maxWidth: 700, padding: '0 32px' }}
      >
        <motion.p
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ color: '#E50914', fontSize: 13, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 32 }}
        >
          Tu serie favorita fue
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          style={{
            fontSize: 'clamp(32px, 8vw, 72px)',
            fontWeight: 900,
            color: '#fff',
            letterSpacing: -2,
            lineHeight: 1.1,
            marginBottom: 40,
          }}
        >
          {top.show}
        </motion.h2>

        {/* Episode count */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'rgba(229,9,20,0.12)',
            border: '1px solid rgba(229,9,20,0.3)',
            borderRadius: 20,
            padding: '24px 48px',
            marginBottom: 32,
          }}
        >
          <span style={{ fontSize: 64, fontWeight: 900, color: '#E50914', lineHeight: 1 }}>
            {top.count}
          </span>
          <span style={{ color: '#888', fontSize: 14, letterSpacing: 2, textTransform: 'uppercase', marginTop: 4 }}>
            episodios
          </span>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ maxWidth: 400, margin: '0 auto' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ color: '#555', fontSize: 13 }}>Porcentaje del total</span>
            <span style={{ color: '#E50914', fontWeight: 700, fontSize: 13 }}>{pct}%</span>
          </div>
          <div style={{ height: 6, background: '#222', borderRadius: 3, overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ delay: 1.4, duration: 1, ease: 'easeOut' }}
              style={{ height: '100%', background: 'linear-gradient(90deg, #E50914, #ff4d57)', borderRadius: 3 }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
