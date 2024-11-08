import DashboardStats from '@/components/dashboard/DashboardStats'
import StatsChart from '@/components/dashboard/StatsChart'
import RecentActivity from '@/components/dashboard/RecentActivity'
import SavedProperties from '@/components/dashboard/SavedProperties'
import PropertyListing from '@/components/dashboard/PropertyListing'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      <DashboardStats />
      <PropertyListing />
      <StatsChart />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <SavedProperties />
      </div>
    </div>
  )
}