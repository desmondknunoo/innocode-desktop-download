import type { Metadata } from "next";
import "./globals.css";
import { Footer, Nav } from "@/components/site";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: { default: "InnoCode Desktop", template: "%s | InnoCode Desktop" },
  description: "Download the InnoCode desktop app for Windows and Linux.",
  keywords: ["InnoCode", "desktop coding app", "block coding", "STEM education"],
  openGraph: { title: "InnoCode Desktop", description: "Download the InnoCode desktop app.", type: "website", locale: "en_GH" },
  robots: { index:true, follow:true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Nav />{children}<Footer /><ScrollToTop /></body></html>;
}
