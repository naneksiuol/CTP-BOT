import { SHORT_TERM_CONFIG, LONG_TERM_CONFIG } from "./config"
import { ShortTermStrategy } from "./strategies/short-term"
import { LongTermStrategy } from "./strategies/long-term"

export class Strategy {
  config: any

  constructor(config: any) {
    this.config = config
  }

  async analyze(ticker: string, currentPrice: number, optionData: any): Promise<any> {
    // Mock analysis - replace with actual implementation
    const ema_short = currentPrice + Math.random() * 10 - 5
    const ema_long = currentPrice + Math.random() * 5 - 2.5
    const rsi = Math.random() * 100
    const atr = Math.random() * 5
    const trend = rsi > 60 ? "Uptrend" : rsi < 40 ? "Downtrend" : "Sideways"
    const volumeCategory = Math.random() > 0.5 ? "High" : "Low"
    const adlTrend = Math.random() > 0.5 ? "Uptrend" : "Downtrend"
    const weightedScore = Math.random() * 0.2 - 0.1
    const signal = weightedScore > 0.1 ? "Buy" : weightedScore < -0.1 ? "Sell" : "Neutral"

    const stopLoss = currentPrice - atr
    const takeProfit = currentPrice + atr

    const mtfc = {
      "5m": Math.random() > 0.5 ? "bullish" : "bearish",
      "15m": Math.random() > 0.5 ? "bullish" : "bearish",
      "30m": Math.random() > 0.5 ? "bullish" : "bearish",
      "1h": Math.random() > 0.5 ? "bullish" : "bearish",
      "4h": Math.random() > 0.5 ? "bullish" : "bearish",
      "1d": Math.random() > 0.5 ? "bullish" : "bearish",
      "1wk": Math.random() > 0.5 ? "bullish" : "bearish",
    }

    return {
      ticker,
      strategy: this.config.name,
      ema_short,
      ema_long,
      RSI: rsi,
      atr,
      trend,
      volume: Math.random() * 1000000,
      volumeCategory,
      adlTrend,
      weightedScore,
      signal,
      stopLoss,
      takeProfit,
      lastClose: currentPrice,
      mtfc,
      optionData,
    }
  }
}

/**
 * Factory function to get the appropriate strategy based on type
 */
export function getStrategy(strategyType: string) {
  switch (strategyType) {
    case "short-term":
      return new ShortTermStrategy(SHORT_TERM_CONFIG)
    case "long-term":
      return new LongTermStrategy(LONG_TERM_CONFIG)
    default:
      return new ShortTermStrategy(SHORT_TERM_CONFIG) // Default to short-term
  }
}
