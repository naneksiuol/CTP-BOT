"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { DonationForm } from "@/components/DonationForm"

export default function DonatePage() {
  const [amount, setAmount] = useState("")

  const predefinedAmounts = [5, 10, 20]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-gradient-to-r from-green-100 to-yellow-100 dark:from-gray-800 dark:to-gray-700">
        <Link className="flex items-center justify-center" href="/">
          <span className="font-bold">Cyber Trader Pro</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/pro-predictor">
            Pro Predictor
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/about">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/faq">
            FAQ
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-green-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <Heart className="h-24 w-24 text-red-500" />
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Donate to Cyber Trader Pro
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Your support helps us continue developing and improving our AI-powered trading analysis tools.
              </p>
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Make a Donation</CardTitle>
                  <CardDescription>Choose an amount or enter a custom value</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {predefinedAmounts.map((presetAmount) => (
                      <Button
                        key={presetAmount}
                        onClick={() => setAmount(presetAmount.toString())}
                        variant={amount === presetAmount.toString() ? "default" : "outline"}
                        className="w-full"
                      >
                        ${presetAmount}
                      </Button>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <Input
                      type="number"
                      placeholder="Custom amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full"
                    />
                    <DonationForm amount={Number.parseFloat(amount)} />
                  </div>
                </CardContent>
              </Card>
              <p className="mt-4 text-lg font-semibold text-blue-600 dark:text-blue-400">
                Donations coming soon! We're working on setting up our payment system.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Donations are processed securely through Stripe. Cyber Trader Pro is not a registered charity.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
