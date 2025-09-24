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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#2563eb",
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  title: "한의학적 체질 진단 테스트",
  description: "사상의학 기반의 체질 진단을 통해 자신의 체질을 알아보세요. 태양인, 태음인, 소양인, 소음인 중 당신의 체질은?",
  keywords: ["체질진단", "사상의학", "한의학", "태양인", "태음인", "소양인", "소음인", "건강", "체질"],
  authors: [{ name: "Korean Medicine Test" }],
  creator: "Korean Medicine Test",
  publisher: "Korean Medicine Test",
  manifest: "/manifest.json",
  metadataBase: new URL("https://korean-medicine-test.vercel.app"),
  icons: {
    icon: [
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-256x256.png", sizes: "256x256", type: "image/png" },
      { url: "/icon-384x384.png", sizes: "384x384", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icon-192x192.png", sizes: "192x192" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "체질진단",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://korean-medicine-test.vercel.app",
    siteName: "한의학적 체질 진단 테스트",
    title: "한의학적 체질 진단 테스트",
    description: "사상의학 기반의 체질 진단을 통해 자신의 체질을 알아보세요",
    images: [
      {
        url: "/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "한의학적 체질 진단 테스트",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "한의학적 체질 진단 테스트",
    description: "사상의학 기반의 체질 진단을 통해 자신의 체질을 알아보세요",
    images: ["/icon-512x512.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
