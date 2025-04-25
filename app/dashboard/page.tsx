"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NavMenu } from "@/components/NavMenu"
import Link from "next/link"
import { TrendingUp, Brain } from "lucide-react"
import { MarketSentimentAnalysis } from "@/components/MLDashboard/MarketSentimentAnalysis"
import { TradingInsights } from "@/components/MLDashboard/TradingInsights"
import { PatternExplainer } from "@/components/MLDashboard/PatternExplainer"
import { SavedMLPredictions } from "@/components/MLDashboard/SavedPredictions"
import { TechnicalAnalysis } from "@/components/MLDashboard/TechnicalAnalysis"
import { AdvancedPredictions } from "@/components/MLDashboard/AdvancedPredictions"
import { CombinedModelAnalysis } from "@/components/MLDashboard/CombinedModelAnalysis"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("ml-dashboard")

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
            <nav className="ml-auto flex items-center space-x-4">
              <NavMenu />
            </nav>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-4 py-8 pb-32">
          <h1 className="text-3xl font-bold mb-8 text-cyan-100">ML Trading Dashboard</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
            <TabsList className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
              <TabsTrigger value="ml-dashboard" className="data-[state=active]:bg-cyan-500/20">
                Technical Analysis
              </TabsTrigger>
              <TabsTrigger value="sentiment" className="data-[state=active]:bg-cyan-500/20">
                Market Sentiment
              </TabsTrigger>
              <TabsTrigger value="advanced-ai" className="data-[state=active]:bg-cyan-500/20">
                Advanced AI
              </TabsTrigger>
              <TabsTrigger value="saved" className="data-[state=active]:bg-cyan-500/20">
                Saved Predictions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ml-dashboard">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6 text-cyan-100 flex items-center">
                  <Brain className="mr-2 h-6 w-6 text-cyan-400" />
                  AI Technical Analysis
                </h2>
                <p className="text-gray-300 mb-8">
                  Get AI-powered trade recommendations based on technical indicators with detailed analysis and
                  confidence scores.
                </p>

                <div className="grid grid-cols-1 gap-8 mb-8">
                  <TechnicalAnalysis />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sentiment">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6 text-cyan-100 flex items-center">
                  <Brain className="mr-2 h-6 w-6 text-cyan-400" />
                  Market Sentiment & Insights
                </h2>
                <p className="text-gray-300 mb-8">
                  Leverage the power of Together AI to analyze market sentiment, generate trading insights, and
                  understand trading patterns.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <MarketSentimentAnalysis />
                  <TradingInsights />
                  <PatternExplainer />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced-ai">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6 text-cyan-100 flex items-center">
                  <Brain className="mr-2 h-6 w-6 text-purple-400" />
                  Fortune 500 Grade AI Models
                </h2>
                <p className="text-gray-300 mb-8">
                  Access the same advanced machine learning algorithms used by Fortune 500 companies and financial
                  institutions to predict market trends with higher accuracy.
                </p>

                <div className="grid grid-cols-1 gap-8 mb-8">
                  <CombinedModelAnalysis />
                  <AdvancedPredictions />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="saved">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6 text-cyan-100 flex items-center">
                  <Brain className="mr-2 h-6 w-6 text-cyan-400" />
                  Saved ML Predictions
                </h2>
                <p className="text-gray-300 mb-8">View and manage your saved predictions from our AI models.</p>
                <SavedMLPredictions />
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
