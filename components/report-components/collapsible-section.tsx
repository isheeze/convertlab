"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface CollapsibleSectionProps {
  title: string
  description?: string
  icon: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
}

export function CollapsibleSection({
  title,
  description,
  icon,
  children,
  defaultOpen = false,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl shadow-emerald-500/10 rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-8 flex items-center justify-between gap-4 hover:bg-white/80 transition-colors"
      >
        <div className="flex items-start gap-4 text-left flex-1">
          <div className="text-emerald-600 mt-1">{icon}</div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground">{title}</h2>
            {description && <p className="text-muted-foreground text-sm mt-1">{description}</p>}
          </div>
        </div>
        <ChevronDown
          className={`w-6 h-6 text-muted-foreground transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && <div className="border-t border-white/40 p-8 bg-white/30">{children}</div>}
    </div>
  )
}
