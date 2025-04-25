"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator } from "lucide-react"

export function ExecutionWorkflowTab() {
  return (
    <div className="space-y-8">
      <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-100 flex items-center">
            <Calculator className="mr-2 h-5 w-5 text-cyan-400" />
            Execution Workflow
          </CardTitle>
          <CardDescription className="text-gray-300">
            Step-by-step process for implementing CEM-based trading strategies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-[rgba(10,14,23,0.5)] p-4 rounded-md">
              <h3 className="text-cyan-100 font-medium mb-3">Example Workflow: AAPL Trading at $180</h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3">
                    <span className="text-cyan-400 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="text-cyan-400 text-sm font-medium mb-1">Input Parameters</h4>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-gray-300">
                      <li>AAPL trading at $180</li>
                      <li>45 days to expiration (DTE)</li>
                      <li>AI-Implied Volatility (AIV) = 22%</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3">
                    <span className="text-cyan-400 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="text-cyan-400 text-sm font-medium mb-1">CEM Calculation</h4>
                    <div className="bg-[rgba(26,31,45,0.8)] p-3 rounded-md font-mono text-xs text-cyan-300">
                      180 × 0.22 × √(45/365) ≈ ±$13.20 → $166.80 to $193.20
                    </div>
                    <p className="text-xs text-gray-300 mt-1"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
