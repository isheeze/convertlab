"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronDown, CheckCircle2, Zap, BarChart3, Lock, Sparkles, Link2, Brain, Rocket } from "lucide-react"
import TestimonialsSection from "@/components/testimonials-slider"
import { LegalModal } from "@/components/legal-modal"
import { legalContent } from "@/lib/legal-content"

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState(0)
  const [activeLegalDoc, setActiveLegalDoc] = useState<string | null>(null)

  const faqItems = [
    {
      question: "How does BrilliantSales analyze my Shopify store?",
      answer:
        "We use advanced AI to analyze every aspect of your store including homepage, product pages, collection pages, cart flow, and checkout. Our system evaluates design, performance, trust signals, mobile experience, and more.",
    },
    {
      question: "What format is the CRO report in?",
      answer:
        "Reports are provided as interactive web pages that you can view and navigate instantly. You can also download them as PDFs for sharing with your team or stakeholders. The reports include executive summaries, detailed analysis, and actionable recommendations.",
    },
    {
      question: "Can I access my previous reports?",
      answer:
        "Yes! All your reports are stored in your dashboard history. You can view, compare, and download any previous analysis. This helps you track improvements over time as you implement our recommendations.",
    },
    {
      question: "Is my Shopify store data secure?",
      answer:
        "Absolutely. We only analyze your store URL - we never store customer data or sensitive information. Your report data is encrypted and stored securely. We comply with GDPR and other data protection regulations.",
    },
    {
      question: "What's the turnaround time for analysis?",
      answer:
        "Most CRO reports are generated within 2-5 minutes. Complex stores with lots of products and custom features may take up to 10 minutes. You'll see real-time progress in your dashboard.",
    },
    {
      question: "Can I share reports with my team?",
      answer:
        "Yes! You can download reports as PDFs and share them via email, Slack, or any communication tool. The reports are formatted for easy sharing and include all visualizations and recommendations.",
    },
  ]

  const features = [
    {
      icon: <BarChart3 className="w-8 h-8 text-emerald-600" />,
      title: "Executive Summary",
      description: "Get your CRO score and see the biggest wins and top fixes at a glance",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-emerald-600" />,
      title: "AI-Powered Analysis",
      description: "Deep insights on every page powered by Our AI's advanced understanding",
    },
    {
      icon: <Zap className="w-8 h-8 text-emerald-600" />,
      title: "Actionable Insights",
      description: "Prioritized recommendations with estimated conversion rate impact",
    },
    {
      icon: <Lock className="w-8 h-8 text-emerald-600" />,
      title: "90-Day Action Plan",
      description: "Week-by-week implementation roadmap to improve your conversions",
    },
  ]

  const pricing = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for new stores",
      features: ["5 reports/month", "Basic analysis", "PDF export", "Email support"],
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      description: "For growing businesses",
      features: ["Unlimited reports", "Advanced analysis", "90-day action plan", "Priority support"],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large operations",
      features: [
        "Everything in Pro",
        "Custom analysis",
        "Dedicated account manager",
        "White-label reports",
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-emerald-50 to-white overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-400/40 via-teal-500/40 to-cyan-500/40 blur-3xl opacity-30 rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-400/40 to-emerald-400/40 blur-3xl opacity-30 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-emerald-200/50 backdrop-blur-sm bg-white/40">
        <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
          <a href="/">BrilliantSales</a>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-foreground hover:text-emerald-600 transition">
            Features
          </a>
          <a href="#pricing" className="text-foreground hover:text-emerald-600 transition">
            Pricing
          </a>
          <a href="#faq" className="text-foreground hover:text-emerald-600 transition">
            FAQ
          </a>
        </div>
        <Link
          href="/dashboard"
          className="px-6 py-2.5 rounded-full font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white transition-all duration-300 shadow-lg hover:shadow-emerald-500/40"
        >
          Get Started (Free for now)
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-[85vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/60 border border-emerald-200/60 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700">Powered by AI</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-balance leading-tight">
              Turn Store Visitors into{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Paying Customers
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Get a comprehensive CRO analysis of your Shopify store in minutes. Discover exactly what's holding back
              conversions and get a step-by-step action plan.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/dashboard"
              className="px-8 py-4 rounded-full font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white transition-all duration-300 shadow-lg hover:shadow-emerald-500/40 hover:scale-105"
            >
              Analyze Your Store Now (Free)
            </Link>
            <button className="px-8 py-4 rounded-full font-semibold border-2 border-emerald-300 text-emerald-600 hover:bg-emerald-50 transition-all duration-300">
              Watch Demo
            </button>
          </div>

          {/* Trust Stats */}
          <div className="grid md:grid-cols-3 gap-6 pt-12 border-t border-emerald-200/50">
            {[
              { value: "500+", label: "Stores Analyzed" },
              { value: "87%", label: "Avg CRO Score" },
              { value: "23%", label: "Avg Conversion Lift" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-emerald-600">{stat.value}</div>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TINY & ADDICTIVE REPORT CONTENTS ==================== */}
      <section id="features" className="py-20 px-6 bg-gradient-to-b from-transparent via-emerald-50/50 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-700 bg-clip-text text-transparent">
            Your Full CRO Report Includes
          </h2>

          {/* Magic expanding chips line */}
          <div className="mt-12 flex flex-wrap justify-center gap-3 md:gap-4">
            {[
              "Biggest Wins",
              "Top Priority Fixes",
              "Homepage",
              "Collections",
              "Product Pages",
              "Cart + Checkout",
              "Technical SEO",
              "Mobile UX",
              "Lighthouse Scores",
              "Nielsen + Fogg Evaluation",
              "Competitor Spy",
              "90-Day Action Plan",
              "And much more..."
            ].map((text, i) => (
              <div
                key={i}
                className="group relative px-5 py-3 bg-white/70 backdrop-blur-xl border border-white/60 rounded-full text-sm md:text-base font-medium text-gray-700 shadow-md hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-500 hover:scale-110 hover:-translate-y-1"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="relative z-10">{text}</span>

                {/* Tiny sparkle on hover */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></span>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></span>
              </div>
            ))}
          </div>

          {/* One-line punch + CTA */}
          <p className="mt-12 text-lg md:text-xl text-muted-foreground font-medium">
            Delivered in under 5 minutes
          </p>

          <Link
            href="/dashboard"
            className="mt-8 inline-block px-10 py-4 rounded-full font-bold text-white bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 shadow-lg hover:shadow-xl hover:shadow-emerald-500/30 transform hover:scale-105 transition-all duration-300"
          >
            Get Your Report Instantly
          </Link>
        </div>
      </section>

      {/* How It Works – FINAL Fixed & Perfect Version */}
      <section className="relative z-10 py-24 px-6 overflow-hidden border-t border-emerald-200/50">
        {/* Soft background glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 -right-20 w-80 h-80 bg-teal-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 -left-20 w-80 h-80 bg-cyan-300/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">Three simple steps to skyrocket your conversions</p>
          </div>

          {/* Curved glowing timeline */}
          <div className="relative">
            <svg
              className="absolute inset-x-0 top-44 w-full h-32 pointer-events-none" viewBox="0 0 1200 200" fill="none"      >
              <path
                d="M 100 100 Q 600 20, 1100 100"
                stroke="url(#glowLine)"
                strokeWidth="5"
                opacity="0.6"
                className="drop-shadow-[0_0_20px_rgba(16,185,129,0.4)]"
              />
              <defs>
                <linearGradient id="glowLine" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>

            <div className="grid md:grid-cols-3 gap-12 relative">
              {[
                {
                  step: "01",
                  title: "Enter Store URL",
                  desc: "Just paste your Shopify store link — no login needed",
                  emoji: <Link2 className="w-16 h-16" />,
                  gradient: "from-emerald-500 to-teal-500",
                },
                {
                  step: "02",
                  title: "AI Analysis",
                  desc: "Our AI scans every page, design, and flow in seconds",
                  emoji: <Brain className="w-16 h-16" />,
                  gradient: "from-teal-500 to-cyan-500",
                },
                {
                  step: "03",
                  title: "Get Report",
                  desc: "Instant detailed insights + downloadable PDF report",
                  emoji: <Rocket className="w-16 h-16" />,
                  gradient: "from-cyan-500 to-blue-500",
                },
              ].map((item, i) => (
                <div key={i} className="relative group text-center">
                  {/* Hover glow */}
                  <div className={`absolute -inset-6 rounded-3xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-30 blur-2xl transition duration-700`}></div>

                  {/* Main Card */}
                  <div className="relative bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl rounded-3xl p-10 pt-16 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 hover:-translate-y-6">
                    {/* Step Circle */}
                    <div className={`absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center text-4xl font-black text-white shadow-2xl ring-8 ring-white`}>
                      {item.step}
                    </div>

                    {/* Real Emoji */}
                    <div className="text-7xl mb-6 flex justify-center">
                      {item.emoji}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>

                    {/* Tiny sparkles */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                      {[...Array(8)].map((_, p) => (
                        <div
                          key={p}
                          className="absolute w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-80 animate-ping"
                          style={{
                            top: `${20 + Math.random() * 60}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${p * 0.15}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>


                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof & Integrations */}
      <TestimonialsSection />


      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-20 px-6 border-t border-emerald-200/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground">Choose the plan that fits your business</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricing.map((plan, i) => (
              <div
                key={i}
                className={`rounded-2xl p-8 transition-all duration-300 ${plan.highlighted
                  ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30 scale-105"
                  : "bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg text-foreground"
                  }`}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={`text-sm mb-6 ${plan.highlighted ? "text-white/90" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={`text-sm ml-2 ${plan.highlighted ? "text-white/90" : "text-muted-foreground"}`}>
                    {plan.period}
                  </span>
                </div>
                <button
                  className={`w-full py-3 rounded-full font-semibold transition-all mb-8 ${plan.highlighted
                    ? "bg-white text-emerald-600 hover:bg-white/90"
                    : "border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                    }`}
                >
                  {/* Get Started */} Upcoming
                </button>
                <ul className="space-y-3">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative z-10 py-20 px-6 border-t border-emerald-200/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">Everything you need to know about BrilliantSales</p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? -1 : i)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/50 transition-colors"
                >
                  <span className="font-semibold text-left">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-600 transition-transform ${openFAQ === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFAQ === i && (
                  <div className="px-6 py-4 border-t border-white/40 bg-white/40 text-muted-foreground">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 py-20 px-6 border-t border-emerald-200/50">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 backdrop-blur-xl border border-white/40 shadow-lg rounded-3xl p-12">
          <h2 className="text-4xl font-bold mb-4">Ready to Boost Your Conversions?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get your comprehensive CRO report in minutes and start implementing today.
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-4 rounded-full font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white transition-all duration-300 shadow-lg hover:shadow-emerald-500/40 hover:scale-105"
          >
            Analyze Your Store Now (Free)
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-emerald-200/50 bg-white/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
                BrilliantSales
              </div>
              <p className="text-sm text-muted-foreground">AI-powered CRO analysis for Shopify stores</p>
            </div>
            <div className="text-right">
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button onClick={() => setActiveLegalDoc("privacy")} className="hover:text-emerald-600 transition-colors">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveLegalDoc("terms")} className="hover:text-emerald-600 transition-colors">
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-emerald-200/50 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 BrilliantSales. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <LegalModal
        isOpen={!!activeLegalDoc}
        onClose={() => setActiveLegalDoc(null)}
        title={activeLegalDoc ? legalContent[activeLegalDoc as keyof typeof legalContent].title : ""}
        content={activeLegalDoc ? legalContent[activeLegalDoc as keyof typeof legalContent].content : ""}
      />
    </main>
  )
}
