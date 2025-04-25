import OpenAI from "openai"
import { DeepSeekClient } from "./deepseek-client"
import { DeepInfraClient } from "./deepinfra-client"

export class AIService {
  private togetherApiKey: string
  private openaiApiKey: string
  private deepseekApiKey: string
  private currentProvider: "together" | "openai" | "deepseek" | "deepinfra" | "fallback"
  private openai: OpenAI | null = null
  private deepseek: DeepSeekClient | null = null
  private deepinfra: DeepInfraClient | null = null

  // Technical indicators knowledge base
  private technicalIndicatorsKnowledge = {
    movingAverages: {
      simple:
        "Simple Moving Average (SMA) calculates the average of a selected range of prices over a specified number of periods. It's used to identify trend direction and potential support/resistance levels.",
      exponential:
        "Exponential Moving Average (EMA) gives more weight to recent prices, making it more responsive to new information. It reacts more quickly to price changes than SMA.",
      weighted:
        "Weighted Moving Average (WMA) assigns a greater weighting to more recent data points, making it more responsive to new information than a simple moving average.",
      hull: "Hull Moving Average (HMA) substantially reduces lag while maintaining smoothness. It's calculated using weighted moving averages with the square root of the period.",
      volume:
        "Volume Weighted Moving Average (VWMA) factors in volume with price, giving more importance to price moves with higher volume.",
    },
    oscillators: {
      rsi: "Relative Strength Index (RSI) measures the speed and change of price movements on a scale from 0 to 100. Values above 70 indicate overbought conditions, while values below 30 indicate oversold conditions.",
      stochastic:
        "Stochastic Oscillator compares a closing price to its price range over a specific period. It consists of %K (fast) and %D (slow) lines, with readings above 80 indicating overbought and below 20 indicating oversold conditions.",
      macd: "Moving Average Convergence Divergence (MACD) shows the relationship between two moving averages of a security's price. It consists of the MACD line, signal line, and histogram, used to identify momentum, trend direction, and potential reversals.",
      cci: "Commodity Channel Index (CCI) measures the current price level relative to an average price level over a given period. CCI is high when prices are far above their average and low when prices are far below their average.",
      atr: "Average True Range (ATR) measures market volatility by decomposing the entire range of an asset price for that period. It's often used to set stop-loss levels or position sizing.",
    },
    volumeIndicators: {
      obv: "On-Balance Volume (OBV) measures buying and selling pressure as a cumulative indicator that adds volume on up days and subtracts volume on down days. It confirms price trends or warns of potential reversals.",
      adl: "Accumulation/Distribution Line (ADL) is a volume-based indicator designed to measure the cumulative flow of money into and out of a security. It helps confirm price trends or identify divergences.",
      mfi: "Money Flow Index (MFI) is a momentum indicator that incorporates both price and volume data. It's often referred to as volume-weighted RSI, with readings above 80 indicating overbought and below 20 indicating oversold conditions.",
    },
    trendIndicators: {
      adx: "Average Directional Index (ADX) measures the strength of a trend, regardless of its direction. Values above 25 indicate a strong trend, while values below 20 indicate a weak or non-existent trend.",
      ichimoku:
        "Ichimoku Cloud is a comprehensive indicator that defines support and resistance, identifies trend direction, gauges momentum, and provides trading signals. It consists of five lines and the 'cloud' formed between two of them.",
      parabolicSar:
        "Parabolic SAR (Stop and Reverse) is used to determine the direction of a trend and potential reversal points. It appears as a series of dots placed above or below the price bars.",
    },
    supportResistance: {
      fibonacci:
        "Fibonacci Retracement identifies potential support and resistance levels based on the Fibonacci sequence. Common retracement levels are 23.6%, 38.2%, 50%, 61.8%, and 78.6%.",
      pivotPoints:
        "Pivot Points are technical indicators used to determine overall market trend over different time frames. They're calculated using the high, low, and close of the previous period to project support and resistance levels for the current or upcoming period.",
    },
    volatilityIndicators: {
      bollingerBands:
        "Bollinger Bands consist of a middle band (usually a 20-period SMA) with an upper and lower band set at standard deviations away from the middle. They expand and contract based on volatility, helping identify overbought/oversold conditions.",
      keltnerChannels:
        "Keltner Channels are volatility-based envelopes set above and below an exponential moving average. They're calculated using the Average True Range (ATR) to set channel width, helping identify trend direction and potential breakouts.",
    },
    patternRecognition: {
      candlestickPatterns:
        "Candlestick patterns like Doji, Hammer, Engulfing, and Morning/Evening Star provide insights into market psychology and potential reversals or continuations.",
      chartPatterns:
        "Chart patterns like Head and Shoulders, Double Top/Bottom, Triangles, and Flags offer visual representations of market psychology and potential future price movements.",
    },
  }

