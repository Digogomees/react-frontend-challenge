import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Input, Button, Skeleton, Alert, Select } from '@shared/ui'
import { useDebounce } from '@shared/hooks'
import { Search, Film, Popcorn, AlertCircle } from 'lucide-react'
import { fetchPopularMovies, searchMovies, MovieCard, Movie } from '@entities/movie'

export function MovieDiscoveryContainer() {
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearch = useDebounce(searchTerm, 500)
    const [page, setPage] = useState(1)
    const [genreId, setGenreId] = useState<string>('')
    const [year, setYear] = useState<string>('')
    const [minRating, setMinRating] = useState<string>('')

    const isSearching = debouncedSearch.trim().length > 2



    const {
        data: discoverData,
        isLoading: isLoadingDiscover,
        error: discoverError,
    } = useQuery({
        queryKey: ['movies', 'discover', { page, year, minRating, genreId }],
        queryFn: () => fetchPopularMovies({ page, year, minRating, genreId }),
        enabled: !isSearching,
        staleTime: 5 * 60 * 1000,
    })

    const {
        data: searchData,
        isLoading: isLoadingSearch,
        error: searchError,
    } = useQuery({
        queryKey: ['movies', 'search', { query: debouncedSearch, page }],
        queryFn: () => searchMovies({ query: debouncedSearch, page }),
        enabled: isSearching,
        staleTime: 5 * 60 * 1000,
    })

    const currentData = isSearching ? searchData : discoverData
    const isLoading = isSearching ? isLoadingSearch : isLoadingDiscover
    const error = isSearching ? searchError : discoverError

    const renderSkeleton = (count: number) => (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="space-y-2">
                    <Skeleton className="aspect-[2/3] w-full rounded-lg" />
                    <div className="space-y-1">
                        <Skeleton className="h-4 w-3/4 rounded" />
                        <Skeleton className="h-3 w-1/2 rounded" />
                    </div>
                </div>
            ))}
        </div>
    )

    const renderError = (err: Error) => (
        <Alert variant="destructive" className="my-6">
            <AlertCircle className="h-4 w-4" />
            <div>
                <h5 className="font-medium leading-none tracking-tight mb-1">Erro ao carregar dados</h5>
                <p className="text-sm opacity-90">{err.message}</p>
            </div>
        </Alert>
    )

    return (
        <div className="container py-8">
            <h1 className="text-4xl font-bold text-primary mb-6 flex items-center gap-2">
                <Popcorn className="text-primary h-10 w-10" />
                CineDash
            </h1>

            {/* Input de Busca com Debounce */}
            <div className="mb-6 flex gap-4 flex-wrap">
                <div className="relative flex-1 min-w-[280px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <Input
                        type="text"
                        placeholder="Buscar filmes por título (mín. 3 caracteres)..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                            setPage(1)
                        }}
                        className="pl-10 h-12 text-lg"
                    />
                </div>

                {/* Filtros simples integrados */}
                <div className="flex gap-2 flex-wrap">
                    <Select
                        value={genreId}
                        onChange={(e) => { setGenreId(e.target.value); setPage(1); }}
                        className="w-48 h-12"
                    >
                        <option value="">Todos os Gêneros</option>
                        <option value="28">Ação</option>
                        <option value="12">Aventura</option>
                        <option value="16">Animação</option>
                        <option value="35">Comédia</option>
                        <option value="80">Crime</option>
                        <option value="99">Documentário</option>
                        <option value="18">Drama</option>
                        <option value="10751">Família</option>
                        <option value="14">Fantasia</option>
                        <option value="36">História</option>
                        <option value="27">Terror</option>
                        <option value="10402">Música</option>
                        <option value="9648">Mistério</option>
                        <option value="10749">Romance</option>
                        <option value="878">Ficção Científica</option>
                        <option value="10770">Cinema TV</option>
                        <option value="53">Thriller</option>
                        <option value="10752">Guerra</option>
                        <option value="37">Faroeste</option>
                    </Select>
                    <Input
                        type="text"
                        placeholder="Ano (ex: 2023)"
                        value={year}
                        onChange={(e) => { setYear(e.target.value); setPage(1); }}
                        className="w-32 h-12"
                    />
                    <Input
                        type="text"
                        placeholder="Nota Mín. (ex: 7)"
                        value={minRating}
                        onChange={(e) => { setMinRating(e.target.value); setPage(1); }}
                        className="w-36 h-12"
                    />
                </div>
            </div>

            {/* Estados de Erro */}
            {error && renderError(error as Error)}

            {/* Estados de Loading */}
            {isLoading ? (
                renderSkeleton(12)
            ) : currentData?.results.length === 0 ? (
                /* Empty State */
                <div className="text-center py-16">
                    <Film className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-xl font-medium text-foreground">Nenhum filme encontrado.</p>
                    <p className="text-sm text-muted-foreground mt-1">Tente ajustar os filtros ou o termo de busca.</p>
                </div>
            ) : (
                <>
                    {/* Listagem de Filmes */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {currentData?.results.map((movie: Movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>

                    {/* Paginação Simples por Página */}
                    <div className="flex justify-center items-center gap-4 mt-8">
                        <Button
                            variant="outline"
                            disabled={page === 1}
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        >
                            Anterior
                        </Button>
                        <span className="text-sm font-medium">
                            Página {page} de {currentData?.total_pages && currentData.total_pages > 500 ? 500 : currentData?.total_pages || 1}
                        </span>
                        <Button
                            variant="outline"
                            disabled={page >= (currentData?.total_pages || 1)}
                            onClick={() => setPage((prev) => prev + 1)}
                        >
                            Próxima
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}