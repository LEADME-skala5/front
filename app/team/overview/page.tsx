"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TeamOverview } from "@/components/team/team-overview";

export default function TeamOverviewPage() {
  const router = useRouter();
  const [isTeamLead, setIsTeamLead] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is team lead
    const userRole = localStorage.getItem("userRole") || "member";
    if (userRole !== "teamlead") {
      router.push("/dashboard");
      return;
    }
    setIsTeamLead(true);
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-primary">Loading...</div>
      </div>
    );
  }

  if (!isTeamLead) {
    return null;
  }

  return (
    <div className="p-6">
      <TeamOverview />
    </div>
  );
}
