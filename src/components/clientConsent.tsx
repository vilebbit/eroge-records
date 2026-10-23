"use client"

import "client-only"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { useClient } from "@/lib/hook/useClient"

export function ClientConsent() {
  const isClient = useClient()
  const pathname = usePathname()
  const router = useRouter()
  const isConsentPage = pathname.startsWith("/consent")
  const isConsented = isClient && localStorage.getItem("client-consent-key") === "1"

  useEffect(() => {
    if (isClient && !isConsented && !isConsentPage) {
      router.replace("/consent")
    }
  }, [isClient, isConsented, isConsentPage, router])

  if (isConsentPage || isConsented) {
    return null
  }

  return <div className="fixed inset-0 z-9999 bg-background" aria-hidden="true" />
}
