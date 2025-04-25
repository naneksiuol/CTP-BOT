"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from "lucide-react"

type AnalysisResult = {
  id: string
  ticker: string
  strategy: string
  weightedScore: number
  lastClose: number
  atr: number
  trend: string
  marketCondition: string
  volumeCategory: string
  adlTrend: string
  stopLoss: number
  takeProfit: number
  positionSize: number
  signal: string
  error?: string
  timestamp: number
  optionData?: {
    calls: any[]
    puts: any[]
  }
}

type SavedPredictionsProps = {
  strategyType: "short-term" | "long-term"
}

export function SavedPredictions({ strategyType }: SavedPredictionsProps) {
  const [savedResults, setSavedResults] = useState<AnalysisResult[]>([])

  useEffect(() => {
    const key = strategyType === "short-term" ? "shortTermPredictions" : "longTermPredictions"
    try {
      const results = JSON.parse(localStorage.getItem(key) || "[]")
      setSavedResults(results)
    } catch (error) {
      console.error("Error loading saved predictions:", error)
      setSavedResults([])
    }
  }, [strategyType])

  const deleteResult = (id: string) => {
    const key = strategyType === "short-term" ? "shortTermPredictions" : "longTermPredictions"
    const updatedResults = savedResults.filter((result) => result.id !== id)
    localStorage.setItem(key, JSON.stringify(updatedResults))
    setSavedResults(updatedResults)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {savedResults.map((result) => (
        <Card key={result.id}>
          <CardHeader>
            <CardTitle>{result.ticker}</CardTitle>
            <CardDescription>{result.strategy} Analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Last Close:</strong> ${result.lastClose.toFixed(2)}
            </p>
            <p>
              <strong>ATR:</strong> ${result.atr.toFixed(2)}
            </p>
            <p>
              <strong>Trend:</strong> {result.trend}
            </p>
            <p>
              <strong>Market Condition:</strong> {result.marketCondition}
            </p>
            <p>
              <strong>Volume Category:</strong> {result.volumeCategory}
            </p>
            <p>
              <strong>ADL Trend:</strong> {result.adlTrend}
            </p>
            <p>
              <strong>Weighted Score:</strong> {result.weightedScore.toFixed(2)}
            </p>
            <p
              className={`flex items-center ${
                result.signal.includes("Buy")
                  ? "text-green-500"
                  : result.signal.includes("Sell")
                    ? "text-red-500"
                    : "text-gray-500"
              }`}
            >
              <strong>Signal:</strong>&nbsp;
              {result.signal.includes("Buy") ? (
                <ArrowUpIcon className="w-4 h-4" />
              ) : result.signal.includes("Sell") ? (
                <ArrowDownIcon className="w-4 h-4" />
              ) : (
                <MinusIcon className="w-4 h-4" />
              )}
              {result.signal}
            </p>
            <p>
              <strong>Stop Loss:</strong> ${result.stopLoss.toFixed(2)}
            </p>
            <p>
              <strong>Take Profit:</strong> ${result.takeProfit.toFixed(2)}
            </p>
            <p>
              <strong>Position Size:</strong> {result.positionSize}
            </p>
            <p>
              <strong>Saved on:</strong> {new Date(result.timestamp).toLocaleString()}
            </p>
            {result.optionData && (
              <>
                <h4 className="font-bold mt-4">Option Data</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold">Calls</h5>
                    <ul className="text-sm">
                      {result.optionData.calls.slice(0, 3).map((call, index) => (
                        <li key={index}>
                          Strike: ${call.strike.toFixed(2)}, Price: ${call.lastPrice.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold">Puts</h5>
                    <ul className="text-sm">
                      {result.optionData.puts.slice(0, 3).map((put, index) => (
                        <li key={index}>
                          Strike: ${put.strike.toFixed(2)}, Price: ${put.lastPrice.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}
            <Button className="mt-4" variant="destructive" onClick={() => deleteResult(result.id)}>
              Delete Prediction
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
