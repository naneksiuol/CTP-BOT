"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Target, AlertTriangle, BarChart2 } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"

export function RiskManagementTab() {
  const [riskScore, setRiskScore] = useState<number>(50)
  const [accountSize, setAccountSize] = useState<number>(10000)

  // Calculate position size based on risk score and account size
  const calculatePositionSize = () => {
    const baseRiskPercentage = 0.01 // 1% base risk
    const adjustedRisk = baseRiskPercentage * (riskScore / 50) // Scale based on risk score
    return (accountSize * adjustedRisk).toFixed(2)
  }

  return (
    <div className="space-y-8">
      <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-100 flex items-center">
            <Shield className="mr-2 h-5 w-5 text-cyan-400" />
            Position Sizing Calculator
          </CardTitle>
          <CardDescription className="text-gray-300">Allocate capital using CEM's risk-per-trade score</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-cyan-100 font-medium mb-3">Risk-Per-Trade Calculator</h3>
              <p className="text-gray-300 text-sm mb-4">
                The Position Sizing Calculator uses the CEM risk-per-trade score to determine optimal position sizes
                based on your account size and risk tolerance. This ensures consistent risk management across all
                trades.
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-gray-300 text-sm">Account Size ($)</label>
                  <input
                    type="number"
                    value={accountSize}
                    onChange={(e) => setAccountSize(Number(e.target.value))}
                    className="w-full bg-[rgba(10,14,23,0.5)] text-white border border-cyan-500/20 rounded-md p-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-gray-300 text-sm">Risk Score (1-100)</label>
                    <span className="text-cyan-400">{riskScore}</span>
                  </div>
                  <Slider
                    min={1}
                    max={100}
                    step={1}
                    value={[riskScore]}
                    onValueChange={(value) => setRiskScore(value[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Conservative</span>
                    <span>Moderate</span>
                    <span>Aggressive</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[rgba(10,14,23,0.5)] p-4 rounded-md">
              <h3 className="text-cyan-100 font-medium mb-3">Position Size Results</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-cyan-400 text-sm font-medium mb-1">Recommended Risk Amount</h4>
                  <div className="bg-[rgba(26,31,45,0.8)] p-3 rounded-md">
                    <span className="text-xl font-bold text-green-400">${calculatePositionSize()}</span>
                    <span className="text-xs text-gray-400 ml-2">per trade</span>
                  </div>
                  <p className="text-xs text-gray-300 mt-1">
                    This is the maximum amount you should risk on any single trade based on your settings.
                  </p>
                </div>

                <div>
                  <h4 className="text-cyan-400 text-sm font-medium mb-1">Risk Interpretation</h4>
                  <p className="text-xs text-gray-300">
                    {riskScore < 30
                      ? "Conservative risk profile: Focus on high-probability trades with tight stop losses and smaller position sizes."
                      : riskScore < 70
                        ? "Moderate risk profile: Balanced approach with standard position sizing and normal stop loss distances."
                        : "Aggressive risk profile: Larger position sizes with wider stop losses. Only suitable for experienced traders."}
                  </p>
                </div>

                <div>
                  <h4 className="text-cyan-400 text-sm font-medium mb-1">Position Sizing Formula</h4>
                  <div className="bg-[rgba(26,31,45,0.8)] p-2 rounded-md font-mono text-xs text-cyan-300">
                    Risk Amount = Account Size × Base Risk × (Risk Score ÷ 50)
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-[rgba(10,14,23,0.5)] p-4 rounded-md">
            <h3 className="text-cyan-100 font-medium mb-3">Position Sizing Strategies</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="text-cyan-400 text-sm font-medium mb-2">Fixed Risk</h4>
                <p className="text-xs text-gray-300">
                  Risk a fixed percentage of your account on each trade, typically 1-2%. This ensures consistent risk
                  management regardless of trade setup.
                </p>
                <div className="mt-2">
                  <Badge className="bg-green-500/20 text-green-400">Recommended for beginners</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-cyan-400 text-sm font-medium mb-2">Variable Risk</h4>
                <p className="text-xs text-gray-300">
                  Adjust risk based on setup quality, with higher-conviction trades receiving larger allocations. Range
                  typically between 0.5-3% of account.
                </p>
                <div className="mt-2">
                  <Badge className="bg-yellow-500/20 text-yellow-400">Intermediate approach</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-cyan-400 text-sm font-medium mb-2">Kelly Criterion</h4>
                <p className="text-xs text-gray-300">
                  Mathematical formula that calculates optimal position size based on win rate and risk/reward ratio.
                  Often used with a half-Kelly approach for safety.
                </p>
                <div className="mt-2">
                  <Badge className="bg-red-500/20 text-red-400">Advanced technique</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-100 flex items-center">
            <Shield className="mr-2 h-5 w-5 text-cyan-400" />
            Adaptive Hedging System
          </CardTitle>
          <CardDescription className="text-gray-300">
            Deploy nano-HFT hedges when price nears CEM boundaries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-gray-300 text-sm">
              The Adaptive Hedging System automatically deploys nano-HFT (High-Frequency Trading) hedges when price
              approaches CEM boundaries. This provides dynamic protection against adverse price movements while
              maintaining exposure to favorable moves.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[rgba(10,14,23,0.5)] p-4 rounded-md">
                <h3 className="text-cyan-100 font-medium mb-3 flex items-center">
                  <Target className="h-4 w-4 mr-2 text-cyan-400" />
                  Hedge Activation Triggers
                </h3>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-cyan-400 text-sm font-medium mb-1">Price-Based Triggers</h4>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-gray-300">
                      <li>Price reaches 80% of CEM boundary</li>
                      <li>Price breaks key support/resistance within CEM</li>
                      <li>Price velocity exceeds 2 standard deviations</li>
                      <li>Price gaps beyond 50% of CEM range</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-cyan-400 text-sm font-medium mb-1">Volatility-Based Triggers</h4>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-gray-300">
                      <li>AIV increases by 20%+ in single session</li>
                      <li>Volatility skew exceeds historical 90th percentile</li>
                      <li>Term structure inverts suddenly</li>
                      <li>Realized volatility exceeds implied volatility</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-[rgba(10,14,23,0.5)] p-4 rounded-md">
                <h3 className="text-cyan-100 font-medium mb-3 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-yellow-400" />
                  Hedge Implementation
                </h3>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-cyan-400 text-sm font-medium mb-1">Long Position Hedges</h4>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-gray-300">
                      <li>Buy protective puts at 80% of CEM lower boundary</li>
                      <li>Implement put spreads to reduce cost</li>
                      <li>Add VIX calls for systemic risk protection</li>
                      <li>Use collar strategies for defined risk</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-cyan-400 text-sm font-medium mb-1">Short Position Hedges</h4>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-gray-300">
                      <li>Buy protective calls at 120% of CEM upper boundary</li>
                      <li>Implement call spreads to reduce cost</li>
                      <li>Add inverse VIX positions for volatility spikes</li>
                      <li>Use reverse collar strategies for defined risk</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[rgba(10,14,23,0.5)] p-4 rounded-md">
              <h3 className="text-cyan-100 font-medium mb-3 flex items-center">
                <BarChart2 className="h-4 w-4 mr-2 text-cyan-400" />
                Dynamic Hedge Adjustment
              </h3>

              <p className="text-sm text-gray-300 mb-4">
                The Adaptive Hedging System continuously monitors market conditions and adjusts hedges in real-time to
                maintain optimal protection while minimizing drag on performance.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-cyan-400 text-sm font-medium mb-2">Hedge Scaling</h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-gray-300">
                    <li>Incrementally increase hedge size as price approaches CEM boundary</li>
                    <li>Scale hedges based on volatility regime</li>
                    <li>Adjust hedge ratio based on correlation metrics</li>
                    <li>Optimize cost-to-protection ratio</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-cyan-400 text-sm font-medium mb-2">Hedge Rolling</h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-gray-300">
                    <li>Roll hedges forward to maintain protection</li>
                    <li>Adjust strike prices based on new CEM calculations</li>
                    <li>Capture time value when rolling</li>
                    <li>Optimize for tax efficiency</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-cyan-400 text-sm font-medium mb-2">Hedge Removal</h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-gray-300">
                    <li>Remove hedges when price returns to CEM midpoint</li>
                    <li>Scale out of hedges as volatility normalizes</li>
                    <li>Close hedges after catalyst events pass</li>
                    <li>Capture hedge profits during extreme moves</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
