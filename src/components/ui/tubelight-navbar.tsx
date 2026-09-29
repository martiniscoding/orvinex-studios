"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState(
    () => items.find((item) => item.url === pathname)?.name ?? items[0].name,
  )
  return (
    <div
      className={cn(
        // A full-width bar pinned to the top, square, with a hairline under it
        // rather than a ring around it.
        "fixed inset-x-0 top-0 z-50 border-b border-line bg-panel/80 backdrop-blur-lg",
        className,
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-center px-6 lg:px-10">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              aria-label={item.name}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-4 transition-colors",
                "text-foreground/80 hover:text-primary",
                isActive && "text-primary",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-[3px] bg-primary rounded-b-full">
                    <div className="absolute w-14 h-6 bg-primary/20 rounded-full blur-md -top-1 -left-2" />
                    <div className="absolute w-10 h-6 bg-primary/20 rounded-full blur-md top-0" />
                    <div className="absolute w-5 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2.5" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
