'use client';

import { Card } from '@/components/ui/card';

export function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/80">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary animate-pulse" />
              <div>
                <div className="h-6 w-40 rounded bg-secondary animate-pulse" />
                <div className="h-3 w-32 rounded bg-secondary animate-pulse mt-1" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-8 w-24 rounded-full bg-secondary animate-pulse" />
              <div className="text-right">
                <div className="h-4 w-32 rounded bg-secondary animate-pulse" />
                <div className="h-3 w-40 rounded bg-secondary animate-pulse mt-1" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards Skeleton */}
      <div className="mx-auto max-w-7xl p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="bg-secondary/50 border-border/50 p-5">
              <div className="h-10 w-20 rounded bg-secondary animate-pulse" />
              <div className="h-8 w-16 rounded bg-secondary animate-pulse mt-3" />
            </Card>
          ))}
        </div>

        {/* Main Grid Skeleton */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Alerts Panel Skeleton */}
            <div className="rounded-xl border border-border/50 bg-gradient-to-br from-secondary/50 to-secondary/20 p-6">
              <div className="h-6 w-32 rounded bg-secondary animate-pulse mb-6" />
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="rounded-lg border border-border/50 p-4 bg-secondary/30">
                    <div className="h-4 w-48 rounded bg-secondary animate-pulse mb-2" />
                    <div className="h-3 w-40 rounded bg-secondary animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Timeline Skeleton */}
            <div className="rounded-xl border border-border/50 bg-gradient-to-br from-secondary/50 to-secondary/20 p-6">
              <div className="h-6 w-32 rounded bg-secondary animate-pulse mb-6" />
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="rounded-lg border border-border/50 p-4 bg-secondary/30">
                    <div className="h-4 w-40 rounded bg-secondary animate-pulse mb-2" />
                    <div className="h-3 w-52 rounded bg-secondary animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-6">
            {/* Stats Skeleton */}
            <div className="rounded-xl border border-border/50 bg-gradient-to-br from-secondary/50 to-secondary/20 p-6">
              <div className="h-6 w-32 rounded bg-secondary animate-pulse mb-6" />
              <div className="h-16 w-full rounded bg-secondary animate-pulse mb-4" />
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-4 w-48 rounded bg-secondary animate-pulse" />
                ))}
              </div>
            </div>

            {/* Profile Skeleton */}
            <div className="rounded-xl border border-border/50 bg-gradient-to-br from-secondary/50 to-secondary/20 p-6">
              <div className="h-6 w-32 rounded bg-secondary animate-pulse mb-6" />
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="rounded-lg bg-secondary/50 p-4">
                    <div className="h-4 w-28 rounded bg-secondary animate-pulse mb-2" />
                    <div className="h-8 w-40 rounded bg-secondary animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent animate-spin mb-4">
          <div className="w-12 h-12 rounded-full bg-background" />
        </div>
        <p className="text-lg font-medium text-foreground mt-4">Initializing Cyber-DNA</p>
        <p className="text-sm text-muted-foreground mt-1">Loading your digital twin...</p>
      </div>
    </div>
  );
}
