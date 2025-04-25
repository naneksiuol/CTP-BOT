"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart2, TrendingUp, Activity, Brain, Shield, BookOpen } from "lucide-react"

export function PerformanceMetricsTab() {
  return (
    <div className="space-y-8">
      <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-100 flex items-center">
            <BarChart2 className="mr-2 h-5 w-5 text-cyan-400" />
            Performance Metrics
          </CardTitle>
          <CardDescription className="text-gray-300">
            Historical and live performance data for the CEM trading system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-[rgba(10,14,23,0.5)] p-4 rounded-md mb-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 text-cyan-400">Metric</th>
                  <th className="text-left py-2 text-cyan-400">Backtest (2018-2023)</th>
                  <th className="text-left py-2 text-cyan-400">Live (2024)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-2 text-gray-300">Win Rate</td>
                  <td className="py-2 text-gray-300">68.7%</td>
                  <td className="py-2 text-green-400">71.3%</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 text-gray-300">Max Drawdown</td>
                  <td className="py-2 text-gray-300">12.4%</td>
                  <td className="py-2 text-green-400">9.8%</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 text-gray-300">Sharpe Ratio</td>
                  <td className="py-2 text-gray-300">1.9</td>
                  <td className="py-2 text-green-400">2.3</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 text-gray-300">Sortino Ratio</td>
                  <td className="py-2 text-gray-300">2.4</td>
                  <td className="py-2 text-green-400">2.8</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 text-gray-300">Avg. Return per Trade</td>
                  <td className="py-2 text-gray-300">1.7%</td>
                  <td className="py-2 text-green-400">1.9%</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 text-gray-300">Avg. Holding Period</td>
                  <td className="py-2 text-gray-300">8.3 days</td>
                  <td className="py-2 text-gray-300">7.6 days</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-300">Profit Factor</td>
                  <td className="py-2 text-gray-300">2.1</td>
                  <td className="py-2 text-green-400">2.4</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[rgba(10,14,23,0.5)] p-4 rounded-md">
              <h3 className="text-cyan-100 font-medium mb-3 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-cyan-400" />
                Strategy Performance
              </h3>

              <div className="space-y-3">
                <div>
                  <h4 className="text-cyan-400 text-sm font-medium mb-1">Photon Condor</h4>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">Win Rate:</span>
                    <span className="text-green-400">73.2%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">Avg. Return:</span>
                    <span className="text-green-400">1.8%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">Profit Factor:</span>
                    <span className="text-green-400">2.6</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-cyan-400 text-sm font-medium mb-1">Neutralizer Butterfly</h4>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">Win Rate:</span>
                    <span className="text-yellow-400">48.7%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">Avg. Return:</span>
                    <span className="text-green-400">3.2%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">Profit Factor:</span>
                    <span className="text-green-400">2.1</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-cyan-400 text-sm font-medium mb-1">Quantum Strangle</h4>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">Win Rate:</span>
                    <span className="text-yellow-400">38.4%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">Avg. Return:</span>
                    <span className="text-green-400">5.7%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">Profit Factor:</span>
                    <span className="text-green-400">1.9</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[rgba(10,14,23,0.5)] p-4 rounded-md">
              <h3 className="text-cyan-100 font-medium mb-3 flex items-center">
                <Activity className="h-4 w-4 mr-2 text-cyan-400" />
                Market Condition Performance
              </h3>

              <div className="space-y-3">
                <div>
                  <h4 className="text-cyan-400 text-sm font-medium mb-1">Bull Markets</h4>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">Win Rate:</span>
                    <span className="text-green-400">72.8%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">Avg. Return:</span>
                    <span className="text-green-400">2.1%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">Best Strategy:</span>
                    <span className="text-cyan-400">Photon Condor</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-cyan-400 text-sm font-medium mb-1">Bear Markets</h4>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">Win Rate:</span>
                    <span className="text-green-400">65.3%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">Avg. Return:</span>
                    <span className="text-green-400">1.9%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">Best Strategy:</span>
                    <span className="text-cyan-400">Quantum Strangle</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-cyan-400 text-sm font-medium mb-1">Sideways Markets</h4>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">Win Rate:</span>
                    <span className="text-green-400">76.2%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">Avg. Return:</span>
                    <span className="text-green-400">1.6%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">Best Strategy:</span>
                    <span className="text-cyan-400">Neutralizer Butterfly</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[rgba(10,14,23,0.5)] p-4 rounded-md">
              <h3 className="text-cyan-100 font-medium mb-3 flex items-center">
                <Shield className="h-4 w-4 mr-2 text-cyan-400" />
                Risk Metrics
              </h3>

              <div className="space-y-3">
                <div>
                  <h4 className="text-cyan-400 text-sm font-medium mb-1">Drawdown Profile</h4>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">Max Drawdown:</span>
                    <span className="text-green-400">12.4%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">Avg. Drawdown:</span>
                    <span className="text-green-400">4.7%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">Recovery Time:</span>
                    <span className="text-green-400">37 days</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-cyan-400 text-sm font-medium mb-1">Volatility Metrics</h4>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">Annualized Volatility:</span>
                    <span className="text-green-400">12.3%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">Downside Deviation:</span>
                    <span className="text-green-400">7.8%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">Beta to S&P 500:</span>
                    <span className="text-green-400">0.42</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-cyan-400 text-sm font-medium mb-1">Stress Test Results</h4>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">2020 COVID Crash:</span>
                    <span className="text-yellow-400">-8.3%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">2022 Rate Hikes:</span>
                    <span className="text-yellow-400">-6.7%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">Flash Crashes:</span>
                    <span className="text-green-400">-3.2%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-[rgba(10,14,23,0.5)] p-4 rounded-md">
            <h3 className="text-cyan-100 font-medium mb-3 flex items-center">
              <Brain className="h-4 w-4 mr-2 text-cyan-400" />
              AI Model Performance
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-cyan-400 text-sm font-medium mb-2">CEM Boundary Accuracy</h4>
                <p className="text-xs text-gray-300 mb-3">
                  Measures how often price stays within the calculated CEM boundaries during the specified timeframe.
                </p>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-300">1-Day Timeframe:</span>
                      <span className="text-green-400">78.3%</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "78.3%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-300">1-Week Timeframe:</span>
                      <span className="text-green-400">72.1%</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "72.1%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-300">1-Month Timeframe:</span>
                      <span className="text-yellow-400">68.5%</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "68.5%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-cyan-400 text-sm font-medium mb-2">AI Volatility Prediction</h4>
                <p className="text-xs text-gray-300 mb-3">
                  Measures the accuracy of AI-Implied Volatility (AIV) predictions compared to realized volatility.
                </p>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-300">Non-Event Periods:</span>
                      <span className="text-green-400">83.7%</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "83.7%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-300">Pre-Earnings:</span>
                      <span className="text-green-400">76.2%</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "76.2%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-300">Market Crashes:</span>
                      <span className="text-yellow-400">62.8%</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "62.8%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-100 flex items-center">
            <Brain className="mr-2 h-5 w-5 text-cyan-400" />
            Unique Advantages
          </CardTitle>
          <CardDescription className="text-gray-300">
            Proprietary features that set the CEM system apart
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[rgba(10,14,23,0.5)] p-4 rounded-md">
              <h3 className="text-cyan-100 font-medium mb-3 flex items-center">
                <Brain className="h-4 w-4 mr-2 text-cyan-400" />
                Neural Calibration
              </h3>
              <p className="text-xs text-gray-300 mb-3">
                The CEM system self-adjusts using VIX term structure and ETF flows to maintain optimal accuracy across
                different market regimes.
              </p>
              <div className="space-y-2">
                <div className="flex items-start">
                  <Badge className="mt-0.5 mr-2 bg-green-500/20 text-green-400">ADVANTAGE</Badge>
                  <span className="text-gray-300 text-xs">Adapts to changing market conditions automatically</span>
                </div>
                <div className="flex items-start">
                  <Badge className="mt-0.5 mr-2 bg-green-500/20 text-green-400">ADVANTAGE</Badge>
                  <span className="text-gray-300 text-xs">Reduces need for manual parameter adjustments</span>
                </div>
                <div className="flex items-start">
                  <Badge className="mt-0.5 mr-2 bg-green-500/20 text-green-400">ADVANTAGE</Badge>
                  <span className="text-gray-300 text-xs">Improves accuracy during market transitions</span>
                </div>
              </div>
            </div>

            <div className="bg-[rgba(10,14,23,0.5)] p-4 rounded-md">
              <h3 className="text-cyan-100 font-medium mb-3 flex items-center">
                <Activity className="h-4 w-4 mr-2 text-cyan-400" />
                Dark Pool Integration
              </h3>
              <p className="text-xs text-gray-300 mb-3">
                The system flags institutional activity near CEM boundaries, providing insight into potential support
                and resistance levels that aren't visible on public charts.
              </p>
              <div className="space-y-2">
                <div className="flex items-start">
                  <Badge className="mt-0.5 mr-2 bg-green-500/20 text-green-400">ADVANTAGE</Badge>
                  <span className="text-gray-300 text-xs">Identifies hidden liquidity pools</span>
                </div>
                <div className="flex items-start">
                  <Badge className="mt-0.5 mr-2 bg-green-500/20 text-green-400">ADVANTAGE</Badge>
                  <span className="text-gray-300 text-xs">Reveals institutional positioning</span>
                </div>
                <div className="flex items-start">
                  <Badge className="mt-0.5 mr-2 bg-green-500/20 text-green-400">ADVANTAGE</Badge>
                  <span className="text-gray-300 text-xs">Provides early warning of potential price moves</span>
                </div>
              </div>
            </div>

            <div className="bg-[rgba(10,14,23,0.5)] p-4 rounded-md">
              <h3 className="text-cyan-100 font-medium mb-3 flex items-center">
                <Shield className="h-4 w-4 mr-2 text-cyan-400" />
                Regime Detection
              </h3>
              <p className="text-xs text-gray-300 mb-3">
                The system automatically switches between bullish, bearish, and neutral CEM algorithms based on market
                regime detection, optimizing performance in all conditions.
              </p>
              <div className="space-y-2">
                <div className="flex items-start">
                  <Badge className="mt-0.5 mr-2 bg-green-500/20 text-green-400">ADVANTAGE</Badge>
                  <span className="text-gray-300 text-xs">Optimizes strategy selection for current regime</span>
                </div>
                <div className="flex items-start">
                  <Badge className="mt-0.5 mr-2 bg-green-500/20 text-green-400">ADVANTAGE</Badge>
                  <span className="text-gray-300 text-xs">Adjusts risk parameters automatically</span>
                </div>
                <div className="flex items-start">
                  <Badge className="mt-0.5 mr-2 bg-green-500/20 text-green-400">ADVANTAGE</Badge>
                  <span className="text-gray-300 text-xs">Provides early detection of regime shifts</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-[rgba(10,14,23,0.5)] p-4 rounded-md">
            <h3 className="text-cyan-100 font-medium mb-3">Start Your CEM Journey Today</h3>
            <p className="text-sm text-gray-300 mb-4">
              Access the CEM Playbook and join live Volatility Labs sessions to start implementing these powerful
              strategies in your own trading.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-md"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Access CEM Playbook
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-4 py-2 bg-[rgba(10,14,23,0.7)] border border-cyan-500/20 text-cyan-100 hover:bg-[rgba(10,14,23,0.9)] rounded-md"
              >
                <Activity className="h-4 w-4 mr-2" />
                Join Volatility Labs
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
