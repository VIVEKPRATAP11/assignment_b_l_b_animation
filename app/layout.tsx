import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import AdvancedCursor from "@/components/advanced-cursor"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Book Luxury Boat",
  description: "Book luxury boats for unforgettable experiences",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AdvancedCursor />
          {children}
          <div className="noise-bg" aria-hidden="true" />
        </ThemeProvider>
      </body>
    </html>
  )
}
