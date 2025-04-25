"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, BookOpen } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PatternExplainer() {
  const [pattern, setPattern] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [explanation, setExplanation] = useState("")

  const patterns = [
    "Head and Shoulders",
    "Double Top",
    "Double Bottom",
    "Cup and Handle",
    "Ascending Triangle",
    "Descending Triangle",
    "Bullish Flag",
    "Bearish Flag",
    "Fibonacci Retracement",
    "MACD Crossover",
  ]

  const explainPattern = async () => {
    if (!pattern) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/ai/pattern?pattern=${encodeURIComponent(pattern)}`)
      if (!response.ok) throw new Error("Failed to explain pattern")
      const data = await response.json()
      setExplanation(data.explanation)
    } catch (error) {
      console.error("Error explaining pattern:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
      <CardHeader>
        <CardTitle className="text-cyan-100">AI Pattern Explainer</CardTitle>
        <CardDescription className="text-gray-300">Learn about trading patterns with AI explanations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Select value={pattern} onValueChange={setPattern}>
            <SelectTrigger className="bg-[rgba(10,14,23,0.5)] text-white border-cyan-500/20">
              <SelectValue placeholder="Select a pattern" />
            </SelectTrigger>
            <SelectContent>
              {patterns.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={explainPattern} disabled={isLoading || !pattern}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Explain
          </Button>
        </div>

        {explanation && (
          <div className="mt-4">
            <div className="flex items-center space-x-2 mb-2">
              <BookOpen className="h-5 w-5 text-cyan-400" />
              <h3 className="font-bold text-cyan-100">{pattern}</h3>
            </div>
            <div className="text-gray-300 text-sm bg-[rgba(10,14,23,0.5)] p-4 rounded-md">{explanation}</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
