import { Link } from '@tanstack/react-router'
import { Card } from '@shared/ui'
import { Star } from 'lucide-react'
import { Movie } from '../model/types'
import { getPosterUrl } from '../api/movieQueries'
import { genreMap } from '../model/genres'

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const firstGenre = movie.genre_ids[0]
  const remainingGenres = movie.genre_ids.length - 1
  return (
    <Link to="/movie/$id" params={{ id: String(movie.id) }} className="block">
      <Card className="group overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer h-full">
        <img
          src={getPosterUrl(movie.poster_path)}
          alt={movie.title}
          className="w-full h-[350px] object-cover transition-transform group-hover:scale-110 duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.png'
          }}
          loading="lazy"
        />
        <div className="p-4">
          <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {movie.title}
          </h3>
          <div className="flex items-center gap-1 text-yellow-500 mb-4">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <span className="px-2 py-1 bg-muted rounded text-xs">
              {genreMap[firstGenre] ?? 'Outros'}
              {remainingGenres > 0 && ` +${remainingGenres}`}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  )
}