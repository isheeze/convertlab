"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ReportForm } from "@/components/report-form"
import { ReportDisplay } from "@/components/report-display"
import { HistoryPanel } from "@/components/history-panel"
import { ArrowLeftIcon } from "lucide-react"
import { useReportHistory } from "@/hooks/use-report-history"
import { UserButton, useUser } from "@clerk/nextjs"
import { createClient } from "@supabase/supabase-js"

export default function DashboardPage() {
  const [selectedReport, setSelectedReport] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const { reports, addReport, deleteReport } = useReportHistory()
  const [remainingReports, setRemainingReports] = useState<number | null>(null)
  const { user } = useUser()

  const fetchRemainingReports = async () => {
    if (!user) return

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data, error } = await supabase
      .from("user")
      .select("remaining_reports")
      .eq("clerk_id", user.id)
      .single()

    if (data) {
      setRemainingReports(data.remaining_reports)
    }
  }

  useEffect(() => {
    fetchRemainingReports()
  }, [user])

  const handleGenerateReport = async (storeUrl: string, reportData: any) => {
    // Create report object with ID and timestamp

    const report = {
      id: Date.now().toString(),
      storeUrl,
      createdAt: new Date().toISOString(),
      report: { ...reportData },
    }

    addReport(report)
    setSelectedReport({ ...report.report, storeUrl })

    // Refresh credits
    await fetchRemainingReports()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed gradient background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-emerald-400/90 via-teal-500/90 to-cyan-500/90 blur-3xl opacity-10 rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-pink-500/20 to-transparent blur-3xl opacity-10 rounded-full"></div>
      </div>

      <nav className="sticky top-0 z-40 border-b border-emerald-200 backdrop-blur-sm bg-white/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            <ArrowLeftIcon className="w-5 h-5 text-emerald-600" />
            BrilliantSales
          </Link>
          <div className="text-sm text-muted-foreground flex items-center gap-4">
            <div className="flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              <span className="font-medium text-emerald-700">
                {remainingReports !== null ? remainingReports : "-"}
              </span>
              <span className="text-emerald-600/80">credits left</span>
            </div>
            {remainingReports === 0 && <a href="/#pricing" className="px-6 py-2.5 rounded-full font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white transition-all duration-300 shadow-lg hover:shadow-emerald-500/40">
              Buy Credits
            </a>}
            <UserButton />
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {!selectedReport ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Report Generator */}
            <div className="lg:col-span-2">
              <ReportForm onSubmit={handleGenerateReport} loading={loading} remainingReports={remainingReports} />
            </div>

            {/* History Sidebar */}
            <div>
              <HistoryPanel reports={reports} onSelectReport={setSelectedReport} onDeleteReport={deleteReport} />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <button
              onClick={() => setSelectedReport(null)}
              className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Back to Dashboard
            </button>
            <ReportDisplay report={selectedReport} />
          </div>
        )}
      </div>

      <footer className="relative z-10 border-t border-emerald-200/50 bg-white/40 backdrop-blur-sm mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; 2025 BrilliantSales. All rights reserved.</p>
          <a href="mailto:ultratalent.pk@gmail.com" className="hover:text-emerald-600 transition-colors">
            Contact Support
          </a>
        </div>
      </footer>
    </div>
  )
}
