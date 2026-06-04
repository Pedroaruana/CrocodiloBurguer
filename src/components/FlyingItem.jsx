import { useEffect, useState } from 'react'
import './FlyingItem.css'

export default function FlyingItems() {
  const [items, setItems] = useState([])

  useEffect(() => {
    function handle(e) {
      const id = crypto.randomUUID()
      setItems((prev) => [...prev, { id, ...e.detail }])
    }
    window.addEventListener('cart-fly', handle)
    return () => window.removeEventListener('cart-fly', handle)
  }, [])

  function remove(id) {
    setItems((prev) => prev.filter((it) => it.id !== id))
  }

  return (
    <>
      {items.map((it) => {
        const tx = window.innerWidth / 2 - it.x
        const ty = window.innerHeight - 76 - it.y
        return (
          <span
            key={it.id}
            className="fly-item"
            style={{ left: it.x, top: it.y, '--tx': `${tx}px`, '--ty': `${ty}px` }}
            onAnimationEnd={() => remove(it.id)}
          >
            {it.emoji}
          </span>
        )
      })}
    </>
  )
}