  // Trading fundamentals knowledge base
  private tradingFundamentalsKnowledge = {
    marketStructure: {
      priceAction:
        "Price action trading focuses on the movement of price to identify trading opportunities, without using indicators. It relies on candlestick patterns, support/resistance levels, and trend analysis.",
      supportResistance:
        "Support levels are where downward price movement tends to halt, while resistance levels are where upward price movement tends to halt. These levels are formed by previous market reactions and psychological price points.",
      trendAnalysis:
        "Trend analysis involves identifying the overall direction of market movement (uptrend, downtrend, or sideways) using tools like trendlines, moving averages, and price patterns.",
      marketCycles:
        "Markets typically move through four main phases: accumulation (sideways after downtrend), markup (uptrend), distribution (sideways after uptrend), and markdown (downtrend). Understanding these cycles helps with timing entries and exits.",
    },
    tradingStrategies: {
      trendFollowing:
        "Trend following strategies aim to capture gains by riding the momentum of existing trends. They typically use indicators like moving averages, MACD, or ADX to identify and confirm trends.",
      meanReversion:
        "Mean reversion strategies are based on the concept that prices tend to revert to their average over time. They look for overbought/oversold conditions using indicators like RSI, Stochastic, or Bollinger Bands.",
      breakoutTrading:
        "Breakout trading involves entering positions when price breaks through established support or resistance levels, anticipating that the price will continue in the direction of the breakout.",
      swingTrading:
        "Swing trading aims to capture 'swings' in price movement over periods of days to weeks. It combines elements of both trend following and mean reversion strategies.",
      dayTrading:
        "Day trading involves opening and closing positions within the same trading day, focusing on short-term price movements and using tight stop-losses.",
      positionTrading:
        "Position trading involves holding positions for extended periods (weeks to months or longer), focusing on long-term trends and fundamental factors.",
    },
    fundamentalAnalysis: {
      economicIndicators:
        "Economic indicators like GDP, employment data, inflation rates, and central bank policies provide insights into the overall economic environment affecting markets.",
      companyFinancials:
        "Analysis of financial statements (income statement, balance sheet, cash flow) helps assess a company's financial health, profitability, and growth potential.",
      valuationMetrics:
        "Metrics like P/E ratio, P/B ratio, EV/EBITDA, and dividend yield help determine if a stock is overvalued or undervalued relative to its peers or historical averages.",
      sectorAnalysis:
        "Understanding industry trends, competitive dynamics, and sector rotation helps identify potential investment opportunities and risks.",
    },
    marketPsychology: {
      behavioralBiases:
        "Common biases like loss aversion, confirmation bias, and recency bias affect trading decisions. Awareness of these biases helps traders make more rational decisions.",
      sentimentAnalysis:
        "Analyzing market sentiment through indicators like put/call ratio, VIX, or social media sentiment helps gauge market extremes and potential reversals.",
      contrarian:
        "Contrarian trading involves taking positions opposite to the prevailing market sentiment, based on the idea that extreme sentiment often precedes market reversals.",
    },
  }

