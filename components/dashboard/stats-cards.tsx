import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, AlertCircle, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Completed Tasks",
    value: "24",
    change: "+12%",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    title: "Pending Tasks",
    value: "8",
    change: "-5%",
    icon: Clock,
    color: "text-yellow-600",
  },
  {
    title: "Overdue Tasks",
    value: "3",
    change: "+2%",
    icon: AlertCircle,
    color: "text-red-600",
  },
  {
    title: "Productivity",
    value: "87%",
    change: "+8%",
    icon: TrendingUp,
    color: "text-blue-600",
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className={stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}>{stat.change}</span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
