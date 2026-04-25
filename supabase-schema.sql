-- CV Database Schema for Supabase
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profile table (your personal info)
CREATE TABLE profile (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  location TEXT,
  linkedin TEXT,
  github TEXT,
  portfolio TEXT,
  summary TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Experience table
CREATE TABLE experiences (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  period TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  color TEXT DEFAULT '#6366F1',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  platforms TEXT[], -- Array of platforms: ['Android', 'iOS']
  color TEXT DEFAULT '#6366F1',
  android_url TEXT,
  ios_url TEXT,
  featured BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Education table
CREATE TABLE education (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  degree TEXT NOT NULL,
  school TEXT NOT NULL,
  period TEXT NOT NULL,
  gpa TEXT,
  details TEXT[], -- Array of achievements
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Skills table
CREATE TABLE skills (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  level INTEGER DEFAULT 80, -- 0-100
  color TEXT DEFAULT '#6366F1',
  icon TEXT, -- Icon name from react-icons
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Certificates table
CREATE TABLE certificates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  issuer TEXT,
  date TEXT,
  url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Memberships table
CREATE TABLE memberships (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  organization TEXT NOT NULL,
  role TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for better performance
CREATE INDEX idx_experiences_created ON experiences(created_at DESC);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_skills_order ON skills(order_index);

-- Enable Row Level Security (RLS)
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;

-- Public read policies (anyone can view)
CREATE POLICY "Public can view profile" ON profile FOR SELECT USING (true);
CREATE POLICY "Public can view experiences" ON experiences FOR SELECT USING (true);
CREATE POLICY "Public can view projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public can view education" ON education FOR SELECT USING (true);
CREATE POLICY "Public can view skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public can view certificates" ON certificates FOR SELECT USING (true);
CREATE POLICY "Public can view memberships" ON memberships FOR SELECT USING (true);

-- Authenticated users can modify data
CREATE POLICY "Authenticated users can modify profile" ON profile FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can modify experiences" ON experiences FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can modify projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can modify education" ON education FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can modify skills" ON skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can modify certificates" ON certificates FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can modify memberships" ON memberships FOR ALL USING (auth.role() = 'authenticated');

-- Insert default data (your current CV info)
INSERT INTO profile (name, title, email, phone, location, linkedin, summary) VALUES
('Amr Atef Goda', 'Flutter Developer & Software Engineer', 'eng.amr.atef.goda@gmail.com', '+201030193111', 'Cairo, Egypt', 'https://linkedin.com/in/amr-atef', 'Highly effective Software Engineer with 3+ years of experience specializing in Flutter application development for enterprise solutions.');

INSERT INTO experiences (company, role, period, location, description, color) VALUES
('Tawuniya SA', 'Senior Flutter Developer', 'October 2025 - Present', 'Saudi Arabia', 'Lead the development and maintenance of mobile applications for Saudi Arabia''s leading insurance provider\nDesign and implement high-performance Flutter applications\nCollaborate with cross-functional teams to integrate secure payment systems\nArchitect features for policy management, claims submission, and customer portals', '#6366F1'),
('Beltone Holding', 'Flutter Developer', 'Dec 2024 – October 2025', 'Egypt', 'Optimized Belton stock trading application for Egyptian stock exchange\nIntegrated payment gateways including Visa, Fawry\nImplemented robust security measures for financial transactions\nEnhanced UI/UX for trading platform', '#EC407A'),
('Msar', 'Flutter Developer', 'Apr 2024 – Dec 2024', 'Riyadh, Saudi Arabia', 'Architected cross-platform mobile applications using Flutter\nCollaborated with design teams to craft user-centric interfaces\nConducted code reviews and mentored development team', '#42A5F5');

INSERT INTO projects (name, description, platforms, color, android_url, ios_url) VALUES
('Tawuniya', 'Insurance application for policy management and claims', ARRAY['Android', 'iOS'], '#6366F1', 'https://play.google.com/store/apps/details?id=com.tawuniya', 'https://apps.apple.com/app/tawuniya'),
('Beltone', 'Stock trading application for Egyptian stock exchange', ARRAY['Android', 'iOS'], '#EC407A', 'https://play.google.com/store/apps/details?id=com.beltone', 'https://apps.apple.com/app/beltone'),
('Kafey', 'HR management application', ARRAY['Android', 'iOS'], '#42A5F5', NULL, 'https://apps.apple.com/app/kafey'),
('London Eyes', 'Smart tour guide app for London landmarks', ARRAY['Android', 'iOS'], '#AB47BC', 'https://play.google.com/store/apps/details?id=com.londoneyes', 'https://apps.apple.com/app/london-eyes');

INSERT INTO education (degree, school, period, gpa, details) VALUES
('Bachelor of Computer Science', 'Modern Academy', '2019 - 2023', '3.0', ARRAY['Graduation Project: A+']),
('Flutter Diploma', 'IT Sharks', '2021 - 2022', NULL, ARRAY['Orange Digital Center Certificate']);

INSERT INTO skills (name, level, color, order_index) VALUES
('Flutter', 95, '#42A5F5', 1),
('Dart', 90, '#00B4AB', 2),
('Firebase', 85, '#FFCA28', 3),
('Git', 85, '#F05032', 4),
('State Management', 90, '#AB47BC', 5),
('API Integration', 88, '#66BB6A', 6),
('Clean Architecture', 85, '#FF7043', 7),
('Mobile Security', 80, '#EC407A', 8);

INSERT INTO memberships (organization, role, description) VALUES
('GDSC Cairo', 'Flutter Head', 'Leading Flutter community initiatives and mentoring developers');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profile_updated_at BEFORE UPDATE ON profile
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON experiences
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
