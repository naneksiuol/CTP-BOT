import { NextResponse } from "next/server"
import { togetherAIService } from "@/lib/together-ai-service"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const pattern = searchParams.get("pattern")

  if (!pattern) {
    return NextResponse.json({ error: "Pattern parameter is required" }, { status: 400 })
  }

  try {
    const explanation = await togetherAIService.explainPattern(pattern)
    return NextResponse.json({ explanation })
  } catch (error) {
    console.error("Error explaining pattern:", error)
    return NextResponse.json({ error: "Failed to explain pattern" }, { status: 500 })
  }
}
