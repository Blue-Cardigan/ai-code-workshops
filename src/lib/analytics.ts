import Analytics from 'analytics';
// @ts-expect-error - No types available for these analytics plugins
import googleAnalytics from '@analytics/google-analytics';
// @ts-expect-error - No types available for these analytics plugins  
import segmentPlugin from '@analytics/segment';

// Check if analytics should be enabled
const isDev = import.meta.env.DEV;
const enableInDev = import.meta.env.VITE_ENABLE_ANALYTICS_DEV === 'true';
const shouldEnableAnalytics = !isDev || enableInDev;

// Analytics configuration
const analytics = Analytics({
  app: 'ai-code-workshops',
  debug: isDev,
  plugins: shouldEnableAnalytics ? [
    // Google Analytics 4
    googleAnalytics({
      measurementIds: [import.meta.env.VITE_GA_MEASUREMENT_ID].filter(Boolean),
    }),
    // Segment (optional)
    ...(import.meta.env.VITE_SEGMENT_WRITE_KEY ? [
      segmentPlugin({
        writeKey: import.meta.env.VITE_SEGMENT_WRITE_KEY,
      })
    ] : []),
  ] : [],
});

// Conversion event types
export interface ConversionEvent {
  event: string;
  properties?: Record<string, unknown>;
  userId?: string;
  traits?: Record<string, unknown>;
}

// Track conversion events (with dev mode protection)
export const trackConversion = (event: ConversionEvent) => {
  if (!shouldEnableAnalytics) {
    console.log('🔍 Analytics (dev mode):', event.event, event.properties);
    return;
  }
  
  analytics.track(event.event, event.properties, {
    userId: event.userId,
    traits: event.traits,
  });
};

// Identify users
export const identifyUser = (userId: string, traits: Record<string, unknown>) => {
  if (!shouldEnableAnalytics) {
    console.log('👤 Analytics identify (dev mode):', userId, traits);
    return;
  }
  
  analytics.identify(userId, traits);
};

// Page tracking
export const trackPage = (name: string, properties?: Record<string, unknown>) => {
  if (!shouldEnableAnalytics) {
    console.log('📄 Analytics page (dev mode):', name, properties);
    return;
  }
  
  analytics.page({ name, ...properties });
};

// Predefined conversion events
export const ConversionEvents = {
  // Funnel entry points
  HERO_CTA_CLICKED: 'Hero CTA Clicked',
  WORKSHOP_INTEREST: 'Workshop Interest',
  ASSESSMENT_STARTED: 'Assessment Started',
  
  // Assessment funnel
  ASSESSMENT_QUESTION_ANSWERED: 'Assessment Question Answered',
  ASSESSMENT_COMPLETED: 'Assessment Completed',
  
  // Quote generation
  QUOTE_GENERATED: 'Quote Generated',
  CONTACT_FORM_SUBMITTED: 'Contact Form Submitted',
  
  // Navigation
  WORKSHOP_VIEWED: 'Workshop Viewed',
  NAVIGATION_CLICKED: 'Navigation Clicked',
  
  // Engagement
  WORKSHOP_DETAILS_VIEWED: 'Workshop Details Viewed',
  
  // Goal conversions
  LEAD_GENERATED: 'Lead Generated',
  CONSULTATION_REQUESTED: 'Consultation Requested',
} as const;

// Conversion tracking helpers
export const track = {
  heroCtaClick: (ctaType: 'assessment' | 'consultation' | 'workshops') =>
    trackConversion({
      event: ConversionEvents.HERO_CTA_CLICKED,
      properties: { cta_type: ctaType },
    }),

  workshopInterest: (workshopId: number, workshopTitle: string, source: 'featured' | 'all') =>
    trackConversion({
      event: ConversionEvents.WORKSHOP_INTEREST,
      properties: { 
        workshop_id: workshopId, 
        workshop_title: workshopTitle,
        source 
      },
    }),

  assessmentStarted: () =>
    trackConversion({
      event: ConversionEvents.ASSESSMENT_STARTED,
      properties: { timestamp: new Date().toISOString() },
    }),

  assessmentQuestionAnswered: (questionId: number, answer: string | string[], questionTitle: string) =>
    trackConversion({
      event: ConversionEvents.ASSESSMENT_QUESTION_ANSWERED,
      properties: {
        question_id: questionId,
        question_title: questionTitle,
        answer: Array.isArray(answer) ? answer.join(', ') : answer,
      },
    }),

  assessmentCompleted: (recommendedTrack: string, totalQuestions: number) =>
    trackConversion({
      event: ConversionEvents.ASSESSMENT_COMPLETED,
      properties: {
        recommended_track: recommendedTrack,
        total_questions: totalQuestions,
        completion_time: new Date().toISOString(),
      },
    }),

  quoteGenerated: (
    recommendedTrack: string, 
    teamSize: number, 
    quoteValue: number,
    companySize: string
  ) =>
    trackConversion({
      event: ConversionEvents.QUOTE_GENERATED,
      properties: {
        recommended_track: recommendedTrack,
        team_size: teamSize,
        quote_value: quoteValue,
        company_size: companySize,
        currency: 'GBP',
      },
    }),

  contactFormSubmitted: (contactInfo: {
    company_name: string;
    contact_name: string;
    email: string;
    team_size: string;
    recommended_track: string;
    quote_value?: number;
  }) => {
    // Identify the user
    identifyUser(contactInfo.email, {
      name: contactInfo.contact_name,
      company: contactInfo.company_name,
      team_size: parseInt(contactInfo.team_size),
      recommended_track: contactInfo.recommended_track,
    });

    // Track the conversion
    trackConversion({
      event: ConversionEvents.CONTACT_FORM_SUBMITTED,
      userId: contactInfo.email,
      properties: {
        company_name: contactInfo.company_name,
        team_size: parseInt(contactInfo.team_size),
        recommended_track: contactInfo.recommended_track,
        quote_value: contactInfo.quote_value,
      },
    });

    // Track as lead generated (main conversion goal)
    trackConversion({
      event: ConversionEvents.LEAD_GENERATED,
      userId: contactInfo.email,
      properties: {
        lead_source: 'assessment',
        lead_value: contactInfo.quote_value,
        company_name: contactInfo.company_name,
        team_size: parseInt(contactInfo.team_size),
      },
    });
  },

  workshopViewed: (workshopId: number, workshopTitle: string) =>
    trackConversion({
      event: ConversionEvents.WORKSHOP_VIEWED,
      properties: { 
        workshop_id: workshopId, 
        workshop_title: workshopTitle 
      },
    }),

  navigationClicked: (destination: string, source: string) =>
    trackConversion({
      event: ConversionEvents.NAVIGATION_CLICKED,
      properties: { destination, source },
    }),

  workshopDetailsViewed: (workshopId: number, workshopTitle: string, level: string) =>
    trackConversion({
      event: ConversionEvents.WORKSHOP_DETAILS_VIEWED,
      properties: {
        workshop_id: workshopId,
        workshop_title: workshopTitle,
        level,
      },
    }),

  consultationRequested: (source: string) =>
    trackConversion({
      event: ConversionEvents.CONSULTATION_REQUESTED,
      properties: { source },
    }),
};

// Page tracking helpers
export const pages = {
  home: () => trackPage('Home'),
  workshops: () => trackPage('All Workshops'),
  assessment: () => trackPage('Skills Assessment'),
  questions: () => trackPage('Questions'),
};

export default analytics; 