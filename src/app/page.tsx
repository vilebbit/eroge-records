"use client"

import { useTranslation } from "react-i18next"

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-4">{t("home.title")}</h1>
      <p className="text-default-600 text-lg text-center max-w-2xl">
        {t("home.description")}
      </p>
    </div>
  )
}
