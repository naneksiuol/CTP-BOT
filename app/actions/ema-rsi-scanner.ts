"use server"

import { fetchStockPrice } from "./stock-actions"

// Define the EMA/RSI scan result type
export type EmaRsiScanResult = {
  symbol: string
  name: string
  currentPrice: number
  ema65: number
  ema200: number
  rsi: number
  deviation: number
  signal: "bullish" | "bearish"
  potentialTarget: number
  sector: string
  volume: string
  lastUpdate: string
}

// Company names for symbols (using the existing mapping from pattern-scanner.ts)
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

// Sectors for symbols
const sectors: Record<string, string> = {
  AAPL: "Technology",
  MSFT: "Technology",
  AMZN: "Consumer Cyclical",
  NVDA: "Technology",
  GOOGL: "Communication Services",
  META: "Communication Services",
  TSLA: "Consumer Cyclical",
  "BRK-B": "Financial Services",
  UNH: "Healthcare",
  JPM: "Financial Services",
  V: "Financial Services",
  XOM: "Energy",
  JNJ: "Healthcare",
  PG: "Consumer Defensive",
  MA: "Financial Services",
  HD: "Consumer Cyclical",
  AVGO: "Technology",
  CVX: "Energy",
  MRK: "Healthcare",
  LLY: "Healthcare",
  COST: "Consumer Defensive",
  PEP: "Consumer Defensive",
  ADBE: "Technology",
  CSCO: "Technology",
  NFLX: "Communication Services",
  CMCSA: "Communication Services",
  AMD: "Technology",
  INTC: "Technology",
  INTU: "Technology",
  QCOM: "Technology",
  TXN: "Technology",
  AMAT: "Technology",
  GS: "Financial Services",
  MCD: "Consumer Cyclical",
  CAT: "Industrials",
  CRM: "Technology",
  AMGN: "Healthcare",
  TRV: "Financial Services",
  BA: "Industrials",
  IBM: "Technology",
  WMT: "Consumer Defensive",
  AXP: "Financial Services",
  NKE: "Consumer Cyclical",
  HON: "Industrials",
  // Cryptocurrency assets
  BTC: "Cryptocurrency",
  ETH: "Cryptocurrency",
  XRP: "Cryptocurrency",
  ADA: "Cryptocurrency",
  SOL: "Cryptocurrency",
  DOT: "Cryptocurrency",
  DOGE: "Cryptocurrency",
  AVAX: "Cryptocurrency",
  // Forex pairs
  "EUR/USD": "Forex",
  "GBP/USD": "Forex",
  "USD/JPY": "Forex",
  "USD/CAD": "Forex",
  "AUD/USD": "Forex",
  "NZD/USD": "Forex",
  "USD/CHF": "Forex",
  // Commodities
  GOLD: "Commodities",
  SILVER: "Commodities",
  OIL: "Commodities",
  "NAT.GAS": "Commodities",
  COPPER: "Commodities",
  WHEAT: "Commodities",
  CORN: "Commodities",
}

// Add delay function for rate limiting
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Function to calculate a simulated EMA value
function calculateSimulatedEMA(price: number, period: number): number {
  // In a real implementation, this would use actual historical price data
  // For simulation, we'll create a value that's somewhat close to the current price
  // with longer periods being further from current price
  const randomFactor = Math.random() * 0.1 - 0.05 // -5% to +5%
  const trendFactor = period === 65 ? 0.02 : 0.04 // Longer EMAs tend to lag more

  // For simulation purposes, we'll make the EMA slightly lower than current price
  // as if we're in a general uptrend (common in markets)
  return price * (1 - trendFactor + randomFactor)
}

// Function to calculate a simulated RSI value
function calculateSimulatedRSI(): number {
  // Generate a random RSI value between 0 and 100
  return Math.floor(Math.random() * 100)
}

export async function scanForEmaRsiSetups(
  symbols: string[],
  signalType: "all" | "bullish" | "bearish" = "all",
  minDeviation = 2.0, // Minimum $2 deviation from EMAs
): Promise<EmaRsiScanResult[]> {
  try {
    const results: EmaRsiScanResult[] = []

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

          const currentPrice = stockData.price

          // Calculate simulated 5-min EMAs
          const ema65 = calculateSimulatedEMA(currentPrice, 65)
          const ema200 = calculateSimulatedEMA(currentPrice, 200)

          // Calculate simulated 5-min RSI
          const rsi = calculateSimulatedRSI()

          // Calculate average deviation from EMAs
          const avgEma = (ema65 + ema200) / 2
          const deviation = Math.abs(currentPrice - avgEma)

          // Determine signal type based on price relative to EMAs and RSI
          let signal: "bullish" | "bearish" | null = null

          if (currentPrice > avgEma + minDeviation && rsi > 70) {
            signal = "bearish" // Price well above EMAs with high RSI - potential bearish reversal
          } else if (currentPrice < avgEma - minDeviation && rsi < 30) {
            signal = "bullish" // Price well below EMAs with low RSI - potential bullish reversal
          }

          // Skip if no signal or if we're filtering by signal type
          if (!signal || (signalType !== "all" && signal !== signalType)) {
            return null
          }

          // Calculate potential target (the average of the two EMAs)
          const potentialTarget = avgEma

          return {
            symbol,
            name: companyNames[symbol] || symbol,
            currentPrice,
            ema65,
            ema200,
            rsi,
            deviation,
            signal,
            potentialTarget,
            sector: sectors[symbol] || "Unknown",
            volume: stockData.volume,
            lastUpdate: new Date().toLocaleTimeString(),
          }
        } catch (error) {
          console.error(`Error processing ${symbol} for EMA/RSI scanning:`, error)
          return null
        }
      })

      const batchResults = await Promise.all(batchPromises)
      results.push(...(batchResults.filter(Boolean) as EmaRsiScanResult[]))

      // Add a small delay between batches
      if (i + batchSize < symbols.length) {
        await delay(500)
      }
    }

    // Sort results by deviation (highest first)
    return results.sort((a, b) => b.deviation - a.deviation)
  } catch (error) {
    console.error("Error scanning for EMA/RSI setups:", error)
    return []
  }
}
