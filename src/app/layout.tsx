import "@/app/globals.css"
import type { Metadata } from "next"
import { AppProviders } from "@/app/providers"
import { ClientConsent } from "@/components/clientConsent"
import { Navbar } from "@/components/layout/navbar"
import Script from "next/script"

export const metadata: Metadata = {
  title: {
    default: "Eroge Records",
    template: "%s - Eroge Records",
  },
  description: "Vibbit's eroge play records data tracker",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script defer
          src={process.env.NEXT_PUBLIC_UMAMI_URL}
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
          data-domains={process.env.NEXT_PUBLIC_UMAMI_HOST}
        />
      </head>
      <body>
        <AppProviders>
          <Navbar />
          <main className="container mx-auto px-4 py-6">
            {children}
          </main>
          <ClientConsent />
        </AppProviders>
      </body>
    </html>
  )
}
