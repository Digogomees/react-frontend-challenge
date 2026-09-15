import { Button } from '@shared/ui'
import { Sun, Moon } from 'lucide-react'
import { useThemeStore } from '../model/themeStore'

export function ThemeToggle() {
    const { theme, toggleTheme } = useThemeStore()

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="rounded-full w-10 h-10"
        >
            {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-500 transition-transform hover:rotate-90 duration-300" />
            ) : (
                <Moon className="h-5 w-5 text-slate-700 transition-transform hover:-rotate-12 duration-300" />
            )}
        </Button>
    )
}