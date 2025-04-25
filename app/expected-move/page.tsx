"use client"

import { useState } from "react"
import Link from "next/link"
import { TrendingUp, Brain, Calculator, BarChartIcon as ChartBar, Zap, BarChart2, Play, Award } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExpectedMoveCalculator } from "@/components/ExpectedMove/ExpectedMoveCalculator"
import { StrategiesTab } from "@/components/ExpectedMove/StrategiesTab"
import VolatilityArbitrageTab from "@/components/ExpectedMove/VolatilityArbitrageTab"
import { RiskManagementTab } from "@/components/ExpectedMove/RiskManagementTab"
import { ProprietaryToolsTab } from "@/components/ExpectedMove/ProprietaryToolsTab"
import { ExecutionWorkflowTab } from "@/components/ExpectedMove/ExecutionWorkflowTab"
import { PerformanceMetricsTab } from "@/components/ExpectedMove/PerformanceMetricsTab"

export default function ExpectedMovePage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex flex-col min-h-screen">
      {/* Background Image Container */}
      <div className="fixed inset-0 z-0 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_pz9x71pz9x71pz9x.jpg-sqMt2vX0nnDh2Hw9U0HQVxUUEMA6Ri.jpeg")',
            backgroundSize: "contain",
            backgroundPosition: "center center",
            height: "100%",
            width: "100%",
            backgroundAttachment: "fixed",
          }}
        />
        {/* Dark overlay for better readability */}
        <div className="absolute inset-0 bg-[rgba(10,14,23,0.85)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        <header className="sticky top-0 z-40 w-full border-b border-cyan-500/20 bg-[rgba(10,14,23,0.95)]">
          <div className="container flex h-14 items-center">
            <Link className="flex items-center justify-center" href="/">
              <TrendingUp className="h-6 w-6 mr-2 text-cyan-400" />
              <span className="font-bold text-cyan-100">Cyber Trader Pro</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
              <Link className="text-sm font-medium text-gray-200 hover:text-blue-400 transition-colors" href="/">
                Home
              </Link>
              <Link
                className="text-sm font-medium text-gray-200 hover:text-blue-400 transition-colors"
                href="/pro-predictor"
              >
                Pro Predictor
              </Link>
              <Link
                className="text-sm font-medium text-gray-200 hover:text-blue-400 transition-colors"
                href="/dashboard"
              >
                Dashboard
              </Link>
              <Link className="text-sm font-medium text-gray-200 hover:text-blue-400 transition-colors" href="/about">
                About
              </Link>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <h1 className="text-4xl font-bold text-cyan-100 mb-4">Cyber Expected Move Trading System</h1>
            <p className="text-xl text-gray-300 max-w-3xl">A Next-Generation Framework for Volatility-Driven Trading</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex flex-wrap mb-8 bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
              <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-500/20">
                Overview
              </TabsTrigger>
              <TabsTrigger value="calculator" className="data-[state=active]:bg-cyan-500/20">
                Calculator
              </TabsTrigger>
              <TabsTrigger value="strategies" className="data-[state=active]:bg-cyan-500/20">
                Strategies
              </TabsTrigger>
              <TabsTrigger value="volatility" className="data-[state=active]:bg-cyan-500/20">
                Volatility
              </TabsTrigger>
              <TabsTrigger value="risk" className="data-[state=active]:bg-cyan-500/20">
                Risk
              </TabsTrigger>
              <TabsTrigger value="tools" className="data-[state=active]:bg-cyan-500/20">
                Tools
              </TabsTrigger>
              <TabsTrigger value="execution" className="data-[state=active]:bg-cyan-500/20">
                Execution
              </TabsTrigger>
              <TabsTrigger value="performance" className="data-[state=active]:bg-cyan-500/20">
                Performance
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-cyan-100 flex items-center">
                    <Brain className="h-6 w-6 mr-2 text-cyan-400" />
                    Core Concept: Cyber Expected Move
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    The Cyber Expected Move (CEM) quantifies the probable price range of an asset within a defined
                    timeframe using real-time options data and machine learning.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-300">
                    The <span className="text-cyan-400 font-semibold">Cyber Expected Move (CEM)</span> calculates the
                    market's consensus range (68% probability) using advanced volatility analytics. It represents a
                    sophisticated evolution of traditional expected move calculations, enhanced with proprietary AI
                    algorithms and real-time market data.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-[rgba(10,14,23,0.7)] border-cyan-500/10">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-cyan-100 flex items-center">
                          <Brain className="h-4 w-4 mr-2 text-cyan-400" />
                          AI-Implied Volatility (AIV)
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-gray-300">
                        Proprietary volatility metric trained on 10+ years of market regimes, updated in real-time.
                      </CardContent>
                    </Card>

                    <Card className="bg-[rgba(10,14,23,0.7)] border-cyan-500/10">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-cyan-100 flex items-center">
                          <Calculator className="h-4 w-4 mr-2 text-cyan-400" />
                          Dynamic Time Decay
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-gray-300">
                        Adjusts CEM boundaries hourly using time-to-expiration and liquidity signals.
                      </CardContent>
                    </Card>

                    <Card className="bg-[rgba(10,14,23,0.7)] border-cyan-500/10">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-cyan-100 flex items-center">
                          <ChartBar className="h-4 w-4 mr-2 text-cyan-400" />
                          Quantum Probability Bands
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-gray-300">
                        AI-powered support/resistance zones with adaptive standard deviations.
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-[rgba(10,14,23,0.7)] p-6 rounded-lg border border-cyan-500/10">
                    <h3 className="text-lg font-medium text-cyan-100 mb-4">Calculation Example</h3>
                    <p className="text-gray-300 mb-4">For a stock at $100 with 20% AIV and 30 days to expiration:</p>
                    <div className="bg-[rgba(10,14,23,0.9)] p-4 rounded-md font-mono text-cyan-100 mb-4">
                      CEM = 100 × 0.20 × √(30/365) ≈ ±$5.30
                    </div>
                    <p className="text-cyan-400 font-medium">Output: $94.70 to $105.30 expected range.</p>
                  </div>

                  <div className="flex justify-center mt-6">
                    <Button
                      onClick={() => setActiveTab("calculator")}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                    >
                      <Calculator className="mr-2 h-4 w-4" />
                      Try the CEM Calculator
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
                  <CardHeader>
                    <CardTitle className="text-cyan-100 flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-cyan-400" />
                      Strategic Applications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-cyan-100 font-medium">Range-Bound Trading</h3>
                      <p className="text-gray-300 text-sm">
                        Specialized strategies for trading within the expected move range, including Photon Condor,
                        Neutralizer Butterfly, and Quantum Strangle.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-cyan-100 font-medium">Volatility Arbitrage</h3>
                      <p className="text-gray-300 text-sm">
                        Exploit mismatches between AI-Implied Volatility and Holographic Volatility for profit
                        opportunities.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-cyan-100 font-medium">Risk Management</h3>
                      <p className="text-gray-300 text-sm">
                        Advanced position sizing and adaptive hedging techniques based on CEM boundaries.
                      </p>
                    </div>
                    <Button
                      onClick={() => setActiveTab("strategies")}
                      variant="outline"
                      className="w-full mt-2 border-cyan-500/20"
                    >
                      Explore Strategies
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
                  <CardHeader>
                    <CardTitle className="text-cyan-100 flex items-center">
                      <BarChart2 className="h-5 w-5 mr-2 text-cyan-400" />
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-gray-300">
                        <thead>
                          <tr className="border-b border-cyan-500/20">
                            <th className="text-left py-2 text-cyan-100">Metric</th>
                            <th className="text-center py-2 text-cyan-100">Backtest (2018-2023)</th>
                            <th className="text-center py-2 text-cyan-100">Live (2024)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-800">
                            <td className="py-2">Win Rate</td>
                            <td className="text-center py-2">68.7%</td>
                            <td className="text-center py-2 text-green-400">71.3%</td>
                          </tr>
                          <tr className="border-b border-gray-800">
                            <td className="py-2">Max Drawdown</td>
                            <td className="text-center py-2">12.4%</td>
                            <td className="text-center py-2 text-green-400">9.8%</td>
                          </tr>
                          <tr>
                            <td className="py-2">Sharpe Ratio</td>
                            <td className="text-center py-2">1.9</td>
                            <td className="text-center py-2 text-green-400">2.3</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <Button
                      onClick={() => setActiveTab("performance")}
                      variant="outline"
                      className="w-full mt-4 border-cyan-500/20"
                    >
                      View Detailed Performance
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20 mt-6">
                <CardHeader>
                  <CardTitle className="text-cyan-100 flex items-center">
                    <Award className="h-5 w-5 mr-2 text-cyan-400" />
                    Unique Advantages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[rgba(10,14,23,0.7)] p-4 rounded-md">
                      <h3 className="text-cyan-100 font-medium mb-2">Neural Calibration</h3>
                      <p className="text-gray-300 text-sm">
                        Self-adjusts CEM using VIX term structure and ETF flows for optimal accuracy.
                      </p>
                    </div>
                    <div className="bg-[rgba(10,14,23,0.7)] p-4 rounded-md">
                      <h3 className="text-cyan-100 font-medium mb-2">Dark Pool Integration</h3>
                      <p className="text-gray-300 text-sm">
                        Flags institutional activity near CEM boundaries to identify potential breakouts.
                      </p>
                    </div>
                    <div className="bg-[rgba(10,14,23,0.7)] p-4 rounded-md">
                      <h3 className="text-cyan-100 font-medium mb-2">Regime Detection</h3>
                      <p className="text-gray-300 text-sm">
                        Auto-switches between bullish/bearish CEM algorithms based on market conditions.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-gray-300 mb-4">
                      This model enhances traditional Expected Move theory with AI-driven analytics and
                      institutional-grade tools, positioning Cyber Trader Pro as the premier platform for
                      volatility-based trading.
                    </p>
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                      <Play className="mr-2 h-4 w-4" />
                      Start Using CEM Today
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calculator">
              <ExpectedMoveCalculator />
            </TabsContent>

            <TabsContent value="strategies">
              <StrategiesTab />
            </TabsContent>

            <TabsContent value="volatility">
              <VolatilityArbitrageTab />
            </TabsContent>

            <TabsContent value="risk">
              <RiskManagementTab />
            </TabsContent>

            <TabsContent value="tools">
              <ProprietaryToolsTab />
            </TabsContent>

            <TabsContent value="execution">
              <ExecutionWorkflowTab />
            </TabsContent>

            <TabsContent value="performance">
              <PerformanceMetricsTab />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
