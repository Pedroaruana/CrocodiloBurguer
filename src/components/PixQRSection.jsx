import { useState, useEffect, useMemo } from 'react'

const FAKE_PIX_CODE = '00020126580014br.gov.bcb.pix0136b5a3f4e2-9c1d-4f8b-a7e6-2d3c8f9b1a4e5204000053039865802BR5924CROCODILO BURGUER LTDA6009SAO PAULO62070503***6304A1B2'

function generateQR(size) {
  const grid = Array(size).fill(null).map(() => Array(size).fill(false))

  function finder(sr, sc) {
    for (let r = 0; r < 7; r++)
      for (let c = 0; c < 7; c++) {
        const border = r === 0 || r === 6 || c === 0 || c === 6
        const inner  = r >= 2 && r <= 4 && c >= 2 && c <= 4
        grid[sr + r][sc + c] = border || inner
      }
  }

  finder(0, 0)
  finder(0, size - 7)
  finder(size - 7, 0)

  for (let i = 8; i < size - 8; i++) {
    grid[6][i] = i % 2 === 0
    grid[i][6] = i % 2 === 0
  }

  let s = 0xdeadbeef
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const inTL = r < 9 && c < 9
      const inTR = r < 9 && c >= size - 8
      const inBL = r >= size - 8 && c < 9
      const onTiming = r === 6 || c === 6
      if (!inTL && !inTR && !inBL && !onTiming) {
        s ^= s << 13; s ^= s >> 17; s ^= s << 5
        grid[r][c] = (s >>> 0) % 2 === 0
      }
    }
  }
  return grid
}

export default function PixQRSection({ total, onConfirm }) {
  const fmt = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  const [seconds, setSeconds] = useState(300)
  const [copied, setCopied]   = useState(false)

  const grid = useMemo(() => generateQR(29), [])
  const CELL = 7
  const SVG  = 29 * CELL

  useEffect(() => {
    if (seconds <= 0) return
    const id = setInterval(() => setSeconds(s => s - 1), 1000)
    return () => clearInterval(id)
  }, [seconds])

  const mm  = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss  = String(seconds % 60).padStart(2, '0')
  const expired = seconds <= 0

  function handleCopy() {
    navigator.clipboard.writeText(FAKE_PIX_CODE).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="pix-section">
      <div className="pix-header">
        <span className="pix-logo">⚡</span>
        <div>
          <p className="pix-title">Pague via PIX</p>
          <p className="pix-subtitle">Escaneie o QR Code com seu banco</p>
        </div>
      </div>

      {/* QR Code */}
      <div className="pix-qr-wrap">
        <svg
          width={SVG} height={SVG}
          viewBox={`0 0 ${SVG} ${SVG}`}
          className={`pix-qr ${expired ? 'expired' : ''}`}
          style={{ background: 'white', borderRadius: 8, display: 'block' }}
        >
          {grid.flatMap((row, r) =>
            row.map((cell, c) =>
              cell
                ? <rect key={`${r}-${c}`} x={c*CELL} y={r*CELL} width={CELL} height={CELL} fill="#111"/>
                : null
            )
          )}
          {/* Centro com logo PIX */}
          <rect x={SVG/2 - 24} y={SVG/2 - 14} width={48} height={28} rx={6} fill="white"/>
          <text x={SVG/2} y={SVG/2 + 6} textAnchor="middle" fontSize="14" fontWeight="900"
                fill="#32BCAD" fontFamily="Arial">PIX</text>
        </svg>

        {expired && (
          <div className="pix-expired-overlay">
            <span>⏰</span>
            <p>Código expirado</p>
            <button onClick={() => setSeconds(300)}>Gerar novo</button>
          </div>
        )}
      </div>

      {/* Countdown */}
      {!expired && (
        <div className={`pix-timer ${seconds <= 60 ? 'urgent' : ''}`}>
          ⏱️ Expira em <strong>{mm}:{ss}</strong>
        </div>
      )}

      {/* Valor */}
      <div className="pix-amount">
        <span className="pix-amount-label">Valor total</span>
        <span className="pix-amount-value">{fmt(total)}</span>
      </div>

      {/* Chave PIX */}
      <div className="pix-key">
        <span className="pix-key-label">Chave PIX (CNPJ)</span>
        <span className="pix-key-value">12.345.678/0001-99</span>
      </div>

      {/* Copiar código */}
      <button className={`pix-copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy} disabled={expired}>
        {copied ? '✓ Copiado!' : '📋 Copiar código PIX'}
      </button>

      <div className="pix-divider">ou</div>

      {/* Já Paguei */}
      <button className="pix-confirm-btn" onClick={onConfirm} disabled={expired}>
        ✅ Já Paguei!
      </button>
    </div>
  )
}
