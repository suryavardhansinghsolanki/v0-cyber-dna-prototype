'use client';

import { Brain, MapPin, Clock, Smartphone } from 'lucide-react';

interface BehaviorProfileProps {
  behavior: {
    normalLocations: string[];
    normalHours: { start: number; end: number };
    averageTransactionAmount: number;
    typicalDevices: string[];
  };
}

export function BehaviorProfile({ behavior }: BehaviorProfileProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
        <Brain className="h-5 w-5 text-primary" />
        Your Digital Twin Profile
      </h2>

      <div className="space-y-4">
        {/* Locations */}
        <div className="rounded-lg bg-secondary/50 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <MapPin className="h-4 w-4" />
            Normal Locations
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {behavior.normalLocations.map((location) => (
              <span key={location} className="rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary">
                {location}
              </span>
            ))}
          </div>
        </div>

        {/* Active Hours */}
        <div className="rounded-lg bg-secondary/50 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <Clock className="h-4 w-4" />
            Active Hours
          </div>
          <p className="mt-3 text-lg font-semibold text-foreground">
            {String(behavior.normalHours.start).padStart(2, '0')}:00 - {String(behavior.normalHours.end).padStart(2, '0')}:00
          </p>
        </div>

        {/* Typical Devices */}
        <div className="rounded-lg bg-secondary/50 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <Smartphone className="h-4 w-4" />
            Typical Devices
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {behavior.typicalDevices.map((device) => (
              <span key={device} className="rounded-full bg-accent/20 px-3 py-1 text-sm font-medium text-accent capitalize">
                {device}
              </span>
            ))}
          </div>
        </div>

        {/* Transaction Info */}
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
          <p className="text-sm text-muted-foreground">Average Transaction Amount</p>
          <p className="mt-2 text-2xl font-bold text-primary">${behavior.averageTransactionAmount}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Transactions above ${behavior.averageTransactionAmount * 2} may trigger alerts
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-accent/10 p-4 border border-accent/20">
        <p className="text-sm text-muted-foreground">
          Your digital twin continuously learns from your behavior patterns and adapts to detect threats in real-time. The profile above represents your typical activity baseline.
        </p>
      </div>
    </div>
  );
}
