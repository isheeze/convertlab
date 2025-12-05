"use client"

import { BarChart3 } from "lucide-react"
import { CollapsibleSection } from "../report-components/collapsible-section"
import { PointItem } from "../report-components/point-item"

export function HeuristicSection({ data }: { data: any }) {
  if (!data) return null

  return (
    <CollapsibleSection
      title="UX Heuristics Evaluation"
      icon={<BarChart3 className="w-6 h-6" />}
      description="Nielsen's 10 usability heuristics and Fogg's behavior model analysis"
    >
      <div className="space-y-6">
        {/* Nielsen's Heuristics */}
        {data.nielsen && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-600">Nielsen's 10 Usability Heuristics</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {data.nielsen?.map((item: string, idx: number) => (
                <PointItem key={idx} text={item} type="positive" />
              ))}
            </div>
          </div>
        )}

        {/* Fogg's Behavior Model */}
        {data.fogg && (
          <div className="pt-6 border-t border-white/40">
            <h3 className="text-lg font-semibold mb-4 text-emerald-600">Fogg's Behavior Model</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {data.fogg?.map((item: string, idx: number) => (
                <PointItem key={idx} text={item} type="positive" />
              ))}
            </div>
          </div>
        )}

        {/* Clarity Index */}
        {data.clarity_index && (
          <div className="pt-6 border-t border-white/40">
            <h3 className="text-lg font-semibold mb-4">Clarity Index Scores</h3>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 space-y-3">
              {Object.entries(data.clarity_index).map(([key, value]: [string, any], idx: number) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground capitalize">{key.replace(/_/g, " ")}</span>
                  <span className="font-semibold text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </CollapsibleSection>
  )
}
