import type React from "react"
import type { Metadata } from "next"
import {
  ClerkProvider
} from '@clerk/nextjs'
import { UserSync } from '@/components/UserSync'
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Script from 'next/script'

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BrilliantSales - CRO Analysis for Shopify",
  description: "Generate detailed CRO reports for your Shopify store and get actionable insights to boost conversions",
  icons: {
    icon: [
      {
        url: "/logo.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logo.png",
        media: "(prefers-color-scheme: dark)",
      }
    ],
    apple: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#009966', // Example: a specific hex color
          colorText: 'black', // Example: change text color
        },
      }}>
      <html lang="en">
        <body className={`font-sans antialiased bg-background text-foreground`}>
          <UserSync />
          {children}
          <Script
            src="https://checkout.freemius.com/js/v1/"
            strategy="afterInteractive"
          />
        </body>
      </html>
    </ClerkProvider>
  )
}
