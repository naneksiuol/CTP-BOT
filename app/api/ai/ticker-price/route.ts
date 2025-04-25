import { NextResponse } from "next/server"
import { togetherAIService } from "@/lib/together-ai-service"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const ticker = searchParams.get("ticker")

  if (!ticker) {
    return NextResponse.json({ error: "Ticker parameter is required" }, { status: 400 })
  }

  try {
    const priceData = await togetherAIService.fetchTickerPrice(ticker)
    return NextResponse.json(priceData)
  } catch (error) {
    console.error("Error fetching ticker price:", error)
    return NextResponse.json({ error: "Failed to fetch ticker price", success: false }, { status: 500 })
  }
}
