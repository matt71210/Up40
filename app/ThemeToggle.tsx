"use client"
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const current = document.documentElement.getAttribute('data-theme') || 'light'
    setTheme(current)
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }

  if (!mounted) return <div style={{width: 36, height: 36}}></div>

  return (
    <button 
      onClick={toggle} 
      style={{
        background: 'var(--surface-3)',
        border: '1px solid var(--border)',
        borderRadius: '50%',
        width: '36px', height: '36px',
        display: 'grid', placeItems: 'center',
        cursor: 'pointer', color: 'var(--text-main)',
        fontSize: '14px',
        marginLeft: '10px'
      }}
      aria-label="Mode sombre/clair"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
