import type { ReactNode } from 'react'

import { Layout } from '@/components/Layout'

/**
 * Группа маршрутов с общим каркасом дашборда.
 *
 * - Папка `(with-sidebar)` — route group: имя в скобках не попадает в URL.
 * - `Layout` из `@/components/Layout` рендерит Sidebar (слева на md+), Topbar и `<main>{children}</main>`.
 * - Вложенные `page.tsx` (dashboard, products, …) попадают в `{children}` внутри этой области контента.
 */
export default function WithSidebarLayout({
  children,
}: {
  children: ReactNode
}) {
  return <Layout>{children}</Layout>
}
