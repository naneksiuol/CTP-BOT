// Simplified version of the service to avoid potential issues
export class TogetherAIService {
  private apiKey: string
  private baseUrl = "https://api.together.xyz/v1"

  constructor() {
    this.apiKey = process.env.CYBER_TRADER_PRO || ""
    if (!this.apiKey) {
      console.warn("Together AI API key not found. Please set the CYBER_TRADER_PRO environment variable.")
    }
  }

  async analyzeTechnicalIndicators(
    ticker: string,
    indicators: Record<string, { value: number; action: string }>,
    currentPrice: number,
    mtfc?: Record<string, string>,
  ): Promise<{
    recommendation: string
    confidence: number
    entryPrice: number
    targetPrice: number
    stopLoss: number
    expectedGain: number
    analysis: string
  }> {
    try {
      // Simplified implementation to avoid potential issues
      // Count buy and sell signals
      let buyCount = 0
      let sellCount = 0

      Object.values(indicators).forEach((indicator) => {
        if (indicator.action === "Buy") buyCount++
        if (indicator.action === "Sell") sellCount++
      })

      // Consider MTFC in logic
      if (mtfc) {
        let mtfcBullishCount = 0
        let mtfcBearishCount = 0

        // Count bullish and bearish signals in MTFC
        Object.values(mtfc).forEach((value) => {
          if (value === "bullish") mtfcBullishCount++
          if (value === "bearish") mtfcBearishCount++
        })

        const totalTimeframes = Object.keys(mtfc).length

        // Add MTFC influence to buy/sell counts
        if (mtfcBullishCount > mtfcBearishCount) {
          buyCount += Math.round((mtfcBullishCount / totalTimeframes) * 3) // Add up to 3 buy signals
        } else if (mtfcBearishCount > mtfcBullishCount) {
          sellCount += Math.round((mtfcBearishCount / totalTimeframes) * 3) // Add up to 3 sell signals
        }
      }

      // Determine recommendation based on indicator count
      let recommendation = "Hold"
      let confidence = 0.5

      if (buyCount > sellCount) {
        recommendation = "Buy"
        confidence = 0.5 + (buyCount - sellCount) / (Object.keys(indicators).length * 2)
      } else if (sellCount > buyCount) {
        recommendation = "Sell"
        confidence = 0.5 + (sellCount - buyCount) / (Object.keys(indicators).length * 2)
      }

      const entryPrice = currentPrice
      const targetPrice = recommendation === "Buy" ? currentPrice * 1.1 : currentPrice * 0.9
      const stopLoss = recommendation === "Buy" ? currentPrice * 0.95 : currentPrice * 1.05
      const expectedGain =
        recommendation === "Buy"
          ? ((targetPrice - entryPrice) / entryPrice) * 100
          : ((entryPrice - targetPrice) / entryPrice) * 100

      return {
        recommendation,
        confidence,
        entryPrice,
        targetPrice,
        stopLoss,
        expectedGain,
        analysis: `Technical analysis for ${ticker} suggests a ${recommendation.toLowerCase()} signal with ${(confidence * 100).toFixed(1)}% confidence.`,
      }
    } catch (error) {
      console.error("Error analyzing technical indicators:", error)

      // Return a fallback response
      return {
        recommendation: "Hold",
        confidence: 0.5,
        entryPrice: currentPrice,
        targetPrice: currentPrice * 1.05,
        stopLoss: currentPrice * 0.95,
        expectedGain: 5,
        analysis: `Unable to perform detailed analysis for ${ticker}. Using fallback recommendation.`,
      }
    }
  }

  // Other methods from the original service...
  async analyzeMarketSentiment(ticker: string): Promise<{ sentiment: string; confidence: number; analysis: string }> {
    // Simplified implementation
    return {
      sentiment: Math.random() > 0.5 ? "bullish" : "bearish",
      confidence: 0.5 + Math.random() * 0.3,
      analysis: `Market sentiment analysis for ${ticker}.`,
    }
  }

  async generateTradingInsights(ticker: string): Promise<{ strategy: string; timeframe: string; insights: string }> {
    // Simplified implementation
    return {
      strategy: "swing trading",
      timeframe: "medium-term",
      insights: `Trading insights for ${ticker}.`,
    }
  }

  async explainPattern(pattern: string): Promise<string> {
    // Simplified implementation
    return `Explanation of the ${pattern} pattern.`
  }

  async fetchTickerPrice(ticker: string): Promise<{
    price: number
    change: number
    changePercent: number
    high: number
    low: number
    volume: number
    success: boolean
  }> {
    try {
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?interval=1d&range=1d`
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        next: { revalidate: 60 },
      } as RequestInit)
      if (!res.ok) throw new Error(`Yahoo Finance error: ${res.status}`)
      const data = await res.json()
      const meta = data.chart.result[0].meta
      const price: number = meta.regularMarketPrice
      const prevClose: number = meta.previousClose || meta.chartPreviousClose || price
      const change = price - prevClose
      const changePercent = (change / prevClose) * 100
      return {
        price,
        change,
        changePercent,
        high: meta.regularMarketDayHigh || price,
        low: meta.regularMarketDayLow || price,
        volume: meta.regularMarketVolume || 0,
        success: true,
      }
    } catch (error) {
      console.error(`Failed to fetch price for ${ticker}:`, error)
      return {
        price: 0,
        change: 0,
        changePercent: 0,
        high: 0,
        low: 0,
        volume: 0,
        success: false,
      }
    }
  }

  async generateText(prompt: string, model = "mistralai/Mixtral-8x7B-Instruct-v0.1", maxRetries = 2): Promise<string> {
    return "Simplified text generation."
  }
}

export const togetherAIService = new TogetherAIService()
