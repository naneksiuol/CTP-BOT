"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Loader2,
  TrendingUp,
  TrendingDown,
  Minus,
  DollarSign,
  Target,
  AlertTriangle,
  BarChart2,
  RefreshCw,
  AlertCircle,
  Brain,
  Save,
  Copy,
  Share2,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"

type IndicatorType = {
  name: string
  value: number
  action: string
}

type AnalysisResult = {
  ticker: string
  recommendation: string
  confidence: number
  entryPrice: number
  targetPrice: number
  stopLoss: number
  expectedGain: number
  analysis: string
  indicators: {
    movingAverages: IndicatorType[]
    oscillators: IndicatorType[]
  }
  currentPrice: number
  priceChange: number
  priceChangePercent: number
}

type PriceData = {
  price: number
  change: number
  changePercent: number
  high: number
  low: number
  volume: number
  success: boolean
}

export function TechnicalAnalysis() {
  const [ticker, setTicker] = useState("")
  const [priceData, setPriceData] = useState<PriceData | null>(null)
  const [isLoadingPrice, setIsLoadingPrice] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Sample indicators based on the screenshots
  const [movingAverages, setMovingAverages] = useState<IndicatorType[]>([
    { name: "Exponential Moving Average (10)", value: 89973.69, action: "Sell" },
    { name: "Simple Moving Average (10)", value: 93307.78, action: "Sell" },
    { name: "Exponential Moving Average (20)", value: 88676.9, action: "Sell" },
    { name: "Simple Moving Average (20)", value: 94289.79, action: "Sell" },
    { name: "Exponential Moving Average (30)", value: 84945.6, action: "Buy" },
    { name: "Simple Moving Average (30)", value: 83926.67, action: "Buy" },
    { name: "Exponential Moving Average (50)", value: 77309.58, action: "Buy" },
    { name: "Simple Moving Average (50)", value: 75889.28, action: "Buy" },
    { name: "Ichimoku Base Line (9, 26, 52, 26)", value: 84267.0, action: "Neutral" },
    { name: "Volume Weighted Moving Average (20)", value: 93959.59, action: "Sell" },
    { name: "Hull Moving Average (9)", value: 80858.12, action: "Buy" },
  ])

  const [oscillators, setOscillators] = useState<IndicatorType[]>([
    { name: "Relative Strength Index (14)", value: 48.88, action: "Neutral" },
    { name: "Stochastic %K (14, 3, 3)", value: 17.16, action: "Neutral" },
    { name: "Commodity Channel Index (20)", value: -106.44, action: "Buy" },
    { name: "Average Directional Index (14)", value: 31.39, action: "Neutral" },
    { name: "Momentum (10)", value: -9537.15, action: "Buy" },
    { name: "MACD Level (12, 26)", value: 3708.23, action: "Sell" },
    { name: "Williams Percent Range (14)", value: -74.53, action: "Neutral" },
    { name: "Bull Bear Power", value: -11821.46, action: "Buy" },
  ])

  // Fetch price data when ticker changes
  useEffect(() => {
    if (ticker && ticker.length >= 1) {
      fetchPriceData()
    } else {
      setPriceData(null)
      setError(null)
    }
  }, [ticker])

  const fetchPriceData = async () => {
    if (!ticker) return

    setIsLoadingPrice(true)
    setError(null)

    try {
      const response = await fetch(`/api/ai/ticker-price?ticker=${encodeURIComponent(ticker)}`)
      if (!response.ok) throw new Error("Failed to fetch price data")

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || "Failed to fetch price data")
      }

      setPriceData(data)
    } catch (error) {
      console.error("Error fetching price data:", error)
      setPriceData(null)
      setError(`Could not find data for ticker "${ticker}". Please check the symbol and try again.`)

      toast({
        title: "Error fetching data",
        description: `Could not find data for ticker "${ticker}". Please check the symbol and try again.`,
        variant: "destructive",
      })
    } finally {
      setIsLoadingPrice(false)
    }
  }

  const analyzeTechnicalIndicators = async () => {
    if (!ticker || !priceData || !priceData.success) return

    setIsLoading(true)
    setError(null)

    try {
      // Scale the indicator values based on the current price
      const scaleFactor = priceData.price / 90000 // Assuming original values were for a ~90k asset

      const scaledMovingAverages = movingAverages.map((ma) => ({
        ...ma,
        value: Number.parseFloat((ma.value * scaleFactor).toFixed(2)),
      }))

      const scaledOscillators = oscillators.map((osc) => {
        // Don't scale percentage-based oscillators like RSI
        if (
          osc.name.includes("Relative Strength Index") ||
          osc.name.includes("Stochastic") ||
          osc.name.includes("Williams Percent Range")
        ) {
          return osc
        }
        return {
          ...osc,
          value: Number.parseFloat((osc.value * scaleFactor).toFixed(2)),
        }
      })

      // Combine indicators
      const indicators = {}
      scaledMovingAverages.forEach((ma) => {
        indicators[ma.name] = { value: ma.value, action: ma.action }
      })
      scaledOscillators.forEach((osc) => {
        indicators[osc.name] = { value: osc.value, action: osc.action }
      })

      const response = await fetch("/api/ai/technical-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticker,
          currentPrice: priceData.price,
          indicators,
        }),
      })

      if (!response.ok) throw new Error("Failed to analyze technical indicators")

      const data = await response.json()
      const responseText = data.analysis

      // Extract recommendation
      let recommendation = "Hold"
      if (
        responseText.toLowerCase().includes("recommend a buy") ||
        responseText.toLowerCase().includes("trading recommendation: buy") ||
        (responseText.toLowerCase().includes("recommend: buy") &&
          !responseText.toLowerCase().includes("hold") &&
          !responseText.toLowerCase().includes("sell"))
      ) {
        recommendation = "Buy"
      } else if (
        responseText.toLowerCase().includes("recommend a sell") ||
        responseText.toLowerCase().includes("trading recommendation: sell") ||
        (responseText.toLowerCase().includes("recommend: sell") &&
          !responseText.toLowerCase().includes("hold") &&
          !responseText.toLowerCase().includes("buy"))
      ) {
        recommendation = "Sell"
      } else if (
        responseText.toLowerCase().includes("recommend a hold") ||
        responseText.toLowerCase().includes("trading recommendation: hold") ||
        responseText.toLowerCase().includes("recommend: hold") ||
        responseText.toLowerCase().includes("recommend holding") ||
        responseText.toLowerCase().includes("would recommend a hold")
      ) {
        recommendation = "Hold"
      }

      // Also ensure we check for "Hold" in the first few lines of the response
      const firstFewLines = responseText.split("\n").slice(0, 10).join("\n").toLowerCase()
      if (firstFewLines.includes("recommend a hold") || firstFewLines.includes("trading recommendation: hold")) {
        recommendation = "Hold"
      }

      // Check if data contains an error
      if (data.error) {
        throw new Error(data.error)
      }

      setResult({
        ...data,
        recommendation: recommendation,
        indicators: {
          movingAverages: scaledMovingAverages,
          oscillators: scaledOscillators,
        },
        currentPrice: priceData.price,
        priceChange: priceData.change,
        priceChangePercent: priceData.changePercent,
      })

      toast({
        title: "Analysis Complete",
        description: `Successfully analyzed ${ticker}`,
      })
    } catch (error) {
      console.error("Error analyzing technical indicators:", error)
      setError("Failed to analyze technical indicators. Please try again later.")

      toast({
        title: "Analysis failed",
        description: "Failed to analyze technical indicators. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyAnalysis = () => {
    if (!result) return

    const analysisText = `
📊 ${result.ticker} Technical Analysis

🤖 Recommendation: ${result.recommendation} (${(result.confidence * 100).toFixed(1)}% confidence)
💰 Current Price: $${result.currentPrice.toFixed(2)} (${result.priceChangePercent >= 0 ? "+" : ""}${result.priceChangePercent.toFixed(2)}%)
🎯 Entry Price: $${result.entryPrice.toFixed(2)}
${
  result.recommendation === "Buy"
    ? `📈 Target Price: $${result.targetPrice.toFixed(2)}\n🛑 Stop Loss: $${result.stopLoss.toFixed(2)}`
    : `📉 Target Price: $${result.targetPrice.toFixed(2)}\n🛑 Stop Loss: $${result.stopLoss.toFixed(2)}`
}
📊 Expected Gain: ${result.expectedGain >= 0 ? "+" : ""}${result.expectedGain.toFixed(2)}%

${result.analysis ? `Analysis: ${result.analysis.substring(0, 300)}...` : ""}

Generated by Cyber Trader Pro Technical Analysis
${window.location.origin}
`

    navigator.clipboard.writeText(analysisText).then(
      () => {
        toast({
          title: "Analysis Copied",
          description: "Technical analysis has been copied to clipboard.",
        })
      },
      (err) => {
        console.error("Could not copy text: ", err)
        toast({
          title: "Copy Failed",
          description: "Failed to copy analysis to clipboard.",
          variant: "destructive",
        })
      },
    )
  }

  // Add a shareAnalysis function
  const shareAnalysis = () => {
    if (!result) return

    const analysisText = `
📊 ${result.ticker} Technical Analysis

🤖 Recommendation: ${result.recommendation} (${(result.confidence * 100).toFixed(1)}% confidence)
💰 Current Price: $${result.currentPrice.toFixed(2)} (${result.priceChangePercent >= 0 ? "+" : ""}${result.priceChangePercent.toFixed(2)}%)
🎯 Entry Price: $${result.entryPrice.toFixed(2)}
${
  result.recommendation === "Buy"
    ? `📈 Target Price: $${result.targetPrice.toFixed(2)}\n🛑 Stop Loss: $${result.stopLoss.toFixed(2)}`
    : `📉 Target Price: $${result.targetPrice.toFixed(2)}\n🛑 Stop Loss: $${result.stopLoss.toFixed(2)}`
}
📊 Expected Gain: ${result.expectedGain >= 0 ? "+" : ""}${result.expectedGain.toFixed(2)}%

${result.analysis ? `Analysis: ${result.analysis.substring(0, 300)}...` : ""}

Generated by Cyber Trader Pro Technical Analysis
${window.location.origin}
`

    if (navigator.share) {
      navigator
        .share({
          title: `${result.ticker} Technical Analysis by Cyber Trader Pro`,
          text: analysisText,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error))
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(analysisText).then(
        () => {
          toast({
            title: "Analysis Copied",
            description: "The analysis has been copied to your clipboard for sharing.",
          })
        },
        (err) => {
          console.error("Could not copy text: ", err)
        },
      )
    }
  }

  // Update the getRecommendationColor function to ensure consistent colors
  const getRecommendationColor = () => {
    if (!result) return ""
    switch (result.recommendation) {
      case "Buy":
        return "text-green-500"
      case "Sell":
        return "text-red-500"
      case "Hold":
        return "text-yellow-500"
      default:
        return "text-yellow-500"
    }
  }

  // Update the getRecommendationIcon function to ensure consistent icons
  const getRecommendationIcon = () => {
    if (!result) return null
    switch (result.recommendation) {
      case "Buy":
        return <TrendingUp className="h-8 w-8 text-green-500" />
      case "Sell":
        return <TrendingDown className="h-8 w-8 text-red-500" />
      case "Hold":
        return <Minus className="h-8 w-8 text-yellow-500" />
      default:
        return <Minus className="h-8 w-8 text-yellow-500" />
    }
  }

  // Helper function to get a suggestion for common index tickers
  const getTickerSuggestion = (ticker: string) => {
    const upperTicker = ticker.toUpperCase()
    if (upperTicker === "SP" || upperTicker === "S&P" || upperTicker === "S&P500") {
      return "Try using SPY for S&P 500 ETF or ^GSPC for S&P 500 Index"
    }
    if (upperTicker === "DOW" || upperTicker === "DJIA") {
      return "Try using DIA for Dow Jones ETF or ^DJI for Dow Jones Index"
    }
    if (upperTicker === "NASDAQ") {
      return "Try using QQQ for NASDAQ ETF or ^IXIC for NASDAQ Composite"
    }
    return null
  }

  return (
    <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
      <CardHeader>
        <CardTitle className="text-cyan-100 flex items-center">
          <Brain className="mr-2 h-6 w-6 text-cyan-400" />
          AI Technical Analysis
        </CardTitle>
        <CardDescription className="text-gray-300">
          Get AI-powered trade recommendations based on technical indicators
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-4">
          <div className="flex gap-4">
            <div className="space-y-2 flex-1">
              <Label htmlFor="ticker" className="text-gray-300">
                Ticker Symbol
              </Label>
              <div className="flex gap-2">
                <Input
                  id="ticker"
                  placeholder="e.g., AAPL, MSFT, SPY"
                  value={ticker}
                  onChange={(e) => setTicker(e.target.value.toUpperCase())}
                  className="bg-[rgba(10,14,23,0.5)] text-white border-cyan-500/20"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={fetchPriceData}
                  disabled={isLoadingPrice || !ticker}
                  className="border-cyan-500/20"
                >
                  {isLoadingPrice ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 p-4 rounded-md flex items-start gap-3 border border-red-500/40">
              <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-400 font-medium">Error</p>
                <p className="text-gray-300 text-sm">{error}</p>
                {getTickerSuggestion(ticker) && (
                  <p className="text-gray-300 text-sm mt-1">
                    <strong>Suggestion:</strong> {getTickerSuggestion(ticker)}
                  </p>
                )}
              </div>
            </div>
          )}

          {priceData && priceData.success && (
            <div className="bg-[rgba(10,14,23,0.5)] p-4 rounded-md border border-cyan-500/20">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-cyan-100">{ticker}</h3>
                  <p className="text-2xl font-bold text-white">${priceData.price.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <Badge
                    className={
                      priceData.changePercent >= 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                    }
                  >
                    {priceData.changePercent >= 0 ? "+" : ""}
                    {priceData.changePercent.toFixed(2)}%
                  </Badge>
                  <p className={priceData.change >= 0 ? "text-green-400" : "text-red-400"}>
                    {priceData.change >= 0 ? "+" : ""}${priceData.change.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4 text-sm">
                <div>
                  <p className="text-gray-400">High</p>
                  <p className="text-white">${priceData.high.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-400">Low</p>
                  <p className="text-white">${priceData.low.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-400">Volume</p>
                  <p className="text-white">{(priceData.volume / 1000000).toFixed(2)}M</p>
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={analyzeTechnicalIndicators}
            disabled={isLoading || !ticker || !priceData || !priceData.success}
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
                Analyze Technical Indicators
              </>
            )}
          </Button>
        </div>

        {result && (
          <div className="mt-6 space-y-6">
            <div className="flex items-center space-x-4 bg-[rgba(10,14,23,0.7)] p-4 rounded-md border border-cyan-500/20">
              {getRecommendationIcon()}
              <div>
                <h3 className="text-xl font-bold text-cyan-100">{result.ticker}</h3>
                <p className="text-gray-300">
                  Recommendation:{" "}
                  <span className={`font-bold ${getRecommendationColor()}`}>{result.recommendation}</span>
                </p>
                <p className="text-gray-300">
                  Confidence: <span className="font-bold">{(result.confidence * 100).toFixed(1)}%</span>
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <Button variant="ghost" size="sm" onClick={copyAnalysis} className="text-cyan-400 hover:text-cyan-300">
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
              <Button variant="ghost" size="sm" onClick={shareAnalysis} className="text-cyan-400 hover:text-cyan-300">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[rgba(10,14,23,0.5)] p-4 rounded-md flex flex-col items-center border border-cyan-500/10">
                <DollarSign className="h-6 w-6 text-cyan-400 mb-2" />
                <p className="text-gray-300 text-sm">Entry Price</p>
                <p className="text-xl font-bold text-cyan-100">${result.entryPrice.toFixed(2)}</p>
              </div>

              <div className="bg-[rgba(10,14,23,0.5)] p-4 rounded-md flex flex-col items-center border border-green-500/10">
                <Target className="h-6 w-6 text-green-500 mb-2" />
                <p className="text-gray-300 text-sm">Target Price</p>
                <p className="text-xl font-bold text-green-500">${result.targetPrice.toFixed(2)}</p>
              </div>

              <div className="bg-[rgba(10,14,23,0.5)] p-4 rounded-md flex flex-col items-center border border-red-500/10">
                <AlertTriangle className="h-6 w-6 text-red-500 mb-2" />
                <p className="text-gray-300 text-sm">Stop Loss</p>
                <p className="text-xl font-bold text-red-500">${result.stopLoss.toFixed(2)}</p>
              </div>
            </div>

            <div className="bg-[rgba(10,14,23,0.5)] p-4 rounded-md border border-cyan-500/10">
              <p className="text-gray-300 mb-2">Expected Gain/Loss:</p>
              <div className="flex items-center">
                <div className="w-full bg-gray-700 rounded-full h-3 mr-3">
                  <div
                    className={`${result.expectedGain >= 0 ? "bg-green-500" : "bg-red-500"} h-3 rounded-full`}
                    style={{ width: `${Math.min(Math.abs(result.expectedGain) * 2, 100)}%` }}
                  ></div>
                </div>
                <p className={`text-xl font-bold ${result.expectedGain >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {result.expectedGain >= 0 ? "+" : ""}
                  {result.expectedGain.toFixed(2)}%
                </p>
              </div>
            </div>

            <Tabs defaultValue="analysis">
              <TabsList className="bg-[rgba(10,14,23,0.7)] border-cyan-500/20">
                <TabsTrigger value="analysis" className="data-[state=active]:bg-cyan-500/20">
                  Analysis
                </TabsTrigger>
                <TabsTrigger value="indicators" className="data-[state=active]:bg-cyan-500/20">
                  Indicators
                </TabsTrigger>
              </TabsList>

              <TabsContent value="analysis">
                <div className="text-gray-300 text-sm bg-[rgba(10,14,23,0.5)] p-4 rounded-md border border-cyan-500/10">
                  <div className="flex items-center mb-2">
                    <Brain className="h-5 w-5 text-cyan-400 mr-2" />
                    <h3 className="text-cyan-100 font-medium">Together AI Analysis</h3>
                  </div>
                  {result.analysis ? (
                    result.analysis
                  ) : (
                    <div className="text-gray-400">
                      <p>
                        Unable to generate AI analysis at this time. Here's a summary based on the technical indicators:
                      </p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>
                          Current trend:{" "}
                          {result.recommendation === "Buy"
                            ? "Bullish"
                            : result.recommendation === "Sell"
                              ? "Bearish"
                              : "Neutral"}
                        </li>
                        <li>Confidence level: {(result.confidence * 100).toFixed(1)}%</li>
                        <li>Suggested entry: ${result.entryPrice.toFixed(2)}</li>
                        <li>Target price: ${result.targetPrice.toFixed(2)}</li>
                        <li>Stop loss: ${result.stopLoss.toFixed(2)}</li>
                        <li>
                          Expected change: {result.expectedGain > 0 ? "+" : ""}
                          {result.expectedGain.toFixed(2)}%
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex justify-center space-x-2">
                  <Button variant="outline" size="sm" onClick={copyAnalysis}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Analysis
                  </Button>
                  <Link href={`/pro-predictor?tab=predictor&ticker=${ticker}`}>
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                      <BarChart2 className="mr-2 h-4 w-4" />
                      Analyze in Pro Predictor
                    </Button>
                  </Link>
                </div>
              </TabsContent>

              <TabsContent value="indicators">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-cyan-100 font-bold mb-2 flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-cyan-400" />
                      Moving Averages
                    </h4>
                    <div className="bg-[rgba(10,14,23,0.5)] p-4 rounded-md max-h-60 overflow-y-auto border border-cyan-500/10">
                      <table className="w-full text-sm text-gray-300">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="text-left py-2">Indicator</th>
                            <th className="text-right py-2">Value</th>
                            <th className="text-right py-2">Signal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.indicators.movingAverages.map((ma, index) => (
                            <tr key={index} className="border-b border-gray-800">
                              <td className="py-2">{ma.name}</td>
                              <td className="text-right py-2">{ma.value.toLocaleString()}</td>
                              <td
                                className={`text-right py-2 ${
                                  ma.action === "Buy"
                                    ? "text-green-500"
                                    : ma.action === "Sell"
                                      ? "text-red-500"
                                      : "text-yellow-500"
                                }`}
                              >
                                {ma.action}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-cyan-100 font-bold mb-2 flex items-center">
                      <BarChart2 className="h-5 w-5 mr-2 text-cyan-400" />
                      Oscillators
                    </h4>
                    <div className="bg-[rgba(10,14,23,0.5)] p-4 rounded-md max-h-60 overflow-y-auto border border-cyan-500/10">
                      <table className="w-full text-sm text-gray-300">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="text-left py-2">Indicator</th>
                            <th className="text-right py-2">Value</th>
                            <th className="text-right py-2">Signal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.indicators.oscillators.map((osc, index) => (
                            <tr key={index} className="border-b border-gray-800">
                              <td className="py-2">{osc.name}</td>
                              <td className="text-right py-2">{osc.value.toLocaleString()}</td>
                              <td
                                className={`text-right py-2 ${
                                  osc.action === "Buy"
                                    ? "text-green-500"
                                    : osc.action === "Sell"
                                      ? "text-red-500"
                                      : "text-yellow-500"
                                }`}
                              >
                                {osc.action}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex justify-center mt-6">
                    <Link href={`/pro-predictor?tab=predictor&ticker=${ticker}`}>
                      <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                        <Save className="mr-2 h-4 w-4" />
                        Save & Analyze in Pro Predictor
                      </Button>
                    </Link>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
