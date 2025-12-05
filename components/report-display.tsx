"use client"

import { Download, Loader } from "lucide-react"
import { useState } from "react"
import { generateCROReportPDF } from "@/lib/pdf-generator"
import { ExecutiveSummary } from "./report-sections/executive-summary"
import { PerformanceSection } from "./report-sections/performance-section"
import { HomePageSection } from "./report-sections/homepage-section"
import { ProductPageSection } from "./report-sections/product-page-section"
import { CollectionPageSection } from "./report-sections/collection-page-section"
import { CartCheckoutSection } from "./report-sections/cart-checkout-section"
import { SEOSection } from "./report-sections/seo-section"
import { MobileSection } from "./report-sections/mobile-section"
import { TrustAndProof } from "./report-sections/trust-social-proof"
import { CompetitorSection } from "./report-sections/competitor-section"
import { HeuristicSection } from "./report-sections/heuristic-section"
import { ActionPlan } from "./report-sections/action-plan"

export function ReportDisplay({ report }: { report: any }) {
  const [downloading, setDownloading] = useState(false)

  const handleDownloadPDF = async () => {
    setDownloading(true)
    try {
      //await generateCROReportPDF(report)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Failed to generate PDF. Please try again.")
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl shadow-emerald-500/10 rounded-2xl p-8 sticky top-0 z-10 flex items-center justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            CRO Analysis Report
          </h1>
          <p className="text-muted-foreground">{report.storeUrl}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Generated on {new Date(report.createdAt).toLocaleDateString()} at{" "}
            {new Date(report.createdAt).toLocaleTimeString()}
          </p>
        </div>
        <button
          onClick={handleDownloadPDF}
          disabled={downloading}
          className="px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white transition-all duration-300 shadow-lg hover:shadow-emerald-500/40 flex items-center gap-2 disabled:opacity-50 flex-shrink-0"
        >
          {downloading ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Download PDF
            </>
          )}
        </button>
      </div>

      <ExecutiveSummary data={report.executive_summary} />

      <PerformanceSection data={report.speed_performance} />

      <HomePageSection data={report.homepage} />

      <ProductPageSection data={report.product_page} />

      <CollectionPageSection data={report.collection_page} />

      <CartCheckoutSection cartData={report.cart_page} checkoutData={report.checkout_page} />

      <SEOSection data={report.technical_seo} />

      <TrustAndProof data={report.trust_social_proof} />

      <MobileSection data={report.mobile_experience} />

      <HeuristicSection data={report.heuristic_evaluation} />

      <CompetitorSection data={report.competitor_analysis} />

      <ActionPlan data={report.action_plan_90_days} />
    </div>
  )
}
