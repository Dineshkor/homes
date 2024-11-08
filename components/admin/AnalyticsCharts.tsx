'use client'
import { useState } from 'react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts'

interface RevenueData {
  name: string
  revenue: number
  bookings: number
  listings: number
}

interface Metric {
  key: 'revenue' | 'bookings' | 'listings'
  name: string
  color: string
}

interface ActiveMetrics {
  [key: string]: boolean
}

// Sample data - replace with API call
const data: RevenueData[] = [
  { name: 'Jan', revenue: 450000, bookings: 28, listings: 38 },
  { name: 'Feb', revenue: 520000, bookings: 32, listings: 42 },
  { name: 'Mar', revenue: 480000, bookings: 30, listings: 45 },
  { name: 'Apr', revenue: 590000, bookings: 37, listings: 47 },
  { name: 'May', revenue: 620000, bookings: 42, listings: 52 },
  { name: 'Jun', revenue: 550000, bookings: 35, listings: 48 },
  { name: 'Jul', revenue: 680000, bookings: 45, listings: 55 },
]

const metrics: Metric[] = [
  { key: 'revenue', name: 'Revenue (₹)', color: '#8B5CF6' },
  { key: 'bookings', name: 'Bookings', color: '#10B981' },
  { key: 'listings', name: 'New Listings', color: '#F59E0B' },
]

const formatRevenue = (value: number) => {
  return `₹${(value / 100000).toFixed(1)}L`
}

export default function AnalyticsChart() {
  const [activeMetrics, setActiveMetrics] = useState<ActiveMetrics>({
    revenue: true,
    bookings: true,
    listings: true,
  })

  const toggleMetric = (key: string) => {
    setActiveMetrics(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {metrics.map((metric) => (
          <button
            key={metric.key}
            onClick={() => toggleMetric(metric.key)}
            className={`
              inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
              transition-colors duration-200
              ${activeMetrics[metric.key]
                ? `bg-${metric.color.slice(1)} text-white`
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            <span className={`
              w-2 h-2 rounded-full mr-2
              ${activeMetrics[metric.key] ? 'bg-white' : `bg-${metric.color}`}
            `} />
            {metric.name}
          </button>
        ))}
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="name"
              tick={{ fill: '#6B7280' }}
              tickLine={false}
            />
            <YAxis 
              yAxisId="revenue"
              orientation="left"
              tickFormatter={formatRevenue}
              tick={{ fill: '#6B7280' }}
              tickLine={false}
            />
            <YAxis 
              yAxisId="count"
              orientation="right"
              tick={{ fill: '#6B7280' }}
              tickLine={false}
            />
            <Tooltip 
              formatter={(value, name) => {
                if (name === 'revenue') return formatRevenue(value as number)
                return value
              }}
            />
            <Legend />
            {activeMetrics.revenue && (
              <Line
                yAxisId="revenue"
                type="monotone"
                dataKey="revenue"
                stroke={metrics[0].color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            )}
            {activeMetrics.bookings && (
              <Line
                yAxisId="count"
                type="monotone"
                dataKey="bookings"
                stroke={metrics[1].color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            )}
            {activeMetrics.listings && (
              <Line
                yAxisId="count"
                type="monotone"
                dataKey="listings"
                stroke={metrics[2].color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}