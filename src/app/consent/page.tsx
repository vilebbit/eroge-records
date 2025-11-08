"use client"

import { Button } from "@heroui/button"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion, Variants } from "framer-motion"
import { useState } from "react";

export default function ConsentPage() {
  const [isTickVisible, setIsTickVisible] = useState<boolean>(false)
  const router = useRouter()
  return (
    <div className="relative p-4 flex flex-col items-center justify-center min-h-[calc(100vh-16px)]">
      <AnimatePresence>
        {
          isTickVisible === false
            ? <motion.div
              className={`flex flex-col items-center justify-center`}
              initial={{ opacity: 0, filter: "blur(10px)", transform: "translateY(-32px)" }}
              animate={{ opacity: 1, filter: "none", transform: "translateY(0)" }}
              exit={{ opacity: 0, filter: "blur(10px)", transform: "translateY(-32px)" }}
              transition={{ duration: 0.3, type: "tween", ease: "linear" }}
            >
              <h1 className="text-2xl sm:text-4xl font-bold mb-8">NSFW Warning</h1>
              <p className="mb-8 whitespace-pre-line sm:text-center px-8 sm:px-0">
                This website contains NSFW contents.<br />
                Please confirm you are allowed to view this type of contents in your region.
              </p>
              <p className="mb-8 whitespace-pre-line sm:text-center px-8 sm:px-0">
                このウェブサイトには NSFW コンテンツが含まれています。<br />
                お住まいの地域でこの種のコンテンツを閲覧することが許可されていることを確認してください。
              </p>
              <p className="mb-8 whitespace-pre-line sm:text-center px-8 sm:px-0">
                本网站包含 NSFW 内容。<br />
                请确认您所在的国家或地区的法律允许您阅览此类内容。
              </p>
              <div>
                <Button onPress={async () => {
                  localStorage.setItem("client-consent-key", "1")
                  setIsTickVisible(true)
                  setTimeout(() => router.replace("/"), 2000)
                }}>
                  OK
                </Button>
              </div>
            </motion.div>
            : null
        }
      </AnimatePresence>
      <div className={`${isTickVisible === false ? "hidden" : ""} w-[min(60vw,60vh)] h-[min(60vw,60vh)] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 50 50"
          animate={isTickVisible === false ? "hidden" : "visible"}
        >
          <motion.path
            id="tick"
            fill="none"
            strokeWidth="3"
            stroke="#ff0088"
            d="M14,26 L 22,33 L 35,16"
            variants={drawTick}
            style={{
              strokeLinecap: "round",
              strokeLinejoin: "round",
              fill: "transparent",
            }}
          />
        </motion.svg>
      </div>
    </div>
  )
}

const drawTick: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { type: "spring", duration: 1.5, bounce: 0 },
      opacity: { duration: 0.01 },
    },
  },
}
