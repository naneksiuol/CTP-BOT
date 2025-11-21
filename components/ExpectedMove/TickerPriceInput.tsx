"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, Search } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface TickerPriceInputProps {
  onPriceUpdate: (price: number, ticker: string) => void
}

export function TickerPriceInput({ onPriceUpdate }: TickerPriceInputProps) {
  const [ticker, setTicker] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const fetchPrice = async () => {
    if (!ticker) {
      toast({
        title: "Error",
        description: "Please enter a ticker symbol",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`/api/ai/ticker-price?ticker=${encodeURIComponent(ticker)}`)

      if (!response.ok) {
        throw new Error(`Failed to fetch price data: ${response.status}`)
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || "Failed to fetch price data")
      }

      onPriceUpdate(data.price, ticker)

      toast({
        title: "Price Updated",
        description: `Current price for ${ticker}: $${data.price.toFixed(2)}`,
      })
    } catch (error) {
      console.error("Error fetching price:", error)
      toast({
        title: "Error",
        description: `Could not fetch price for ${ticker}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex space-x-2 mb-4">
      <Input
        placeholder="Enter ticker symbol (e.g., AAPL)"
        value={ticker}
        onChange={(e) => setTicker(e.target.value.toUpperCase())}
        className="bg-[rgba(10,14,23,0.5)] text-white border-cyan-500/20"
      />
      <Button
        onClick={fetchPrice}
        disabled={isLoading || !ticker}
        className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Loading...
          </>
        ) : (
          <>
            <Search className="h-4 w-4 mr-2" />
            Get Price
          </>
        )}
      </Button>
    </div>
  )
}
