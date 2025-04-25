"use client"

import { useState } from "react"
import Link from "next/link"
import { TrendingUp, Save, Key } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export default function AIModelsPage() {
  const [openaiKey, setOpenaiKey] = useState("")
  const [deepseekKey, setDeepseekKey] = useState("")
  const [togetherKey, setTogetherKey] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // In a real app, you would save these to a secure backend
      // For this demo, we'll just show a success message
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "API Keys Saved",
        description: "Your AI model API keys have been saved successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save API keys. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

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
          <Link className="text-sm font-medium text-gray-200 hover:text-blue-400 transition-colors" href="/dashboard">
            Dashboard
          </Link>
          <Link className="text-sm font-medium text-gray-200 hover:text-blue-400 transition-colors" href="/settings">
            Settings
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">AI Model Settings</h1>

          <div className="max-w-2xl mx-auto">
            <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-cyan-100 flex items-center">
                  <Key className="mr-2 h-5 w-5" />
                  AI Model API Keys
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Configure API keys for different AI models to enhance your Trade Assistant
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="openai" className="text-gray-300">
                    OpenAI API Key
                  </Label>
                  <Input
                    id="openai"
                    type="password"
                    placeholder="sk-..."
                    value={openaiKey}
                    onChange={(e) => setOpenaiKey(e.target.value)}
                    className="bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-white"
                  />
                  <p className="text-xs text-gray-400">
                    For GPT-4o and other OpenAI models. Get your API key from{" "}
                    <a
                      href="https://platform.openai.com/api-keys"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:underline"
                    >
                      OpenAI
                    </a>
                    .
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deepseek" className="text-gray-300">
                    DeepSeek API Key
                  </Label>
                  <Input
                    id="deepseek"
                    type="password"
                    placeholder="dsk-..."
                    value={deepseekKey}
                    onChange={(e) => setDeepseekKey(e.target.value)}
                    className="bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-white"
                  />
                  <p className="text-xs text-gray-400">
                    For DeepSeek Coder and other DeepSeek models. Get your API key from DeepSeek's website.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="together" className="text-gray-300">
                    Together AI API Key
                  </Label>
                  <Input
                    id="together"
                    type="password"
                    placeholder="tog-..."
                    value={togetherKey}
                    onChange={(e) => setTogetherKey(e.target.value)}
                    className="bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-white"
                  />
                  <p className="text-xs text-gray-400">
                    For Mixtral and other Together AI models. Get your API key from{" "}
                    <a
                      href="https://api.together.xyz/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:underline"
                    >
                      Together AI
                    </a>
                    .
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isSaving} className="w-full bg-cyan-600 hover:bg-cyan-700">
                  {isSaving ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save API Keys
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <div className="mt-6 bg-[rgba(26,31,45,0.8)] border-cyan-500/20 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-cyan-100 mb-2">About AI Models</h3>
              <p className="text-gray-300 mb-4">Each AI model has different strengths and capabilities:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>
                  <strong className="text-cyan-400">OpenAI GPT-4o:</strong> The most advanced model with excellent
                  reasoning and knowledge about trading concepts.
                </li>
                <li>
                  <strong className="text-cyan-400">DeepSeek Coder:</strong> Specialized in technical explanations and
                  code examples for trading algorithms.
                </li>
                <li>
                  <strong className="text-cyan-400">Together AI Mixtral:</strong> A balanced model with good performance
                  across various trading topics.
                </li>
              </ul>
              <p className="text-gray-300 mt-4">
                The system will automatically use the best available model based on your configured API keys.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
