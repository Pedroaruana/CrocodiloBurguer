import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.error('Crocodilo Burguer — erro inesperado:', error)
  }

  handleReset() {
    // Limpa localStorage corrompido e recarrega
    try {
      localStorage.removeItem('croco-cart-v1')
      localStorage.removeItem('croco-session-v1')
      localStorage.removeItem('croco-orders-v1')
    } catch {}
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', minHeight: '100vh', padding: 24,
          textAlign: 'center', fontFamily: 'Poppins, sans-serif', background: '#f4f4ef',
        }}>
          <span style={{ fontSize: 72 }}>🐊</span>
          <h2 style={{ fontSize: 22, fontWeight: 800, margin: '16px 0 8px', color: '#1a472a' }}>
            Algo deu errado!
          </h2>
          <p style={{ fontSize: 14, color: '#6b7280', maxWidth: 260, lineHeight: 1.6 }}>
            Ocorreu um erro inesperado. Tente recarregar a página.
          </p>
          <button
            onClick={this.handleReset}
            style={{
              marginTop: 24, height: 48, padding: '0 28px',
              background: '#2d6a4f', color: 'white', border: 'none',
              borderRadius: 14, fontSize: 15, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'Poppins, sans-serif',
            }}
          >
            🔄 Recarregar
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
