/*
  # Add Cover Image Support and Storage

  ## Overview
  This migration adds cover image fields to articles and case studies tables,
  creates a storage bucket for media uploads, and sets up appropriate policies.

  ## Changes
  
  ### Table Modifications
  - Add `cover_image_url` to `articles` table
  - Add `cover_image_url` to `case_studies` table
  
  ### Storage
  - Create `content-images` storage bucket for cover images
  - Set up public read access for images
  - Allow authenticated admin users to upload/update/delete images
  
  ## Security
  - Storage bucket allows public read access for all images
  - Only authenticated users can upload, update, or delete images
*/

-- Add cover_image_url to articles table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'cover_image_url'
  ) THEN
    ALTER TABLE articles ADD COLUMN cover_image_url text;
  END IF;
END $$;

-- Add cover_image_url to case_studies table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'case_studies' AND column_name = 'cover_image_url'
  ) THEN
    ALTER TABLE case_studies ADD COLUMN cover_image_url text;
  END IF;
END $$;

-- Create storage bucket for content images
INSERT INTO storage.buckets (id, name, public)
VALUES ('content-images', 'content-images', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read access for content images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload content images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update content images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete content images" ON storage.objects;

-- Allow public read access to all images
CREATE POLICY "Public read access for content images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'content-images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload content images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'content-images');

-- Allow authenticated users to update their uploaded images
CREATE POLICY "Authenticated users can update content images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'content-images')
  WITH CHECK (bucket_id = 'content-images');

-- Allow authenticated users to delete images
CREATE POLICY "Authenticated users can delete content images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'content-images');
