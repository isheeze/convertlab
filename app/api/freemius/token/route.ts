import { NextResponse } from "next/server"
import { Freemius } from '@freemius/sdk';

export async function GET(request: Request) {
    try {

        const freemius = new Freemius({
            productId: process.env.FREEMIUS_PRODUCT_ID!,
            apiKey: process.env.FREEMIUS_API_KEY!,
            secretKey: process.env.FREEMIUS_SECRET_KEY!,
            publicKey: process.env.FREEMIUS_PUBLIC_KEY!,
        });

        const sandboxParams = await freemius.checkout.getSandboxParams();
        console.log(sandboxParams)
        return Response.json(sandboxParams);
    } catch (error) {
        console.error("Subscription success error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
