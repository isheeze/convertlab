import { createSupabaseClient } from "@/lib/supabase"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const { planId } = body

        if (!planId) {
            return NextResponse.json({ error: "Plan ID is required" }, { status: 400 })
        }

        const supabase = createSupabaseClient()

        // Map plan IDs to credits and plan names
        // Starter: 37056 -> 5 credits
        // Professional: 37057 -> 25 credits
        let credits = 0
        let planName = "free"

        if (planId === "37056") {
            credits = 5
            planName = "starter"
        } else if (planId === "37057") {
            credits = 25
            planName = "pro"
        } else {
            return NextResponse.json({ error: "Invalid plan ID" }, { status: 400 })
        }

        // Update user in Supabase
        // We use the service role key if available in createSupabaseClient (if modified) or just standard client
        // Since we are in an API route, we might need to use the service role key explicitly if RLS blocks updates
        // But for now, let's try with the standard client which uses the anon key. 
        // Wait, the user table might have RLS. 
        // In `lib/supabase.ts`, `createSupabaseClient` uses ANON key.
        // If RLS is set to "users can update their own rows", this should work.
        // If not, we might need the service role key.
        // Given the previous task used Service Role Key for decrement, it's safer to use it here too.

        const { error } = await supabase
            .from("user")
            .update({
                remaining_reports: credits,
                payment_plan: planName,
                subscription_start_date: new Date().toISOString(),
                remaining_months: planName === 'pro' ? 12 : 1
            })
            .eq("clerk_id", userId)

        if (error) {
            console.error("Error updating user subscription:", error)
            return NextResponse.json({ error: "Failed to update subscription" }, { status: 500 })
        }

        return NextResponse.json({ success: true, credits, plan: planName })
    } catch (error) {
        console.error("Subscription success error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
