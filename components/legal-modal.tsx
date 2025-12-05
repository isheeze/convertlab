"use client"

import { X } from "lucide-react"
import { useEffect } from "react"

interface LegalModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    content: string
}

export function LegalModal({ isOpen, onClose, title, content }: LegalModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="relative w-full max-w-2xl max-h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
                    <div
                        className="prose prose-emerald max-w-none text-gray-600"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </div>
            </div>

            {/* Backdrop click handler */}
            <div className="absolute inset-0 -z-10" onClick={onClose} />
        </div>
    )
}
