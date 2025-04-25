/**
 * A dedicated client for the Deep Infra API
 */
export class DeepInfraClient {
  private apiKey: string
  private baseUrl = "https://api.deepinfra.com/v1/inference"

  constructor(apiKey: string) {
    this.apiKey = apiKey
    if (!this.apiKey) {
      console.warn("Deep Infra API key not provided")
    }
  }

  /**
   * Creates a chat completion with the Deep Infra API
   */
  async createChatCompletion(messages: any[], options: any = {}) {
    if (!this.apiKey) {
      throw new Error("Deep Infra API key is required")
    }

    const model = options.model || "meta-llama/Llama-3-70b-chat-hf"
    const temperature = options.temperature || 0.7
    const max_tokens = options.max_tokens || 1024

    try {
      console.log(`DeepInfra: Creating chat completion with model ${model}`)

      // Format messages for Deep Infra's expected format
      // Deep Infra expects a specific format for chat messages
      const formattedMessages = messages.map((msg) => ({
        role: msg.role === "system" ? "system" : msg.role === "assistant" ? "assistant" : "user",
        content: msg.content,
      }))

      // Log the request for debugging
      console.log(
        "DeepInfra request:",
        JSON.stringify({
          input: {
            messages: formattedMessages,
          },
          temperature,
          max_tokens,
        }).substring(0, 500) + "...",
      )

      const response = await fetch(`${this.baseUrl}/${encodeURIComponent(model)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          input: {
            messages: formattedMessages,
          },
          temperature,
          max_tokens,
        }),
      })

      console.log(`DeepInfra API response status: ${response.status}`)

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`DeepInfra API error (${response.status}):`, errorText)
        throw new Error(`DeepInfra API request failed with status ${response.status}: ${errorText}`)
      }

      const data = await response.json()
      console.log("DeepInfra API response received:", JSON.stringify(data).substring(0, 200) + "...")

      return data
    } catch (error) {
      console.error("DeepInfra API error:", error)
      throw error
    }
  }
}
