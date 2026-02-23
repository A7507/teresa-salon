-- Teresa Salon Database Schema

-- Services table for salon services and pricing
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery table for braids photos
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Appointments table for bookings
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  booking_fee_paid BOOLEAN DEFAULT false,
  stripe_session_id TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,                                                                                      
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin users table (for checking admin status)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Services: Public read, admin write
CREATE POLICY "Anyone can view active services" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage services" ON services FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);

-- Gallery: Public read, admin write
CREATE POLICY "Anyone can view active gallery items" ON gallery FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage gallery" ON gallery FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);

-- Appointments: Users can create, admins can manage
CREATE POLICY "Anyone can create appointments" ON appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all appointments" ON appointments FOR SELECT USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "Admins can manage appointments" ON appointments FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);

-- Contact messages: Anyone can create, admins can read
CREATE POLICY "Anyone can send contact messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view contact messages" ON contact_messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "Admins can manage contact messages" ON contact_messages FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);

-- Admin users: Only admins can view
CREATE POLICY "Admins can view admin list" ON admin_users FOR SELECT USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);

-- Insert default services
INSERT INTO services (name, description, price, duration_minutes, sort_order) VALUES
  ('Knotless Braids', 'Seamless, lightweight braids that start with your natural hair for a more natural look and less tension on the scalp.', 120.00, 180, 1),
  ('Box Braids', 'Classic protective style with individual braids sectioned into square-shaped parts.', 100.00, 150, 2),
  ('Cornrows', 'Traditional braids that are braided flat to the scalp in straight lines or intricate designs.', 60.00, 90, 3),
  ('Fulani Braids', 'Elegant style featuring a unique pattern of braids with beads and accessories.', 90.00, 120, 4),
  ('Twist Braids', 'Two-strand twists that create a beautiful, natural-looking protective style.', 80.00, 120, 5)
ON CONFLICT DO NOTHING;
