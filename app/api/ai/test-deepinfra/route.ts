import { NextResponse } from "next/server"
import { DeepInfraClient } from "@/lib/deepinfra-client"

export async function GET(request: Request) {
  try {
    console.log("Testing Deep Infra API connection")

    const apiKey = process.env.CYBER_TRADER_PRO

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "Deep Infra API key not found in environment variables",
        },
        { status: 500 },
      )
    }

    console.log("API key found, creating client")
    const client = new DeepInfraClient(apiKey)

    try {
      // Use a simpler model for testing
      const testModel = "meta-llama/Llama-3-8b-chat-hf"

      console.log(`Testing with model: ${testModel}`)
      const response = await client.createChatCompletion(
        [{ role: "user", content: "Hello, can you give me a short response to test the connection?" }],
        {
          model: testModel,
          max_tokens: 50,
        },
      )

      console.log("Response received:", JSON.stringify(response).substring(0, 200))

      // Try to extract the response text
      let responseText = "Unknown response format"

      if (response.results && response.results.length > 0) {
        if (response.results[0].generated_text) {
          responseText = response.results[0].generated_text
        } else if (response.results[0].text) {
          responseText = response.results[0].text
        } else if (typeof response.results[0] === "string") {
          responseText = response.results[0]
        }
      }

      return NextResponse.json({
        success: true,
        message: "Deep Infra API connection successful",
        response: responseText,
        rawResponse: response,
      })
    } catch (error: any) {
      console.error("Deep Infra API test failed:", error)
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
