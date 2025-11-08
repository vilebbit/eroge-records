"use client"

import { Button } from "@heroui/button"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { t } = useTranslation()

  useEffect(() => {
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="text-center max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-danger">{t("error.title")}</h2>
        <p className="text-default-600 mb-6">
          {t("error.description")}
        </p>
        {error.message && (
          <p className="text-sm text-default-400 mb-6 font-mono bg-default-100 p-3 rounded">
            {error.message}
          </p>
        )}
        <Button
          color="primary"
          size="lg"
          onPress={reset}
        >
          {t("error.retry")}
        </Button>
      </div>
    </div>
  )
}
