-- Create the assessment_submissions table
CREATE TABLE IF NOT EXISTS assessment_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- Assessment responses
  company_size TEXT NOT NULL,
  interests TEXT NOT NULL,
  roles TEXT[] NOT NULL,
  training_preference TEXT NOT NULL,
  in_person_hosting TEXT,
  
  -- Contact information
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  additional_notes TEXT,
  
  -- Recommendation result
  recommended_track TEXT NOT NULL
);

-- Create an index on email for efficient lookups
CREATE INDEX IF NOT EXISTS idx_assessment_submissions_email ON assessment_submissions(email);

-- Create an index on created_at for efficient date queries
CREATE INDEX IF NOT EXISTS idx_assessment_submissions_created_at ON assessment_submissions(created_at);

-- Row Level Security (RLS)
ALTER TABLE assessment_submissions ENABLE ROW LEVEL SECURITY;

-- Policy to allow all inserts (since this is a public form)
CREATE POLICY "Allow all inserts" ON assessment_submissions
  FOR INSERT WITH CHECK (true);

-- Policy to allow service role to read all (for admin access)
CREATE POLICY "Allow service role to read all" ON assessment_submissions
  FOR SELECT USING (auth.role() = 'service_role'); 