"use client"

import { Home } from "lucide-react"
import { CollapsibleSection } from "../report-components/collapsible-section"
import { PointItem } from "../report-components/point-item"

export function HomePageSection({ data }: { data: any }) {
  if (!data) return null

  return (
    <CollapsibleSection title="Homepage" icon={<Home className="w-6 h-6" />} description={data.overview}>
      <div className="space-y-6">
        {/* Issues */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-red-600 flex items-center gap-2">Issues Found</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {data.issues?.map((issue: string, i: number) => (
              <PointItem key={i} text={issue} type="negative" />
            ))}
          </div>
        </div>

        {/* Opportunities */}
        <div className="pt-6 border-t border-white/40">
          <h3 className="text-lg font-semibold mb-4 text-emerald-600 flex items-center gap-2">Opportunities</h3>
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
