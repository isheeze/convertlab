"use client"

import { TrendingUp, CheckCircle, AlertCircle } from "lucide-react"
import { PointItem } from "../report-components/point-item"

export function ExecutiveSummary({ data }: { data: any }) {
  if (!data) return null

  const scoreColor =
    data.cro_score >= 80 ? "text-emerald-600" : data.cro_score >= 60 ? "text-blue-600" : "text-orange-600"
  const scoreGradient =
    data.cro_score >= 80
      ? "from-emerald-500 to-teal-500"
      : data.cro_score >= 60
        ? "from-blue-500 to-cyan-500"
        : "from-orange-500 to-red-500"

  return (
    <div className="bg-gradient-to-br from-white/80 to-emerald-50/40 backdrop-blur-xl border border-white/60 shadow-2xl shadow-emerald-500/15 rounded-2xl p-8 md:p-12">
      {/* Main Score */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-emerald-100/50 rounded-full">
            <TrendingUp className="w-8 h-8 text-emerald-600" />
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-2">Overall CRO Score</h2>
        <p className="text-muted-foreground mb-8">Your store's optimization performance</p>

        <div
          className={`text-6xl md:text-7xl font-bold bg-gradient-to-r ${scoreGradient} bg-clip-text text-transparent mb-4`}
        >
          {data.cro_score}%
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto mb-4">
          <div className="w-full bg-emerald-200/30 rounded-full h-3 overflow-hidden">
            <div
              className={`bg-gradient-to-r ${scoreGradient} h-3 transition-all duration-700`}
              style={{ width: `${data.cro_score}%` }}
            ></div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          {data.cro_score >= 80 && "Excellent! Your store is highly optimized."}
          {data.cro_score >= 60 &&
            data.cro_score < 80 &&
            "Good progress. Implement recommendations for better results."}
          {data.cro_score < 60 && "Significant optimization opportunities available."}
        </p>
      </div>

      {/* Grid Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-12 pb-12 border-b border-white/40">
        {/* Wins */}
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <p className="text-4xl font-bold text-emerald-600 mb-1">{data.biggest_wins?.length || 0}</p>
          <p className="text-muted-foreground">Strengths Found</p>
        </div>

        {/* Fixes */}
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-4xl font-bold text-red-600 mb-1">{data.top_fixes?.length || 0}</p>
          <p className="text-muted-foreground">Issues to Fix</p>
        </div>

        {/* ROI Potential */}
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-4xl font-bold text-blue-600 mb-1">{Math.round((100 - data.cro_score) / 2)}%</p>
          <p className="text-muted-foreground">Potential Uplift</p>
        </div>
      </div>

      {/* Biggest Wins */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <h3 className="text-lg font-bold">What's Working Well</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {data.biggest_wins?.map((win: string, i: number) => (
            <PointItem key={i} text={win} type="positive" />
          ))}
        </div>
      </div>

      {/* Top Fixes */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <h3 className="text-lg font-bold">Top Priority Fixes</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {data.top_fixes?.map((fix: string, i: number) => (
            <PointItem key={i} text={fix} type="negative" index={i + 1} />
          ))}
        </div>
      </div>
    </div>
  )
}
