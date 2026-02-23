-- Add the 4 local gallery images to the database
-- These images are already uploaded to public/gallery-uploads/

INSERT INTO public.gallery (title, description, image_url, display_order, is_active) VALUES
  (
    'Stylish Braided Look',
    'Beautiful braided hairstyle with colorful patterned top and golden bow necklace',
    '/gallery-uploads/style-1.jpg',
    6,
    true
  ),
  (
    'Urban Braided Style',
    'Modern braided look perfect for city lifestyle with elegant accessories',
    '/gallery-uploads/style-2.jpg',
    7,
    true
  ),
  (
    'Chic Braided Design',
    'Sophisticated braided hairstyle with fashionable urban outfit',
    '/gallery-uploads/style-3.jpg',
    8,
    true
  ),
  (
    'Elegant Braided Beauty',
    'Stunning braided style with golden accessories and contemporary fashion',
    '/gallery-uploads/style-4.jpg',
    9,
    true
  )
ON CONFLICT DO NOTHING;
