"use client"

import { Button } from "@heroui/react/button"
import { IconMenu2 } from "@tabler/icons-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { ThemeSwitch } from "@/components/layout/themeSwitch"
import { LanguageSwitch } from "@/components/layout/languageSwitch"
import { MobileDrawer } from "@/components/layout/mobileDrawer"
import { NAVIGATION_ROUTES } from "@/lib/constants/routes"

export function Navbar() {
  const pathname = usePathname()
  const { t } = useTranslation()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  if (pathname.startsWith("/consent")) {
    return null
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-lg">
        <nav aria-label={t("nav.navigation")} className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
          {/* Mobile burger menu */}
          <div className="md:hidden">
            <Button
              isIconOnly
              variant="ghost"
              onPress={() => setIsDrawerOpen(true)}
              aria-label="Open navigation menu"
            >
              <IconMenu2 size={24} />
            </Button>
          </div>

          {/* Brand */}
          <div className="shrink-0">
            <Link href="/" className="font-bold text-xl">
              {t("app.title")}
            </Link>
          </div>

          {/* Desktop navigation */}
          <ul className="hidden md:flex items-center gap-4 border-l border-border pl-4">
            {NAVIGATION_ROUTES.map((route) => {
              const isActive = pathname === route.path
              return (
                <li key={route.path}>
                  <Link
                    href={route.path}
                    aria-current={isActive ? "page" : undefined}
                    className={`${isActive
                      ? "text-accent font-semibold"
                      : "text-foreground hover:text-accent transition-colors"}`}
                  >
                    {t(`nav.${route.label.toLowerCase()}`)}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Language and theme switches */}
          <div className="ml-auto flex items-center gap-2">
            <LanguageSwitch />
            <ThemeSwitch />
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  )
}
