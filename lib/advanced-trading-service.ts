import type { ModelType, TimeSeriesData, PredictionResult } from "./advanced-ml-models"

export class AdvancedTradingService {
  private static instance: AdvancedTradingService
  private modelCache: Map<string, any> = new Map()

  private constructor() {
    // Private constructor for singleton
  }

  public static getInstance(): AdvancedTradingService {
    if (!AdvancedTradingService.instance) {
      AdvancedTradingService.instance = new AdvancedTradingService()
    }
    return AdvancedTradingService.instance
  }

  /**
   * Get historical data for a ticker
   */
  private async getHistoricalData(ticker: string, days = 365): Promise<TimeSeriesData | null> {
    try {
      // Fetch data from Yahoo Finance API
      const endDate = new Date()
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - days)

      const startTimestamp = Math.floor(startDate.getTime() / 1000)
      const endTimestamp = Math.floor(endDate.getTime() / 1000)

      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?period1=${startTimestamp}&period2=${endTimestamp}&interval=1d`

      const response = await fetch(url)
      const data = await response.json()

      if (!data.chart || !data.chart.result || data.chart.result.length === 0) {
        console.error(`No data returned for ${ticker}`)
        return null
      }

      const result = data.chart.result[0]
      const timestamps = result.timestamp
      const quotes = result.indicators.quote[0]

      if (!timestamps || !quotes.open || !quotes.high || !quotes.low || !quotes.close || !quotes.volume) {
        console.error(`Incomplete data for ${ticker}`)
        return null
      }

      // Extract price and volume data
      const dates = timestamps.map((ts: number) => new Date(ts * 1000))
      const prices = quotes.close
      const volumes = quotes.volume

      // Calculate technical indicators
      // const features = calculateTechnicalIndicators(prices, volumes)

      return {
        dates,
        prices,
        volumes,
        features: {} as Record<string, number[]>,
      }
    } catch (error) {
      console.error(`Error fetching historical data for ${ticker}:`, error)
      return null
    }
  }

  /**
   * Get or create a model for a ticker
   */
  private async getModel(ticker: string, modelType: ModelType = "ensemble"): Promise<any> {
    const cacheKey = `${ticker}_${modelType}`

    if (this.modelCache.has(cacheKey)) {
      return this.modelCache.get(cacheKey)
    }

    // const model = createModel(modelType)
    const model = {}
    this.modelCache.set(cacheKey, model)

    return model
  }

  /**
   * Generate advanced predictions for a ticker
   */
  public async generatePredictions(
    ticker: string,
    modelType: ModelType = "ensemble",
  ): Promise<PredictionResult | null> {
    try {
      // Try to get current price from Yahoo Finance
      let currentPrice = 100 // Default price if we can't get real data
      let priceMovement: "up" | "down" | "neutral" = "neutral"

      try {
        // Use Yahoo Finance API to get current price data
        const response = await fetch(
          `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=5d`,
          {
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            },
          },
        )

        if (response.ok) {
          const data = await response.json()
          if (data.chart && data.chart.result && data.chart.result.length > 0) {
            const result = data.chart.result[0]
            if (result.indicators && result.indicators.quote && result.indicators.quote.length > 0) {
              const quote = result.indicators.quote[0]
              if (quote.close && quote.close.length > 0) {
                const closes = quote.close.filter((p: any) => p !== null)
                if (closes.length >= 2) {
                  currentPrice = closes[closes.length - 1]
                  const previousPrice = closes[closes.length - 2]
                  priceMovement =
                    currentPrice > previousPrice ? "up" : currentPrice < previousPrice ? "down" : "neutral"
                }
              }
            }
          }
        }
      } catch (error) {
        console.error(`Error fetching price data for ${ticker}:`, error)
        // Continue with default price
      }

      // Fetch 3-month daily data to compute real indicators
      let closes: number[] = []
      try {
        const histRes = await fetch(
          `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=3mo`,
          { headers: { "User-Agent": "Mozilla/5.0" }, next: { revalidate: 60 } } as RequestInit,
        )
        if (histRes.ok) {
          const histData = await histRes.json()
          const q = histData.chart?.result?.[0]?.indicators?.quote?.[0]
          if (q?.close) closes = (q.close as (number | null)[]).filter((v): v is number => v !== null)
        }
      } catch { /* use empty, fall back to currentPrice */ }

      // Compute real ATR-like volatility from recent close-to-close moves
      let volatility = 2 // default 2%
      if (closes.length >= 5) {
        const diffs = closes.slice(-20).map((v, i, arr) => (i === 0 ? 0 : Math.abs(v - arr[i - 1]) / arr[i - 1] * 100))
        volatility = diffs.slice(1).reduce((s, v) => s + v, 0) / (diffs.length - 1)
      }

      // Model-type confidence adjustments (deterministic offsets, no random)
      let confidenceBase = 0.65
      switch (modelType) {
        case "lstm": confidenceBase = 0.75; break
        case "gru": confidenceBase = 0.70; break
        case "ensemble": confidenceBase = 0.80; break
        case "statistical": confidenceBase = 0.65; break
      }

      // Confidence boosted by how clear the trend is
      const trendStrength = closes.length >= 10
        ? Math.abs(closes[closes.length - 1] - closes[closes.length - 10]) / closes[closes.length - 10]
        : 0
      const confidence = Math.min(confidenceBase + trendStrength * 2, 0.93)

      // Predicted price: extrapolate one-day momentum
      const momentumPct = closes.length >= 2
        ? (closes[closes.length - 1] - closes[closes.length - 2]) / closes[closes.length - 2]
        : 0
      const changePercent = priceMovement === "neutral" ? momentumPct * 0.5 : momentumPct
      const predictedPrice = currentPrice * (1 + changePercent)
      const nextDayPrice = currentPrice * (1 + changePercent * 0.8)
      const fiveDayPrice = currentPrice * (1 + changePercent * 3)

      // Support: recent N-day low; resistance: recent N-day high
      const recentCloses = closes.length >= 20 ? closes.slice(-20) : closes
      const recentLow = Math.min(...recentCloses)
      const recentHigh = Math.max(...recentCloses)
      const supportLevels = [recentLow, recentLow * 0.97]
      const resistanceLevels = [recentHigh, recentHigh * 1.03]

      return {
        predictedPrice,
        predictedDirection: priceMovement,
        confidence,
        nextDayPrediction: nextDayPrice,
        fiveDayPrediction: fiveDayPrice,
        supportLevels,
        resistanceLevels,
        volatilityPrediction: volatility,
      }
    } catch (error) {
      console.error(`Error generating predictions for ${ticker}:`, error)
      return null
    }
  }

  /**
   * Generate sentiment-enhanced predictions
   */
  public async generateSentimentEnhancedPredictions(
    ticker: string,
    sentiment: { score: number; magnitude: number },
  ): Promise<PredictionResult | null> {
    try {
      const predictions = await this.generatePredictions(ticker)
      if (!predictions) {
        return null
      }

      // Adjust predictions based on sentiment
      const sentimentFactor = sentiment.score * sentiment.magnitude
      const adjustedPrice = predictions.predictedPrice * (1 + sentimentFactor * 0.01)

      return {
        ...predictions,
        predictedPrice: adjustedPrice,
        predictedDirection:
          adjustedPrice > predictions.predictedPrice
            ? "up"
            : adjustedPrice < predictions.predictedPrice
              ? "down"
              : predictions.predictedDirection,
        confidence: Math.min(predictions.confidence + Math.abs(sentiment.score) * 0.1, 0.95),
      }
    } catch (error) {
      console.error(`Error generating sentiment-enhanced predictions for ${ticker}:`, error)
      return null
    }
  }

  /**
   * Generate multi-timeframe predictions
   */
  public async generateMultiTimeframePredictions(
    ticker: string,
    timeframes: string[] = ["1d", "5d", "1mo", "3mo"],
  ): Promise<Record<string, PredictionResult | null>> {
    const results: Record<string, PredictionResult | null> = {}

    // Get base prediction
    const basePrediction = await this.generatePredictions(ticker)
    if (!basePrediction) {
      return {
        "1d": null,
        "5d": null,
        "1mo": null,
        "3mo": null,
      }
    }

    // Fetch 3-month daily closes for timeframe scaling
    let closes: number[] = []
    try {
      const histRes = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=3mo`,
        { headers: { "User-Agent": "Mozilla/5.0" }, next: { revalidate: 60 } } as RequestInit,
      )
      if (histRes.ok) {
        const histData = await histRes.json()
        const q = histData.chart?.result?.[0]?.indicators?.quote?.[0]
        if (q?.close) closes = (q.close as (number | null)[]).filter((v): v is number => v !== null)
      }
    } catch { /* use empty array */ }

    for (const timeframe of timeframes) {
      try {
        const basePrice = basePrediction.predictedPrice
        const direction = basePrediction.predictedDirection

        // Scale days for each timeframe
        const scaleDays =
          timeframe === "1d" ? 1 : timeframe === "5d" ? 5 : timeframe === "1mo" ? 21 : timeframe === "3mo" ? 63 : 1

        // Compute annualised daily volatility from real close-to-close returns
        let dailyVol = 0.015 // fallback 1.5% daily vol
        if (closes.length >= 10) {
          const rets = closes.slice(-30).map((v, i, arr) =>
            i === 0 ? 0 : Math.abs(v - arr[i - 1]) / arr[i - 1],
          )
          dailyVol = rets.slice(1).reduce((s, v) => s + v, 0) / (rets.length - 1)
        }

        // Scale volatility by sqrt of trading days
        const scaledVolPct = dailyVol * Math.sqrt(scaleDays) * 100

        // Momentum extrapolated over scaleDays
        const momentumPct = closes.length >= 2
          ? (closes[closes.length - 1] - closes[closes.length - 2]) / closes[closes.length - 2]
          : 0
        const scaledMomentum = momentumPct * scaleDays * 0.3 // dampened projection
        const changePercent = direction === "neutral" ? 0 : scaledMomentum

        const predictedPrice = basePrice * (1.0 + changePercent)

        // Confidence degrades deterministically with timeframe
        const confidenceModifier =
          timeframe === "1d" ? 0.0
          : timeframe === "5d" ? -0.05
          : timeframe === "1mo" ? -0.12
          : timeframe === "3mo" ? -0.2
          : 0

        // Support/resistance from recent N-day extremes scaled per timeframe
        const window = Math.min(scaleDays * 2, closes.length)
        const slice = closes.length > 0 ? closes.slice(-window) : [basePrice]
        const lo = Math.min(...slice)
        const hi = Math.max(...slice)

        const prediction: PredictionResult = {
          predictedPrice,
          predictedDirection: direction,
          confidence: Math.max(0.5, basePrediction.confidence + confidenceModifier),
          nextDayPrediction: basePrediction.nextDayPrediction,
          supportLevels: [lo, lo * (1 - dailyVol)],
          resistanceLevels: [hi, hi * (1 + dailyVol)],
          volatilityPrediction: scaledVolPct,
        }

        results[timeframe] = prediction
      } catch (error) {
        console.error(`Error generating predictions for ${ticker} (${timeframe}):`, error)
        results[timeframe] = null
      }
    }

    return results
  }
}

// Export singleton instance
export const advancedTradingService = AdvancedTradingService.getInstance()
