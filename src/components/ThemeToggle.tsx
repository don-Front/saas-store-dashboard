'use client'

/**
 * Кнопка переключения светлой / тёмной темы.
 * Использует `useTheme` из next-themes; до гидрации показывает пустой плейсхолдер того же размера,
 * чтобы избежать рассинхрона SSR и клиента.
 */
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/Button'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        className={cn('size-9 shrink-0 rounded-md border border-input bg-background', className)}
        aria-hidden
      />
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className={cn('shrink-0 transition-colors duration-200', className)}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
    >
      {isDark ? (
        <Sun className="size-[1.125rem] text-foreground transition-transform duration-200" aria-hidden />
      ) : (
        <Moon className="size-[1.125rem] text-foreground transition-transform duration-200" aria-hidden />
      )}
    </Button>
  )
}
