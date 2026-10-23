import { cn } from "@/lib/utils/className"
import { Card } from "@heroui/react/card"
import { motion } from "framer-motion"

export function DataCard({
  upperText,
  mainText,
  className,
  index = 0,
}: {
  upperText: string
  mainText: string
  className: string
  index?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Card className="p-3 transition-transform">
        <Card.Content className="text-center">
          <p className="text-sm text-foreground/80 mb-1">{upperText}</p>
          <p className={cn("text-3xl font-bold", className)}>{mainText}</p>
        </Card.Content>
      </Card>
    </motion.div>
  )
}
