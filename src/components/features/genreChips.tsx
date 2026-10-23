import { cn } from "@/lib/utils/className"
import { Chip } from "@heroui/react/chip"

export function GenreChips({
  genres,
  className,
}: {
  genres: string[]
  className?: string
}) {
  if (genres.length === 0) {
    return null
  }

  return (
    <div className={cn("flex flex-wrap justify-start items-center gap-2", className)}>
      {genres.slice(0, 5).map((genre) => (
        <Chip
          size="sm"
          key={genre}
          className="text-xs bg-secondary/15 text-secondary"
          color="default"
          variant="soft"
        >
          {genre}
        </Chip>
      ))}
    </div>
  )
}
