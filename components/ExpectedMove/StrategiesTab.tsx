"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, Shield, BarChart2, Target, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function StrategiesTab() {
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-100 flex items-center">
            <Zap className="h-6 w-6 mr-2 text-cyan-400" />
            Range-Bound Trading Strategies
          </CardTitle>
          <CardDescription className="text-gray-300">
            Specialized strategies for trading within the expected move range
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="photon-condor" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6 bg-[rgba(10,14,23,0.7)] border-cyan-500/20">
              <TabsTrigger value="photon-condor" className="data-[state=active]:bg-cyan-500/20">
                Photon Condor
              </TabsTrigger>
              <TabsTrigger value="neutralizer-butterfly" className="data-[state=active]:bg-cyan-500/20">
                Neutralizer Butterfly
              </TabsTrigger>
              <TabsTrigger value="quantum-strangle" className="data-[state=active]:bg-cyan-500/20">
                Quantum Strangle
              </TabsTrigger>
            </TabsList>

            <TabsContent value="photon-condor">
              <div className="space-y-4">
                <div className="bg-[rgba(10,14,23,0.7)] p-6 rounded-lg border border-cyan-500/10">
                  <h3 className="text-lg font-medium text-cyan-100 mb-4 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-cyan-400" />
                    Photon Condor Strategy
                  </h3>
                  <p className="text-gray-300 mb-4">
                    The Photon Condor is a premium collection strategy designed to profit when price remains within the
                    CEM boundaries. It combines four options contracts to create a risk-defined position with high
                    probability of profit.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-cyan-400 text-sm font-medium mb-2">Setup</h4>
                      <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-300">
                        <li>Sell 1 OTM Put (strike at lower CEM boundary)</li>
                        <li>Buy 1 OTM Put (strike below lower CEM boundary)</li>
                        <li>Sell 1 OTM Call (strike at upper CEM boundary)</li>
                        <li>Buy 1 OTM Call (strike above upper CEM boundary)</li>
                      </ol>
                    </div>
                    <div>
                      <h4 className="text-cyan-400 text-sm font-medium mb-2">Characteristics</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                        <li>Maximum profit when price expires between short strikes</li>
                        <li>Limited risk defined by width between strikes minus credit received</li>
                        <li>Ideal for neutral market view with moderate-to-high IV</li>
                        <li>73% win rate in backtesting</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-[rgba(10,14,23,0.7)] p-6 rounded-lg border border-cyan-500/10">
                  <h3 className="text-lg font-medium text-cyan-100 mb-4">Execution Example</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3">
                        <span className="text-cyan-400 font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="text-cyan-400 text-sm font-medium mb-1">Identify CEM Boundaries</h4>
                        <p className="text-sm text-gray-300">
                          For stock XYZ at $100 with 45 DTE and 20% AIV, the CEM calculation shows expected range of
                          $92.50 to $107.50.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3">
                        <span className="text-cyan-400 font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="text-cyan-400 text-sm font-medium mb-1">Select Option Strikes</h4>
                        <p className="text-sm text-gray-300">
                          Sell $92.50 Put, Buy $87.50 Put, Sell $107.50 Call, Buy $112.50 Call (all with 45 DTE).
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3">
                        <span className="text-cyan-400 font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="text-cyan-400 text-sm font-medium mb-1">Analyze Risk/Reward</h4>
                        <p className="text-sm text-gray-300">
                          Net Credit: $1.20 per share ($120 per contract)
                          <br />
                          Max Risk: $380 per contract (width between strikes minus credit)
                          <br />
                          Max Return on Risk: 31.6%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[rgba(10,14,23,0.7)] p-6 rounded-lg border border-cyan-500/10">
                  <h3 className="text-lg font-medium text-cyan-100 mb-4 flex items-center">
                    <Info className="h-5 w-5 mr-2 text-cyan-400" />
                    Management Rules
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
                    <div>
                      <h4 className="text-cyan-400 font-medium mb-2">Profit Target</h4>
                      <p>Close at 50% of max profit (ideal), or hold until 7 DTE if profitable.</p>
                    </div>
                    <div>
                      <h4 className="text-cyan-400 font-medium mb-2">Loss Management</h4>
                      <p>
                        Close if loss reaches 2x the credit received, or if price breaks through CEM boundary with
                        momentum.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-cyan-400 font-medium mb-2">Adjustments</h4>
                      <p>
                        If price approaches short strike, roll the tested side further OTM to reduce delta exposure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="neutralizer-butterfly">
              <div className="space-y-4">
                <div className="bg-[rgba(10,14,23,0.7)] p-6 rounded-lg border border-cyan-500/10">
                  <h3 className="text-lg font-medium text-cyan-100 mb-4 flex items-center">
                    <Target className="h-5 w-5 mr-2 text-cyan-400" />
                    Neutralizer Butterfly Strategy
                  </h3>
                  <p className="text-gray-300 mb-4">
                    The Neutralizer Butterfly is a precision instrument designed to profit from price consolidation near
                    a specific target within the CEM range. It offers an asymmetric risk/reward profile with limited
                    risk and multiple profit expansion opportunities.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-cyan-400 text-sm font-medium mb-2">Setup</h4>
                      <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-300">
                        <li>Buy 1 OTM Call/Put (strike below expected target)</li>
                        <li>Sell 2 ATM Call/Put (strike at expected target)</li>
                        <li>Buy 1 OTM Call/Put (strike above expected target)</li>
                      </ol>
                    </div>
                    <div>
                      <h4 className="text-cyan-400 text-sm font-medium mb-2">Characteristics</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                        <li>Maximum profit when price expires exactly at middle strike</li>
                        <li>Limited risk to initial debit paid</li>
                        <li>Ideal for consolidating markets with clear support/resistance</li>
                        <li>48.7% win rate with 3.2% average return per trade</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-[rgba(10,14,23,0.7)] p-6 rounded-lg border border-cyan-500/10">
                  <h3 className="text-lg font-medium text-cyan-100 mb-4">Execution Example</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3">
                        <span className="text-cyan-400 font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="text-cyan-400 text-sm font-medium mb-1">Identify Target Price</h4>
                        <p className="text-sm text-gray-300">
                          For stock XYZ at $100, identify a target price of $105 (based on technical analysis or AI
                          projection).
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3">
                        <span className="text-cyan-400 font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="text-cyan-400 text-sm font-medium mb-1">Select Option Strikes</h4>
                        <p className="text-sm text-gray-300">
                          Buy 1 $100 Call, Sell 2 $105 Calls, Buy 1 $110 Call (all with 30 DTE).
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3">
                        <span className="text-cyan-400 font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="text-cyan-400 text-sm font-medium mb-1">Analyze Risk/Reward</h4>
                        <p className="text-sm text-gray-300">
                          Net Debit: $1.50 per share ($150 per contract)
                          <br />
                          Max Profit: $3.50 per share ($350 per contract) at $105 at expiration
                          <br />
                          Max Return on Risk: 233%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[rgba(10,14,23,0.7)] p-6 rounded-lg border border-cyan-500/10">
                  <h3 className="text-lg font-medium text-cyan-100 mb-4 flex items-center">
                    <Info className="h-5 w-5 mr-2 text-cyan-400" />
                    Management Rules
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
                    <div>
                      <h4 className="text-cyan-400 font-medium mb-2">Profit Target</h4>
                      <p>
                        Take profit at 80% of max theoretical profit, or when price reaches middle strike before
                        expiration.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-cyan-400 font-medium mb-2">Loss Management</h4>
                      <p>
                        Close if loss reaches 35% of max risk, or if price breaks outside of CEM range with conviction.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-cyan-400 font-medium mb-2">Adjustments</h4>
                      <p>
                        If price moves away from target, consider converting to an unbalanced butterfly by rolling the
                        untested wing closer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="quantum-strangle">
              <div className="space-y-4">
                <div className="bg-[rgba(10,14,23,0.7)] p-6 rounded-lg border border-cyan-500/10">
                  <h3 className="text-lg font-medium text-cyan-100 mb-4 flex items-center">
                    <BarChart2 className="h-5 w-5 mr-2 text-cyan-400" />
                    Quantum Strangle Strategy
                  </h3>
                  <p className="text-gray-300 mb-4">
                    The Quantum Strangle is designed to profit from significant price movements beyond the CEM
                    boundaries. It uses long options to capture explosive moves in either direction, making it ideal for
                    volatile markets or ahead of major events.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-cyan-400 text-sm font-medium mb-2">Setup</h4>
                      <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-300">
                        <li>Buy 1 OTM Put (strike at lower CEM boundary)</li>
                        <li>Buy 1 OTM Call (strike at upper CEM boundary)</li>
                      </ol>
                    </div>
                    <div>
                      <h4 className="text-cyan-400 text-sm font-medium mb-2">Characteristics</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                        <li>Profits when price moves significantly in either direction</li>
                        <li>Limited risk to initial debit paid</li>
                        <li>Unlimited profit potential</li>
                        <li>Ideal for expected news events, earnings, or volatile markets</li>
                        <li>38.4% win rate with 5.7% average return per trade</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-[rgba(10,14,23,0.7)] p-6 rounded-lg border border-cyan-500/10">
                  <h3 className="text-lg font-medium text-cyan-100 mb-4">Execution Example</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3">
                        <span className="text-cyan-400 font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="text-cyan-400 text-sm font-medium mb-1">Identify CEM Boundaries</h4>
                        <p className="text-sm text-gray-300">
                          For stock XYZ at $100 with 30 DTE and 25% AIV, the CEM calculation shows expected range of $95
                          to $105.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3">
                        <span className="text-cyan-400 font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="text-cyan-400 text-sm font-medium mb-1">Select Option Strikes</h4>
                        <p className="text-sm text-gray-300">Buy 1 $95 Put and Buy 1 $105 Call (both with 30 DTE).</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3">
                        <span className="text-cyan-400 font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="text-cyan-400 text-sm font-medium mb-1">Analyze Risk/Reward</h4>
                        <p className="text-sm text-gray-300">
                          Net Debit: $2.20 per share ($220 per contract)
                          <br />
                          Break-even Points: $92.80 and $107.20
                          <br />
                          Profit Potential: Unlimited in either direction
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[rgba(10,14,23,0.7)] p-6 rounded-lg border border-cyan-500/10">
                  <h3 className="text-lg font-medium text-cyan-100 mb-4 flex items-center">
                    <Info className="h-5 w-5 mr-2 text-cyan-400" />
                    Management Rules
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
                    <div>
                      <h4 className="text-cyan-400 font-medium mb-2">Profit Target</h4>
                      <p>
                        Take profit on profitable leg if it reaches 100% gain. Consider rolling profitable leg to
                        capture more upside.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-cyan-400 font-medium mb-2">Loss Management</h4>
                      <p>
                        Close entire position if combined value declines to 40% of initial debit, or if IV drops
                        significantly.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-cyan-400 font-medium mb-2">Optimal Entry</h4>
                      <p>
                        Enter during periods of low implied volatility, ideally when IV is below historical volatility
                        by at least 10%.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-100 flex items-center">
            <Target className="h-6 w-6 mr-2 text-cyan-400" />
            Strategy Selection Framework
          </CardTitle>
          <CardDescription className="text-gray-300">
            Guide to selecting the optimal strategy based on market conditions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[rgba(10,14,23,0.7)] p-4 rounded-md border border-cyan-500/10">
                <h3 className="text-cyan-100 font-medium mb-3 flex items-center">
                  <Badge className="mr-2 bg-green-500/20 text-green-400">LOW VOLATILITY</Badge>
                </h3>
                <h4 className="text-cyan-400 text-sm font-medium mb-2">Best Strategy: Quantum Strangle</h4>
                <p className="text-xs text-gray-300">
                  When implied volatility is low relative to historical volatility, options are relatively cheap. This
                  makes buying strategies like the Quantum Strangle more attractive as they benefit from volatility
                  expansion.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-300 mt-2">
                  <li>IV Percentile &lt; 30%</li>
                  <li>IV/HV Ratio &lt; 0.9</li>
                  <li>Expected catalyst upcoming</li>
                </ul>
              </div>

              <div className="bg-[rgba(10,14,23,0.7)] p-4 rounded-md border border-cyan-500/10">
                <h3 className="text-cyan-100 font-medium mb-3 flex items-center">
                  <Badge className="mr-2 bg-yellow-500/20 text-yellow-400">NORMAL VOLATILITY</Badge>
                </h3>
                <h4 className="text-cyan-400 text-sm font-medium mb-2">Best Strategy: Neutralizer Butterfly</h4>
                <p className="text-xs text-gray-300">
                  When volatility is in the normal range, directional bets with defined risk like the Neutralizer
                  Butterfly offer the best risk/reward profile, especially when combined with momentum node analysis.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-300 mt-2">
                  <li>IV Percentile 30-70%</li>
                  <li>IV/HV Ratio 0.9-1.1</li>
                  <li>Clear technical target identified</li>
                </ul>
              </div>

              <div className="bg-[rgba(10,14,23,0.7)] p-4 rounded-md border border-cyan-500/10">
                <h3 className="text-cyan-100 font-medium mb-3 flex items-center">
                  <Badge className="mr-2 bg-red-500/20 text-red-400">HIGH VOLATILITY</Badge>
                </h3>
                <h4 className="text-cyan-400 text-sm font-medium mb-2">Best Strategy: Photon Condor</h4>
                <p className="text-xs text-gray-300">
                  When implied volatility is elevated, selling premium through the Photon Condor creates a high
                  probability of profit as markets often overestimate future volatility.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-300 mt-2">
                  <li>IV Percentile &gt; 70%</li>
                  <li>IV/HV Ratio &gt; 1.1</li>
                  <li>No major catalysts expected</li>
                </ul>
              </div>
            </div>

            <div className="bg-[rgba(10,14,23,0.7)] p-6 rounded-lg border border-cyan-500/10">
              <h3 className="text-lg font-medium text-cyan-100 mb-4">Decision Matrix</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-gray-300">
                  <thead>
                    <tr className="border-b border-cyan-500/20">
                      <th className="text-left py-2 px-2 text-cyan-100">Market View</th>
                      <th className="text-center py-2 px-2 text-cyan-100">Low IV</th>
                      <th className="text-center py-2 px-2 text-cyan-100">Medium IV</th>
                      <th className="text-center py-2 px-2 text-cyan-100">High IV</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800">
                      <td className="px-2 py-2">Bullish</td>
                      <td className="text-center px-2 py-2">Call Debit Spread</td>
                      <td className="text-center px-2 py-2">Bull Call Butterfly</td>
                      <td className="text-center px-2 py-2">Bull Put Spread</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="px-2 py-2">Bearish</td>
                      <td className="text-center px-2 py-2">Put Debit Spread</td>
                      <td className="text-center px-2 py-2">Bear Put Butterfly</td>
                      <td className="text-center px-2 py-2">Bear Call Spread</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-2">Neutral</td>
                      <td className="text-center px-2 py-2">Calendar Spread</td>
                      <td className="text-center px-2 py-2">Neutralizer Butterfly</td>
                      <td className="text-center px-2 py-2">Photon Condor</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-2">Volatile</td>
                      <td className="text-center px-2 py-2">Quantum Strangle</td>
                      <td className="text-center px-2 py-2">Backspread</td>
                      <td className="text-center px-2 py-2">Ratio Spread</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
