'use client'

/**
 * Боковая навигация админ-панели: все пункты на русском, подсветка активного маршрута.
 * Ссылки ведут на `/dashboard`, `/products` и т.д. (без префикса группы `(with-sidebar)`).
 */
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, Settings2, ShoppingCart, Store, Users } from 'lucide-react'

import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Панель управления', icon: LayoutDashboard },
  { href: '/products', label: 'Товары', icon: Package },
  { href: '/orders', label: 'Заказы', icon: ShoppingCart },
  { href: '/customers', label: 'Клиенты', icon: Users },
  { href: '/settings', label: 'Настройки', icon: Settings2 },
] as const

export function Sidebar() {
  const pathname = usePathname()

  return (
    <nav aria-label="Основная навигация" className="flex h-full flex-col gap-2 p-4">
      <div className="mb-4 flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 px-3 py-2.5 dark:bg-muted/20">
        <div className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Store className="size-5 shrink-0" aria-hidden />
        </div>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-sm font-semibold text-foreground">Демо Маркет</p>
          <p className="truncate text-xs text-muted-foreground">Админ-панель</p>
        </div>
      </div>

      <ul className="flex flex-1 flex-col gap-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === '/dashboard' ? pathname === '/dashboard' || pathname === '/' : pathname === href

          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  'hover:bg-accent hover:text-accent-foreground active:scale-[0.99]',
                  isActive
                    ? 'bg-accent text-accent-foreground shadow-sm ring-1 ring-border/80'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <Icon className="size-4 shrink-0 opacity-80" aria-hidden />
                <span className="truncate">{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>

      <p className="mt-auto border-t border-border/60 pt-4 text-center text-[10px] leading-relaxed text-muted-foreground">
        Портфолио · локальное демо
      </p>
    </nav>
  )
}

export default Sidebar
