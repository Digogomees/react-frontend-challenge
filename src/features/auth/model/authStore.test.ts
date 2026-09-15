import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from './authStore'

describe('useAuthStore (Simulated Authentication)', () => {
  beforeEach(() => {
    localStorage.clear()
    useAuthStore.getState().logout()
  })

  it('starts in unauthenticated state by default', () => {
    const state = useAuthStore.getState()
    expect(state.isAuthenticated).toBe(false)
    expect(state.user).toBeNull()
    expect(state.token).toBeNull()
  })

  it('authenticates user and generates simulated JWT token', async () => {
    const success = await useAuthStore.getState().login({
      email: 'curador.teste@cinedash.com',
      password: 'senhaSegura123',
    })

    expect(success).toBe(true)

    const state = useAuthStore.getState()
    expect(state.isAuthenticated).toBe(true)
    expect(state.user).not.toBeNull()
    expect(state.user?.email).toBe('curador.teste@cinedash.com')
    expect(state.user?.role).toBe('curator')
    expect(state.user?.name).toBe('Curador teste')

    // Verify simulated token is a 3-part JWT structure
    expect(state.token).toBeDefined()
    const tokenParts = state.token?.split('.')
    expect(tokenParts?.length).toBe(3)
  })

  it('persists authentication in localStorage', async () => {
    await useAuthStore.getState().login({
      email: 'persistencia@cinedash.io',
      password: 'senhaValida789',
    })

    const storedRaw = localStorage.getItem('@cinedash:auth')
    expect(storedRaw).not.toBeNull()

    const parsed = JSON.parse(storedRaw!)
    expect(parsed.state.isAuthenticated).toBe(true)
    expect(parsed.state.user.email).toBe('persistencia@cinedash.io')
    expect(parsed.state.token).toBeDefined()
  })

  it('clears session on logout', async () => {
    await useAuthStore.getState().login({
      email: 'logout.test@cinedash.io',
      password: 'senhaValida789',
    })

    expect(useAuthStore.getState().isAuthenticated).toBe(true)

    useAuthStore.getState().logout()

    const state = useAuthStore.getState()
    expect(state.isAuthenticated).toBe(false)
    expect(state.user).toBeNull()
    expect(state.token).toBeNull()
  })
})
