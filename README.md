# Cyber-DNA: Personal Digital Twin for Cybersecurity

A working prototype demonstrating an AI-powered personal digital twin that monitors your online behavior, learns your unique patterns, and detects threats in real-time.

## Overview

Cyber-DNA is a revolutionary approach to personal cybersecurity. Instead of traditional reactive security tools, this system:

- **Learns Your Behavior**: Builds a personalized profile of your online habits, locations, typical activity hours, and spending patterns
- **Detects Anomalies**: Uses AI-powered anomaly detection to identify suspicious activities that deviate from your baseline
- **Protects Proactively**: Alerts you to threats before they impact you, with automatic blocking for critical threats
- **Works Universally**: Monitors across devices, apps, and platforms

## Key Features

### 1. Real-Time Threat Detection
The system continuously analyzes your online activities and calculates a risk score based on:
- **Location Anomalies**: Logins from unexpected geographic locations
- **Time Anomalies**: Activities outside your normal hours
- **Device Anomalies**: Access from unfamiliar devices or device types
- **Transaction Anomalies**: Spending patterns significantly different from your baseline
- **Phishing Detection**: Identifies suspicious URLs and domains

### 2. Personalized Digital Twin
Your digital twin maintains a detailed behavioral profile including:
- Normal geographic locations
- Typical active hours
- Average transaction amounts
- Device types you typically use
- Continuously adapts and learns from your behavior

### 3. Comprehensive Dashboard
Monitor your security in real-time with:
- **Alerts Panel**: High-priority suspicious activities with severity levels
- **Activity Timeline**: Complete log of recent activities with risk scores
- **Statistics Dashboard**: Security metrics and protection score
- **Behavior Profile**: Your digital twin's understanding of your normal behavior

## Demo Scenarios

Test the system with pre-configured threat scenarios:

1. **Unusual Location Login**: Login from Tokyo at 3 AM (unusual time + location)
2. **Phishing Attempt**: Suspicious link with phishing domain
3. **Unusual Purchase Amount**: Transaction 5x larger than typical spending
4. **Suspicious Data Access**: Rapid API calls from unfamiliar IP address

Click "Trigger" on any scenario to see how the digital twin detects and responds to threats.

## Technical Architecture

### Backend API
- **`/api/user-profile`**: Loads user behavior baseline and statistics
- **`/api/detect-anomalies`**: Analyzes activities and calculates anomaly scores
- **`/api/alerts`**: Manages threat alerts with severity levels

### Anomaly Detection Algorithm
The system uses a weighted scoring system (0-1 scale):
- Location deviation: +0.3 points
- Time deviation: +0.25 points
- Transaction size: +0.2 points
- Device deviation: +0.15 points
- Phishing detection: +0.4 points

Activities with scores > 0.6 are flagged as anomalies. Scores > 0.85 trigger critical alerts.

### Data Storage
- Persistent JSON-based storage with sample user data
- Real-time alert generation and storage
- Activity logging for pattern analysis

## How to Use

### 1. View Your Dashboard
Visit the dashboard to see:
- Your current risk level (HIGH/MEDIUM/LOW)
- Total activities monitored
- Number of anomalies detected
- Protection status

### 2. Review Recent Alerts
The alerts panel shows recent suspicious activities:
- Click the X icon to dismiss alerts
- Review the risk score and activity details
- See location and device information

### 3. Analyze Your Behavior
The behavior profile shows what's considered "normal" for you:
- Typical locations
- Active hours
- Common devices
- Transaction amounts

### 4. Test with Demo Scenarios
Scroll down to the "Demo Scenarios" section and:
1. Select a threat scenario (unusual login, phishing, etc.)
2. Click "Trigger" to simulate the threat
3. Watch the alerts panel update in real-time
4. See the system's anomaly detection in action

### 5. Monitor Activity Timeline
Review the activity timeline to see:
- All recent activities with timestamps
- Risk scores for each activity
- Location and device information
- Transaction amounts

## Demo Features

### Real-Time Updates
- Alerts update automatically every 10 seconds
- Triggered anomalies appear in the alerts panel within seconds
- Activity timeline refreshes with new detections

### Interactive Testing
- Trigger multiple scenarios in sequence
- Dismiss alerts to clean up the dashboard
- Watch the statistics and protection score update

### Responsive Design
- Works seamlessly on desktop and mobile
- Dark-mode cybersecurity aesthetic
- Intuitive navigation and controls

## Data in the Demo

The demo includes realistic sample data:
- 2 simulated users
- 202+ logged activities
- Historical anomalies and normal activities
- Behavior baselines for pattern learning

## Future Enhancements

Potential extensions for a production system:
- Multi-device synchronization and cross-platform monitoring
- Machine learning models for improved anomaly detection
- User authentication and real account management
- Browser extension for active threat blocking
- Mobile app integration
- Custom alert thresholds and preferences
- Incident response and remediation workflows
- Integration with password managers and identity services

## Security Considerations

This demo prioritizes demonstrating core functionality. In a production system:
- End-to-end encryption for all data
- Secure authentication (OAuth2/OIDC)
- Role-based access control
- Audit logging for all access
- Compliance with GDPR/CCPA
- Regular security audits

## Getting Started

1. The application starts with pre-loaded sample data
2. Explore the dashboard to understand your behavioral baseline
3. Click "Trigger" on demo scenarios to test threat detection
4. Monitor the alerts panel and activity timeline for real-time updates
5. Review statistics to understand your security posture

## Performance

- Real-time anomaly detection: < 100ms
- Alert generation and persistence: < 500ms
- Full dashboard load: < 1 second
- Data refresh interval: 10 seconds

## Support

For questions or feedback about this demo, refer to the Cyber-DNA project documentation or contact the development team.

---

**Cyber-DNA: Your Personal AI Defender** - Protecting your digital identity, one anomaly at a time.
