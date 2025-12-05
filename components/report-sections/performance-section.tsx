"use client"

import { Gauge } from "lucide-react"
import { CollapsibleSection } from "../report-components/collapsible-section"
import { PointItem } from "../report-components/point-item"

export function PerformanceSection({ data }: { data: any }) {
  if (!data) return null

  const scores = data.scores || {}

  return (
    <CollapsibleSection
      title="Speed & Performance"
      icon={<Gauge className="w-6 h-6" />}
      description="Lighthouse scores and optimization recommendations"
      defaultOpen={true}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Performance", value: scores.lighthouse_performance, color: "from-orange-400 to-red-500" },
            { label: "Accessibility", value: scores.lighthouse_accessibility, color: "from-blue-400 to-blue-600" },
            { label: "Best Practices", value: scores.lighthouse_best_practices, color: "from-emerald-400 to-teal-600" },
            { label: "SEO", value: scores.lighthouse_seo, color: "from-yellow-400 to-amber-600" },
          ].map((item) => (
            <div key={item.label} className={`bg-gradient-to-br ${item.color} rounded-lg p-4 text-white shadow-lg`}>
              <div className="text-3xl font-bold">{item.value || "N/A"}</div>
              <div className="text-sm opacity-90">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Issues */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-red-600">Performance Issues</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {data.issues?.map((issue: string, i: number) => (
              <PointItem key={i} text={issue} type="negative" />
            ))}
          </div>
        </div>

        {/* Opportunities */}
        <div className="pt-6 border-t border-white/40">
          <h3 className="text-lg font-semibold mb-4 text-emerald-600">Optimization Opportunities</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {data.opportunities?.map((opp: string, i: number) => (
              <PointItem key={i} text={opp} type="positive" />
            ))}
          </div>
        </div>
      </div>
    </CollapsibleSection>
  )
}
