"use client"

import { Modal } from "@heroui/react/modal"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { NAVIGATION_ROUTES } from "@/lib/constants/routes"

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const pathname = usePathname()
  const { t } = useTranslation()

  return (
    <Modal.Backdrop
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <Modal.Container placement="top" size="full">
        <Modal.Dialog>
          <Modal.CloseTrigger />
          <Modal.Header>
            <Modal.Heading className="text-xl">{t("nav.navigation")}</Modal.Heading>
          </Modal.Header>
          <Modal.Body className="pb-6">
            <nav className="flex flex-col gap-2">
              {NAVIGATION_ROUTES.map((route, index) => {
                const isActive = pathname === route.path
                return (
                  <motion.div
                    key={route.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={route.path}
                      onClick={onClose}
                      aria-current={isActive ? "page" : undefined}
                      className={`block rounded-lg px-4 py-3 text-lg transition-colors focus-visible:outline-2 focus-visible:outline-accent ${isActive ? "bg-accent/15 text-accent" : "hover:bg-default"}`}
                    >
                      {t(`nav.${route.label.toLowerCase()}`)}
                    </Link>
                  </motion.div>
                )
              })}
            </nav>
          </Modal.Body>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  )
}
