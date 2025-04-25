import "@/styles/globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Cyber Trader Pro - ML Trading Dashboard",
  description: "Advanced AI-powered trading analysis with ML Dashboard for the modern investor.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          {children}
          <footer className="mt-auto">
            <div className="w-full py-6 bg-gray-50 dark:bg-gray-900">
              <div className="container px-4 md:px-6">
                <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                  Disclaimer: This script is for educational and informational purposes only. Trading involves risk, and
                  past performance does not guarantee future results. Use at your own discretion.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
              <p className="text-xs text-gray-500 dark:text-gray-400">© 2025 Cyber Trader Pro. All rights reserved.</p>
              <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                <Link className="text-xs hover:underline underline-offset-4" href="#">
                  Terms of Service
                </Link>
                <Link className="text-xs hover:underline underline-offset-4" href="#">
                  Privacy
                </Link>
              </nav>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
