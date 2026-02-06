'use client';

import { TrendingUp, ShieldCheck, AlertCircle } from 'lucide-react';

interface StatisticsDashboardProps {
  statistics: {
    totalActivities: number;
    anomaliesDetected: number;
    normalActivities: number;
    suspiciousActivities: number;
    riskLevel: string;
  };
}

export function StatisticsDashboard({ statistics }: StatisticsDashboardProps) {
  const threatBlockedRate = statistics.totalActivities > 0
    ? Math.round((statistics.anomaliesDetected / statistics.totalActivities) * 100)
    : 0;

  const protectionScore = Math.max(0, 100 - threatBlockedRate * 2);

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold">
        <TrendingUp className="h-5 w-5 text-primary" />
        Security Statistics
      </h2>

      <div className="grid gap-4 mb-6">
        {/* Protection Score */}
        <div className="rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 p-4 border border-primary/30">
          <p className="text-sm text-muted-foreground">Protection Score</p>
          <div className="mt-3 flex items-end gap-4">
            <div className="text-4xl font-bold text-primary">{protectionScore}%</div>
            <div className="flex-1">
              <div className="w-full bg-secondary/50 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${protectionScore}%` }}
                />
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {protectionScore > 80
              ? 'Excellent protection level'
              : protectionScore > 60
                ? 'Good protection level'
                : 'Monitor activity closely'}
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-secondary/50 p-4">
            <p className="text-xs text-muted-foreground">Total Activities</p>
            <p className="mt-2 text-2xl font-bold text-foreground">{statistics.totalActivities}</p>
            <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
          </div>

          <div className="rounded-lg bg-secondary/50 p-4">
            <p className="text-xs text-muted-foreground">Normal Activities</p>
            <p className="mt-2 text-2xl font-bold text-green-500">{statistics.normalActivities}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {statistics.totalActivities > 0
                ? Math.round((statistics.normalActivities / statistics.totalActivities) * 100)
                : 0}
              % of total
            </p>
          </div>

          <div className="rounded-lg bg-secondary/50 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Anomalies Detected</p>
                <p className="mt-2 text-2xl font-bold text-orange-500">{statistics.anomaliesDetected}</p>
                <p className="text-xs text-muted-foreground mt-1">{threatBlockedRate}% of activities</p>
              </div>
              <AlertCircle className="h-5 w-5 text-orange-500 opacity-50" />
            </div>
          </div>

          <div className="rounded-lg bg-secondary/50 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Suspicious Activities</p>
                <p className="mt-2 text-2xl font-bold text-red-500">{statistics.suspiciousActivities}</p>
                <p className="text-xs text-muted-foreground mt-1">High-risk items</p>
              </div>
              <ShieldCheck className="h-5 w-5 text-red-500 opacity-50" />
            </div>
          </div>
        </div>
      </div>

      {/* Activity Health */}
      <div className="rounded-lg border border-border/50 p-4 bg-secondary/20">
        <h3 className="text-sm font-semibold mb-3">Activity Health Check</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Normal Activity Rate</span>
            <span className="font-semibold">
              {statistics.totalActivities > 0
                ? ((statistics.normalActivities / statistics.totalActivities) * 100).toFixed(1)
                : 0}
              %
            </span>
          </div>
          <div className="w-full bg-secondary/50 rounded-full h-1.5">
            <div
              className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
              style={{
                width: `${
                  statistics.totalActivities > 0
                    ? (statistics.normalActivities / statistics.totalActivities) * 100
                    : 0
                }%`,
              }}
            />
          </div>

          <div className="flex items-center justify-between text-xs mt-3">
            <span className="text-muted-foreground">Anomaly Rate</span>
            <span className="font-semibold">{threatBlockedRate}%</span>
          </div>
          <div className="w-full bg-secondary/50 rounded-full h-1.5">
            <div
              className="bg-orange-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${threatBlockedRate}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
