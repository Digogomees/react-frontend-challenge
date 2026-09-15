import { Link, Outlet, useLocation } from '@tanstack/react-router'
import { Film, Compass, Bookmark } from 'lucide-react'
import { UserNav } from '@features/auth'
import { BrandIcon } from '@/assets/BrandIcon'

export function DashboardLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/85 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
              <BrandIcon />
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-foreground leading-none">
                  CineDash
                </span>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-primary leading-none mt-1">
                  Curadoria
                </span>
              </div>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                to="/"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${location.pathname === '/'
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
              >
                <Compass className="h-4 w-4" />
                <span>Descoberta</span>
              </Link>

              <Link
                to="/watchlist"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${location.pathname.startsWith('/watchlist')
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
              >
                <Bookmark className="h-4 w-4" />
                <span>Minha Watchlist</span>
              </Link>
            </nav>
          </div>

          {/* Right Header Actions: User Profile & Sair */}
          <div className="flex items-center gap-3">
            <UserNav />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
