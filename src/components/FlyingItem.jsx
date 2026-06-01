import { useState, useEffect } from 'react'
import './FlyingItem.css'

export default function FlyingItems() {
  const [flies, setFlies] = useState([])

  useEffect(() => {
    function handle(e) {
      setFlies(prev => [...prev, { id: Date.now() + Math.random(), ...e.detail }])
    }
    window.addEventListener('cart-fly', handle)
    return () => window.removeEventListener('cart-fly', handle)
  }, [])

  function remove(id) {
    setFlies(prev => prev.filter(f => f.id !== id))
  }

  return (
    <>
      {flies.map(fly => {
        const tx = window.innerWidth / 2 - fly.x
        const ty = window.innerHeight - 76 - fly.y
        return (
          <span
            key={fly.id}
            className="fly-item"
            style={{ left: fly.x, top: fly.y, '--tx': `${tx}px`, '--ty': `${ty}px` }}
            onAnimationEnd={() => remove(fly.id)}
          >
            {fly.emoji}
          </span>
        )
      })}
    </>
  )
}
