// lib/pdf-generator.ts
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Font,
  Image,
  Link,
} from "@react-pdf/renderer"
import { format } from "date-fns"

// Register fonts (optional but looks 1000x better)
Font.register({
  family: "Inter",
  fonts: [
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.ttf" },
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.ttf", fontWeight: 600 },
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.ttf", fontWeight: 700 },
  ],
})

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, color: "#1f2937" },
  title: { fontSize: 28, fontWeight: 700, marginBottom: 8, color: "#10b981" },
  subtitle: { fontSize: 14, color: "#6b7280", marginBottom: 30 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 700, color: "#059669", marginBottom: 12 },
  subSection: { marginTop: 20, marginBottom: 16 },
  subTitle: { fontSize: 14, fontWeight: 600, color: "#065f46", marginBottom: 8 },
  competitorBox: { borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 8, padding: 12, marginBottom: 16 },
  competitorName: { fontSize: 13, fontWeight: 700, color: "#10b981", marginBottom: 6 },
  competitorUrl: { fontSize: 10, color: "#3b82f6", marginBottom: 8 },
  scoreBox: {
    backgroundColor: "#d1fae5",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  score: { fontSize: 48, fontWeight: 700, color: "#10b981" },
  scoreLabel: { fontSize: 12, color: "#065f46", marginTop: 4 },
  listItem: { flexDirection: "row", marginBottom: 6 },
  bullet: { width: 6, height: 6, backgroundColor: "#10b981", borderRadius: 3, marginRight: 10, marginTop: 5 },
  text: { flex: 1, lineHeight: 1.6 },
  wins: { color: "#059669" },
  fixes: { color: "#dc2626" },
  header: { marginBottom: 30, borderBottomWidth: 2, borderBottomColor: "#10b981", paddingBottom: 16 },
  footer: { position: "absolute", bottom: 30, left: 40, right: 40, textAlign: "center", color: "#9ca3af", fontSize: 9 },
})

