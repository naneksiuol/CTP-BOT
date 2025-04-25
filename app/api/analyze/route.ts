import { NextResponse } from "next/server"

// Update the generateMockData function to use current prices as of April 2024
function generateMockData(ticker: string, strategyType: string) {
  // Updated price mapping for common tickers with current prices (April 2024)
  const tickerPrices = {
    SPY: 496.48, // Updated to current price
    QQQ: 431.53,
    AAPL: 169.3,
    MSFT: 406.32,
    GOOGL: 153.94,
    AMZN: 178.15,
    TSLA: 171.05,
    META: 493.5,
    NVDA: 881.86,
    "BTC-USD": 63500.0,
    "ETH-USD": 3070.0,
    DIA: 383.65, // Dow Jones ETF
    IWM: 198.76, // Russell 2000 ETF
    XLF: 39.85, // Financial Sector ETF
    XLE: 91.42, // Energy Sector ETF
    XLK: 204.15, // Technology Sector ETF
    XLV: 139.15, // Healthcare Sector ETF
    XLI: 114.15, // Industrial Sector ETF
    XLP: 73.15, // Consumer Staples ETF
    XLY: 178.25, // Consumer Discretionary ETF
    XLU: 63.85, // Utilities Sector ETF
    XLB: 91.75, // Materials Sector ETF
    SOXX: 212.35, // Semiconductor ETF
    SMH: 212.35, // Semiconductor ETF
  }

  // Determine a realistic current price
  let currentPrice
  if (ticker in tickerPrices) {
    currentPrice = tickerPrices[ticker]
  } else {
    // For unknown tickers, generate a reasonable price
    // Most stocks are between $10 and $500
    currentPrice = Math.random() * 490 + 10
  }

  const atr = currentPrice * 0.02 // ATR is typically 1-3% of price
  const rsi = 30 + Math.random() * 40
  const trend = Math.random() > 0.5 ? "Uptrend" : "Downtrend"
  const volumeCategory = Math.random() > 0.5 ? "High" : "Low"
  const adlTrend = Math.random() > 0.5 ? "Uptrend" : "Downtrend"
  const weightedScore = Math.random() * 0.4 - 0.2

  // Generate signal based on weightedScore
  const signal = weightedScore > 0.1 ? "Buy" : weightedScore < -0.1 ? "Sell" : "Neutral"

  // Calculate stop loss and take profit
  const stopLoss = signal === "Buy" ? currentPrice * 0.95 : currentPrice * 1.05
  const takeProfit = signal === "Buy" ? currentPrice * 1.1 : currentPrice * 0.9

  // Generate MTFC data
  const timeframes = strategyType === "short-term" ? ["5m", "15m", "30m", "1h", "4h"] : ["30m", "1h", "4h", "1d", "1w"]

  const mtfc = {}
  timeframes.forEach((tf) => {
    mtfc[tf] = Math.random() > 0.5 ? "bullish" : "bearish"
  })

  // Generate AI recommendation
  const aiRecommendation = signal
  const aiConfidence = 0.6 + Math.random() * 0.3
  const expectedGain =
    signal === "Buy"
      ? ((takeProfit - currentPrice) / currentPrice) * 100
      : ((currentPrice - takeProfit) / currentPrice) * 100

  // Create analysis object
  return {
    ticker,
    strategy: strategyType === "short-term" ? "Short-Term" : "Long-Term",
    ema_short: currentPrice + Math.random() * currentPrice * 0.05 - currentPrice * 0.025,
    ema_long: currentPrice + Math.random() * currentPrice * 0.025 - currentPrice * 0.0125,
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
    aiRecommendation,
    aiConfidence,
    expectedGain,
    entryPrice: currentPrice,
    targetPrice: takeProfit,
    percentChange: Math.random() * 6 - 3,
    longTermPercentChange: Math.random() * 10 - 5,
    recentPerformance: Math.random() > 0.5 ? "Bullish" : "Bearish",
    marketCondition: Math.random() > 0.5 ? "Normal" : "Volatile",
    marketConditionContext: `Market is showing ${Math.random() > 0.5 ? "normal" : "volatile"} conditions with ${volumeCategory.toLowerCase()} volume.`,
    explanation: `The ${strategyType} analysis for ${ticker} shows ${signal.toLowerCase()} signals with a weighted score of ${weightedScore.toFixed(2)}.`,
    shortTermSignal: strategyType === "short-term" ? signal : "Neutral",
    longTermSignal: strategyType === "long-term" ? signal : "Neutral",
    aiAnalysis: `Based on technical analysis, the recommendation for ${ticker} is to ${signal.toLowerCase()} with a confidence of ${(aiConfidence * 100).toFixed(1)}%.`,
  }
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { tickers, strategyType } = body

    // Validate inputs
    if (!tickers || !Array.isArray(tickers) || tickers.length === 0) {
      return NextResponse.json({ error: "Invalid tickers parameter" }, { status: 400 })
    }

    if (!strategyType || (strategyType !== "short-term" && strategyType !== "long-term")) {
      return NextResponse.json({ error: "Invalid strategyType parameter" }, { status: 400 })
    }

    // Generate results for each ticker
    const results = []

    for (const ticker of tickers) {
      try {
        // Generate mock data for the ticker
        const analysis = generateMockData(ticker, strategyType)
        results.push(analysis)
      } catch (error) {
        console.error(`Error analyzing ${ticker}:`, error)
        results.push({ ticker, error: "Failed to analyze" })
      }
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error("Error in analyze route:", error)
    return NextResponse.json({ error: "Failed to analyze tickers" }, { status: 500 })
  }
}
