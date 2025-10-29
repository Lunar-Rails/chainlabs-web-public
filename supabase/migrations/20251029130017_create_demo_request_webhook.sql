/*
  # Create Database Webhook for Demo Request Notifications

  ## Overview
  This migration sets up a database trigger and webhook to automatically notify the team when new demo requests are submitted.

  ## Changes
  
  ### Database Trigger
  - Creates a PostgreSQL trigger function `notify_new_demo_request()`
  - Trigger fires on INSERT to `demo_requests` table
  - Calls the Supabase Edge Function via HTTP request
  
  ### Webhook Configuration
  - Automatically invokes the `notify-demo-request` Edge Function
  - Sends the new record data as JSON payload
  - Enables real-time email notifications for new leads
  
  ## How It Works
  1. User submits demo request form
  2. Data inserted into `demo_requests` table
  3. PostgreSQL trigger fires automatically
  4. Edge Function receives notification
  5. Email sent to sales team with lead details
  
  ## Security
  - Trigger only fires on successful inserts
  - Edge Function is publicly accessible (verify_jwt = false for webhooks)
  - All data remains secure within Supabase infrastructure
  
  ## Notes
  - The webhook uses pg_net extension for HTTP requests
  - Edge Function handles email formatting and delivery
  - Failed webhook calls are logged for debugging
*/

-- Enable pg_net extension if not already enabled (for HTTP requests from database)
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create a function to call the Edge Function when a new demo request is inserted
CREATE OR REPLACE FUNCTION notify_new_demo_request()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  request_id bigint;
  supabase_url text;
BEGIN
  -- Get the Supabase URL from environment (this is automatically available)
  supabase_url := current_setting('app.settings.supabase_url', true);
  
  -- If supabase_url is not set, try to construct it from the project ref
  IF supabase_url IS NULL OR supabase_url = '' THEN
    supabase_url := 'https://zrbresuyxdzafsqeljpf.supabase.co';
  END IF;

  -- Make async HTTP request to Edge Function
  SELECT INTO request_id net.http_post(
    url := supabase_url || '/functions/v1/notify-demo-request',
    headers := jsonb_build_object(
      'Content-Type', 'application/json'
    ),
    body := jsonb_build_object(
      'type', 'INSERT',
      'table', 'demo_requests',
      'record', row_to_json(NEW)
    )
  );

  -- Log the webhook call
  RAISE LOG 'Demo request webhook triggered for request %, http request id: %', NEW.id, request_id;

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the insert
    RAISE WARNING 'Failed to trigger demo request webhook: %', SQLERRM;
    RETURN NEW;
END;
$$;

-- Create trigger to call the function after insert
DROP TRIGGER IF EXISTS on_demo_request_created ON demo_requests;
CREATE TRIGGER on_demo_request_created
  AFTER INSERT ON demo_requests
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_demo_request();

-- Add comment
COMMENT ON FUNCTION notify_new_demo_request() IS 'Triggers Edge Function to send email notification when new demo request is submitted';
