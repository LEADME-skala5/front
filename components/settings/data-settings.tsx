"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Download, Trash2, AlertTriangle } from "lucide-react"

export function DataSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium">Export Data</h4>
          <p className="text-sm text-muted-foreground">Download all your data in JSON format</p>
          <Button variant="outline" className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Export All Data
          </Button>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Storage Usage</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Tasks & Projects</span>
              <span>2.4 MB</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Uploaded Files</span>
              <span>15.7 MB</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Reports</span>
              <span>8.2 MB</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: "35%" }}></div>
            </div>
            <p className="text-xs text-muted-foreground">26.3 MB of 100 MB used</p>
          </div>
        </div>

        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Danger Zone</strong>
            <p className="mt-2">Permanently delete all your data. This action cannot be undone.</p>
            <Button variant="destructive" size="sm" className="mt-2">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete All Data
            </Button>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}