  // Risk management knowledge base
  private riskManagementKnowledge = {
    positionSizing: {
      percentageRisk:
        "The percentage risk method involves risking a fixed percentage (typically 1-2%) of your trading capital on each trade, adjusting position size based on the distance to your stop-loss.",
      fixedRisk:
        "Fixed risk involves risking the same dollar amount on each trade, regardless of account size or trade setup.",
      volatilityBased:
        "Volatility-based position sizing adjusts position size based on market volatility, typically using indicators like ATR to determine appropriate risk levels.",
      kellyFormula:
        "The Kelly Criterion is a mathematical formula that determines the optimal size of a series of bets to maximize the logarithm of wealth.",
    },
    stopLossMethods: {
      technical:
        "Technical stop-loss placement uses chart levels like support/resistance, swing highs/lows, or indicator values to determine where to place stops.",
      volatilityBased:
        "Volatility-based stops use indicators like ATR to set stops at a distance that accounts for normal market noise, reducing the chance of premature stop-outs.",
      timeBasedStops:
        "Time-based stops involve exiting a trade if it doesn't perform as expected within a specific time frame, preventing capital from being tied up in non-performing trades.",
      trailingStops:
        "Trailing stops move with the price in the direction of the trade, locking in profits while allowing the trade room to develop further.",
    },
    riskRewardRatio: {
      calculation:
        "Risk-reward ratio compares the potential profit (distance to target) to the potential loss (distance to stop-loss). A minimum ratio of 1:2 (risking 1 to gain 2) is often recommended.",
      adjustingRatios:
        "Adjusting risk-reward ratios based on win rate and setup quality helps optimize overall profitability. Higher probability setups may justify lower ratios, while lower probability setups require higher ratios.",
    },
    portfolioDiversification: {
      assetClasses:
        "Diversifying across different asset classes (stocks, bonds, commodities, etc.) reduces overall portfolio risk through exposure to markets with different drivers.",
      sectors:
        "Diversifying across sectors within an asset class reduces industry-specific risk while maintaining exposure to the broader market.",
      correlations:
        "Understanding correlations between different assets helps ensure true diversification, as highly correlated assets tend to move together during market stress.",
    },
    psychologicalAspects: {
      tradingPlan:
        "A comprehensive trading plan defines entry/exit criteria, position sizing, and risk parameters, providing structure and reducing emotional decision-making.",
      journaling:
        "Maintaining a detailed trading journal helps identify patterns in trading behavior, strengths, weaknesses, and areas for improvement.",
      emotionalControl:
        "Techniques for managing emotions include mindfulness, setting clear rules, taking breaks after losses, and focusing on process rather than outcomes.",
    },
    drawdownManagement: {
      maximumDrawdown:
        "Maximum drawdown measures the largest peak-to-trough decline in account value. Setting a maximum acceptable drawdown helps preserve capital during losing streaks.",
      scalingBack:
        "Reducing position size or trading frequency during drawdowns helps preserve capital and maintain psychological well-being.",
      circuitBreakers:
        "Implementing personal 'circuit breakers' (e.g., stopping trading after a certain number of consecutive losses or a daily loss threshold) prevents compounding losses during unfavorable periods.",
    },
  }

  constructor() {
    this.togetherApiKey = process.env.CYBER_TRADER_PRO || ""
    this.openaiApiKey = process.env.OPENAI_API_KEY || ""
    this.deepseekApiKey = process.env.DEEPSEEK_API_KEY || ""

    console.log("Initializing AI Service with available providers:")
    console.log(`- OpenAI API Key: ${this.openaiApiKey ? "Available" : "Not available"}`)
    console.log(`- DeepSeek API Key: ${this.deepseekApiKey ? "Available" : "Not available"}`)
    console.log(`- Deep Infra API Key: ${this.togetherApiKey ? "Available" : "Not available"}`)

    // Initialize clients
    if (this.openaiApiKey) {
      this.openai = new OpenAI({
        apiKey: this.openaiApiKey,
      })
    }

    if (this.deepseekApiKey) {
      this.deepseek = new DeepSeekClient(this.deepseekApiKey)
    }

    if (this.togetherApiKey) {
      this.deepinfra = new DeepInfraClient(this.togetherApiKey)
    }

    // Set the default provider based on available API keys
    if (this.togetherApiKey) {
      this.currentProvider = "deepinfra"
      console.log("Using DeepInfra as primary provider")
    } else if (this.deepseekApiKey) {
      this.currentProvider = "deepseek"
      console.log("Using DeepSeek as primary provider")
    } else if (this.openaiApiKey) {
      this.currentProvider = "openai"
      console.log("Using OpenAI as primary provider")
    } else {
      this.currentProvider = "fallback"
      console.warn("No AI API keys found. Using fallback responses.")
    }
  }

