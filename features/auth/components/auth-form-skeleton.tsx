import { Skeleton } from "@/components/ui/skeleton"

export function AuthFormSkeleton(): React.ReactElement {
  return (
    <div className="w-full max-w-[27rem] space-y-6">
      <div className="space-y-2 text-center">
        <Skeleton className="mx-auto h-7 w-40" />
        <Skeleton className="mx-auto h-4 w-56" />
      </div>

      <div className="space-y-3">
        <Skeleton className="h-11 w-full rounded-lg" />
        <Skeleton className="h-11 w-full rounded-lg" />
      </div>

      <div className="flex items-center gap-3">
        <Skeleton className="h-px flex-1" />
        <Skeleton className="h-3 w-6" />
        <Skeleton className="h-px flex-1" />
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Skeleton className="h-3.5 w-20" />
          <Skeleton className="h-11 w-full rounded-lg" />
        </div>
        <div className="space-y-1.5">
          <Skeleton className="h-3.5 w-20" />
          <Skeleton className="h-11 w-full rounded-lg" />
        </div>
      </div>

      <Skeleton className="h-11 w-full rounded-lg" />
    </div>
  )
}
