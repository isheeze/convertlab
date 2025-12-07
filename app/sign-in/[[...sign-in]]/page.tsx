// app/sign-in/[[...sign-in]]/page.tsx   (or app/sign-in/page.tsx if you use custom flow)

import { SignIn } from "@clerk/nextjs"
import { Sparkles } from "lucide-react"
import Link from "next/link"

export default function SignInPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50 to-white flex items-center justify-center px-6 py-12 overflow-hidden relative">
            {/* Animated background blobs – exactly like homepage */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-400/30 via-teal-400/20 to-cyan-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-cyan-400/30 to-emerald-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="w-full max-w-md">
                {/* Logo + Tagline */}
                <div className="text-center mb-10">
                    <Link href="/" className="inline-block mb-6">
                        <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-cyan-700 bg-clip-text text-transparent">
                            BrilliantSales
                        </h1>
                    </Link>
                    <p className="text-xl text-muted-foreground">
                        Welcome back
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-3 text-emerald-600">
                        <Sparkles className="w-5 h-5" />
                        <span className="font-medium">Sign in to access your CRO reports</span>
                    </div>
                </div>

                {/* Clerk Sign-In with custom styling */}
                <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl shadow-emerald-500/10 p-8">
                    <SignIn
                        appearance={{
                            elements: {
                                rootBox: "mx-auto",
                                card: "shadow-none border-0 bg-transparent",
                                headerTitle: "hidden",
                                headerSubtitle: "hidden",
                                socialButtonsBlockButton:
                                    "border border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50/50 text-gray-700 font-medium",
                                socialButtonsBlockButtonText: "font-medium",
                                dividerLine: "bg-emerald-200",
                                dividerText: "text-muted-foreground",
                                formButtonPrimary:
                                    "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-emerald-500/30 h-11",
                                footerAction: "text-center",
                                footerActionLink:
                                    "text-emerald-600 hover:text-emerald-700 font-semibold",
                                formFieldInput:
                                    "rounded-xl border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400/30",
                                identityPreviewEditButtonIcon: "text-emerald-600",
                            },
                        }}
                        routing="path"
                        path="/sign-in"
                        signUpUrl="/sign-up"
                    />
                </div>
            </div>
        </div>
    )
}