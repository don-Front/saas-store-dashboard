'use client'

/**
 * Демо-страница настроек: форма с локальным state + быстрый переключатель темы.
 */
import { SettingsForm } from '@/components/settings/SettingsForm'
import { ThemeToggle } from '@/components/settings/ThemeToggle'

export function DemoSettings() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Настройки</h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Профиль, параметры магазина и уведомления (демо без сохранения на сервере).
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <span className="text-xs font-medium text-muted-foreground">Быстрая тема</span>
          <ThemeToggle />
        </div>
      </header>

      <SettingsForm />
    </div>
  )
}
