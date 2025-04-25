"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, TrendingUp, TrendingDown, Minus } from "lucide-react"

type SentimentResult = {
  ticker: string
  sentiment: string
  confidence: number
  analysis: string
}

export function MarketSentimentAnalysis() {
  const [ticker, setTicker] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<SentimentResult | null>(null)

  const analyzeSentiment = async () => {
    if (!ticker) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/ai/sentiment?ticker=${ticker}`)
      if (!response.ok) throw new Error("Failed to analyze sentiment")
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Error analyzing sentiment:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getSentimentIcon = () => {
    if (!result) return null
    switch (result.sentiment) {
      case "bullish":
        return <TrendingUp className="h-8 w-8 text-green-500" />
      case "bearish":
        return <TrendingDown className="h-8 w-8 text-red-500" />
      default:
        return <Minus className="h-8 w-8 text-yellow-500" />
    }
  }

  const getSentimentColor = () => {
    if (!result) return ""
    switch (result.sentiment) {
      case "bullish":
        return "text-green-500"
      case "bearish":
        return "text-red-500"
      default:
        return "text-yellow-500"
    }
  }

  return (
    <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
      <CardHeader>
        <CardTitle className="text-cyan-100">AI Market Sentiment Analysis</CardTitle>
        <CardDescription className="text-gray-300">
          Analyze market sentiment for any ticker using Together AI
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            placeholder="Enter ticker symbol (e.g., AAPL)"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            className="bg-[rgba(10,14,23,0.5)] text-white border-cyan-500/20"
          />
          <Button onClick={analyzeSentiment} disabled={isLoading || !ticker}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Analyze
          </Button>
        </div>

        {result && (
          <div className="mt-4 space-y-4">
            <div className="flex items-center space-x-2">
              {getSentimentIcon()}
              <div>
                <p className="text-gray-300">
                  <span className="font-bold">{result.ticker}</span> sentiment is{" "}
                  <span className={`font-bold ${getSentimentColor()}`}>{result.sentiment}</span>
                </p>
                <p className="text-gray-300">
                  Confidence: <span className="font-bold">{(result.confidence * 100).toFixed(1)}%</span>
                </p>
              </div>
            </div>
            <div className="text-gray-300 text-sm mt-2 bg-[rgba(10,14,23,0.5)] p-4 rounded-md">{result.analysis}</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
