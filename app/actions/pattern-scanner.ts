"use server"

import { fetchStockPrice } from "./stock-actions"

// Define the pattern data type
type PatternData = {
  symbol: string
  name: string
  pattern: "bullish" | "bearish"
  timeframe: string
  candlesAway: number
  confidence: number
  currentPrice: number
  targetPrice: number
  lastUpdate: string
}

// Company names for symbols
const companyNames: Record<string, string> = {
  AAPL: "Apple Inc.",
  MSFT: "Microsoft Corp.",
  AMZN: "Amazon.com Inc.",
  NVDA: "NVIDIA Corp.",
  GOOGL: "Alphabet Inc.",
  META: "Meta Platforms Inc.",
  TSLA: "Tesla Inc.",
  "BRK-B": "Berkshire Hathaway Inc.",
  UNH: "UnitedHealth Group Inc.",
  JPM: "JPMorgan Chase & Co.",
  V: "Visa Inc.",
  XOM: "Exxon Mobil Corp.",
  JNJ: "Johnson & Johnson",
  PG: "Procter & Gamble Co.",
  MA: "Mastercard Inc.",
  HD: "Home Depot Inc.",
  AVGO: "Broadcom Inc.",
  CVX: "Chevron Corp.",
  MRK: "Merck & Co. Inc.",
  LLY: "Eli Lilly and Co.",
  COST: "Costco Wholesale Corp.",
  PEP: "PepsiCo Inc.",
  ADBE: "Adobe Inc.",
  CSCO: "Cisco Systems Inc.",
  NFLX: "Netflix Inc.",
  CMCSA: "Comcast Corp.",
  AMD: "Advanced Micro Devices Inc.",
  INTC: "Intel Corp.",
  INTU: "Intuit Inc.",
  QCOM: "Qualcomm Inc.",
  TXN: "Texas Instruments Inc.",
  AMAT: "Applied Materials Inc.",
  GS: "Goldman Sachs Group Inc.",
  MCD: "McDonald's Corp.",
  CAT: "Caterpillar Inc.",
  CRM: "Salesforce Inc.",
  AMGN: "Amgen Inc.",
  TRV: "Travelers Companies Inc.",
  BA: "Boeing Co.",
  IBM: "International Business Machines Corp.",
  WMT: "Walmart Inc.",
  AXP: "American Express Co.",
  NKE: "Nike Inc.",
  HON: "Honeywell International Inc.",
  // Cryptocurrency assets
  BTC: "Bitcoin",
  ETH: "Ethereum",
  XRP: "Ripple",
  ADA: "Cardano",
  SOL: "Solana",
  DOT: "Polkadot",
  DOGE: "Dogecoin",
  AVAX: "Avalanche",
  // Forex pairs
  "EUR/USD": "Euro/US Dollar",
  "GBP/USD": "British Pound/US Dollar",
  "USD/JPY": "US Dollar/Japanese Yen",
  "USD/CAD": "US Dollar/Canadian Dollar",
  "AUD/USD": "Australian Dollar/US Dollar",
  "NZD/USD": "New Zealand Dollar/US Dollar",
  "USD/CHF": "US Dollar/Swiss Franc",
  // Commodities
  GOLD: "Gold Futures",
  SILVER: "Silver Futures",
  OIL: "Crude Oil Futures",
  "NAT.GAS": "Natural Gas Futures",
  COPPER: "Copper Futures",
  WHEAT: "Wheat Futures",
  CORN: "Corn Futures",
}

// Add delay function for rate limiting
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function scanForCandlePatterns(
  symbols: string[],
  patternType: "all" | "bullish" | "bearish" = "all",
): Promise<PatternData[]> {
  try {
    const results: PatternData[] = []

    // Process in batches to avoid rate limiting
    const batchSize = 5
    for (let i = 0; i < symbols.length; i += batchSize) {
      const batch = symbols.slice(i, i + batchSize)

      // Process each symbol in the batch
      const batchPromises = batch.map(async (symbol) => {
        try {
          // Get current price data
          const stockData = await fetchStockPrice(symbol)
          if (!stockData) return null

          // Simulate candlestick pattern detection
          // In a real app, this would analyze actual 30-minute candle data
          const hasPattern = Math.random() > 0.7 // 30% chance of finding a pattern
          if (!hasPattern) return null

          // Randomly determine pattern type
          const pattern: "bullish" | "bearish" = Math.random() > 0.5 ? "bullish" : "bearish"

          // Skip if we're filtering by pattern type
          if (patternType !== "all" && pattern !== patternType) return null

          // Randomly determine how many candles away from completion
          const candlesAway = Math.floor(Math.random() * 3) // 0, 1, or 2 candles away

          // Calculate confidence level (higher for patterns that are closer to completion)
          const baseConfidence = 50 + Math.floor(Math.random() * 40)
          const confidence = Math.min(100, baseConfidence + (2 - candlesAway) * 10)

          // Calculate target price based on pattern type
          const volatilityFactor = Math.random() * 0.05 + 0.01 // 1% to 6%
          const targetPrice =
            pattern === "bullish" ? stockData.price * (1 + volatilityFactor) : stockData.price * (1 - volatilityFactor)

          return {
            symbol,
            name: companyNames[symbol] || symbol,
            pattern,
            timeframe: "30min",
            candlesAway,
            confidence,
            currentPrice: stockData.price,
            targetPrice,
            lastUpdate: new Date().toLocaleTimeString(),
          }
        } catch (error) {
          console.error(`Error processing ${symbol} for pattern scanning:`, error)
          return null
        }
      })

      const batchResults = await Promise.all(batchPromises)
      results.push(...(batchResults.filter(Boolean) as PatternData[]))

      // Add a small delay between batches
      if (i + batchSize < symbols.length) {
        await delay(500)
      }
    }

    // Sort results by confidence (highest first)
    return results.sort((a, b) => b.confidence - a.confidence)
  } catch (error) {
    console.error("Error scanning for candlestick patterns:", error)
    return []
  }
}
