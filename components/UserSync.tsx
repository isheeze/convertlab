'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'

export function UserSync() {
    const { user, isLoaded } = useUser()

    useEffect(() => {
        async function syncUser() {
            if (!isLoaded || !user) return

            try {
                await fetch('/api/sync-user', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        clerkUserId: user.id,
                        email: user.primaryEmailAddress?.emailAddress,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        avatarUrl: user.imageUrl,
                    }),
                })
            } catch (error) {
                console.error('Error syncing user:', error)
            }
        }

        syncUser()
    }, [user, isLoaded])

    return null
}