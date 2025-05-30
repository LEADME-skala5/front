import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Target, Award, Clock } from "lucide-react"

const metrics = [
  {
    title: "Goals Completed",
    value: "12",
    total: "15",
    percentage: "80%",
    change: "+3 this month",
    icon: Target,
    color: "text-green-600",
  },
  {
    title: "Performance Score",
    value: "4.2",
    total: "5.0",
    percentage: "84%",
    change: "+0.3 from last review",
    icon: Award,
    color: "text-blue-600",
  },
  {
    title: "Productivity Index",
    value: "87%",
    total: "100%",
    percentage: "87%",
    change: "+5% this quarter",
    icon: TrendingUp,
    color: "text-purple-600",
  },
  {
    title: "On-Time Delivery",
    value: "94%",
    total: "100%",
    percentage: "94%",
    change: "+2% improvement",
    icon: Clock,
    color: "text-orange-600",
  },
]

export function PerformanceMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className={`h-4 w-4 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metric.value}
              {metric.total && <span className="text-sm text-muted-foreground">/{metric.total}</span>}
            </div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div
                className={`h-2 rounded-full ${metric.color.replace("text-", "bg-")}`}
                style={{ width: metric.percentage }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-600">{metric.change}</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
