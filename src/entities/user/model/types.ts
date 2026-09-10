export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
  role: 'curator' | 'admin'
}

export interface AuthSession {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}