export const generateCROReportPDF = async (report: any) => {

  const storeUrl = report.storeUrl || "Your Shopify Store"
  const generatedAt = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })

  const MyDocument = () => (
    <Document title={`CRO Report - ${storeUrl}`} author="BrilliantSales" creator="BrilliantSales AI">
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>BrilliantSales CRO Report</Text>
          <Text style={styles.subtitle}>AI-Powered Conversion Rate Optimization Analysis</Text>
          <Text style={{ fontSize: 12, color: "#10b981", fontWeight: 600 }}>{storeUrl}</Text>
          <Text style={{ fontSize: 10, color: "#6b7280", marginTop: 4 }}>Generated on {generatedAt}</Text>
        </View>

        {/* Executive Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Executive Summary</Text>
          <View style={styles.scoreBox}>
            <Text style={styles.score}>{report.executive_summary.cro_score}/100</Text>
            <Text style={styles.scoreLabel}>Overall CRO Score</Text>
          </View>

          <Text style={{ fontWeight: 600, marginBottom: 8, color: "#059669" }}>Biggest Wins</Text>
          {report.executive_summary.biggest_wins.map((win: string, i: number) => (
            <View key={i} style={styles.listItem}>
              <View style={styles.bullet} />
              <Text style={[styles.text, styles.wins]}>{win}</Text>
            </View>
          ))}

          <Text style={{ fontWeight: 600, marginTop: 16, marginBottom: 8, color: "#dc2626" }}>Top Priority Fixes</Text>
          {report.executive_summary.top_fixes.map((fix: string, i: number) => (
            <View key={i} style={styles.listItem}>
              <View style={styles.bullet} />
              <Text style={[styles.text, styles.fixes]}>{fix}</Text>
            </View>
          ))}
        </View>

        {/* All Other Sections */}
        {[
          { title: "Homepage Analysis", data: report.homepage },
          { title: "Collection Pages", data: report.collection_page },
          { title: "Product Pages", data: report.product_page },
          { title: "Cart Experience", data: report.cart_page },
          { title: "Checkout Flow", data: report.checkout_page },
          { title: "Technical SEO", data: report.technical_seo },
          { title: "Trust & Social Proof", data: report.trust_social_proof },
          { title: "Mobile Experience", data: report.mobile_experience },
        ].map((section) => (
          <View key={section.title} style={styles.section} break>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.data.overview && <Text style={{ marginBottom: 12, lineHeight: 1.6 }}>{section.data.overview}</Text>}

            {section.data.issues && (
              <>
                <Text style={{ fontWeight: 600, color: "#dc2626", marginBottom: 6 }}>Issues Found</Text>
                {section.data.issues.map((issue: string, i: number) => (
                  <View key={i} style={styles.listItem}>
                    <View style={{ ...styles.bullet, backgroundColor: "#ef4444" }} />
                    <Text style={styles.text}>{issue}</Text>
                  </View>
                ))}
              </>
            )}

            {section.data.opportunities && (
              <>
                <Text style={{ fontWeight: 600, color: "#059669", marginTop: 12, marginBottom: 6 }}>Opportunities</Text>
                {section.data.opportunities.map((opp: string, i: number) => (
                  <View key={i} style={styles.listItem}>
                    <View style={{ ...styles.bullet, backgroundColor: "#10b981" }} />
                    <Text style={styles.text}>{opp}</Text>
                  </View>
                ))}
              </>
            )}
          </View>
        ))}

        {/* Speed & Performance – Special Handling */}
        <View style={styles.section} break>
          <Text style={styles.sectionTitle}>Speed & Performance</Text>

          {/* Lighthouse Scores */}
          <Text style={{ fontWeight: 600, marginBottom: 12, color: "#059669" }}>Lighthouse Scores</Text>
          <View style={{ flexDirection: "row", gap: 24, marginBottom: 20, flexWrap: "wrap" }}>
            {Object.entries(report.speed_performance.scores).map(([key, value]: [string, any]) => (
              <View key={key} style={{ alignItems: "center", minWidth: 100 }}>
                <Text style={{ fontSize: 32, fontWeight: 700, color: value >= 90 ? "#10b981" : value >= 50 ? "#f59e0b" : "#ef4444" }}>
                  {value}
                </Text>
                <Text style={{ fontSize: 10, color: "#6b7280", textTransform: "capitalize" }}>
                  {key.replace("lighthouse_", "").replace("_", " ")}
                </Text>
              </View>
            ))}
          </View>

          {/* Issues */}
          <Text style={{ fontWeight: 600, color: "#dc2626", marginBottom: 8 }}>Performance Issues</Text>
          {report.speed_performance.issues.map((issue: string, i: number) => (
            <View key={i} style={styles.listItem}>
              <View style={{ ...styles.bullet, backgroundColor: "#ef4444" }} />
              <Text style={styles.text}>{issue}</Text>
            </View>
          ))}

          {/* Opportunities */}
          <Text style={{ fontWeight: 600, color: "#059669", marginTop: 20, marginBottom: 8 }}>Optimization Opportunities</Text>
          {report.speed_performance.opportunities.map((opp: string, i: number) => (
            <View key={i} style={styles.listItem}>
              <View style={styles.bullet} />
              <Text style={styles.text}>{opp}</Text>
            </View>
          ))}
        </View>

        {/* SPECIAL: Heuristic Evaluation */}
        <View style={styles.section} break>
          <Text style={styles.sectionTitle}>Heuristic Evaluation</Text>

          {/* Nielsen's 10 Heuristics */}
          <View style={styles.subSection}>
            <Text style={styles.subTitle}>Nielsen's 10 Heuristics</Text>
            {report.heuristic_evaluation.nielsen.map((item: string, i: number) => (
              <View key={i} style={styles.listItem}>
                <View style={styles.bullet} />
                <Text style={styles.text}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Fogg Behavior Model */}
          <View style={styles.subSection}>
            <Text style={styles.subTitle}>Fogg Behavior Model</Text>
            {report.heuristic_evaluation.fogg.map((item: string, i: number) => (
              <View key={i} style={styles.listItem}>
                <View style={styles.bullet} />
                <Text style={styles.text}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Clarity Index */}
          <View style={styles.subSection}>
            <Text style={styles.subTitle}>Clarity Index (1–10)</Text>
            {report.heuristic_evaluation.clarity_index.map((item: string, i: number) => (
              <View key={i} style={styles.listItem}>
                <View style={styles.bullet} />
                <Text style={styles.text}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* SPECIAL: Competitor Benchmark */}
        <View style={styles.section} break>
          <Text style={styles.sectionTitle}>Competitor Benchmark</Text>
          {report.competitor_analysis.competitors.map((comp: any, i: number) => (
            <View key={i} style={styles.competitorBox}>
              <Text style={styles.competitorName}>{comp.name}</Text>
              <Text style={styles.competitorUrl}>{comp.url}</Text>
              <Text style={{ fontWeight: 600, marginBottom: 8, color: "#059669" }}>Key Advantages</Text>
              {comp.key_differences.map((diff: string, j: number) => (
                <View key={j} style={styles.listItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.text}>{diff}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* 90-Day Action Plan */}
        <View style={styles.section} break>
          <Text style={styles.sectionTitle}>90-Day Action Plan</Text>
          {Object.entries(report.action_plan_90_days).map(([period, items]: [string, any]) => (
            <View key={period} style={{ marginBottom: 16 }}>
              <Text style={{ fontWeight: 700, color: "#059669", marginBottom: 8 }}>
                {period.replace("_", " ").replace("high impact", "(High Impact)").replace("medium impact", "(Medium Impact)").replace("long term", "(Long Term)")}
              </Text>
              {items.map((item: string, i: number) => (
                <View key={i} style={styles.listItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.text}>{item}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Footer */}
        <Text style={styles.footer} fixed>
          Generated by BrilliantSales • AI-Powered CRO for Shopify • Page <Text render={({ pageNumber, totalPages }) => `${pageNumber} of ${totalPages}`} />
        </Text>
      </Page>
    </Document>
  )

  // Trigger download
  const blob = await import("@react-pdf/renderer").then((mod) => mod.pdf(<MyDocument />).toBlob())
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `BrilliantSales_CRO_Report_${storeUrl.replace(/[^a-z0-9]/gi, "_")}_${format(new Date(), "yyyy-MM-dd")}.pdf`
  link.click()
  URL.revokeObjectURL(url)
}