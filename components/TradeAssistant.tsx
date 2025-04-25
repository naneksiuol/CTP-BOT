"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Send, User, RefreshCw, ArrowDown, AlertTriangle, Info, GraduationCap, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function TradeAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Welcome to Cyber Trader Pro University! I'm your AI Trading Instructor, here to help you learn about trading concepts, technical indicators, risk management, and trading strategies. **I don't have access to real-time market data or current prices, but I can provide educational content to help you become a better trader.**\n\nWhat would you like to learn about today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [provider, setProvider] = useState("AI")
  const [model, setModel] = useState("Model")
  const [isInFallbackMode, setIsInFallbackMode] = useState(false)
  const [apiFailCount, setApiFailCount] = useState(0)
  const [category, setCategory] = useState<"general" | "indicators" | "fundamentals" | "risk">("general")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Local fallback response generator
  const getFallbackResponse = (question: string): string => {
    // Check if the question is asking for real-time data or prices
    if (isAskingForRealTimeData(question)) {
      return "As a trading instructor at Cyber Trader Pro University, I should clarify that I don't have access to real-time market data, current prices, or recent news. I cannot search the web or access external information sources. I can only provide general educational information about trading concepts and strategies."
    }

    // Check if it's about a specific trading concept
    if (isAboutTradingConcept(question)) {
      return getTradingConceptResponse(question)
    }

    // Default response
    return "I'm currently operating in fallback mode due to connection issues. As a trading instructor at Cyber Trader Pro University, I can provide basic information about trading concepts, but my responses are limited. Please try again later for more detailed answers, or ask me about basic trading concepts like 'What is a moving average?' or 'How do stop losses work?'"
  }

  // Check if the question is asking for real-time data
  const isAskingForRealTimeData = (question: string): boolean => {
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
  const isAboutTradingConcept = (question: string): boolean => {
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
  const getTradingConceptResponse = (question: string): string => {
    // Basic responses for common trading concepts
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

    if (question.toLowerCase().includes("macd")) {
      return "As a trading instructor at Cyber Trader Pro University, I can explain that the Moving Average Convergence Divergence (MACD) is a trend-following momentum indicator that shows the relationship between two moving averages of a security's price. The MACD is calculated by subtracting the 26-period Exponential Moving Average (EMA) from the 12-period EMA. The result of that calculation is the MACD line. A nine-day EMA of the MACD called the 'signal line,' is then plotted on top of the MACD line, which can function as a trigger for buy and sell signals."
    }

    if (question.toLowerCase().includes("bollinger")) {
      return "As a trading instructor at Cyber Trader Pro University, I can explain that Bollinger Bands are a technical analysis tool defined by a set of trendlines plotted two standard deviations (positively and negatively) away from a simple moving average (SMA) of a security's price. Developed by John Bollinger, they're used to generate oversold or overbought signals. When the price moves close to the upper band, it suggests the asset may be overbought; when it moves close to the lower band, it may be oversold."
    }

    if (question.toLowerCase().includes("candlestick")) {
      return "As a trading instructor at Cyber Trader Pro University, I can explain that candlestick charts are a type of financial chart that shows the high, low, open, and closing prices of a security for a specific period. Each 'candlestick' typically represents one day's worth of price data about a stock. Over time, they can form patterns that traders use to recognize potential price movement. Some common patterns include doji, hammer, engulfing patterns, and morning/evening stars."
    }

    // Default response for other trading concepts
    return "As a trading instructor at Cyber Trader Pro University, I can tell you that this is an important trading concept to understand. While I'm currently operating in fallback mode due to connection issues, I can tell you that studying and mastering key trading concepts is essential for success in the markets. When the system is fully operational, I can provide more detailed explanations about specific trading strategies, indicators, and risk management techniques."
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // If we've had multiple API failures, switch to fallback mode immediately
    if (apiFailCount >= 2) {
      handleFallbackResponse(input)
      return
    }

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout

      const response = await fetch("/api/ai/trade-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          history: messages.slice(-6), // Send last 6 messages for context
          category: category, // Send the selected category
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`Server responded with status: ${response.status}`, errorText)
        throw new Error(`Server responded with status: ${response.status}`)
      }

      let data
      try {
        data = await response.json()
      } catch (jsonError) {
        console.error("Error parsing JSON response:", jsonError)
        throw new Error("Invalid response format")
      }

      // Reset API fail count on success
      setApiFailCount(0)

      // Update provider and model info
      if (data.provider) {
        setProvider(data.provider)
        // Check if we're in fallback mode
        setIsInFallbackMode(data.provider === "Local Fallback")
      }

      if (data.model) {
        setModel(data.model)
      }

      // Add assistant response to chat
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response || "I'm having trouble generating a response right now. Please try again later.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error getting AI response:", error)

      // Increment API fail count
      setApiFailCount((prev) => prev + 1)

      // Show toast notification for error
      toast({
        title: "Connection Error",
        description: "Having trouble connecting to the AI service. Using fallback mode.",
        variant: "destructive",
      })

      // Use local fallback
      handleFallbackResponse(input)
    } finally {
      setIsLoading(false)
      // Focus the input field after sending
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }

  // Handle fallback response generation
  const handleFallbackResponse = (userInput: string) => {
    setIsInFallbackMode(true)
    setProvider("Local Fallback")
    setModel("Basic Mode")

    // Generate fallback response
    const fallbackResponse = getFallbackResponse(userInput)

    // Add assistant response to chat
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: fallbackResponse,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, assistantMessage])
  }

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Welcome to Cyber Trader Pro University! I'm your AI Trading Instructor, here to help you learn about trading concepts, technical indicators, risk management, and trading strategies. **I don't have access to real-time market data or current prices, but I can provide educational content to help you become a better trader.**\n\nWhat would you like to learn about today?",
        timestamp: new Date(),
      },
    ])
  }

  return (
    <Card className="flex flex-col h-[600px] bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-cyan-700">
                <GraduationCap className="h-4 w-4 text-cyan-100" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-cyan-100">Trading Instructor</CardTitle>
              <CardDescription className="text-gray-400">Cyber Trader Pro University</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="bg-cyan-500/20 text-cyan-100">
            Instructor
          </Badge>
        </div>
        <Alert className="mt-2 bg-red-900/30 border-red-500/30">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-400 text-xs">
            This assistant cannot access real-time data or search the web. For educational use only.
          </AlertDescription>
        </Alert>

        {isInFallbackMode && (
          <Alert className="mt-2 bg-yellow-900/30 border-yellow-500/30">
            <Info className="h-4 w-4 text-yellow-400" />
            <AlertDescription className="text-yellow-400 text-xs">
              Running in fallback mode with limited capabilities. Try asking about basic trading concepts.
            </AlertDescription>
          </Alert>
        )}
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden flex flex-col p-0">
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 pt-1 pb-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex max-w-[80%] ${
                    message.role === "user"
                      ? "bg-cyan-600/30 rounded-tl-lg rounded-bl-lg rounded-br-lg"
                      : "bg-[rgba(10,14,23,0.7)] rounded-tr-lg rounded-bl-lg rounded-br-lg"
                  } p-3`}
                >
                  <div className="mr-2 mt-0.5">
                    {message.role === "user" ? (
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-cyan-600 text-xs">
                          <User className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-cyan-700 text-xs">
                          <GraduationCap className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                  <div>
                    <div className="text-sm text-gray-200 whitespace-pre-wrap">{message.content}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex max-w-[80%] bg-[rgba(10,14,23,0.7)] rounded-tr-lg rounded-bl-lg rounded-br-lg p-3">
                  <div className="mr-2 mt-0.5">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-cyan-700 text-xs">
                        <GraduationCap className="h-3 w-3" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin text-cyan-400 mr-2" />
                    <span className="text-sm text-gray-300">Preparing lesson...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        <div className="p-4 border-t border-cyan-500/20 bg-[rgba(10,14,23,0.5)]">
          <div className="flex justify-between mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearChat}
              className="h-7 px-2 text-xs text-gray-400 hover:text-cyan-100"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Clear chat
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToBottom}
              className="h-7 px-2 text-xs text-gray-400 hover:text-cyan-100"
            >
              <ArrowDown className="h-3 w-3 mr-1" />
              Scroll to bottom
            </Button>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-2">
              <Select
                value={category}
                onValueChange={(value: "general" | "indicators" | "fundamentals" | "risk") => setCategory(value)}
              >
                <SelectTrigger className="bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-white h-8">
                  <SelectValue placeholder="Topic Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Trading</SelectItem>
                  <SelectItem value="indicators">Technical Indicators</SelectItem>
                  <SelectItem value="fundamentals">Trading Fundamentals</SelectItem>
                  <SelectItem value="risk">Risk Management</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                className="h-8 bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-cyan-100"
              >
                <BookOpen className="h-4 w-4 mr-1" />
                Lesson Topics
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  isInFallbackMode
                    ? "Ask about basic trading concepts like moving averages, RSI, or stop losses..."
                    : "Ask your trading instructor about any trading topic..."
                }
                className="flex-1 bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-white"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                className="bg-cyan-600 hover:bg-cyan-700"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
