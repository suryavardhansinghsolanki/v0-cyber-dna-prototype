const fs = require('fs');
const path = require('path');

// Create data directory for SQLite
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Initialize sample user behavior data
const sampleData = {
  users: [
    {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      createdAt: new Date('2024-01-01').toISOString(),
    },
    {
      id: 'user-2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      createdAt: new Date('2024-02-01').toISOString(),
    },
  ],
  activityLogs: [], // Will be populated with synthetic data
  alerts: [],
  behaviors: {}, // Store learned behavior profiles
};

// Generate synthetic user activity data for demo
const generateSyntheticData = () => {
  const activities = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30); // Last 30 days

  // User 1 normal patterns
  for (let i = 0; i < 200; i++) {
    const date = new Date(startDate);
    date.setHours(Math.floor(Math.random() * 16) + 8); // 8 AM to midnight
    date.setMinutes(Math.floor(Math.random() * 60));
    date.setTime(date.getTime() + i * 3600000); // Spread over time

    activities.push({
      id: `activity-${i}`,
      userId: 'user-1',
      type: ['login', 'browse', 'purchase'][Math.floor(Math.random() * 3)],
      location: ['New York', 'New York', 'New York', 'San Francisco'][Math.floor(Math.random() * 4)],
      ipAddress: ['192.168.1.' + Math.floor(Math.random() * 100), '10.0.0.1'][Math.floor(Math.random() * 2)],
      timestamp: date.toISOString(),
      details: {
        url: `https://example${Math.floor(Math.random() * 10)}.com`,
        amount: Math.random() < 0.7 ? null : Math.floor(Math.random() * 1000) + 10,
        deviceType: ['desktop', 'mobile', 'tablet'][Math.floor(Math.random() * 3)],
      },
      anomalyScore: Math.random() * 0.3, // Low anomaly for normal behavior
    });
  }

  // Add some anomalies
  const anomalies = [
    {
      id: 'activity-anomaly-1',
      userId: 'user-1',
      type: 'login',
      location: 'Moscow',
      ipAddress: '185.220.100.1',
      timestamp: new Date().toISOString(),
      details: {
        deviceType: 'unknown',
      },
      anomalyScore: 0.92,
      isAnomaly: true,
    },
    {
      id: 'activity-anomaly-2',
      userId: 'user-1',
      type: 'purchase',
      location: 'Shanghai',
      ipAddress: '202.96.134.1',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      details: {
        url: 'phishing-site.fake',
        amount: 5000,
        deviceType: 'mobile',
      },
      anomalyScore: 0.88,
      isAnomaly: true,
    },
  ];

  return [...activities, ...anomalies];
};

sampleData.activityLogs = generateSyntheticData();

// Initialize behavior profiles for each user
sampleData.users.forEach((user) => {
  const userActivities = sampleData.activityLogs.filter((a) => a.userId === user.id);

  // Calculate baseline behavior
  const locations = [...new Set(userActivities.map((a) => a.location))];
  const normalHours = userActivities
    .filter((a) => !a.isAnomaly)
    .map((a) => new Date(a.timestamp).getHours());
  const normalAverageHour = normalHours.length > 0 ? Math.round(normalHours.reduce((a, b) => a + b) / normalHours.length) : 12;

  sampleData.behaviors[user.id] = {
    userId: user.id,
    normalLocations: locations.slice(0, 3),
    normalHours: { start: Math.max(0, normalAverageHour - 2), end: Math.min(23, normalAverageHour + 8) },
    averageTransactionAmount: 250,
    typicalDevices: ['desktop', 'mobile'],
    suspiciousPatterns: ['unusual_location', 'odd_hours', 'high_transaction', 'unknown_device'],
    lastUpdated: new Date().toISOString(),
  };
});

// Save data to JSON file
const dataFile = path.join(dataDir, 'cyber-dna.json');
fs.writeFileSync(dataFile, JSON.stringify(sampleData, null, 2));
console.log('Database initialized at:', dataFile);
console.log('Total activities:', sampleData.activityLogs.length);
console.log('Users:', sampleData.users.length);
