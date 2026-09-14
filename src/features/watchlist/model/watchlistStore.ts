import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Movie } from '@entities/movie'

interface WatchlistState {
    movies: Movie[]
    addMovie: (movie: Movie) => void
    removeMovie: (id: number) => void
    isInWatchlist: (id: number | string) => boolean
}

export const useWatchlistStore = create<WatchlistState>()(
    persist(
        (set, get) => ({
            movies: [],
            addMovie: (movie) => {
                const exists = get().movies.some((m) => m.id === movie.id)
                if (!exists) {
                    set((state) => ({ movies: [...state.movies, movie] }))
                }
            },
            removeMovie: (id) => {
                set((state) => ({
                    movies: state.movies.filter((movie) => movie.id !== id),
                }))
            },
            isInWatchlist: (id) => {
                return get().movies.some((movie) => movie.id === Number(id))
            },
        }),
        {
            name: 'cinedash-watchlist', // Chave usada no localStorage
        }
    )
)