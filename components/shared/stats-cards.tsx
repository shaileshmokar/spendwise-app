import { StatCard } from "./stat-card"
import type { StatCardData } from "@/type/types"

type StatsCardProps = {
  stats: StatCardData[]
}

export function StatsCards({ stats }: StatsCardProps) {
  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      {stats.map((stat) => (
        <StatCard key={stat.title} stat={stat} />
      ))}
    </div>
  )
}
