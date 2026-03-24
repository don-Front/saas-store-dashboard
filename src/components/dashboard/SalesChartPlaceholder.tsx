'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'

/**
 * Заглушка под будущий график продаж (Chart.js, Recharts и т.д.).
 */
export function SalesChartPlaceholder() {
  return (
    <Card className="rounded-xl border-border/70 shadow-sm dark:shadow-black/20">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">График продаж</CardTitle>
        <CardDescription>Динамика выручки по дням</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="flex min-h-[250px] items-center justify-center rounded-xl border border-dashed border-border/90 bg-muted/30 px-4 text-center text-sm text-muted-foreground transition-colors dark:bg-muted/20"
          role="status"
          aria-label="График продаж пока не подключён"
        >
          График появится позже
        </div>
      </CardContent>
    </Card>
  )
}