  // Method to get educational content about a specific technical indicator
  getIndicatorEducation(indicator: string): string {
    // Search through all indicator categories
    for (const category in this.technicalIndicatorsKnowledge) {
      const categoryData = this.technicalIndicatorsKnowledge[category as keyof typeof this.technicalIndicatorsKnowledge]
      for (const key in categoryData) {
        if (
          key.toLowerCase().includes(indicator.toLowerCase()) ||
          indicator.toLowerCase().includes(key.toLowerCase())
        ) {
          return categoryData[key as keyof typeof categoryData]
        }
      }
    }
    return "I don't have specific information about that indicator, but I can help you understand similar technical analysis concepts."
  }

  // Method to get educational content about trading fundamentals
  getTradingFundamentalsEducation(topic: string): string {
    // Search through all fundamentals categories
    for (const category in this.tradingFundamentalsKnowledge) {
      const categoryData = this.tradingFundamentalsKnowledge[category as keyof typeof this.tradingFundamentalsKnowledge]
      for (const key in categoryData) {
        if (key.toLowerCase().includes(topic.toLowerCase()) || topic.toLowerCase().includes(key.toLowerCase())) {
          return categoryData[key as keyof typeof categoryData]
        }
      }
    }
    return "I don't have specific information about that trading concept, but I can help you understand related trading fundamentals."
  }

  // Method to get educational content about risk management
  getRiskManagementEducation(topic: string): string {
    // Search through all risk management categories
    for (const category in this.riskManagementKnowledge) {
      const categoryData = this.riskManagementKnowledge[category as keyof typeof this.riskManagementKnowledge]
      for (const key in categoryData) {
        if (key.toLowerCase().includes(topic.toLowerCase()) || topic.toLowerCase().includes(key.toLowerCase())) {
          return categoryData[key as keyof typeof categoryData]
        }
      }
    }
    return "I don't have specific information about that risk management concept, but I can help you understand related risk management principles."
  }

  // Enhanced method to generate educational responses
  async generateEducationalResponse(
    topic: string,
    category: "indicators" | "fundamentals" | "risk" | "general" = "general",
  ): Promise<string> {
    let baseKnowledge = ""

    try {
      // First check our internal knowledge base
      if (category === "indicators") {
        baseKnowledge = this.getIndicatorEducation(topic)
      } else if (category === "fundamentals") {
        baseKnowledge = this.getTradingFundamentalsEducation(topic)
      } else if (category === "risk") {
        baseKnowledge = this.getRiskManagementEducation(topic)
      }

      // If we have internal knowledge, use it as a base
      let prompt = ""
      if (baseKnowledge && baseKnowledge.length > 20) {
        prompt = `As a trading instructor at Cyber Trader Pro University, provide an educational explanation about ${topic}. 
        
Base your response on this core knowledge: "${baseKnowledge}"

Expand on this with practical examples, how to interpret it in different market conditions, and how traders can apply this knowledge. Include any relevant formulas, common settings, and best practices. Format your response in a clear, educational manner suitable for a trading course.`
      } else {
        // If we don't have specific knowledge, create a more general prompt
        prompt = `As a trading instructor at Cyber Trader Pro University, provide an educational explanation about ${topic} in the context of ${category === "general" ? "trading" : category}.

Your response should be comprehensive and educational, covering:
1. What it is and how it works
2. How traders use it in practice
3. Common settings or parameters (if applicable)
4. Interpretation in different market conditions
5. Strengths and limitations
6. Practical examples

Format your response in a clear, educational manner suitable for a trading course.`
      }

      return await this.generateText(prompt)
    } catch (error) {
      console.error("Error generating educational response:", error)
      return this.getFallbackEducationalResponse(topic, category)
    }
  }

