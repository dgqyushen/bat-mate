import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "电池材料计算器",
  description: "电池正负极材料质量计算工具，支持活性物质、导电剂、粘结剂等成分的精确计算",
  keywords: "电池材料,正极,负极,计算器,活性物质,导电剂,粘结剂",
  authors: [{ name: "电池材料计算器" }],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "电池材料计算器",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "电池材料计算器",
    description: "电池正负极材料质量计算工具",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "电池材料计算器",
    description: "电池正负极材料质量计算工具",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="电池材料计算器" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
