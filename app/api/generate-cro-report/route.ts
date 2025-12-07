import { type NextRequest, NextResponse } from "next/server"
import { insertReport, canGenerateReport, decrementCredits } from "@/lib/supabase"
import { auth } from "@clerk/nextjs/server"

const CLAUDE_API_KEY = process.env.ANTHROPIC_API_KEY
const CLAUDE_API_URL = "https://api.anthropic.com/v1/messages"

interface CROReportRequest {
  storeUrl: string
}

const CRO_SYSTEM_PROMPT = `You are an expert CRO (Conversion Rate Optimization) analyst with deep knowledge of e-commerce, Shopify, user experience, and conversion psychology.

Your task is to analyze a Shopify store URL and provide a comprehensive CRO report. You will examine the store and provide analysis in the following JSON format EXACTLY:

{
  "executive_summary": {
    "cro_score": number (0-100),
    "biggest_wins": [string array of 5 positive findings],
    "top_fixes": [string array of 6 critical areas for improvement]
  },
  "homepage": {
    "overview": string,
    "issues": [string array],
    "opportunities": [string array]
  },
  "collection_page": {
    "overview": string,
    "issues": [string array],
    "opportunities": [string array]
  },
  "product_page": {
    "overview": string,
    "issues": [string array],
    "opportunities": [string array]
  },
  "cart_page": {
    "overview": string,
    "issues": [string array],
    "opportunities": [string array]
  },
  "checkout_page": {
    "overview": string,
    "issues": [string array],
    "opportunities": [string array]
  },
  "speed_performance": {
    "scores": {
      "lighthouse_performance": number,
      "lighthouse_accessibility": number,
      "lighthouse_best_practices": number,
      "lighthouse_seo": number
    },
    "issues": [string array],
    "opportunities": [string array]
  },
  "technical_seo": {
    "issues": [string array],
    "opportunities": [string array]
  },
  "trust_social_proof": {
    "issues": [string array],
    "opportunities": [string array]
  },
  "mobile_experience": {
    "issues": [string array],
    "opportunities": [string array]
  },
  "heuristic_evaluation": {
    "nielsen": [string array of 10 Nielsen heuristics findings],
    "fogg": [string array of 10 Fogg model findings],
    "clarity_index": [string array of 10 clarity metrics (value/10)]
  },
  "competitor_analysis": {
    "competitors": [
      {
        "name": string,
        "url": string,
        "key_differences": [string array]
      }
    ]
  },
  "action_plan_90_days": {
    "week_1_2_high_impact": [string array],
    "days_15_45_medium_impact": [string array],
    "days_45_90_long_term": [string array]
  },
  "recommended_changes": {
    "hero_section_copy": string,
    "product_description_template": string,
    "trust_badges_suggestions": [string array],
    "review_widget_placement": string,
    "shipping_returns_clarity": string,
    "checkout_improvements": [string array]
  }
}

Provide insightful, specific, and actionable recommendations based on best practices in CRO, user experience, and conversion psychology.`

export async function POST(request: NextRequest) {
  try {
    const { userId, getToken } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const hasCredits = await canGenerateReport(userId)
    if (!hasCredits) {
      return NextResponse.json({ error: "Insufficient credits" }, { status: 403 })
    }

    const body = (await request.json()) as CROReportRequest
    const { storeUrl } = body

    if (!storeUrl) {
      return NextResponse.json({ error: "Store URL is required" }, { status: 400 })
    }

    if (!CLAUDE_API_KEY) {
      return NextResponse.json({ error: "Claude API key not configured" }, { status: 500 })
    }

    // Create the prompt for Claude
    const userPrompt = `Please analyze this Shopify store and provide a comprehensive CRO report: ${storeUrl}

Examine:
1. Homepage design, CTAs, and value proposition
2. Product pages and their conversion elements
3. Collection/category pages
4. Shopping cart experience
5. Checkout process
6. Mobile responsiveness
7. Page speed and performance
8. Trust signals and social proof
9. Customer reviews and testimonials
10. Site structure and navigation

Provide the analysis in the specified JSON format with specific, actionable recommendations.`

    // Call Claude API
    const response = await fetch(CLAUDE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-opus-4-1", // Use the latest model available
        max_tokens: 4000,
        system: CRO_SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: userPrompt,
          },
        ],
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error("Claude API error:", error)
      return NextResponse.json({ error: "Failed to generate CRO report" }, { status: 500 })
    }

    const data = await response.json()

    // Extract the text content from Claude's response
    const textContent = data.content[0]?.text || ""

    // Parse the JSON response - Claude should return valid JSON
    const jsonMatch = textContent.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return NextResponse.json({ error: "Failed to parse CRO report from response" }, { status: 500 })
    }

    const croReport = JSON.parse(jsonMatch[0])

    // Decrement credits
    try {
      await decrementCredits(userId)
    } catch (error) {
      console.error("Error decrementing credits (likely missing Clerk 'supabase' JWT template):", error)
      // Continue execution to return the report even if credit decrement fails in dev
    }

    return NextResponse.json({
      success: true,
      report: croReport,
    })
  } catch (error) {
    console.error("Error generating CRO report:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
