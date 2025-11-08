"use client"

import { IconMoodEmpty } from "@tabler/icons-react"
import { useTranslation } from "react-i18next"

interface EmptyStateProps {
  title?: string
  description?: string
}

export function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-default-300 mb-4">
        <IconMoodEmpty size={64} stroke={1.5} />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-default-600">
        {title || t("empty.title")}
      </h3>
      <p className="text-default-400 text-center max-w-md">
        {description || t("empty.description")}
      </p>
    </div>
  )
}
