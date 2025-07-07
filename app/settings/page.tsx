import { ProfileSettings } from '@/components/settings/profile-settings';
import { DataSettings } from '@/components/settings/data-settings';

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">설정</h1>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-5xl">
          <ProfileSettings />
        </div>
        {/* <div>
          <DataSettings />
        </div> */}
      </div>
    </div>
  );
}
