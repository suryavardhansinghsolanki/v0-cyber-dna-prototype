'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Zap, Shield, AlertTriangle, Activity, TrendingUp, Lock, MapPin, Clock, X, Brain } from 'lucide-react';

// Demo data - no API calls needed
const demoProfile = {
  user: {
    id: 'user-1',
    name: 'Alex Morgan',
    email: 'alex.morgan@example.com',
  },
  behavior: {
    normalLocations: ['San Francisco', 'Home', 'Work'],
    normalHours: { start: 9, end: 18 },
    averageTransactionAmount: 250,
    typicalDevices: ['MacBook Pro', 'iPhone 15', 'iPad Air'],
  },
  statistics: {
    totalActivities: 242,
    anomaliesDetected: 8,
    normalActivities: 234,
    suspiciousActivities: 3,
    riskLevel: 'MEDIUM',
  },
  recentActivities: [
    {
      id: '1',
      type: 'login',
      location: 'San Francisco',
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      anomalyScore: 0.15,
      details: { deviceType: 'MacBook Pro' },
    },
    {
      id: '2',
      type: 'transaction',
      location: 'San Francisco',
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      anomalyScore: 0.22,
      details: { amount: 125.50 },
    },
    {
      id: '3',
      type: 'data_access',
      location: 'Home',
      timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
      anomalyScore: 0.18,
      details: { deviceType: 'iPhone 15' },
    },
  ],
};

const demoAlerts = [
  {
    id: 'alert-1',
    message: 'Unusual login from new device',
    severity: 'HIGH',
    activity: {
      type: 'login',
      location: 'Tokyo',
      ipAddress: '202.216.134.1',
    },
    timestamp: new Date(Date.now() - 2 * 60000).toISOString(),
    anomalyScore: 0.85,
  },
  {
    id: 'alert-2',
    message: 'Large transaction detected',
    severity: 'MEDIUM',
    activity: {
      type: 'transaction',
      location: 'London',
      ipAddress: '185.220.101.1',
    },
    timestamp: new Date(Date.now() - 8 * 60000).toISOString(),
    anomalyScore: 0.65,
  },
  {
    id: 'alert-3',
    message: 'Potential phishing attempt detected',
    severity: 'CRITICAL',
    activity: {
      type: 'email_click',
      location: 'Unknown',
      ipAddress: '203.0.113.45',
    },
    timestamp: new Date(Date.now() - 12 * 60000).toISOString(),
    anomalyScore: 0.92,
  },
];

