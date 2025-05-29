"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-notifications">Email Notifications</Label>
            <p className="text-sm text-muted-foreground">Receive email updates about your tasks</p>
          </div>
          <Switch id="email-notifications" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="push-notifications">Push Notifications</Label>
            <p className="text-sm text-muted-foreground">Get push notifications on your device</p>
          </div>
          <Switch id="push-notifications" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="task-reminders">Task Reminders</Label>
            <p className="text-sm text-muted-foreground">Remind me about upcoming deadlines</p>
          </div>
          <Switch id="task-reminders" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="weekly-reports">Weekly Reports</Label>
            <p className="text-sm text-muted-foreground">Automatically generate weekly summaries</p>
          </div>
          <Switch id="weekly-reports" />
        </div>
      </CardContent>
    </Card>
  )
}
