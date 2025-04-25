import { NextResponse } from "next/server"
import { togetherAIService } from "@/lib/together-ai-service"

// Mock function to generate realistic looking prediction data
function generateMockPredictions(ticker: string, currentPrice: number, direction: "up" | "down" | "neutral") {
  const volatility = Math.random() * 5 + 1 // 1-6% volatility
  const confidence = Math.random() * 0.3 + 0.6 // 60-90% confidence

  // Calculate price movements based on direction and volatility
  const changePercent =
    direction === "up"
      ? Math.random() * volatility
      : direction === "down"
        ? -Math.random() * volatility
        : (Math.random() - 0.5) * volatility * 0.5

  const predictedPrice = currentPrice * (1 + changePercent / 100)
  const nextDayChange =
    direction === "up" ? Math.random() * 1.5 : direction === "down" ? -Math.random() * 1.5 : (Math.random() - 0.5) * 0.8
  const fiveDayChange =
    direction === "up" ? nextDayChange * 2.5 : direction === "down" ? nextDayChange * 2.5 : nextDayChange * 1.2
  const nextDayPrice = currentPrice * (1 + nextDayChange / 100)
  const fiveDayPrice = currentPrice * (1 + fiveDayChange / 100)

  // Support and resistance levels
  const supportLevels = [
    currentPrice * (1 - (Math.random() * 2 + 3) / 100),
    currentPrice * (1 - (Math.random() * 2 + 5) / 100),
  ]

  const resistanceLevels = [
    currentPrice * (1 + (Math.random() * 2 + 3) / 100),
    currentPrice * (1 + (Math.random() * 2 + 5) / 100),
  ]

  return {
    predictedPrice,
    predictedDirection: direction,
    confidence,
    nextDayPrediction: nextDayPrice,
    fiveDayPrediction: fiveDayPrice,
    supportLevels,
    resistanceLevels,
    volatilityPrediction: volatility,
  }
}

// Mock data for multi-timeframe predictions
function generateMultiTimeframePredictions(ticker: string, currentPrice: number, direction: "up" | "down" | "neutral") {
  return {
    "1d": generateMockPredictions(ticker, currentPrice, direction),
    "5d": generateMockPredictions(ticker, currentPrice, direction),
    "1mo": generateMockPredictions(ticker, currentPrice, direction),
    "3mo": generateMockPredictions(ticker, currentPrice, direction),
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const ticker = searchParams.get("ticker")
  const modelType = (searchParams.get("model") as any) || "ensemble"

  if (!ticker) {
    return NextResponse.json({ error: "Ticker parameter is required" }, { status: 400 })
  }

  try {
    // Try to get current price data
    let currentPrice = 100 // Default fallback price
    let direction: "up" | "down" | "neutral" = "neutral"

    try {
      const priceData = await togetherAIService.fetchTickerPrice(ticker)
      if (priceData.success) {
        currentPrice = priceData.price
      }
    } catch (priceError) {
      console.error("Error fetching price data:", priceError)
      // Continue with default price
    }

    // Try to get sentiment analysis, but handle rate limit errors
    let sentiment = {
      sentiment: "neutral",
      confidence: 0.5,
      analysis: "No sentiment analysis available due to API limitations.",
    }

    try {
      // Get sentiment analysis for the ticker (using real API)
      sentiment = await togetherAIService.analyzeMarketSentiment(ticker)
      // Determine direction based on sentiment
      direction = sentiment.sentiment === "bullish" ? "up" : sentiment.sentiment === "bearish" ? "down" : "neutral"
    } catch (sentimentError) {
      console.error("Error with sentiment analysis, using fallback:", sentimentError)

      // Check if it's a rate limit error
      if (sentimentError.message && sentimentError.message.includes("429")) {
        // Return a specific error for rate limiting that the client can handle
        return NextResponse.json(
          {
            error: "API rate limit exceeded. Please try again later.",
            rateLimit: true,
            // Include fallback data so the UI can still function
            predictions: generateMockPredictions(ticker, currentPrice, getRandomDirection()),
            sentimentAnalysis: sentiment,
            multiTimeframePredictions: generateMultiTimeframePredictions(ticker, currentPrice, getRandomDirection()),
          },
          { status: 429 },
        )
      }

      // For other errors, continue with fallback data
      direction = getRandomDirection()
    }

    // Generate mock predictions
    const predictions = generateMockPredictions(ticker, currentPrice, direction)

    // Add a slight bias for sentiment-enhanced predictions
    const sentimentBias = sentiment.sentiment === "bullish" ? 1.02 : sentiment.sentiment === "bearish" ? 0.98 : 1
    const sentimentEnhancedPredictions = {
      ...predictions,
      predictedPrice: predictions.predictedPrice * sentimentBias,
      confidence: Math.min(predictions.confidence + sentiment.confidence * 0.1, 0.98),
    }

    // Generate multi-timeframe predictions
    const multiTimeframePredictions = generateMultiTimeframePredictions(ticker, currentPrice, direction)

    return NextResponse.json({
      ticker,
      modelType,
      predictions,
      sentimentAnalysis: sentiment,
      sentimentEnhancedPredictions,
      multiTimeframePredictions,
    })
  } catch (error) {
    console.error("Error in advanced prediction:", error)

    // Provide fallback data even on error
    const fallbackDirection = getRandomDirection()
    return NextResponse.json({
      ticker,
      modelType,
      error: "Failed to generate advanced prediction, using fallback data.",
      predictions: generateMockPredictions(ticker, 100, fallbackDirection),
      sentimentAnalysis: {
        sentiment: fallbackDirection === "up" ? "bullish" : fallbackDirection === "down" ? "bearish" : "neutral",
        confidence: 0.5,
        analysis: "Fallback analysis due to API error.",
      },
      multiTimeframePredictions: generateMultiTimeframePredictions(ticker, 100, fallbackDirection),
    })
  }
}

// Helper function to get a random direction
function getRandomDirection(): "up" | "down" | "neutral" {
  const rand = Math.random()
  return rand < 0.4 ? "up" : rand < 0.7 ? "down" : "neutral"
}
