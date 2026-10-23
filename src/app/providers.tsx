"use client"

import { I18nProvider } from "@/components/i18nProvider"
import { useEffect } from "react"
import i18n from "@/i18n"

export function AppProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize language from localStorage
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage && ["en", "zh", "ja"].includes(savedLanguage)) {
      i18n.changeLanguage(savedLanguage)
      document.documentElement.lang = savedLanguage
    }
  }, [])

  return (
    <I18nProvider>
      {children}
    </I18nProvider>
  )
}
