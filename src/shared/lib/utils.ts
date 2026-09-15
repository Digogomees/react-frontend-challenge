import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind classes safely with clsx and twMerge.
 * Prevents class collisions (e.g. `p-4` vs `p-2`).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
