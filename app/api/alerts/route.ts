import fs from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'user-1';

    const dataFile = path.join(process.cwd(), 'data', 'cyber-dna.json');
    const data = JSON.parse(await fs.readFile(dataFile, 'utf-8'));

    const userAlerts = data.alerts
      .filter((a: any) => a.userId === userId)
      .sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    const stats = {
      total: userAlerts.length,
      critical: userAlerts.filter((a: any) => a.severity === 'CRITICAL').length,
      high: userAlerts.filter((a: any) => a.severity === 'HIGH').length,
      medium: userAlerts.filter((a: any) => a.severity === 'MEDIUM').length,
    };

    return Response.json({
      alerts: userAlerts,
      stats,
    });
  } catch (error) {
    return Response.json({ error: 'Failed to load alerts' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { alertId } = body;

    const dataFile = path.join(process.cwd(), 'data', 'cyber-dna.json');
    const data = JSON.parse(await fs.readFile(dataFile, 'utf-8'));

    data.alerts = data.alerts.filter((a: any) => a.id !== alertId);

    await fs.writeFile(dataFile, JSON.stringify(data, null, 2));

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Failed to delete alert' }, { status: 500 });
  }
}
