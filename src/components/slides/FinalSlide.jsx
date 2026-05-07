import { motion } from 'framer-motion'

function getPersonality(stats) {
  const { totalEpisodes, maxStreak, biggestBingeCount, topShows } = stats

  if (biggestBingeCount >= 10) return { emoji: '🔥', title: 'Maratonista Extrema', desc: 'Cuando una serie te engancha, no hay quien te pare.' }
  if (maxStreak >= 20) return { emoji: '📅', title: 'Adicta a las Rutinas', desc: 'Netflix forma parte de tu ritual diario.' }
  if (totalEpisodes >= 200) return { emoji: '🎬', title: 'Cinéfila Empedernida', desc: 'Ves más Netflix que muchos streamers.' }
  if (topShows.length > 0 && topShows[0].count / totalEpisodes > 0.4) return { emoji: '💘', title: 'Fan Incondicional', desc: `Una serie te ha robado el corazón: ${topShows[0]?.show}.` }
  return { emoji: '🌟', title: 'Exploradora Cultural', desc: 'Tienes gusto ecléctico y nunca te aburres.' }
}

export default function FinalSlide({ stats, onReset }) {
  const p = getPersonality(stats)

  return (
    <div
      className="slide"
      style={{
        background: 'linear-gradient(135deg, #1a0000 0%, #0d0d0d 50%, #000916 100%)',
      }}
    >
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(229,9,20,0.2) 0%, transparent 65%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ zIndex: 1, textAlign: 'center', maxWidth: 560, padding: '0 32px' }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 160 }}
          style={{ fontSize: 80, marginBottom: 24 }}
        >
          {p.emoji}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ color: '#E50914', fontSize: 13, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 16 }}
        >
          Tu perfil de visionado
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          style={{ fontSize: 'clamp(28px, 6vw, 48px)', fontWeight: 900, color: '#fff', marginBottom: 16, lineHeight: 1.2 }}
        >
          {p.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          style={{ color: '#888', fontSize: 16, lineHeight: 1.7, marginBottom: 48 }}
        >
          {p.desc}
        </motion.p>

        {/* Summary pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 48 }}
        >
          {[
            { label: `${stats.totalEpisodes} episodios`, icon: '📺' },
            { label: `${stats.uniqueShows} series`, icon: '🎭' },
            { label: `${stats.maxStreak} días de racha`, icon: '🔥' },
            { label: `${stats.biggestBingeCount} ep en un día`, icon: '🍿' },
          ].map(pill => (
            <div
              key={pill.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid #222',
                borderRadius: 100,
                padding: '8px 16px',
                fontSize: 13,
                color: '#bbb',
              }}
            >
              <span>{pill.icon}</span>
              <span>{pill.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          style={{ marginBottom: 32 }}
        >
          <span style={{ color: '#E50914', fontWeight: 900, fontSize: 18 }}>NETFLIX</span>
          <span style={{ color: '#fff', fontWeight: 900, fontSize: 18 }}> WRAPPED</span>
          <span style={{ color: '#333', fontSize: 18 }}> · {stats.lastDate.getFullYear()}</span>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          onClick={onReset}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: '#E50914',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '12px 28px',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: 0.5,
          }}
        >
          Cargar otro historial
        </motion.button>
      </motion.div>
    </div>
  )
}
