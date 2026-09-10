import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { App } from './App'

describe('App Smoke Test', () => {
  it('renders CineDash title correctly', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: /CineDash/i })).toBeInTheDocument()
  })
})
