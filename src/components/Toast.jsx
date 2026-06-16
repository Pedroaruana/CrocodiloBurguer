import './Toast.css'

export default function Toast({ toast }) {
  if (!toast) return null

  return (
    <div
      className={`toast toast--${toast.type}`}
      key={toast.id}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="toast-icon" aria-hidden="true">
        {toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : 'ℹ️'}
      </span>
      <span className="toast-message">{toast.message}</span>
    </div>
  )
}