import { DashboardTopbar } from '@/components/layout/dashboard-topbar'
import { SessionRow } from '@/components/learner/session-row'
import { EmptyState } from '@/components/shared/empty-state'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { mockPurchases } from '@/data/mock-purchases'

export const metadata = { title: 'Purchases — Creonex' }

export default function PurchasesPage(): React.ReactElement {
  return (
    <>
      <DashboardTopbar title="Purchases" showSearch />
      <div className="space-y-3 p-4 sm:p-6">
        {mockPurchases.length === 0 ? (
          <EmptyState
            icon={faBagShopping}
            title="No purchases yet"
            description="Sessions, workshops, and digital products you buy will appear here."
          />
        ) : (
          mockPurchases.map((p, i) => <SessionRow key={p.id} purchase={p} index={i} />)
        )}
      </div>
    </>
  )
}
