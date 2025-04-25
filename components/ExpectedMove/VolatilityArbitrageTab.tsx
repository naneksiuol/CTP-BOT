"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, TrendingUp, TrendingDown, Calendar, AlertTriangle, BarChart2 } from "lucide-react"

export function VolatilityArbitrageTab() {
  return (
    <div className="space-y-8">
      <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-100 flex items-center">
            <Activity className="mr-2 h-5 w-5 text-cyan-400" />
            AI-Implied Volatility vs. Holographic Volatility
          </CardTitle>
          <CardDescription className="text-gray-300">
            Exploiting volatility mismatches for profitable trading opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-cyan-100 font-medium mb-3">Volatility Arbitrage Concept</h3>
              <p className="text-gray-300 text-sm mb-4">
                Volatility arbitrage exploits the difference between AI-Implied Volatility (AIV) and Holographic
                Volatility (HV). When these metrics diverge significantly, it creates opportunities for profitable
                trades.
              </p>

              <div className="space-y-4">
                <div className="bg-[rgba(10,14,23,0.5)] p-3 rounded-md">
                  <h4 className="text-cyan-400 text-sm font-medium mb-2 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Overpriced Volatility (AIV &gt; HV)
                  </h4>
                  <p className="text-xs text-gray-300">
                    When AIV exceeds HV by more than 15%, options are likely overpriced. This creates opportunities to
                    sell premium through strategies like credit spreads, iron condors, or covered calls.
                  </p>
                  <div className="mt-2 flex items-center">
                    <Badge className="bg-green-500/20 text-green-400">SELL PREMIUM</Badge>
                    <span className="text-xs text-gray-400 ml-2">When divergence &gt;15%</span>
                  </div>
                </div>

                <div className="bg-[rgba(10,14,23,0.5)] p-3 rounded-md">
                  <h4 className="text-cyan-400 text-sm font-medium mb-2 flex items-center">
                    <TrendingDown className="h-4 w-4 mr-1" />
                    Underpriced Volatility (AIV &lt; HV)
                  </h4>
                  <p className="text-xs text-gray-300">
                    When AIV is below HV by more than 10%, options are likely underpriced. This creates opportunities to
                    buy premium through strategies like long straddles, strangles, or calendar spreads.
                  </p>
                  <div className="mt-2 flex items-center">
                    <Badge className="bg-red-500/20 text-red-400">BUY PREMIUM</Badge>
                    <span className="text-xs text-gray-400 ml-2">When divergence &gt;10%</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-cyan-100 font-medium mb-3">Volatility Metrics Explained</h3>

              <div className="space-y-4">
                <div className="bg-[rgba(10,14,23,0.5)] p-3 rounded-md">
                  <h4 className="text-cyan-400 text-sm font-medium mb-2">AI-Implied Volatility (AIV)</h4>
                  <p className="text-xs text-gray-300">
                    A proprietary volatility metric trained on 10+ years of market data across different regimes. AIV
                    incorporates options chain data, market sentiment, and institutional order flow to predict future
                    volatility with higher accuracy than traditional IV.
                  </p>
                  <ul className="list-disc pl-4 mt-2 space-y-1 text-xs text-gray-300">
                    <li>Trained on 10+ years of market data</li>
                    <li>Incorporates options chain data</li>
                    <li>Includes market sentiment analysis</li>
                    <li>Factors in institutional order flow</li>
                  </ul>
                </div>

                <div className="bg-[rgba(10,14,23,0.5)] p-3 rounded-md">
                  <h4 className="text-cyan-400 text-sm font-medium mb-2">Holographic Volatility (HV)</h4>
                  <p className="text-xs text-gray-300">
                    An advanced form of historical volatility that uses a proprietary algorithm to project future
                    volatility based on price action, volume patterns, and market microstructure. HV provides a more
                    accurate representation of "true" volatility than standard historical volatility.
                  </p>
                  <ul className="list-disc pl-4 mt-2 space-y-1 text-xs text-gray-300">
                    <li>Advanced form of historical volatility</li>
                    <li>Incorporates price action patterns</li>
                    <li>Analyzes volume and liquidity</li>
                    <li>Considers market microstructure</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-[rgba(10,14,23,0.5)] p-4 rounded-md">
            <h3 className="text-cyan-100 font-medium mb-3">Volatility Arbitrage Strategies</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-cyan-400 text-sm font-medium mb-2">When AIV &gt; HV (Sell Premium)</h4>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-300">
                  <li>
                    <span className="text-cyan-400">Iron Condors:</span> Sell OTM puts and calls, buy further OTM puts
                    and calls
                  </li>
                  <li>
                    <span className="text-cyan-400">Credit Spreads:</span> Sell OTM puts or calls, buy further OTM puts
                    or calls
                  </li>
                  <li>
                    <span className="text-cyan-400">Covered Calls:</span> Own the underlying, sell OTM calls
                  </li>
                  <li>
                    <span className="text-cyan-400">Cash-Secured Puts:</span> Sell OTM puts with cash collateral
                  </li>
                  <li>
                    <span className="text-cyan-400">Calendar Spreads:</span> Sell near-term options, buy longer-term
                    options
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-cyan-400 text-sm font-medium mb-2">When AIV &lt; HV (Buy Premium)</h4>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-300">
                  <li>
                    <span className="text-cyan-400">Long Straddles:</span> Buy ATM puts and calls with same expiration
                  </li>
                  <li>
                    <span className="text-cyan-400">Long Strangles:</span> Buy OTM puts and calls with same expiration
                  </li>
                  <li>
                    <span className="text-cyan-400">Backspread:</span> Sell ATM options, buy more OTM options
                  </li>
                  <li>
                    <span className="text-cyan-400">Diagonal Spreads:</span> Buy longer-term options, sell shorter-term
                    options
                  </li>
                  <li>
                    <span className="text-cyan-400">Volatility ETFs:</span> Long positions in VIX-based ETFs
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-100 flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-cyan-400" />
            Event Matrix Scanner
          </CardTitle>
          <CardDescription className="text-gray-300">
            Predicting CEM expansion/contraction around key market events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-gray-300 text-sm">
              The Event Matrix Scanner analyzes historical volatility patterns around key market events to predict CEM
              expansion or contraction. This allows traders to position themselves optimally before events like earnings
              announcements, FOMC meetings, product launches, and economic data releases.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[rgba(10,14,23,0.5)] p-4 rounded-md">
                <h3 className="text-cyan-100 font-medium mb-3 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-yellow-400" />
                  Volatility Expansion Events
                </h3>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-cyan-400 text-sm font-medium mb-1">Earnings Announcements</h4>
                    <p className="text-xs text-gray-300">
                      Typically causes 30-50% expansion in CEM. Strategy: Long straddles 1-2 weeks before earnings,
                      close before announcement.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-cyan-400 text-sm font-medium mb-1">FOMC Meetings</h4>
                    <p className="text-xs text-gray-300">
                      Typically causes 15-25% expansion in CEM. Strategy: Calendar spreads with short leg expiring
                      before meeting.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-cyan-400 text-sm font-medium mb-1">Product Launches</h4>
                    <p className="text-xs text-gray-300">
                      Typically causes 20-35% expansion in CEM. Strategy: Backspread positions 2-3 weeks before event.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[rgba(10,14,23,0.5)] p-4 rounded-md">
                <h3 className="text-cyan-100 font-medium mb-3 flex items-center">
                  <TrendingDown className="h-4 w-4 mr-2 text-red-400" />
                  Volatility Contraction Events
                </h3>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-cyan-400 text-sm font-medium mb-1">Post-Earnings</h4>
                    <p className="text-xs text-gray-300">
                      Typically causes 40-60% contraction in CEM. Strategy: Sell iron condors or butterflies immediately
                      after earnings announcement.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-cyan-400 text-sm font-medium mb-1">Holiday Periods</h4>
                    <p className="text-xs text-gray-300">
                      Typically causes 10-20% contraction in CEM. Strategy: Sell premium 1-2 weeks before major
                      holidays.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-cyan-400 text-sm font-medium mb-1">Seasonal Patterns</h4>
                    <p className="text-xs text-gray-300">
                      Certain months show predictable volatility patterns. Strategy: Sell calendar spreads during
                      historically low-volatility months.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[rgba(10,14,23,0.5)] p-4 rounded-md">
              <h3 className="text-cyan-100 font-medium mb-3 flex items-center">
                <BarChart2 className="h-4 w-4 mr-2 text-cyan-400" />
                Event Matrix Implementation
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-cyan-400 text-sm font-medium mb-2">Pre-Event</h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-gray-300">
                    <li>Identify upcoming events using AI calendar</li>
                    <li>Analyze historical volatility patterns</li>
                    <li>Calculate expected CEM expansion</li>
                    <li>Position for volatility increase</li>
                    <li>Set profit targets and stop losses</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-cyan-400 text-sm font-medium mb-2">During Event</h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-gray-300">
                    <li>Monitor real-time volatility changes</li>
                    <li>Compare to expected CEM model</li>
                    <li>Adjust positions if necessary</li>
                    <li>Prepare for post-event strategy</li>
                    <li>Set alerts for key price levels</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-cyan-400 text-sm font-medium mb-2">Post-Event</h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-gray-300">
                    <li>Close pre-event positions</li>
                    <li>Establish post-event positions</li>
                    <li>Target volatility contraction</li>
                    <li>Monitor for abnormal patterns</li>
                    <li>Update AI model with new data</li>
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

export default VolatilityArbitrageTab
