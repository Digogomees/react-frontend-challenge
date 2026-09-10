export interface Genre {
  id: number
  name: string
}

export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  popularity: number
  original_language: string
}

export interface CastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
}

export interface VideoTrailer {
  id: string
  key: string
  name: string
  site: string
  type: string
  official: boolean
}

export interface MovieDetail extends Omit<Movie, 'genre_ids'> {
  genres: Genre[]
  runtime: number | null
  tagline: string | null
  status: string
  credits?: {
    cast: CastMember[]
  }
  videos?: {
    results: VideoTrailer[]
  }
}

export interface TMDBPaginatedResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface MovieDiscoverFilters {
  page?: number
  query?: string
  genreId?: number | null
  year?: number | null
  minRating?: number | null
  sortBy?: string
}
