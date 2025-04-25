import { NextResponse } from "next/server"
import { DeepSeekClient } from "@/lib/deepseek-client"

export async function GET(request: Request) {
  try {
    console.log("Testing DeepSeek API connection")

    const apiKey = process.env.DEEPSEEK_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "DeepSeek API key not found in environment variables",
        },
        { status: 500 },
      )
    }

    const client = new DeepSeekClient(apiKey)

    try {
      const response = await client.createChatCompletion(
        [{ role: "user", content: "Hello, can you give me a short response to test the connection?" }],
        { max_tokens: 50 },
      )

      return NextResponse.json({
        success: true,
        message: "DeepSeek API connection successful",
        response: response.choices[0].message.content,
      })
    } catch (error: any) {
      console.error("DeepSeek API test failed:", error)
      return NextResponse.json(
        {
          success: false,
          error: error.message || "Unknown error",
          details: error.toString(),
        },
        { status: 500 },
      )
    }
  } catch (error: any) {
    console.error("Error in test endpoint:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Unknown error",
      },
      { status: 500 },
    )
  }
}
