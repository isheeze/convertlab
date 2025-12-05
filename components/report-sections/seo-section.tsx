"use client"

import { Search } from "lucide-react"
import { CollapsibleSection } from "../report-components/collapsible-section"
import { PointItem } from "../report-components/point-item"

export function SEOSection({ data }: { data: any }) {
  if (!data) return null

  return (
    <CollapsibleSection
      title="Technical SEO"
      icon={<Search className="w-6 h-6" />}
      description="Schema markup, meta tags, and indexability"
    >
      <div className="space-y-6">
        {/* Issues */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-red-600">Issues to Fix</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {data.issues?.map((issue: string, i: number) => (
              <PointItem key={i} text={issue} type="negative" />
            ))}
          </div>
        </div>

        {/* Opportunities */}
        <div className="pt-6 border-t border-white/40">
          <h3 className="text-lg font-semibold mb-4 text-emerald-600">Implementation Tips</h3>
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
