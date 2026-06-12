"use client";

import { usePathname } from "next/navigation";
import { BottomTabNav, DesktopSidebar } from "@/components/layout/bottom-tab-nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isOnboarding = pathname === "/onboarding";

  if (isOnboarding) {
    return <main className="flex-1 flex flex-col">{children}</main>;
  }

  return (
    <>
      <div className="flex flex-1 min-h-svh">
        <DesktopSidebar />
        <main className="flex-1 flex flex-col pb-20 md:pb-0 min-w-0">{children}</main>
      </div>
      <BottomTabNav />
    </>
  );
}
