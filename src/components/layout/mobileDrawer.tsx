"use client"

import { Button } from "@heroui/button"
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal"
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="top"
      size="full"
      classNames={{
        base: "m-0 sm:m-0",
        wrapper: "items-start",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-xl">
          {t("nav.navigation")}
        </ModalHeader>
        <ModalBody className="pb-6">
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
                  <Link href={route.path} onClick={onClose}>
                    <Button
                      className="w-full justify-start text-lg"
                      variant={isActive ? "flat" : "light"}
                      color={isActive ? "primary" : "default"}
                      size="lg"
                    >
                      {t(`nav.${route.label.toLowerCase()}`)}
                    </Button>
                  </Link>
                </motion.div>
              )
            })}
          </nav>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
