'use client'

/**
 * Быстрое переключение темы для блока настроек (синхронизировано с next-themes на `<html>`).
 * Отдельно от компактной кнопки в шапке Layout — здесь явные подписи RU.
 */
import { useEffect, useState } from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/Button'
import { cn } from '@/lib/utils'

type ThemeValue = 'light' | 'dark' | 'system'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={cn('flex h-9 gap-1 rounded-lg border border-input bg-background p-1', className)} aria-hidden />
    )
  }

  const current = (theme ?? 'system') as ThemeValue

  const items: { value: ThemeValue; label: string; icon: typeof Sun }[] = [
    { value: 'light', label: 'Светлая', icon: Sun },
    { value: 'dark', label: 'Тёмная', icon: Moon },
    { value: 'system', label: 'Системная', icon: Monitor },
  ]

  return (
    <div
      className={cn(
        'inline-flex flex-wrap gap-1 rounded-lg border border-input bg-muted/30 p-1 dark:bg-muted/20',
        className,
      )}
      role="group"
      aria-label="Тема оформления"
    >
      {items.map(({ value, label, icon: Icon }) => {
        const active = current === value
        return (
          <Button
            key={value}
            type="button"
            variant={active ? 'default' : 'ghost'}
            size="sm"
            className={cn(
              'gap-1.5 px-2.5 transition-all duration-200 sm:px-3',
              !active && 'hover:bg-background/80',
            )}
            onClick={() => setTheme(value)}
            aria-pressed={active}
            title={label}
          >
            <Icon className="size-3.5 shrink-0" aria-hidden />
            <span className="hidden sm:inline">{label}</span>
          </Button>
        )
      })}
    </div>
  )
}
