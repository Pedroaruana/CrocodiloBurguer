import { useState, useRef, useEffect } from 'react'
import './SearchBar.css'

const HISTORY_KEY = 'croco-search-history'
const MAX_HISTORY = 3

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []
  } catch {
    return []
  }
}

function saveToHistory(term) {
  if (!term || term.trim().length < 2) return
  const cleaned = term.trim().toLowerCase()
  const prev = loadHistory().filter((h) => h !== cleaned)
  const next = [cleaned, ...prev].slice(0, MAX_HISTORY)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next))
}

export default function SearchBar({ value, onChange }) {
  const [focused, setFocused] = useState(false)
  const [history, setHistory] = useState(loadHistory)
  const inputRef = useRef(null)
  const wrapRef = useRef(null)

  const showHistory = focused && !value && history.length > 0

  useEffect(() => {
    function handleClick(e) {
      if (!wrapRef.current?.contains(e.target)) {
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleKeyDown(e) {
    if (e.key === 'Enter' && value.trim().length >= 2) {
      saveToHistory(value)
      setHistory(loadHistory())
      setFocused(false)
      inputRef.current?.blur()
    }
  }

  function handleClear() {
    if (value.trim().length >= 2) {
      saveToHistory(value)
      setHistory(loadHistory())
    }
    onChange('')
  }

  function pickHistory(term) {
    onChange(term)
    setFocused(false)
  }

  function clearHistory() {
    localStorage.removeItem(HISTORY_KEY)
    setHistory([])
  }

  return (
    <div className="search-bar" ref={wrapRef}>
      <div className={`search-bar-inner ${focused ? 'focused' : ''}`}>
        <span className="search-icon" aria-hidden="true">🔍</span>
        <input
          ref={inputRef}
          className="search-input"
          type="search"
          placeholder="Buscar no cardápio…"
          aria-label="Buscar no cardápio"
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
        />
        {value && (
          <button className="search-clear" onClick={handleClear} aria-label="Limpar busca">
            ✕
          </button>
        )}
      </div>

      {showHistory && (
        <div className="search-history">
          <div className="search-history-header">
            <span>🕐 Buscas recentes</span>
            <button onClick={clearHistory} className="search-history-clear">Limpar</button>
          </div>
          {history.map((term) => (
            <button
              key={term}
              className="search-history-item"
              onClick={() => pickHistory(term)}
            >
              <span className="search-history-icon">↩</span>
              {term}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
