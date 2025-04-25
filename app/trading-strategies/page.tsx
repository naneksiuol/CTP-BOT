"use client"

import { useState } from "react"
import Link from "next/link"
import { TrendingUp, Brain, BarChart2, Shield, Zap, Target, Activity, ChevronRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function TradingStrategiesPage() {
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
            <h1 className="text-4xl font-bold text-cyan-100 mb-4">CyberTrader Pro Trading Strategies</h1>
            <p className="text-xl text-gray-300 max-w-3xl">
              Advanced AI-Powered Trading Strategies Used by Fortune 500 Companies
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex flex-wrap mb-8 bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
              <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-500/20">
                Overview
              </TabsTrigger>
              <TabsTrigger value="ai-forecasting" className="data-[state=active]:bg-cyan-500/20">
                AI Forecasting
              </TabsTrigger>
              <TabsTrigger value="entry-strategies" className="data-[state=active]:bg-cyan-500/20">
                Entry Strategies
              </TabsTrigger>
              <TabsTrigger value="volatility" className="data-[state=active]:bg-cyan-500/20">
                Volatility Trading
              </TabsTrigger>
              <TabsTrigger value="risk-management" className="data-[state=active]:bg-cyan-500/20">
                Risk Management
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-cyan-100 flex items-center">
                    <Brain className="h-6 w-6 mr-2 text-cyan-400" />
                    The "Biggest Trade Opportunity Today"
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    How CyberTrader Pro identifies high-conviction trade opportunities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-300">
                    CyberTrader Pro is a premium alert and education service that delivers one high-conviction trade
                    idea per week, blending technical signals, sector momentum, and fundamental insights. Our approach
                    combines the power of advanced AI models with classic technical analysis and disciplined risk
                    controls.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-[rgba(10,14,23,0.7)] border-cyan-500/10">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-cyan-100 flex items-center">
                          <Brain className="h-4 w-4 mr-2 text-cyan-400" />
                          Weekly Trade Alerts
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-gray-300">
                        Dispatched every Monday via email/SMS with suggested entry points, targets, and risk thresholds.
                      </CardContent>
                    </Card>

                    <Card className="bg-[rgba(10,14,23,0.7)] border-cyan-500/10">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-cyan-100 flex items-center">
                          <Activity className="h-4 w-4 mr-2 text-cyan-400" />
                          Mid-Week Updates
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-gray-300">
                        Fine-tuned recommendations reflecting market dynamics and evolving sector trends.
                      </CardContent>
                    </Card>

                    <Card className="bg-[rgba(10,14,23,0.7)] border-cyan-500/10">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-cyan-100 flex items-center">
                          <BarChart2 className="h-4 w-4 mr-2 text-cyan-400" />
                          Educational Resources
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-gray-300">
                        In-depth sessions on chart patterns, options tactics, and momentum setups with interactive Q&A
                        discussions.
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-[rgba(10,14,23,0.7)] p-6 rounded-lg border border-cyan-500/10">
                    <h3 className="text-lg font-medium text-cyan-100 mb-4">Expert Trading Strategy</h3>
                    <p className="text-gray-300 mb-4">
                      Our lead strategist is a 20+ year Wall Street veteran known for combining trend-following tactics
                      with robust risk management. The strategy focuses on buying into strength, technical analysis, and
                      volatility opportunities.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-cyan-400 text-sm font-medium mb-2">Key Methodologies</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                          <li>Buying into strength with clear resistance breakouts</li>
                          <li>Technical analysis using moving averages and volume patterns</li>
                          <li>Targeting options setups with 50–300% return potential</li>
                          <li>Focus on earnings events and macro-driven catalysts</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-cyan-400 text-sm font-medium mb-2">Current Opportunities</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                          <li>High-momentum sectors: Energy, biotech, or AI-driven names</li>
                          <li>Volatile breakouts in equities showing upward-trending price channels</li>
                          <li>Options strategies around upcoming earnings announcements</li>
                          <li>Sector rotation plays based on macroeconomic trends</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center mt-6">
                    <Button
                      onClick={() => setActiveTab("ai-forecasting")}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-700"
                    >
                      <Brain className="mr-2 h-4 w-4" />
                      Explore AI Forecasting Methods
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai-forecasting">
              <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-cyan-100 flex items-center">
                    <Brain className="h-6 w-6 mr-2 text-purple-400" />
                    AI-Driven Market Forecasting
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    How Fortune 500 companies and financial firms leverage AI to predict market movements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-300">
                    Fortune 500 companies and top financial institutions commonly use deep learning architectures
                    (LSTM/GRU), ensemble methods (e.g., Random Forest), statistical classifiers (LDA/QDA), and hybrid AI
                    platforms to forecast stock market movements. These advanced techniques inform everything from
                    sector rotation strategies to short-term swing trades.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-[rgba(10,14,23,0.7)] border-purple-500/20">
                      <CardHeader>
                        <CardTitle className="text-purple-100 text-lg">Deep Learning Models</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-purple-100 font-medium">LSTM Networks</h3>
                          <p className="text-gray-300 text-sm">
                            Long Short-Term Memory networks excel at processing sequential data like stock prices,
                            capturing temporal dependencies and patterns that traditional analysis might miss.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-purple-100 font-medium">GRU Networks</h3>
                          <p className="text-gray-300 text-sm">
                            Gated Recurrent Units offer faster training with slightly lower accuracy than LSTM, ideal
                            when computational efficiency is prioritized for real-time trading decisions.
                          </p>
                        </div>
                        <Badge className="bg-purple-500/20 text-purple-300">Used by 78% of hedge funds</Badge>
                      </CardContent>
                    </Card>

                    <Card className="bg-[rgba(10,14,23,0.7)] border-purple-500/20">
                      <CardHeader>
                        <CardTitle className="text-purple-100 text-lg">Ensemble Methods</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-purple-100 font-medium">Random Forest</h3>
                          <p className="text-gray-300 text-sm">
                            Combines multiple decision trees to produce more accurate and robust predictions than any
                            individual model, reducing overfitting and improving generalization.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-purple-100 font-medium">Gradient Boosting</h3>
                          <p className="text-gray-300 text-sm">
                            Builds models sequentially, with each new model correcting errors made by previous ones,
                            particularly effective for feature selection and handling imbalanced datasets.
                          </p>
                        </div>
                        <Badge className="bg-purple-500/20 text-purple-300">92% accuracy in backtesting</Badge>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <Card className="bg-[rgba(10,14,23,0.7)] border-purple-500/20">
                      <CardHeader>
                        <CardTitle className="text-purple-100 text-lg">Statistical Classifiers</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-purple-100 font-medium">LDA (Linear Discriminant Analysis)</h3>
                          <p className="text-gray-300 text-sm">
                            Finds linear combinations of features that best separate market conditions, effective for
                            dimensionality reduction and classification tasks.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-purple-100 font-medium">QDA (Quadratic Discriminant Analysis)</h3>
                          <p className="text-gray-300 text-sm">
                            Extends LDA by allowing for quadratic decision boundaries, better capturing non-linear
                            relationships in market data and sector correlations.
                          </p>
                        </div>
                        <Badge className="bg-purple-500/20 text-purple-300">Used for regime detection</Badge>
                      </CardContent>
                    </Card>

                    <Card className="bg-[rgba(10,14,23,0.7)] border-purple-500/20">
                      <CardHeader>
                        <CardTitle className="text-purple-100 text-lg">Hybrid AI Platforms</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-purple-100 font-medium">Multi-Model Integration</h3>
                          <p className="text-gray-300 text-sm">
                            Combines predictions from multiple AI models, weighing their outputs based on historical
                            accuracy and current market conditions for optimal forecasting.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-purple-100 font-medium">Reinforcement Learning</h3>
                          <p className="text-gray-300 text-sm">
                            Trains models through trial and error, optimizing trading strategies by maximizing rewards
                            (profits) and minimizing penalties (losses) over time.
                          </p>
                        </div>
                        <Badge className="bg-purple-500/20 text-purple-300">Enterprise-grade solution</Badge>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-[rgba(10,14,23,0.7)] p-6 rounded-lg border border-purple-500/20 mt-6">
                    <h3 className="text-lg font-medium text-purple-100 mb-4">CyberTrader Pro's AI Advantage</h3>
                    <p className="text-gray-300 mb-4">
                      Our platform leverages these same enterprise-grade AI technologies to deliver
                      institutional-quality insights to individual traders. By combining multiple AI approaches, we can
                      identify patterns and opportunities that would be impossible to detect with traditional analysis
                      alone.
                    </p>
                    <div className="flex justify-center">
                      <Button
                        onClick={() => setActiveTab("entry-strategies")}
                        className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
                      >
                        <Target className="mr-2 h-4 w-4" />
                        Explore Entry Strategies
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="entry-strategies">
              <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-cyan-100 flex items-center">
                    <Target className="h-6 w-6 mr-2 text-cyan-400" />
                    Buying into Strength
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Strategic entry techniques for optimal trade timing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-300">
                    Our trading approach focuses on buying into strength rather than trying to catch falling knives. We
                    wait for clear confirmation of upward momentum before entering positions, significantly improving
                    win rates and reducing drawdowns.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[rgba(10,14,23,0.7)] p-6 rounded-lg border border-cyan-500/10">
                      <h3 className="text-lg font-medium text-cyan-100 mb-4">Trend Confirmation</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-cyan-400 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-gray-300">
                              <span className="font-medium text-cyan-100">Resistance Breakouts:</span> Only enter after
                              a clear break above established resistance levels, confirming the path of least resistance
                              is upward.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-cyan-400 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-gray-300">
                              <span className="font-medium text-cyan-100">Moving Average Crossovers:</span> Look for
                              shorter-term moving averages crossing above longer-term ones, signaling momentum shifts.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-cyan-400 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-gray-300">
                              <span className="font-medium text-cyan-100">Higher Highs, Higher Lows:</span> Identify
                              stocks forming a series of higher highs and higher lows, the definition of an uptrend.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-[rgba(10,14,23,0.7)] p-6 rounded-lg border border-cyan-500/10">
                      <h3 className="text-lg font-medium text-cyan-100 mb-4">Volume-Based Validation</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-cyan-400 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-gray-300">
                              <span className="font-medium text-cyan-100">Volume Spikes:</span> Monitor for sudden
                              increases in trading volume during breakouts, confirming institutional participation.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-cyan-400 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-gray-300">
                              <span className="font-medium text-cyan-100">On-Balance Volume (OBV):</span> Track the flow
                              of volume without regard to price, helping confirm the strength of price trends.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-cyan-400 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-gray-300">
                              <span className="font-medium text-cyan-100">Volume Trend Analysis:</span> Look for
                              increasing volume on up days and decreasing volume on down days as a bullish confirmation.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-[rgba(10,14,23,0.7)] p-6 rounded-lg border border-cyan-500/10 mt-6">
                    <h3 className="text-lg font-medium text-cyan-100 mb-4">Case Study: Successful Entry Strategy</h3>
                    <p className="text-gray-300 mb-4">
                      In a recent energy sector trade, we identified a stock that had been consolidating for several
                      weeks. Our entry was triggered when:
                    </p>
                    <ol className="list-decimal pl-5 space-y-2 text-gray-300">
                      <li>The stock broke above its 50-day moving average on 2.5x average volume</li>
                      <li>RSI moved above 60, indicating strong momentum but not yet overbought</li>
                      <li>The broader sector was showing relative strength against the market</li>
                      <li>Our AI models detected unusual options activity suggesting institutional accumulation</li>
                    </ol>
                    <p className="text-gray-300 mt-4">
                      This tiered approach resulted in an overall gain of 41% on the total position, while significantly
                      reducing risk after the initial move in our favor.
                    </p>
                  </div>

                  <div className="flex justify-center mt-6">
                    <Button
                      onClick={() => setActiveTab("volatility")}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-700"
                    >
                      <Zap className="mr-2 h-4 w-4" />
                      Explore Volatility Trading
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="volatility">
              <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-cyan-100 flex items-center">
                    <Zap className="h-6 w-6 mr-2 text-cyan-400" />
                    Volatility & High-Potential Opportunities
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Strategies for capitalizing on market volatility and high-reward setups
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-300">
                    While many traders fear volatility, we embrace it as a source of opportunity. Our approach targets
                    options contracts with 50–300% upside potential, often around earnings announcements, product
                    launches, or significant macroeconomic events.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[rgba(10,14,23,0.7)] p-6 rounded-lg border border-cyan-500/10">
                      <h3 className="text-lg font-medium text-cyan-100 mb-4">Options Focus</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-cyan-400 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-gray-300">
                              <span className="font-medium text-cyan-100">Implied Volatility Analysis:</span> Target
                              options when implied volatility is lower than expected future volatility, creating
                              favorable risk/reward.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-cyan-400 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-gray-300">
                              <span className="font-medium text-cyan-100">Event-Driven Strategies:</span> Position ahead
                              of earnings, FDA announcements, or product launches where significant price movement is
                              likely.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-cyan-400 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-gray-300">
                              <span className="font-medium text-cyan-100">Strike Selection:</span> Choose strikes with
                              optimal delta (typically 0.30-0.50) to balance probability of profit with potential
                              return.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-[rgba(10,14,23,0.7)] p-6 rounded-lg border border-cyan-500/10">
                      <h3 className="text-lg font-medium text-cyan-100 mb-4">Momentum Screening</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-cyan-400 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-gray-300">
                              <span className="font-medium text-cyan-100">Relative Strength Analysis:</span> Identify
                              stocks outperforming their sector and the broader market, indicating institutional
                              accumulation.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-cyan-400 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-gray-300">
                              <span className="font-medium text-cyan-100">Breakout Patterns:</span> Look for stocks
                              forming cup-and-handle, bull flag, or ascending triangle patterns that suggest imminent
                              breakouts.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-cyan-400 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-gray-300">
                              <span className="font-medium text-cyan-100">Volume Confirmation:</span> Ensure increasing
                              volume accompanies price increases, validating the sustainability of the momentum.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-[rgba(10,14,23,0.7)] p-6 rounded-lg border border-cyan-500/10 mt-6">
                    <h3 className="text-lg font-medium text-cyan-100 mb-4">Volatility Arbitrage Techniques</h3>
                    <p className="text-gray-300 mb-4">
                      Our advanced AI models can identify discrepancies between implied volatility (what the market
                      expects) and realized volatility (what actually happens), creating opportunities for volatility
                      arbitrage:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[rgba(10,14,23,0.5)] p-4 rounded-md">
                        <h4 className="text-cyan-400 text-sm font-medium mb-2">When IV &gt; Realized Volatility</h4>
                        <p className="text-xs text-gray-300">
                          Implement credit strategies like iron condors, credit spreads, or covered calls to profit from
                          volatility contraction as options premiums decrease.
                        </p>
                        <Badge className="mt-2 bg-green-500/20 text-green-400">SELL PREMIUM</Badge>
                      </div>
                      <div className="bg-[rgba(10,14,23,0.5)] p-4 rounded-md">
                        <h4 className="text-cyan-400 text-sm font-medium mb-2">{"When IV < Realized Volatility"}</h4>
                        <p className="text-xs text-gray-300">
                          Implement debit strategies like long straddles, strangles, or calendar spreads to profit from
                          volatility expansion as options premiums increase.
                        </p>
                        <Badge className="mt-2 bg-red-500/20 text-red-400">BUY PREMIUM</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center mt-6">
                    <Button
                      onClick={() => setActiveTab("risk-management")}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-700"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Explore Risk Management
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="risk-management">
              <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-cyan-100 flex items-center">
                    <Shield className="h-6 w-6 mr-2 text-cyan-400" />
                    Risk Management & Exit Strategy
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Protecting capital and maximizing returns through disciplined risk controls
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-300">
                    Successful trading is as much about risk management as it is about finding opportunities. Our
                    approach emphasizes capital preservation through predefined risk thresholds, strategic stop-loss
                    placement, and systematic profit-taking to ensure consistent long-term performance.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[rgba(10,14,23,0.7)] p-6 rounded-lg border border-cyan-500/10">
                      <h3 className="text-lg font-medium text-cyan-100 mb-4">Stop-Loss Placement</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-cyan-400 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-gray-300">
                              <span className="font-medium text-cyan-100">Support-Based Stops:</span> Place stops just
                              below key support levels where price should not trade if the thesis remains valid.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-cyan-400 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-gray-300">
                              <span className="font-medium text-cyan-100">Volatility-Based Stops:</span> Use Average
                              True Range (ATR) to set stops based on the stock's natural volatility, avoiding premature
                              exits.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-cyan-400 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-gray-300">
                              <span className="font-medium text-cyan-100">Percentage-Based Risk:</span> Never risk more
                              than 1-2% of total portfolio value on any single trade, regardless of conviction level.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-[rgba(10,14,23,0.7)] p-6 rounded-lg border border-cyan-500/10">
                      <h3 className="text-lg font-medium text-cyan-100 mb-4">Profit-Taking Zones</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-cyan-400 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-gray-300">
                              <span className="font-medium text-cyan-100">Tiered Exit Strategy:</span> Scale out of
                              positions in thirds - first third at 1:1 risk/reward, second at 2:1, final third at 3:1 or
                              higher.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-cyan-400 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-gray-300">
                              <span className="font-medium text-cyan-100">Resistance-Based Targets:</span> Set profit
                              targets at key resistance levels where price may struggle to break through.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-cyan-400 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-gray-300">
                              <span className="font-medium text-cyan-100">Trailing Stops:</span> Implement trailing
                              stops to lock in profits while allowing winners to run, especially in strong trending
                              markets.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-[rgba(10,14,23,0.7)] p-6 rounded-lg border border-cyan-500/10 mt-6">
                    <h3 className="text-lg font-medium text-cyan-100 mb-4">Ongoing Monitoring & Adjustments</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-cyan-400 text-sm font-medium mb-2">Weekly Alerts</h4>
                        <p className="text-gray-300 text-sm">
                          Every Monday, we deliver a comprehensive analysis of our highest-conviction trade idea,
                          including:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300 mt-2">
                          <li>Detailed entry criteria with specific price levels</li>
                          <li>Stop-loss and take-profit targets with rationale</li>
                          <li>Position sizing recommendations based on account size</li>
                          <li>Expected holding period and catalyst timeline</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-cyan-400 text-sm font-medium mb-2">Mid-Week Updates</h4>
                        <p className="text-gray-300 text-sm">
                          Throughout the week, we provide real-time adjustments when market conditions change:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300 mt-2">
                          <li>Stop-loss adjustments based on price action</li>
                          <li>Profit-taking recommendations at key levels</li>
                          <li>Position sizing modifications as risk/reward shifts</li>
                          <li>Early exit signals if the thesis is invalidated</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center mt-6">
                    <Button
                      onClick={() => setActiveTab("overview")}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-700"
                    >
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Back to Overview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
