import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, ArrowDown, ArrowUp, Minus, TrendingUp, TrendingDown, Brain, GraduationCap } from "lucide-react"

export function InstructionsTab() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Color Breakdown</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-l-4 border-l-green-500 bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ArrowUp className="w-5 h-5 mr-2 text-green-500" />
                <span className="text-green-500">Green (Buy Signal)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">Indicates a strong bullish trend or buying opportunity.</CardContent>
          </Card>
          <Card className="border-l-4 border-l-red-500 bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ArrowDown className="w-5 h-5 mr-2 text-red-500" />
                <span className="text-red-500">Red (Sell Signal)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              Indicates a strong bearish trend or selling opportunity.
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-yellow-500 bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Minus className="w-5 h-5 mr-2 text-yellow-500" />
                <span className="text-yellow-500">Yellow (Neutral)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">Indicates a neutral or uncertain market condition.</CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Interpreting Signals</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-l-4 border-l-green-500 bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-green-500">
                <TrendingUp className="w-5 h-5 mr-2" />
                Strong Buy
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              High confidence in an upward trend. Consider opening or adding to long positions.
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500 bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-green-500">
                <ArrowUp className="w-5 h-5 mr-2" />
                Buy
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              Moderate confidence in an upward trend. Look for additional confirmations before entering a long position.
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500 bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-green-500">
                <ArrowUp className="w-5 h-5 mr-2" />
                Weak Buy
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              Slight bullish bias, but exercise caution. Wait for stronger signals or use smaller position sizes.
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-yellow-500 bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-500">
                <Minus className="w-5 h-5 mr-2" />
                Neutral
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              No clear trend. Consider staying out of the market or using range-bound strategies.
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-red-500 bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-red-500">
                <ArrowDown className="w-5 h-5 mr-2" />
                Weak Sell
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              Slight bearish bias, but exercise caution. Wait for stronger signals or use smaller position sizes.
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-red-500 bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-red-500">
                <ArrowDown className="w-5 h-5 mr-2" />
                Sell
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              Moderate confidence in a downward trend. Look for additional confirmations before entering a short
              position.
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-red-500 bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-red-500">
                <TrendingDown className="w-5 h-5 mr-2" />
                Strong Sell
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              High confidence in a downward trend. Consider opening or adding to short positions.
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Best Practices and Strategies</h2>
        <Card className="bg-gray-800">
          <CardHeader>
            <CardTitle>Using the Pro Predictor Effectively</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>
                Always use the Pro Predictor as part of a comprehensive trading strategy, not as a sole decision-making
                tool.
              </li>
              <li>Consider both short-term and long-term analyses for a more complete market perspective.</li>
              <li>Pay attention to the weighted score, which combines multiple factors for a more robust signal.</li>
              <li>
                Use the provided stop-loss and take-profit levels as guidelines, adjusting them based on your risk
                tolerance.
              </li>
              <li>Monitor market conditions and volume categories to gauge the strength of signals.</li>
              <li>Utilize the option data (if available) to inform potential options trading strategies.</li>
              <li>Regularly review and analyze your saved predictions to improve your trading decisions over time.</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Risk Management</h2>
        <Card className="bg-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
              Important Considerations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
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
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-100">AI-Powered Analysis</h2>
        <Card className="bg-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="w-5 h-5 mr-2 text-cyan-500" />
              Together AI Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-300">
              Cyber Trader Pro now integrates with Together AI to provide enhanced market analysis and trading
              recommendations.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>
                <strong>Market Sentiment Analysis:</strong> AI-powered analysis of current market sentiment for your
                selected assets.
              </li>
              <li>
                <strong>Trading Strategy Recommendations:</strong> Get personalized trading strategy suggestions based
                on current market conditions.
              </li>
              <li>
                <strong>Technical Analysis Enhancement:</strong> AI augments traditional technical indicators with
                contextual understanding.
              </li>
              <li>
                <strong>Price Target Predictions:</strong> More accurate entry, target, and stop-loss price predictions.
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Educational Resources</h2>
        <Card className="bg-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="w-5 h-5 mr-2 text-cyan-500" />
              Cyber Trader Pro University
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-300">
              Enhance your trading knowledge with our comprehensive educational platform.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>
                <strong>AI Trading Instructor:</strong> Get personalized answers to your trading questions from our AI
                instructor.
              </li>
              <li>
                <strong>Comprehensive Courses:</strong> Access structured courses on technical analysis, risk
                management, and trading strategies.
              </li>
              <li>
                <strong>Technical Indicator Library:</strong> Learn about all major technical indicators and how to use
                them effectively.
              </li>
              <li>
                <strong>Trading Psychology:</strong> Understand the psychological aspects of trading and develop mental
                resilience.
              </li>
              <li>
                <strong>Certification Program:</strong> Earn a Cyber Trader Pro certification to validate your trading
                knowledge.
              </li>
            </ul>
            <div className="mt-4">
              <a href="/university" className="text-cyan-400 hover:underline">
                Visit Cyber Trader Pro University →
              </a>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Disclaimer</h2>
        <Card className="border border-amber-700 bg-amber-900/30">
          <CardHeader>
            <CardTitle>Important Notice</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300">
            <p>
              This script is for educational purposes only. Trading involves risk, and past performance does not
              guarantee future results. Use at your own discretion.
            </p>
          </CardContent>
        </Card>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Advanced AI Models</h2>
        <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/20">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2 text-purple-400" />
              Fortune 500 Grade AI Models
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-300">
              Cyber Trader Pro now offers access to the same advanced machine learning algorithms used by Fortune 500
              companies and financial institutions:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>
                <strong className="text-purple-400">Combined AI Model Analysis:</strong> Run all 4 advanced AI models
                simultaneously and get a combined signal with higher accuracy.
              </li>
              <li>
                <strong className="text-purple-400">LSTM Networks:</strong> Long Short-Term Memory networks excel at
                processing sequential data like stock prices.
              </li>
              <li>
                <strong className="text-purple-400">GRU:</strong> Gated Recurrent Units offer faster training with
                slightly lower accuracy than LSTM.
              </li>
              <li>
                <strong className="text-purple-400">Ensemble Methods:</strong> Combines multiple models for more robust
                predictions.
              </li>
              <li>
                <strong className="text-purple-400">Statistical Models:</strong> Traditional time-series analysis
                techniques like ARIMA.
              </li>
            </ul>
            <div className="mt-4 p-3 bg-purple-900/30 border border-purple-500/30 rounded-md">
              <p className="text-purple-300 flex items-start">
                <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Important:</strong> While these models use advanced techniques, all financial predictions
                  involve risk. Past performance does not guarantee future results.
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
