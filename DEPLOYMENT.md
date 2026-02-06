# Deployment Guide for Cyber-DNA

This guide explains how to deploy the Cyber-DNA prototype to production.

## Quick Deploy to Vercel

The easiest way to deploy Cyber-DNA is with Vercel, the platform optimized for Next.js:

### 1. Push to GitHub (if not already)
```bash
git init
git add .
git commit -m "Initial Cyber-DNA commit"
git push origin main
```

### 2. Deploy to Vercel
Visit [vercel.com/new](https://vercel.com/new) and:
1. Import your GitHub repository
2. Click "Deploy"
3. Your app will be live in seconds!

## Local Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup
```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to see your app.

## Production Deployment Options

### Option 1: Vercel (Recommended)
- Zero-config deployment
- Automatic builds and deployments on push
- Global edge network
- See "Quick Deploy to Vercel" above

### Option 2: Docker
```bash
# Build Docker image
docker build -t cyber-dna .

# Run container
docker run -p 3000:3000 cyber-dna
```

### Option 3: Self-Hosted (AWS, GCP, Azure, etc.)
```bash
npm run build
npm run start
```

## Environment Variables

This demo doesn't require external environment variables. For production enhancements:

Create a `.env.local` file with:
```
NEXT_PUBLIC_API_URL=https://your-domain.com
DATABASE_URL=your_database_url
```

## Data Persistence

The current demo uses JSON file storage at `/data/cyber-dna.json`. For production:

### Recommended Database Solutions
- **PostgreSQL**: Reliable, open-source, great for analytics
- **MongoDB**: Flexible schema, good for varied activity types
- **Firebase**: Managed backend with real-time updates
- **Supabase**: Open-source Firebase alternative with PostgreSQL

### Migration Steps
1. Install database driver: `npm install pg` or `npm install mongodb`
2. Update API routes to use your database
3. Create database schema from current JSON structure
4. Migrate sample data if needed

## Scaling Considerations

### Current Architecture (Demo)
- Single Node.js process
- File-based data storage
- Suitable for < 100 users

### Production Architecture
```
Load Balancer (Vercel / Nginx)
  ↓
API Servers (Multiple instances)
  ↓
Database (PostgreSQL / MongoDB)
  ↓
Cache Layer (Redis) - Optional but recommended
```

### Optimization Tips
1. **Database Indexing**: Add indexes on userId, timestamp, severity
2. **Caching**: Cache user profiles and behavior baselines
3. **API Rate Limiting**: Implement rate limiting on detect-anomalies endpoint
4. **Async Processing**: Move anomaly detection to background jobs for high-volume scenarios
5. **CDN**: Use Vercel's edge network for static assets

## Security Checklist

- [ ] Enable HTTPS/SSL (automatic with Vercel)
- [ ] Add authentication (implement user login)
- [ ] Enable CORS properly (restrict origins)
- [ ] Rate limit API endpoints
- [ ] Validate and sanitize all inputs
- [ ] Add request logging and monitoring
- [ ] Regular security updates for dependencies
- [ ] Database encryption at rest and in transit
- [ ] Implement audit logging

## Monitoring & Analytics

### Built-in Monitoring
- Vercel Analytics (included with Vercel deployment)
- Next.js built-in monitoring
- Error tracking via Sentry (optional)

### Custom Monitoring
```bash
npm install sentry-next
```

Then add to your app:
```javascript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "your_sentry_dsn",
  environment: "production",
});
```

## Troubleshooting

### Issue: Data not persisting
- Check file permissions on `/data` directory
- Ensure `/data` directory exists
- For cloud deployment, use persistent database

### Issue: Slow response times
- Check database query performance
- Enable caching for user profiles
- Monitor server CPU/memory usage

### Issue: Alerts not updating
- Verify API endpoint is working: `curl http://localhost:3000/api/alerts`
- Check browser console for JavaScript errors
- Ensure data directory has write permissions

## Production Checklist

Before going live:
- [ ] Test all demo scenarios thoroughly
- [ ] Verify alerts are generating correctly
- [ ] Monitor performance with real data volume
- [ ] Set up error tracking and alerting
- [ ] Create automated backups of data
- [ ] Document any customizations
- [ ] Set up monitoring dashboard
- [ ] Have rollback plan ready
- [ ] Test disaster recovery procedures
- [ ] Get security review completed

## Performance Metrics

Target metrics for production:
- API response time: < 100ms
- Dashboard load time: < 1 second
- Alert generation: < 500ms
- Database query: < 50ms
- Uptime: > 99.9%

## Support & Maintenance

### Regular Maintenance
- Update dependencies monthly: `npm update`
- Review security advisories: `npm audit`
- Monitor error logs daily
- Review anomaly detection accuracy weekly

### Scaling Timeline
- 0-100 users: Single Vercel instance (current)
- 100-1000 users: Add caching layer (Redis)
- 1000+ users: Database replication, load balancing
- 10000+ users: Dedicated infrastructure, advanced caching

## Next Steps

1. Test the deployment locally
2. Push to GitHub
3. Deploy to Vercel
4. Set up monitoring
5. Gather user feedback
6. Iterate on features

---

For detailed Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
