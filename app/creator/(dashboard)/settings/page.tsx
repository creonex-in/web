import { DashboardTopbar } from '@/components/layout/dashboard-topbar'
import { SettingsPanel } from '@/components/shared/settings-panel'
import { mockCreators } from '@/data/mock-creators'

export const metadata = { title: 'Settings — Creonex' }

export default function CreatorSettingsPage(): React.ReactElement {
  const creator = mockCreators[0]

  return (
    <>
      <DashboardTopbar title="Settings" />
      <div className="p-6">
        <SettingsPanel
          role="creator"
          name={creator.name}
          initials={creator.initials}
          email="meera@creonex.in"
          bio={creator.bio}
          notifications={[
            { id: 'new-booking', label: 'New bookings', description: 'Get notified when a learner books a session.', defaultOn: true },
            { id: 'reviews', label: 'New reviews', description: 'Alerts when learners leave a review.', defaultOn: true },
            { id: 'payouts', label: 'Payout updates', description: 'Notifications about transfers and pending payouts.', defaultOn: true },
            { id: 'collab', label: 'Collaboration invites', description: 'When another creator invites you to collaborate.', defaultOn: false },
            { id: 'tips', label: 'Growth tips', description: 'CQS insights and tips to grow your earnings.', defaultOn: false },
          ]}
        />
      </div>
    </>
  )
}
