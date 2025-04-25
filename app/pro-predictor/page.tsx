"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import TickerAnalysis from "@/components/TickerAnalysis"
import { ResultsTab } from "@/components/ResultsTab"
import { InstructionsTab } from "@/components/InstructionsTab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, BarChart2, DollarSign, Briefcase } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { NavMenu } from "@/components/NavMenu"
// Add the necessary imports at the top of the file
import { Brain, AlertTriangle } from "lucide-react"
import { CombinedModelAnalysis } from "@/components/MLDashboard/CombinedModelAnalysis"
import { AdvancedPredictions } from "@/components/MLDashboard/AdvancedPredictions"

export default function ProPredictorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProPredictorContent />
    </Suspense>
  )
}

function ProPredictorContent() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("instructions")

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab === "predictor") {
      setActiveTab("predictor")
    } else if (tab === "results") {
      setActiveTab("results")
    } else if (tab === "instructions") {
      setActiveTab("instructions")
    }
  }, [searchParams])

  // In the ProPredictorContent component, add this useEffect to handle ticker parameters

  useEffect(() => {
    const tab = searchParams.get("tab")
    const ticker = searchParams.get("ticker")

    if (tab === "predictor") {
      setActiveTab("predictor")

      // If a ticker parameter is provided, pre-fill the ticker input
      if (ticker) {
        // Find the TickerAnalysis component and set its ticker input
        // This is a simple approach - in a real app, you might use context or state management
        const tickerInput = document.querySelector('input[placeholder*="ticker"]') as HTMLInputElement
        if (tickerInput) {
          tickerInput.value = ticker
          // Trigger analysis automatically after a short delay
          setTimeout(() => {
            const analyzeButton = tickerInput
              .closest("form")
              ?.querySelector('button[type="submit"]') as HTMLButtonElement
            if (analyzeButton) {
              analyzeButton.click()
            }
          }, 500)
        }
      }
    }
  }, [searchParams])

  const assetCategories = [
    {
      title: "S&P 500 Stocks",
      icon: <BarChart2 className="w-6 h-6 mb-2 text-blue-500" />,
      tickers:
        "SPY, AAPL, MSFT, AMZN, GOOGL, META, TSLA, NVDA, JPM, JNJ, V, PG, UNH, HD, BAC, XOM, DIS, CSCO, VZ, NFLX",
    },
    {
      title: "Cryptocurrencies",
      icon: <DollarSign className="w-6 h-6 mb-2 text-green-500" />,
      tickers: "BTC-USD, ETH-USD, XRP-USD, LTC-USD, ADA-USD, DOT-USD, LINK-USD, BCH-USD, XLM-USD, DOGE-USD",
    },
    {
      title: "Forex",
      icon: <Briefcase className="w-6 h-6 mb-2 text-yellow-500" />,
      tickers: "EURUSD=X, USDJPY=X, GBPUSD=X, AUDUSD=X, USDCAD=X, USDCHF=X, NZDUSD=X, EURGBP=X, EURJPY=X, GBPJPY=X",
    },
    {
      title: "Commodities",
      icon: <TrendingUp className="w-6 h-6 mb-2 text-red-500" />,
      tickers: "GC=F, SI=F, HG=F, CL=F, NG=F, ZC=F, ZS=F, KC=F, CT=F, CC=F",
    },
  ]

  // Function to get background image based on active tab
  const getBackgroundImage = (tab: string) => {
    switch (tab) {
      case "instructions":
        return 'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_9wyu5k9wyu5k9wyu.jpg-nxnqNYn3J6cEGl2pE3Is1sCpYJjOPV.jpeg")'
      case "predictor":
        return 'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_pz9x71pz9x71pz9x.jpg-tPHfTFY2IKFYzThU4VZtrTM86EONQ1.jpeg")' // Robot image now on predictor
      case "results":
        return 'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mm.jpg-4gvpACIajg6SpKgOHauvooaaF5JSTr.jpeg")' // Trading monitors now on results
      default:
        return 'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_9wyu5k9wyu5k9wyu.jpg-nxnqNYn3J6cEGl2pE3Is1sCpYJjOPV.jpeg")'
    }
  }

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Background Image */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: getBackgroundImage(activeTab),
        }}
      />
      {/* Dynamic overlay based on active tab */}
      <div
        className={`fixed inset-0 z-1 transition-all duration-1000 ${
          activeTab === "instructions"
            ? "bg-[rgba(10,14,23,0.75)]"
            : activeTab === "predictor"
              ? "bg-[rgba(10,14,23,0.75)]" // Adjusted for robot background
              : "bg-[rgba(10,14,23,0.85)]" // Adjusted for trading monitors
        }`}
      />

      {/* Content */}
      <div className="relative z-10">
        <header className="sticky top-0 z-40 w-full border-b transition-all duration-500 bg-[rgba(10,14,23,0.95)] border-cyan-500/20">
          <div className="container flex h-14 items-center">
            <Link className="flex items-center justify-center" href="/">
              <TrendingUp className="h-6 w-6 mr-2 text-cyan-400" />
              <span className="font-bold text-cyan-100">Cyber Trader Pro</span>
            </Link>
            <nav className="ml-auto flex items-center space-x-4">
              <NavMenu />
            </nav>
          </div>
        </header>

        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8 text-cyan-100">
                Pro Predictor
              </h1>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8 bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
                  <TabsTrigger value="instructions">Instructions</TabsTrigger>
                  <TabsTrigger value="predictor">Predictor</TabsTrigger>
                  <TabsTrigger value="advanced-ai">Advanced AI</TabsTrigger>
                  <TabsTrigger value="results">Results</TabsTrigger>
                </TabsList>
                <TabsContent value="instructions">
                  <InstructionsTab />
                </TabsContent>
                <TabsContent value="predictor">
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center mb-8 text-cyan-100">
                      Top Traded Assets
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                      {assetCategories.map((category, index) => (
                        <Card key={index} className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-cyan-100">{category.title}</CardTitle>
                            {category.icon}
                          </CardHeader>
                          <CardContent>
                            <p className="text-xs text-gray-400">{category.tickers}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center mt-16 mb-8 text-cyan-100">
                      Analyze Your Assets
                    </h2>
                    <TickerAnalysis />
                  </div>
                </TabsContent>
                <TabsContent value="advanced-ai">
                  <div className="space-y-8">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-cyan-100 flex items-center justify-center">
                        <Brain className="mr-2 h-6 w-6 text-purple-400" />
                        Fortune 500 Grade AI Models
                      </h2>
                      <p className="text-gray-300 mt-2 max-w-3xl mx-auto">
                        Access the same advanced machine learning algorithms used by Fortune 500 companies and financial
                        institutions to predict market trends with higher accuracy.
                      </p>
                    </div>

                    {/* Combined AI Model Analysis */}
                    <Card className="bg-[rgba(26,31,45,0.8)] border-purple-500/20 mb-8">
                      <CardHeader>
                        <CardTitle className="text-purple-100 flex items-center">
                          <Brain className="mr-2 h-6 w-6 text-purple-400" />
                          Combined AI Model Analysis
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                          Analyze with all 4 advanced AI models simultaneously and get a combined signal
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <CombinedModelAnalysis />
                      </CardContent>
                    </Card>

                    {/* Advanced Predictions */}
                    <Card className="bg-[rgba(26,31,45,0.8)] border-purple-500/20">
                      <CardHeader>
                        <CardTitle className="text-purple-100 flex items-center">
                          <Brain className="mr-2 h-6 w-6 text-purple-400" />
                          Advanced AI Model Prediction
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                          Use Fortune 500 grade machine learning models to predict market movements
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <AdvancedPredictions />
                      </CardContent>
                    </Card>

                    {/* AI Models Information */}
                    <Card className="bg-[rgba(26,31,45,0.8)] border-purple-500/20 mt-8">
                      <CardHeader>
                        <CardTitle className="text-purple-100 flex items-center">
                          <Brain className="mr-2 h-6 w-6 text-purple-400" />
                          About Advanced AI Models
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-gray-300">
                        <p className="mb-4">
                          Our advanced AI models leverage cutting-edge machine learning techniques used by top financial
                          institutions:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>
                            <strong className="text-purple-400">LSTM Networks:</strong> Long Short-Term Memory networks
                            excel at processing sequential data like stock prices, capturing temporal dependencies in
                            time-series data.
                          </li>
                          <li>
                            <strong className="text-purple-400">GRU:</strong> Gated Recurrent Units offer faster
                            training with slightly lower accuracy than LSTM, ideal when computational efficiency is
                            prioritized.
                          </li>
                          <li>
                            <strong className="text-purple-400">Ensemble Methods:</strong> Combines multiple models to
                            produce more accurate and robust predictions than any individual model.
                          </li>
                          <li>
                            <strong className="text-purple-400">Statistical Models:</strong> Traditional time-series
                            analysis techniques like ARIMA combined with modern optimization algorithms.
                          </li>
                        </ul>
                        <div className="mt-4 p-3 bg-purple-900/30 border border-purple-500/30 rounded-md">
                          <p className="text-purple-300 flex items-start">
                            <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                            <span>
                              <strong>Important:</strong> While these models use advanced techniques, all financial
                              predictions involve risk. Past performance does not guarantee future results.
                            </span>
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="results">
                  <ResultsTab />
                </TabsContent>
              </Tabs>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
