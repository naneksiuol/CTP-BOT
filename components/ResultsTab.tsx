"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SavedPredictions } from "@/components/SavedPredictions"

export function ResultsTab() {
  const [selectedTerm, setSelectedTerm] = useState<"short-term" | "long-term">("short-term")

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={selectedTerm} onValueChange={(value: "short-term" | "long-term") => setSelectedTerm(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select term" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="short-term">Short-Term</SelectItem>
            <SelectItem value="long-term">Long-Term</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <SavedPredictions strategyType={selectedTerm} />
    </div>
  )
}
