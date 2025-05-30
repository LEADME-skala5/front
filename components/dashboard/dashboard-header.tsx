"use client";

interface DashboardHeaderProps {
  onNewTask?: () => void;
}

export function DashboardHeader({ onNewTask }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your work overview.
        </p>
      </div>
    </div>
  );
}
