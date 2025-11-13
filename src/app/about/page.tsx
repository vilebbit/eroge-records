import type { Metadata } from "next"
import { About } from "./about"

export const metadata: Metadata = {
  title: "About",
}

export default async function AboutPage() {
  return (
    <div>
      <About />
    </div>
  )
}
