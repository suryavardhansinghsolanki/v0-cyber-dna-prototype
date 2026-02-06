import fs from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'user-1';

    const dataFile = path.join(process.cwd(), 'data', 'cyber-dna.json');
    const data = JSON.parse(await fs.readFile(dataFile, 'utf-8'));

    const user = data.users.find((u: any) => u.id === userId);
    const behavior = data.behaviors[userId];
    const recentActivities = data.activityLogs
      .filter((a: any) => a.userId === userId)
      .sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 50);

    const anomalies = recentActivities.filter((a: any) => a.isAnomaly || a.anomalyScore > 0.7);

    return Response.json({
      user,
      behavior,
      statistics: {
        totalActivities: data.activityLogs.filter((a: any) => a.userId === userId).length,
        anomaliesDetected: anomalies.length,
        normalActivities: recentActivities.filter((a: any) => a.anomalyScore < 0.3).length,
        suspiciousActivities: anomalies.length,
        riskLevel: anomalies.length > 5 ? 'HIGH' : anomalies.length > 2 ? 'MEDIUM' : 'LOW',
      },
      recentActivities,
      anomalies,
    });
  } catch (error) {
    return Response.json({ error: 'Failed to load user profile' }, { status: 500 });
  }
}