  // Fallback educational response when API calls fail
  private getFallbackEducationalResponse(
    topic: string,
    category: "indicators" | "fundamentals" | "risk" | "general",
  ): string {
    // First check our internal knowledge base
    if (category === "indicators") {
      const response = this.getIndicatorEducation(topic)
      if (response.length > 20) return response
    } else if (category === "fundamentals") {
      const response = this.getTradingFundamentalsEducation(topic)
      if (response.length > 20) return response
    } else if (category === "risk") {
      const response = this.getRiskManagementEducation(topic)
      if (response.length > 20) return response
    }

    // If we don't have specific knowledge, return a generic response
    return `As a trading instructor at Cyber Trader Pro University, I'd be happy to explain about ${topic}, but I'm currently operating in fallback mode due to connection issues. 

When our systems are fully operational, I can provide detailed educational content about various trading topics, including technical indicators, trading fundamentals, and risk management principles.

Please try again later for a more comprehensive explanation, or ask about a different trading topic.`
  }

  async generateText(prompt: string, model?: string): Promise<string> {
    try {
      console.log(`Generating text with provider: ${this.currentProvider}`)

      // Use DeepInfra if it's the current provider
      if (this.currentProvider === "deepinfra" && this.deepinfra) {
        try {
          console.log("Attempting to use DeepInfra API")
          return await this.tryDeepInfra(prompt, model)
        } catch (error) {
          console.error("Error with DeepInfra:", error)
          // If DeepInfra fails, try other providers
          if (this.deepseek) {
            console.log("Falling back to DeepSeek")
            return this.tryDeepSeek(prompt, model)
          } else if (this.openai) {
            console.log("Falling back to OpenAI")
            return this.tryOpenAI(prompt, model)
          } else {
            return this.getFallbackResponse(prompt)
          }
        }
      }

      // Use DeepSeek if it's the current provider
      else if (this.currentProvider === "deepseek" && this.deepseek) {
        try {
          console.log("Attempting to use DeepSeek API")
          return await this.tryDeepSeek(prompt, model)
        } catch (error) {
          console.error("Error with DeepSeek:", error)
          // If DeepSeek fails, try other providers
          if (this.deepinfra) {
            console.log("Falling back to DeepInfra")
            return this.tryDeepInfra(prompt, model)
          } else if (this.openai) {
            console.log("Falling back to OpenAI")
            return this.tryOpenAI(prompt, model)
          } else {
            return this.getFallbackResponse(prompt)
          }
        }
      }

      // Use OpenAI if it's the current provider
      else if (this.currentProvider === "openai" && this.openai) {
        try {
          console.log("Attempting to use OpenAI API")
          return await this.tryOpenAI(prompt, model)
        } catch (error) {
          console.error("Error with OpenAI:", error)
          // If OpenAI fails, try other providers
          if (this.deepinfra) {
            console.log("Falling back to DeepInfra")
            return this.tryDeepInfra(prompt, model)
          } else if (this.deepseek) {
            console.log("Falling back to DeepSeek")
            return this.tryDeepSeek(prompt, model)
          } else {
            return this.getFallbackResponse(prompt)
          }
        }
      }

      // Try Together AI if it's the current provider
      else if (this.currentProvider === "together" && this.togetherApiKey) {
        try {
          console.log("Attempting to use Together AI API")
          return await this.tryTogetherAI(prompt, model)
        } catch (error) {
          console.error("Error with Together AI:", error)
          // If Together AI fails, try other providers
          if (this.deepseek) {
            console.log("Falling back to DeepSeek")
            return this.tryDeepSeek(prompt, model)
          } else if (this.openai) {
            console.log("Falling back to OpenAI")
            return this.tryOpenAI(prompt, model)
          } else {
            return this.getFallbackResponse(prompt)
          }
        }
      }

      // Use fallback if no API keys are available
      else {
        console.log("No API providers available, using fallback")
        return this.getFallbackResponse(prompt)
      }
    } catch (error) {
      console.error("Error generating text:", error)
      return this.getFallbackResponse(prompt)
    }
  }