export default function Dashboard() {
  const [alerts, setAlerts] = useState(demoAlerts);
  const [isSimulating, setIsSimulating] = useState(false);
  const profile = demoProfile;

  const dismissAlert = (alertId: string) => {
    setAlerts(alerts.filter((a) => a.id !== alertId));
  };

  const simulateScenario = async (scenario: any) => {
    setIsSimulating(true);
    const newAlert = {
      id: `alert-sim-${Date.now()}`,
      message: scenario.message,
      severity: scenario.severity,
      activity: scenario.activity,
      timestamp: new Date().toISOString(),
      anomalyScore: scenario.anomalyScore,
    };
    await new Promise((r) => setTimeout(r, 800));
    setAlerts([newAlert, ...alerts]);
    setIsSimulating(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/80">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Cyber-DNA</h1>
                <p className="text-xs text-muted-foreground">Personal Digital Twin</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-secondary/50 border-border/50 p-5 hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Risk Level</p>
                <p className="text-3xl font-bold mt-2 text-orange-500">{profile.statistics.riskLevel}</p>
              </div>
              <AlertTriangle className="w-5 h-5 text-orange-500/60" />
            </div>
          </Card>

          <Card className="bg-secondary/50 border-border/50 p-5 hover:border-accent/30 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Anomalies</p>
                <p className="text-3xl font-bold mt-2 text-primary">{profile.statistics.anomaliesDetected}</p>
              </div>
              <Activity className="w-5 h-5 text-primary/60" />
            </div>
          </Card>

          <Card className="bg-secondary/50 border-border/50 p-5 hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Activities</p>
                <p className="text-3xl font-bold mt-2 text-cyan-400">{profile.statistics.totalActivities}</p>
              </div>
              <TrendingUp className="w-5 h-5 text-cyan-400/60" />
            </div>
          </Card>

          <Card className="bg-secondary/50 border-border/50 p-5 hover:border-accent/30 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Protected</p>
                <p className="text-3xl font-bold mt-2 text-green-500">{profile.statistics.normalActivities}</p>
              </div>
              <Lock className="w-5 h-5 text-green-500/60" />
            </div>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Alerts and Timeline */}
          <div className="lg:col-span-2 space-y-6">
            {/* Alerts Panel */}
            <div className="rounded-xl border border-border/50 bg-gradient-to-br from-secondary/50 to-secondary/20 p-6 backdrop-blur-sm">
              <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Security Alerts ({alerts.length})
              </h2>
              {alerts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                    <span className="text-3xl text-green-500">✓</span>
                  </div>
                  <p className="text-foreground font-medium">All Systems Secure</p>
                  <p className="text-sm text-muted-foreground mt-2">No suspicious activities detected</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {alerts.slice(0, 5).map((alert) => (
                    <div
                      key={alert.id}
                      className={`rounded-lg border p-4 transition-all hover:border-foreground/30 ${
                        alert.severity === 'CRITICAL'
                          ? 'border-destructive/50 bg-destructive/10'
                          : alert.severity === 'HIGH'
                            ? 'border-orange-500/50 bg-orange-500/10'
                            : alert.severity === 'MEDIUM'
                              ? 'border-yellow-500/50 bg-yellow-500/10'
                              : 'border-blue-500/50 bg-blue-500/10'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex flex-1 items-start gap-3">
                          <div
                            className={`mt-0.5 h-2 w-2 rounded-full ${
                              alert.severity === 'CRITICAL'
                                ? 'bg-destructive'
                                : alert.severity === 'HIGH'
                                  ? 'bg-orange-500'
                                  : alert.severity === 'MEDIUM'
                                    ? 'bg-yellow-500'
                                    : 'bg-blue-500'
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm">{alert.message}</h3>
                            <p className="text-xs opacity-80 mt-1.5">
                              {alert.activity.type} • {alert.activity.location}
                            </p>
                            <div className="flex items-center gap-4 mt-3">
                              <span className="text-xs opacity-70">Risk: {(alert.anomalyScore * 100).toFixed(0)}%</span>
                              <span className="text-xs opacity-70">
                                {new Date(alert.timestamp).toLocaleTimeString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => dismissAlert(alert.id)}
                          className="h-6 w-6 p-0 hover:bg-white/10 transition-colors rounded"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Activity Timeline */}
            <div className="rounded-xl border border-border/50 bg-gradient-to-br from-secondary/50 to-secondary/20 p-6 backdrop-blur-sm">
              <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold">
                <Activity className="h-5 w-5 text-primary" />
                Recent Activities
              </h2>
              <div className="space-y-2">
                {profile.recentActivities.map((activity) => (
                  <div key={activity.id} className="rounded-lg border-l-4 border-l-primary p-4 bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-1 items-start gap-3">
                        <span className="text-xl">
                          {activity.type === 'login'
                            ? '🔐'
                            : activity.type === 'transaction'
                              ? '💳'
                              : '📊'}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm capitalize">{activity.type}</h3>
                          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {activity.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {new Date(activity.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Risk</p>
                        <p className="text-sm font-semibold">{(activity.anomalyScore * 100).toFixed(0)}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Demo Scenarios */}
            <div className="rounded-xl border border-border/50 bg-gradient-to-br from-secondary/50 to-secondary/20 p-6 backdrop-blur-sm">
              <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold">
                <Zap className="h-5 w-5 text-primary" />
                Threat Scenarios
              </h2>
              <div className="grid gap-3">
                {[
                  {
                    name: 'Unusual Login',
                    description: 'Login from Tokyo at unexpected time',
                    severity: 'HIGH',
                    anomalyScore: 0.85,
                    message: 'Unusual login from new device in Tokyo',
                    activity: { type: 'login', location: 'Tokyo', ipAddress: '202.216.134.1' },
                  },
                  {
                    name: 'Large Transaction',
                    description: 'Transaction amount 3x normal',
                    severity: 'MEDIUM',
                    anomalyScore: 0.72,
                    message: 'Large transaction amount detected',
                    activity: { type: 'transaction', location: 'London', ipAddress: '185.220.101.1' },
                  },
                  {
                    name: 'Phishing Attempt',
                    description: 'Suspicious email link clicked',
                    severity: 'CRITICAL',
                    anomalyScore: 0.95,
                    message: 'Potential phishing attempt detected',
                    activity: { type: 'email', location: 'Unknown', ipAddress: '203.0.113.45' },
                  },
                  {
                    name: 'Data Access Anomaly',
                    description: 'Accessing sensitive files at night',
                    severity: 'HIGH',
                    anomalyScore: 0.88,
                    message: 'Unusual data access pattern detected',
                    activity: { type: 'data_access', location: 'Remote', ipAddress: '198.51.100.1' },
                  },
                ].map((scenario, idx) => (
                  <button
                    key={idx}
                    onClick={() => simulateScenario(scenario)}
                    disabled={isSimulating}
                    className="text-left p-4 rounded-lg border border-border/50 bg-secondary/30 hover:bg-secondary/60 transition-all disabled:opacity-50 group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{scenario.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{scenario.description}</p>
                      </div>
                      <Button
                        size="sm"
                        disabled={isSimulating}
                        className="gap-1 bg-primary hover:bg-primary/90"
                      >
                        {isSimulating ? '...' : 'Trigger'}
                      </Button>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Statistics */}
            <div className="rounded-xl border border-border/50 bg-gradient-to-br from-secondary/50 to-secondary/20 p-6 backdrop-blur-sm">
              <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold">
                <TrendingUp className="h-5 w-5 text-primary" />
                Security Stats
              </h2>
              <div className="space-y-4">
                <div className="rounded-lg bg-primary/15 p-5 border border-primary/30">
                  <p className="text-sm text-muted-foreground font-medium mb-2">Protection Score</p>
                  <div className="flex items-end gap-4">
                    <div className="text-4xl font-bold text-primary">92%</div>
                    <div className="flex-1">
                      <div className="w-full bg-secondary/50 rounded-full h-2.5">
                        <div className="bg-gradient-to-r from-primary to-accent h-2.5 rounded-full w-11/12" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-muted-foreground text-xs">Threats Blocked</p>
                    <p className="text-xl font-bold text-green-500">12</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-muted-foreground text-xs">Monitoring Uptime</p>
                    <p className="text-xl font-bold text-cyan-400">99.9%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Digital Twin Profile */}
            <div className="rounded-xl border border-border/50 bg-gradient-to-br from-secondary/50 to-secondary/20 p-6 backdrop-blur-sm">
              <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold">
                <Brain className="h-5 w-5 text-primary" />
                Digital Twin
              </h2>
              <div className="space-y-4">
                <div className="rounded-lg bg-secondary/50 border border-border/30 p-4 hover:border-primary/30 transition-colors">
                  <p className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4" />
                    Normal Locations
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {profile.behavior.normalLocations.map((loc) => (
                      <span key={loc} className="rounded-full bg-primary/20 px-3 py-1.5 text-xs font-medium text-primary">
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg bg-secondary/50 border border-border/30 p-4 hover:border-accent/30 transition-colors">
                  <p className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-3">
                    <Clock className="h-4 w-4" />
                    Active Hours
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {String(profile.behavior.normalHours.start).padStart(2, '0')}:00 - {String(profile.behavior.normalHours.end).padStart(2, '0')}:00
                  </p>
                </div>

                <div className="rounded-lg bg-secondary/50 border border-border/30 p-4 hover:border-primary/30 transition-colors">
                  <p className="text-sm font-semibold text-muted-foreground mb-3">Trusted Devices</p>
                  <div className="space-y-2">
                    {profile.behavior.typicalDevices.map((device) => (
                      <div key={device} className="flex items-center justify-between p-2 bg-secondary/50 rounded">
                        <span className="text-sm text-foreground">{device}</span>
                        <span className="text-xs text-green-500">✓ Verified</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10 p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground">Cyber-DNA Protection Active</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Your digital twin monitors all activities 24/7 across all devices and platforms with end-to-end encryption.
          </p>
        </div>
      </div>
    </div>
  );
}
