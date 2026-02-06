'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertsPanel } from '@/components/alerts-panel';
import { BehaviorProfile } from '@/components/behavior-profile';
import { ActivityTimeline } from '@/components/activity-timeline';
import { DemoScenarios } from '@/components/demo-scenarios';
import { StatisticsDashboard } from '@/components/statistics-dashboard';
import { DashboardHeader } from '@/components/dashboard-header'; // Added import { BadgeAlert as boardHeader } from 'lucide-react';
import { Zap, Shield, AlertTriangle, Activity, TrendingUp, Lock } from 'lucide-react';

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
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/80">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Cyber-DNA</h1>
                <p className="text-xs text-muted-foreground">Your Personal Digital Twin</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50">
                <div className="w-2 h-2 rounded-full bg-chart-2 animate-pulse" />
                <span className="text-sm font-medium">Active</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{profile.user.name}</p>
                <p className="text-xs text-muted-foreground">{profile.user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl p-6 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-secondary/50 border-border/50 p-5 hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Risk Level</p>
                <p className="text-3xl font-bold mt-2">
                  <span className={profile.statistics.riskLevel === 'CRITICAL' ? 'text-destructive' : profile.statistics.riskLevel === 'HIGH' ? 'text-orange-500' : 'text-chart-2'}>
                    {profile.statistics.riskLevel}
                  </span>
                </p>
              </div>
              <AlertTriangle className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>

          <Card className="bg-secondary/50 border-border/50 p-5 hover:border-accent/30 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Anomalies</p>
                <p className="text-3xl font-bold mt-2 text-primary">{profile.statistics.anomaliesDetected}</p>
              </div>
              <Activity className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>

          <Card className="bg-secondary/50 border-border/50 p-5 hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Total Activities</p>
                <p className="text-3xl font-bold mt-2 text-chart-2">{profile.statistics.totalActivities}</p>
              </div>
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>

          <Card className="bg-secondary/50 border-border/50 p-5 hover:border-accent/30 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Protected</p>
                <p className="text-3xl font-bold mt-2 text-green-500">{profile.statistics.normalActivities}</p>
              </div>
              <Lock className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <AlertsPanel alerts={alerts} onDismiss={dismissAlert} />
            <ActivityTimeline activities={profile.recentActivities} />
            <DemoScenarios onScenarioTrigger={simulateScenario} isLoading={isSimulating} />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <StatisticsDashboard statistics={profile.statistics} />
            <BehaviorProfile behavior={profile.behavior} />
          </div>
        </div>

        {/* Footer */}
        <div className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10 p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground">Cyber-DNA Protection Active</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Your digital twin is monitoring all activities in real-time across all devices and platforms.
            <br />
            End-to-end encryption secures all your data.
          </p>
        </div>
      </div>
    </div>
  );
}
