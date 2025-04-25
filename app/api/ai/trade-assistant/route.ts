import { NextResponse } from "next/server"
import { aiService } from "@/lib/ai-service"

export async function POST(request: Request) {
  try {
    console.log("Trade Assistant API route called")

    // Log all available environment variables (without values for security)
    console.log("Available environment variables:")
    Object.keys(process.env).forEach((key) => {
      if (key.includes("API_KEY") || key.includes("KEY")) {
        console.log(`- ${key}: ${process.env[key] ? "Set" : "Not set"}`)
      }
    })

    // Check if CYBER_TRADER_PRO is set
    if (!process.env.CYBER_TRADER_PRO) {
      console.warn("CYBER_TRADER_PRO environment variable is not set")
    } else {
      console.log("CYBER_TRADER_PRO environment variable is set")
    }

    let requestBody
    try {
      requestBody = await request.json()
    } catch (parseError) {
      console.error("Error parsing request body:", parseError)
      return NextResponse.json(
        {
          error: "Invalid request body",
          response: "I couldn't understand your request. Please try again.",
          provider: "Local Fallback",
          model: "Basic Mode",
        },
        { status: 400 },
      )
    }

    const { message, history } = requestBody
    // Safely extract category with a default value
    const category = requestBody.category || "general"

    if (!message) {
      console.log("Error: Message is required")
      return NextResponse.json(
        {
          error: "Message is required",
          response: "I didn't receive your message. Please try again.",
          provider: "Local Fallback",
          model: "Basic Mode",
        },
        { status: 400 },
      )
    }

    // Format the conversation history for the AI
    const formattedHistory = history
      ? history.map((msg: any) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`).join("\n\n")
      : ""

    // Determine if this is an educational query
    const isEducationalQuery =
      message.toLowerCase().includes("what is") ||
      message.toLowerCase().includes("how does") ||
      message.toLowerCase().includes("explain") ||
      message.toLowerCase().includes("teach me") ||
      message.toLowerCase().includes("learn about") ||
      message.toLowerCase().includes("understand")

    // Determine the category of the educational query
    let educationalCategory: "indicators" | "fundamentals" | "risk" | "general" = "general"

    if (category) {
      // If category is explicitly provided in the request
      if (["indicators", "fundamentals", "risk", "general"].includes(category)) {
        educationalCategory = category as "indicators" | "fundamentals" | "risk" | "general"
      }
    } else if (isEducationalQuery) {
      // Try to infer the category from the message
      const indicatorKeywords = ["indicator", "oscillator", "moving average", "macd", "rsi", "bollinger", "stochastic"]
      const fundamentalsKeywords = [
        "fundamental",
        "strategy",
        "chart pattern",
        "trend",
        "support",
        "resistance",
        "price action",
      ]
      const riskKeywords = [
        "risk",
        "position size",
        "stop loss",
        "take profit",
        "drawdown",
        "portfolio",
        "diversification",
      ]

      if (indicatorKeywords.some((keyword) => message.toLowerCase().includes(keyword))) {
        educationalCategory = "indicators"
      } else if (fundamentalsKeywords.some((keyword) => message.toLowerCase().includes(keyword))) {
        educationalCategory = "fundamentals"
      } else if (riskKeywords.some((keyword) => message.toLowerCase().includes(keyword))) {
        educationalCategory = "risk"
      }
    }

    try {
      console.log("Attempting to generate response with AI service")

      let response

      if (isEducationalQuery) {
        // Generate an educational response
        console.log(`Generating educational response for category: ${educationalCategory}`)
        try {
          response = await aiService.generateEducationalResponse(message, educationalCategory)
        } catch (eduError) {
          console.error("Error generating educational response:", eduError)
          // Fall back to regular response if educational response fails
          response = await generateRegularResponse(message, formattedHistory)
        }
      } else {
        // Create regular response
        response = await generateRegularResponse(message, formattedHistory)
      }

      console.log("Successfully generated response")

      return NextResponse.json({
        response,
        provider: aiService.getCurrentProvider(),
        model: aiService.getCurrentModel(),
      })
    } catch (aiError) {
      console.error("AI service error:", aiError)

      // Return a fallback response
      return NextResponse.json({
        response:
          "I'm having trouble generating a response right now. This could be due to API limits or configuration issues. Please try again later or try a different question.",
        provider: "Local Fallback",
        model: "Basic Mode",
      })
    }
  } catch (error) {
    console.error("Error in trade assistant:", error)
    return NextResponse.json(
      {
        error: "Failed to generate response",
        response: "I'm having trouble connecting right now. Please try again later.",
        provider: "Local Fallback",
        model: "Basic Mode",
      },
      { status: 500 },
    )
  }
}

// Helper function to generate regular responses
async function generateRegularResponse(message: string, formattedHistory: string): Promise<string> {
  // Create the prompt with trading context
  const prompt = `You are a trading instructor at Cyber Trader Pro University, an educational platform for traders. 
You provide concise, accurate information about trading concepts, analysis methods, technical indicators, and educational content.

IMPORTANT LIMITATIONS:
1. You DO NOT have access to current market data, real-time prices, or recent news.
2. You CANNOT search the web or access external information sources.
3. You MUST NOT provide specific current stock prices, market conditions, or make claims about current market trends.
4. When asked about current prices or market conditions, clearly state that you don't have access to real-time data and cannot search the web.
5. Focus on educational content, general trading principles, and timeless market concepts.
6. If asked about specific assets, only discuss them in general terms without referencing current prices or conditions.
7. If asked to look up information, explain that you cannot access external data sources.

Previous conversation:
${formattedHistory}

User: ${message}
Assistant: `

  // Get response from AI service
  return await aiService.generateText(prompt)
}
