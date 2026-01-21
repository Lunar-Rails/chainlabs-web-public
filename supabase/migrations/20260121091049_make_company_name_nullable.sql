/*
  # Make company_name field optional

  1. Changes
    - Alter `demo_requests` table to make `company_name` column nullable
    - This allows users to submit demo requests without providing a company name
  
  2. Security
    - No changes to RLS policies
*/

-- Make company_name nullable in demo_requests table
ALTER TABLE demo_requests 
ALTER COLUMN company_name DROP NOT NULL;
