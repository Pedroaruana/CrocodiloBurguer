import './SearchBar.css'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <div className="search-bar-inner">
        <span className="search-icon" aria-hidden="true">🔍</span>
        <input
          className="search-input"
          type="search"
          placeholder="Buscar no cardápio…"
          aria-label="Buscar no cardápio"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        {value && (
          <button className="search-clear" onClick={() => onChange('')} aria-label="Limpar busca">
            ✕
          </button>
        )}
      </div>
    </div>
  )
}
