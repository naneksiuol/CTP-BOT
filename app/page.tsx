import type React from "react"
import Link from "next/link"
import { Brain, Clock, ShieldCheck, Globe, BarChart2, Zap, Award, Activity, Search } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0e17] text-white">
      <nav className="fixed top-0 w-full z-50 bg-[rgba(10,14,23,0.95)] py-6 px-[5%] flex justify-between items-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-[#00f2fe] to-[#4facfe] bg-clip-text text-transparent">
          Cyber Trader Pro
        </div>
        <div className="hidden md:flex gap-8">
          <Link href="/dashboard" className="text-white hover:text-[#4facfe] transition-colors">
            ML Dashboard
          </Link>
          <Link href="/market-scanner" className="text-white hover:text-[#4facfe] transition-colors">
            Market Scanner
          </Link>
          <Link href="/trading-strategies" className="text-white hover:text-[#4facfe] transition-colors">
            Trading Strategies
          </Link>
          <Link href="/pro-predictor" className="text-white hover:text-[#4facfe] transition-colors">
            Predictor
          </Link>
          <Link href="/expected-move" className="text-white hover:text-[#4facfe] transition-colors">
            Expected Move
          </Link>
          <Link href="/university" className="text-white hover:text-[#4facfe] transition-colors">
            University
          </Link>
          <Link href="/about" className="text-white hover:text-[#4facfe] transition-colors">
            About
          </Link>
        </div>
      </nav>

      <main className="flex-grow">
        <section className="relative pt-32 pb-16 px-[5%] text-center">
          {/* Background Image */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_1wbpz61wbpz61wbp.jpg-goKNOHl25yIJ9BuAtnEVEvne3JQmLI.jpeg")',
              backgroundBlendMode: "overlay",
            }}
          />
          {/* Overlay gradient for better text readability */}
          <div className="absolute inset-0 z-1 bg-gradient-to-br from-[rgba(10,14,23,0.9)] to-[rgba(26,31,45,0.85)]" />
          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-4">Advanced AI-Powered Trading Analysis</h1>
            <p className="text-xl mb-8">Predict market trends with precision using our ML Dashboard</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="bg-gradient-to-r from-[#4facfe] to-[#00f2fe] text-white font-bold py-4 px-8 rounded hover:opacity-90 transition-opacity"
              >
                ML Dashboard
              </Link>
              <Link
                href="/expected-move"
                className="bg-gradient-to-r from-purple-500 to-blue-600 text-white font-bold py-4 px-8 rounded hover:opacity-90 transition-opacity"
              >
                Cyber Expected Move (CEM)
              </Link>
              <Link
                href="/market-scanner"
                className="bg-gradient-to-r from-purple-500 to-blue-600 text-white font-bold py-4 px-8 rounded hover:opacity-90 transition-opacity"
              >
                Cyber Market Scan
              </Link>
              <Link
                href="/about"
                className="bg-[#1a1f2d] text-white font-bold py-4 px-8 rounded border border-[#4facfe] hover:bg-[#2a2f3d] transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* ML Dashboard Highlight Section */}
        <section className="py-16 px-[5%] bg-[#0d1219]">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#4facfe]">ML Dashboard Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our ML Dashboard combines advanced AI models with technical analysis to provide you with actionable
              trading insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#1a1f2d] p-8 rounded-lg border border-[#4facfe]/20 hover:border-[#4facfe] transition-colors">
              <Brain className="w-12 h-12 text-[#4facfe] mb-4" />
              <h3 className="text-xl font-bold mb-2">AI Technical Analysis</h3>
              <p className="text-gray-300 mb-4">
                Get AI-powered trade recommendations based on technical indicators with detailed analysis and confidence
                scores.
              </p>
              <Link href="/dashboard" className="text-[#4facfe] hover:underline flex items-center">
                Try Technical Analysis <Zap className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-[#1a1f2d] p-8 rounded-lg border border-purple-500/20 hover:border-purple-500 transition-colors">
              <Brain className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Market Sentiment Analysis</h3>
              <p className="text-gray-300 mb-4">
                Analyze market sentiment for any ticker using Together AI to understand bullish, bearish, or neutral
                trends.
              </p>
              <Link href="/dashboard" className="text-purple-400 hover:underline flex items-center">
                Analyze Sentiment <Brain className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-[#1a1f2d] p-8 rounded-lg border border-[#4facfe]/20 hover:border-[#4facfe] transition-colors">
              <Award className="w-12 h-12 text-[#4facfe] mb-4" />
              <h3 className="text-xl font-bold mb-2">Trading Insights</h3>
              <p className="text-gray-300 mb-4">
                Get AI-powered trading strategy recommendations and insights tailored to your selected assets.
              </p>
              <Link href="/dashboard" className="text-[#4facfe] hover:underline flex items-center">
                Get Insights <Award className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="py-16 px-[5%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Brain className="w-10 h-10 text-[#4facfe]" />}
            title="AI-Powered Analysis"
            description="Advanced machine learning algorithms powered by Together AI for accurate predictions"
          />
          <FeatureCard
            icon={<BarChart2 className="w-10 h-10 text-[#4facfe]" />}
            title="ML Trading Dashboard"
            description="Comprehensive technical analysis with AI-driven trade recommendations"
          />
          <FeatureCard
            icon={<Activity className="w-10 h-10 text-purple-500" />}
            title="Cyber Expected Move (CEM)"
            description="Calculate expected price ranges with our proprietary AI-Implied Volatility model"
          />
          <FeatureCard
            icon={<Clock className="w-10 h-10 text-[#4facfe]" />}
            title="Multi-Timeframe Analysis"
            description="Comprehensive insights across all timeframes"
          />
          <FeatureCard
            icon={<ShieldCheck className="w-10 h-10 text-[#4facfe]" />}
            title="Risk Management"
            description="Advanced stop-loss and take-profit calculations"
          />
          <FeatureCard
            icon={<Globe className="w-10 h-10 text-[#4facfe]" />}
            title="Global Coverage"
            description="Stocks, forex, and cryptocurrencies worldwide"
          />
          <FeatureCard
            icon={<Search className="w-10 h-10 text-[#4facfe]" />}
            title="Market Scanner"
            description="Scan markets for technical patterns, setups, and trading opportunities"
          />
        </section>

        <section className="py-16 px-[5%] text-center bg-[#1a1f2d]">
          <h2 className="text-3xl font-bold mb-4">Ready to Enhance Your Trading?</h2>
          <p className="mb-8">Access our ML Dashboard and start making data-driven trading decisions today</p>
          <Link
            href="/dashboard"
            className="bg-gradient-to-r from-[#4facfe] to-[#00f2fe] text-white font-bold py-4 px-8 rounded hover:opacity-90 transition-opacity inline-block"
          >
            Launch ML Dashboard
          </Link>
        </section>
      </main>

      <footer className="py-8 px-[5%] text-center text-sm text-[#8b8f96]">
        <p className="mb-4">
          Disclaimer: This script is for educational purposes only. Trading involves risk. Past performance does not
          guarantee future results.
        </p>
        <div className="mb-4">
          <Link href="/terms" className="text-[#8b8f96] hover:text-white mx-4">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-[#8b8f96] hover:text-white mx-4">
            Privacy
          </Link>
        </div>
        <p>© 2025 Cyber Trader Pro. All rights reserved.</p>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-[#1a1f2d] p-8 rounded-lg text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  )
}
