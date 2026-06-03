import { DashboardTopbar } from '@/components/layout/dashboard-topbar'
import { MetricCard } from '@/components/creator/metric-card'
import { EarningsChart } from '@/components/creator/earnings-chart'
import { InsightBox } from '@/components/creator/insight-box'
import { BookingRow } from '@/components/creator/booking-row'
import { WelcomeHero } from '@/components/shared/welcome-hero'
import { QuickActions } from '@/components/shared/quick-actions'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlus,
  faShareNodes,
  faBox,
  faClock,
  faChartColumn,
} from '@fortawesome/free-solid-svg-icons'
import { creatorMetrics } from '@/data/mock-earnings'
import { mockBookings } from '@/data/mock-bookings'
import { formatCurrency, cn } from '@/lib/utils'
import Link from 'next/link'

export const metadata = { title: 'Dashboard — Creonex' }

export default function CreatorDashboardPage(): React.ReactElement {
  const upcomingBookings = mockBookings.filter(
    (b) => b.status === 'upcoming' || b.status === 'confirmed'
  )

  return (
    <>
      <DashboardTopbar
        title="Dashboard"
        action={
          <Link href="/creator/offers/new" className={cn(buttonVariants({ size: 'sm' }), 'text-xs')}>
            <FontAwesomeIcon icon={faPlus} className="size-3.5 mr-1" />
            New offer
          </Link>
        }
      />
      <div className="space-y-6 p-4 sm:p-6">
        <WelcomeHero
          name="Meera Venkatesh"
          initials="MV"
          subtitle="Here's how your creator business is doing today."
          stats={[
            { label: 'This month', value: formatCurrency(creatorMetrics.earningsThisMonth) },
            { label: 'Bookings', value: creatorMetrics.totalBookings.toString() },
            { label: 'CQS score', value: creatorMetrics.cqsScore.toString() },
          ]}
          action={
            <>
              <Link href="/creator/offers/new" className={cn(buttonVariants({ size: 'sm' }), 'text-xs')}>
                <FontAwesomeIcon icon={faPlus} className="mr-1 size-3.5" />
                New offer
              </Link>
              <Link
                href="/creator/dashboard"
                className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'text-xs')}
              >
                <FontAwesomeIcon icon={faShareNodes} className="mr-1 size-3.5" />
                Share page
              </Link>
            </>
          }
        />

        <QuickActions
          actions={[
            { label: 'New offer', description: 'Create a session or course', icon: faPlus, href: '/creator/offers/new' },
            { label: 'My offers', description: 'Manage your listings', icon: faBox, href: '/creator/offers' },
            { label: 'Set availability', description: 'Update your calendar', icon: faClock, href: '/creator/calendar' },
            { label: 'View analytics', description: 'Track your growth', icon: faChartColumn, href: '/creator/analytics' },
          ]}
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <MetricCard
            label="Earnings (this month)"
            value={formatCurrency(creatorMetrics.earningsThisMonth)}
            change={creatorMetrics.earningsGrowth}
            changeLabel="vs last month"
            index={0}
          />
          <MetricCard
            label="Total bookings"
            value={creatorMetrics.totalBookings.toString()}
            changeLabel={`${creatorMetrics.bookingsThisWeek} this week`}
            index={1}
          />
          <MetricCard
            label="Profile views"
            value={creatorMetrics.profileViews.toLocaleString()}
            changeLabel={`${creatorMetrics.conversionRate}% conversion`}
            index={2}
          />
          <MetricCard
            label="CQS score"
            value={creatorMetrics.cqsScore.toString()}
            change={creatorMetrics.cqsChange}
            changeLabel="this month"
            index={3}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <Card className="lg:col-span-3">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Weekly earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <EarningsChart />
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{"Today's schedule"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5">
              {upcomingBookings.slice(0, 3).map((booking, i) => (
                <BookingRow key={booking.id} booking={booking} index={i} compact />
              ))}
            </CardContent>
          </Card>
        </div>

        <InsightBox
          message="Your profile conversion is 3.1% — below the 5% average. Adding 2 testimonials and updating your session title could boost bookings by ~40%."
          type="warning"
          actionLabel="Edit profile →"
        />

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Recent reviews</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: 'Arjun K.', initials: 'AK', rating: 5, text: '"Meera\'s feedback on my portfolio was incredibly specific and actionable. Booked again already."' },
              { name: 'Preet R.', initials: 'PR', rating: 5, text: '"Worth every rupee. Totally changed how I approach UX research."' },
              { name: 'Sanya R.', initials: 'SR', rating: 4, text: '"Great session. Would have loved more time on the case study structure."' },
            ].map((review, i) => (
              <div key={i} className="flex gap-3">
                <div className="size-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium shrink-0">
                  {review.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium">{review.name}</span>
                    <span className="text-xs text-amber-400">{'★'.repeat(review.rating)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{review.text}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
