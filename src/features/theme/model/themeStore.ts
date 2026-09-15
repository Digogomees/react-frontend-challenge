import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

interface ThemeState {
    theme: Theme
    toggleTheme: () => void
    setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            theme: 'dark',
            toggleTheme: () => {
                const newTheme = get().theme === 'light' ? 'dark' : 'light';
                get().setTheme(newTheme);
            },
            setTheme: (theme) => {
                const root = document.documentElement;
                root.classList.remove('light', 'dark');
                root.classList.add(theme);
                set({ theme });
            },
        }),
        {
            name: 'cinedash-theme',
            // Quando a store é reidradata (ou não há nada salvo ainda),
            // garantimos que a classe correta exista.
            onRehydrateStorage: () => (state) => {
                const root = document.documentElement;
                root.classList.remove('light', 'dark');

                // Se houver um estado salvo, usa‑o; caso contrário, aplica o valor padrão.
                const themeToApply = state?.theme ?? 'dark';
                root.classList.add(themeToApply);
            },
        },
    ),
);
