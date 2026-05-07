import { motion } from 'framer-motion'

function BigStat({ value, label, delay, color = '#E50914' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      style={{ textAlign: 'center', padding: '0 24px' }}
    >
      <div
        style={{
          fontSize: 'clamp(56px, 10vw, 96px)',
          fontWeight: 900,
          color,
          lineHeight: 1,
          letterSpacing: -3,
        }}
      >
        {value}
      </div>
      <div style={{ color: '#888', fontSize: 14, marginTop: 8, textTransform: 'uppercase', letterSpacing: 2 }}>
        {label}
      </div>
    </motion.div>
  )
}

export default function TotalStatsSlide({ stats }) {
  return (
    <div
      className="slide"
      style={{ background: '#0a0a0a' }}
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ color: '#E50914', fontSize: 13, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 64 }}
      >
        Este año tú...
      </motion.p>

      <div
        style={{
          display: 'flex',
          gap: 0,
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <BigStat value={stats.totalEpisodes} label="episodios vistos" delay={0.3} color="#E50914" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ color: '#222', fontSize: 48, fontWeight: 100, padding: '0 24px' }}
        >
          |
        </motion.div>

        <BigStat value={stats.uniqueShows} label="series distintas" delay={0.6} color="#fff" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ color: '#222', fontSize: 48, fontWeight: 100, padding: '0 24px' }}
        >
          |
        </motion.div>

        <BigStat value={stats.activeDays} label="días con Netflix" delay={0.9} color="#E50914" />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        style={{ color: '#444', fontSize: 14, marginTop: 64, textAlign: 'center' }}
      >
        Del {stats.firstDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })} al{' '}
        {stats.lastDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
      </motion.p>
    </div>
  )
}
