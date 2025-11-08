import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NSFW Warning",
  description: "NSFW Warning and Consent Page",
}

export default function ConsentLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <>
      {children}
    </>
  )
}
