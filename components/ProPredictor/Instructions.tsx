import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const Instructions = () => {
  return (
    <div className="space-y-6 p-4 max-w-4xl mx-auto">
      <Card className="bg-gray-900 text-gray-100">
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl font-bold">Pro Predictor Instructions</CardTitle>
          <CardDescription className="text-gray-300">
            Learn how to use the Pro Predictor tool effectively to make informed trading decisions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="color-breakdown" className="w-full">
            <TabsList className="grid grid-cols-5 mb-4 bg-gray-800">
              <TabsTrigger value="color-breakdown">Color Breakdown</TabsTrigger>
              <TabsTrigger value="signals">Signals</TabsTrigger>
              <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
              <TabsTrigger value="risk">Risk Management</TabsTrigger>
              <TabsTrigger value="ai-features">AI Features</TabsTrigger>
            </TabsList>

            <TabsContent value="color-breakdown" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Color Breakdown</h3>

                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="border-l-4 border-l-green-500 bg-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium flex items-center">
                        <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
                        Green (Buy Signal)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-300">Indicates a strong bullish trend or buying opportunity.</p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-red-500 bg-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium flex items-center">
                        <span className="h-3 w-3 rounded-full bg-red-500 mr-2"></span>
                        Red (Sell Signal)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-300">Indicates a strong bearish trend or selling opportunity.</p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-yellow-500 bg-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium flex items-center">
                        <span className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></span>
                        Yellow (Neutral)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-300">Indicates a neutral or uncertain market condition.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="signals" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Interpreting Signals</h3>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="border-l-4 border-l-green-600 bg-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium">Strong Buy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-300">
                        High confidence in an upward trend. Consider opening or adding to long positions.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-green-500 bg-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium">Buy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-300">
                        Moderate confidence in an upward trend. Look for additional confirmations before entering a long
                        position.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-green-300 bg-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium">Weak Buy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-300">
                        Slight bullish bias, but exercise caution. Wait for stronger signals or use smaller position
                        sizes.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-yellow-500 bg-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium">Neutral</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-300">
                        No clear trend. Consider staying out of the market or using range-bound strategies.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-red-300 bg-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium">Weak Sell</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-300">
                        Slight bearish bias, but exercise caution. Wait for stronger signals or use smaller position
                        sizes.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-red-500 bg-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium">Sell</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-300">
                        Moderate confidence in a downward trend. Look for additional confirmations before entering a
                        short position.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-red-600 bg-gray-800 md:col-span-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium">Strong Sell</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-300">
                        High confidence in a downward trend. Consider opening or adding to short positions.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="best-practices" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Best Practices and Strategies</h3>

                <Card className="bg-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium">Using the Pro Predictor Effectively</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                      <li>
                        Always use the Pro Predictor as part of a comprehensive trading strategy, not as a sole
                        decision-making tool.
                      </li>
                      <li>Consider both short-term and long-term analyses for a more complete market perspective.</li>
                      <li>
                        Pay attention to the weighted score, which combines multiple factors for a more robust signal.
                      </li>
                      <li>
                        Use the provided stop-loss and take-profit levels as guidelines, adjusting them based on your
                        risk tolerance.
                      </li>
                      <li>Monitor market conditions and volume categories to gauge the strength of signals.</li>
                      <li>Utilize the option data (if available) to inform potential options trading strategies.</li>
                      <li>
                        Regularly review and analyze your saved predictions to improve your trading decisions over time.
                      </li>
                      <li>Use the copy and share buttons to save or share your analysis with others.</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="risk" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Risk Management</h3>

                <Card className="bg-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium">Important Considerations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                      <li>Never risk more than you can afford to lose on any single trade.</li>
                      <li>
                        Use the position size recommendation as a starting point, but adjust based on your personal risk
                        tolerance and account size.
                      </li>
                      <li>Consider using trailing stop-losses to protect profits in trending markets.</li>
                      <li>Diversify your portfolio across different assets and sectors to spread risk.</li>
                      <li>Be aware of upcoming economic events or earnings reports that could impact your trades.</li>
                      <li>Always have an exit strategy for both profitable and unprofitable trades.</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="ai-features" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">AI-Powered Analysis</h3>

                <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium">Together AI Integration</CardTitle>
                    <CardDescription className="text-gray-300">
                      Cyber Trader Pro now integrates with Together AI to provide enhanced market analysis and trading
                      recommendations.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-sm">Market Sentiment Analysis</h4>
                          <p className="text-sm text-gray-300 text-muted-foreground">
                            AI-powered analysis of current market sentiment for your selected assets.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-sm">Trading Strategy Recommendations</h4>
                          <p className="text-sm text-gray-300 text-muted-foreground">
                            Get personalized trading strategy suggestions based on current market conditions.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-sm">Technical Analysis Enhancement</h4>
                          <p className="text-sm text-gray-300 text-muted-foreground">
                            AI augments traditional technical indicators with contextual understanding.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-sm">Price Target Predictions</h4>
                          <p className="text-sm text-gray-300 text-muted-foreground">
                            More accurate entry, target, and stop-loss price predictions.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2 md:col-span-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-sm">Share & Copy Features</h4>
                          <p className="text-sm text-gray-300 text-muted-foreground">
                            Easily share your analysis or copy results with the new sharing buttons.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-amber-700 bg-amber-900/30">
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                      <CardTitle className="text-base font-medium">Disclaimer</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300">
                      This script is for educational and informational purposes only. Trading involves risk, and past
                      performance does not guarantee future results. Use at your own discretion.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-gray-400">
        <p>© 2025 Cyber Trader Pro. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Privacy
          </a>
        </div>
      </div>
    </div>
  )
}

export default Instructions
