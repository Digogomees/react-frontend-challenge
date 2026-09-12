import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Film, Lock, Mail, ShieldAlert, Sparkles, Loader2 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Input, Badge } from '@shared/ui'
import { loginSchema, type LoginFormData } from '../model/loginSchema'
import { useAuth } from '../model/authStore'

interface LoginFormProps {
  onSuccess?: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { login, isLoading, error, clearError } = useAuth()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
  })

  const onSubmit = async (data: LoginFormData) => {
    clearError()
    const success = await login(data)
    if (success && onSuccess) {
      onSuccess()
    }
  }

  // Quick fill helper for technical evaluation & curatorship testing
  const handleQuickFill = () => {
    setValue('email', 'curador.cinema@cinedash.io', { shouldValidate: true })
    setValue('password', 'cinema2026', { shouldValidate: true })
  }

  return (
    <Card className="w-full max-w-md border-border/80 bg-card/95 shadow-2xl backdrop-blur-sm">
      <CardHeader className="space-y-3 text-center pb-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <Film className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <CardTitle as="h1" className="text-2xl font-bold tracking-tight">
              CineDash
            </CardTitle>
            <Badge variant="outline" className="text-[10px] uppercase font-semibold text-primary border-primary/30">
              Curadoria
            </Badge>
          </div>
          <CardDescription className="text-xs text-muted-foreground">
            Acesso restrito para curadores e editores de catálogo
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Explicit Mock Authentication Banner */}
        <div
          role="alert"
          aria-live="polite"
          className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-600 dark:text-amber-400 space-y-1"
        >
          <div className="flex items-center gap-1.5 font-semibold">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            <span>Autenticação Simulada (Mock Frontend)</span>
          </div>
          <p className="text-[11px] leading-relaxed text-amber-700/80 dark:text-amber-300/80">
            Não requer backend real. Use qualquer email válido e uma senha com mais de 6 caracteres para gerar uma sessão persistida no navegador.
          </p>
        </div>

        {error && (
          <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {/* Email Field */}
          <div className="space-y-1.5 text-left">
            <label
              htmlFor="email-input"
              className="text-xs font-semibold text-foreground flex items-center gap-1.5"
            >
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Email institucional</span>
            </label>
            <Input
              id="email-input"
              type="email"
              autoComplete="email"
              placeholder="curador@cinedash.io"
              error={!!errors.email}
              {...register('email')}
            />
            {errors.email && (
              <p className="text-[11px] font-medium text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1.5 text-left">
            <label
              htmlFor="password-input"
              className="text-xs font-semibold text-foreground flex items-center gap-1.5"
            >
              <Lock className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Senha de acesso</span>
            </label>
            <Input
              id="password-input"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              error={!!errors.password}
              {...register('password')}
            />
            {errors.password ? (
              <p className="text-[11px] font-medium text-destructive">
                {errors.password.message}
              </p>
            ) : (
              <p className="text-[11px] text-muted-foreground">
                Mínimo de 7 caracteres (mais de 6).
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full font-medium transition-all"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Autenticando curador...</span>
              </span>
            ) : (
              <span>Entrar no Dashboard</span>
            )}
          </Button>
        </form>

        {/* Quick Fill Helper */}
        <div className="pt-2 border-t border-border/60">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleQuickFill}
            className="w-full text-xs text-muted-foreground hover:text-foreground flex items-center justify-center gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Preencher credenciais de teste</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
