import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";

export const createSupabaseClient = () => {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
    )
}

export const insertReport = async (report: any) => {
    const supabase = createSupabaseClient()
    const { userId } = await auth()

    const { data, error } = await supabase
        .from('report')
        .insert({ user_id: userId, report: report })
    if (error) {
        console.error('Error inserting report:', error)
    }
}

export const fetchUserByClerkId = async (clerkId: string) => {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase.from('user').select().eq('clerk_id', clerkId).single()
    if (error) {
        console.error('Error fetching user:', error)
        return null
    }
    return data
}

export async function canGenerateReport(clerkId: string): Promise<boolean> {
    const user = await fetchUserByClerkId(clerkId)
    return user ? user.remaining_reports > 0 : false
}

export async function getUserQuota(clerkId: string): Promise<number> {
    const user = await fetchUserByClerkId(clerkId)
    return user?.remaining_reports || 0
}

export const decrementCredits = async (clerkId: string) => {

    const supabase = createSupabaseClient()

    const { data: user, error: fetchError } = await supabase
        .from('user')
        .select('remaining_reports')
        .eq('clerk_id', clerkId)
        .single()

    if (fetchError || !user) {
        console.error('Error fetching user for decrement:', fetchError)
        return
    }

    const newCount = Math.max(0, user.remaining_reports - 1)

    const { error: updateError } = await supabase
        .from('user')
        .update({ remaining_reports: newCount })
        .eq('clerk_id', clerkId)

    if (updateError) {
        console.error('Error decrementing credits:', updateError)
    }
}