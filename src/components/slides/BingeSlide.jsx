import { motion } from 'framer-motion'

export default function BingeSlide({ stats }) {
  const { biggestBingeCount, biggestBingeDateFormatted, biggestBingeShows } = stats

  // Approximate hours (avg 45 min/episode)
  const hours = Math.round((biggestBingeCount * 45) / 60 * 10) / 10

  return (
    <div
      className="slide"
      style={{
        background: 'linear-gradient(180deg, #0d0000 0%, #0a0a0a 100%)',
      }}
    >
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 60%, rgba(229,9,20,0.15) 0%, transparent 65%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ zIndex: 1, textAlign: 'center', padding: '0 32px', maxWidth: 600 }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          style={{ fontSize: 72, marginBottom: 24 }}
        >
          🍿
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ color: '#E50914', fontSize: 13, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 24 }}
        >
          Tu mayor maratón
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'center',
            gap: 12,
            marginBottom: 16,
          }}
        >
          <span style={{ fontSize: 'clamp(80px, 18vw, 144px)', fontWeight: 900, color: '#E50914', lineHeight: 1 }}>
            {biggestBingeCount}
          </span>
          <span style={{ fontSize: 28, color: '#888', fontWeight: 300 }}>episodios</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          style={{ color: '#555', fontSize: 15, marginBottom: 32 }}
        >
          en un solo día — el {biggestBingeDateFormatted}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          style={{
            display: 'inline-flex',
            gap: 32,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid #222',
            borderRadius: 16,
            padding: '20px 32px',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#fff' }}>~{hours}h</div>
            <div style={{ color: '#555', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase' }}>de pantalla</div>
          </div>
          <div style={{ width: 1, background: '#222' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
              {biggestBingeShows[0] ?? '—'}
            </div>
            <div style={{ color: '#555', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 4 }}>serie</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
