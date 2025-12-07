"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { useUser } from "@clerk/nextjs"
import { error } from "console"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export interface Report {
  id: string
  storeUrl: string
  createdAt: string
  executive_summary?: {
    cro_score: number
  }
  [key: string]: any
}

export function useReportHistory() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [supabaseUserId, setSupabaseUserId] = useState<string | null>(null)
  const { user, isLoaded } = useUser()

  // Get Supabase user_id from clerk_user_id
  useEffect(() => {
    async function getSupabaseUserId() {
      if (!isLoaded || !user) {
        setSupabaseUserId(null)
        return
      }

      try {
        const { data, error } = await supabase
          .from("user")
          .select("id")
          .eq("clerk_id", user.id)
          .single()

        if (error) throw error
        setSupabaseUserId(data?.id || null)
      } catch (error) {
        console.error("Error fetching Supabase user_id:", error)
        setSupabaseUserId(null)
      }
    }

    getSupabaseUserId()
  }, [user, isLoaded])

  // Load reports from Supabase on mount
  useEffect(() => {
    async function loadReports() {
      if (!isLoaded) return

      if (!supabaseUserId) {
        setReports([])
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from("report")
          .select("*")
          .eq("user_id", supabaseUserId)
          .order("created_at", { ascending: false })

        if (error) throw error

        const parsed = (data || []).map((row) => ({
          id: row.id,
          storeUrl: row.store_url,
          createdAt: row.created_at,
          report: JSON.parse(row.report),
        }))

        setReports(parsed)
      } catch (error) {
        console.error("Error loading reports from Supabase:", error)
      } finally {
        setLoading(false)
      }
    }

    loadReports()
  }, [supabaseUserId, isLoaded])

  // Save report to Supabase
  const addReport = async (report: Report) => {
    if (!supabaseUserId) {
      console.error("User not authenticated")
      return
    }

    // Optimistically update UI
    setReports([report, ...reports])

    try {
      const { error } = await supabase.from("report").insert({
        user_id: supabaseUserId,
        report: JSON.stringify(report.report),
        store_url: report.storeUrl,
      })
      if (error) throw error
    } catch (error) {
      console.error("Error saving report to Supabase:", error)
      // Revert optimistic update on error
      setReports(reports)
    }
  }

  // Delete report from Supabase
  const deleteReport = async (id: string) => {
    if (!supabaseUserId) {
      console.error("User not authenticated")
      return
    }

    // Optimistically update UI
    const updated = reports.filter((r) => r.id !== id)
    setReports(updated)

    try {
      const { error } = await supabase
        .from("report")
        .delete()
        .eq("id", id)
        .eq("user_id", supabaseUserId)

      if (error) throw error
    } catch (error) {
      console.error("Error deleting report:", error)
      // Revert optimistic update on error
      setReports(reports)
    }
  }

  // Clear all reports
  const clearHistory = async () => {
    if (!supabaseUserId) {
      console.error("User not authenticated")
      return
    }

    // Optimistically update UI
    setReports([])

    try {
      const { error } = await supabase
        .from("report")
        .delete()
        .eq("user_id", supabaseUserId)

      if (error) throw error
    } catch (error) {
      console.error("Error clearing history:", error)
      // Revert optimistic update on error
      setReports(reports)
    }
  }

  return {
    reports,
    loading,
    addReport,
    deleteReport,
    clearHistory,
  }
}