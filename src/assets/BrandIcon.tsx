import { Film } from "lucide-react"

export function BrandIcon() {
    return (
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md shadow-primary/20">
            <Film className="h-5 w-5" />
        </div>
    )
}