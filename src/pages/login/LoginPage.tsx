import { LoginForm } from '@features/auth'

interface LoginPageProps {
  onSuccess?: () => void
}

export function LoginPage({ onSuccess }: LoginPageProps) {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden bg-background">
      {/* Ambient background glow effects */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

      {/* Grid texture for cinema studio dashboard vibe */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"
      />

      <div className="relative z-10 w-full flex flex-col items-center">
        <LoginForm onSuccess={onSuccess} />

        <footer className="mt-8 text-center text-xs text-muted-foreground/80">
          <p>CineDash — Sistema Interno de Curadoria Cinematográfica</p>
          <p className="text-[11px] text-muted-foreground/60 mt-1">
            Desenvolvido com React 18, TypeScript, TanStack e Zustand.
          </p>
        </footer>
      </div>
    </div>
  )
}

