"use server"

import { fetchMultipleStocks } from "./stock-actions"

export type ScanResult = {
  symbol: string
  price: number
  change: number
  changePercent: number
  volume: string
  signal: "bullish" | "bearish" | "neutral"
  strength: number // 0-100
  pattern: string
  description: string
}

// Major index components (simplified)
const MAJOR_INDEXES = {
  "S&P 500": [
    "AAPL",
    "MSFT",
    "AMZN",
    "NVDA",
    "GOOGL",
    "META",
    "TSLA",
    "BRK.B",
    "UNH",
    "XOM",
    "JPM",
    "JNJ",
    "V",
    "PG",
    "MA",
    "HD",
    "CVX",
    "MRK",
    "LLY",
    "AVGO",
  ],
  Nasdaq: [
    "AAPL",
    "MSFT",
    "AMZN",
    "NVDA",
    "GOOGL",
    "META",
    "TSLA",
    "AVGO",
    "COST",
    "PEP",
    "ADBE",
    "CSCO",
    "NFLX",
    "CMCSA",
    "AMD",
    "TMUS",
    "INTC",
    "INTU",
    "QCOM",
    "AMAT",
  ],
  "Dow Jones": [
    "UNH",
    "GS",
    "HD",
    "MSFT",
    "MCD",
    "CAT",
    "CRM",
    "V",
    "AMGN",
    "TRV",
    "JPM",
    "BA",
    "PG",
    "IBM",
    "WMT",
    "JNJ",
    "AXP",
    "NKE",
    "MRK",
    "HON",
  ],
}

// Technical patterns
const PATTERNS = [
  "Bullish Engulfing",
  "Bearish Engulfing",
  "Hammer",
  "Shooting Star",
  "Doji",
  "Morning Star",
  "Evening Star",
  "Bullish Harami",
  "Bearish Harami",
  "Golden Cross",
  "Death Cross",
  "Cup and Handle",
  "Head and Shoulders",
  "Double Top",
  "Double Bottom",
  "Triple Top",
  "Triple Bottom",
  "Rising Wedge",
  "Falling Wedge",
  "Ascending Triangle",
  "Descending Triangle",
]

// Pattern descriptions
const PATTERN_DESCRIPTIONS = {
  "Bullish Engulfing":
    "A bullish reversal pattern where a small bearish candle is followed by a large bullish candle that completely engulfs the previous day's candle.",
  "Bearish Engulfing":
    "A bearish reversal pattern where a small bullish candle is followed by a large bearish candle that completely engulfs the previous day's candle.",
  Hammer: "A bullish reversal pattern that forms during a downtrend, with a small body and a long lower shadow.",
  "Shooting Star":
    "A bearish reversal pattern that forms during an uptrend, with a small body and a long upper shadow.",
  Doji: "A candlestick pattern where the opening and closing prices are nearly equal, indicating market indecision.",
  "Morning Star":
    "A bullish reversal pattern consisting of three candles: a large bearish candle, a small-bodied candle, and a large bullish candle.",
  "Evening Star":
    "A bearish reversal pattern consisting of three candles: a large bullish candle, a small-bodied candle, and a large bearish candle.",
  "Bullish Harami":
    "A bullish reversal pattern where a small bullish candle is contained within the body of a previous larger bearish candle.",
  "Bearish Harami":
    "A bearish reversal pattern where a small bearish candle is contained within the body of a previous larger bullish candle.",
  "Golden Cross": "A bullish signal where a short-term moving average crosses above a long-term moving average.",
  "Death Cross": "A bearish signal where a short-term moving average crosses below a long-term moving average.",
  "Cup and Handle":
    "A bullish continuation pattern resembling a cup with a handle, indicating a potential upward breakout.",
  "Head and Shoulders":
    "A bearish reversal pattern consisting of three peaks, with the middle peak (head) higher than the two surrounding peaks (shoulders).",
  "Double Top":
    "A bearish reversal pattern consisting of two consecutive peaks of similar height, indicating a potential trend reversal.",
  "Double Bottom":
    "A bullish reversal pattern consisting of two consecutive troughs of similar depth, indicating a potential trend reversal.",
  "Triple Top":
    "A bearish reversal pattern consisting of three peaks at approximately the same price level, indicating strong resistance.",
  "Triple Bottom":
    "A bullish reversal pattern consisting of three troughs at approximately the same price level, indicating strong support.",
  "Rising Wedge": "A bearish pattern where price consolidates between upward sloping support and resistance lines.",
  "Falling Wedge": "A bullish pattern where price consolidates between downward sloping support and resistance lines.",
  "Ascending Triangle":
    "A bullish continuation pattern with a flat upper resistance line and an upward sloping lower support line.",
  "Descending Triangle":
    "A bearish continuation pattern with a flat lower support line and a downward sloping upper resistance line.",
}

export async function scanMarket(index: keyof typeof MAJOR_INDEXES): Promise<ScanResult[]> {
  try {
    // Get the symbols for the selected index
    const symbols = MAJOR_INDEXES[index]

    // Fetch stock data for all symbols
    const stockData = await fetchMultipleStocks(symbols)

    // Process the data to identify opportunities
    const results: ScanResult[] = []

    for (const symbol of symbols) {
      const stock = stockData[symbol]

      if (stock) {
        // Determine signal based on price change
        let signal: "bullish" | "bearish" | "neutral" = "neutral"
        if (stock.changePercent > 1.5) signal = "bullish"
        else if (stock.changePercent < -1.5) signal = "bearish"

        // Generate a random strength score (in a real app, this would be based on technical indicators)
        const strength = Math.floor(Math.random() * 101)

        // Assign a random pattern (in a real app, this would be based on actual chart patterns)
        const patternIndex = Math.floor(Math.random() * PATTERNS.length)
        const pattern = PATTERNS[patternIndex]

        // Get the description for the pattern
        const description =
          PATTERN_DESCRIPTIONS[pattern as keyof typeof PATTERN_DESCRIPTIONS] ||
          "Technical pattern indicating potential price movement."

        results.push({
          symbol: stock.symbol,
          price: stock.price,
          change: stock.change,
          changePercent: stock.changePercent,
          volume: stock.volume,
          signal,
          strength,
          pattern,
          description,
        })
      }
    }

    // Sort by strength (highest first)
    return results.sort((a, b) => b.strength - a.strength)
  } catch (error) {
    console.error("Error scanning market:", error)
    return []
  }
}
