"use client"

import { useState, useEffect } from "react"
import { ArrowDown, ArrowUp, Filter, RefreshCw, Plus, Search } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchStockPrice } from "../actions/stock-actions"
import { toast } from "@/components/ui/use-toast"
import { scanForCandlePatterns } from "../actions/pattern-scanner"
import { scanForEmaRsiSetups, type EmaRsiScanResult } from "../actions/ema-rsi-scanner"

// Define the stock data type
type StockData = {
 symbol: string
 name: string
 price: number
 change: number
 changePercent: number
 volume: string
 sector?: string
 marketCap?: string
 qem?: { low: number; high: number }
 signal?: "buy" | "sell" | "hold" | "watch"
 strength?: "strong" | "moderate" | "weak"
}

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

// Define the RMAT data type
type RmatData = {
 symbol: string
 name: string
 currentPrice: number
 ema65: number
 ema200: number
 distanceToEma65: number
 distanceToEma200: number
 nearestPivot: number
 distanceToPivot: number
 signal: "ema65" | "ema200" | "pivot" | "none"
 direction: "bullish" | "bearish" | "neutral"
 potentialMove: number
 sector: string
 volume: string
}

// Define the TBT data type
type TbtData = {
 symbol: string
 name: string
 currentPrice: number
 sidewaysMinutes: number
 sidewaysRange: number
 rangeHigh: number
 rangeLow: number
 breakoutDirection: "bullish" | "bearish" | "none"
 breakoutStrength: "strong" | "moderate" | "weak" | "none"
 potentialTarget: number
 sector: string
 volume: string
}

// Define the DB/DT data type
type DbDtData = {
 symbol: string
 name: string
 currentPrice: number
 patternType: "double-top" | "double-bottom"
 firstLevel: number
 retracement: number
 secondLevel: number
 distanceFromLevel: number
 breakConfirmation: boolean
 confidence: number
 potentialTarget: number
 sector: string
 volume: string
 dayRange: {
   high: number
   low: number
 }
}

