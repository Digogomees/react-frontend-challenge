import { z } from 'zod'

const envSchema = z.object({
  VITE_TMDB_API_KEY: z.string().default(''),
  VITE_TMDB_BASE_URL: z.string().url().default('https://api.themoviedb.org/3'),
  VITE_TMDB_IMAGE_BASE_URL: z.string().url().default('https://image.tmdb.org/t/p'),
})

const parsedEnv = envSchema.safeParse(import.meta.env)

if (!parsedEnv.success) {
  console.error('❌ Configuração inválida de variáveis de ambiente:', parsedEnv.error.format())
}

export const env = parsedEnv.success
  ? parsedEnv.data
  : {
    VITE_TMDB_API_KEY: (import.meta.env.VITE_TMDB_API_KEY as string) || '',
    VITE_TMDB_BASE_URL: 'https://api.themoviedb.org/3',
    VITE_TMDB_IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
  }
