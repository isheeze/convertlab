"use client"

import type React from "react"

import { useState } from "react"
import { Loader } from "lucide-react"
import { generateCROReport } from "@/lib/api-client"

export function ReportForm({ onSubmit, loading }: { onSubmit: (url: string, report: any) => void; loading: boolean }) {
  const [storeUrl, setStoreUrl] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate URL
    try {
      new URL(storeUrl)
    } catch {
      setError("Please enter a valid URL")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const report = await generateCROReport(storeUrl)
      onSubmit(storeUrl, report)
      setStoreUrl("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate report. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const isProcessing = loading || isLoading

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl shadow-emerald-500/10 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-2">Analyze Your Store</h2>
        <p className="text-muted-foreground mb-6">
          Enter your Shopify store URL to get a comprehensive CRO analysis powered by Claude AI.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Shopify Store URL</label>
            <input
              type="text"
              value={storeUrl}
              onChange={(e) => setStoreUrl(e.target.value)}
              placeholder="https://yourstore.myshopify.com"
              className="w-full px-4 py-3 rounded-lg bg-white border border-emerald-200 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              disabled={isProcessing}
            />
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isProcessing || !storeUrl}
            className="w-full px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white transition-all duration-300 shadow-lg hover:shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing && <Loader className="w-4 h-4 animate-spin" />}
            {isProcessing ? "Analyzing Your Store..." : "Generate CRO Report"}
          </button>
        </div>

        <p className="text-xs text-muted-foreground mt-4">
          Our AI will analyze your store's homepage, product pages, checkout process, and more. Report generation
          typically takes 30-60 seconds.
        </p>
      </div>

      <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl shadow-emerald-500/10 rounded-2xl p-6">
        <h3 className="font-semibold mb-4">What We Analyze</h3>
        <ul className="space-y-3">
          {[
            "Homepage optimization & value proposition",
            "Product page conversions & trust signals",
            "Cart & checkout experience",
            "Mobile responsiveness & performance",
            "Competitor benchmarking",
            "Technical SEO & speed",
            "Customer reviews & social proof",
            "90-day action plan with prioritized fixes",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 flex-shrink-0 mt-0.5">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </form>
  )
}
