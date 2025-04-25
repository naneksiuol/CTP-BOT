import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col space-y-4">
        <Skeleton className="h-8 w-64 bg-slate-700/50" />

        <div className="rounded-lg border border-slate-700/50 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Skeleton className="h-10 w-full md:w-1/4 bg-slate-700/50" />
            <Skeleton className="h-10 w-full md:w-1/4 bg-slate-700/50" />
            <Skeleton className="h-10 w-full md:w-1/4 bg-slate-700/50" />
            <Skeleton className="h-10 w-full md:w-1/4 bg-slate-700/50" />
          </div>
        </div>

        <div className="rounded-lg border border-slate-700/50 overflow-hidden">
          <div className="bg-slate-800/70 p-3">
            <div className="grid grid-cols-8 gap-4">
              <Skeleton className="h-4 w-full bg-slate-700/50" />
              <Skeleton className="h-4 w-full bg-slate-700/50" />
              <Skeleton className="h-4 w-full bg-slate-700/50" />
              <Skeleton className="h-4 w-full bg-slate-700/50" />
              <Skeleton className="h-4 w-full bg-slate-700/50" />
              <Skeleton className="h-4 w-full bg-slate-700/50" />
              <Skeleton className="h-4 w-full bg-slate-700/50" />
              <Skeleton className="h-4 w-full bg-slate-700/50" />
            </div>
          </div>
          <div className="divide-y divide-slate-700/30">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="bg-slate-800/20 p-3">
                <div className="grid grid-cols-8 gap-4">
                  <Skeleton className="h-4 w-full bg-slate-700/50" />
                  <Skeleton className="h-4 w-full bg-slate-700/50" />
                  <Skeleton className="h-4 w-full bg-slate-700/50" />
                  <Skeleton className="h-4 w-full bg-slate-700/50" />
                  <Skeleton className="h-4 w-full bg-slate-700/50" />
                  <Skeleton className="h-4 w-full bg-slate-700/50" />
                  <Skeleton className="h-4 w-full bg-slate-700/50" />
                  <Skeleton className="h-4 w-full bg-slate-700/50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
