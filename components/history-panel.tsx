"use client"

import { Trash2, Calendar, TrendingUp } from "lucide-react"

interface Report {
  id: string
  storeUrl: string
  createdAt: string
  executive_summary?: {
    cro_score: number
  }
}

export function HistoryPanel({
  reports,
  onSelectReport,
  onDeleteReport,
}: {
  reports: Report[]
  onSelectReport: (report: Report) => void
  onDeleteReport: (id: string) => void
}) {
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl shadow-emerald-500/10 rounded-2xl p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-600" />
          History
        </h3>
        {reports.length > 0 && (
          <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-700 text-xs font-semibold">
            {reports.length}
          </span>
        )}
      </div>

      {reports.length === 0 ? (
        <div className="text-center py-12">
          <TrendingUp className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
          <p className="text-muted-foreground text-sm">No reports yet</p>
          <p className="text-xs text-muted-foreground mt-1">Generate your first report to get started</p>
        </div>
      ) : (
        <div className="space-y-2">
          {reports.map((report) => (
            <div
              key={report.id}
              className="p-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors border border-emerald-200 hover:border-emerald-300 group"
            >
              <button onClick={() => onSelectReport(report)} className="w-full text-left space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-foreground truncate flex-1">{report.storeUrl}</p>
                  {report.executive_summary?.cro_score && (
                    <p className="text-sm font-bold text-emerald-600 flex-shrink-0">
                      {report.executive_summary.cro_score}%
                    </p>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(report.createdAt).toLocaleDateString()}{" "}
                  {new Date(report.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  if (confirm("Delete this report?")) {
                    onDeleteReport(report.id)
                  }
                }}
                className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity w-full flex items-center justify-center gap-2 px-2 py-1 rounded text-xs bg-red-400/20 text-red-600 hover:bg-red-400/30"
              >
                <Trash2 className="w-3 h-3" />
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
