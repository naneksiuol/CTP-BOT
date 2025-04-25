"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Target, BarChart2, Zap, BookOpen, Activity } from "lucide-react"

export function ProprietaryToolsTab() {
  return (
    <div className="space-y-8">
      <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-100 flex items-center">
            <Brain className="mr-2 h-5 w-5 text-cyan-400" />
            AI Volatility Engine
          </CardTitle>
          <CardDescription className="text-gray-300">
            Advanced volatility analysis and prediction system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-cyan-100 font-medium mb-3">Key Features</h3>
              <p className="text-gray-300 text-sm mb-4">
                The AI Volatility Engine is a proprietary system that analyzes and predicts volatility across multiple
                timeframes and assets. It integrates with popular trading platforms and provides real-time volatility
                insights.
              </p>

              <div className="space-y-4">
                <div className="bg-[rgba(10,14,23,0.5)] p-3 rounded-md">
                  <h4 className="text-cyan-400 text-sm font-medium mb-2 flex items-center">
                    <Activity className="h-4 w-4 mr-1" />
                    Platform Integration
                  </h4>
                  <p className="text-xs text-gray-300">
                    Seamlessly integrates with popular trading platforms including Thinkorswim, TradingView, and
                    MetaTrader. Provides real-time volatility data and CEM calculations directly in your trading
                    interface.
                  </p>
                </div>

                <div className="bg-[rgba(10,14,23,0.5)] p-3 rounded-md">
                  <h4 className="text-cyan-400 text-sm font-medium mb-2 flex items-center">
                    <Target className="h-4 w-4 mr-1" />
                    Multi-Timeframe Projection
                  </h4>
                  <p className="text-xs text-gray-300">
                    Projects CEM across 9 timeframes simultaneously, from intraday (5-minute) to long-term (monthly).
                    This provides a comprehensive view of expected price ranges across different trading horizons.
                  </p>
                </div>

                <div className="bg-[rgba(10,14,23,0.5)] p-3 rounded-md">
                  <h4 className="text-cyan-400 text-sm font-medium mb-2 flex items-center">
                    <Zap className="h-4 w-4 mr-1" />
                    IV Crush Detection
                  </h4>
                  <p className="text-xs text-gray-300">
                    Automatically flags potential IV crush opportunities before earnings announcements and other major
                    events. Identifies optimal entry and exit points for volatility-based strategies.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-cyan-100 font-medium mb-3">Technical Specifications</h3>

              <div className="space-y-4">
                <div className="bg-[rgba(10,14,23,0.5)] p-3 rounded-md">
                  <h4 className="text-cyan-400 text-sm font-medium mb-2">AI Architecture</h4>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-gray-300">
                    <li>Neural network trained on 10+ years of market data</li>
                    <li>Recurrent layers for time-series analysis</li>
                    <li>Attention mechanisms for event detection</li>
                    <li>Reinforcement learning for adaptive calibration</li>
                    <li>Ensemble approach combining multiple models</li>
                  </ul>
                </div>

                <div className="bg-[rgba(10,14,23,0.5)] p-3 rounded-md">
                  <h4 className="text-cyan-400 text-sm font-medium mb-2">Data Sources</h4>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-gray-300">
                    <li>Real-time options chain data across all expirations</li>
                    <li>Historical price and volume data</li>
                    <li>Institutional order flow and dark pool activity</li>
                    <li>Economic calendar and event data</li>
                    <li>Sentiment analysis from news and social media</li>
                  </ul>
                </div>

                <div className="bg-[rgba(10,14,23,0.5)] p-3 rounded-md">
                  <h4 className="text-cyan-400 text-sm font-medium mb-2">Performance Metrics</h4>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-gray-300">
                    <li>Volatility prediction accuracy: 78.3%</li>
                    <li>CEM boundary precision: ±2.1%</li>
                    <li>IV crush detection rate: 91.7%</li>
                    <li>Real-time update frequency: 250ms</li>
                    <li>Backtested on 500+ earnings events</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-[rgba(10,14,23,0.5)] p-4 rounded-md">
            <h3 className="text-cyan-100 font-medium mb-3">Advanced Volatility Metrics</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="text-cyan-400 text-sm font-medium mb-2">Volatility Surface Analysis</h4>
                <p className="text-xs text-gray-300">
                  3D visualization of implied volatility across all strikes and expirations. Identifies volatility skew,
                  term structure anomalies, and arbitrage opportunities.
                </p>
              </div>

              <div>
                <h4 className="text-cyan-400 text-sm font-medium mb-2">Volatility Regime Detection</h4>
                <p className="text-xs text-gray-300">
                  Automatically identifies current volatility regime (low, normal, high, extreme) and adjusts CEM
                  calculations accordingly. Provides regime-specific strategy recommendations.
                </p>
              </div>

              <div>
                <h4 className="text-cyan-400 text-sm font-medium mb-2">Volatility Divergence Scanner</h4>
                <p className="text-xs text-gray-300">
                  Scans for divergences between AI-Implied Volatility and Holographic Volatility across multiple assets.
                  Flags potential volatility arbitrage opportunities.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-100 flex items-center">
            <Target className="mr-2 h-5 w-5 text-cyan-400" />
            Momentum Nodes
          </CardTitle>
          <CardDescription className="text-gray-300">Identify price attractor levels within the CEM</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-gray-300 text-sm">
              Momentum Nodes identify key price levels within the CEM that act as attractors for price movement. These
              nodes combine volume profile analysis with gamma exposure data to pinpoint levels where price is likely to
              accelerate or reverse.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[rgba(10,14,23,0.5)] p-4 rounded-md">
                <h3 className="text-cyan-100 font-medium mb-3 flex items-center">
                  <BarChart2 className="h-4 w-4 mr-2 text-cyan-400" />
                  Node Types
                </h3>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-cyan-400 text-sm font-medium mb-1">Acceleration Nodes</h4>
                    <p className="text-xs text-gray-300">
                      Price levels where momentum is likely to increase in the current direction. These nodes typically
                      form at high gamma exposure levels and can lead to rapid price movement once breached.
                    </p>
                    <div className="mt-2">
                      <Badge className="bg-green-500/20 text-green-400">Breakout opportunities</Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-cyan-400 text-sm font-medium mb-1">Reversal Nodes</h4>
                    <p className="text-xs text-gray-300">
                      Price levels where momentum is likely to reverse. These nodes typically form at volume profile
                      peaks and can act as strong support or resistance levels.
                    </p>
                    <div className="mt-2">
                      <Badge className="bg-red-500/20 text-red-400">Mean reversion opportunities</Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-cyan-400 text-sm font-medium mb-1">Equilibrium Nodes</h4>
                    <p className="text-xs text-gray-300">
                      Price levels where forces are balanced and price may consolidate. These nodes typically form at
                      the intersection of multiple technical factors and can lead to low-volatility periods.
                    </p>
                    <div className="mt-2">
                      <Badge className="bg-yellow-500/20 text-yellow-400">Consolidation zones</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[rgba(10,14,23,0.5)] p-4 rounded-md">
                <h3 className="text-cyan-100 font-medium mb-3 flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-cyan-400" />
                  Node Calculation Factors
                </h3>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-cyan-400 text-sm font-medium mb-1">Volume Profile Analysis</h4>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-gray-300">
                      <li>Volume Point of Control (VPOC)</li>
                      <li>Value Area High/Low (VAH/VAL)</li>
                      <li>Volume gaps and thin zones</li>
                      <li>Historical volume patterns</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-cyan-400 text-sm font-medium mb-1">Options Market Analysis</h4>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-gray-300">
                      <li>Gamma exposure by strike</li>
                      <li>Open interest concentration</li>
                      <li>Put/call ratio by strike</li>
                      <li>Options expiration effects</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-cyan-400 text-sm font-medium mb-1">Technical Confluence</h4>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-gray-300">
                      <li>Key moving averages</li>
                      <li>Fibonacci retracement levels</li>
                      <li>Previous swing highs/lows</li>
                      <li>Trendline intersections</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[rgba(10,14,23,0.5)] p-4 rounded-md">
              <h3 className="text-cyan-100 font-medium mb-3 flex items-center">
                <Brain className="h-4 w-4 mr-2 text-cyan-400" />
                Trading with Momentum Nodes
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-cyan-400 text-sm font-medium mb-2">Node-Based Entry</h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-gray-300">
                    <li>Enter long positions at Reversal Nodes during uptrends</li>
                    <li>Enter short positions at Reversal Nodes during downtrends</li>
                    <li>Use limit orders at exact node levels</li>
                    <li>Confirm with volume and momentum indicators</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-cyan-400 text-sm font-medium mb-2">Node-Based Exit</h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-gray-300">
                    <li>Take profits at approaching Reversal Nodes</li>
                    <li>Scale out positions at Equilibrium Nodes</li>
                    <li>Hold through Acceleration Nodes in trend direction</li>
                    <li>Set trailing stops based on node distances</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-cyan-400 text-sm font-medium mb-2">Node-Based Options</h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-gray-300">
                    <li>Sell options with strikes at strong Reversal Nodes</li>
                    <li>Buy options with strikes beyond Acceleration Nodes</li>
                    <li>Use node clusters to identify optimal iron condor strikes</li>
                    <li>Calendar spreads between closely spaced nodes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-100 flex items-center">
            <BookOpen className="mr-2 h-5 w-5 text-cyan-400" />
            Cyber Trader Academy
          </CardTitle>
          <CardDescription className="text-gray-300">
            Comprehensive educational resources for mastering the CEM framework
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-gray-300 text-sm">
              The Cyber Trader Academy provides comprehensive educational resources for mastering the CEM framework and
              associated trading strategies. From beginner concepts to advanced techniques, our structured curriculum
              helps traders at all levels improve their skills and results.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-[rgba(10,14,23,0.5)] border-cyan-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-cyan-100">CEM Mastery</CardTitle>
                  <CardDescription className="text-xs text-gray-400">
                    Core framework + Photon Condor tactics
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-gray-300">
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Understanding the CEM calculation</li>
                    <li>Interpreting CEM boundaries</li>
                    <li>Photon Condor strategy setup</li>
                    <li>Managing Photon Condor positions</li>
                    <li>Adjusting for volatility changes</li>
                  </ul>
                  <div className="mt-3 flex justify-between items-center">
                    <Badge className="bg-green-500/20 text-green-400">Beginner-Friendly</Badge>
                    <span className="text-cyan-400">8 Modules</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[rgba(10,14,23,0.5)] border-cyan-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-cyan-100">Volatility Warfare</CardTitle>
                  <CardDescription className="text-xs text-gray-400">Exploiting AIV/HV mismatches</CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-gray-300">
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Understanding volatility metrics</li>
                    <li>Identifying volatility divergences</li>
                    <li>Volatility arbitrage strategies</li>
                    <li>Event-driven volatility trading</li>
                    <li>Managing volatility risk</li>
                  </ul>
                  <div className="mt-3 flex justify-between items-center">
                    <Badge className="bg-yellow-500/20 text-yellow-400">Intermediate</Badge>
                    <span className="text-cyan-400">10 Modules</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[rgba(10,14,23,0.5)] border-cyan-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-cyan-100">Black Hole Hedging</CardTitle>
                  <CardDescription className="text-xs text-gray-400">Advanced risk mitigation</CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-gray-300">
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Dynamic hedging techniques</li>
                    <li>Adaptive position sizing</li>
                    <li>Portfolio-level risk management</li>
                    <li>Tail risk protection strategies</li>
                    <li>Volatility regime hedging</li>
                  </ul>
                  <div className="mt-3 flex justify-between items-center">
                    <Badge className="bg-red-500/20 text-red-400">Advanced</Badge>
                    <span className="text-cyan-400">12 Modules</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-[rgba(10,14,23,0.5)] p-4 rounded-md">
              <h3 className="text-cyan-100 font-medium mb-3 flex items-center">
                <Zap className="h-4 w-4 mr-2 text-cyan-400" />
                Live Training Sessions
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-cyan-400 text-sm font-medium mb-2">Volatility Labs</h4>
                  <p className="text-xs text-gray-300">
                    Weekly live sessions focused on real-time market analysis using the CEM framework. These interactive
                    workshops allow traders to see the system in action and ask questions directly to our expert
                    instructors.
                  </p>
                  <div className="mt-2 flex items-center">
                    <Badge className="bg-cyan-500/20 text-cyan-100">Every Tuesday & Thursday</Badge>
                    <span className="text-xs text-gray-400 ml-2">2:00 PM ET</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-cyan-400 text-sm font-medium mb-2">Strategy Deep Dives</h4>
                  <p className="text-xs text-gray-300">
                    Monthly in-depth sessions focusing on specific CEM strategies. Each session covers setup, execution,
                    management, and real examples from our trading desk, with detailed Q&A.
                  </p>
                  <div className="mt-2 flex items-center">
                    <Badge className="bg-cyan-500/20 text-cyan-100">First Friday Monthly</Badge>
                    <span className="text-xs text-gray-400 ml-2">1:00 PM ET</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
