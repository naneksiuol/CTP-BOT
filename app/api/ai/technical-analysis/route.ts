import { NextResponse } from "next/server"
import { togetherAIService } from "@/lib/together-ai-service"

export async function POST(request: Request) {
  try {
    const { ticker, currentPrice, indicators } = await request.json()

    if (!ticker || !currentPrice || !indicators) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    let result

    try {
      result = await togetherAIService.analyzeTechnicalIndicators(ticker, indicators, currentPrice)
    } catch (aiError) {
      console.error("AI service error in technical analysis:", aiError)

      // Create a fallback result using indicator statistics
      let buyCount = 0,
        sellCount = 0,
        neutralCount = 0
      Object.values(indicators).forEach((indicator: any) => {
        if (indicator.action === "Buy") buyCount++
        else if (indicator.action === "Sell") sellCount++
        else neutralCount++
      })

      const totalCount = Object.keys(indicators).length
      let recommendation = "Hold"
      let confidence = 0.5

      if (buyCount > sellCount && buyCount > neutralCount) {
        recommendation = "Buy"
        confidence = 0.5 + (buyCount / totalCount) * 0.5
      } else if (sellCount > buyCount && sellCount > neutralCount) {
        recommendation = "Sell"
        confidence = 0.5 + (sellCount / totalCount) * 0.5
      }

      const entryPrice = currentPrice
      let targetPrice, stopLoss

      if (recommendation === "Buy") {
        // For buy signals, target is above entry and stop loss is below
        targetPrice = currentPrice * 1.1 // 10% above entry
        stopLoss = currentPrice * 0.95 // 5% below entry
      } else if (recommendation === "Sell") {
        // For sell signals, target is below entry and stop loss is above
        targetPrice = currentPrice * 0.9 // 10% below entry
        stopLoss = currentPrice * 1.05 // 5% above entry
      } else {
        // For neutral signals, set reasonable defaults
        targetPrice = currentPrice * 1.05
        stopLoss = currentPrice * 0.95
      }

      const expectedGain =
        recommendation === "Buy"
          ? ((targetPrice - entryPrice) / entryPrice) * 100
          : ((entryPrice - targetPrice) / entryPrice) * 100

      // Create a more detailed reasoning with market analysis
      let reasoning = `Based on the technical indicators (${buyCount} bullish, ${sellCount} bearish, ${neutralCount} neutral), the recommendation is to ${recommendation.toLowerCase()} ${ticker} with a confidence of ${(confidence * 100).toFixed(1)}%. Target price: $${targetPrice.toFixed(2)}, Stop loss: $${stopLoss.toFixed(2)}, Expected gain: ${expectedGain.toFixed(2)}%.`

      // Make sure the first line of the analysis clearly states the recommendation
      reasoning = `Trading Recommendation: ${recommendation}\n\n${reasoning}`

      result = {
        recommendation,
        confidence,
        entryPrice,
        targetPrice,
        stopLoss,
        expectedGain,
        analysis: reasoning,
      }
    }

    return NextResponse.json({
      ticker,
      ...result,
    })
  } catch (error) {
    console.error("Error in technical analysis:", error)
    return NextResponse.json({ error: "Failed to analyze technical indicators" }, { status: 500 })
  }
}