  private async tryDeepSeek(prompt: string, model?: string): Promise<string> {
    if (!this.deepseek) {
      throw new Error("DeepSeek client not initialized")
    }

    try {
      console.log("Making DeepSeek API request")

      // Format messages for DeepSeek's chat completion API
      const messages = [{ role: "user", content: prompt }]

      const response = await this.deepseek.createChatCompletion(messages, {
        model: model || "deepseek-chat",
        temperature: 0.7,
        max_tokens: 1024,
      })

      // Extract the response content
      if (response.choices && response.choices.length > 0 && response.choices[0].message) {
        return response.choices[0].message.content || "No response generated"
      } else {
        console.error("Unexpected DeepSeek API response format:", response)
        throw new Error("Unexpected DeepSeek API response format")
      }
    } catch (error) {
      console.error("DeepSeek API error:", error)
      throw error
    }
  }

  // Helper method to try Together AI
  private async tryTogetherAI(prompt: string, model?: string): Promise<string> {
    try {
      console.log("Making Together AI API request")
      const response = await fetch(`https://api.together.xyz/v1/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.togetherApiKey}`,
        },
        body: JSON.stringify({
          model: model || "mistralai/Mixtral-8x7B-Instruct-v0.1",
          prompt,
          max_tokens: 1024,
          temperature: 0.7,
        }),
      })

