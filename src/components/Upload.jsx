import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function Upload({ onData }) {
  const inputRef = useRef()
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')

  function handleFile(file) {
    if (!file) return
    if (!file.name.endsWith('.csv')) {
      setError('Solo se aceptan archivos .csv de Netflix')
      return
    }
    const reader = new FileReader()
    reader.onload = e => onData(e.target.result)
    reader.onerror = () => setError('Error al leer el archivo')
    reader.readAsText(file, 'UTF-8')
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  function handleDemo() {
    fetch('/NetflixViewingHistory.csv')
      .then(r => r.text())
      .then(text => onData(text))
      .catch(() => setError('No se pudo cargar el archivo de demo'))
  }

  return (
    <div className="slide" style={{ background: '#141414' }}>
      {/* Background gradient */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 0%, rgba(229,9,20,0.25) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ zIndex: 1, textAlign: 'center', maxWidth: 560, padding: '0 24px' }}
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{ marginBottom: 32 }}
        >
          <span
            style={{
              fontSize: 42,
              fontWeight: 900,
              color: '#E50914',
              letterSpacing: -2,
              textShadow: '0 0 40px rgba(229,9,20,0.5)',
            }}
          >
            NETFLIX
          </span>
          <span
            style={{
              fontSize: 42,
              fontWeight: 900,
              color: '#fff',
              letterSpacing: -2,
              marginLeft: 10,
            }}
          >
            WRAPPED
          </span>
        </motion.div>

        <p style={{ color: '#999', fontSize: 16, marginBottom: 48, lineHeight: 1.6 }}>
          Descubre tus estadísticas de visionado.<br />
          Exporta tu historial desde{' '}
          <a
            href="https://www.netflix.com/viewingactivity"
            target="_blank"
            rel="noreferrer"
            style={{ color: '#E50914' }}
          >
            netflix.com/viewingactivity
          </a>
          {' '}y súbelo aquí.
        </p>

        {/* Drop zone */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current.click()}
          style={{
            border: `2px dashed ${dragging ? '#E50914' : '#333'}`,
            borderRadius: 16,
            padding: '48px 32px',
            cursor: 'pointer',
            transition: 'border-color 0.2s, background 0.2s',
            background: dragging ? 'rgba(229,9,20,0.05)' : 'rgba(255,255,255,0.03)',
            marginBottom: 20,
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>📂</div>
          <p style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>
            {dragging ? 'Suelta el archivo aquí' : 'Haz clic o arrastra tu CSV de Netflix'}
          </p>
          <p style={{ color: '#666', fontSize: 13, marginTop: 8 }}>NetflixViewingHistory.csv</p>
          <input
            ref={inputRef}
            type="file"
            accept=".csv"
            style={{ display: 'none' }}
            onChange={e => handleFile(e.target.files[0])}
          />
        </motion.div>

        {error && (
          <p style={{ color: '#E50914', fontSize: 14, marginBottom: 16 }}>{error}</p>
        )}

        <button
          onClick={handleDemo}
          style={{
            background: 'transparent',
            border: '1px solid #333',
            color: '#999',
            padding: '10px 24px',
            borderRadius: 8,
            cursor: 'pointer',
            fontSize: 14,
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { e.target.style.borderColor = '#E50914'; e.target.style.color = '#fff' }}
          onMouseLeave={e => { e.target.style.borderColor = '#333'; e.target.style.color = '#999' }}
        >
          Ver demo con datos de ejemplo
        </button>
      </motion.div>
    </div>
  )
}
