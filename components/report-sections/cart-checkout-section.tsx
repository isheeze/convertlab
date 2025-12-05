"use client"

import { ShoppingCart, CreditCard } from "lucide-react"
import { CollapsibleSection } from "../report-components/collapsible-section"
import { PointItem } from "../report-components/point-item"

export function CartCheckoutSection({ cartData, checkoutData }: { cartData: any; checkoutData: any }) {
  if (!cartData && !checkoutData) return null

  return (
    <div className="space-y-6">
      {cartData && (
        <CollapsibleSection
          title="Cart Page"
          icon={<ShoppingCart className="w-6 h-6" />}
          description={cartData.overview}
        >
          <div className="space-y-6">
            {/* Issues */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-red-600">Issues Found</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {cartData.issues?.map((issue: string, i: number) => (
                  <PointItem key={i} text={issue} type="negative" />
                ))}
              </div>
            </div>

            {/* Opportunities */}
            <div className="pt-6 border-t border-white/40">
              <h3 className="text-lg font-semibold mb-4 text-emerald-600">Opportunities</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {cartData.opportunities?.map((opp: string, i: number) => (
                  <PointItem key={i} text={opp} type="positive" />
                ))}
              </div>
            </div>
          </div>
        </CollapsibleSection>
      )}

      {checkoutData && (
        <CollapsibleSection
          title="Checkout Page"
          icon={<CreditCard className="w-6 h-6" />}
          description={checkoutData.overview}
        >
          <div className="space-y-6">
            {/* Issues */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-red-600">Issues Found</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {checkoutData.issues?.map((issue: string, i: number) => (
                  <PointItem key={i} text={issue} type="negative" />
                ))}
              </div>
            </div>

            {/* Opportunities */}
            <div className="pt-6 border-t border-white/40">
              <h3 className="text-lg font-semibold mb-4 text-emerald-600">Opportunities</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {checkoutData.opportunities?.map((opp: string, i: number) => (
                  <PointItem key={i} text={opp} type="positive" />
                ))}
              </div>
            </div>
          </div>
        </CollapsibleSection>
      )}
    </div>
  )
}
