"use client"

import "client-only"
import { redirect, usePathname } from "next/navigation"

export function ClientConsent() {
  const isConsented = (() => {
    if (typeof window === "undefined") return true
    const storedData = localStorage.getItem("client-consent-key") ?? "0"
    return storedData === "1"
  })()
  const pathname = usePathname()

  if (isConsented || pathname.startsWith("/consent")) {
    return (
      typeof window !== "undefined"
        ? null
        : <div className={`fixed top-0 left-0 h-screen w-screen z-9999 bg-background`} suppressHydrationWarning></div>
    )
  } else {
    redirect("/consent")
  }
}

// const ClientConsent = dynamic(() => import("@/components/clientConsent"), { ssr: false })
// export { ClientConsent }
