import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { App } from './App'
import { useAuthStore } from '@features/auth'

describe('App Smoke Test', () => {
  beforeEach(() => {
    localStorage.clear()
    useAuthStore.getState().logout()
  })

  it('renders CineDash and redirects to login when unauthenticated', async () => {
    render(<App />)
    expect(await screen.findByRole('heading', { level: 1, name: /CineDash/i })).toBeInTheDocument()
    expect(await screen.findByText(/Autenticação Simulada/i)).toBeInTheDocument()
  })
})

