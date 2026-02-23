-- Create default admin user for Teresa Salon
-- This script creates a secure admin user that can access the admin dashboard

-- First, let's create the auth user using the Supabase auth system
-- This needs to be done via the Supabase dashboard or auth API
-- For now, we'll create the admin_users entry for the expected admin email

-- Insert admin user record (this will be triggered automatically when user signs up)
-- But we can also manually insert if needed
INSERT INTO public.admin_users (id, email) 
VALUES (
  gen_random_uuid(), -- This will be replaced with actual user ID when they sign up
  'admin@teresasalon.com'
) ON CONFLICT (email) DO NOTHING;

-- Alternative: If you want to create a specific admin user with a known UUID
-- You would need to first create the user in Supabase Auth, then use that UUID here

-- Para teste, crie um usuário com email e senha seguros
-- Email: admin@teresasalon.com
-- Password: Use uma senha forte no Supabase Dashboard

-- INSTRUÇÕES SEGURAS:
-- 1. Vá ao Supabase Dashboard > Authentication > Users
-- 2. Clique "Add user" 
-- 3. Email: admin@teresasalon.com
-- 4. Password: Crie uma senha forte (mínimo 12 caracteres, números, símbolos)
-- 5. Marque "Auto confirm"
-- 6. Salve o usuário

-- The user will automatically be added to admin_users table due to the trigger
