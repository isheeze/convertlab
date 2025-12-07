import { createSupabaseClient } from "@/lib/supabase";
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const supabase = createSupabaseClient()

export async function POST(req: Request) {
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { clerkUserId } = await req.json()

    // Check if user exists
    const { data: existingUser } = await supabase
        .from('user')
        .select('id, subscription_start_date, remaining_months, payment_plan')
        .eq('clerk_id', clerkUserId)
        .single()

    if (existingUser) {
        // Check for subscription renewal
        if (existingUser.subscription_start_date && existingUser.remaining_months !== null && existingUser.remaining_months > 0) {
            const startDate = new Date(existingUser.subscription_start_date);
            const now = new Date();

            // Calculate months difference
            // Example: Start Jan 1, Now Feb 2 -> diff = 1
            const monthsDiff = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());

            // Expected remaining months should be: Initial Months - Months Passed
            // Pro: 12 - diff
            // If stored remaining_months > (12 - diff), it means a month has passed and we haven't updated yet

            const initialMonths = existingUser.payment_plan === 'pro' ? 12 : 1;
            const expectedRemaining = initialMonths - monthsDiff;

            // We only update if expectedRemaining is LESS than what we have stored.
            // This implies time has moved forward past a month boundary we haven't accounted for.
            if (expectedRemaining < existingUser.remaining_months) {

                if (expectedRemaining <= 0) {
                    // Subscription expired
                    await supabase.from('user').update({
                        payment_plan: 'free',
                        remaining_reports: 0,
                        remaining_months: 0,
                        subscription_start_date: null
                    }).eq('id', existingUser.id);
                } else {
                    // Monthly reset
                    // Reset credits to 25 (for Pro) or 5 (for Starter) - assuming Pro for now as per request context of "yearly subscription"
                    // Ideally we should map plan to credits again, but for now hardcoding based on plan
                    const credits = existingUser.payment_plan === 'pro' ? 25 : 5;

                    await supabase.from('user').update({
                        remaining_reports: credits,
                        remaining_months: expectedRemaining
                    }).eq('id', existingUser.id);
                }
            }
        }
    }

    if (!existingUser) {
        // Only insert if user doesn't exist
        const { error } = await supabase
            .from('user')
            .insert({
                clerk_id: clerkUserId,
                payment_plan: 'free',
                remaining_reports: 0,
                subscription_start_date: new Date().toISOString(),
                remaining_months: 1,
            })

        if (error) {
            console.error('Supabase error:', error)
            return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
        }
    }

    return NextResponse.json({ success: true })
}