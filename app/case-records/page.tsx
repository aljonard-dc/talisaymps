import SideNav from "@/components/ui/SideNav";
import React, { Suspense, lazy } from "react";

// Lazy load CaseRecords component
const CaseRecords = lazy(() => import("@/components/CaseRecords"));

export default function Page() {
  return (
    <main className="flex h-screen">
      <SideNav />
      <div className="flex-1">
        <Suspense fallback={<div>Loading...</div>}>
          <CaseRecords />
        </Suspense>
      </div>
    </main>
  );
}
