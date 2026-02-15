export function getClientSideURL(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }

  // Server-side fallback
  return process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
}

export function getServerSideURL(): string {
  return process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
}
