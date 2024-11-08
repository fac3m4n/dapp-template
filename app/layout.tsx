import type { Metadata } from "next";
import { cookies } from "next/headers";

import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { ScaffoldEthAppWithProviders } from "@/components/ScaffoldEthAppWithProviders";
import { AppSidebar } from "../components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} antialiased`}>
        <ScaffoldEthAppWithProviders>
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <main className="bg-blue-200 w-full">
              <SidebarTrigger />
              <div>Header</div>
              {children}
            </main>
          </SidebarProvider>
        </ScaffoldEthAppWithProviders>
      </body>
    </html>
  );
}
