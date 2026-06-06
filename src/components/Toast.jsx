import './Toast.css'

export default function Toast({ toast }) {
  if (!toast) return null

  return (
    <div className={`toast toast--${toast.type}`} key={toast.id}>
      <span className="toast-icon">
        {toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : 'ℹ️'}
      </span>
      <span className="toast-message">{toast.message}</span>
    </div>
  )
}