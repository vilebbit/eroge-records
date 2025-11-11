"use client"

import { Navbar as HeroNavbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar"
import { Button } from "@heroui/button"
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
      <HeroNavbar maxWidth="xl" isBordered>
        {/* Mobile burger menu */}
        <NavbarContent className="md:hidden" justify="start">
          <Button
            isIconOnly
            variant="light"
            onPress={() => setIsDrawerOpen(true)}
            aria-label="Open navigation menu"
          >
            <IconMenu2 size={24} />
          </Button>
        </NavbarContent>

        {/* Brand */}
        <NavbarBrand className="grow-0">
          <Link href="/" className="font-bold text-xl">
            {t("app.title")}
          </Link>
        </NavbarBrand>

        {/* Desktop navigation */}
        <NavbarContent className="hidden md:flex gap-4" justify="center">
          {NAVIGATION_ROUTES.map((route) => {
            const isActive = pathname === route.path
            return (
              <NavbarItem key={route.path} isActive={isActive}>
                <Link
                  href={route.path}
                  className={`${isActive
                    ? "text-primary font-semibold"
                    : "text-foreground hover:text-primary transition-colors"}`}
                >
                  {t(`nav.${route.label.toLowerCase()}`)}
                </Link>
              </NavbarItem>
            )
          })}
        </NavbarContent>

        {/* Language and theme switches */}
        <NavbarContent justify="end">
          <NavbarItem>
            <LanguageSwitch />
          </NavbarItem>
          <NavbarItem>
            <ThemeSwitch />
          </NavbarItem>
        </NavbarContent>
      </HeroNavbar>

      {/* Mobile drawer */}
      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  )
}
