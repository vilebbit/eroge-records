import "@/app/globals.css"
import type { Metadata } from "next"
import { HeroProviders } from "@/app/providers"
import { ClientConsent } from "@/components/clientConsent"

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
        <main>
          <HeroProviders>
            {children}
            <ClientConsent />
          </HeroProviders>
        </main>
      </body>
    </html>
  )
}
