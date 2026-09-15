import { WatchlistTable } from '@features/watchlist'

export function WatchlistPage() {
  return (
    <div className="container py-8 space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Minha Watchlist</h1>
      <WatchlistTable />
    </div>
  )
}

export default WatchlistPage