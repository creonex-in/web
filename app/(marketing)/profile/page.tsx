"use client";
import { useGetMe } from "@/hooks/use-user";

export default function ProfilePage() {
  const { data: user, isLoading, isError, error } = useGetMe();

  return (
    <div className="section min-h-[60vh] flex flex-col items-center justify-center bg-background py-20">
      <div className="container-inner max-w-2xl bg-card border border-border rounded-[20px] p-8 md:p-12 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight mb-6 text-foreground text-center">
          Test Profile Page
        </h1>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="w-6 h-6 rounded-full border-2 border-brand border-t-transparent animate-spin" />
          </div>
        )}

        {isError && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <span className="text-sm font-medium text-muted-foreground">Status</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/50">
                Error
              </span>
            </div>
            <pre className="bg-muted p-5 rounded-xl text-xs font-mono text-charcoal overflow-x-auto border border-border">
              {error.status} — {error.message}
            </pre>
          </div>
        )}

        {!isLoading && !isError && user && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <span className="text-sm font-medium text-muted-foreground">Status</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50">
                Logged In
              </span>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">User Data (useGetMe):</label>
              <pre className="bg-muted p-5 rounded-xl text-xs font-mono text-charcoal overflow-x-auto whitespace-pre-wrap break-all border border-border">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {!isLoading && !isError && !user && (
          <div className="space-y-6 text-center">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <span className="text-sm font-medium text-muted-foreground">Status</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50">
                Not Logged In
              </span>
            </div>
            <p className="text-sm text-muted-foreground py-4">
              Please log in to view your profile data.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
