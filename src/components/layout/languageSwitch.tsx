"use client"

import { Button } from "@heroui/button"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown"
import { IconLanguage } from "@tabler/icons-react"
import { useTranslation } from "react-i18next"

export function LanguageSwitch() {
  const { i18n, t } = useTranslation()

  const languages = [
    { code: "en", label: t("language.english") },
    { code: "zh", label: t("language.chinese") },
    { code: "ja", label: t("language.japanese") },
  ]

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0]

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode)
    if (typeof window !== "undefined") {
      localStorage.setItem("language", languageCode)
    }
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly
          variant="light"
          aria-label={t("language.select")}
          className="w-10 h-10"
        >
          <IconLanguage size={20} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={t("language.select")}
        selectedKeys={new Set([i18n.language])}
        selectionMode="single"
        onAction={(key) => handleLanguageChange(key as string)}
      >
        {languages.map((lang) => (
          <DropdownItem key={lang.code}>
            {lang.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
