'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DashboardHeader } from '@/components/dashboard-header';
import { AlertsPanel } from '@/components/alerts-panel';
import { BehaviorProfile } from '@/components/behavior-profile';
import { ActivityTimeline } from '@/components/activity-timeline';
import { Zap, Play, Pause } from 'lucide-react';

interface UserProfile {
  user: {
    id: string;
    name: string;
    email: string;
  };
  behavior: {
    normalLocations: string[];
    normalHours: { start: number; end: number };
    averageTransactionAmount: number;
    typicalDevices: string[];
  };
  statistics: {
    totalActivities: number;
    anomaliesDetected: number;
    normalActivities: number;
    suspiciousActivities: number;
    riskLevel: string;
  };
  recentActivities: Array<any>;
  anomalies: Array<any>;
}

export default function Dashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    loadProfile();
    loadAlerts();
    // Auto-refresh every 10 seconds
    const interval = setInterval(() => {
      loadAlerts();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadProfile = async () => {
    try {
      const response = await fetch('/api/user-profile?userId=user-1');
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error('[v0] Failed to load profile:', error);
    }
  };

  const loadAlerts = async () => {
    try {
      const response = await fetch('/api/alerts?userId=user-1');
      const data = await response.json();
      setAlerts(data.alerts);
      setLoading(false);
    } catch (error) {
      console.error('[v0] Failed to load alerts:', error);
    }
  };

  const dismissAlert = async (alertId: string) => {
    try {
      await fetch('/api/alerts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alertId }),
      });
      setAlerts(alerts.filter((a) => a.id !== alertId));
    } catch (error) {
      console.error('[v0] Failed to dismiss alert:', error);
    }
  };

  const simulateAnomalousActivity = async () => {
    setIsSimulating(true);
    try {
      const newActivity = {
        id: `activity-sim-${Date.now()}`,
        type: 'login',
        location: 'Tokyo',
        ipAddress: '202.216.134.1',
        timestamp: new Date().toISOString(),
        details: {
          deviceType: 'unknown',
          url: 'secure-bank-login.com',
        },
      };

      await fetch('/api/detect-anomalies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'user-1', activity: newActivity }),
      });

      // Reload data after simulating
      setTimeout(() => {
        loadAlerts();
        loadProfile();
        setIsSimulating(false);
      }, 1000);
    } catch (error) {
      console.error('[v0] Simulation failed:', error);
      setIsSimulating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin">
            <Zap className="h-12 w-12 text-primary" />
          </div>
          <p className="mt-4 text-muted-foreground">Loading your digital twin...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-destructive">Failed to load profile</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        riskLevel={profile.statistics.riskLevel}
        anomaliesCount={profile.statistics.anomaliesDetected}
        userName={profile.user.name}
      />

      <div className="mx-auto max-w-7xl p-6 space-y-6">
        {/* Demo Controls */}
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Demo Mode</h3>
              <p className="text-sm text-muted-foreground">Simulate an anomalous activity to see the digital twin in action</p>
            </div>
            <Button
              onClick={simulateAnomalousActivity}
              disabled={isSimulating}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              {isSimulating ? (
                <>
                  <Pause className="h-4 w-4 animate-pulse" />
                  Simulating...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Trigger Anomaly
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <AlertsPanel alerts={alerts} onDismiss={dismissAlert} />
            <ActivityTimeline activities={profile.recentActivities} />
          </div>

          <div className="space-y-6">
            <BehaviorProfile behavior={profile.behavior} />
          </div>
        </div>

        {/* Footer Info */}
        <div className="rounded-lg border border-border/50 bg-secondary/20 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Cyber-DNA is constantly monitoring your digital presence across all devices and platforms.
            <br />
            Your privacy is protected with end-to-end encryption.
          </p>
        </div>
      </div>
    </div>
  );
}
