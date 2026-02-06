'use client';

import { AlertTriangle, Zap, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Alert {
  id: string;
  severity: string;
  message: string;
  timestamp: string;
  activity: {
    type: string;
    location: string;
    details: {
      url?: string;
      amount?: number;
    };
  };
  anomalyScore: number;
}

interface AlertsPanelProps {
  alerts: Alert[];
  onDismiss: (alertId: string) => void;
}

export function AlertsPanel({ alerts, onDismiss }: AlertsPanelProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-500/20 border-red-500/50 text-red-400';
      case 'HIGH':
        return 'bg-orange-500/20 border-orange-500/50 text-orange-400';
      case 'MEDIUM':
        return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400';
      default:
        return 'bg-blue-500/20 border-blue-500/50 text-blue-400';
    }
  };

  const getSeverityIcon = (severity: string) => {
    if (severity === 'CRITICAL') return <AlertTriangle className="h-5 w-5" />;
    return <Zap className="h-5 w-5" />;
  };

  if (alerts.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
          <Zap className="h-5 w-5 text-accent" />
          Recent Alerts
        </h2>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-4xl mb-2">✓</div>
          <p className="text-muted-foreground">No suspicious activities detected</p>
          <p className="text-sm text-muted-foreground mt-1">Your digital twin is monitoring 24/7</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
        <AlertTriangle className="h-5 w-5 text-destructive" />
        Recent Alerts ({alerts.length})
      </h2>
      <div className="space-y-3">
        {alerts.slice(0, 5).map((alert) => (
          <div key={alert.id} className={`rounded-lg border p-4 ${getSeverityColor(alert.severity)}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-1 items-start gap-3">
                {getSeverityIcon(alert.severity)}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm">{alert.message}</h3>
                  <p className="text-xs opacity-80 mt-1">
                    {alert.activity.type} detected • Location: {alert.activity.location}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs opacity-70">
                      Risk Score: {(alert.anomalyScore * 100).toFixed(0)}%
                    </span>
                    <span className="text-xs opacity-70">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDismiss(alert.id)}
                className="h-6 w-6 p-0 hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      {alerts.length > 5 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            +{alerts.length - 5} more alerts ({alerts.filter((a) => a.severity === 'CRITICAL').length} critical)
          </p>
        </div>
      )}
    </div>
  );
}
