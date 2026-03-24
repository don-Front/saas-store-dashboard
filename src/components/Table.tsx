import type { ReactNode } from 'react'

type TableProps = {
  children?: ReactNode
  className?: string
}

/**
 * Заготовка таблицы для списков (заказы, товары). При необходимости оберните `@/ui` или добавьте `table.tsx` в `ui/`.
 */
export function Table({ children, className }: TableProps) {
  return <table className={className}>{children}</table>
}

export default Table
