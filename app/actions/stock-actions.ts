"use server"

// Define the stock data type
export type StockData = {
  symbol: string
  price: number
  change: number
  changePercent: number
  volume: string
}

// Fetch stock price data for a single symbol
export async function fetchStockPrice(symbol: string): Promise<StockData | null> {
  try {
    // In a real app, this would call an actual stock API
    // For demo purposes, we'll generate random data
    const price = Math.random() * 1000 + 10
    const change = Math.random() * 20 - 10
    const changePercent = (change / price) * 100

    // Format volume with K, M, or B suffix
    const volumeValue = Math.random() * 10000000
    let volume = ""
    if (volumeValue > 1000000) {
      volume = `${(volumeValue / 1000000).toFixed(2)}M`
    } else if (volumeValue > 1000) {
      volume = `${(volumeValue / 1000).toFixed(2)}K`
    } else {
      volume = volumeValue.toFixed(0)
    }

    return {
      symbol,
      price,
      change,
      changePercent,
      volume,
    }
  } catch (error) {
    console.error(`Error fetching stock price for ${symbol}:`, error)
    return null
  }
}

// Fetch stock price data for multiple symbols
export async function fetchMultipleStocks(symbols: string[]): Promise<Record<string, StockData>> {
  try {
    const results: Record<string, StockData> = {}

    for (const symbol of symbols) {
      const stockData = await fetchStockPrice(symbol)
      if (stockData) {
        results[symbol] = stockData
      }
    }

    return results
  } catch (error) {
    console.error("Error fetching multiple stocks:", error)
    return {}
  }
}
