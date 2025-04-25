import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[#0a0e17]">
      <Loader2 className="h-12 w-12 animate-spin text-cyan-400 mb-4" />
      <p className="text-cyan-100">Redirecting to Dashboard...</p>
    </div>
  )
}
