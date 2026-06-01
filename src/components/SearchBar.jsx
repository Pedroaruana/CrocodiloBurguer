import './SearchBar.css'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <div className="search-bar-inner">
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          type="text"
          placeholder="Buscar no cardápio…"
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
