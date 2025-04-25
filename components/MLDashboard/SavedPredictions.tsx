"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpIcon, ArrowDownIcon, MinusIcon, Share2, Trash2, ExternalLink, Copy, Brain } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  // Advanced prediction fields
  isAdvancedPrediction?: boolean
  advancedModel?: string
  supportLevels?: number[]
  resistanceLevels?: number[]
  volatilityPrediction?: number
  nextDayPrediction?: number
  fiveDayPrediction?: number
  sentimentAnalysis?: {
    sentiment: string
    confidence: number
    analysis: string
  }
  aiRecommendation?: string
  aiConfidence?: number
  entryPrice?: number
  expectedGain?: number
}

type SavedPredictionsProps = {
  strategyType: "short-term" | "long-term"
}

export function SavedMLPredictions() {
  const [savedResults, setSavedResults] = useState<AnalysisResult[]>([])
  const [activeTab, setActiveTab] = useState<"short-term" | "long-term">("short-term")
  const [viewMode, setViewMode] = useState<"all" | "standard" | "advanced">("all")

  useEffect(() => {
    loadPredictions()
  }, [activeTab, viewMode])

  const loadPredictions = () => {
    const key = activeTab === "short-term" ? "shortTermPredictions" : "longTermPredictions"
    try {
      const results = JSON.parse(localStorage.getItem(key) || "[]")

      // Filter based on view mode
      let filteredResults = results
      if (viewMode === "standard") {
        filteredResults = results.filter((result: AnalysisResult) => !result.isAdvancedPrediction)
      } else if (viewMode === "advanced") {
        filteredResults = results.filter((result: AnalysisResult) => result.isAdvancedPrediction)
      }

      // Sort by timestamp (newest first)
      filteredResults.sort((a: AnalysisResult, b: AnalysisResult) => b.timestamp - a.timestamp)

      setSavedResults(filteredResults)
    } catch (error) {
      console.error("Error loading saved predictions:", error)
      setSavedResults([])
    }
  }

  const deleteResult = (id: string) => {
    const key = activeTab === "short-term" ? "shortTermPredictions" : "longTermPredictions"
    const updatedResults = savedResults.filter((result) => result.id !== id)
    localStorage.setItem(key, JSON.stringify(updatedResults))
    setSavedResults(updatedResults)

    toast({
      title: "Prediction Deleted",
      description: "The saved prediction has been removed.",
    })
  }

  const copyPrediction = (prediction: AnalysisResult) => {
    const predictionText = generatePredictionText(prediction)

    navigator.clipboard.writeText(predictionText).then(
      () => {
        toast({
          title: "Copied to Clipboard",
          description: "Prediction details copied to clipboard.",
        })
      },
      (err) => {
        console.error("Could not copy text: ", err)
        toast({
          title: "Copy Failed",
          description: "Failed to copy prediction to clipboard.",
          variant: "destructive",
        })
      },
    )
  }

  const sharePrediction = (prediction: AnalysisResult) => {
    const shareText = generatePredictionText(prediction)

    if (navigator.share) {
      navigator
        .share({
          title: `${prediction.ticker} Trading Analysis by Cyber Trader Pro`,
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

  const generatePredictionText = (prediction: AnalysisResult): string => {
    // Check if it's an advanced prediction
    if (prediction.isAdvancedPrediction) {
      return `
📊 Advanced AI Prediction for ${prediction.ticker}

🤖 Model: ${prediction.advancedModel?.toUpperCase() || "AI"}
📈 Predicted Price: $${prediction.lastClose.toFixed(2)}
🔮 Direction: ${prediction.signal.includes("Buy") ? "📈 Up" : prediction.signal.includes("Sell") ? "📉 Down" : "➡️ Neutral"}
🎯 Confidence: ${(prediction.aiConfidence ? prediction.aiConfidence * 100 : 0).toFixed(1)}%

⏱️ Time Predictions:
  • Next Day: $${prediction.nextDayPrediction?.toFixed(2) || "N/A"}
  • 5 Days: $${prediction.fiveDayPrediction?.toFixed(2) || "N/A"}

📊 Technical Levels:
  • Support: ${prediction.supportLevels?.map((level) => "$" + level.toFixed(2)).join(", ") || "N/A"}
  • Resistance: ${prediction.resistanceLevels?.map((level) => "$" + level.toFixed(2)).join(", ") || "N/A"}

📰 Sentiment: ${prediction.sentimentAnalysis?.sentiment || "N/A"} (${(prediction.sentimentAnalysis?.confidence ? prediction.sentimentAnalysis.confidence * 100 : 0).toFixed(1)}% confidence)

Generated by Cyber Trader Pro Advanced AI
${window.location.origin}
`
    } else {
      // Standard prediction format
      return `
📊 ${prediction.ticker} Analysis (${prediction.strategy})

📈 Signal: ${prediction.signal}
💰 Last Price: $${prediction.lastClose.toFixed(2)}
${
  prediction.signal.includes("Buy")
    ? `🎯 Target Price: $${prediction.takeProfit?.toFixed(2) ?? "N/A"}
🛑 Stop Loss: $${prediction.stopLoss?.toFixed(2) ?? "N/A"}`
    : `📉 Target Price: $${prediction.takeProfit?.toFixed(2) ?? "N/A"}
🛑 Stop Loss: $${prediction.stopLoss?.toFixed(2) ?? "N/A"}`
}
📊 Expected Gain: ${prediction.expectedGain ? `${prediction.expectedGain > 0 ? "+" : ""}${prediction.expectedGain.toFixed(2)}%` : "N/A"}

🤖 AI Recommendation: ${prediction.aiRecommendation || "N/A"} (${(prediction.aiConfidence ? prediction.aiConfidence * 100 : 0).toFixed(1)}% confidence)

Generated by Cyber Trader Pro
${window.location.origin}
`
    }
  }

  const getSignalIcon = (signal: string) => {
    if (signal.includes("Buy")) return <ArrowUpIcon className="w-4 h-4 mr-1 text-green-500" />
    if (signal.includes("Sell")) return <ArrowDownIcon className="w-4 h-4 mr-1 text-red-500" />
    return <MinusIcon className="w-4 h-4 mr-1 text-yellow-500" />
  }

  const getSignalColor = (signal: string) => {
    if (signal.includes("Buy")) return "text-green-500"
    if (signal.includes("Sell")) return "text-red-500"
    return "text-yellow-500"
  }

  const getBadgeColor = (signal: string) => {
    if (signal.includes("Buy")) return "bg-green-500/20 text-green-400"
    if (signal.includes("Sell")) return "bg-red-500/20 text-red-400"
    return "bg-yellow-500/20 text-yellow-400"
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-cyan-100">Saved ML Predictions</h2>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === "short-term" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("short-term")}
            className={activeTab === "short-term" ? "bg-cyan-500/20 text-cyan-100" : ""}
          >
            Short-Term
          </Button>
          <Button
            variant={activeTab === "long-term" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("long-term")}
            className={activeTab === "long-term" ? "bg-cyan-500/20 text-cyan-100" : ""}
          >
            Long-Term
          </Button>
        </div>
      </div>

      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "all" | "standard" | "advanced")}>
        <TabsList className="bg-[rgba(10,14,23,0.7)] border-cyan-500/20">
          <TabsTrigger value="all" className="data-[state=active]:bg-cyan-500/20">
            All Predictions
          </TabsTrigger>
          <TabsTrigger value="standard" className="data-[state=active]:bg-cyan-500/20">
            Standard
          </TabsTrigger>
          <TabsTrigger value="advanced" className="data-[state=active]:bg-cyan-500/20">
            Advanced AI
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {savedResults.length === 0 ? (
        <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
          <CardContent className="p-6 text-center">
            <p className="text-gray-300 mb-4">No saved predictions found.</p>
            <Link href="/pro-predictor?tab=predictor">
              <Button>Create Predictions</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedResults.map((prediction) => (
            <Card
              key={prediction.id}
              className={`bg-[rgba(26,31,45,0.8)] border-cyan-500/20 ${prediction.isAdvancedPrediction ? "border-l-4 border-l-purple-500" : ""}`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-cyan-100 flex items-center">
                    {prediction.ticker}
                    {prediction.isAdvancedPrediction && (
                      <Badge className="ml-2 bg-purple-500/20 text-purple-300">AI</Badge>
                    )}
                  </CardTitle>
                  <Badge className={getBadgeColor(prediction.signal)}>
                    {getSignalIcon(prediction.signal)}
                    {prediction.signal}
                  </Badge>
                </div>
                <CardDescription>
                  {prediction.strategy} • {new Date(prediction.timestamp).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Last Price:</span>
                    <span className="font-medium">${prediction.lastClose.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target Price:</span>
                    <span className="font-medium text-green-400">${prediction.takeProfit?.toFixed(2) ?? "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Stop Loss:</span>
                    <span className="font-medium text-red-400">${prediction.stopLoss?.toFixed(2) ?? "N/A"}</span>
                  </div>
                  {prediction.expectedGain !== undefined && (
                    <div className="flex justify-between">
                      <span>Expected Gain:</span>
                      <span className={prediction.expectedGain > 0 ? "text-green-400" : "text-red-400"}>
                        {prediction.expectedGain > 0 ? "+" : ""}
                        {prediction.expectedGain.toFixed(2)}%
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>AI Recommendation:</span>
                    <span className={getSignalColor(prediction.aiRecommendation || "")}>
                      {prediction.aiRecommendation || "N/A"} (
                      {(prediction.aiConfidence ? prediction.aiConfidence * 100 : 0).toFixed(0)}%)
                    </span>
                  </div>

                  {prediction.isAdvancedPrediction && (
                    <div className="mt-3 pt-2 border-t border-gray-700">
                      <p className="font-medium mb-1 flex items-center">
                        <Brain className="h-4 w-4 mr-1 text-purple-400" />
                        <span className="text-purple-400">
                          Advanced AI Model: {prediction.advancedModel?.toUpperCase()}
                        </span>
                      </p>

                      {prediction.nextDayPrediction && (
                        <div className="flex justify-between">
                          <span>Next Day:</span>
                          <span className="font-medium">${prediction.nextDayPrediction.toFixed(2)}</span>
                        </div>
                      )}

                      {prediction.volatilityPrediction && (
                        <div className="flex justify-between">
                          <span>Volatility:</span>
                          <span className="font-medium">{prediction.volatilityPrediction.toFixed(2)}%</span>
                        </div>
                      )}

                      {prediction.sentimentAnalysis && (
                        <div className="flex justify-between">
                          <span>Sentiment:</span>
                          <span
                            className={
                              prediction.sentimentAnalysis.sentiment === "bullish"
                                ? "text-green-400"
                                : prediction.sentimentAnalysis.sentiment === "bearish"
                                  ? "text-red-400"
                                  : "text-yellow-400"
                            }
                          >
                            {prediction.sentimentAnalysis.sentiment}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {prediction.marketCondition && !prediction.isAdvancedPrediction && (
                    <div className="flex justify-between">
                      <span>Market Condition:</span>
                      <span>{prediction.marketCondition}</span>
                    </div>
                  )}

                  {prediction.optionData && (
                    <div className="mt-3 pt-2 border-t border-gray-700">
                      <p className="font-medium mb-1">Option Data</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="text-green-400 mb-1">Calls</p>
                          {prediction.optionData.calls.slice(0, 2).map((call, index) => (
                            <div key={index} className="flex justify-between">
                              <span>${call.strike?.toFixed(2)}</span>
                              <span>${call.lastPrice?.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                        <div>
                          <p className="text-red-400 mb-1">Puts</p>
                          {prediction.optionData.puts.slice(0, 2).map((put, index) => (
                            <div key={index} className="flex justify-between">
                              <span>${put.strike?.toFixed(2)}</span>
                              <span>${put.lastPrice?.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="ghost" size="sm" onClick={() => copyPrediction(prediction)}>
                      <Copy className="h-4 w-4 text-gray-400" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => sharePrediction(prediction)}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteResult(prediction.id)}>
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </Button>
                    <Link href={`/pro-predictor?tab=predictor&ticker=${prediction.ticker}`}>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4 text-cyan-400" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
