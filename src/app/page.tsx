import { Code } from "@heroui/code"
import { Chip } from "@heroui/chip"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Eroge Records - Home",
  description: "Welcome to Eroge Records",
}

export default function Home() {
  return (
    <div>
      <p>this is the main page</p>
      <Chip>Chip1</Chip>
      <Code>This is some code</Code>
      <p><Link href="/example-page">Click me</Link></p>
    </div>
  )
}
