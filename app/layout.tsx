import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { DappWithProviders } from "../components/dapp-with-providers";

export const metadata: Metadata = {
  title: "Dapp Template",
  description: "A template to start building a Dapp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <DappWithProviders>{children}</DappWithProviders>
      </body>
    </html>
  );
}
