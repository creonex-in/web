'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { weeklyEarnings } from '@/data/mock-earnings'

const chartConfig: ChartConfig = {
  earnings: {
    label: 'Earnings',
    color: 'hsl(var(--primary))',
  },
}

export function EarningsChart(): React.ReactElement {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartRef.current) return
    gsap.from(chartRef.current, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' })
  }, [])

  return (
    <div ref={chartRef}>
      <ChartContainer config={chartConfig} className="h-48 w-full">
        <BarChart data={weeklyEarnings} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border" />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(val) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Earnings']}
              />
            }
          />
          <Bar dataKey="earnings" fill="var(--color-earnings)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
