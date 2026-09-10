import { useEffect, useState } from 'react'

/**
 * Custom hook to debounce any fast-changing value (e.g. search input).
 * @param value The raw value to debounce
 * @param delay Time in milliseconds to wait before updating debouncedValue
 */
export function useDebounce<T>(value: T, delay: number = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
