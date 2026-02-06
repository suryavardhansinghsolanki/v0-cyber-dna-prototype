'use client';

import { Activity, AlertCircle, CheckCircle, MapPin, Clock } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: string;
  location: string;
  timestamp: string;
  details: {
    url?: string;
    amount?: number;
    deviceType?: string;
  };
  anomalyScore: number;
  isAnomaly?: boolean;
}

interface ActivityTimelineProps {
  activities: ActivityItem[];
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login':
        return '🔐';
      case 'browse':
        return '🌐';
      case 'purchase':
        return '💳';
      default:
        return '📱';
    }
  };

  const getActivityColor = (anomalyScore: number) => {
    if (anomalyScore > 0.7) return 'border-l-red-500 bg-red-500/5';
    if (anomalyScore > 0.4) return 'border-l-yellow-500 bg-yellow-500/5';
    return 'border-l-green-500 bg-green-500/5';
  };

  const getStatusIcon = (anomalyScore: number) => {
    if (anomalyScore > 0.7) return <AlertCircle className="h-5 w-5 text-red-500" />;
    return <CheckCircle className="h-5 w-5 text-green-500" />;
  };

  const recentActivities = activities.slice(0, 8);

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
        <Activity className="h-5 w-5 text-primary" />
        Recent Activity
      </h2>

      <div className="space-y-3">
        {recentActivities.map((activity) => (
          <div key={activity.id} className={`rounded-lg border-l-4 p-4 ${getActivityColor(activity.anomalyScore)}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-1 items-start gap-3">
                <span className="text-2xl">{getActivityIcon(activity.type)}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm capitalize">{activity.type}</h3>
                    {activity.anomalyScore > 0.7 && (
                      <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-xs font-medium text-red-400">
                        Suspicious
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {activity.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </span>
                    {activity.details.amount && (
                      <span className="font-medium text-foreground">${activity.details.amount}</span>
                    )}
                    {activity.details.deviceType && (
                      <span className="capitalize">{activity.details.deviceType}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Risk</p>
                  <p className="text-sm font-semibold text-foreground">{(activity.anomalyScore * 100).toFixed(0)}%</p>
                </div>
                {getStatusIcon(activity.anomalyScore)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {activities.length > 8 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Showing 8 of {activities.length} recent activities
          </p>
        </div>
      )}
    </div>
  );
}
