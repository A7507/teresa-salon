-- Fix RLS policies for Teresa Salon
-- The previous admin_users policy had infinite recursion

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can view admin list" ON admin_users;
DROP POLICY IF EXISTS "Admins can manage services" ON services;
DROP POLICY IF EXISTS "Admins can manage gallery" ON gallery;
DROP POLICY IF EXISTS "Admins can view all appointments" ON appointments;
DROP POLICY IF EXISTS "Admins can manage appointments" ON appointments;
DROP POLICY IF EXISTS "Admins can view contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Admins can manage contact messages" ON contact_messages;

-- Admin users: Check auth.uid() directly without recursion
CREATE POLICY "admin_users_select" ON admin_users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "admin_users_self" ON admin_users FOR ALL USING (auth.uid() = id);

-- Create a security definer function to check admin status (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Services: Admins can manage
CREATE POLICY "admin_services_all" ON services FOR ALL USING (public.is_admin());

-- Gallery: Admins can manage  
CREATE POLICY "admin_gallery_all" ON gallery FOR ALL USING (public.is_admin());

-- Appointments: Admins can view and manage
CREATE POLICY "admin_appointments_select" ON appointments FOR SELECT USING (public.is_admin());
CREATE POLICY "admin_appointments_update" ON appointments FOR UPDATE USING (public.is_admin());
CREATE POLICY "admin_appointments_delete" ON appointments FOR DELETE USING (public.is_admin());

-- Contact messages: Admins can view and manage
CREATE POLICY "admin_messages_select" ON contact_messages FOR SELECT USING (public.is_admin());
CREATE POLICY "admin_messages_update" ON contact_messages FOR UPDATE USING (public.is_admin());
CREATE POLICY "admin_messages_delete" ON contact_messages FOR DELETE USING (public.is_admin());
