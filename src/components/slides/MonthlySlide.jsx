import { motion } from 'framer-motion'

export default function MonthlySlide({ stats }) {
  const { monthlyData } = stats
  const max = Math.max(...monthlyData.map(m => m.count))
  const peakMonth = monthlyData.find(m => m.count === max)

  return (
    <div className="slide" style={{ background: '#0a0a0a' }}>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{
          color: '#E50914', fontSize: 13, fontWeight: 700,
          letterSpacing: 4, textTransform: 'uppercase', marginBottom: 8,
        }}
      >
        Tu actividad mensual
      </motion.p>

      {peakMonth && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ color: '#555', fontSize: 14, marginBottom: 40 }}
        >
          Tu mes más activo fue <span style={{ color: '#fff', fontWeight: 700 }}>{peakMonth.month}</span> con{' '}
          <span style={{ color: '#E50914', fontWeight: 700 }}>{max} episodios</span>
        </motion.p>
      )}

      {/* Bar chart */}
      <div
        style={{
          display: 'flex',
          gap: 10,
          alignItems: 'flex-end',
          justifyContent: 'center',
          height: 160,
          padding: '0 24px',
          maxWidth: 800,
          width: '100%',
        }}
      >
        {monthlyData.map((m, i) => {
          const h = Math.max(6, (m.count / max) * 140)
          const isPeak = m.count === max
          return (
            <motion.div
              key={m.key}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: h, opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.6, ease: 'easeOut' }}
              style={{ flex: 1, maxWidth: 56, position: 'relative' }}
            >
              {/* Episode count on top of peak */}
              {isPeak && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  style={{
                    position: 'absolute',
                    top: -28,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: '#E50914',
                    fontSize: 13,
                    fontWeight: 800,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {m.count}
                </motion.div>
              )}
              <div
                style={{
                  height: '100%',
                  background: isPeak
                    ? 'linear-gradient(180deg, #ff4d57 0%, #E50914 100%)'
                    : 'linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)',
                  borderRadius: '4px 4px 0 0',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {isPeak && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
                      animation: 'shimmer 2s infinite',
                    }}
                  />
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Month labels */}
      <div
        style={{
          display: 'flex',
          gap: 10,
          justifyContent: 'center',
          marginTop: 10,
          padding: '0 24px',
          maxWidth: 800,
          width: '100%',
        }}
      >
        {monthlyData.map(m => (
          <div
            key={m.key}
            style={{
              flex: 1,
              maxWidth: 56,
              fontSize: 10,
              color: '#444',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            {m.month.slice(0, 3)}
          </div>
        ))}
      </div>
    </div>
  )
}
