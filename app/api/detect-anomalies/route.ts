import fs from 'fs/promises';
import path from 'path';

interface Activity {
  id: string;
  userId: string;
  type: string;
  location: string;
  ipAddress: string;
  timestamp: string;
  details: {
    url?: string;
    amount?: number;
    deviceType?: string;
  };
  anomalyScore?: number;
  isAnomaly?: boolean;
}

interface Behavior {
  normalLocations: string[];
  normalHours: { start: number; end: number };
  averageTransactionAmount: number;
  typicalDevices: string[];
}

function calculateAnomalyScore(activity: Activity, behavior: Behavior): number {
  let score = 0;

  // Location anomaly
  if (!behavior.normalLocations.includes(activity.location)) {
    score += 0.3;
  }

  // Time anomaly
  const hour = new Date(activity.timestamp).getHours();
  if (hour < behavior.normalHours.start || hour > behavior.normalHours.end) {
    score += 0.25;
  }

  // Transaction anomaly
  if (activity.details.amount && activity.details.amount > behavior.averageTransactionAmount * 2) {
    score += 0.2;
  }

  // Device anomaly
  if (activity.details.deviceType && !behavior.typicalDevices.includes(activity.details.deviceType)) {
    score += 0.15;
  }

  // URL pattern (suspicious domains)
  if (activity.details.url && activity.details.url.includes('phishing')) {
    score += 0.4;
  }

  return Math.min(score, 1);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, activity } = body;

    const dataFile = path.join(process.cwd(), 'data', 'cyber-dna.json');
    const data = JSON.parse(await fs.readFile(dataFile, 'utf-8'));

    const behavior = data.behaviors[userId];
    if (!behavior) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    const anomalyScore = calculateAnomalyScore(activity, behavior);
    const isAnomaly = anomalyScore > 0.6;

    // Create alert if anomaly detected
    if (isAnomaly) {
      const alert = {
        id: `alert-${Date.now()}`,
        userId,
        activityId: activity.id,
        type: 'ANOMALY_DETECTED',
        severity: anomalyScore > 0.85 ? 'CRITICAL' : anomalyScore > 0.7 ? 'HIGH' : 'MEDIUM',
        message: `Suspicious activity detected: ${activity.type} from ${activity.location}`,
        timestamp: new Date().toISOString(),
        activity,
        anomalyScore,
      };

      data.alerts.push(alert);

      // Save updated data
      await fs.writeFile(dataFile, JSON.stringify(data, null, 2));

      return Response.json({
        isAnomaly: true,
        anomalyScore,
        alert,
        action: anomalyScore > 0.85 ? 'BLOCK' : 'WARN',
      });
    }

    return Response.json({
      isAnomaly: false,
      anomalyScore,
      message: 'Activity appears normal',
    });
  } catch (error) {
    return Response.json({ error: 'Failed to detect anomalies' }, { status: 500 });
  }
}
