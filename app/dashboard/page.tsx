import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { TaskList } from '@/components/dashboard/task-list';
import { ChatBot } from '@/components/dashboard/chat-bot';

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <DashboardHeader />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <TaskList />
        </div>
        <div>
          <ChatBot />
        </div>
      </div>
    </div>
  );
}
