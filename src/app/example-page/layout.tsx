import { Chip } from "@heroui/chip"

export default async function ExamplePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {
  return (
    <div className="min-h-screen p-6">
      <div><Chip>Chip2</Chip></div>
      <div>{children}</div>
    </div>
  )
}
