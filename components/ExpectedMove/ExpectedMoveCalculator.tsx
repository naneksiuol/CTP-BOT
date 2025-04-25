"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Calculator, RefreshCw, Brain, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { TickerInput } from "@/components/TickerInput"

export function ExpectedMoveCalculator() {
  const [ticker, setTicker] = useState<string>("")
  const [price, setPrice] = useState<number | null>(null)
  const [volatility, setVolatility] = useState<number>(20)
  const [days, setDays] = useState<number>(30)
  const [expectedMove, setExpectedMove] = useState<number | null>(null)
  const [lowerBound, setLowerBound] = useState<number | null>(null)
  const [upperBound, setUpperBound] = useState<number | null>(null)
  const [isCalculating, setIsCalculating] = useState<boolean>(false)

  const handlePriceUpdate = useCallback((newPrice: number | null) => {
    setPrice(newPrice)
  }, [])

  const calculateExpectedMove = () => {
    if (!price) {
      alert("Please enter a valid ticker and fetch the current price.")
      return
    }

    setIsCalculating(true)

    // Simulate AI processing delay
    setTimeout(() => {
      // CEM = Price × Volatility × √(DTE/365)
      const move = price * (volatility / 100) * Math.sqrt(days / 365)
      setExpectedMove(move)
      setLowerBound(price - move)
      setUpperBound(price + move)
      setIsCalculating(false)
    }, 1000)
  }

  const resetCalculator = () => {
    setPrice(null)
    setVolatility(20)
    setDays(30)
    setExpectedMove(null)
    setLowerBound(null)
    setUpperBound(null)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-100 flex items-center">
            <Calculator className="h-6 w-6 mr-2 text-cyan-400" />
            Cyber Expected Move Calculator
          </CardTitle>
          <CardDescription className="text-gray-300">
            Calculate the expected price range for any asset using our proprietary AI-Implied Volatility model
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="ticker" className="text-gray-300">
              Ticker Symbol
            </Label>
            <TickerInput onPriceUpdate={handlePriceUpdate} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="volatility" className="text-gray-300">
                AI-Implied Volatility (%)
              </Label>
              <span className="text-cyan-400">{volatility}%</span>
            </div>
            <Slider
              id="volatility"
              min={1}
              max={100}
              step={0.1}
              value={[volatility]}
              onValueChange={(value) => setVolatility(value[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="days" className="text-gray-300">
                Days to Expiration
              </Label>
              <span className="text-cyan-400">{days} days</span>
            </div>
            <Slider
              id="days"
              min={1}
              max={365}
              step={1}
              value={[days]}
              onValueChange={(value) => setDays(value[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>1 day</span>
              <span>6 months</span>
              <span>1 year</span>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={calculateExpectedMove}
              disabled={isCalculating || !price}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >
              {isCalculating ? (
                <>
                  <Brain className="mr-2 h-4 w-4 animate-pulse" />
                  Calculating...
                </>
              ) : (
                <>
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate CEM
                </>
              )}
            </Button>
            <Button onClick={resetCalculator} variant="outline" className="border-cyan-500/20">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-100 flex items-center">
            <Brain className="h-6 w-6 mr-2 text-cyan-400" />
            Expected Move Results
          </CardTitle>
          <CardDescription className="text-gray-300">
            The calculated price range with 68% probability (one standard deviation)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {expectedMove ? (
            <>
              <div className="bg-[rgba(10,14,23,0.7)] p-6 rounded-lg border border-cyan-500/10 text-center">
                <h3 className="text-lg font-medium text-cyan-100 mb-4">Cyber Expected Move (CEM)</h3>
                <div className="text-3xl font-bold text-cyan-400 mb-2">±${expectedMove.toFixed(2)}</div>
                <p className="text-gray-300 text-sm">
                  This is the expected price movement with 68% probability over {days} days
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[rgba(10,14,23,0.7)] p-4 rounded-md text-center">
                  <p className="text-gray-300 text-sm mb-1">Lower Bound</p>
                  <p className="text-xl font-bold text-red-400">${lowerBound?.toFixed(2)}</p>
                </div>
                <div className="bg-[rgba(10,14,23,0.7)] p-4 rounded-md text-center">
                  <p className="text-gray-300 text-sm mb-1">Upper Bound</p>
                  <p className="text-xl font-bold text-green-400">${upperBound?.toFixed(2)}</p>
                </div>
              </div>

              <div className="relative pt-6">
                <div className="absolute left-0 right-0 top-0 h-1 bg-gray-700">
                  <div
                    className="absolute h-1 bg-cyan-400"
                    style={{
                      left: `${Math.max(0, Math.min(100, ((lowerBound || 0) / (price || 1)) * 100))}%`,
                      right: `${Math.max(0, Math.min(100, 100 - ((upperBound || 0) / (price || 1)) * 100))}%`,
                    }}
                  ></div>
                  <div
                    className="absolute w-2 h-2 rounded-full bg-white -mt-0.5"
                    style={{ left: `${(price / (price * 2)) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  <span>${((price || 0) * 0.5).toFixed(2)}</span>
                  <span>${price?.toFixed(2)}</span>
                  <span>${((price || 0) * 1.5).toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-[rgba(10,14,23,0.7)] p-4 rounded-md">
                <h4 className="text-cyan-100 font-medium mb-2">Probability Analysis</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Within CEM Range:</span>
                    <Badge className="bg-cyan-500/20 text-cyan-400">68%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Within 2x CEM Range:</span>
                    <Badge className="bg-cyan-500/20 text-cyan-400">95%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Beyond 2x CEM Range:</span>
                    <Badge className="bg-red-500/20 text-red-400">5%</Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between bg-[rgba(10,14,23,0.7)] p-3 rounded-md text-sm">
                <span className="text-gray-300">Calculation Formula:</span>
                <span className="text-cyan-100 font-mono">
                  {price} × {(volatility / 100).toFixed(2)} × √({days}/365) = ±{expectedMove.toFixed(2)}
                </span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-80 text-center">
              <Calculator className="h-12 w-12 text-cyan-400/50 mb-4" />
              <h3 className="text-lg font-medium text-cyan-100 mb-2">No Calculation Yet</h3>
              <p className="text-gray-400 max-w-xs">
                Enter your parameters and click "Calculate CEM" to see the expected price range for your asset
              </p>
              <Button
                onClick={calculateExpectedMove}
                className="mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-700"
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                Calculate Now
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
