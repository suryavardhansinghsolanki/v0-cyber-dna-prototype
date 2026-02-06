'use client';

import { AlertCircle, Lock, Shield } from 'lucide-react';

interface DashboardHeaderProps {
  riskLevel: string;
  anomaliesCount: number;
  userName: string;
}

export function DashboardHeader({ riskLevel, anomaliesCount, userName }: DashboardHeaderProps) {
  const riskColor = riskLevel === 'HIGH' ? 'text-red-500' : riskLevel === 'MEDIUM' ? 'text-yellow-500' : 'text-green-500';

  return (
    <div className="border-b border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-primary/10 p-3">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-text-balance">Cyber-DNA</h1>
            <p className="text-sm text-muted-foreground">Your Personal Digital Twin for Cybersecurity</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Welcome, {userName}</p>
          <div className="mt-2 flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${riskColor === 'text-red-500' ? 'bg-red-500' : riskColor === 'text-yellow-500' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
            <span className={`font-semibold ${riskColor}`}>{riskLevel} Risk</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-secondary/50 p-4">
          <p className="text-sm text-muted-foreground">Total Activities</p>
          <p className="mt-2 text-2xl font-bold text-foreground">2,847</p>
        </div>
        <div className="rounded-lg bg-secondary/50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Anomalies Detected</p>
              <p className="mt-2 text-2xl font-bold text-destructive">{anomaliesCount}</p>
            </div>
            <AlertCircle className="h-6 w-6 text-destructive/60" />
          </div>
        </div>
        <div className="rounded-lg bg-secondary/50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Protection Status</p>
              <p className="mt-2 text-2xl font-bold text-accent">Active</p>
            </div>
            <Lock className="h-6 w-6 text-accent/60" />
          </div>
        </div>
      </div>
    </div>
  );
}
