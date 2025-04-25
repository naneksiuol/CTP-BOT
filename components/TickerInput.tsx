"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface TickerInputProps {
  onPriceUpdate: (price: number | null) => void
}

export const TickerInput: React.FC<TickerInputProps> = ({ onPriceUpdate }) => {
  const [ticker, setTicker] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPriceData = async () => {
    if (!ticker) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/ai/ticker-price?ticker=${encodeURIComponent(ticker)}`)
      if (!response.ok) throw new Error("Failed to fetch price data")

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || "Failed to fetch price data")
      }

      onPriceUpdate(data.price)
    } catch (error) {
      console.error("Error fetching price data:", error)
      onPriceUpdate(null)
      setError(`Could not find data for ticker "${ticker}". Please check the symbol and try again.`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex space-x-2">
      <Input
        placeholder="Enter ticker symbol (e.g., AAPL)"
        value={ticker}
        onChange={(e) => setTicker(e.target.value.toUpperCase())}
        className="bg-[rgba(10,14,23,0.5)] text-white border-cyan-500/20"
      />
      <Button onClick={fetchPriceData} disabled={isLoading || !ticker} className="bg-cyan-600 hover:bg-cyan-700">
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : "Fetch Price"}
      </Button>
    </div>
  )
}
