"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Loader2, Brain, TrendingUp, TrendingDown, Minus, AlertCircle, Copy, Share2, Save } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { CombinedModelAnalysis } from "./CombinedModelAnalysis"

type PredictionResult = {
  ticker: string
  modelType: string
  predictedPrice: number
  predictedDirection: "up" | "down" | "neutral"
  confidence: number
  nextDayPrediction: number
  fiveDayPrediction: number
  supportLevels: number[]
  resistanceLevels: number[]
  volatilityPrediction: number
  sentimentAnalysis?: {
    sentiment: string
    confidence: number
    analysis: string
  }
}

export function AdvancedPredictions() {
  const [ticker, setTicker] = useState("")
  const [modelType, setModelType] = useState<string>("ensemble")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const runPrediction = async () => {
    if (!ticker) {
      setError("Please enter a ticker symbol")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `/api/ai/advanced-prediction?ticker=${encodeURIComponent(ticker)}&model=${modelType}`,
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch prediction: ${response.statusText}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setResult({
        ticker,
        modelType,
        predictedPrice: data.predictions.predictedPrice,
        predictedDirection: data.predictions.predictedDirection,
        confidence: data.predictions.confidence,
        nextDayPrediction: data.predictions.nextDayPrediction,
        fiveDayPrediction: data.predictions.fiveDayPrediction,
        supportLevels: data.predictions.supportLevels,
        resistanceLevels: data.predictions.resistanceLevels,
        volatilityPrediction: data.predictions.volatilityPrediction,
        sentimentAnalysis: data.sentimentAnalysis,
      })

      toast({
        title: "Analysis Complete",
        description: `${modelType.toUpperCase()} model analysis completed for ${ticker}`,
      })
    } catch (error) {
      console.error("Error running prediction:", error)
      setError(`Failed to analyze ${ticker}. Please try again.`)
    } finally {
      setIsLoading(false)
    }
  }

  const getSignalIcon = () => {
    if (!result) return null
    switch (result.predictedDirection) {
      case "up":
        return <TrendingUp className="h-8 w-8 text-green-500" />
      case "down":
        return <TrendingDown className="h-8 w-8 text-red-500" />
      default:
        return <Minus className="h-8 w-8 text-yellow-500" />
    }
  }

  const getSignalColor = () => {
    if (!result) return ""
    switch (result.predictedDirection) {
      case "up":
        return "text-green-500"
      case "down":
        return "text-red-500"
      default:
        return "text-yellow-500"
    }
  }

  const savePrediction = () => {
    if (!result) return

    // Create a prediction object to save
    const predictionToSave = {
      id: `${result.ticker}-${result.modelType}-${Date.now()}`,
      ticker: result.ticker,
      strategy: "Advanced AI",
      lastClose: result.predictedPrice,
      signal: result.predictedDirection === "up" ? "Buy" : result.predictedDirection === "down" ? "Sell" : "Hold",
      takeProfit: result.predictedDirection === "up" ? result.resistanceLevels[0] : result.supportLevels[0],
      stopLoss: result.predictedDirection === "up" ? result.supportLevels[0] : result.resistanceLevels[0],
      timestamp: Date.now(),
      isAdvancedPrediction: true,
      advancedModel: result.modelType.toUpperCase(),
      aiRecommendation:
        result.predictedDirection === "up" ? "Buy" : result.predictedDirection === "down" ? "Sell" : "Hold",
      aiConfidence: result.confidence,
      nextDayPrediction: result.nextDayPrediction,
      fiveDayPrediction: result.fiveDayPrediction,
      supportLevels: result.supportLevels,
      resistanceLevels: result.resistanceLevels,
      volatilityPrediction: result.volatilityPrediction,
      expectedGain:
        result.predictedDirection === "up"
          ? ((result.resistanceLevels[0] - result.predictedPrice) / result.predictedPrice) * 100
          : ((result.predictedPrice - result.supportLevels[0]) / result.predictedPrice) * 100,
      sentimentAnalysis: result.sentimentAnalysis,
    }

    // Save to localStorage
    const key = "shortTermPredictions" // You could add an option to choose short/long term
    const savedResults = JSON.parse(localStorage.getItem(key) || "[]")
    savedResults.push(predictionToSave)
    localStorage.setItem(key, JSON.stringify(savedResults))

    toast({
      title: "Prediction Saved",
      description: `${result.modelType.toUpperCase()} model prediction has been saved successfully.`,
      action: (
        <Button variant="outline" size="sm" onClick={() => (window.location.href = "/dashboard?tab=predictions")}>
          View
        </Button>
      ),
    })
  }

  const copyPrediction = () => {
    if (!result) return

    const text = `
📊 Advanced AI Prediction for ${result.ticker}

🤖 Model: ${result.modelType.toUpperCase()}
${
  result.predictedDirection === "up"
    ? "📈 Signal: BUY (Bullish)"
    : result.predictedDirection === "down"
      ? "📉 Signal: SELL (Bearish)"
      : "➡️ Signal: HOLD (Neutral)"
}
💰 Predicted Price: $${result.predictedPrice.toFixed(2)}
🎯 Confidence: ${(result.confidence * 100).toFixed(1)}%

⏱️ Time Predictions:
• Next Day: $${result.nextDayPrediction.toFixed(2)}
• 5 Days: $${result.fiveDayPrediction.toFixed(2)}

📊 Technical Levels:
• Support: ${result.supportLevels.map((level) => "$" + level.toFixed(2)).join(", ")}
• Resistance: ${result.resistanceLevels.map((level) => "$" + level.toFixed(2)).join(", ")}

📈 Volatility: ${result.volatilityPrediction.toFixed(2)}%

${result.sentimentAnalysis ? `📰 Sentiment: ${result.sentimentAnalysis.sentiment} (${(result.sentimentAnalysis.confidence * 100).toFixed(1)}% confidence)` : ""}

Generated by Cyber Trader Pro Advanced AI
${window.location.origin}
    `

    navigator.clipboard.writeText(text).then(
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

  const sharePrediction = () => {
    if (!result) return

    const text = `
📊 Advanced AI Prediction for ${result.ticker}

🤖 Model: ${result.modelType.toUpperCase()}
${
  result.predictedDirection === "up"
    ? "📈 Signal: BUY (Bullish)"
    : result.predictedDirection === "down"
      ? "📉 Signal: SELL (Bearish)"
      : "➡️ Signal: HOLD (Neutral)"
}
💰 Predicted Price: $${result.predictedPrice.toFixed(2)}
🎯 Confidence: ${(result.confidence * 100).toFixed(1)}%

⏱️ Time Predictions:
• Next Day: $${result.nextDayPrediction.toFixed(2)}
• 5 Days: $${result.fiveDayPrediction.toFixed(2)}

📊 Technical Levels:
• Support: ${result.supportLevels.map((level) => "$" + level.toFixed(2)).join(", ")}
• Resistance: ${result.resistanceLevels.map((level) => "$" + level.toFixed(2)).join(", ")}

Generated by Cyber Trader Pro Advanced AI
${window.location.origin}
    `

    if (navigator.share) {
      navigator
        .share({
          title: `${result.ticker} AI Analysis by Cyber Trader Pro`,
          text: text,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error))
    } else {
      navigator.clipboard.writeText(text).then(
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

  return (
    <div className="space-y-8">
      <CombinedModelAnalysis />

      <Card className="bg-[rgba(26,31,45,0.8)] border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-purple-100 flex items-center">
            <Brain className="mr-2 h-6 w-6 text-purple-400" />
            Advanced AI Model Prediction
          </CardTitle>
          <CardDescription className="text-gray-300">
            Use Fortune 500 grade machine learning models to predict market movements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="model-type" className="text-gray-300">
                Select AI Model
              </Label>
              <Select value={modelType} onValueChange={setModelType}>
                <SelectTrigger id="model-type" className="bg-[rgba(10,14,23,0.5)] text-white border-purple-500/20">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lstm">LSTM (Long Short-Term Memory)</SelectItem>
                  <SelectItem value="gru">GRU (Gated Recurrent Unit)</SelectItem>
                  <SelectItem value="ensemble">Ensemble (Combined Models)</SelectItem>
                  <SelectItem value="statistical">Statistical (ARIMA, etc.)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ticker" className="text-gray-300">
                Ticker Symbol
              </Label>
              <div className="flex gap-2">
                <Input
                  id="ticker"
                  placeholder="e.g., AAPL, MSFT, BTC-USD"
                  value={ticker}
                  onChange={(e) => setTicker(e.target.value.toUpperCase())}
                  className="bg-[rgba(10,14,23,0.5)] text-white border-purple-500/20"
                />
                <Button
                  onClick={runPrediction}
                  disabled={isLoading || !ticker}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Run Prediction
                    </>
                  )}
                </Button>
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

            {result && (
              <div className="mt-6 space-y-6">
                <div className="flex items-center space-x-4 bg-[rgba(10,14,23,0.7)] p-4 rounded-md border border-purple-500/20">
                  {getSignalIcon()}
                  <div>
                    <h3 className="text-xl font-bold text-purple-100">{result.ticker}</h3>
                    <p className="text-gray-300">
                      Model: <span className="font-bold text-purple-400">{result.modelType.toUpperCase()}</span>
                    </p>
                    <p className="text-gray-300">
                      Signal:{" "}
                      <span className={`font-bold ${getSignalColor()}`}>{result.predictedDirection.toUpperCase()}</span>
                    </p>
                    <p className="text-gray-300">
                      Confidence: <span className="font-bold">{(result.confidence * 100).toFixed(1)}%</span>
                    </p>
                  </div>
                </div>

                <Tabs defaultValue="predictions">
                  <TabsList className="bg-[rgba(10,14,23,0.7)] border-purple-500/20">
                    <TabsTrigger value="predictions" className="data-[state=active]:bg-purple-500/20">
                      Predictions
                    </TabsTrigger>
                    <TabsTrigger value="technical" className="data-[state=active]:bg-purple-500/20">
                      Technical Levels
                    </TabsTrigger>
                    {result.sentimentAnalysis && (
                      <TabsTrigger value="sentiment" className="data-[state=active]:bg-purple-500/20">
                        Sentiment
                      </TabsTrigger>
                    )}
                  </TabsList>

                  <TabsContent value="predictions">
                    <div className="bg-[rgba(10,14,23,0.5)] p-4 rounded-md border border-purple-500/10">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col items-center p-3 bg-[rgba(10,14,23,0.7)] rounded-md">
                          <p className="text-gray-400 text-sm">Current</p>
                          <p className="text-xl font-bold text-purple-100">${result.predictedPrice.toFixed(2)}</p>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-[rgba(10,14,23,0.7)] rounded-md">
                          <p className="text-gray-400 text-sm">Next Day</p>
                          <p className="text-xl font-bold text-purple-100">${result.nextDayPrediction.toFixed(2)}</p>
                          <Badge
                            className={
                              result.nextDayPrediction > result.predictedPrice
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            }
                          >
                            {result.nextDayPrediction > result.predictedPrice ? "+" : ""}
                            {(
                              ((result.nextDayPrediction - result.predictedPrice) / result.predictedPrice) *
                              100
                            ).toFixed(2)}
                            %
                          </Badge>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-[rgba(10,14,23,0.7)] rounded-md">
                          <p className="text-gray-400 text-sm">5 Days</p>
                          <p className="text-xl font-bold text-purple-100">${result.fiveDayPrediction.toFixed(2)}</p>
                          <Badge
                            className={
                              result.fiveDayPrediction > result.predictedPrice
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            }
                          >
                            {result.fiveDayPrediction > result.predictedPrice ? "+" : ""}
                            {(
                              ((result.fiveDayPrediction - result.predictedPrice) / result.predictedPrice) *
                              100
                            ).toFixed(2)}
                            %
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-gray-300 text-sm">
                          <span className="text-purple-400 font-medium">Volatility Prediction:</span>{" "}
                          {result.volatilityPrediction.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="technical">
                    <div className="bg-[rgba(10,14,23,0.5)] p-4 rounded-md border border-purple-500/10">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-purple-100 font-medium mb-2">Support Levels</h4>
                          {result.supportLevels.map((level, index) => (
                            <div key={index} className="flex justify-between items-center mb-2 last:mb-0">
                              <span className="text-gray-400">S{index + 1}</span>
                              <span className="text-gray-300">${level.toFixed(2)}</span>
                              <Badge className="bg-red-500/20 text-red-400">
                                {(((level - result.predictedPrice) / result.predictedPrice) * 100).toFixed(2)}%
                              </Badge>
                            </div>
                          ))}
                        </div>
                        <div>
                          <h4 className="text-purple-100 font-medium mb-2">Resistance Levels</h4>
                          {result.resistanceLevels.map((level, index) => (
                            <div key={index} className="flex justify-between items-center mb-2 last:mb-0">
                              <span className="text-gray-400">R{index + 1}</span>
                              <span className="text-gray-300">${level.toFixed(2)}</span>
                              <Badge className="bg-green-500/20 text-green-400">
                                +{(((level - result.predictedPrice) / result.predictedPrice) * 100).toFixed(2)}%
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {result.sentimentAnalysis && (
                    <TabsContent value="sentiment">
                      <div className="bg-[rgba(10,14,23,0.5)] p-4 rounded-md border border-purple-500/10">
                        <div className="flex items-center mb-3">
                          <Badge
                            className={
                              result.sentimentAnalysis.sentiment === "bullish"
                                ? "bg-green-500/20 text-green-400"
                                : result.sentimentAnalysis.sentiment === "bearish"
                                  ? "bg-red-500/20 text-red-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                            }
                          >
                            {result.sentimentAnalysis.sentiment.toUpperCase()}
                          </Badge>
                          <span className="ml-2 text-gray-300">
                            Confidence: {(result.sentimentAnalysis.confidence * 100).toFixed(1)}%
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm">{result.sentimentAnalysis.analysis}</p>
                      </div>
                    </TabsContent>
                  )}
                </Tabs>

                <div className="flex justify-between">
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={copyPrediction} className="border-purple-500/20">
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={sharePrediction} className="border-purple-500/20">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                  <Button
                    onClick={savePrediction}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  >
                    <Save className="h-4 w-4 mr-1" />
                    Save Prediction
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
