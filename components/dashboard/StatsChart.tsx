'use client'
import { useState } from 'react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'

// Define types
interface ChartData {
  name: string
  views: number
  inquiries: number
  saved: number
}

interface Metric {
  key: 'views' | 'inquiries' | 'saved'  // Specify exact keys
  name: string
  color: string
}

interface ActiveMetrics {
  [key: string]: boolean
}

// Sample data
const data: ChartData[] = [
  { name: 'Jan', views: 65, inquiries: 28, saved: 38 },
  { name: 'Feb', views: 59, inquiries: 48, saved: 42 },
  { name: 'Mar', views: 80, inquiries: 40, saved: 31 },
  { name: 'Apr', views: 81, inquiries: 37, saved: 47 },
  { name: 'May', views: 56, inquiries: 24, saved: 39 },
  { name: 'Jun', views: 55, inquiries: 29, saved: 48 },
  { name: 'Jul', views: 40, inquiries: 35, saved: 35 },
]

const metrics: Metric[] = [
  { key: 'views', name: 'Property Views', color: '#3B82F6' },
  { key: 'inquiries', name: 'Inquiries', color: '#10B981' },
  { key: 'saved', name: 'Saved Properties', color: '#F59E0B' },
]

export default function StatsChart() {
  const [activeMetrics, setActiveMetrics] = useState<ActiveMetrics>(
    metrics.reduce((acc, metric) => ({ ...acc, [metric.key]: true }), {})
  )

  const toggleMetric = (key: string) => {
    setActiveMetrics(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Activity Overview
        </h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {metrics.map((metric) => (
            <button
              key={metric.key}
              onClick={() => toggleMetric(metric.key)}
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                activeMetrics[metric.key]
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-gray-50 text-gray-400'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full mr-2"
                style={{ backgroundColor: metric.color }}
              />
              {metric.name}
            </button>
          ))}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: '#6B7280' }}
              tickLine={false}
            />
            <YAxis tick={{ fill: '#6B7280' }} tickLine={false} />
            <Tooltip />
            {metrics.map((metric) => (
              activeMetrics[metric.key] && (
                <Line
                  key={metric.key}
                  type="monotone"
                  dataKey={metric.key}
                  stroke={metric.color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              )
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}