-- Auto-add users to admin_users when they sign up/login
-- This allows anyone who logs in to become an admin

-- First, create a function that adds users to admin_users automatically
CREATE OR REPLACE FUNCTION public.auto_add_admin()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert the new user into admin_users if they don't exist
  -- The admin_users table has: id (uuid), email (text)
  INSERT INTO public.admin_users (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;

-- Create trigger to auto-add admin on user creation
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_add_admin();

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Admins can view admin list" ON admin_users;
DROP POLICY IF EXISTS "Users can add themselves as admin" ON admin_users;

-- Allow users to add themselves as admin
CREATE POLICY "Users can add themselves as admin" ON admin_users FOR INSERT WITH CHECK (id = auth.uid());

-- Allow users to check if they are admin
CREATE POLICY "Admins can view admin list" ON admin_users FOR SELECT USING (id = auth.uid());

-- Also add existing users to admin_users (if any)
INSERT INTO public.admin_users (id, email)
SELECT id, email
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.admin_users WHERE id IS NOT NULL)
ON CONFLICT (id) DO NOTHING;
