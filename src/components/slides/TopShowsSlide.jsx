import { motion } from 'framer-motion'

export default function TopShowsSlide({ stats }) {
  const top = stats.topShows.slice(0, 6)
  const max = top[0]?.count || 1

  const medals = ['🥇', '🥈', '🥉']

  return (
    <div className="slide" style={{ background: '#0d0d0d' }}>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{
          color: '#E50914', fontSize: 13, fontWeight: 700,
          letterSpacing: 4, textTransform: 'uppercase', marginBottom: 40,
        }}
      >
        Tus series más vistas
      </motion.p>

      <div style={{ width: '100%', maxWidth: 640, padding: '0 24px' }}>
        {top.map((item, i) => (
          <motion.div
            key={item.show}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 20,
            }}
          >
            {/* Rank */}
            <span style={{ width: 32, fontSize: i < 3 ? 22 : 16, textAlign: 'center', flexShrink: 0 }}>
              {medals[i] || <span style={{ color: '#444', fontWeight: 700 }}>#{i + 1}</span>}
            </span>

            {/* Show name + bar */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{
                  color: i === 0 ? '#fff' : '#aaa',
                  fontSize: i === 0 ? 15 : 14,
                  fontWeight: i === 0 ? 700 : 400,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '75%',
                }}>
                  {item.show}
                </span>
                <span style={{ color: i === 0 ? '#E50914' : '#555', fontSize: 13, fontWeight: 700, flexShrink: 0, marginLeft: 8 }}>
                  {item.count} ep
                </span>
              </div>
              <div style={{ height: 5, background: '#1e1e1e', borderRadius: 3, overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.count / max) * 100}%` }}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.8, ease: 'easeOut' }}
                  style={{
                    height: '100%',
                    background: i === 0
                      ? 'linear-gradient(90deg, #E50914, #ff6b6b)'
                      : i === 1
                        ? 'linear-gradient(90deg, #c0392b, #e74c3c)'
                        : '#333',
                    borderRadius: 3,
                  }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
