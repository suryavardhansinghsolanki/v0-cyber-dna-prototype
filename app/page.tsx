'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DashboardHeader } from '@/components/dashboard-header';
import { AlertsPanel } from '@/components/alerts-panel';
import { BehaviorProfile } from '@/components/behavior-profile';
import { ActivityTimeline } from '@/components/activity-timeline';
import { DemoScenarios } from '@/components/demo-scenarios';
import { StatisticsDashboard } from '@/components/statistics-dashboard';
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

  const simulateAnomalousActivity = async () => {
    const scenario = {
      activity: {
        type: 'login',
        location: 'New York',
        ipAddress: '192.168.1.1',
        details: 'Simulated anomalous login attempt',
      },
    };
    await simulateScenario(scenario);
  };

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

  const simulateScenario = async (scenario: any) => {
    setIsSimulating(true);
    try {
      const newActivity = {
        id: `activity-sim-${Date.now()}`,
        type: scenario.activity.type,
        location: scenario.activity.location,
        ipAddress: scenario.activity.ipAddress,
        timestamp: new Date().toISOString(),
        details: scenario.activity.details,
      };

      const response = await fetch('/api/detect-anomalies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'user-1', activity: newActivity }),
      });

      const result = await response.json();
      console.log('[v0] Anomaly detection result:', result);

      // Reload data after simulating
      setTimeout(() => {
        loadAlerts();
        loadProfile();
        setIsSimulating(false);
      }, 1500);
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
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Alerts Panel */}
            <AlertsPanel alerts={alerts} onDismiss={dismissAlert} />

            {/* Activity Timeline */}
            <ActivityTimeline activities={profile.recentActivities} />

            {/* Demo Scenarios */}
            <DemoScenarios onScenarioTrigger={simulateScenario} isLoading={isSimulating} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Statistics Dashboard */}
            <StatisticsDashboard statistics={profile.statistics} />

            {/* Behavior Profile */}
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
