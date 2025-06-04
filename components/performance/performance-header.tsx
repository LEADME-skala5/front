"use client";

import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";

export function PerformanceHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">성과 관리</h1>
        {/* <p className="text-muted-foreground">
          Track your goals, metrics, and performance reviews
        </p> */}
      </div>
      <div className="flex gap-2"></div>
    </div>
  );
}
