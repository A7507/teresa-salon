-- Add new gallery images to the database
-- These are the 4 images uploaded by the user

-- Insert the new gallery items
INSERT INTO public.gallery (title, description, image_url, display_order, is_active) VALUES
  (
    'Stylish Braided Look',
    'Beautiful braided hairstyle with colorful patterned top and golden bow necklace',
    'https://i.imgur.com/gallery-image-1.jpg',
    6,
    true
  ),
  (
    'Urban Braided Style',
    'Modern braided look perfect for city lifestyle with elegant accessories',
    'https://i.imgur.com/gallery-image-2.jpg',
    7,
    true
  ),
  (
    'Chic Braided Design',
    'Sophisticated braided hairstyle with fashionable urban outfit',
    'https://i.imgur.com/gallery-image-3.jpg',
    8,
    true
  ),
  (
    'Elegant Braided Beauty',
    'Stunning braided style with golden accessories and contemporary fashion',
    'https://i.imgur.com/gallery-image-4.jpg',
    9,
    true
  )
ON CONFLICT DO NOTHING;

-- Update display order for existing items to make room
UPDATE public.gallery 
SET display_order = display_order + 4 
WHERE display_order >= 6;

-- Note: You need to replace the image URLs with actual URLs
-- after uploading the images to a hosting service like:
-- - Supabase Storage
-- - Imgur
-- - Cloudinary
-- - Or your own server

-- To upload via Supabase Storage:
-- 1. Go to Supabase Dashboard > Storage
-- 2. Create a new bucket called "gallery"
-- 3. Upload the 4 images
-- 4. Get the public URLs for each image
-- 5. Replace the URLs in the INSERT statement above
