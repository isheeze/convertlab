// types/supabase.ts
export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string
                    clerk_id: string
                    freemius_id: string | null
                    payment_plan: 'free' | 'starter' | 'pro'
                    remaining_reports: number
                    created_at: string
                    subscription_start_date: string | null
                    remaining_months: number | null
                }
                Insert: {
                    id?: string
                    clerk_id: string
                    freemius_id?: string | null
                    payment_plan?: 'free' | 'starter' | 'pro'
                    remaining_reports?: number
                    created_at?: string
                    subscription_start_date?: string | null
                    remaining_months?: number | null
                }
                Update: {
                    id?: string
                    clerk_id?: string
                    freemius_id?: string | null
                    payment_plan?: 'free' | 'starter' | 'pro'
                    remaining_reports?: number
                    created_at?: string
                    subscription_start_date?: string | null
                    remaining_months?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: "users_id_fkey"
                        columns: ["id"]
                        referencedRelation: "reports"
                        referencedColumns: ["user_id"]
                    }
                ]
            }
            reports: {
                Row: {
                    id: string
                    user_id: string
                    report: Json
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    report: Json
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    report?: Json
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "reports_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
