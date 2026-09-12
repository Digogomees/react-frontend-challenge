import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'O email é obrigatório')
    .email('Informe um endereço de email válido'),
  password: z
    .string()
    .min(1, 'A senha é obrigatória')
    .refine((val) => val.length > 6, {
      message: 'A senha deve ter mais de 6 caracteres (mínimo de 7)',
    }),
})

export type LoginFormData = z.infer<typeof loginSchema>