      console.log(`Together AI API response status: ${response.status}`)

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`Together AI API error (${response.status}):`, errorText)
        throw new Error(`Together AI API request failed with status ${response.status}: ${errorText}`)
      }

      const data = await response.json()
      console.log("Together AI API response received:", JSON.stringify(data).substring(0, 200) + "...")

      return data.choices[0].text
    } catch (error) {
      console.error("Together AI API error:", error)
      throw error
    }
  }

  private async tryOpenAI(prompt: string, model?: string): Promise<string> {
    if (!this.openai) {
      throw new Error("OpenAI client not initialized")
    }

    try {
      console.log("Making OpenAI API request")
      const response = await this.openai.chat.completions.create({
        model: model || "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1024,
        temperature: 0.7,
      })

      console.log("OpenAI API response received")
      return response.choices[0].message.content || "No response generated"
    } catch (error) {
      console.error("OpenAI API error:", error)
      throw error
    }
  }

  private async tryDeepInfra(prompt: string, model?: string): Promise<string> {
    if (!this.deepinfra) {
      throw new Error("DeepInfra client not initialized")
    }

    try {
      console.log("Making DeepInfra API request")

      // Format messages for DeepInfra's chat completion API
      const messages = [{ role: "user", content: prompt }]

      const response = await this.deepinfra.createChatCompletion(messages, {
        model: model || "meta-llama/Llama-3-70b-chat-hf",
        temperature: 0.7,
        max_tokens: 1024,
      })

      // Extract the response content
      if (response.results && response.results.length > 0) {
        // The response format might be different depending on the model
        // Try different possible response formats
        if (response.results[0].generated_text) {
          return response.results[0].generated_text || "No response generated"
        } else if (response.results[0].text) {
          return response.results[0].text || "No response generated"
        } else if (typeof response.results[0] === "string") {
          return response.results[0]
        } else {
          console.log("Unexpected response format, full response:", JSON.stringify(response))
          return "The AI generated a response in an unexpected format. Please try again."
        }
      } else {
        console.error("Unexpected DeepInfra API response format:", response)
        throw new Error("Unexpected DeepInfra API response format")
      }
    } catch (error) {
      console.error("DeepInfra API error:", error)
      throw error
    }
  }

  // Fallback response generator that doesn't rely on external APIs
  private getFallbackResponse(prompt: string): string {
    console.log("Using fallback response generator")
    // Extract the user's question from the prompt
    const userQuestion = this.extractUserQuestion(prompt)

    // Check if the question is about current market data or prices
    if (this.isAskingForRealTimeData(userQuestion)) {
      return "I don't have access to real-time market data, current prices, or recent news. I cannot search the web or access external information sources. I can only provide general educational information about trading concepts and strategies."
    }

    // Check if it's about a specific trading concept
    if (this.isAboutTradingConcept(userQuestion)) {
      return this.getTradingConceptResponse(userQuestion)
    }

    // Default response
    return "I'm currently operating in fallback mode due to API connection issues. I can provide basic information about trading concepts, but my responses are limited. Please try again later for more detailed answers, or ask me about basic trading concepts like 'What is a moving average?' or 'How do stop losses work?'"
  }

  // Helper to extract the user's question from the prompt
  private extractUserQuestion(prompt: string): string {
    // Look for the last occurrence of "User:" in the prompt
    const userPrefix = "User: "
    const lastUserIndex = prompt.lastIndexOf(userPrefix)

    if (lastUserIndex !== -1) {
      // Extract everything after the last "User:" until the end or the next "Assistant:"
      const afterUser = prompt.substring(lastUserIndex + userPrefix.length)
      const nextAssistantIndex = afterUser.indexOf("Assistant:")

      if (nextAssistantIndex !== -1) {
        return afterUser.substring(0, nextAssistantIndex).trim()
      } else {
        return afterUser.trim()
      }
    }

    return prompt.trim()
  }

  // Check if the question is asking for real-time data
  private isAskingForRealTimeData(question: string): boolean {
    const realTimeKeywords = [
      "current price",
      "right now",
      "today's",
      "latest price",
      "current market",
      "today",
      "yesterday",
      "this week",
      "this month",
      "recent news",
      "what is happening",
      "trending",
      "should I buy",
      "should I sell",
      "good time to invest",
      "market outlook",
      "forecast",
      "prediction",
      "what will happen",
    ]

    return realTimeKeywords.some((keyword) => question.toLowerCase().includes(keyword.toLowerCase()))
  }

  // Check if the question is about a trading concept
  private isAboutTradingConcept(question: string): boolean {
    const tradingConcepts = [
      "moving average",
      "macd",
      "rsi",
      "relative strength",
      "bollinger",
      "support",
      "resistance",
      "trend line",
      "candlestick",
      "chart pattern",
      "technical analysis",
      "fundamental analysis",
      "stop loss",
      "take profit",
      "risk management",
      "position sizing",
      "leverage",
      "margin",
      "day trading",
      "swing trading",
      "scalping",
      "options",
      "futures",
      "forex",
      "cryptocurrency",
    ]

    return tradingConcepts.some((concept) => question.toLowerCase().includes(concept.toLowerCase()))
  }

  // Provide a response about a trading concept
  private getTradingConceptResponse(question: string): string {
    // First check our internal knowledge bases
    for (const category in this.technicalIndicatorsKnowledge) {
      const categoryData = this.technicalIndicatorsKnowledge[category as keyof typeof this.technicalIndicatorsKnowledge]
      for (const key in categoryData) {
        if (question.toLowerCase().includes(key.toLowerCase())) {
          return `As a trading instructor at Cyber Trader Pro University, I can explain that ${categoryData[key as keyof typeof categoryData]}`
        }
      }
    }

    for (const category in this.tradingFundamentalsKnowledge) {
      const categoryData = this.tradingFundamentalsKnowledge[category as keyof typeof this.tradingFundamentalsKnowledge]
      for (const key in categoryData) {
        if (question.toLowerCase().includes(key.toLowerCase())) {
          return `As a trading instructor at Cyber Trader Pro University, I can explain that ${categoryData[key as keyof typeof categoryData]}`
        }
      }
    }

    for (const category in this.riskManagementKnowledge) {
      const categoryData = this.riskManagementKnowledge[category as keyof typeof this.riskManagementKnowledge]
      for (const key in categoryData) {
        if (question.toLowerCase().includes(key.toLowerCase())) {
          return `As a trading instructor at Cyber Trader Pro University, I can explain that ${categoryData[key as keyof typeof categoryData]}`
        }
      }
    }

    // Basic responses for common trading concepts if not found in knowledge bases
    if (question.toLowerCase().includes("moving average")) {
      return "As a trading instructor at Cyber Trader Pro University, I can explain that a Moving Average (MA) is a widely used technical indicator that smooths out price data by creating a constantly updated average price. The average is taken over a specific period of time, like 10 days, 20 minutes, 30 weeks, or any time period the trader chooses. There are different types of moving averages, with the most common being the Simple Moving Average (SMA) and the Exponential Moving Average (EMA). Moving averages help traders identify the direction of a trend and potential support or resistance levels."
    }

    if (question.toLowerCase().includes("rsi") || question.toLowerCase().includes("relative strength")) {
      return "As a trading instructor at Cyber Trader Pro University, I can explain that the Relative Strength Index (RSI) is a momentum oscillator that measures the speed and change of price movements. The RSI oscillates between zero and 100 and is typically used to identify overbought or oversold conditions in a market. Traditionally, an RSI value over 70 is considered overbought, while a value below 30 is considered oversold. Traders use these levels to identify potential reversal points in the market."
    }

    if (question.toLowerCase().includes("stop loss")) {
      return "As a trading instructor at Cyber Trader Pro University, I can explain that a stop-loss order is a type of order placed with a broker to sell a security when it reaches a certain price. It's designed to limit an investor's loss on a position. For example, if you buy a stock at $50 per share and set a stop-loss order at $45, your position would be sold if the stock price falls to $45, limiting your loss to 10%. Stop-loss orders are crucial for risk management in trading."
    }

    if (question.toLowerCase().includes("risk management")) {
      return "As a trading instructor at Cyber Trader Pro University, I can explain that risk management in trading refers to the identification, analysis, and acceptance or mitigation of uncertainty in investment decisions. Effective risk management involves setting proper position sizes, using stop-loss orders, diversifying your portfolio, and never risking more than you can afford to lose. A common rule of thumb is to never risk more than 1-2% of your trading capital on a single trade."
    }

    // Default response for other trading concepts
    return "As a trading instructor at Cyber Trader Pro University, I can explain that this is an important trading concept to understand. While I'm currently operating in fallback mode due to API connection issues, I can tell you that studying and mastering key trading concepts is essential for success in the markets. When the system is fully operational, I can provide more detailed explanations about specific trading strategies, indicators, and risk management techniques."
  }

  // Keep the other methods from the original service
  async analyzeMarketSentiment(ticker: string): Promise<{ sentiment: string; confidence: number; analysis: string }> {
    const prompt = `As a trading instructor at Cyber Trader Pro University, analyze the current market sentiment for ${ticker}. Consider recent news, social media trends, and market movements. Provide a sentiment (bullish, bearish, or neutral), a confidence score between 0 and 1, and a brief analysis.`

    try {
      const response = await this.generateText(prompt)

      // Extract sentiment from response
      let sentiment = "neutral"
      let confidence = 0.5

      if (response.toLowerCase().includes("bullish")) {
        sentiment = "bullish"
        confidence = 0.7 + Math.random() * 0.3 // Random confidence between 0.7 and 1.0
      } else if (response.toLowerCase().includes("bearish")) {
        sentiment = "bearish"
        confidence = 0.7 + Math.random() * 0.3
      } else {
        confidence = 0.4 + Math.random() * 0.3 // Random confidence between 0.4 and 0.7
      }

      return {
        sentiment,
        confidence,
        analysis: response,
      }
    } catch (error) {
      console.error("Error analyzing market sentiment:", error)
      return {
        sentiment: "neutral",
        confidence: 0.5,
        analysis: "Unable to analyze market sentiment at this time.",
      }
    }
  }

  // ... other methods from the original service

  // Add a method to get the current provider name for display
  getCurrentProvider(): string {
    switch (this.currentProvider) {
      case "openai":
        return "OpenAI"
      case "deepseek":
        return "DeepSeek"
      case "deepinfra":
        return "Deep Infra"
      case "fallback":
        return "Local Fallback"
      default:
        return "AI"
    }
  }

  // Add a method to get the current model name
  getCurrentModel(): string {
    switch (this.currentProvider) {
      case "openai":
        return "GPT-4o"
      case "deepseek":
        return "DeepSeek Chat"
      case "deepinfra":
        return "Llama-3-70b"
      case "fallback":
        return "Basic Mode"
      default:
        return "AI Model"
    }
  }
}

// Export a singleton instance
export const aiService = new AIService()
