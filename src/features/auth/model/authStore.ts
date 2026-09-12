import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { User } from '@entities/user'
import type { LoginFormData } from './loginSchema'

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null

  // Actions
  login: (credentials: LoginFormData) => Promise<boolean>
  logout: () => void
  clearError: () => void
}

/**
 * Generates a structured fake JWT token for simulated authentication.
 * Clarification: This is purely client-side and must never be treated as a secure credential.
 */
function generateMockToken(email: string): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(
    JSON.stringify({
      sub: email,
      role: 'curator',
      iss: 'cinedash-simulated-auth',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
    })
  )
  const signature = 'simulated_sig_' + Math.random().toString(36).slice(2, 10)
  return `${header}.${payload}.${signature}`
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginFormData): Promise<boolean> => {
        set({ isLoading: true, error: null })

        // Simulated network delay for realistic UX feedback
        await new Promise((resolve) => setTimeout(resolve, 500))

        try {
          const emailPrefix = credentials.email.split('@')[0]
          const capitalizedName =
            emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1).replace(/[._-]/g, ' ')

          const user: User = {
            id: `usr_${Math.random().toString(36).slice(2, 9)}`,
            name: capitalizedName || 'Curador CineDash',
            email: credentials.email.toLowerCase(),
            avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(credentials.email)}`,
            role: 'curator',
          }

          const token = generateMockToken(credentials.email)

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })

          return true
        } catch {
          set({
            isLoading: false,
            error: 'Falha ao autenticar. Tente novamente.',
          })
          return false
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        })
        useAuthStore.persist.clearStorage()
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: '@cinedash:auth',
      storage: createJSONStorage(() => localStorage),
      // Only persist session data, not ephemeral loading/error states
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

/**
 * Custom hook to consume auth state and actions cleanly.
 * Isolates visual components from direct storage details.
 */
export function useAuth() {
  const user = useAuthStore((state) => state.user)
  const token = useAuthStore((state) => state.token)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isLoading = useAuthStore((state) => state.isLoading)
  const error = useAuthStore((state) => state.error)
  const login = useAuthStore((state) => state.login)
  const logout = useAuthStore((state) => state.logout)
  const clearError = useAuthStore((state) => state.clearError)

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    clearError,
  }
}
