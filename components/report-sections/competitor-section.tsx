"use client"

import { Users } from "lucide-react"
import { CollapsibleSection } from "../report-components/collapsible-section"
import { PointItem } from "../report-components/point-item"

export function CompetitorSection({ data }: { data: any }) {
  if (!data || !data.competitors) return null

  return (
    <CollapsibleSection
      title="Competitor Analysis"
      icon={<Users className="w-6 h-6" />}
      description="How your store compares to top competitors"
    >
      <div className="space-y-4">
        {data.competitors.map((competitor: any, idx: number) => (
          <div key={idx} className="border-l-4 border-emerald-400 bg-emerald-50 rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">{competitor.name}</h4>
            <p className="text-sm text-muted-foreground mb-3">
              <a
                href={competitor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline"
              >
                {competitor.url}
              </a>
            </p>
            <div className="space-y-2">
              {competitor.key_differences?.map((diff: string, didx: number) => (
                <PointItem key={didx} text={diff} type="positive" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </CollapsibleSection>
  )
}
