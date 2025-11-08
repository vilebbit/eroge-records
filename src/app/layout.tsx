import "@/app/globals.css"
import type { Metadata } from "next"
import { AppProviders } from "@/app/providers"
import { ClientConsent } from "@/components/clientConsent"
import { Navbar } from "@/components/layout/navbar"

export const metadata: Metadata = {
  title: "Eroge Records",
  description: "Game playing data charts and statistics",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en" className="dark">
      <head>
      </head>
      <body>
        <AppProviders>
          <Navbar />
          <main className="container mx-auto px-4 py-6 max-w-7xl">
            {children}
          </main>
          <ClientConsent />
        </AppProviders>
      </body>
    </html>
  )
}
