# Get Started - Cyber-DNA Dashboard

## ⚡ Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
npm install
```
Expected output: No errors, all packages installed

### Step 2: Start Dev Server
```bash
npm run dev
```
Expected output: `ready - started server on localhost:3000`

### Step 3: Open in Browser
Visit: **http://localhost:3000**

✅ **You should see the beautiful Cyber-DNA dashboard!**

---

## 🎨 What You'll See

### Header Section
- Cyber-DNA logo with shield icon
- "Personal Digital Twin" tagline
- Active status indicator (green pulse)
- User name: "Alex Morgan"
- User email: "alex.morgan@example.com"

### Statistics Cards (4 Cards)
| Card | Value | Color |
|------|-------|-------|
| Risk Level | MEDIUM | Orange |
| Anomalies | 8 | Purple |
| Activities | 242 | Cyan |
| Protected | 234 | Green |

### Main Content Area (Left 2/3)

#### Alerts Panel
Shows 3 security alerts:
1. **Phishing Attempt** (CRITICAL - Red) - 95% risk
2. **Unusual Login** (HIGH - Orange) - 85% risk  
3. **Large Transaction** (MEDIUM - Yellow) - 65% risk

Each alert has:
- Severity indicator (colored border)
- Alert message
- Activity type & location
- Risk percentage
- Timestamp
- Dismiss button (X)

#### Activity Timeline
Shows recent activities:
- 🔐 Login from San Francisco (15% risk) - 5 min ago
- 💳 Transaction from San Francisco (22% risk) - 15 min ago
- 📊 Data Access from Home (18% risk) - 25 min ago

#### Threat Scenarios (Click These!)
4 threat simulators:
1. **Unusual Login** - "Login from Tokyo at unexpected time"
2. **Large Transaction** - "Transaction amount 3x normal"
3. **Phishing Attempt** - "Suspicious email link clicked"
4. **Data Access Anomaly** - "Accessing sensitive files at night"

### Right Sidebar (1/3)

#### Security Statistics
- Protection Score: 92% with progress bar
- Threats Blocked: 12
- Monitoring Uptime: 99.9%

#### Digital Twin Profile
- Normal Locations: San Francisco, Home, Work
- Active Hours: 9:00 - 18:00
- Trusted Devices:
  - MacBook Pro ✓
  - iPhone 15 ✓
  - iPad Air ✓

### Footer
- Shield icon + "Cyber-DNA Protection Active"
- Monitoring message with encryption note

---

## 🎮 Interactive Features

### Try These Actions:

#### 1. Dismiss an Alert
- Click the **X** button on any alert
- Alert disappears instantly
- Count decreases by 1

#### 2. Trigger a Threat Scenario
- Click **"Trigger"** on any threat scenario
- Wait 1 second for processing
- New alert appears at top of alerts panel
- Risk percentage is calculated
- Timestamp shows current time

#### 3. Explore Responsive Design
- Resize browser window
- Desktop: 3-column layout
- Tablet: 2-column layout
- Mobile: 1-column layout

#### 4. Hover Effects
- Hover over cards: border changes color
- Hover over alerts: background darkens
- Hover over buttons: shrink slightly
- All smooth 150ms transitions

---

## 🎯 Testing Checklist

Go through each item:

```
Page & Layout:
✓ Page loads without errors
✓ Dashboard visible
✓ All sections displayed
✓ Responsive on different sizes

Header:
✓ Cyber-DNA title visible
✓ Shield icon displays
✓ Status indicator shows "Active"
✓ User name displays correctly
✓ User email displays correctly

Stats Cards:
✓ All 4 cards visible
✓ Icons display correctly
✓ Numbers show correct values
✓ Colors render properly
✓ Cards have hover effect

Alerts Panel:
✓ Shows "Security Alerts (3)"
✓ All 3 alerts visible
✓ Alert text readable
✓ Colors match severity
✓ Risk percentages show
✓ Timestamps display
✓ X buttons clickable
✓ Can dismiss alerts

Activity Timeline:
✓ Shows "Recent Activities"
✓ All activities visible
✓ Emojis display
✓ Locations show
✓ Times display
✓ Risk percentages show

Threat Scenarios:
✓ Shows "Threat Scenarios"
✓ All 4 scenarios visible
✓ "Trigger" buttons work
✓ New alerts appear when triggered
✓ No console errors

Statistics:
✓ Shows protection score
✓ Progress bar displays
✓ Threats blocked shows "12"
✓ Uptime shows "99.9%"

Digital Twin:
✓ Shows "Digital Twin Profile"
✓ Locations display correctly
✓ Active hours show
✓ All 3 devices listed
✓ Verified badges show

Footer:
✓ Protection message visible
✓ Shield icon displays
✓ Text is readable

Performance:
✓ Page loads in < 1 second
✓ Smooth animations
✓ No lag or stuttering
✓ No console errors
✓ Responsive interactions
```

---

## 🚀 Deploy to Production

### Option 1: Vercel (Easiest - 1 minute)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts and get live URL!
```

### Option 2: GitHub + Vercel

```bash
# Add to GitHub
git init
git add .
git commit -m "Cyber-DNA complete"
git push origin main

# Connect to Vercel at vercel.com
# Import repo and deploy
```

### Option 3: Traditional Hosting

```bash
# Build for production
npm run build

# Start production server
npm start

# Deploy built files to your server
```

---

## 📝 Customize (Optional)

### Change User Name
Edit `/app/page.tsx`, line 13:
```typescript
name: 'Your Name',
email: 'your.email@domain.com',
```

### Add More Alerts
Edit `/app/page.tsx`, around line 61-84, add to `demoAlerts` array

### Change Colors
Edit `/app/globals.css`, update color tokens:
```css
--primary: oklch(0.58 0.28 282); /* Change this */
--accent: oklch(0.62 0.32 192);  /* Or this */
```

### Modify Threat Scenarios
Edit `/app/page.tsx`, around line 370, in the threat scenarios array

---

## 🔧 Troubleshooting

### Issue: Page doesn't load
**Solution:**
```bash
npm cache clean --force
npm install
npm run dev
```

### Issue: Styles look wrong
**Solution:**
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R)
- Check globals.css is imported

### Issue: Alerts don't appear
**Solution:**
- Check browser console for errors
- Try refreshing the page
- Ensure JavaScript is enabled

### Issue: Slow performance
**Solution:**
- Close other browser tabs
- Clear browser cache
- Try in incognito mode
- Check network tab for slow assets

---

## 📚 Learn More

- `README.md` - Full documentation
- `COMPLETE.md` - Complete feature guide
- `UI_GUIDE.md` - Design specifications
- `DEPLOY_NOW.md` - Deployment guide

---

## ✅ Success Indicators

You've successfully set up when:
- ✅ Page loads at http://localhost:3000
- ✅ All content visible
- ✅ Alerts display correctly
- ✅ Threat scenarios work
- ✅ No console errors
- ✅ Responsive on mobile
- ✅ Smooth animations

---

## 🎉 You're Ready!

Your Cyber-DNA dashboard is complete and ready to use.

### Next Steps:
1. **Explore** the dashboard
2. **Test** threat scenarios
3. **Customize** with your info
4. **Deploy** to Vercel
5. **Share** your live link

---

## Quick Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel
```

---

## Support

Having issues? Check:
- Browser console for errors
- Network tab for failed requests
- Node.js version (18+)
- npm version (latest)

---

**Happy building! 🚀**
