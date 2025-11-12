import { cn } from "@/lib/utils/className"
import { Chip } from "@heroui/chip"

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
          className="text-xs"
          color="secondary"
          variant="flat"
        >
          {genre}
        </Chip>
      ))}
    </div>
  )
}
