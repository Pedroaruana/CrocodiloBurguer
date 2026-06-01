import { useRef, useEffect } from 'react'
import './CategoryNav.css'

export default function CategoryNav({ categories, active, onSelect }) {
  const listRef = useRef(null)

  useEffect(() => {
    const el = listRef.current?.querySelector('.active')
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [active])

  return (
    <nav className="category-nav" aria-label="Categorias">
      <ul className="category-nav-list" ref={listRef}>
        {categories.map(cat => (
          <li
            key={cat.id}
            className={`category-nav-item ${active === cat.id ? 'active' : ''}`}
            onClick={() => onSelect(cat.id)}
            role="tab"
            aria-selected={active === cat.id}
          >
            <span className="cat-emoji">{cat.emoji}</span>
            <span className="cat-label">{cat.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  )
}
