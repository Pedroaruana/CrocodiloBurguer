export function logError(context, error) {
  console.error(`[${new Date().toISOString()}] ${context}:`, error)
}
