import { describe, it, expect, beforeEach } from 'vitest'
import { useThemeStore } from './themeStore'

beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = ''

    useThemeStore.setState({ theme: 'dark' })

    localStorage.clear()
    document.documentElement.className = 'dark'
})

function hasClass(cls: string) {
    return document.documentElement.classList.contains(cls)
}


describe('Theme Store (Zustand + persist)', () => {
    it('deve iniciar com o tema "dark"', () => {
        expect(useThemeStore.getState().theme).toBe('dark')
        expect(hasClass('dark')).toBe(true)
        expect(hasClass('light')).toBe(false)
    })

    it('setTheme altera o tema e a classe do html', () => {
        const { setTheme } = useThemeStore.getState()

        setTheme('light')
        expect(useThemeStore.getState().theme).toBe('light')
        expect(hasClass('light')).toBe(true)
        expect(hasClass('dark')).toBe(false)

        setTheme('dark')
        expect(useThemeStore.getState().theme).toBe('dark')
        expect(hasClass('dark')).toBe(true)
        expect(hasClass('light')).toBe(false)
    })

    it('toggleTheme troca entre dark e light', () => {
        const { toggleTheme } = useThemeStore.getState()

        toggleTheme()
        expect(useThemeStore.getState().theme).toBe('light')
        expect(hasClass('light')).toBe(true)

        toggleTheme()
        expect(useThemeStore.getState().theme).toBe('dark')
        expect(hasClass('dark')).toBe(true)
    })

    it('persiste o tema em localStorage', () => {
        const { setTheme } = useThemeStore.getState()

        setTheme('light')
        const stored = localStorage.getItem('cinedash-theme')

        expect(stored).not.toBeNull()
        const parsed = JSON.parse(stored!)

        expect(parsed.state.theme).toBe('light')
    })

    it('reidrata o tema salvo no localStorage', async () => {
        useThemeStore.setState({ theme: 'dark' })
        localStorage.setItem(
            'cinedash-theme',
            JSON.stringify({
                state: {
                    theme: 'light',
                },
                version: 0,
            }),
        )

        document.documentElement.className = ''

        await useThemeStore.persist.rehydrate()

        expect(useThemeStore.getState().theme).toBe('light')
        expect(hasClass('light')).toBe(true)
        expect(hasClass('dark')).toBe(false)
    })
})
