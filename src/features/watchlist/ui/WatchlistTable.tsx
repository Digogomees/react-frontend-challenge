import { useMemo, useState } from 'react'
import {
    useTable,
    tableFeatures,
    rowSortingFeature,
    createSortedRowModel,
    columnVisibilityFeature,
    type ColumnDef,
    type SortingState,
} from '@tanstack/react-table'

import { Movie } from '@entities/movie'
import { useWatchlistStore } from '../model/watchlistStore'
import { Button } from '@shared/ui'
import { Trash2, ArrowUpDown, Film } from 'lucide-react'
import { Link } from '@tanstack/react-router'

const features = tableFeatures({
    rowSortingFeature,
    columnVisibilityFeature,
    sortedRowModel: createSortedRowModel(),
})

export function WatchlistTable() {
    const { movies, removeMovie } = useWatchlistStore()

    const [sorting, setSorting] = useState<SortingState>([])

    const columns = useMemo<ColumnDef<Movie>[]>(
        () => [
            {
                accessorKey: 'title',

                header: ({ column }) => (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(
                                column.getIsSorted() === 'asc'
                            )
                        }
                        className="p-0 hover:bg-transparent font-bold"
                    >
                        Título

                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),

                cell: ({ row }) => {
                    const movie = row.original

                    return (
                        <Link
                            to="/movie/$id"
                            params={{
                                id: String(movie.id),
                            }}
                            className="hover:underline font-medium text-foreground"
                        >
                            {movie.title}
                        </Link>
                    )
                },
            },

            {
                accessorKey: 'genre_ids',

                header: ({ column }) => (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(
                                column.getIsSorted() === 'asc'
                            )
                        }
                        className="p-0 hover:bg-transparent font-bold"
                    >
                        Gênero

                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),

                /**
                 * Mantendo seu mapeamento simplificado
                 * por enquanto.
                 */
                cell: () => (
                    <span className="text-muted-foreground">
                        Filme / Aventura
                    </span>
                ),
            },

            {
                accessorKey: 'release_date',

                header: 'Data de Lançamento',

                cell: ({ row }) => {
                    const date = row.original.release_date

                    return (
                        <span>
                            {date
                                ? new Date(date).getFullYear()
                                : 'N/A'}
                        </span>
                    )
                },
            },

            {
                accessorKey: 'vote_average',

                header: ({ column }) => (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(
                                column.getIsSorted() === 'asc'
                            )
                        }
                        className="p-0 hover:bg-transparent font-bold"
                    >
                        Rating

                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),

                cell: ({ row }) => {
                    const rating = row.original.vote_average

                    return (
                        <span>
                            ⭐ {rating.toFixed(1)}
                        </span>
                    )
                },
            },

            {
                id: 'actions',

                header: 'Ações',

                cell: ({ row }) => (
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                            removeMovie(row.original.id)
                        }
                    >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remover
                    </Button>
                ),
            },
        ],
        [removeMovie]
    )

    const table = useTable({
        features,
        columns,
        data: movies,

        state: {
            sorting,
        },

        onSortingChange: setSorting,
    })

    if (movies.length === 0) {
        return (
            <div className="text-center py-16 space-y-3">
                <Film className="h-16 w-16 mx-auto text-muted-foreground" />

                <h2 className="text-2xl font-bold text-foreground">
                    Sua Watchlist está vazia
                </h2>

                <p className="text-muted-foreground">
                    Adicione filmes através da página de descoberta
                    para vê-los aqui.
                </p>
            </div>
        )
    }

    return (
        <div className="rounded-md border border-border overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead className="bg-muted/50 border-b border-border">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="p-4 font-semibold text-sm"
                                >
                                    {header.isPlaceholder ? null : (
                                        <table.FlexRender
                                            header={header}
                                        />
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr
                            key={row.id}
                            className="border-b border-border hover:bg-muted/20 transition-colors"
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className="p-4 text-sm"
                                >
                                    <table.FlexRender
                                        cell={cell}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}