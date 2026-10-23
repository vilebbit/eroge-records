"use client"

import { Button } from "@heroui/react/button"
import { Dropdown } from "@heroui/react/dropdown"
import { Label } from "@heroui/react/label"
import { IconLanguage } from "@tabler/icons-react"
import { useTranslation } from "react-i18next"

export function LanguageSwitch() {
  const { i18n, t } = useTranslation()

  const languages = [
    { code: "en", label: t("language.english") },
    { code: "zh", label: t("language.chinese") },
    { code: "ja", label: t("language.japanese") },
  ]

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode)
    if (typeof window !== "undefined") {
      localStorage.setItem("language", languageCode)
      document.documentElement.lang = languageCode
    }
  }

  return (
    <Dropdown>
      <Button
        isIconOnly
        variant="ghost"
        aria-label={t("language.select")}
        className="w-10 h-10"
      >
        <IconLanguage size={20} />
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu
          aria-label={t("language.select")}
          selectedKeys={new Set([i18n.language])}
          selectionMode="single"
          onAction={(key) => handleLanguageChange(key as string)}
        >
          {languages.map((lang) => (
            <Dropdown.Item key={lang.code} id={lang.code} textValue={lang.label}>
              <Dropdown.ItemIndicator />
              <Label>{lang.label}</Label>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}
