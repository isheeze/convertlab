"use client"

import { useState, useEffect } from "react"

const STORAGE_KEY = "cro-reports-history"

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

  // Load reports from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setReports(Array.isArray(parsed) ? parsed : [])
      }
    } catch (error) {
      console.error("Error loading reports from storage:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Save report to history
  const addReport = (report: Report) => {
    const updated = [report, ...reports]
    setReports(updated)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch (error) {
      console.error("Error saving report to storage:", error)
    }
  }

  // Delete report from history
  const deleteReport = (id: string) => {
    const updated = reports.filter((r) => r.id !== id)
    setReports(updated)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch (error) {
      console.error("Error deleting report:", error)
    }
  }

  // Clear all reports
  const clearHistory = () => {
    setReports([])
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error("Error clearing history:", error)
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
