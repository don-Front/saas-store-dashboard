import type { ReactNode } from 'react'

import { Sidebar } from '@/components/Sidebar'
import { ThemeToggle } from '@/components/ThemeToggle'

type LayoutProps = {
  children: ReactNode
}

/**
 * Верхняя панель: слева — зона под заголовок/поиск, справа — переключатель темы.
 */
function Topbar() {
  return (
    <header
      className="flex h-14 shrink-0 items-center justify-between gap-4 border-b bg-background px-4 md:px-6"
      role="banner"
    >
      <span className="text-sm font-medium text-foreground">Админ-панель</span>
      <div className="flex shrink-0 items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  )
}

/**
 * Базовый каркас приложения с боковой навигацией.
 *
 * Структура: `Sidebar` | колонка с `Topbar` + `main` (сюда приходит `children` из сегмента `(with-sidebar)`).
 * Сетка: одна колонка на мобиле (сайдбар скрыт), с `md` — фиксированная колонка сайдбара + гибкая область контента.
 */
export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto grid min-h-screen w-full max-w-[100vw] grid-cols-1 md:grid-cols-[minmax(0,240px)_1fr] lg:grid-cols-[minmax(0,260px)_1fr]">
        <aside className="hidden border-r border-border bg-card md:block" aria-label="Боковая панель">
          <div className="sticky top-0 flex h-full min-h-screen flex-col">
            <Sidebar />
          </div>
        </aside>

        <div className="flex min-h-screen min-w-0 flex-col md:col-start-2">
          <Topbar />
          <main className="flex-1 overflow-auto p-4 md:p-6" role="main">
            {children}
          </main>
        </div>
      </div>

      {/* Мобильный сайдбар: Sheet / Drawer — подключите здесь при необходимости */}
    </div>
  )
}

export default Layout
