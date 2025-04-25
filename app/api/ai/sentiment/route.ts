import { NextResponse } from "next/server"
import { togetherAIService } from "@/lib/together-ai-service"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const ticker = searchParams.get("ticker")

  if (!ticker) {
    return NextResponse.json({ error: "Ticker parameter is required" }, { status: 400 })
  }

  try {
    const result = await togetherAIService.analyzeMarketSentiment(ticker)
    return NextResponse.json({
      ticker,
      ...result,
    })
  } catch (error) {
    console.error("Error in sentiment analysis:", error)
    return NextResponse.json({ error: "Failed to analyze sentiment" }, { status: 500 })
  }
}
