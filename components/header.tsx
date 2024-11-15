"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { SidebarTrigger } from "./ui/sidebar";

export function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
      </div>
      <ConnectButton />
    </header>
  );
}
