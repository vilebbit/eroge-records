"use client"

import { Button } from "@heroui/react/button"
import { IconMoon, IconSun } from "@tabler/icons-react"
import { useEffect, useSyncExternalStore } from "react"
import { useTranslation } from "react-i18next"

function subscribeTheme(onChange: () => void) {
  window.addEventListener("storage", onChange)
  window.addEventListener("theme-change", onChange)
  return () => {
    window.removeEventListener("storage", onChange)
    window.removeEventListener("theme-change", onChange)
  }
}

function getTheme(): "light" | "dark" {
  return localStorage.getItem("theme") === "light" ? "light" : "dark"
}

function getServerTheme(): "light" | "dark" {
  return "dark"
}

export function ThemeSwitch() {
  const { t } = useTranslation()
  const theme = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme)

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(theme)
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    localStorage.setItem("theme", newTheme)
    window.dispatchEvent(new Event("theme-change"))
  }

  return (
    <Button
      isIconOnly
      variant="ghost"
      onPress={toggleTheme}
      aria-label={theme === "dark" ? t("theme.switchToLight") : t("theme.switchToDark")}
      className="w-10 h-10"
    >
      {theme === "dark" ? <IconSun size={20} /> : <IconMoon size={20} />}
    </Button>
  )
}
