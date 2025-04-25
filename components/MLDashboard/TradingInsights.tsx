"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Clock, TrendingUp } from "lucide-react"

type InsightsResult = {
  ticker: string
  strategy: string
  timeframe: string
  insights: string
}

export function TradingInsights() {
  const [ticker, setTicker] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<InsightsResult | null>(null)

  const generateInsights = async () => {
    if (!ticker) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/ai/insights?ticker=${ticker}`)
      if (!response.ok) throw new Error("Failed to generate insights")
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Error generating insights:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
      <CardHeader>
        <CardTitle className="text-cyan-100">AI Trading Insights</CardTitle>
        <CardDescription className="text-gray-300">Get AI-powered trading strategy recommendations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            placeholder="Enter ticker symbol (e.g., AAPL)"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            className="bg-[rgba(10,14,23,0.5)] text-white border-cyan-500/20"
          />
          <Button onClick={generateInsights} disabled={isLoading || !ticker}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Generate
          </Button>
        </div>

        {result && (
          <div className="mt-4 space-y-4">
            <div className="flex items-start space-x-4">
              <TrendingUp className="h-6 w-6 text-cyan-400 mt-1" />
              <div>
                <p className="text-gray-300">
                  <span className="font-bold">{result.ticker}</span> - Recommended Strategy:{" "}
                  <span className="font-bold text-cyan-400">{result.strategy}</span>
                </p>
                <p className="text-gray-300 flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-cyan-400" />
                  Timeframe: <span className="font-bold ml-1">{result.timeframe}</span>
                </p>
              </div>
            </div>
            <div className="text-gray-300 text-sm mt-2 bg-[rgba(10,14,23,0.5)] p-4 rounded-md">{result.insights}</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
