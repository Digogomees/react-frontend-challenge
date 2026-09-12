import { Movie } from '../model/types'
import { env } from '@shared/config'

export interface MovieResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

interface DiscoverParams {
  page?: number
  genreId?: string
  year?: string
  minRating?: string
}

export const fetchPopularMovies = async ({
  page = 1,
  genreId,
  year,
  minRating,
}: DiscoverParams): Promise<MovieResponse> => {
  const params = new URLSearchParams({
    api_key: env.VITE_TMDB_API_KEY,
    page: String(page),
    sort_by: 'popularity.desc',
  })

  if (genreId) params.append('with_genres', genreId)
  if (year) params.append('primary_release_year', year)
  if (minRating) params.append('vote_average.gte', minRating)

  const res = await fetch(`${env.VITE_TMDB_BASE_URL}/discover/movie?${params.toString()}`)
  if (!res.ok) throw new Error('Falha ao carregar os filmes populares')
  return res.json()
}

export const searchMovies = async ({
  query,
  page = 1,
}: {
  query: string
  page: number
}): Promise<MovieResponse> => {
  if (!query) return { results: [], page: 1, total_pages: 0, total_results: 0 }
  const res = await fetch(
    `${env.VITE_TMDB_BASE_URL}/search/movie?api_key=${env.VITE_TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  )
  if (!res.ok) throw new Error('Falha na busca de filmes')
  return res.json()
}

export const getPosterUrl = (posterPath: string | null) => {
  if (!posterPath) return '/placeholder.png'
  return `https://image.tmdb.org/t/p/w500${posterPath}`
}