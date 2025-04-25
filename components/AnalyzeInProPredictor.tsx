"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Brain, Save, AlertCircle, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

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
  adlTrend?: string
  stopLoss: number
  takeProfit: number
  positionSize?: number
  signal: string
  error?: string
  timestamp: number
  optionData?: {
    calls: any[]
    puts: any[]
  }
  aiRecommendation?: string
  aiConfidence?: number
  entryPrice?: number
  expectedGain?: number
  mtfc?: Record<string, string>
}

export function AnalyzeInProPredictor() {
  const [ticker, setTicker] = useState("")
  const [strategyType, setStrategyType] = useState("short-term")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const runAnalysis = async () => {
    if (!ticker) {
      setError("Please enter a ticker symbol")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tickers: [ticker],
          strategyType,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.length > 0) {
        if (data[0].error) {
          throw new Error(data[0].error)
        }

        setResult({
          ...data[0],
          id: `${data[0].ticker}-${Date.now()}`,
          timestamp: Date.now(),
        })

        toast({
          title: "Analysis Complete",
          description: `Successfully analyzed ${data[0].ticker}`,
        })
      } else {
        throw new Error("No analysis data returned")
      }
    } catch (error) {
      console.error("Error running analysis:", error)
      setError(`Failed to analyze ${ticker}. Please try again later.`)

      toast({
        title: "Analysis Failed",
        description: `Failed to analyze ${ticker}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const saveResult = () => {
    if (!result) return

    const key = strategyType === "short-term" ? "shortTermPredictions" : "longTermPredictions"
    const savedResults = JSON.parse(localStorage.getItem(key) || "[]")
    savedResults.push(result)
    localStorage.setItem(key, JSON.stringify(savedResults))

    toast({
      title: "Prediction Saved",
      description: `${result.ticker} prediction has been saved to ${strategyType} predictions.`,
    })
  }

  const getSignalIcon = (signal: string) => {
    if (signal?.includes("Buy")) return <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
    if (signal?.includes("Sell")) return <TrendingDown className="w-4 h-4 mr-1 text-red-500" />
    return <Minus className="w-4 h-4 mr-1 text-yellow-500" />
  }

  const getSignalColor = (signal: string) => {
    if (signal?.includes("Buy")) return "text-green-500"
    if (signal?.includes("Sell")) return "text-red-500"
    return "text-yellow-500"
  }

  const getBadgeColor = (signal: string) => {
    if (signal?.includes("Buy")) return "bg-green-500/20 text-green-400"
    if (signal?.includes("Sell")) return "bg-red-500/20 text-red-400"
    return "bg-yellow-500/20 text-yellow-400"
  }

  return (
    <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
      <CardHeader>
        <CardTitle className="text-cyan-100 flex items-center">
          <Brain className="mr-2 h-6 w-6 text-cyan-400" />
          Pro Predictor Analysis
        </CardTitle>
        <CardDescription className="text-gray-300">
          Analyze stocks and assets with our comprehensive prediction tools
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ticker" className="text-gray-300">
                Ticker Symbol
              </Label>
              <Input
                id="ticker"
                placeholder="e.g., AAPL, MSFT, SPY"
                value={ticker}
                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                className="bg-[rgba(10,14,23,0.5)] text-white border-cyan-500/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="strategy-type" className="text-gray-300">
                Strategy Type
              </Label>
              <Select value={strategyType} onValueChange={setStrategyType}>
                <SelectTrigger id="strategy-type" className="bg-[rgba(10,14,23,0.5)] text-white border-cyan-500/20">
                  <SelectValue placeholder="Select strategy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short-term">Short-Term</SelectItem>
                  <SelectItem value="long-term">Long-Term</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 p-4 rounded-md flex items-start gap-3 border border-red-500/40">
              <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-400 font-medium">Error</p>
                <p className="text-gray-300 text-sm">{error}</p>
              </div>
            </div>
          )}

          <Button
            onClick={runAnalysis}
            disabled={isLoading || !ticker}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Run Analysis
              </>
            )}
          </Button>
        </div>

        {result && (
          <div className="mt-6 space-y-6">
            <div className="bg-[rgba(10,14,23,0.7)] p-6 rounded-lg border border-cyan-500/10">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-bold text-cyan-100">{result.ticker}</h3>
                  <p className="text-gray-300">{result.strategy} Analysis</p>
                </div>
                <Badge className={getBadgeColor(result.signal)}>
                  {getSignalIcon(result.signal)}
                  {result.signal}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[rgba(10,14,23,0.5)] p-3 rounded-md">
                  <p className="text-gray-400 text-sm">Current Price</p>
                  <p className="text-xl font-bold text-cyan-100">${result.lastClose?.toFixed(2) ?? "N/A"}</p>
                </div>
                <div className="bg-[rgba(10,14,23,0.5)] p-3 rounded-md">
                  <p className="text-gray-400 text-sm">Target Price</p>
                  <p className="text-xl font-bold text-green-400">${result.takeProfit?.toFixed(2) ?? "N/A"}</p>
                </div>
                <div className="bg-[rgba(10,14,23,0.5)] p-3 rounded-md">
                  <p className="text-gray-400 text-sm">Stop Loss</p>
                  <p className="text-xl font-bold text-red-400">${result.stopLoss?.toFixed(2) ?? "N/A"}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-[rgba(10,14,23,0.5)] p-3 rounded-md">
                  <p className="text-gray-400 text-sm">AI Recommendation</p>
                  <p className={`text-lg font-bold ${getSignalColor(result.aiRecommendation || "")}`}>
                    {result.aiRecommendation || "N/A"} (
                    {(result.aiConfidence ? result.aiConfidence * 100 : 0).toFixed(0)}%)
                  </p>
                </div>
                <div className="bg-[rgba(10,14,23,0.5)] p-3 rounded-md">
                  <p className="text-gray-400 text-sm">Expected Gain</p>
                  <p
                    className={`text-lg font-bold ${result.expectedGain && result.expectedGain > 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {result.expectedGain
                      ? `${result.expectedGain > 0 ? "+" : ""}${result.expectedGain.toFixed(2)}%`
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div className="bg-[rgba(10,14,23,0.5)] p-3 rounded-md mb-6">
                <p className="text-gray-400 text-sm mb-1">Market Condition</p>
                <p className="text-gray-300">{result.marketConditionContext || "No market context available"}</p>
              </div>

              <Button
                onClick={saveResult}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Results
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
