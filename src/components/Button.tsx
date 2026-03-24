import * as React from 'react'

import { cn } from '@/lib/utils'
import { Button as ShadcnButton, type ButtonProps as ShadcnButtonProps } from '@/ui/button'

/**
 * Обёртка над `@/ui/button`: те же варианты (variant, size, asChild),
 * плюс единая точка для глобальных классов дашборда через `className` / правки ниже.
 */
export type ButtonProps = ShadcnButtonProps

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <ShadcnButton
      ref={ref}
      className={cn(
        /* Добавьте сюда классы по умолчанию для всех кнопок приложения, например tracking-wide */
        className,
      )}
      {...props}
    />
  ),
)
Button.displayName = 'Button'

export default Button
