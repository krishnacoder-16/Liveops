import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SocketProvider } from "@/features/realtime/SocketProvider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Live Ops Helpdesk",
  description: "Realtime collaborative helpdesk operations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <SocketProvider>
          {children}
        </SocketProvider>
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
