"use client"

import { useState } from "react"
import { Sparkles, Mail, CheckCircle2, Lock } from "lucide-react"

export default function ComingSoon() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || loading) return

    setLoading(true)

    // Replace this with your real waitlist endpoint later
    await new Promise((resolve) => setTimeout(resolve, 1200))

    setLoading(false)
    setSubmitted(true)
    setEmail("")
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-emerald-50 to-white overflow-hidden relative">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-400/40 via-teal-500/40 to-cyan-500/40 blur-3xl rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-400/40 to-emerald-400/40 blur-3xl rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-300/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-emerald-200/50 backdrop-blur-sm bg-white/40">
        <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
          <a href="/">ConvertLab</a>
        </div>
        <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-emerald-100/60 border border-emerald-200/60">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-semibold text-emerald-700">Launching Soon</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-12">

          {/* Invite-only badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-purple-100/60 border border-purple-200/60 backdrop-blur-sm">
            <Lock className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-bold text-purple-700">Invite-Only Beta</span>
          </div>

          {/* Main heading */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-black leading-tight">
              Coming Soon
            </h1>
            <p className="text-2xl md:text-4xl font-light text-gray-700">
              The future of AI-powered CRO for Shopify is almost here.
            </p>
          </div>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            ConvertLab is currently in <span className="font-semibold text-emerald-600">private beta</span>. 
            Be the first to get access when we launch publicly.
          </p>

          {/* Email capture */}
          <div className="max-w-md mx-auto mt-12">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="relative">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-6 py-5 rounded-full bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/30 text-gray-800 placeholder-gray-500 text-lg transition-all"
                  />
                  <button
                    type="submit"
                    disabled={loading || !email}
                    className="px-8 py-5 rounded-full font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-emerald-500/40 transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 whitespace-nowrap"
                  >
                    {loading ? "Submitting..." : "Get Early Access"}
                    {!loading && <Mail className="w-5 h-5" />}
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-white/80 backdrop-blur-xl border border-emerald-200/60 rounded-3xl p-8 shadow-2xl">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800">You're on the list!</h3>
                <p className="text-muted-foreground mt-2">
                  We'll notify you the moment ConvertLab goes public.
                </p>
              </div>
            )}
          </div>

          {/* Waitlist counter */}
          <div className="pt-16">
            <p className="text-sm text-muted-foreground">
              Join <span className="font-bold text-emerald-600">247 founders & store owners</span> already on the waitlist
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-emerald-200/50 bg-white/40 backdrop-blur-sm py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 ConvertLab. All rights reserved. • Made with love for Shopify founders
          </p>
        </div>
      </footer>
    </main>
  )
}
