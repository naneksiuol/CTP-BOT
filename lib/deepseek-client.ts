/**
 * A dedicated client for the DeepSeek API
 */
export class DeepSeekClient {
  private apiKey: string
  private baseUrl = "https://api.deepseek.com/v1"

  constructor(apiKey: string) {
    this.apiKey = apiKey
    if (!this.apiKey) {
      console.warn("DeepSeek API key not provided")
    }
  }

  /**
   * Creates a chat completion with the DeepSeek API
   */
  async createChatCompletion(messages: any[], options: any = {}) {
    if (!this.apiKey) {
      throw new Error("DeepSeek API key is required")
    }

    const model = options.model || "deepseek-chat"
    const temperature = options.temperature || 0.7
    const max_tokens = options.max_tokens || 1024

    try {
      console.log(`DeepSeek: Creating chat completion with model ${model}`)

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature,
          max_tokens,
        }),
      })

      console.log(`DeepSeek API response status: ${response.status}`)

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`DeepSeek API error (${response.status}):`, errorText)
        throw new Error(`DeepSeek API request failed with status ${response.status}: ${errorText}`)
      }

      const data = await response.json()
      console.log("DeepSeek API response received:", JSON.stringify(data).substring(0, 200) + "...")

      return data
    } catch (error) {
      console.error("DeepSeek API error:", error)
      throw error
    }
  }
}
