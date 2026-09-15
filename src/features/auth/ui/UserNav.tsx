import { LogOut, User as UserIcon } from 'lucide-react'
import { Button, Badge } from '@shared/ui'
import { useAuth } from '../model/authStore'
import { useNavigate } from '@tanstack/react-router'
import { ThemeToggle } from '@/features/theme'

export function UserNav() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) return null

  const handleLogout = () => {
    logout()
    navigate({ to: '/login' })
  }

  return (
    <div className="flex items-center gap-3">
      <ThemeToggle />
      <div className="flex items-center gap-2.5 rounded-full border border-border/70 bg-card/60 px-3 py-1.5 shadow-sm">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="h-7 w-7 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          ) : (
            <UserIcon className="h-4 w-4" />
          )}
        </div>
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-foreground leading-none">
              {user.name}
            </span>
            <Badge variant="outline" className="h-4 px-1 text-[9px] font-medium border-primary/30 text-primary">
              Curador
            </Badge>
          </div>
          <span className="text-[10px] text-muted-foreground leading-none">
            {user.email}
          </span>
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleLogout}
        className="h-8 px-2.5 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
        title="Encerrar sessão simulada"
      >
        <LogOut className="h-3.5 w-3.5 mr-1" />
        <span>Sair</span>
      </Button>
    </div>
  )
}
