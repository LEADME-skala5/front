import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { TaskList } from "@/components/dashboard/task-list"
import { ChatBot } from "@/components/dashboard/chat-bot"
import { FileUpload } from "@/components/dashboard/file-upload"

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <DashboardHeader />
      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <TaskList />
          <FileUpload />
        </div>
        <div>
          <ChatBot />
        </div>
      </div>
    </div>
  )
}
