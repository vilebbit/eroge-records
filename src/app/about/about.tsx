"use client"

import Link from "next/link"
import { useTranslation } from "react-i18next"

export function About() {
  const { t } = useTranslation()

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-8">{t("about.title")}</h1>
      <p className="text-xl">
        <span>{t("about.owner")}</span>
        <span className="text-primary hover:underline">
          <Link target="_blank" rel="noopener" href="https://vibbit.me">
            Vibbit
          </Link>
        </span>
      </p>
      <p className="text-xl">
        <span>{t("about.source")}</span>
        <span className="text-primary hover:underline">
          <Link
            target="_blank"
            rel="noopener"
            href="https://github.com/vilebbit/eroge-records"
          >
            GitHub
          </Link>
        </span>
      </p>
    </div>
  )
}
