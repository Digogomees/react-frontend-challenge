import * as React from 'react'
import { cn } from '@shared/lib'
import { ChevronDown } from 'lucide-react'

export interface SelectProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {
    error?: boolean
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, children, error, ...props }, ref) => {
        return (
            <div className="relative">
                <select
                    className={cn(
                        'flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors pr-10',
                        error && 'border-destructive focus-visible:ring-destructive',
                        className
                    )}
                    ref={ref}
                    {...props}
                >
                    {children}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <ChevronDown className="h-4 w-4 opacity-50" />
                </div>
            </div>
        )
    }
)
Select.displayName = 'Select'

export { Select }