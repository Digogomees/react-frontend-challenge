import { useQuery } from '@tanstack/react-query'
import { fetchMovieDetails, getPosterUrl } from '@entities/movie'
import { Skeleton, Alert } from '@shared/ui'
import { Star, Clock, Calendar, ArrowLeft, Bookmark, Play } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { movieDetailRoute } from '@/app/routes'
import { Button } from '@/shared/ui/button'
import { useWatchlistStore } from '@/features/watchlist/model/watchlistStore'

export function MovieDetailContainer() {
    const { id } = movieDetailRoute.useParams()
    const { addMovie, removeMovie, isInWatchlist } = useWatchlistStore()
    const isSaved = isInWatchlist(id)

    const { data: movie, isLoading, error } = useQuery({
        queryKey: ['movies', 'detail', id],
        queryFn: () => fetchMovieDetails(id),
        enabled: !!id,
        staleTime: 10 * 60 * 1000,
    })

    if (isLoading) {
        return (
            <div className="container py-8 space-y-4">
                <Skeleton className="h-8 w-32 rounded" />
                <Skeleton className="h-[450px] w-full rounded-xl" />
            </div>
        )
    }

    if (error || !movie) {
        return (
            <div className="container py-8">
                <Alert variant="destructive">Erro ao carregar detalhes do filme.</Alert>
            </div>
        )
    }

    // Filtrar o trailer oficial no YouTube se disponível
    const trailer = movie.videos?.results.find(
        (video) => video.site === 'YouTube' && video.type === 'Trailer'
    )

    // Pegar os primeiros 6 atores do elenco
    const cast = movie.credits?.cast.slice(0, 6) || []

    return (
        <div className="container py-8 space-y-8">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" /> Voltar para descoberta
            </Link>

            {/* Grid Principal: Poster e Informações Básicas */}
            <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-8 items-start">
                <div className="space-y-4">
                    <img
                        src={getPosterUrl(movie.poster_path)}
                        alt={movie.title}
                        className="w-full rounded-xl shadow-lg object-cover aspect-[2/3]"
                    />

                    {/* Botão para adicionar/remover da watchlist reutilizando a regra existente */}
                    <Button
                        variant={isSaved ? "secondary" : "default"}
                        className="w-full h-12 gap-2 text-base"
                        onClick={() => {
                            // Exemplo de chamada da regra existente:
                            isSaved ? removeMovie(movie.id) : addMovie(movie)
                        }}
                    >
                        <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
                        {isSaved ? 'Remover da Watchlist' : 'Adicionar à Watchlist'}
                    </Button>
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-bold text-foreground">{movie.title}</h1>
                    {movie.tagline && <p className="text-lg italic text-muted-foreground">"{movie.tagline}"</p>}

                    <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground">
                        <div className="flex items-center gap-1 text-yellow-500 font-semibold">
                            <Star className="h-5 w-5 fill-current" />
                            <span>{movie.vote_average.toFixed(1)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(movie.release_date).getFullYear()}</span>
                        </div>
                        {(movie.runtime ?? 0) > 0 && (
                            <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{movie.runtime} min</span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {movie.genres.map((genre) => (
                            <span key={genre.id} className="px-3 py-1 bg-muted rounded-full text-xs font-medium">
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    <div className="space-y-2 pt-2">
                        <h3 className="text-xl font-semibold">Sinopse</h3>
                        <p className="text-muted-foreground leading-relaxed">{movie.overview || 'Sinopse não disponível.'}</p>
                    </div>
                </div>
            </div>

            {/* Elenco */}
            {cast.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-border">
                    <h3 className="text-2xl font-bold">Elenco Principal</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {cast.map((actor) => (
                            <div key={actor.id} className="text-center space-y-2">
                                <img
                                    src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : '/placeholder.png'}
                                    alt={actor.name}
                                    className="w-full h-44 object-cover rounded-lg shadow"
                                />
                                <p className="font-semibold text-sm line-clamp-1">{actor.name}</p>
                                <p className="text-xs text-muted-foreground line-clamp-1">{actor.character}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Trailer */}
            {trailer && (
                <div className="space-y-4 pt-6 border-t border-border">
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                        <Play className="h-6 w-6 text-primary" /> Trailer Oficial
                    </h3>
                    <div className="aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg bg-black">
                        <iframe
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            title={trailer.name}
                            className="w-full h-full"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </div>
    )
}