import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect,
  useNavigate,
} from '@tanstack/react-router'
import { useAuthStore } from '@features/auth'
import { LoginPage, DiscoverPage, WatchlistPage, MovieDetailPage } from '@pages'
import { DashboardLayout } from './DashboardLayout'

// Root Route
export const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

// Public Login Route
export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState()
    if (isAuthenticated) {
      throw redirect({ to: '/' })
    }
  },
  component: function LoginComponent() {
    const navigate = useNavigate()
    return <LoginPage onSuccess={() => navigate({ to: '/' })} />
  },
})

// Authenticated Layout Route (Protected by beforeLoad guard)
export const authLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'authenticated',
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState()
    if (!isAuthenticated) {
      throw redirect({
        to: '/login',
      })
    }
  },
  component: DashboardLayout,
})

// Child routes under Authenticated Layout
export const indexRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/',
  component: DiscoverPage,
})

export const watchlistRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/watchlist',
  component: WatchlistPage,
})

export const movieDetailRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/movie/$id',
  component: MovieDetailPage,
})

// Build Route Tree
export const routeTree = rootRoute.addChildren([
  loginRoute,
  authLayoutRoute.addChildren([indexRoute, watchlistRoute, movieDetailRoute]),
])

export const router = createRouter({
  routeTree,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
