import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@shared/ui'
import { Badge } from '@shared/ui'
import { Button } from '@shared/ui'

export function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <Card className="max-w-md p-2">
        <CardHeader className="space-y-3">
          <div>
            <Badge variant="default" className="text-xs uppercase tracking-wider">
              CineDash v0.1.0
            </Badge>
          </div>
          <CardTitle as="h1" className="text-2xl font-bold tracking-tight">
            CineDash — Curadoria de Filmes
          </CardTitle>
          <CardDescription>
            Estrutura inicial FSD configurada: <code className="text-xs bg-muted px-1 py-0.5 rounded">app</code>, <code className="text-xs bg-muted px-1 py-0.5 rounded">pages</code>, <code className="text-xs bg-muted px-1 py-0.5 rounded">features</code>, <code className="text-xs bg-muted px-1 py-0.5 rounded">entities</code>, <code className="text-xs bg-muted px-1 py-0.5 rounded">shared</code> e <code className="text-xs bg-muted px-1 py-0.5 rounded">styles</code>.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center gap-2">
          <Button variant="default">Explorar Filmes</Button>
          <Button variant="outline">Minha Watchlist</Button>
        </CardContent>
      </Card>
    </main>
  )
}

export default App


