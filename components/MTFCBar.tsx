import type React from "react"

type MTFCBarProps = {
  mtfc: Record<string, string> | undefined
  strategyType: "short-term" | "long-term"
}

export const MTFCBar: React.FC<MTFCBarProps> = ({ mtfc = {}, strategyType }) => {
  const timeframes = strategyType === "short-term" ? ["5m", "15m", "30m", "1h", "4h"] : ["30m", "1h", "4h", "1d", "1w"]

  return (
    <div className="flex justify-between mb-2 text-xs">
      {timeframes.map((tf) => (
        <div key={tf} className="flex flex-col items-center">
          <div className="w-6 h-6 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-t-sm">{tf}</div>
          <div className="w-6 h-6 flex items-center justify-center rounded-b-sm">
            {mtfc[tf] === "bullish" ? "🟩" : mtfc[tf] === "bearish" ? "🟥" : "⬜"}
          </div>
        </div>
      ))}
    </div>
  )
}
