'use client'

import type { LucideIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card'
import { cn } from '@/lib/utils'

type KpiCardProps = {
  /** Подпись метрики (например «Выручка»). */
  title: string
  /** Отформатированное значение для отображения. */
  value: string
  /** Подзаголовок: динамика, период и т.п. */
  caption: string
  /** Необязательная иконка слева от заголовка. */
  icon?: LucideIcon
  className?: string
}

/**
 * Компактная KPI-плитка: hover с лёгким подъёмом и усилением тени (dark mode учтён).
 */
export function KpiCard({ title, value, caption, icon: Icon, className }: KpiCardProps) {
  return (
    <Card
      className={cn(
        'rounded-xl border-border/70 bg-card transition-all duration-200',
        'hover:-translate-y-0.5 hover:shadow-md hover:border-border',
        'dark:hover:shadow-lg dark:hover:shadow-black/30',
        className,
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {Icon ? (
          <Icon className="size-4 text-muted-foreground/80" aria-hidden />
        ) : null}
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-2xl font-bold tracking-tight text-foreground tabular-nums sm:text-3xl">{value}</p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{caption}</p>
      </CardContent>
    </Card>
  )
}
