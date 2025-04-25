"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  MinusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  Share2,
  Loader2,
  Brain,
  BarChart2,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Target,
  DollarSign,
  AlertCircle,
  Save,
  ChevronDown,
  ChevronUp,
  Info,
  Copy,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { MTFCBar } from "./MTFCBar"
import { togetherAIService } from "@/lib/together-ai-service"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

type AnalysisResult = {
  id: string
  ticker: string
  strategy: string
  weightedScore: number
  lastClose: number
  atr: number
  trend: string
  volumeCategory: string
  stopLoss: number
  takeProfit: number
  signal: string
  shortTermSignal: string
  longTermSignal: string
  error?: string
  timestamp: number
  isLoading?: boolean
  optionData?: {
    calls: any[]
    puts: any[]
  }
  aiRecommendation: string
  aiConfidence: number
  tradeSignals: { type: string; price: number; strength: number }[]
  entryPrice: number
  percentChange: number
  longTermPercentChange: number
  explanation: string
  recentPerformance: string
  marketConditionContext: string
  mtfc: Record<string, string>
  expectedGain: number
  targetPrice: number
  aiAnalysis: string
}

// Update the getSignalColor function to ensure consistent colors
const getSignalColor = (signal: string) => {
  if (signal.includes("Buy")) return "text-green-500"
  if (signal.includes("Sell")) return "text-red-500"
  return "text-yellow-500"
}

// Update the getSignalBgColor function for background colors
const getSignalBgColor = (signal: string) => {
  if (signal.includes("Buy")) return "bg-green-500/20"
  if (signal.includes("Sell")) return "bg-red-500/20"
  return "bg-yellow-500/20"
}

// Update the getSignalIcon function to ensure consistent icons
const getSignalIcon = (signal: string) => {
  if (signal.includes("Buy")) return <ArrowUpIcon className="w-4 h-4 mr-1 text-green-500" />
  if (signal.includes("Sell")) return <ArrowDownIcon className="w-4 h-4 mr-1 text-red-500" />
  return <MinusIcon className="w-4 h-4 mr-1 text-yellow-500" />
}

