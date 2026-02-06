'use client';

import React from "react"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, Play, Zap, ShieldAlert } from 'lucide-react';

interface DemoScenario {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  activity: {
    type: string;
    location: string;
    ipAddress: string;
    details: {
      deviceType: string;
      url?: string;
      amount?: number;
    };
  };
}

interface DemoScenariosProps {
  onScenarioTrigger: (scenario: DemoScenario) => Promise<void>;
  isLoading: boolean;
}

export function DemoScenarios({ onScenarioTrigger, isLoading }: DemoScenariosProps) {
  const scenarios: DemoScenario[] = [
    {
      id: 'foreign-login',
      name: 'Unusual Location Login',
      description: 'Login detected from Tokyo at 3 AM (unusual time + location)',
      icon: <AlertCircle className="h-4 w-4" />,
      activity: {
        type: 'login',
        location: 'Tokyo',
        ipAddress: '202.216.134.1',
        details: {
          deviceType: 'mobile',
          url: 'bank-secure-login.com',
        },
      },
    },
    {
      id: 'phishing',
      name: 'Phishing Attempt',
      description: 'Suspicious link with phishing domain detected',
      icon: <ShieldAlert className="h-4 w-4" />,
      activity: {
        type: 'browse',
        location: 'Unknown',
        ipAddress: '185.220.101.45',
        details: {
          deviceType: 'desktop',
          url: 'phishing-secure-amazon-login.com',
        },
      },
    },
    {
      id: 'large-purchase',
      name: 'Unusual Purchase Amount',
      description: 'Transaction 5x larger than typical spending pattern',
      icon: <Zap className="h-4 w-4" />,
      activity: {
        type: 'purchase',
        location: 'New York',
        ipAddress: '185.175.219.32',
        details: {
          deviceType: 'mobile',
          amount: 25000,
        },
      },
    },
    {
      id: 'bulk-data-access',
      name: 'Suspicious Data Access',
      description: 'Rapid API calls from unfamiliar IP address',
      icon: <AlertCircle className="h-4 w-4" />,
      activity: {
        type: 'api-access',
        location: 'Moscow',
        ipAddress: '212.192.246.164',
        details: {
          deviceType: 'automated',
        },
      },
    },
  ];

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Demo Scenarios
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          Trigger realistic threat scenarios to see how Cyber-DNA detects and responds to anomalies
        </p>
      </div>

      <div className="grid gap-3">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => onScenarioTrigger(scenario)}
            disabled={isLoading}
            className="text-left p-4 rounded-lg border border-border/50 bg-secondary/30 hover:border-primary/50 hover:bg-secondary/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-1 text-primary group-hover:scale-110 transition-transform">{scenario.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-foreground">{scenario.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{scenario.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-xs bg-secondary/60 px-2.5 py-1 rounded-md border border-border/30">
                      {scenario.activity.location}
                    </span>
                    <span className="text-xs bg-secondary/60 px-2.5 py-1 rounded-md border border-border/30 font-mono">
                      {scenario.activity.ipAddress}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onScenarioTrigger(scenario);
                }}
                disabled={isLoading}
                className="gap-1 bg-primary hover:bg-primary/90"
              >
                <Play className="h-3 w-3" />
                Trigger
              </Button>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/30">
        <p className="text-xs text-muted-foreground">
          Trigger scenarios to see Cyber-DNA detect threats in real-time. Watch the alerts panel update instantly as threats are analyzed.
        </p>
      </div>
    </div>
  );
}
