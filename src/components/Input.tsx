import * as React from 'react'

import { cn } from '@/lib/utils'
import { Input as ShadcnInput } from '@/ui/input'

/**
 * Обёртка над `@/ui/input`: объединяет стили shadcn с кастомизацией на уровне приложения.
 */
export type InputProps = React.ComponentPropsWithoutRef<typeof ShadcnInput>

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <ShadcnInput
    ref={ref}
    className={cn(
      /* Общие отступы/ширина для полей в формах дашборда */
      className,
    )}
    {...props}
  />
))
Input.displayName = 'Input'

export default Input
