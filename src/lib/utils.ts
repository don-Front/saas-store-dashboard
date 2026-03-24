/**
 * Утилита для безопасного объединения классов Tailwind (clsx + tailwind-merge).
 * Используется в примитивах `@/ui/*` и обёртках `@/components/*`.
 */
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
