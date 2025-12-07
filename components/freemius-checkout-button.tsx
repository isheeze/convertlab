// components/FreemiusCheckoutButton.tsx
"use client";

import { useEffect, useState } from "react";

type Props = {
    planId: string;
    children: React.ReactNode;
    className?: string;
};

declare global {
    interface Window {
        FS?: any;
    }
}

export default function FreemiusCheckoutButton({ planId, children, className }: Props) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Wait for Freemius SDK to load
        if (window.FS) {
            setIsLoading(false);
            return;
        }

        const interval = setInterval(() => {
            if (window.FS) {
                setIsLoading(false);
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();

        if (!window.FS) {
            alert("Checkout is still loading. Please try again in a moment.");
            return;
        }

        const handler = new window.FS.Checkout({
            product_id: "22164",
            plan_id: planId,
            public_key: process.env.FREEMIUS_PUBLIC_KEY,
            image: window.location.origin + "/logo.png",
        });

        const sandbox = await fetch('/api/freemius/token').then((res) => res.json());

        handler.open({
            //sandbox: sandbox,
            name: "BrilliantSales",
            licenses: 1,
            purchaseCompleted: async (data: any) => {
                console.log("Purchase completed!", data);
                try {
                    const response = await fetch("/api/subscription-success", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ planId }),
                    });

                    if (!response.ok) {
                        console.error("Failed to update subscription on server");
                    }
                } catch (error) {
                    console.error("Error updating subscription:", error);
                }
            },
            success: (data: any) => {
                console.log("Checkout closed - success", data);
                // Redirect or show thank you
                window.location.href = "/dashboard?welcome=true";
            },
        });
    };

    return (
        <button
            onClick={handleClick}
            disabled={isLoading}
            className={className}
        >
            {isLoading ? "Loading checkout..." : children}
        </button>
    );
}