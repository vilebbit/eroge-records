"use client"

import { Button } from "@heroui/button"
import { IconMoon, IconSun } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

export function ThemeSwitch() {
  const { t } = useTranslation()
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const initialTheme = storedTheme || "dark"
    setTheme(initialTheme)
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(initialTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(newTheme)
  }

  if (!mounted) {
    return (
      <Button
        isIconOnly
        variant="light"
        aria-label={t("theme.toggle")}
        className="w-10 h-10"
      >
        <IconSun size={20} />
      </Button>
    )
  }

  return (
    <Button
      isIconOnly
      variant="light"
      onPress={toggleTheme}
      aria-label={theme === "dark" ? t("theme.switchToLight") : t("theme.switchToDark")}
      className="w-10 h-10"
    >
      {theme === "dark" ? <IconSun size={20} /> : <IconMoon size={20} />}
    </Button>
  )
}
