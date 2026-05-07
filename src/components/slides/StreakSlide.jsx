import { motion } from 'framer-motion'

export default function StreakSlide({ stats }) {
  const { maxStreak, favoriteDay, dayOfWeekData } = stats
  const maxDayCount = Math.max(...dayOfWeekData.map(d => d.count))

  return (
    <div className="slide" style={{ background: '#080808' }}>
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 70% 30%, rgba(229,9,20,0.12) 0%, transparent 60%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ zIndex: 1, textAlign: 'center', padding: '0 32px', maxWidth: 700 }}
      >
        {/* Streak */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ color: '#E50914', fontSize: 13, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 16 }}
        >
          Tu racha más larga
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 150 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            marginBottom: 48,
          }}
        >
          <span style={{ fontSize: 40 }}>🔥</span>
          <span style={{ fontSize: 'clamp(60px, 14vw, 110px)', fontWeight: 900, color: '#fff', lineHeight: 1 }}>
            {maxStreak}
          </span>
          <div style={{ textAlign: 'left' }}>
            <div style={{ color: '#E50914', fontSize: 18, fontWeight: 700 }}>días</div>
            <div style={{ color: '#444', fontSize: 13 }}>seguidos</div>
          </div>
        </motion.div>

        {/* Day of week chart */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ color: '#E50914', fontSize: 13, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 24 }}
        >
          Cuándo ves más — {favoriteDay}
        </motion.p>

        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', justifyContent: 'center', height: 80 }}>
          {dayOfWeekData.map((d, i) => {
            const h = Math.max(8, (d.count / maxDayCount) * 72)
            const isMax = d.count === maxDayCount
            return (
              <motion.div
                key={d.day}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: h, opacity: 1 }}
                transition={{ delay: 0.9 + i * 0.07, duration: 0.5, ease: 'easeOut' }}
                title={`${d.day}: ${d.count} ep`}
                style={{
                  width: 32,
                  background: isMax
                    ? 'linear-gradient(180deg, #ff4d57, #E50914)'
                    : '#1e1e1e',
                  borderRadius: '4px 4px 0 0',
                  position: 'relative',
                  cursor: 'default',
                  flexShrink: 0,
                }}
              />
            )
          })}
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 8 }}>
          {dayOfWeekData.map(d => (
            <div key={d.day} style={{ width: 32, fontSize: 9, color: '#444', textAlign: 'center', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              {d.day.slice(0, 2)}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
