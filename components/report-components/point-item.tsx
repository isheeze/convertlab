"use client"

import { CheckCircle, AlertCircle } from "lucide-react"

interface PointItemProps {
  text: string
  type: "positive" | "negative"
  index?: number
}

export function PointItem({ text, type, index }: PointItemProps) {
  const isPositive = type === "positive"
  const bgColor = isPositive ? "bg-emerald-50" : "bg-red-50"
  const borderColor = isPositive ? "border-emerald-200" : "border-red-200"
  const iconColor = isPositive ? "text-emerald-600" : "text-red-600"

  return (
    <div className={`flex gap-3 p-4 rounded-lg ${bgColor} border ${borderColor}`}>
      {isPositive ? (
        <CheckCircle className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />
      ) : (
        <AlertCircle className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />
      )}
      <p className="text-sm text-foreground">{text}</p>
    </div>
  )
}
