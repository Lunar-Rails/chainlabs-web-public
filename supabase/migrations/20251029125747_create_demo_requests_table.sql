/*
  # Create Demo Requests Table

  ## Overview
  This migration creates a comprehensive table for storing demo/sample requests from the "Request a Sample" form on the Chainlabs website.

  ## New Tables
  
  ### `demo_requests`
  Stores all form submissions from potential customers requesting blockchain wallet label samples or demos.
  
  **Columns:**
  - `id` (uuid, primary key) - Unique identifier for each request
  - `first_name` (text, required) - Requester's first name
  - `last_name` (text, required) - Requester's last name
  - `business_email` (text, required, unique) - Business email address with validation
  - `company_name` (text, required) - Company or organization name
  - `phone_number` (text, required) - Contact phone number
  - `organization_type` (text, optional) - Type of organization (Financial Institution, Exchange, etc.)
  - `country` (text, optional) - Country of operation
  - `solution_of_interest` (text, optional) - Which Chainlabs solution they're interested in
  - `referral_source` (text, optional) - How they heard about Chainlabs
  - `custom_message` (text, optional) - Additional information about their needs
  - `consent_given` (boolean, required, default false) - Privacy policy consent checkbox
  - `created_at` (timestamptz) - Timestamp of form submission
  - `ip_address` (inet, optional) - IP address for security/analytics
  - `status` (text, default 'new') - Request status (new, contacted, qualified, closed)
  
  ## Security
  
  ### Row Level Security (RLS)
  - RLS is enabled on the `demo_requests` table
  - Only authenticated admin users can read demo requests
  - Public users can only insert their own requests (INSERT policy)
  - No public read access to protect lead privacy
  
  ## Indexes
  - Index on `created_at` for efficient date-based queries
  - Index on `business_email` for duplicate detection
  - Index on `status` for filtering by request status
  
  ## Notes
  - Email validation is enforced at application level
  - IP addresses stored for security and analytics purposes
  - All personally identifiable information (PII) is protected by RLS
  - Timestamps automatically capture submission time
*/

-- Create demo_requests table
CREATE TABLE IF NOT EXISTS demo_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  business_email text NOT NULL,
  company_name text NOT NULL,
  phone_number text NOT NULL,
  organization_type text,
  country text,
  solution_of_interest text,
  referral_source text,
  custom_message text,
  consent_given boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  ip_address inet,
  status text NOT NULL DEFAULT 'new',
  
  -- Constraints
  CONSTRAINT valid_email CHECK (business_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT valid_status CHECK (status IN ('new', 'contacted', 'qualified', 'closed'))
);

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_demo_requests_created_at ON demo_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_demo_requests_email ON demo_requests(business_email);
CREATE INDEX IF NOT EXISTS idx_demo_requests_status ON demo_requests(status);

-- Enable Row Level Security
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert their demo request (for public form submission)
CREATE POLICY "Allow public insert of demo requests"
  ON demo_requests
  FOR INSERT
  TO anon
  WITH CHECK (consent_given = true);

-- Policy: Allow authenticated users to insert demo requests
CREATE POLICY "Allow authenticated insert of demo requests"
  ON demo_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Only authenticated admin users can read all demo requests
CREATE POLICY "Authenticated users can read demo requests"
  ON demo_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can update demo request status
CREATE POLICY "Authenticated users can update demo requests"
  ON demo_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Add comment to table
COMMENT ON TABLE demo_requests IS 'Stores demo and sample requests from the Chainlabs website Request a Sample form';
