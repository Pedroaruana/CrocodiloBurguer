import { useState, useEffect } from 'react'

// Horário de funcionamento: seg-dom, 11h às 23h
function checkOpen() {
  const now = new Date()
  const hour = now.getHours()
  const minute = now.getMinutes()
  const totalMinutes = hour * 60 + minute
  return totalMinutes >= 11 * 60 && totalMinutes < 23 * 60
}

export function useBusinessHours() {
  const [isOpen, setIsOpen] = useState(checkOpen)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOpen(checkOpen())
    }, 60_000) // atualiza a cada 1 minuto
    return () => clearInterval(interval)
  }, [])

  return isOpen
}