// Major indexes and their components
const indexes = {
 "S&P 500": [
   "AAPL",
   "MSFT",
   "AMZN",
   "NVDA",
   "GOOGL",
   "META",
   "TSLA",
   "BRK-B",
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
   "INTC",
   "INTU",
   "QCOM",
   "TXN",
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
 CAT: "Caterpillar Inc.", CRM: "Salesforce Inc.",
 AMGN: "Amgen Inc.",
 TRV: "Travelers Companies Inc.",
 BA: "Boeing Co.",
 IBM: "International Business Machines Corp.",
 WMT: "Walmart Inc.",
 AXP: "American Express Co.",
 NKE: "Nike Inc.",
 HON: "Honeywell International Inc.",
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
}

// Market cap for symbols (in billions)
const marketCaps: Record<string, string> = {
 AAPL: "$2.8T",
 MSFT: "$3.1T",
 AMZN: "$1.8T",
 NVDA: "$2.3T",
 GOOGL: "$1.9T",
 META: "$1.2T",
 TSLA: "$680B",
 "BRK-B": "$860B",
 UNH: "$450B",
 JPM: "$520B",
 V: "$510B",
 XOM: "$480B",
 JNJ: "$380B",
 PG: "$350B",
 MA: "$420B",
 HD: "$330B",
 AVGO: "$580B",
 CVX: "$290B",
 MRK: "$270B",
 LLY: "$550B",
 COST: "$310B",
 PEP: "$230B",
 ADBE: "$240B",
 CSCO: "$200B",
 NFLX: "$250B",
 CMCSA: "$160B",
 AMD: "$210B",
 INTC: "$120B",
 INTU: "$150B",
 QCOM: "$170B",
 TXN: "$160B",
 AMAT: "$130B",
 GS: "$140B",
 MCD: "$200B",
 CAT: "$140B",
 CRM: "$270B",
 AMGN: "$150B",
 TRV: "$40B",
 BA: "$130B",
 IBM: "$120B",
 WMT: "$420B",
 AXP: "$140B",
 NKE: "$150B",
 HON: "$130B",
}

// Scan criteria types
type ScanCriteria = {
 priceChange: "any" | "positive" | "negative" | "above5" | "below-5"
 volume: "any" | "high" | "low"
 sector: string
 signal: "any" | "buy" | "sell" | "watch"
}

// RMAT criteria types
type RmatCriteria = {
 minDistance: number
 maxDistance: number
 sector: string
 signal: "any" | "ema65" | "ema200" | "pivot"
}

// TBT criteria types
type TbtCriteria = {
 minSidewaysMinutes: number
 maxRangeWidth: number
 sector: string
 breakoutDirection: "any" | "bullish" | "bearish"
}

// DB/DT criteria types
type DbDtCriteria = {
 minDistance: number
 patternType: "any" | "double-top" | "double-bottom"
 sector: string
 minConfidence: number
}

export default function MarketScanner() {
 const [activeIndex, setActiveIndex] = useState("S&P 500")
 const [isLoading, setIsLoading] = useState(true)
 const [isScanning, setIsScanning] = useState(false)
 const [isPatternScanning, setIsPatternScanning] = useState(false)
 const [isEmaRsiScanning, setIsEmaRsiScanning] = useState(false)
 const [isRmatScanning, setIsRmatScanning] = useState(false)
 const [isTbtScanning, setIsTbtScanning] = useState(false)
 const [isDbDtScanning, setIsDbDtScanning] = useState(false)
 const [searchQuery, setSearchQuery] = useState("")
 const [scanResults, setScanResults] = useState<StockData[]>([])
 const [patternResults, setPatternResults] = useState<PatternData[]>([])
 const [emaRsiResults, setEmaRsiResults] = useState<EmaRsiScanResult[]>([])
 const [rmatResults, setRmatResults] = useState<RmatData[]>([])
 const [tbtResults, setTbtResults] = useState<TbtData[]>([])
 const [dbDtResults, setDbDtResults] = useState<DbDtData[]>([])
 const [watchlist, setWatchlist] = useState<StockData[]>([])
 const [scanCriteria, setScanCriteria] = useState<ScanCriteria>({
   priceChange: "any",
   volume: "any",
   sector: "any",
   signal: "any",
 })
 const [rmatCriteria, setRmatCriteria] = useState<RmatCriteria>({
   minDistance: 1.0,
   maxDistance: 1.5,
   sector: "any",
   signal: "any",
 })
 const [tbtCriteria, setTbtCriteria] = useState<TbtCriteria>({
   minSidewaysMinutes: 30,
   maxRangeWidth: 0.5,
   sector: "any",
   breakoutDirection: "any",
 })
 const [dbDtCriteria, setDbDtCriteria] = useState<DbDtCriteria>({
   minDistance: 1.0,
   patternType: "any",
   sector: "any",
   minConfidence: 70,
 })
 const [activeTab, setActiveTab] = useState("scanner")
 const [patternType, setPatternType] = useState<"all" | "bullish" | "bearish">("all")
 const [emaRsiSignalType, setEmaRsiSignalType] = useState<"all" | "bullish" | "bearish">("all")
 const [minDeviation, setMinDeviation] = useState(2.0)

 // Load watchlist from localStorage on initial load
 useEffect(() => {
   const savedWatchlist = localStorage.getItem("watchlist")
   if (savedWatchlist) {
     try {
       const parsedWatchlist = JSON.parse(savedWatchlist)
       if (Array.isArray(parsedWatchlist) && parsedWatchlist.length > 0) {
         // Convert the watchlist format if needed
         const formattedWatchlist = parsedWatchlist.map((item) => ({
           symbol: item.symbol,
           name: companyNames[item.symbol] || item.symbol,
           price: item.price,
           change: item.change,
           changePercent: item.changePercent,
           volume: item.volume,
           sector: sectors[item.symbol] || "Unknown",
           marketCap: marketCaps[item.symbol] || "Unknown",
           qem: item.qem || { low: 0, high: 0 },
         }))
         setWatchlist(formattedWatchlist)
       }
     } catch (err) {
       console.error("Error parsing watchlist from localStorage:", err)
     }
   }
 }, [])

 // Scan for stocks based on the selected index
 const scanStocks = async () => {
   setIsScanning(true)
   setIsLoading(true)

   try {
     const symbols = indexes[activeIndex as keyof typeof indexes]
     const results: StockData[] = []

     // Process in batches to avoid rate limiting
     const batchSize = 5
     for (let i = 0; i < symbols.length; i += batchSize) {
       const batch = symbols.slice(i, i + batchSize)

       // Process each symbol in the batch
       const batchPromises = batch.map(async (symbol) => {
         try {
           const stockData = await fetchStockPrice(symbol)
           if (stockData) {
             // Calculate QEM based on price (simplified)
             const price = stockData.price
             const volatility = (Math.abs(stockData.changePercent) / 100) * 5 // Simple volatility estimate
             const qemLow = Number.parseFloat((price * (1 - volatility)).toFixed(2))
             const qemHigh = Number.parseFloat((price * (1 + volatility)).toFixed(2))

             // Generate a trading signal based on price action and volatility
             const signal = generateSignal(stockData.changePercent, volatility)

             return {
               symbol,
               name: companyNames[symbol] || symbol,
               price: stockData.price,
               change: stockData.change,
               changePercent: stockData.changePercent,
               volume: stockData.volume,
               sector: sectors[symbol] || "Unknown",
               marketCap: marketCaps[symbol] || "Unknown",
               qem: { low: qemLow, high: qemHigh },
               signal: signal.signal,
               strength: signal.strength,
             }
           }
           return null
         } catch (error) {
           console.error(`Error processing ${symbol}:`, error)
           return null
         }
       })

       const batchResults = await Promise.all(batchPromises)
       results.push(...(batchResults.filter(Boolean) as StockData[]))

       // Add a small delay between batches
       if (i + batchSize < symbols.length) {
         await new Promise((resolve) => setTimeout(resolve, 1000))
       }
     }

     // Apply filters based on scan criteria
     const filteredResults = filterResults(results, scanCriteria)

     // Sort by percent change (descending)
     filteredResults.sort((a, b) => b.changePercent - a.changePercent)

     setScanResults(filteredResults)

     toast({
       title: "Scan Complete",
       description: `Found ${filteredResults.length} stocks matching your criteria.`,
     })
   } catch (error) {
     console.error("Error scanning stocks:", error)
     toast({
       title: "Scan Error",
       description: "There was an error scanning stocks. Please try again.",
       variant: "destructive",
     })
   } finally {
     setIsLoading(false)
     setIsScanning(false)
   }
 }

 // Scan for candlestick patterns
 const scanForPatterns = async () => {
   setIsPatternScanning(true)

   try {
     const allSymbols = [...indexes["S&P 500"], ...indexes["Nasdaq 100"], ...indexes["Dow Jones"]]

     // Remove duplicates
     const uniqueSymbols = [...new Set(allSymbols)]

     // Get pattern results
     const results = await scanForCandlePatterns(uniqueSymbols, patternType)
     setPatternResults(results)

     toast({
       title: "Pattern Scan Complete",
       description: `Found ${results.length} stocks with the specified candle patterns.`,
     })
   } catch (error) {
     console.error("Error scanning for patterns:", error)
     toast({
       title: "Pattern Scan Error",
       description: "There was an error scanning for patterns. Please try again.",
       variant: "destructive",
     })
   } finally {
     setIsPatternScanning(false)
   }
 }

 // Scan for EMA/RSI setups
 const scanForEmaRsi = async () => {
   setIsEmaRsiScanning(true)

   try {
     // Get all symbols from all indexes
     const allSymbols = Object.values(indexes).flat()

     // Remove duplicates
     const uniqueSymbols = [...new Set(allSymbols)]

     // Get EMA/RSI results
     const results = await scanForEmaRsiSetups(uniqueSymbols, emaRsiSignalType, minDeviation)
     setEmaRsiResults(results)

     toast({
       title: "EMA/RSI Scan Complete",
       description: `Found ${results.length} stocks with the specified EMA/RSI conditions.`,
     })
   } catch (error) {
     console.error("Error scanning for EMA/RSI setups:", error)
     toast({
       title: "EMA/RSI Scan Error",
       description: "There was an error scanning for EMA/RSI setups. Please try again.",
       variant: "destructive",
     })
   } finally {
     setIsEmaRsiScanning(false)
   }
 }

 // Scan for RMAT setups
 const scanForRmat = async () => {
   setIsRmatScanning(true)

   try {
     // Get all symbols from all indexes
     const allSymbols = Object.values(indexes).flat()

     // Remove duplicates
     const uniqueSymbols = [...new Set(allSymbols)]

     // Simulate fetching RMAT data
     // In a real implementation, this would call a server action
     const results = await simulateRmatScan(uniqueSymbols, rmatCriteria)
     setRmatResults(results)

     toast({
       title: "RMAT Scan Complete",
       description: `Found ${results.length} stocks with the specified RMAT conditions.`,
     })
   } catch (error) {
     console.error("Error scanning for RMAT setups:", error)
     toast({
       title: "RMAT Scan Error",
       description: "There was an error scanning for RMAT setups. Please try again.",
       variant: "destructive",
     })
   } finally {
     setIsRmatScanning(false)
   }
 }

 // Scan for TBT setups
 const scanForTbt = async () => {
   setIsTbtScanning(true)

   try {
     // Get all symbols from all indexes
     const allSymbols = Object.values(indexes).flat()

     // Remove duplicates
     const uniqueSymbols = [...new Set(allSymbols)]

     // Simulate fetching TBT data
     // In a real implementation, this would call a server action
     const results = await simulateTbtScan(uniqueSymbols, tbtCriteria)
     setTbtResults(results)

     toast({
       title: "TBT Scan Complete",
       description: `Found ${results.length} stocks with the specified Base Trade conditions.`,
     })
   } catch (error) {
     console.error("Error scanning for TBT setups:", error)
     toast({
       title: "TBT Scan Error",
       description: "There was an error scanning for Base Trade setups. Please try again.",
       variant: "destructive",
     })
   } finally {
     setIsTbtScanning(false)
   }
 }

 // Scan for DB/DT setups
 const scanForDbDt = async () => {
   setIsDbDtScanning(true)

   try {
     // Get all symbols from all indexes
     const allSymbols = Object.values(indexes).flat()

     // Remove duplicates
     const uniqueSymbols = [...new Set(allSymbols)]

     // Simulate fetching DB/DT data
     // In a real implementation, this would call a server action
     const results = await simulateDbDtScan(uniqueSymbols, dbDtCriteria)
     setDbDtResults(results)

     toast({
       title: "DB/DT Scan Complete",
       description: `Found ${results.length} stocks with the specified Double Top/Bottom patterns.`,
     })
   } catch (error) {
     console.error("Error scanning for DB/DT setups:", error)
     toast({
       title: "DB/DT Scan Error",
       description: "There was an error scanning for Double Top/Bottom patterns. Please try again.",
       variant: "destructive",
     })
   } finally {
     setIsDbDtScanning(false)
   }
 }

 // Simulate RMAT scan (in a real app, this would be a server action)
 const simulateRmatScan = async (symbols: string[], criteria: RmatCriteria): Promise<RmatData[]> => {
   // Simulate API delay
   await new Promise((resolve) => setTimeout(resolve, 2000))

   const results: RmatData[] = []

   for (const symbol of symbols) {
     try {
       // Get stock price data
       const stockData = await fetchStockPrice(symbol)

       if (!stockData) continue

       // Simulate EMA values
       const currentPrice = stockData.price
       const ema65 = currentPrice * (1 + (Math.random() * 0.06 - 0.03)) // Random EMA65 within ±3% of current price
       const ema200 = currentPrice * (1 + (Math.random() * 0.08 - 0.04)) // Random EMA200 within ±4% of current price

       // Calculate distances
       const distanceToEma65 = Math.abs(currentPrice - ema65)
       const distanceToEma200 = Math.abs(currentPrice - ema200)

       // Simulate pivot points (simplified)
       const pivotLevels = [currentPrice * 0.97, currentPrice * 0.99, currentPrice * 1.01, currentPrice * 1.03]

       // Find nearest pivot
       const distancesToPivots = pivotLevels.map((pivot) => Math.abs(currentPrice - pivot))
       const nearestPivotIndex = distancesToPivots.indexOf(Math.min(...distancesToPivots))
       const nearestPivot = pivotLevels[nearestPivotIndex]
       const distanceToPivot = distancesToPivots[nearestPivotIndex]

       // Determine signal
       let signal: "ema65" | "ema200" | "pivot" | "none" = "none"
       let direction: "bullish" | "bearish" | "neutral" = "neutral"
       let potentialMove = 0

       // Check if distances meet criteria
       const meetsDistanceCriteria =
         (distanceToEma65 >= criteria.minDistance && distanceToEma65 <= criteria.maxDistance) ||
         (distanceToEma200 >= criteria.minDistance && distanceToEma200 <= criteria.maxDistance) ||
         (distanceToPivot >= criteria.minDistance && distanceToPivot <= criteria.maxDistance)

       if (meetsDistanceCriteria) {
         // Determine which level is closest and meets criteria
         if (
           distanceToEma65 <= distanceToEma200 &&
           distanceToEma65 <= distanceToPivot &&
           distanceToEma65 >= criteria.minDistance &&
           distanceToEma65 <= criteria.maxDistance
         ) {
           signal = "ema65"
           direction = currentPrice < ema65 ? "bullish" : "bearish"
           potentialMove = distanceToEma65
         } else if (
           distanceToEma200 <= distanceToEma65 &&
           distanceToEma200 <= distanceToPivot &&
           distanceToEma200 >= criteria.minDistance &&
           distanceToEma200 <= criteria.maxDistance
         ) {
           signal = "ema200"
           direction = currentPrice < ema200 ? "bullish" : "bearish"
           potentialMove = distanceToEma200
         } else if (distanceToPivot >= criteria.minDistance && distanceToPivot <= criteria.maxDistance) {
           signal = "pivot"
           direction = currentPrice < nearestPivot ? "bullish" : "bearish"
           potentialMove = distanceToPivot
         }

         // Filter by signal if specified
         if (criteria.signal !== "any" && signal !== criteria.signal) {
           continue
         }

         // Filter by sector if specified
         if (criteria.sector !== "any" && sectors[symbol] !== criteria.sector) {
           continue
         }

         // Add to results
         results.push({
           symbol,
           name: companyNames[symbol] || symbol,
           currentPrice,
           ema65,
           ema200,
           distanceToEma65,
           distanceToEma200,
           nearestPivot,
           distanceToPivot,
           signal,
           direction,
           potentialMove,
           sector: sectors[symbol] || "Unknown",
           volume: stockData.volume,
         })
       }
     } catch (error) {
       console.error(`Error processing ${symbol} for RMAT:`, error)
     }
   }

   // Sort by potential move (descending)
   return results.sort((a, b) => b.potentialMove - a.potentialMove)
 }

 // Simulate TBT scan (in a real app, this would be a server action)
 const simulateTbtScan = async (symbols: string[], criteria: TbtCriteria): Promise<TbtData[]> => {
   // Simulate API delay
   await new Promise((resolve) => setTimeout(resolve, 2000))

   const results: TbtData[] = []

   for (const symbol of symbols) {
     try {
       // Get stock price data
       const stockData = await fetchStockPrice(symbol)

       if (!stockData) continue

       // Simulate sideways movement data
       const currentPrice = stockData.price

       // Randomly determine if this stock has been moving sideways
       // In a real implementation, this would analyze actual price history
       const hasSidewaysMovement = Math.random() > 0.7 // 30% chance of sideways movement

       if (!hasSidewaysMovement) continue

       // Generate random sideways minutes (between 20 and 60)
       const sidewaysMinutes = Math.floor(Math.random() * 40) + 20

       // Check if it meets the minimum sideways time criteria
       if (sidewaysMinutes < criteria.minSidewaysMinutes) continue

       // Generate random range width (between 0.1 and 0.7)
       const sidewaysRange = Math.random() * 0.6 + 0.1

       // Check if the range width is within criteria
       if (sidewaysRange > criteria.maxRangeWidth) continue

       // Calculate range high and low
       const rangeMidpoint = currentPrice
       const rangeHigh = rangeMidpoint + sidewaysRange / 2
       const rangeLow = rangeMidpoint - sidewaysRange / 2

       // Determine if there's a potential breakout and its direction
       const breakoutProbability = Math.random()
       let breakoutDirection: "bullish" | "bearish" | "none" = "none"
       let breakoutStrength: "strong" | "moderate" | "weak" | "none" = "none"
       let potentialTarget = 0;

       if (breakoutProbability > 0.7) {
         // Potential breakout detected
         breakoutDirection = Math.random() > 0.5 ? "bullish" : "bearish"

         // Determine strength
         const strengthRandom = Math.random()
         if (strengthRandom > 0.7) {
           breakoutStrength = "strong"
         } else if (strengthRandom > 0.4) {
           breakoutStrength = "moderate"
         } else {
           breakoutStrength = "weak"
         }
       }

       // Filter by breakout direction if specified
       if (criteria.breakoutDirection !== "any" && breakoutDirection !== criteria.breakoutDirection) {
         continue
       }

       // Filter by sector if specified
       if (criteria.sector !== "any" && sectors[symbol] !== criteria.sector) {
         continue
       }

       // Calculate potential target based on breakout direction and range width
       if (breakoutDirection === "bullish") {
         potentialTarget = rangeHigh + sidewaysRange
       } else if (breakoutDirection === "bearish") {
         potentialTarget = rangeLow - sidewaysRange
       }

       // Add to results
       results.push({
         symbol,
         name: companyNames[symbol] || symbol,
         currentPrice,
         sidewaysMinutes,
         sidewaysRange,
         rangeHigh,
         rangeLow,
         breakoutDirection,
         breakoutStrength,
         potentialTarget,
         sector: sectors[symbol] || "Unknown",
         volume: stockData.volume,
       })
     } catch (error) {
       console.error(`Error processing ${symbol} for TBT:`, error)
     }
   }

   // Sort by sideways minutes (descending) - longer bases first
   return results.sort((a, b) => b.sidewaysMinutes - a.sidewaysMinutes)
 }

 // Simulate DB/DT scan (in a real app, this would be a server action)
 const simulateDbDtScan = async (symbols: string[], criteria: DbDtCriteria): Promise<DbDtData[]> => {
   // Simulate API delay
   await new Promise((resolve) => setTimeout(resolve, 2000))

   const results: DbDtData[] = []
   let potentialTarget = 0;

   for (const symbol of symbols) {
     try {
       // Get stock price data
       const stockData = await fetchStockPrice(symbol)

       if (!stockData) continue

       // Simulate day high/low
       const currentPrice = stockData.price
       const dayHigh = currentPrice * (1 + Math.random() * 0.04) // Random day high within +4% of current price
       const dayLow = currentPrice * (1 - Math.random() * 0.04) // Random day low within -4% of current price

       // Randomly determine if this stock has a double top or double bottom pattern
       // In a real implementation, this would analyze actual price history
       const hasPattern = Math.random() > 0.7 // 30% chance of having a pattern
       if (!hasPattern) continue

       // Randomly pick pattern type
       const patternType: "double-top" | "double-bottom" = Math.random() > 0.5 ? "double-top" : "double-bottom"

       // Filter by pattern type if specified
       if (criteria.patternType !== "any" && patternType !== criteria.patternType) {
         continue
       }

       // Simulate pattern data
       let firstLevel: number
       let secondLevel: number
       let retracement: number
       let distanceFromLevel: number

       if (patternType === "double-top") {
         // Double top
         firstLevel = dayHigh
         secondLevel = dayHigh * (1 - Math.random() * 0.005) // Slight variation in the second top
         retracement = firstLevel - (firstLevel - dayLow) * (0.4 + Math.random() * 0.3) // Retracement between the two tops
         distanceFromLevel = firstLevel - currentPrice
         potentialTarget = retracement - (firstLevel - retracement);
       } else {
         // Double bottom
         firstLevel = dayLow
         secondLevel = dayLow * (1 + Math.random() * 0.005) // Slight variation in the second bottom
         retracement = firstLevel + (dayHigh - firstLevel) * (0.4 + Math.random() * 0.3) // Retracement between the two bottoms
         distanceFromLevel = currentPrice - firstLevel
         potentialTarget = retracement + (retracement - firstLevel);
       }

       // Check if it meets the minimum distance criteria
       if (distanceFromLevel < criteria.minDistance) continue

       // Determine if the pattern has been confirmed by price breaking the neckline
       const breakConfirmation = Math.random() > 0.7

       // Calculate confidence based on various factors
       const confidence = Math.floor(
         60 + // Base confidence
           (distanceFromLevel > criteria.minDistance * 1.5 ? 15 : 0) + // Extra points for significant movement away
           (Math.abs(firstLevel - secondLevel) < 0.01 * firstLevel ? 10 : 0) + // Extra points for precise retests
           (breakConfirmation ? 15 : 0), // Extra points if confirmed by breakout
       )

       // Filter by minimum confidence if specified
       if (confidence < criteria.minConfidence) continue

       // Filter by sector if specified
       if (criteria.sector !== "any" && sectors[symbol] !== criteria.sector) {
         continue
       }

       // Add to results
       results.push({
         symbol,
         name: companyNames[symbol] || symbol,
         currentPrice,
         patternType,
         firstLevel,
         retracement,
         secondLevel,
         distanceFromLevel,
         breakConfirmation,
         confidence,
         potentialTarget,
         sector: sectors[symbol] || "Unknown",
         volume: stockData.volume,
         dayRange: {
           high: dayHigh,
           low: dayLow,
         },
       })
     } catch (error) {
       console.error(`Error processing ${symbol} for DB/DT:`, error)
     }
   }

   // Sort by confidence (descending)
   return results.sort((a, b) => b.confidence - a.confidence)
 }

 // Generate a trading signal based on price action and volatility
 const generateSignal = (
   changePercent: number,
   volatility: number,
 ): { signal: "buy" | "sell" | "hold" | "watch"; strength: "strong" | "moderate" | "weak" } => {
   // This is a simplified algorithm - in a real system this would be much more sophisticated
   if (changePercent > 2) {
     return { signal: "buy", strength: "strong" }
   } else if (changePercent > 1) {
     return { signal: "buy", strength: "moderate" }
   } else if (changePercent > 0.5) {
     return { signal: "watch", strength: "moderate" }
   } else if (changePercent > 0) {
     return { signal: "hold", strength: "weak" }
   } else if (changePercent > -1) {
     return { signal: "hold", strength: "moderate" }
   } else if (changePercent > -2) {
     return { signal: "watch", strength: "moderate" }
   } else {
     return { signal: "sell", strength: "strong" }
   }
 }

 // Filter results based on scan criteria
 const filterResults = (results: StockData[], criteria: ScanCriteria): StockData[] => {
   return results.filter((stock) => {
     // Filter by price change
     if (criteria.priceChange === "positive" && stock.changePercent <= 0) return false
     if (criteria.priceChange === "negative" && stock.changePercent >= 0) return false
     if (criteria.priceChange === "above5" && stock.changePercent < 5) return false
     if (criteria.priceChange === "below-5" && stock.changePercent > -5) return false

     // Filter by volume (simplified)
     if (criteria.volume === "high" && !stock.volume.includes("M") && !stock.volume.includes("B")) return false
     if (criteria.volume === "low" && (stock.volume.includes("M") || stock.volume.includes("B"))) return false

     // Filter by sector
     if (criteria.sector !== "any" && stock.sector !== criteria.sector) return false

     // Filter by signal
     if (criteria.signal !== "any" && stock.signal !== criteria.signal) return false

     return true
   })
 }

 // Add stock to watchlist
 const addToWatchlist = (stock: StockData) => {
   // Check if stock already exists in watchlist
   const stockExists = watchlist.some((item) => item.symbol === stock.symbol)

   if (!stockExists) {
     const updatedWatchlist = [...watchlist, stock]
     setWatchlist(updatedWatchlist)

     // Save to localStorage - convert to the format expected by the dashboard
     const dashboardWatchlist = updatedWatchlist.map((item) => ({
       symbol: item.symbol,
       price: item.price,
       change: item.change,
       changePercent: item.changePercent,
       volume: item.volume,
       qem: item.qem || { low: 0, high: 0 },
     }))
     localStorage.setItem("watchlist", JSON.stringify(dashboardWatchlist))

     toast({
       title: "Added to Watchlist",
       description: `${stock.symbol} has been added to your watchlist.`,
     })
   } else {
     toast({
       title: "Already in Watchlist",
       description: `${stock.symbol} is already in your watchlist.`,
     })
   }
 }

 // Add EMA/RSI result to watchlist
 const addEmaRsiToWatchlist = (result: EmaRsiScanResult) => {
   // Create a stock object from the EMA/RSI result
   const stock: StockData = {
     symbol: result.symbol,
     name: result.name,
     price: result.currentPrice,
     change: 0, // We don't have this data
     changePercent: 0, // We don't have this data
     volume: result.volume,
     sector: result.sector,
     marketCap: marketCaps[result.symbol] || "Unknown",
   }

   addToWatchlist(stock)
 }

 // Add RMAT result to watchlist
 const addRmatToWatchlist = (result: RmatData) => {
   // Create a stock object from the RMAT result
   const stock: StockData = {
     symbol: result.symbol,
     name: result.name,
     price: result.currentPrice,
     change: 0, // We don't have this data
     changePercent: 0, // We don't have this data
     volume: result.volume,
     sector: result.sector,
     marketCap: marketCaps[result.symbol] || "Unknown",
   }

   addToWatchlist(stock)
 }

 // Add TBT result to watchlist
 const addTbtToWatchlist = (result: TbtData) => {
   // Create a stock object from the TBT result
   const stock: StockData = {
     symbol: result.symbol,
     name: result.name,
     price: result.currentPrice,
     change: 0, // We don't have this data
     changePercent: 0, // We don't have this data
     volume: result.volume,
     sector: result.sector,
     marketCap: marketCaps[result.symbol] || "Unknown",
   }

   addToWatchlist(stock)
 }

 // Add DB/DT result to watchlist
 const addDbDtToWatchlist = (result: DbDtData) => {
   // Create a stock object from the DB/DT result
   const stock: StockData = {
     symbol: result.symbol,
     name: result.name,
     price: result.currentPrice,
     change: 0, // We don't have this data
     changePercent: 0, // We don't have this data
     volume: result.volume,
     sector: result.sector,
     marketCap: marketCaps[result.symbol] || "Unknown",
   }

   addToWatchlist(stock)
 }

 // Filter scan results by search query
 const filteredScanResults = searchQuery
   ? scanResults.filter(
       (stock) =>
         stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
         stock.name.toLowerCase().includes(searchQuery.toLowerCase()),
     )
   : scanResults

 // Filter pattern results by search query
 const filteredPatternResults = searchQuery
   ? patternResults.filter(
       (pattern) =>
         pattern.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
         pattern.name.toLowerCase().includes(searchQuery.toLowerCase()),
     )
   : patternResults

 // Filter EMA/RSI results by search query
 const filteredEmaRsiResults = searchQuery
   ? emaRsiResults.filter(
       (result) =>
         result.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
         result.name.toLowerCase().includes(searchQuery.toLowerCase()),
     )
   : emaRsiResults

 // Filter RMAT results by search query
 const filteredRmatResults = searchQuery
   ? rmatResults.filter(
       (result) =>
         result.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
         result.name.toLowerCase().includes(searchQuery.toLowerCase()),
     )
   : rmatResults

 // Filter TBT results by search query
 const filteredTbtResults = searchQuery
   ? tbtResults.filter(
       (result) =>
         result.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
         result.name.toLowerCase().includes(searchQuery.toLowerCase()),
     )
   : tbtResults

 // Filter DB/DT results by search query
 const filteredDbDtResults = searchQuery
   ? dbDtResults.filter(
       (result) =>
         result.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
         result.name.toLowerCase().includes(searchQuery.toLowerCase()),
     )
   : dbDtResults

 // Get unique sectors for filter dropdown
 const uniqueSectors = Array.from(new Set(Object.values(sectors)))

 // Initial scan on component mount
 useEffect(() => {
   scanStocks()
   // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [activeIndex])

 return (
   <div className="container mx-auto p-4">
     <div className="flex flex-col space-y-4">
       <h1 className="text-2xl font-bold text-slate-100">Market Scanner</h1>

       <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
         <TabsList className="grid w-full grid-cols-7 bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
           <TabsTrigger value="scanner">Scanner</TabsTrigger>
           <TabsTrigger value="scan30">Scan 30</TabsTrigger>
           <TabsTrigger value="65-200">65/200</TabsTrigger>
           <TabsTrigger value="rmat">RMAT</TabsTrigger>
           <TabsTrigger value="tbt">TBT</TabsTrigger>
           <TabsTrigger value="dbdt">DB/DT</TabsTrigger>
           <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
         </TabsList>

         <TabsContent value="scanner" className="space-y-4">
           <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
             <CardHeader className="py-4 px-6 border-b border-cyan-500/20">
               <div className="flex items-center justify-between">
                 <CardTitle className="text-cyan-100">Market Scanner</CardTitle>
                 <div className="flex items-center space-x-2">
                   <Select value={activeIndex} onValueChange={setActiveIndex}>
                     <SelectTrigger className="w-[180px] bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-white">
                       <SelectValue placeholder="Select Index" />
                     </SelectTrigger>
                     <SelectContent className="bg-[rgba(26,31,45,0.95)] border-cyan-500/20 text-white">
                       <SelectItem value="S&P 500">S&P 500</SelectItem>
                       <SelectItem value="Nasdaq 100">Nasdaq 100</SelectItem>
                       <SelectItem value="Dow Jones">Dow Jones</SelectItem>
                     </SelectContent>
                   </Select>
                   <Button
                     variant="outline"
                     size="sm"
                     className="h-10 bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-cyan-100"
                     onClick={scanStocks}
                     disabled={isScanning}
                   >
                     <RefreshCw className={`h-4 w-4 mr-2 ${isScanning ? "animate-spin" : ""}`} />
                     {isScanning ? "Scanning..." : "Scan Now"}
                   </Button>
                 </div>
               </div>
             </CardHeader>
             <CardContent className="p-6">
               <div className="space-y-4">
                 {/* Filter Controls */}
                 <div className="flex flex-col md:flex-row gap-4 bg-[rgba(10,14,23,0.7)] p-4 rounded-lg border border-cyan-500/20">
                   <div className="flex-1">
                     <label className="text-sm text-gray-400 mb-1 block">Price Change</label>
                     <Select
                       value={scanCriteria.priceChange}
                       onValueChange={(value) => setScanCriteria({ ...scanCriteria, priceChange: value as any })}
                     >
                       <SelectTrigger className="w-full bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-white">
                         <SelectValue placeholder="Any" />
                       </SelectTrigger>
                       <SelectContent className="bg-[rgba(26,31,45,0.95)] border-cyan-500/20 text-white">
                         <SelectItem value="any">Any</SelectItem>
                         <SelectItem value="positive">Positive</SelectItem>
                         <SelectItem value="negative">Negative</SelectItem>
                         <SelectItem value="above5">Above +5%</SelectItem>
                         <SelectItem value="below-5">Below -5%</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>
                   <div className="flex-1">
                     <label className="text-sm text-gray-400 mb-1 block">Volume</label>
                     <Select
                       value={scanCriteria.volume}
                       onValueChange={(value) => setScanCriteria({ ...scanCriteria, volume: value as any })}
                     >
                       <SelectTrigger className="w-full bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-white">
                         <SelectValue placeholder="Any" />
                       </SelectTrigger>
                       <SelectContent className="bg-[rgba(26,31,45,0.95)] border-cyan-500/20 text-white">
                         <SelectItem value="any">Any</SelectItem>
                         <SelectItem value="high">High</SelectItem>
                         <SelectItem value="low">Low</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>
                   <div className="flex-1">
                     <label className="text-sm text-gray-400 mb-1 block">Sector</label>
                     <Select
                       value={scanCriteria.sector}
                       onValueChange={(value) => setScanCriteria({ ...scanCriteria, sector: value })}
                     >
                       <SelectTrigger className="w-full bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-white">
                         <SelectValue placeholder="Any" />
                       </SelectTrigger>
                       <SelectContent className="bg-[rgba(26,31,45,0.95)] border-cyan-500/20 text-white">
                         <SelectItem value="any">Any</SelectItem>
                         {uniqueSectors.sort().map((sector) => (
                           <SelectItem key={sector} value={sector}>
                             {sector}
                           </SelectItem>
                         ))}
                       </SelectContent>
                     </Select>
                   </div>
                   <div className="flex-1">
                     <label className="text-sm text-gray-400 mb-1 block">Signal</label>
                     <Select
                       value={scanCriteria.signal}
                       onValueChange={(value) => setScanCriteria({ ...scanCriteria, signal: value as any })}
                     >
                       <SelectTrigger className="w-full bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-white">
                         <SelectValue placeholder="Any" />
                       </SelectTrigger>
                       <SelectContent className="bg-[rgba(26,31,45,0.95)] border-cyan-500/20 text-white">
                         <SelectItem value="any">Any</SelectItem>
                         <SelectItem value="buy">Buy</SelectItem>
                         <SelectItem value="sell">Sell</SelectItem>
                         <SelectItem value="watch">Watch</SelectItem>
                         <SelectItem value="hold">Hold</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>
                   <div className="flex items-end">
                     <Button
                       className="w-full bg-cyan-600 hover:bg-cyan-700"
                       onClick={scanStocks}
                       disabled={isScanning}
                     >
                       <Filter className="h-4 w-4 mr-2" />
                       Apply Filters
                     </Button>
                   </div>
                 </div>

                 {/* Search */}
                 <div className="relative">
                   <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                   <Input
                     placeholder="Search by symbol or company name..."
                     className="pl-10 bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-white"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                   />
                 </div>

                 {/* Results Table */}
                 <div className="rounded-lg border border-cyan-500/20 overflow-hidden">
                   <div className="overflow-x-auto">
                     <table className="w-full text-sm">
                       <thead className="bg-[rgba(10,14,23,0.7)] text-gray-400">
                         <tr>
                           <th className="px-4 py-3 text-left">Symbol</th>
                           <th className="px-4 py-3 text-left">Company</th>
                           <th className="px-4 py-3 text-right">Price</th>
                           <th className="px-4 py-3 text-right">Change</th>
                           <th className="px-4 py-3 text-left">Sector</th>
                           <th className="px-4 py-3 text-left">Market Cap</th>
                           <th className="px-4 py-3 text-left">Signal</th>
                           <th className="px-4 py-3 text-center">Action</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-cyan-500/30">
                         {isLoading ? (
                           // Loading skeletons
                           Array.from({ length: 10 }).map((_, index) => (
                             <tr key={index} className="bg-[rgba(10,14,23,0.5)]">
                               <td className="px-4 py-3">
                                 <Skeleton className="h-4 w-16 bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3">
                                 <Skeleton className="h-4 w-40 bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3 text-right">
                                 <Skeleton className="h-4 w-20 ml-auto bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3 text-right">
                                 <Skeleton className="h-4 w-20 ml-auto bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3">
                                 <Skeleton className="h-4 w-24 bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3">
                                 <Skeleton className="h-4 w-16 bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3">
                                 <Skeleton className="h-4 w-16 bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3 text-center">
                                 <Skeleton className="h-8 w-8 mx-auto rounded-full bg-[rgba(26,31,45,0.8)]" />
                               </td>
                             </tr>
                           ))
                         ) : filteredScanResults.length > 0 ? (
                           filteredScanResults.map((stock) => (
                             <tr key={stock.symbol} className="bg-[rgba(10,14,23,0.5)] hover:bg-[rgba(10,14,23,0.7)]">
                               <td className="px-4 py-3 font-medium text-cyan-100">{stock.symbol}</td>
                               <td className="px-4 py-3 text-gray-300">{stock.name}</td>
                               <td className="px-4 py-3 text-right font-mono text-cyan-100">
                                 ${stock.price.toFixed(2)}
                               </td>
                               <td className="px-4 py-3 text-right">
                                 <div
                                   className={`flex items-center justify-end ${stock.changePercent >= 0 ? "text-green-400" : "text-red-400"}`}
                                 >
                                   {stock.changePercent >= 0 ? (
                                     <ArrowUp className="h-3 w-3 mr-1" />
                                   ) : (
                                     <ArrowDown className="h-3 w-3 mr-1" />
                                   )}
                                   {stock.changePercent.toFixed(2)}%
                                 </div>
                               </td>
                               <td className="px-4 py-3 text-gray-300">{stock.sector}</td>
                               <td className="px-4 py-3 text-gray-300">{stock.marketCap}</td>
                               <td className="px-4 py-3">
                                 <Badge
                                   className={`
                                   ${
                                     stock.signal === "buy"
                                       ? "bg-green-500/20 text-green-400"
                                       : stock.signal === "sell"
                                         ? "bg-red-500/20 text-red-400"
                                         : "bg-yellow-500/20 text-yellow-400"
                                   }
                                 `}
                                 >
                                   {stock.signal?.toUpperCase()}{" "}
                                   {stock.strength === "strong" ? "++" : stock.strength === "moderate" ? "+" : ""}
                                 </Badge>
                               </td>
                               <td className="px-4 py-3 text-center">
                                 <Button
                                   variant="ghost"
                                   size="icon"
                                   className="h-8 w-8 text-gray-400 hover:text-cyan-400 hover:bg-[rgba(10,14,23,0.7)]"
                                   onClick={() => addToWatchlist(stock)}
                                   title="Add to Watchlist"
                                 >
                                   <Plus className="h-4 w-4" />
                                 </Button>
                               </td>
                             </tr>
                           ))
                         ) : (
                           <tr className="bg-[rgba(10,14,23,0.5)]">
                             <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                               No stocks found matching your criteria. Try adjusting your filters.
                             </td>
                           </tr>
                         )}
                       </tbody>
                     </table>
                   </div>
                 </div>
               </div>
             </CardContent>
           </Card>
         </TabsContent>

         <TabsContent value="scan30" className="space-y-4">
           <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
             <CardHeader className="py-4 px-6 border-b border-cyan-500/20">
               <div className="flex items-center justify-between">
                 <CardTitle className="text-cyan-100">Candlestick Pattern Scanner</CardTitle>
                 <div className="flex items-center space-x-2">
                   <Select value={patternType} onValueChange={setPatternType}>
                     <SelectTrigger className="w-[180px] bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-white">
                       <SelectValue placeholder="Select Pattern Type" />
                     </SelectTrigger>
                     <SelectContent className="bg-[rgba(26,31,45,0.95)] border-cyan-500/20 text-white">
                       <SelectItem value="all">All Patterns</SelectItem>
                       <SelectItem value="bullish">Bullish Patterns</SelectItem>
                       <SelectItem value="bearish">Bearish Patterns</SelectItem>
                     </SelectContent>
                   </Select>
                   <Button
                     variant="outline"
                     size="sm"
                     className="h-10 bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-cyan-100"
                     onClick={scanForPatterns}
                     disabled={isPatternScanning}
                   >
                     <RefreshCw className={`h-4 w-4 mr-2 ${isPatternScanning ? "animate-spin" : ""}`} />
                     {isPatternScanning ? "Scanning..." : "Scan Now"}
                   </Button>
                 </div>
               </div>
             </CardHeader>
             <CardContent className="p-6">
               <div className="space-y-4">
                 {/* Search */}
                 <div className="relative">
                   <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                   <Input
                     placeholder="Search by symbol or company name..."
                     className="pl-10 bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-white"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                   />
                 </div>

                 {/* Results Table */}
                 <div className="rounded-lg border border-cyan-500/20 overflow-hidden">
                   <div className="overflow-x-auto">
                     <table className="w-full text-sm">
                       <thead className="bg-[rgba(10,14,23,0.7)] text-gray-400">
                         <tr>
                           <th className="px-4 py-3 text-left">Symbol</th>
                           <th className="px-4 py-3 text-left">Company</th>
                           <th className="px-4 py-3 text-left">Pattern</th>
                           <th className="px-4 py-3 text-left">Timeframe</th>
                           <th className="px-4 py-3 text-right">Confidence</th>
                           <th className="px-4 py-3 text-right">Price</th>
                           <th className="px-4 py-3 text-right">Target</th>
                           <th className="px-4 py-3 text-center">Action</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-cyan-500/30">
                         {isPatternScanning ? (
                           // Loading skeletons
                           Array.from({ length: 10 }).map((_, index) => (
                             <tr key={index} className="bg-[rgba(10,14,23,0.5)]">
                               <td className="px-4 py-3">
                                 <Skeleton className="h-4 w-16 bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3">
                                 <Skeleton className="h-4 w-40 bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3">
                                 <Skeleton className="h-4 w-24 bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3">
                                 <Skeleton className="h-4 w-16 bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3 text-right">
                                 <Skeleton className="h-4 w-16 ml-auto bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3 text-right">
                                 <Skeleton className="h-4 w-20 ml-auto bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3 text-right">
                                 <Skeleton className="h-4 w-20 ml-auto bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3 text-center">
                                 <Skeleton className="h-8 w-8 mx-auto rounded-full bg-[rgba(26,31,45,0.8)]" />
                               </td>
                             </tr>
                           ))
                         ) : filteredPatternResults.length > 0 ? (
                           filteredPatternResults.map((pattern) => (
                             <tr key={pattern.symbol} className="bg-[rgba(10,14,23,0.5)] hover:bg-[rgba(10,14,23,0.7)]">
                               <td className="px-4 py-3 font-medium text-cyan-100">{pattern.symbol}</td>
                               <td className="px-4 py-3 text-gray-300">{pattern.name}</td>
                               <td className="px-4 py-3 text-gray-300">
                                 {pattern.pattern} ({pattern.candlesAway} away)
                               </td>
                               <td className="px-4 py-3 text-gray-300">{pattern.timeframe}</td>
                               <td className="px-4 py-3 text-right text-gray-300">{pattern.confidence}%</td>
                               <td className="px-4 py-3 text-right font-mono text-cyan-100">
                                 ${pattern.currentPrice.toFixed(2)}
                               </td>
                               <td className="px-4 py-3 text-right font-mono text-green-400">
                                 ${pattern.targetPrice.toFixed(2)}
                               </td>
                               <td className="px-4 py-3 text-center">
                                 <Button
                                   variant="ghost"
                                   size="icon"
                                   className="h-8 w-8 text-gray-400 hover:text-cyan-400 hover:bg-[rgba(10,14,23,0.7)]"
                                   onClick={() => {
                                     // Add to watchlist logic here
                                   }}
                                   title="Add to Watchlist"
                                 >
                                   <Plus className="h-4 w-4" />
                                 </Button>
                               </td>
                             </tr>
                           ))
                         ) : (
                           <tr className="bg-[rgba(10,14,23,0.5)]">
                             <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                               No patterns found matching your criteria.
                             </td>
                           </tr>
                         )}
                       </tbody>
                     </table>
                   </div>
                 </div>
               </div>
             </CardContent>
           </Card>
         </TabsContent>

         <TabsContent value="65-200" className="space-y-4">
           <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
             <CardHeader className="py-4 px-6 border-b border-cyan-500/20">
               <div className="flex items-center justify-between">
                 <CardTitle className="text-cyan-100">EMA (65/200) & RSI Scanner</CardTitle>
                 <div className="flex items-center space-x-2">
                   <Select value={emaRsiSignalType} onValueChange={setEmaRsiSignalType}>
                     <SelectTrigger className="w-[180px] bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-white">
                       <SelectValue placeholder="Select Signal Type" />
                     </SelectTrigger>
                     <SelectContent className="bg-[rgba(26,31,45,0.95)] border-cyan-500/20 text-white">
                       <SelectItem value="all">All Signals</SelectItem>
                       <SelectItem value="bullish">Bullish Signals</SelectItem>
                       <SelectItem value="bearish">Bearish Signals</SelectItem>
                     </SelectContent>
                   </Select>
                   <Button
                     variant="outline"
                     size="sm"
                     className="h-10 bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-cyan-100"
                     onClick={scanForEmaRsi}
                     disabled={isEmaRsiScanning}
                   >
                     <RefreshCw className={`h-4 w-4 mr-2 ${isEmaRsiScanning ? "animate-spin" : ""}`} />
                     {isEmaRsiScanning ? "Scanning..." : "Scan Now"}
                   </Button>
                 </div>
               </div>
             </CardHeader>
             <CardContent className="p-6">
               <div className="space-y-4">
                 {/* Filter Controls */}
                 <div className="flex flex-col md:flex-row gap-4 bg-[rgba(10,14,23,0.7)] p-4 rounded-lg border border-cyan-500/20">
                   <div className="flex-1">
                     <label className="text-sm text-gray-400 mb-1 block">Min. Deviation</label>
                     <Input
                       type="number"
                       placeholder="e.g., 2.0"
                       value={minDeviation.toString()}
                       onChange={(e) => setMinDeviation(Number(e.target.value))}
                       className="bg-[rgba(10,14,23,0.7)] text-white border-cyan-500/20"
                     />
                   </div>
                   <div className="flex-1">
                     <label className="text-sm text-gray-400 mb-1 block">Sector</label>
                     <Select
                       value={scanCriteria.sector}
                       onValueChange={(value) => setScanCriteria({ ...scanCriteria, sector: value })}
                     >
                       <SelectTrigger className="w-full bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-white">
                         <SelectValue placeholder="Any" />
                       </SelectTrigger>
                       <SelectContent className="bg-[rgba(26,31,45,0.95)] border-cyan-500/20 text-white">
                         <SelectItem value="any">Any</SelectItem>
                         {uniqueSectors.sort().map((sector) => (
                           <SelectItem key={sector} value={sector}>
                             {sector}
                           </SelectItem>
                         ))}
                       </SelectContent>
                     </Select>
                   </div>
                   <div className="flex items-end">
                     <Button
                       className="w-full bg-cyan-600 hover:bg-cyan-700"
                       onClick={scanForEmaRsi}
                       disabled={isEmaRsiScanning}
                     >
                       <Filter className="h-4 w-4 mr-2" />
                       Apply Filters
                     </Button>
                   </div>
                 </div>

                 {/* Search */}
                 <div className="relative">
                   <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                   <Input
                     placeholder="Search by symbol or company name..."
                     className="pl-10 bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-white"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                   />
                 </div>

                 {/* Results Table */}
                 <div className="rounded-lg border border-cyan-500/20 overflow-hidden">
                   <div className="overflow-x-auto">
                     <table className="w-full text-sm">
                       <thead className="bg-[rgba(10,14,23,0.7)] text-gray-400">
                         <tr>
                           <th className="px-4 py-3 text-left">Symbol</th>
                           <th className="px-4 py-3 text-left">Company</th>
                           <th className="px-4 py-3 text-right">Price</th>
                           <th className="px-4 py-3 text-right">EMA (65)</th>
                           <th className="px-4 py-3 text-right">EMA (200)</th>
                           <th className="px-4 py-3 text-right">RSI (14)</th>
                           <th className="px-4 py-3 text-right">Deviation</th>
                           <th className="px-4 py-3 text-left">Sector</th>
                           <th className="px-4 py-3 text-left">Signal</th>
                           <th className="px-4 py-3 text-center">Action</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-cyan-500/30">
                         {isEmaRsiScanning ? (
                           // Loading skeletons
                           Array.from({ length: 10 }).map((_, index) => (
                             <tr key={index} className="bg-[rgba(10,14,23,0.5)]">
                               <td className="px-4 py-3">
                                 <Skeleton className="h-4 w-16 bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3">
                                 <Skeleton className="h-4 w-40 bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3 text-right">
                                 <Skeleton className="h-4 w-20 ml-auto bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3 text-right">
                                 <Skeleton className="h-4 w-20 ml-auto bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3 text-right">
                                 <Skeleton className="h-4 w-20 ml-auto bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3 text-right">
                                 <Skeleton className="h-4 w-20 ml-auto bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3 text-right">
                                 <Skeleton className="h-4 w-20 ml-auto bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3">
                                 <Skeleton className="h-4 w-24 bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3">
                                 <Skeleton className="h-4 w-16 bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3 text-center">
                                 <Skeleton className="h-8 w-8 mx-auto rounded-full bg-[rgba(26,31,45,0.8)]" />
                               </td>
                             </tr>
                           ))
                         ) : filteredEmaRsiResults.length > 0 ? (
                           filteredEmaRsiResults.map((result) => (
                             <tr key={result.symbol} className="bg-[rgba(10,14,23,0.5)] hover:bg-[rgba(10,14,23,0.7)]">
                               <td className="px-4 py-3 font-medium text-cyan-100">{result.symbol}</td>
                               <td className="px-4 py-3 text-gray-300">{result.name}</td>
                               <td className="px-4 py-3 text-right font-mono text-cyan-100">
                                 ${result.currentPrice.toFixed(2)}
                               </td>
                               <td className="px-4 py-3 text-right font-mono text-gray-300">
                                 ${result.ema65.toFixed(2)}
                               </td>
                               <td className="px-4 py-3 text-right font-mono text-gray-300">
                                 ${result.ema200.toFixed(2)}
                               </td>
                               <td className="px-4 py-3 text-right text-gray-300">{result.rsi.toFixed(2)}</td>
                               <td className="px-4 py-3 text-right text-gray-300">{result.deviation.toFixed(2)}</td>
                               <td className="px-4 py-3 text-gray-300">{result.sector}</td>
                               <td className="px-4 py-3">
                                 <Badge
                                   className={`
                                   ${
                                     result.signal === "bullish"
                                       ? "bg-green-500/20 text-green-400"
                                       : result.signal === "bearish"
                                         ? "bg-red-500/20 text-red-400"
                                         : "bg-yellow-500/20 text-yellow-400"
                                   }
                                 `}
                                 >
                                   {result.signal === "bullish" ? "Bullish" : result.signal === "bearish" ? "Bearish" : "Neutral"}
                                 </Badge>
                               </td>
                               <td className="px-4 py-3 text-center">
                                 <Button
                                   variant="ghost"
                                   size="icon"
                                   className="h-8 w-8 text-gray-400 hover:text-cyan-400 hover:bg-[rgba(10,14,23,0.7)]"
                                   onClick={() => addEmaRsiToWatchlist(result)}
                                   title="Add to Watchlist"
                                 >
                                   <Plus className="h-4 w-4" />
                                 </Button>
                               </td>
                             </tr>
                           ))
                         ) : (
                           <tr className="bg-[rgba(10,14,23,0.5)]">
                             <td colSpan={10} className="px-4 py-8 text-center text-gray-400">
                               No EMA/RSI setups found matching your criteria.
                             </td>
                           </tr>
                         )}
                       </tbody>
                     </table>
                   </div>
                 </div>
               </div>
             </CardContent>
           </Card>
         </TabsContent>

         <TabsContent value="rmat" className="space-y-4">
           <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
             <CardHeader className="py-4 px-6 border-b border-cyan-500/20">
               <div className="flex items-center justify-between">
                 <CardTitle className="text-cyan-100">Regular Moving Average Trade (RMAT) Scanner</CardTitle>
                 <div className="flex items-center space-x-2">
                   <Button
                     variant="outline"
                     size="sm"
                     className="h-10 bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-cyan-100"
                     onClick={scanForRmat}
                     disabled={isRmatScanning}
                   >
                     <RefreshCw className={`h-4 w-4 mr-2 ${isRmatScanning ? "animate-spin" : ""}`} />
                     {isRmatScanning ? "Scanning..." : "Scan Now"}
                   </Button>
                 </div>
               </div>
             </CardHeader>
             <CardContent className="p-6">
               <div className="space-y-4">
                 {/* Filter Controls */}
                 <div className="flex flex-col md:flex-row gap-4 bg-[rgba(10,14,23,0.7)] p-4 rounded-lg border border-cyan-500/20">
                   <div className="flex-1">
                     <label className="text-sm text-gray-400 mb-1 block">Min. Distance</label>
                     <Input
                       type="number"
                       placeholder="e.g., 1.0"
                       className="bg-[rgba(10,14,23,0.7)] text-white border-cyan-500/20"
                     />
                   </div>
                   <div className="flex-1">
                     <label className="text-sm text-gray-400 mb-1 block">Max. Distance</label>
                     <Input
                       type="number"
                       placeholder="e.g., 1.5"
                       className="bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-white"
                     />
                   </div>
                   <div className="flex-1">
                     <label className="text-sm text-gray-400 mb-1 block">Sector</label>
                     <Select
                       value={rmatCriteria.sector}
                       onValueChange={(value) => setRmatCriteria({ ...rmatCriteria, sector: value })}
                     >
                       <SelectTrigger className="w-full bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-white">
                         <SelectValue placeholder="Any" />
                       </SelectTrigger>
                       <SelectContent className="bg-[rgba(26,31,45,0.95)] border-cyan-500/20 text-white">
                         <SelectItem value="any">Any</SelectItem>
                         {uniqueSectors.sort().map((sector) => (
                           <SelectItem key={sector} value={sector}>
                             {sector}
                           </SelectItem>
                         ))}
                       </SelectContent>
                     </Select>
                   </div>
                   <div className="flex-1">
                     <label className="text-sm text-gray-400 mb-1 block">Signal</label>
                     <Select
                       value={rmatCriteria.signal}
                       onValueChange={(value) => setRmatCriteria({ ...rmatCriteria, signal: value as any })}
                     >
                       <SelectTrigger className="w-full bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-white">
                         <SelectValue placeholder="Any" />
                       </SelectTrigger>
                       <SelectContent className="bg-[rgba(26,31,45,0.95)] border-cyan-500/20 text-white">
                         <SelectItem value="any">Any</SelectItem>
                         <SelectItem value="ema65">EMA (65)</SelectItem>
                         <SelectItem value="ema200">EMA (200)</SelectItem>
                         <SelectItem value="pivot">Pivot</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>
                   <div className="flex items-end">
                     <Button
                       className="w-full bg-cyan-600 hover:bg-cyan-700"
                       onClick={scanForRmat}
                       disabled={isRmatScanning}
                     >
                       <Filter className="h-4 w-4 mr-2" />
                       Apply Filters
                     </Button>
                   </div>
                 </div>

                 {/* Search */}
                 <div className="relative">
                   <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                   <Input
                     placeholder="Search by symbol or company name..."
                     className="pl-10 bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-white"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                   />
                 </div>

                 {/* Results Table */}
                 <div className="rounded-lg border border-cyan-500/20 overflow-hidden">
                   <div className="overflow-x-auto">
                     <table className="w-full text-sm">
                       <thead className="bg-[rgba(10,14,23,0.7)] text-gray-400">
                         <tr>
                           <th className="px-4 py-3 text-left">Symbol</th>
                           <th className="px-4 py-3 text-left">Company</th>
                           <th className="px-4 py-3 text-right">Price</th>
                           <th className="px-4 py-3 text-right">EMA (65)</th>
                           <th className="px-4 py-3 text-right">EMA (200)</th>
                           <th className="px-4 py-3 text-right">Pivot</th>
                           <th className="px-4 py-3 text-left">Sector</th>
                           <th className="px-4 py-3 text-left">Signal</th>
                           <th className="px-4 py-3 text-center">Action</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-cyan-500/30">
                         {isRmatScanning ? (
                           // Loading skeletons
                           Array.from({ length: 10 }).map((_, index) => (
                             <tr key={index} className="bg-[rgba(10,14,23,0.5)]">
                               <td className="px-4 py-3">
                                 <Skeleton className="h-4 w-16 bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3">
                                 <Skeleton className="h-4 w-40 bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3 text-right">
                                 <Skeleton className="h-4 w-20 ml-auto bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3 text-right">
                                 <Skeleton className="h-4 w-20 ml-auto bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3 text-right">
                                 <Skeleton className="h-4 w-20 ml-auto bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3 text-right">
                                 <Skeleton className="h-4 w-20 ml-auto bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3">
                                 <Skeleton className="h-4 w-24 bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3">
                                 <Skeleton className="h-4 w-16 bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3 text-center">
                                 <Skeleton className="h-8 w-8 mx-auto rounded-full bg-[rgba(26,31,45,0.8)]" />
                               </td>
                             </tr>
                           ))
                         ) : filteredRmatResults.length > 0 ? (
                           filteredRmatResults.map((result) => (
                             <tr key={result.symbol} className="bg-[rgba(10,14,23,0.5)] hover:bg-[rgba(10,14,23,0.7)]">
                               <td className="px-4 py-3 font-medium text-cyan-100">{result.symbol}</td>
                               <td className="px-4 py-3 text-gray-300">{result.name}</td>
                               <td className="px-4 py-3 text-right font-mono text-cyan-100">
                                 ${result.currentPrice.toFixed(2)}
                               </td>
                               <td className="px-4 py-3 text-right font-mono text-gray-300">
                                 ${result.ema65.toFixed(2)}
                               </td>
                               <td className="px-4 py-3 text-right font-mono text-gray-300">
                                 ${result.ema200.toFixed(2)}
                               </td>
                               <td className="px-4 py-3 text-right font-mono text-gray-300">
                                 ${result.nearestPivot.toFixed(2)}
                               </td>
                               <td className="px-4 py-3 text-gray-300">{result.sector}</td>
                               <td className="px-4 py-3">
                                 <Badge
                                   className={`
                                   ${
                                     result.signal === "ema65"
                                       ? "bg-green-500/20 text-green-400"
                                       : result.signal === "ema200"
                                         ? "bg-red-500/20 text-red-400"
                                         : "bg-yellow-500/20 text-yellow-400"
                                   }
                                 `}
                                 >
                                   {result.signal?.toUpperCase()}
                                 </Badge>
                               </td>
                               <td className="px-4 py-3 text-center">
                                 <Button
                                   variant="ghost"
                                   size="icon"
                                   className="h-8 w-8 text-gray-400 hover:text-cyan-400 hover:bg-[rgba(10,14,23,0.7)]"
                                   onClick={() => addRmatToWatchlist(result)}
                                   title="Add to Watchlist"
                                 >
                                   <Plus className="h-4 w-4" />
                                 </Button>
                               </td>
                             </tr>
                           ))
                         ) : (
                           <tr className="bg-[rgba(10,14,23,0.5)]">
                             <td colSpan={9} className="px-4 py-8 text-center text-gray-400">
                               No RMAT setups found matching your criteria.
                             </td>
                           </tr>
                         )}
                       </tbody>
                     </table>
                   </div>
                 </div>
               </div>
             </CardContent>
           </Card>
         </TabsContent>

         <TabsContent value="tbt" className="space-y-4">
           <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
             <CardHeader className="py-4 px-6 border-b border-cyan-500/20">
               <div className="flex items-center justify-between">
                 <CardTitle className="text-cyan-100">Base Trade (TBT) Scanner</CardTitle>
                 <div className="flex items-center space-x-2">
                   <Button
                     variant="outline"
                     size="sm"
                     className="h-10 bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-cyan-100"
                     onClick={scanForTbt}
                     disabled={isTbtScanning}
                   >
                     <RefreshCw className={`h-4 w-4 mr-2 ${isTbtScanning ? "animate-spin" : ""}`} />
                     {isTbtScanning ? "Scanning..." : "Scan Now"}
                   </Button>
                 </div>
               </div>
             </CardHeader>
             <CardContent className="p-6">
               <div className="space-y-4">
                 {/* Filter Controls */}
                 <div className="flex flex-col md:flex-row gap-4 bg-[rgba(10,14,23,0.7)] p-4 rounded-lg border border-cyan-500/20">
                   <div className="flex-1">
                     <label className="text-sm text-gray-400 mb-1 block">Min. Sideways Minutes</label>
                     <Input
                       type="number"
                       placeholder="e.g., 30"
                       className="bg-[rgba(10,14,23,0.7)] text-white border-cyan-500/20"
                     />
                   </div>
                   <div className="flex-1">
                     <label className="text-sm text-gray-400 mb-1 block">Max. Range Width</label>
                     <Input
                       type="number"
                       placeholder="e.g., 0.5"
                       className="bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-white"
                     />
                   </div>
                   <div className="flex-1">
                     <label className="text-sm text-gray-400 mb-1 block">Sector</label>
                     <Select
                       value={tbtCriteria.sector}
                       onValueChange={(value) => setTbtCriteria({ ...tbtCriteria, sector: value })}
                     >
                       <SelectTrigger className="w-full bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-white">
                         <SelectValue placeholder="Any" />
                       </SelectTrigger>
                       <SelectContent className="bg-[rgba(26,31,45,0.95)] border-cyan-500/20 text-white">
                         <SelectItem value="any">Any</SelectItem>
                         {uniqueSectors.sort().map((sector) => (
                           <SelectItem key={sector} value={sector}>
                             {sector}
                           </SelectItem>
                         ))}
                       </SelectContent>
                     </Select>
                   </div>
                   <div className="flex-1">
                     <label className="text-sm text-gray-400 mb-1 block">Breakout Direction</label>
                     <Select
                       value={tbtCriteria.breakoutDirection}
                       onValueChange={(value) => setTbtCriteria({ ...tbtCriteria, breakoutDirection: value as any })}
                     >
                       <SelectTrigger className="w-full bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-white">
                         <SelectValue placeholder="Any" />
                       </SelectTrigger>
                       <SelectContent className="bg-[rgba(26,31,45,0.95)] border-cyan-500/20 text-white">
                         <SelectItem value="any">Any</SelectItem>
                         <SelectItem value="bullish">Bullish</SelectItem>
                         <SelectItem value="bearish">Bearish</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>
                   <div className="flex items-end">
                     <Button
                       className="w-full bg-cyan-600 hover:bg-cyan-700"
                       onClick={scanForTbt}
                       disabled={isTbtScanning}
                     >
                       <Filter className="h-4 w-4 mr-2" />
                       Apply Filters
                     </Button>
                   </div>
                 </div>

                 {/* Search */}
                 <div className="relative">
                   <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                   <Input
                     placeholder="Search by symbol or company name..."
                     className="pl-10 bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-white"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                   />
                 </div>

                 {/* Results Table */}
                 <div className="rounded-lg border border-cyan-500/20 overflow-hidden">
                   <div className="overflow-x-auto">
                     <table className="w-full text-sm">
                       <thead className="bg-[rgba(10,14,23,0.7)] text-gray-400">
                         <tr>
                           <th className="px-4 py-3 text-left">Symbol</th>
                           <th className="px-4 py-3 text-left">Company</th>
                           <th className="px-4 py-3 text-right">Price</th>
                           <th className="px-4 py-3 text-right">Sideways (min)</th>
                           <th className="px-4 py-3 text-right">Range Width</th>
                           <th className="px-4 py-3 text-left">Sector</th>
                           <th className="px-4 py-3 text-left">Breakout</th>
                           <th className="px-4 py-3 text-center">Action</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-cyan-500/30">
                         {isTbtScanning ? (
                           // Loading skeletons
                           Array.from({ length: 10 }).map((_, index) => (
                             <tr key={index} className="bg-[rgba(10,14,23,0.5)]">
                               <td className="px-4 py-3">
                                 <Skeleton className="h-4 w-16 bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3">
                                 <Skeleton className="h-4 w-40 bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3 text-right">
                                 <Skeleton className="h-4 w-20 ml-auto bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3 text-right">
                                 <Skeleton className="h-4 w-20 ml-auto bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3 text-right">
                                 <Skeleton className="h-4 w-20 ml-auto bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3">
                                 <Skeleton className="h-4 w-24 bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3">
                                 <Skeleton className="h-4 w-16 bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3 text-center">
                                 <Skeleton className="h-8 w-8 mx-auto rounded-full bg-[rgba(26,31,45,0.8)]" />
                               </td>
                             </tr>
                           ))
                         ) : filteredTbtResults.length > 0 ? (
                           filteredTbtResults.map((result) => (
                             <tr key={result.symbol} className="bg-[rgba(10,14,23,0.5)] hover:bg-[rgba(10,14,23,0.7)]">
                               <td className="px-4 py-3 font-medium text-cyan-100">{result.symbol}</td>
                               <td className="px-4 py-3 text-gray-300">{result.name}</td>
                               <td className="px-4 py-3 text-right font-mono text-cyan-100">
                                 ${result.currentPrice.toFixed(2)}
                               </td>
                               <td className="px-4 py-3 text-right text-gray-300">{result.sidewaysMinutes}</td>
                               <td className="px-4 py-3 text-right text-gray-300">{result.sidewaysRange.toFixed(2)}</td>
                               <td className="px-4 py-3 text-gray-300">{result.sector}</td>
                               <td className="px-4 py-3">
                                 {result.breakoutDirection !== "none" ? (
                                   <Badge
                                     className={`
                                     ${
                                       result.breakoutDirection === "bullish"
                                         ? "bg-green-500/20 text-green-400"
                                         : "bg-red-500/20 text-red-400"
                                     }
                                   `}
                                   >
                                     {result.breakoutDirection.toUpperCase()}
                                     {result.breakoutStrength === "strong"
                                       ? "++"
                                       : result.breakoutStrength === "moderate"
                                         ? "+"
                                         : ""}
                                   </Badge>
                                 ) : (
                                   <Badge>None</Badge>
                                 )}
                               </td>
                               <td className="px-4 py-3 text-center">
                                 <Button
                                   variant="ghost"
                                   size="icon"
                                   className="h-8 w-8 text-gray-400 hover:text-cyan-400 hover:bg-[rgba(10,14,23,0.7)]"
                                   onClick={() => addTbtToWatchlist(result)}
                                   title="Add to Watchlist"
                                 >
                                   <Plus className="h-4 w-4" />
                                 </Button>
                               </td>
                             </tr>
                           ))
                         ) : (
                           <tr className="bg-[rgba(10,14,23,0.5)]">
                             <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                               No Base Trade setups found matching your criteria.
                             </td>
                           </tr>
                         )}
                       </tbody>
                     </table>
                   </div>
                 </div>
               </div>
             </CardContent>
           </Card>
         </TabsContent>

         <TabsContent value="dbdt" className="space-y-4">
           <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
             <CardHeader className="py-4 px-6 border-b border-cyan-500/20">
               <div className="flex items-center justify-between">
                 <CardTitle className="text-cyan-100">Double Top/Bottom (DB/DT) Scanner</CardTitle>
                 <div className="flex items-center space-x-2">
                   <Button
                     variant="outline"
                     size="sm"
                     className="h-10 bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-cyan-100"
                     onClick={scanForDbDt}
                     disabled={isDbDtScanning}
                   >
                     <RefreshCw className={`h-4 w-4 mr-2 ${isDbDtScanning ? "animate-spin" : ""}`} />
                     {isDbDtScanning ? "Scanning..." : "Scan Now"}
                   </Button>
                 </div>
               </div>
             </CardHeader>
             <CardContent className="p-6">
               <div className="space-y-4">
                 {/* Filter Controls */}
                 <div className="flex flex-col md:flex-row gap-4 bg-[rgba(10,14,23,0.7)] p-4 rounded-lg border border-cyan-500/20">
                   <div className="flex-1">
                     <label className="text-sm text-gray-400 mb-1 block">Min. Distance</label>
                     <Input
                       type="number"
                       placeholder="e.g., 1.0"
                       className="bg-[rgba(10,14,23,0.7)] text-white border-cyan-500/20"
                     />
                   </div>
                   <div className="flex-1">
                     <label className="text-sm text-gray-400 mb-1 block">Pattern Type</label>
                     <Select
                       value={dbDtCriteria.patternType}
                       onValueChange={(value) => setDbDtCriteria({ ...dbDtCriteria, patternType: value as any })}
                     >
                       <SelectTrigger className="w-full bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-white">
                         <SelectValue placeholder="Any" />
                       </SelectTrigger>
                       <SelectContent className="bg-[rgba(26,31,45,0.95)] border-cyan-500/20 text-white">
                         <SelectItem value="any">Any</SelectItem>
                         <SelectItem value="double-top">Double Top</SelectItem>
                         <SelectItem value="double-bottom">Double Bottom</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>
                   <div className="flex-1">
                     <label className="text-sm text-gray-400 mb-1 block">Sector</label>
                     <Select
                       value={dbDtCriteria.sector}
                       onValueChange={(value) => setDbDtCriteria({ ...dbDtCriteria, sector: value })}
                     >
                       <SelectTrigger className="w-full bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-white">
                         <SelectValue placeholder="Any" />
                       </SelectTrigger>
                       <SelectContent className="bg-[rgba(26,31,45,0.95)] border-cyan-500/20 text-white">
                         <SelectItem value="any">Any</SelectItem>
                         {uniqueSectors.sort().map((sector) => (
                           <SelectItem key={sector} value={sector}>
                             {sector}
                           </SelectItem>
                         ))}
                       </SelectContent>
                     </Select>
                   </div>
                   <div className="flex-1">
                     <label className="text-sm text-gray-400 mb-1 block">Min. Confidence</label>
                     <Input
                       type="number"
                       placeholder="e.g., 70"
                       className="bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-white"
                     />
                   </div>
                   <div className="flex items-end">
                     <Button
                       className="w-full bg-cyan-600 hover:bg-cyan-700"
                       onClick={scanForDbDt}
                       disabled={isDbDtScanning}
                     >
                       <Filter className="h-4 w-4 mr-2" />
                       Apply Filters
                     </Button>
                   </div>
                 </div>

                 {/* Search */}
                 <div className="relative">
                   <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                   <Input
                     placeholder="Search by symbol or company name..."
                     className="pl-10 bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-white"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                   />
                 </div>

                 {/* Results Table */}
                 <div className="rounded-lg border border-cyan-500/20 overflow-hidden">
                   <div className="overflow-x-auto">
                     <table className="w-full text-sm">
                       <thead className="bg-[rgba(10,14,23,0.7)] text-gray-400">
                         <tr>
                           <th className="px-4 py-3 text-left">Symbol</th>
                           <th className="px-4 py-3 text-left">Company</th>
                           <th className="px-4 py-3 text-right">Price</th>
                           <th className="px-4 py-3 text-left">Pattern</th>
                           <th className="px-4 py-3 text-right">Confidence</th>
                           <th className="px-4 py-3 text-right">1st Level</th>
                           <th className="px-4 py-3 text-right">Retracement</th>
                           <th className="px-4 py-3 text-left">Sector</th>
                           <th className="px-4 py-3 text-center">Action</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-cyan-500/30">
                         {isDbDtScanning ? (
                           // Loading skeletons
                           Array.from({ length: 10 }).map((_, index) => (
                             <tr key={index} className="bg-[rgba(10,14,23,0.5)]">
                               <td className="px-4 py-3">
                                 <Skeleton className="h-4 w-16 bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3">
                                 <Skeleton className="h-4 w-40 bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3 text-right">
                                 <Skeleton className="h-4 w-20 ml-auto bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3">
                                 <Skeleton className="h-4 w-24 bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3 text-right">
                                 <Skeleton className="h-4 w-16 ml-auto bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3 text-right">
                                 <Skeleton className="h-4 w-20 ml-auto bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3 text-right">
                                 <Skeleton className="h-4 w-20 ml-auto bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3">
                                 <Skeleton className="h-4 w-24 bg-[rgba(26,31,45,0.8)]" />
                               </td>
                               <td className="px-4 py-3 text-center">
                                 <Skeleton className="h-8 w-8 mx-auto rounded-full bg-[rgba(26,31,45,0.8)]" />
                               </td>
                             </tr>
                           ))
                         ) : filteredDbDtResults.length > 0 ? (
                           filteredDbDtResults.map((result) => (
                             <tr key={result.symbol} className="bg-[rgba(10,14,23,0.5)] hover:bg-[rgba(10,14,23,0.7)]">
                               <td className="px-4 py-3 font-medium text-cyan-100">{result.symbol}</td>
                               <td className="px-4 py-3 text-gray-300">{result.name}</td>
                               <td className="px-4 py-3 text-right font-mono text-cyan-100">
                                 ${result.currentPrice.toFixed(2)}
                               </td>
                               <td className="px-4 py-3 text-gray-300">
                                 {result.patternType === "double-top" ? "Double Top" : "Double Bottom"}
                               </td>
                               <td className="px-4 py-3 text-right text-gray-300">{result.confidence}%</td>
                               <td className="px-4 py-3 text-right font-mono text-gray-300">
                                 ${result.firstLevel.toFixed(2)}
                               </td>
                               <td className="px-4 py-3 text-right font-mono text-gray-300">
                                 ${result.retracement.toFixed(2)}
                               </td>
                               <td className="px-4 py-3 text-gray-300">{result.sector}</td>
                               <td className="px-4 py-3 text-center">
                                 <Button
                                   variant="ghost"
                                   size="icon"
                                   className="h-8 w-8 text-gray-400 hover:text-cyan-400 hover:bg-[rgba(10,14,23,0.7)]"
                                   onClick={() => addDbDtToWatchlist(result)}
                                   title="Add to Watchlist"
                                 >
                                   <Plus className="h-4 w-4" />
                                 </Button>
                               </td>
                             </tr>
                           ))
                         ) : (
                           <tr className="bg-[rgba(10,14,23,0.5)]">
                             <td colSpan={9} className="px-4 py-8 text-center text-gray-400">
                               No Double Top/Bottom patterns found matching your criteria.
                             </td>
                           </tr>
                         )}
                       </tbody>
                     </table>
                   </div>
                 </div>
               </div>
             </CardContent>
           </Card>
         </TabsContent>

         <TabsContent value="watchlist" className="space-y-4">
           <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
             <CardHeader className="py-4 px-6 border-b border-cyan-500/20">
               <div className="flex items-center justify-between">
                 <CardTitle className="text-cyan-100">Your Watchlist</CardTitle>
               </div>
             </CardHeader>
             <CardContent className="p-6">
               {watchlist.length > 0 ? (
                 <div className="rounded-lg border border-cyan-500/20 overflow-hidden">
                   <div className="overflow-x-auto">
                     <table className="w-full text-sm">
                       <thead className="bg-[rgba(10,14,23,0.7)] text-gray-400">
                         <tr>
                           <th className="px-4 py-3 text-left">Symbol</th>
                           <th className="px-4 py-3 text-left">Company</th>
                           <th className="px-4 py-3 text-right">Price</th>
                           <th className="px-4 py-3 text-right">Change</th>
                           <th className="px-4 py-3 text-left">Sector</th>
                           <th className="px-4 py-3 text-left">QEM Range</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-cyan-500/30">
                         {watchlist.map((stock) => (
                           <tr key={stock.symbol} className="bg-[rgba(10,14,23,0.5)] hover:bg-[rgba(10,14,23,0.7)]">
                             <td className="px-4 py-3 font-medium text-cyan-100">{stock.symbol}</td>
                             <td className="px-4 py-3 text-gray-300">{stock.name}</td>
                             <td className="px-4 py-3 text-right font-mono text-cyan-100">
                               ${stock.price.toFixed(2)}
                             </td>
                             <td className="px-4 py-3 text-right">
                               <div
                                 className={`flex items-center justify-end ${stock.changePercent >= 0 ? "text-green-400" : "text-red-400"}`}
                               >
                                 {stock.changePercent >= 0 ? (
                                   <ArrowUp className="h-3 w-3 mr-1" />
                                 ) : (
                                   <ArrowDown className="h-3 w-3 mr-1" />
                                 )}
                                 {stock.changePercent.toFixed(2)}%
                               </div>
                             </td>
                             <td className="px-4 py-3 text-gray-300">{stock.sector}</td>
                             <td className="px-4 py-3 text-purple-400 font-mono">
                               {stock.qem ? `${stock.qem.low.toFixed(2)} - ${stock.qem.high.toFixed(2)}` : "N/A"}
                             </td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   </div>
                 </div>
               ) : (
                 <div className="text-center py-8 text-gray-400">
                   <p>Your watchlist is empty. Add stocks from the Scanner tab.</p>
                 </div>
               )}
             </CardContent>
           </Card>
         </TabsContent>
       </Tabs>
     </div>
   </div>
 )
}
