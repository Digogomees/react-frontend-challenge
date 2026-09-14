import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { LoginForm } from './LoginForm'
import { useAuthStore } from '../model/authStore'

describe('LoginForm Component', () => {
  beforeEach(() => {
    localStorage.clear()
    useAuthStore.getState().logout()
  })

  it('renders login form with mock authentication disclaimer', () => {
    render(<LoginForm />)

    expect(screen.getByRole('heading', { level: 1, name: /CineDash/i })).toBeInTheDocument()
    expect(screen.getByText(/Autenticação Simulada \(Mock Frontend\)/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email institucional/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Senha de acesso/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Entrar no Dashboard/i })).toBeInTheDocument()
  })

  it('validates email format and required fields', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    const submitBtn = screen.getByRole('button', { name: /Entrar no Dashboard/i })
    await user.click(submitBtn)

    expect(await screen.findByText(/O email é obrigatório/i)).toBeInTheDocument()
    expect(await screen.findByText(/A senha é obrigatória/i)).toBeInTheDocument()

    // Enter invalid email format
    const emailInput = screen.getByLabelText(/Email institucional/i)
    await user.type(emailInput, 'emailinvalido')
    await user.click(submitBtn)

    expect(await screen.findByText(/Informe um endereço de email válido/i)).toBeInTheDocument()
  })

  it('enforces password rule of strictly more than 6 characters', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    const emailInput = screen.getByLabelText(/Email institucional/i)
    const passwordInput = screen.getByLabelText(/Senha de acesso/i)
    const submitBtn = screen.getByRole('button', { name: /Entrar no Dashboard/i })

    await user.type(emailInput, 'curador@cinedash.io')
    await user.type(passwordInput, '123456')
    await user.click(submitBtn)

    expect(
      await screen.findByText(/A senha deve ter mais de 6 caracteres/i)
    ).toBeInTheDocument()
  })

  it('allows quick fill of test credentials and successful login', async () => {
    const user = userEvent.setup()
    const onSuccess = vi.fn()
    render(<LoginForm onSuccess={onSuccess} />)

    const quickFillBtn = screen.getByRole('button', { name: /Preencher credenciais de teste/i })
    await user.click(quickFillBtn)

    const emailInput = screen.getByLabelText(/Email institucional/i) as HTMLInputElement
    const passwordInput = screen.getByLabelText(/Senha de acesso/i) as HTMLInputElement

    expect(emailInput.value).toBe('curador.cinema@cinedash.io')
    expect(passwordInput.value).toBe('cinema2026')

    const submitBtn = screen.getByRole('button', { name: /Entrar no Dashboard/i })
    await user.click(submitBtn)

    await waitFor(
      () => {
        expect(useAuthStore.getState().isAuthenticated).toBe(true)
        expect(onSuccess).toHaveBeenCalled()
      },
      { timeout: 2000 }
    )
  })
})