export default function TickerAnalysis() {
  const [tickers, setTickers] = useState("")
  const [results, setResults] = useState<AnalysisResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [strategyType, setStrategyType] = useState("short-term")
  const [aiInsights, setAiInsights] = useState<{
    sentiment: string
    confidence: number
    analysis: string
    recommendation: string
  } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({})

  const toggleCardExpansion = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const runAnalysis = async () => {
    setIsLoading(true)
    setError(null)
    const tickerList = tickers.split(",").map((t) => t.trim().toUpperCase())

    if (tickerList.length === 0 || tickerList[0] === "") {
      setError("Please enter at least one ticker symbol")
      setIsLoading(false)
      return
    }

    // Initialize results with loading state for each ticker
    setResults(
      tickerList.map((ticker) => ({
        id: `${ticker}-${Date.now()}`,
        ticker,
        isLoading: true,
      })),
    )

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tickers: tickerList, strategyType }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setResults((prevResults) =>
        prevResults.map((prevResult) => {
          const newResult = data.find((r: AnalysisResult) => r.ticker === prevResult.ticker)
          return newResult
            ? { ...newResult, id: `${newResult.ticker}-${Date.now()}`, timestamp: Date.now(), isLoading: false }
            : { ...prevResult, error: "Failed to analyze", isLoading: false }
        }),
      )

      if (data.length > 0 && !data[0].error) {
        fetchAIInsights(data[0].ticker)

        // Initialize expanded state for new results
        const newExpandedState = {}
        data.forEach((result: AnalysisResult) => {
          newExpandedState[`${result.ticker}-${Date.now()}`] = false
        })
        setExpandedCards((prev) => ({ ...prev, ...newExpandedState }))

        toast({
          title: "Analysis Complete",
          description: `Successfully analyzed ${data.length} ticker${data.length > 1 ? "s" : ""}`,
        })
      } else if (data.length > 0 && data[0].error) {
        setError(`Analysis failed: ${data[0].error}`)
      }
    } catch (error) {
      console.error("Error running analysis:", error)
      setError("Failed to run analysis. Please try again later.")
      setResults((prevResults) =>
        prevResults.map((result) => ({
          ...result,
          error: "Failed to analyze",
          isLoading: false,
        })),
      )
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAIInsights = async (ticker: string) => {
    try {
      const sentiment = await togetherAIService.analyzeMarketSentiment(ticker)
      const insights = await togetherAIService.generateTradingInsights(ticker)

      setAiInsights({
        sentiment: sentiment.sentiment,
        confidence: sentiment.confidence,
        analysis: insights.insights,
        recommendation: insights.strategy,
      })
    } catch (error) {
      console.error("Error fetching AI insights:", error)
    }
  }

  const saveResult = (result: AnalysisResult) => {
    const key = strategyType === "short-term" ? "shortTermPredictions" : "longTermPredictions"
    const savedResults = JSON.parse(localStorage.getItem(key) || "[]")

    // Create a more comprehensive prediction object
    const predictionToSave = {
      id: result.id,
      ticker: result.ticker,
      strategy: result.strategy,
      signal: result.signal,
      lastClose: result.lastClose,
      takeProfit: result.takeProfit,
      stopLoss: result.stopLoss,
      aiRecommendation: result.aiRecommendation,
      aiConfidence: result.aiConfidence,
      timestamp: Date.now(),
      expectedGain: result.expectedGain,
      marketCondition: result.marketCondition,
      volumeCategory: result.volumeCategory,
      trend: result.trend,
      entryPrice: result.entryPrice,
      percentChange: result.percentChange,
      longTermPercentChange: result.longTermPercentChange,
      mtfc: result.mtfc,
      weightedScore: result.weightedScore,
      optionData: result.optionData,
    }

    savedResults.push(predictionToSave)
    localStorage.setItem(key, JSON.stringify(savedResults))

    toast({
      title: "Prediction Saved",
      description: `${result.ticker} prediction has been saved to ${strategyType} predictions.`,
      action: (
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => copyResult(result)}>
            <Copy className="h-3 w-3 mr-1" />
            Copy
          </Button>
          <Button variant="outline" size="sm" onClick={() => (window.location.href = "/dashboard?tab=ml-dashboard")}>
            View
          </Button>
        </div>
      ),
    })
  }

  const shareResult = (result: AnalysisResult) => {
    const mtfcString = result.mtfc
      ? Object.entries(result.mtfc)
          .map(([tf, value]) => `${tf}: ${value}`)
          .join(", ")
      : "N/A"

    // Create a more comprehensive and formatted share text
    const shareText = `
📊 ${result.ticker} Analysis (${result.strategy})

📈 Signal: ${result.signal}
💰 Last Price: $${result.lastClose.toFixed(2)}
${
  result.signal.includes("Buy")
    ? `🎯 Target Price: $${result.takeProfit?.toFixed(2) ?? "N/A"}\n🛑 Stop Loss: $${result.stopLoss?.toFixed(2) ?? "N/A"}`
    : `📉 Target Price: $${result.takeProfit?.toFixed(2) ?? "N/A"}\n🛑 Stop Loss: $${result.stopLoss?.toFixed(2) ?? "N/A"}`
}
📊 Expected Gain: ${result.expectedGain ? `${result.expectedGain > 0 ? "+" : ""}${result.expectedGain.toFixed(2)}%` : "N/A"}

🤖 AI Recommendation: ${result.aiRecommendation} (${(result.aiConfidence * 100).toFixed(1)}% confidence)
📊 Short-Term Change: ${result.percentChange.toFixed(2)}%
📈 Long-Term Change: ${result.longTermPercentChange.toFixed(2)}%

🔍 Market Condition: ${result.marketConditionContext}
📊 MTFC: ${mtfcString}

Generated by Cyber Trader Pro
${window.location.origin}
`

    if (navigator.share) {
      navigator
        .share({
          title: `${result.ticker} Trading Analysis by Cyber Trader Pro`,
          text: shareText,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error))
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(shareText).then(
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

  const copyResult = (result: AnalysisResult) => {
    const mtfcString = result.mtfc
      ? Object.entries(result.mtfc)
          .map(([tf, value]) => `${tf}: ${value}`)
          .join(", ")
      : "N/A"

    // Create a more comprehensive and formatted share text
    const shareText = `
📊 ${result.ticker} Analysis (${result.strategy})

📈 Signal: ${result.signal}
💰 Last Price: $${result.lastClose.toFixed(2)}
${
  result.signal.includes("Buy")
    ? `🎯 Target Price: $${result.takeProfit?.toFixed(2) ?? "N/A"}\n🛑 Stop Loss: $${result.stopLoss?.toFixed(2) ?? "N/A"}`
    : `📉 Target Price: $${result.takeProfit?.toFixed(2) ?? "N/A"}\n🛑 Stop Loss: $${result.stopLoss?.toFixed(2) ?? "N/A"}`
}
📊 Expected Gain: ${result.expectedGain ? `${result.expectedGain > 0 ? "+" : ""}${result.expectedGain.toFixed(2)}%` : "N/A"}

🤖 AI Recommendation: ${result.aiRecommendation} (${(result.aiConfidence * 100).toFixed(1)}% confidence)
📊 Short-Term Change: ${result.percentChange.toFixed(2)}%
📈 Long-Term Change: ${result.longTermPercentChange.toFixed(2)}%

🔍 Market Condition: ${result.marketConditionContext}
📊 MTFC: ${mtfcString}

Generated by Cyber Trader Pro
${window.location.origin}
`

    navigator.clipboard.writeText(shareText).then(
      () => {
        toast({
          title: "Analysis Copied",
          description: "The analysis has been copied to your clipboard.",
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
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
        <CardHeader>
          <CardTitle className="flex items-center text-cyan-100">
            <Brain className="w-6 h-6 mr-2 text-cyan-400" />
            Together AI-Powered Analysis
          </CardTitle>
          <CardDescription className="text-gray-300">
            Enter ticker symbols and select a strategy to analyze with advanced AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <Input
              placeholder="Enter ticker symbols (e.g., AAPL, GOOGL, MSFT)"
              value={tickers}
              onChange={(e) => setTickers(e.target.value)}
              className="bg-[rgba(10,14,23,0.5)] text-white border-cyan-500/20"
            />
            <div className="flex space-x-4">
              <Select value={strategyType} onValueChange={setStrategyType}>
                <SelectTrigger className="w-[180px] bg-[rgba(10,14,23,0.5)] text-white border-cyan-500/20">
                  <SelectValue placeholder="Select strategy" />
                </SelectTrigger>
                <SelectContent className="bg-[rgba(26,31,45,0.95)] border-cyan-500/20 text-white">
                  <SelectItem value="short-term">Short-Term</SelectItem>
                  <SelectItem value="long-term">Long-Term</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={runAnalysis}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Run AI Analysis
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="bg-red-500/20 p-4 rounded-md border border-red-500/40">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-400 font-medium">Error</p>
              <p className="text-gray-300 text-sm">{error}</p>
              {tickers && getTickerSuggestion(tickers.split(",")[0]) && (
                <p className="text-gray-300 text-sm mt-1">
                  <strong>Suggestion:</strong> {getTickerSuggestion(tickers.split(",")[0])}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-6">
          {results.map((result) => (
            <Card
              key={result.id}
              className={`
                ${
                  result.signal && result.signal.includes("Buy")
                    ? "border-l-4 border-l-green-500"
                    : result.signal && result.signal.includes("Sell")
                      ? "border-l-4 border-l-red-500"
                      : "border-l-4 border-l-yellow-500"
                }
                bg-[rgba(26,31,45,0.8)] border-cyan-500/20 relative overflow-hidden
              `}
            >
              {/* Gradient overlay based on signal */}
              <div
                className={`absolute inset-0 opacity-10 ${
                  result.signal && result.signal.includes("Buy")
                    ? "bg-gradient-to-br from-green-500/30 to-transparent"
                    : result.signal && result.signal.includes("Sell")
                      ? "bg-gradient-to-br from-red-500/30 to-transparent"
                      : "bg-gradient-to-br from-yellow-500/30 to-transparent"
                }`}
              />

              <CardHeader className="relative z-10">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <CardTitle className="text-cyan-100 text-xl">{result.ticker}</CardTitle>
                    {!result.isLoading && !result.error && (
                      <Badge
                        className={`ml-3 ${
                          result.signal.includes("Buy")
                            ? "bg-green-500/20 text-green-500"
                            : result.signal.includes("Sell")
                              ? "bg-red-500/20 text-red-500"
                              : "bg-yellow-500/20 text-yellow-500"
                        }`}
                      >
                        {getSignalIcon(result.signal)}
                        {result.signal}
                      </Badge>
                    )}
                  </div>
                  {!result.isLoading && !result.error && (
                    <div className="flex space-x-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyResult(result)}
                              className="text-cyan-400 hover:text-cyan-300"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copy Analysis</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => shareResult(result)}
                              className="text-cyan-400 hover:text-cyan-300"
                            >
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Share Analysis</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => saveResult(result)}
                              className="text-cyan-400 hover:text-cyan-300"
                            >
                              <Save className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Save Prediction</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  )}
                </div>
                <CardDescription className="text-gray-300 flex items-center">
                  {result.strategy} Analysis
                  {result.aiConfidence && (
                    <Badge className="ml-2 bg-cyan-500/20 text-cyan-400">
                      AI Confidence: {(result.aiConfidence * 100).toFixed(0)}%
                    </Badge>
                  )}
                </CardDescription>

                {!result.isLoading && !result.error && (
                  <>
                    <h4 className="font-semibold text-sm mt-2 mb-1 text-gray-300">
                      {strategyType === "short-term" ? "Short-Term" : "Long-Term"} Trend Analysis
                    </h4>
                    <MTFCBar mtfc={result.mtfc} strategyType={strategyType as "short-term" | "long-term"} />
                  </>
                )}
              </CardHeader>

              <CardContent className="relative z-10">
                {result.isLoading ? (
                  <div className="flex items-center justify-center h-40">
                    <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
                    <span className="ml-2 text-cyan-100">Analyzing {result.ticker}...</span>
                  </div>
                ) : result.error ? (
                  <div className="flex items-center justify-center h-40 text-red-400">
                    <AlertCircle className="h-6 w-6 mr-2" />
                    <p>{result.error}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Price and Key Metrics Card */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-[rgba(10,14,23,0.7)] p-4 rounded-md flex flex-col items-center">
                        <DollarSign className="h-6 w-6 text-cyan-400 mb-2" />
                        <p className="text-gray-300 text-sm">Current Price</p>
                        <p className="text-xl font-bold text-cyan-100">${result.lastClose?.toFixed(2) ?? "N/A"}</p>
                        <p className={`text-sm ${result.percentChange >= 0 ? "text-green-400" : "text-red-400"}`}>
                          {result.percentChange >= 0 ? "+" : ""}
                          {result.percentChange?.toFixed(2)}%
                        </p>
                      </div>

                      <div className="bg-[rgba(10,14,23,0.7)] p-4 rounded-md flex flex-col items-center">
                        <Target className="h-6 w-6 text-green-500 mb-2" />
                        <p className="text-gray-300 text-sm">Target Price</p>
                        <p className="text-xl font-bold text-green-500">${result.takeProfit?.toFixed(2) ?? "N/A"}</p>
                        <p className="text-sm text-green-400">
                          +{(((result.takeProfit - result.lastClose) / result.lastClose) * 100).toFixed(2)}%
                        </p>
                      </div>

                      <div className="bg-[rgba(10,14,23,0.7)] p-4 rounded-md flex flex-col items-center">
                        <AlertTriangle className="h-6 w-6 text-red-500 mb-2" />
                        <p className="text-gray-300 text-sm">Stop Loss</p>
                        <p className="text-xl font-bold text-red-500">${result.stopLoss?.toFixed(2) ?? "N/A"}</p>
                        <p className="text-sm text-red-400">
                          {(((result.stopLoss - result.lastClose) / result.lastClose) * 100).toFixed(2)}%
                        </p>
                      </div>
                    </div>

                    {/* AI Recommendation Section */}
                    <div className="bg-[rgba(10,14,23,0.7)] p-4 rounded-md">
                      <div className="flex items-center mb-2">
                        <Brain className="h-5 w-5 text-cyan-400 mr-2" />
                        <h3 className="text-lg font-bold text-cyan-100">AI Recommendation</h3>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-full ${getSignalBgColor(result.aiRecommendation)}`}>
                          {result.aiRecommendation === "Buy" ? (
                            <TrendingUp className={`h-6 w-6 text-green-500`} />
                          ) : result.aiRecommendation === "Sell" ? (
                            <TrendingDown className={`h-6 w-6 text-red-500`} />
                          ) : (
                            <MinusIcon className={`h-6 w-6 text-yellow-500`} />
                          )}
                        </div>

                        <div>
                          <p className="text-gray-300">
                            Together AI recommends:{" "}
                            <span className={`font-bold ${getSignalColor(result.aiRecommendation)}`}>
                              {result.aiRecommendation}
                            </span>
                          </p>
                          <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                            <div
                              className={`${
                                result.aiRecommendation === "Buy"
                                  ? "bg-green-500"
                                  : result.aiRecommendation === "Sell"
                                    ? "bg-red-500"
                                    : "bg-yellow-500"
                              } h-2 rounded-full`}
                              style={{ width: `${result.aiConfidence * 100}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            Confidence: {(result.aiConfidence * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <Collapsible
                      open={expandedCards[result.id]}
                      onOpenChange={() => toggleCardExpansion(result.id)}
                      className="bg-[rgba(10,14,23,0.7)] rounded-md overflow-hidden"
                    >
                      <CollapsibleTrigger asChild>
                        <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-[rgba(10,14,23,0.9)]">
                          <h3 className="text-cyan-100 font-medium flex items-center">
                            <BarChart2 className="h-5 w-5 mr-2 text-cyan-400" />
                            Technical Analysis Details
                          </h3>
                          {expandedCards[result.id] ? (
                            <ChevronUp className="h-5 w-5 text-cyan-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-cyan-400" />
                          )}
                        </div>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <div className="px-4 pb-4">
                          <Tabs defaultValue="metrics" className="w-full">
                            <TabsList className="bg-[rgba(10,14,23,0.7)] border-cyan-500/20 mb-3">
                              <TabsTrigger value="metrics" className="data-[state=active]:bg-cyan-500/20">
                                Metrics
                              </TabsTrigger>
                              <TabsTrigger value="signals" className="data-[state=active]:bg-cyan-500/20">
                                Signals
                              </TabsTrigger>
                              {result.optionData && (
                                <TabsTrigger value="options" className="data-[state=active]:bg-cyan-500/20">
                                  Options
                                </TabsTrigger>
                              )}
                              <TabsTrigger value="analysis" className="data-[state=active]:bg-cyan-500/20">
                                AI Analysis
                              </TabsTrigger>
                            </TabsList>

                            <TabsContent value="metrics">
                              <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">ATR:</span>
                                  <span className="text-cyan-100">${result.atr?.toFixed(2) ?? "N/A"}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Trend:</span>
                                  <span className={result.trend === "Uptrend" ? "text-green-400" : "text-red-400"}>
                                    {result.trend ?? "N/A"}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Volume:</span>
                                  <span className="text-cyan-100">{result.volumeCategory ?? "N/A"}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Weighted Score:</span>
                                  <span className={result.weightedScore > 0 ? "text-green-400" : "text-red-400"}>
                                    {result.weightedScore?.toFixed(2) ?? "N/A"}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Entry Price:</span>
                                  <span className="text-cyan-100">${result.entryPrice?.toFixed(2) ?? "N/A"}</span>
                                </div>
                                <div className="flex flex-col">
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Expected Gain:</span>
                                    <span className={result.expectedGain >= 0 ? "text-green-400" : "text-red-400"}>
                                      {result.expectedGain >= 0 ? "+" : ""}
                                      {result.expectedGain?.toFixed(2)}%
                                    </span>
                                  </div>
                                  <div className="w-full bg-gray-700 rounded-full h-3 mt-1">
                                    <div
                                      className={`${result.expectedGain >= 0 ? "bg-green-500" : "bg-red-500"} h-3 rounded-full`}
                                      style={{ width: `${Math.min(Math.abs(result.expectedGain) * 2, 100)}%` }}
                                    ></div>
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Short-Term Change:</span>
                                  <span className={result.percentChange >= 0 ? "text-green-400" : "text-red-400"}>
                                    {result.percentChange >= 0 ? "+" : ""}
                                    {result.percentChange?.toFixed(2)}%
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Long-Term Change:</span>
                                  <span
                                    className={result.longTermPercentChange >= 0 ? "text-green-400" : "text-red-400"}
                                  >
                                    {result.longTermPercentChange >= 0 ? "+" : ""}
                                    {result.longTermPercentChange?.toFixed(2)}%
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Recent Performance:</span>
                                  <span className="text-cyan-100">{result.recentPerformance}</span>
                                </div>
                              </div>
                            </TabsContent>

                            <TabsContent value="signals">
                              <div className="space-y-3">
                                <div
                                  className={`flex justify-between items-center ${getSignalColor(result.shortTermSignal)}`}
                                >
                                  <span className="text-gray-400">Short-Term Signal:</span>
                                  <span className="flex items-center">
                                    {getSignalIcon(result.shortTermSignal)}
                                    {result.shortTermSignal}
                                  </span>
                                </div>
                                <div
                                  className={`flex justify-between items-center ${getSignalColor(result.longTermSignal)}`}
                                >
                                  <span className="text-gray-400">Long-Term Signal:</span>
                                  <span className="flex items-center">
                                    {getSignalIcon(result.longTermSignal)}
                                    {result.longTermSignal}
                                  </span>
                                </div>
                                <div className={`flex justify-between items-center ${getSignalColor(result.signal)}`}>
                                  <span className="text-gray-400">Combined Signal:</span>
                                  <span className="flex items-center">
                                    {getSignalIcon(result.signal)}
                                    {result.signal}
                                  </span>
                                </div>

                                <div className="mt-4">
                                  <h4 className="text-cyan-100 text-sm font-medium mb-2">Recent Trade Signals:</h4>
                                  <div className="bg-[rgba(10,14,23,0.5)] p-3 rounded-md">
                                    {result.tradeSignals?.slice(-2).map((signal, index) => (
                                      <div key={index} className="flex justify-between items-center mb-1 last:mb-0">
                                        <span className={signal.type === "buy" ? "text-green-400" : "text-red-400"}>
                                          {signal.type.charAt(0).toUpperCase() + signal.type.slice(1)} at $
                                          {signal.price.toFixed(2)}
                                        </span>
                                        <Badge className={signal.type === "buy" ? "bg-green-500/20" : "bg-red-500/20"}>
                                          Strength: {signal.strength.toFixed(2)}
                                        </Badge>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </TabsContent>

                            {result.optionData && (
                              <TabsContent value="options">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h5 className="font-semibold text-green-400 mb-2">Calls</h5>
                                    <div className="bg-[rgba(10,14,23,0.5)] p-3 rounded-md">
                                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                                        <span>Strike</span>
                                        <span>Price</span>
                                      </div>
                                      {result.optionData.calls.slice(0, 5).map((call, index) => (
                                        <div
                                          key={index}
                                          className="flex justify-between text-sm border-t border-gray-700 py-1"
                                        >
                                          <span className="text-cyan-100">${call.strike?.toFixed(2) ?? "N/A"}</span>
                                          <span className="text-green-400">${call.lastPrice?.toFixed(2) ?? "N/A"}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <h5 className="font-semibold text-red-400 mb-2">Puts</h5>
                                    <div className="bg-[rgba(10,14,23,0.5)] p-3 rounded-md">
                                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                                        <span>Strike</span>
                                        <span>Price</span>
                                      </div>
                                      {result.optionData.puts.slice(0, 5).map((put, index) => (
                                        <div
                                          key={index}
                                          className="flex justify-between text-sm border-t border-gray-700 py-1"
                                        >
                                          <span className="text-cyan-100">${put.strike?.toFixed(2) ?? "N/A"}</span>
                                          <span className="text-red-400">${put.lastPrice?.toFixed(2) ?? "N/A"}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </TabsContent>
                            )}

                            <TabsContent value="analysis">
                              <div className="space-y-3">
                                {result.aiAnalysis && (
                                  <div className="bg-[rgba(10,14,23,0.5)] p-3 rounded-md text-sm text-gray-300">
                                    <div className="flex items-center mb-2">
                                      <Brain className="h-4 w-4 text-cyan-400 mr-2" />
                                      <span className="text-cyan-100 font-medium">Together AI Analysis</span>
                                    </div>
                                    {result.aiAnalysis}
                                  </div>
                                )}

                                {result.explanation && (
                                  <div className="bg-[rgba(10,14,23,0.5)] p-3 rounded-md text-sm">
                                    <div className="flex items-center mb-2">
                                      <Info className="h-4 w-4 text-cyan-400 mr-2" />
                                      <span className="text-cyan-100 font-medium">Signal Explanation</span>
                                    </div>
                                    <p className="text-gray-300">{result.explanation}</p>
                                  </div>
                                )}

                                <div className="bg-[rgba(10,14,23,0.5)] p-3 rounded-md text-sm">
                                  <div className="flex items-center mb-2">
                                    <BarChart2 className="h-4 w-4 text-cyan-400 mr-2" />
                                    <span className="text-cyan-100 font-medium">Market Context</span>
                                  </div>
                                  <p className="text-gray-300">{result.marketConditionContext}</p>
                                </div>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* AI Insights Section */}
                    {aiInsights && tickers.split(",").map((t) => t.trim().toUpperCase())[0] === result.ticker && (
                      <div className="bg-[rgba(10,14,23,0.7)] p-4 rounded-md">
                        <div className="flex items-center mb-3">
                          <Brain className="h-5 w-5 text-cyan-400 mr-2" />
                          <h3 className="text-lg font-bold text-cyan-100">Together AI Insights</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-[rgba(10,14,23,0.5)] p-3 rounded-md">
                            <h4 className="text-cyan-100 font-medium mb-2 flex items-center">
                              <TrendingUp className="h-4 w-4 mr-2 text-cyan-400" />
                              Market Sentiment
                            </h4>
                            <div className="flex items-center mb-2">
                              <div
                                className={`w-3 h-3 rounded-full mr-2 ${
                                  aiInsights.sentiment === "bullish"
                                    ? "bg-green-500"
                                    : aiInsights.sentiment === "bearish"
                                      ? "bg-red-500"
                                      : "bg-yellow-500"
                                }`}
                              ></div>
                              <span
                                className={
                                  aiInsights.sentiment === "bullish"
                                    ? "text-green-500"
                                    : aiInsights.sentiment === "bearish"
                                      ? "text-red-500"
                                      : "text-yellow-500"
                                }
                              >
                                {aiInsights.sentiment.charAt(0).toUpperCase() + aiInsights.sentiment.slice(1)}
                              </span>
                              <span className="text-gray-400 text-sm ml-2">
                                ({(aiInsights.confidence * 100).toFixed(1)}% confidence)
                              </span>
                            </div>
                          </div>

                          <div className="bg-[rgba(10,14,23,0.5)] p-3 rounded-md">
                            <h4 className="text-cyan-100 font-medium mb-2 flex items-center">
                              <BarChart2 className="h-4 w-4 mr-2 text-cyan-400" />
                              Recommended Strategy
                            </h4>
                            <p className="text-cyan-400">
                              {aiInsights.recommendation.charAt(0).toUpperCase() + aiInsights.recommendation.slice(1)}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 bg-[rgba(10,14,23,0.5)] p-3 rounded-md text-sm text-gray-300 max-h-32 overflow-y-auto">
                          {aiInsights.analysis}
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={() => saveResult(result)}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Prediction to ML Dashboard
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
