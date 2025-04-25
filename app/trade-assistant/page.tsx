"use client"

import Link from "next/link"
import { TrendingUp, AlertTriangle, Info } from "lucide-react"
import { TradeAssistant } from "@/components/TradeAssistant"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react" // Import useEffect hook

export default function TradeAssistantPage() {
  const [selectedModel, setSelectedModel] = useState("openai")

  // New state variable to hold the results of the Deep Infra test
  const [deepInfraTestResult, setDeepInfraTestResult] = useState(null)

  // Function to test the Deep Infra API and display the result
  const testDeepInfraAPI = async () => {
    try {
      const response = await fetch("/api/ai/test-deepinfra")
      const data = await response.json()
      setDeepInfraTestResult(data)
    } catch (error) {
      console.error("Error testing Deep Infra API:", error)
      setDeepInfraTestResult({ success: false, error: error.message })
    }
  }

  // Run the test when the component mounts (useEffect)
  useEffect(() => {
    testDeepInfraAPI()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-[#0a0e17] border-b border-gray-800">
        <Link className="flex items-center justify-center" href="/">
          <TrendingUp className="h-6 w-6 mr-2 text-green-600 dark:text-green-400" />
          <span className="font-bold">Cyber Trader Pro</span>
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
          <Link className="text-sm font-medium text-gray-200 hover:text-blue-400 transition-colors" href="/dashboard">
            Dashboard
          </Link>
          <Link className="text-sm font-medium text-gray-200 hover:text-blue-400 transition-colors" href="/about">
            About
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4 text-center">AI Trade Assistant</h1>

          <Alert className="mb-4 bg-yellow-900/30 border-yellow-500/30 max-w-3xl mx-auto">
            <Info className="h-5 w-5 text-yellow-400" />
            <AlertDescription className="text-yellow-400">
              <strong>System Status:</strong> The Trade Assistant is currently experiencing connectivity issues with
              some AI providers. The system will automatically try to use available AI providers or fall back to basic
              mode if needed.
            </AlertDescription>
          </Alert>

          <Alert className="mb-8 bg-red-900/30 border-red-500/30 max-w-3xl mx-auto">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <AlertDescription className="text-red-400">
              <strong>Important:</strong> This assistant cannot access real-time market data, search the web, or
              retrieve current information. For educational purposes only.
            </AlertDescription>
          </Alert>

          {/* Section to display Deep Infra API test results */}
          {deepInfraTestResult && (
            <div className="max-w-3xl mx-auto mb-6">
              <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-cyan-100">Deep Infra API Connection Test</CardTitle>
                </CardHeader>
                <CardContent>
                  {deepInfraTestResult.success ? (
                    <Alert className="bg-green-900/30 border-green-500/30">
                      <Info className="h-4 w-4 text-green-400" />
                      <AlertDescription className="text-green-400">
                        <strong>Success:</strong> Deep Infra API connection is working.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Alert className="bg-red-900/30 border-red-500/30">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                      <AlertDescription className="text-red-400">
                        <strong>Error:</strong> Deep Infra API connection failed.{" "}
                        {deepInfraTestResult.error && <span>{deepInfraTestResult.error}</span>}
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          <div className="max-w-3xl mx-auto mb-6">
            <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-cyan-100">Select AI Model</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="openai" value={selectedModel} onValueChange={setSelectedModel}>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="openai" id="openai" />
                    <Label htmlFor="openai" className="text-gray-300">
                      OpenAI GPT-4o (Most Advanced)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="deepseek" id="deepseek" />
                    <Label htmlFor="deepseek" className="text-gray-300">
                      DeepSeek Coder (Technical Focus)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="together" id="together" />
                    <Label htmlFor="together" className="text-gray-300">
                      Together AI Mixtral (Balanced)
                    </Label>
                  </div>
                </RadioGroup>
                <p className="text-xs text-gray-400 mt-4">
                  Note: Model availability depends on API keys configured in the system. If a selected model is
                  unavailable, the system will automatically fall back to an available alternative.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-3xl mx-auto">
            <TradeAssistant />
          </div>
          <div className="mt-8 max-w-3xl mx-auto bg-[rgba(26,31,45,0.8)] border border-cyan-500/20 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-cyan-100">About the Trade Assistant</h2>
            <p className="text-gray-300 mb-4">
              The Trade Assistant is powered by advanced AI models and can help you with:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>Trading strategies and concepts</li>
              <li>Technical indicator explanations</li>
              <li>Risk management principles</li>
              <li>Educational content about markets</li>
              <li>General trading terminology and concepts</li>
            </ul>
            <div className="mt-6 bg-red-900/30 border border-red-500/30 p-4 rounded-md">
              <h3 className="text-lg font-bold text-red-400 mb-2">Important Limitations</h3>
              <p className="text-gray-300 mb-2">
                The Trade Assistant has several important limitations you should be aware of:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-300">
                <li>
                  It does <strong>not</strong> have access to real-time market data or current prices
                </li>
                <li>
                  It <strong>cannot</strong> search the web or access external information sources
                </li>
                <li>It has no knowledge of recent market news or events</li>
                <li>Any specific price information or current market analysis it provides will be inaccurate</li>
                <li>It cannot look up or verify information outside of its training data</li>
              </ul>
              <p className="text-gray-300 mt-2">
                Please use this tool for educational purposes only and rely on real-time market data sources for current
                trading information.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
