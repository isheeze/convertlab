"use client"

import { Calendar } from "lucide-react"
import { CollapsibleSection } from "../report-components/collapsible-section"
import { PointItem } from "../report-components/point-item"

export function ActionPlan({ data }: { data: any }) {
  if (!data) return null

  const phases = [
    { title: "Week 1-2: High Impact", items: data?.week_1_2_high_impact || [] },
    { title: "Days 15-45: Medium Impact", items: data?.days_15_45_medium_impact || [] },
    { title: "Days 45-90: Long Term", items: data?.days_45_90_long_term || [] },
  ]

  return (
    <CollapsibleSection
      title="90-Day Action Plan"
      icon={<Calendar className="w-6 h-6" />}
      description="Prioritized roadmap for maximum CRO improvement"
    >
      <div className="space-y-6">
        {phases.map((phase, phaseIdx) => (
          <div key={phaseIdx} className={phaseIdx > 0 ? "pt-6 border-t border-white/40" : ""}>
            <h3 className="text-lg font-semibold mb-4">{phase.title}</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {phase.items.map((item: string, i: number) => (
                <PointItem key={i} text={item} type="positive" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </CollapsibleSection>
  )
}
