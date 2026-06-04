import { DashboardTopbar } from '@/components/layout/dashboard-topbar'
import { OfferForm } from '@/components/creator/offer-form'
import { Card, CardContent } from '@/components/ui/card'

export const metadata = { title: 'New Offer — Creonex' }

export default function NewOfferPage(): React.ReactElement {
  return (
    <>
      <DashboardTopbar title="Create Offer" />
      <div className="p-6 max-w-xl mx-auto">
        <Card>
          <CardContent className="pt-6">
            <OfferForm />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
