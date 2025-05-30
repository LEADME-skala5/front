import { ProfileSettings } from "@/components/settings/profile-settings"
import { DataSettings } from "@/components/settings/data-settings"

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <ProfileSettings />
        </div>
        <div>
          <DataSettings />
        </div>
      </div>
    </div>
  )
}
