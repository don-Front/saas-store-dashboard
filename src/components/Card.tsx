import * as React from 'react'

import { cn } from '@/lib/utils'
import { Card as ShadcnCard } from '@/ui/card'

/**
 * Корневая обёртка карточки; секции (Header, Title, …) импортируйте из этого модуля —
 * они совпадают с `@/ui/card`, но точка расширения — только обёртка `Card`.
 */
export type CardProps = React.ComponentProps<typeof ShadcnCard>

export function Card({ className, ...props }: CardProps) {
  return <ShadcnCard className={cn(className)} {...props} />
}

export {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/ui/card'

export default Card
