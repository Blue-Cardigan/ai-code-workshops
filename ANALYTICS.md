# Analytics & Conversion Tracking

This document outlines the analytics and conversion tracking implementation for the AI Code Workshops platform.

## Overview

The analytics system tracks user behavior throughout the conversion funnel, from initial page visits to completed lead forms. It supports multiple analytics providers and includes built-in development mode protection.

## Setup

### Environment Variables

Add these variables to your `.env` file:

```bash
# Required for Google Analytics 4
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Optional: Segment integration
VITE_SEGMENT_WRITE_KEY=your_segment_write_key

# Optional: Enable analytics in development (default: false)
VITE_ENABLE_ANALYTICS_DEV=true
```

### Analytics Providers

Currently supported:

- **Google Analytics 4** (primary)
- **Segment** (optional, for advanced customer data platform needs)

## Tracked Events

### Funnel Entry Points

- `Hero CTA Clicked` - When users click main call-to-action buttons
- `Workshop Interest` - When users click "Learn More" on workshop cards
- `Assessment Started` - When users begin the skills assessment

### Assessment Funnel

- `Assessment Question Answered` - Each question response
- `Assessment Completed` - When assessment is finished
- `Quote Generated` - When pricing quote is calculated

### Lead Conversion

- `Contact Form Submitted` - When contact details are provided
- `Lead Generated` - Main conversion goal (includes lead value)

### Engagement Events

- `Workshop Viewed` - When specific workshops are viewed
- `Workshop Details Viewed` - When workshop details are expanded
- `Navigation Clicked` - Cross-section navigation
- `Consultation Requested` - "Book a Call" clicks

### Page Views

- Home page visits
- All workshops page
- Skills assessment page

## Conversion Funnel

```
Page Visit → Hero CTA Click → Assessment Started
     ↓
Assessment Questions → Assessment Completed → Quote Generated
     ↓
Contact Form → Lead Generated (CONVERSION)
```

## Key Metrics

### Primary KPIs

- **Conversion Rate**: Assessment completions to qualified leads
- **Lead Value**: Average quote value per lead
- **Track Distribution**: Most popular learning tracks
- **Assessment Drop-off**: Where users exit the funnel

### Secondary Metrics

- Workshop interest rates by type
- Page engagement time
- Return visitor conversion rates
- Geographic distribution (via GA4)

## Data Collection

### Client-Side Tracking

All tracking happens through the `analytics.ts` utility:

```typescript
import { track } from "../lib/analytics";

// Track workshop interest
track.workshopInterest(workshopId, workshopTitle, "featured");

// Track conversion
track.contactFormSubmitted(contactInfo);
```

### Server-Side Data

- Assessment submissions stored in Supabase
- Lead qualification data
- Quote values and team sizes
- Company information

## Analytics Dashboard

Access the built-in analytics dashboard component (`AnalyticsDashboard.tsx`) to view:

- Real-time conversion metrics
- Popular learning tracks
- Daily lead trends
- Average quote values

## Development Mode

In development, analytics events are logged to console instead of being sent to providers:

```
🔍 Analytics (dev mode): Workshop Interest { workshop_id: 1, source: 'featured' }
👤 Analytics identify (dev mode): user@example.com { name: 'John Doe' }
📄 Analytics page (dev mode): Home
```

Set `VITE_ENABLE_ANALYTICS_DEV=true` to enable real tracking in development.

## Privacy & Compliance

### Data Collection

- No PII tracked without explicit consent
- Email addresses only collected after form submission
- All data stored securely in Supabase
- Analytics identifiers are hashed

### GDPR Compliance

- Users can opt out of tracking
- Data retention policies configured
- Clear privacy policy links
- Cookie consent where required

## Monitoring & Alerts

### Recommended Dashboards

1. **Google Analytics 4**: Custom conversion dashboard
2. **Supabase**: Real-time assessment submissions
3. **Custom Dashboard**: Built-in component for internal monitoring

### Key Alerts

- Conversion rate drops below 15%
- Assessment completion rate drops below 70%
- Technical errors in form submissions
- Unusual traffic patterns

## Optimisation Recommendations

### A/B Testing Opportunities

- Hero CTA button text and positioning
- Assessment question order and wording
- Workshop card layouts and descriptions
- Quote presentation format

### Conversion Optimisation

- Reduce assessment friction
- Improve workshop value propositions
- Optimise for mobile experience
- personalise recommendations

## Technical Implementation

### Analytics Architecture

```
User Interaction → track.eventName() → Analytics Library → Multiple Providers
                                   ↓
                               Supabase Database (for conversion data)
```

### Event Properties Schema

All events include standard properties:

- `timestamp`: Event occurrence time
- `user_id`: Identified user (post-conversion)
- `session_id`: Browser session identifier
- `source`: Traffic source/referrer

### Custom Properties by Event Type

- **Workshop events**: `workshop_id`, `workshop_title`, `level`
- **Assessment events**: `question_id`, `answer`, `recommended_track`
- **Conversion events**: `quote_value`, `team_size`, `company_size`

## Support & Troubleshooting

### Common Issues

1. **Events not appearing**: Check environment variables and network
2. **Development logging**: Verify `VITE_ENABLE_ANALYTICS_DEV` setting
3. **Conversion tracking**: Ensure Supabase connection is working

### Debug Mode

Enable analytics debug mode in development:

```typescript
const analytics = Analytics({
  debug: true, // Enables verbose logging
  // ... other config
});
```

---

For questions about the analytics implementation, contact the development team or check the analytics utility source code at `src/lib/analytics.ts`.
