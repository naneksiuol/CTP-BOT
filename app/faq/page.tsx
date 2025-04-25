"use client"

import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp } from "lucide-react"
import { useState } from "react"

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState("faq")

  // Function to get background image based on active tab
  const getBackgroundImage = (tab: string) => {
    switch (tab) {
      case "faq":
        return 'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_y0r8h4y0r8h4y0r8.jpg-l86gltx3zUgyz0pSSmrp5x1mxPvvma.jpeg")'
      case "study-guide":
        return 'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_dxd10ndxd10ndxd1.jpg-3gMBaGXSiNT4ap8q1nlZQ4kWI65ZEZ.jpeg")'
      default:
        return 'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_y0r8h4y0r8h4y0r8.jpg-l86gltx3zUgyz0pSSmrp5x1mxPvvma.jpeg")'
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
      {/* Overlay */}
      <div className="fixed inset-0 z-1 bg-[rgba(10,14,23,0.85)] transition-all duration-1000" />

      {/* Content */}
      <div className="relative z-10">
        <header className="px-4 lg:px-6 h-14 flex items-center bg-[rgba(10,14,23,0.95)] border-b border-cyan-500/20">
          <Link className="flex items-center justify-center" href="/">
            <TrendingUp className="h-6 w-6 mr-2 text-cyan-400" />
            <span className="font-bold text-cyan-100">Cyber Trader Pro</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium text-gray-200 hover:text-cyan-400 transition-colors" href="/">
              Home
            </Link>
            <Link
              className="text-sm font-medium text-gray-200 hover:text-cyan-400 transition-colors"
              href="/pro-predictor"
            >
              Pro Predictor
            </Link>
            <Link className="text-sm font-medium text-gray-200 hover:text-cyan-400 transition-colors" href="/about">
              About
            </Link>
          </nav>
        </header>

        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-6 text-cyan-100">
                FAQ & Study Guide
              </h1>
              <Tabs defaultValue="faq" className="w-full" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
                  <TabsTrigger value="faq" className="data-[state=active]:bg-cyan-500/20">
                    FAQ
                  </TabsTrigger>
                  <TabsTrigger value="study-guide" className="data-[state=active]:bg-cyan-500/20">
                    Study Guide
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="faq">
                  <div className="space-y-8">
                    {/* FAQ Content - Using semi-transparent cards */}
                    {faqItems.map((item, index) => (
                      <div key={index} className="bg-[rgba(26,31,45,0.8)] border border-cyan-500/20 rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-2 text-cyan-100">{item.question}</h2>
                        <p className="text-gray-300">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="study-guide">
                  <div className="space-y-8">
                    {/* Study Guide Content - Using semi-transparent cards */}
                    {studyGuideItems.map((item, index) => (
                      <div key={index} className="bg-[rgba(26,31,45,0.8)] border border-cyan-500/20 rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-2 text-cyan-100">{item.title}</h2>
                        <div className="text-gray-300">{item.content}</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

const faqItems = [
  {
    question: "What is Cyber Trader Pro?",
    answer:
      "Cyber Trader Pro is an AI-powered trading analysis platform that combines advanced machine learning algorithms, multi-timeframe analysis, and robust risk management tools to provide actionable insights for traders and investors.",
  },
  {
    question: "How does the Pro Predictor work?",
    answer:
      "The Pro Predictor uses advanced algorithms to analyze market data, including price movements, volume, and various technical indicators. It then provides predictions and insights based on this analysis, helping traders make informed decisions.",
  },
  // ... other FAQ items
]

const studyGuideItems = [
  {
    title: "Introduction to Trading Analysis",
    content:
      "Trading analysis is the process of evaluating financial instruments and market conditions to make informed trading decisions. It involves studying price movements, volume, market trends, and various indicators to predict future market behavior.",
  },
  {
    title: "Key Concepts in Cyber Trader Pro",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>Multi-Timeframe Analysis: Examining market trends across different time periods</li>
        <li>Volume Analysis: Understanding the relationship between price movements and trading volume</li>
        <li>Trend Identification: Recognizing uptrends, downtrends, and consolidation phases</li>
        <li>Support and Resistance Levels: Identifying key price levels</li>
        <li>Risk Management: Implementing strategies to protect capital</li>
      </ul>
    ),
  },
  // ... other study guide items
]
