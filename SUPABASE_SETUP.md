# Supabase Setup Instructions

## Environment Variables

Create a `.env` file in the project root with the following variables:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Setup

1. Create a new Supabase project
2. Run the SQL commands in `supabase-schema.sql` in your Supabase SQL editor
3. This will create the `assessment_submissions` table with proper RLS policies

## Features

### Updated Questions Component

The Questions component now includes:

1. **Conditional Question**: An in-person hosting preference question that only appears when "In-person training" is selected
2. **Contact Form**: A comprehensive contact information form with:
   - Company Name (required)
   - Contact Name (required)
   - Email Address (required)
   - Phone Number (optional)
   - Additional Notes (optional)
3. **Supabase Integration**: All assessment data is automatically saved to Supabase when completed

### Database Schema

The `assessment_submissions` table stores:

- Assessment responses (company size, interests, roles, training preference, hosting preference)
- Contact information (company name, contact name, email, phone, notes)
- Recommended track result
- Timestamps for tracking submissions

### Security

- Row Level Security (RLS) is enabled
- Public insert policy allows form submissions
- Service role can read all data for admin access
