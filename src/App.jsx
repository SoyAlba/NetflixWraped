import { useState } from 'react'
import { parseCSV, computeStats } from './utils/dataProcessor'
import Upload from './components/Upload'
import Wrapped from './components/Wrapped'

export default function App() {
  const [stats, setStats] = useState(null)
  const [error, setError] = useState('')

  function handleData(csvText) {
    try {
      const rows = parseCSV(csvText)
      const result = computeStats(rows)
      if (!result) {
        setError('No se encontraron datos válidos. Comprueba que es el CSV de Netflix.')
        return
      }
      setError('')
      setStats(result)
    } catch (e) {
      setError('Error procesando el archivo: ' + e.message)
    }
  }

  function handleReset() {
    setStats(null)
    setError('')
  }

  if (stats) {
    return <Wrapped stats={stats} onReset={handleReset} />
  }

  return (
    <div>
      <Upload onData={handleData} />
      {error && (
        <div
          style={{
            position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
            background: '#1a0000', border: '1px solid #E50914', borderRadius: 8,
            color: '#E50914', padding: '12px 24px', fontSize: 14, zIndex: 999,
          }}
        >
          {error}
        </div>
      )}
    </div>
  )
}
