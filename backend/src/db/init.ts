import { Client, Pool } from 'pg';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const PGHOST = process.env.PGHOST || 'localhost';
const PGPORT = parseInt(process.env.PGPORT || '5432');
const PGUSER = process.env.PGUSER || 'postgres';
const PGPASSWORD = process.env.PGPASSWORD || 'postgres';
const PGDATABASE = process.env.PGDATABASE || 'getexpert_pro';

async function initDatabase() {
  console.log('Connecting to postgres default database to check target...');
  
  // 1. Create Database if not exists
  const client = new Client({
    host: PGHOST,
    port: PGPORT,
    user: PGUSER,
    password: PGPASSWORD,
    database: 'postgres',
  });

  try {
    await client.connect();
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [PGDATABASE]);
    if (res.rowCount === 0) {
      console.log(`Database "${PGDATABASE}" does not exist. Creating...`);
      await client.query(`CREATE DATABASE ${PGDATABASE}`);
      console.log(`Database "${PGDATABASE}" created successfully.`);
    } else {
      console.log(`Database "${PGDATABASE}" already exists.`);
    }
  } catch (error) {
    console.error('Error during database check/creation:', error);
    process.exit(1);
  } finally {
    await client.end();
  }

  // 2. Connect to the target database and execute migrations
  console.log(`Connecting to database "${PGDATABASE}" to run migrations...`);
  const pool = new Pool({
    host: PGHOST,
    port: PGPORT,
    user: PGUSER,
    password: PGPASSWORD,
    database: PGDATABASE,
  });

  try {
    // Enable uuid-ossp extension
    await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    console.log('Creating tables...');
    
    // Create Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL CHECK (role IN ('customer', 'expert', 'admin')),
        avatar_url VARCHAR(255),
        status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'pending')),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create Expert Profiles table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS expert_profiles (
        id VARCHAR(50) PRIMARY KEY,
        user_id VARCHAR(50) UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(150) NOT NULL,
        bio TEXT NOT NULL,
        rating NUMERIC(3, 2) DEFAULT 5.0,
        review_count INTEGER DEFAULT 0,
        earnings NUMERIC(10, 2) DEFAULT 0.0,
        approved BOOLEAN DEFAULT FALSE,
        availability JSONB DEFAULT '[]'::jsonb,
        services VARCHAR(50)[] DEFAULT '{}'::varchar[]
      )
    `);

    // Create Services table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS services (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        description TEXT NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        category VARCHAR(100) NOT NULL,
        duration INTEGER NOT NULL,
        image_url VARCHAR(255),
        rating NUMERIC(3, 2) DEFAULT 5.0,
        review_count INTEGER DEFAULT 0
      )
    `);

    // Create Bookings table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id VARCHAR(50) PRIMARY KEY,
        customer_id VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,
        customer_name VARCHAR(100) NOT NULL,
        expert_id VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,
        expert_name VARCHAR(100) NOT NULL,
        service_id VARCHAR(50) REFERENCES services(id) ON DELETE CASCADE,
        service_title VARCHAR(150) NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
        price NUMERIC(10, 2) NOT NULL,
        scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create Notifications table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id VARCHAR(50) PRIMARY KEY,
        user_id VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(150) NOT NULL,
        message TEXT NOT NULL,
        type VARCHAR(20) NOT NULL CHECK (type IN ('info', 'success', 'warning', 'error')),
        read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create Messages table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id VARCHAR(50) PRIMARY KEY,
        conversation_id VARCHAR(50) NOT NULL,
        sender_id VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,
        sender_name VARCHAR(100) NOT NULL,
        sender_role VARCHAR(20) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Tables created. Checking and seeding initial data...');

    // 3. Seed initial data
    const userCheck = await pool.query('SELECT COUNT(*) FROM users');
    if (parseInt(userCheck.rows[0].count) === 0) {
      console.log('Seeding database with mock data...');
      
      const pwdSarah = await bcrypt.hash('customer123', 10);
      const pwdJohn = await bcrypt.hash('customer123', 10);
      const pwdAlex = await bcrypt.hash('expert123', 10);
      const pwdElena = await bcrypt.hash('expert123', 10);
      const pwdMarcus = await bcrypt.hash('expert123', 10);
      const pwdAdmin = await bcrypt.hash('admin123', 10);

      // Seed Users
      await pool.query(`
        INSERT INTO users (id, name, email, password_hash, role, avatar_url, status) VALUES
        ('c1', 'Sarah Connor', 'sarah@getexpert.pro', $1, 'customer', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', 'active'),
        ('c2', 'John Doe', 'john@getexpert.pro', $2, 'customer', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', 'active'),
        ('e1', 'Alex Rivera', 'alex@getexpert.pro', $3, 'expert', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150', 'active'),
        ('e2', 'Elena Rostova', 'elena@getexpert.pro', $4, 'expert', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150', 'active'),
        ('e3', 'Marcus Chen', 'marcus@getexpert.pro', $5, 'expert', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150', 'active'),
        ('a1', 'Chief Admin', 'admin@getexpert.pro', $6, 'admin', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', 'active')
      `, [pwdSarah, pwdJohn, pwdAlex, pwdElena, pwdMarcus, pwdAdmin]);

      // Seed Services
      await pool.query(`
        INSERT INTO services (id, title, description, price, category, duration, image_url, rating, review_count) VALUES
        ('s1', 'Dedicated Tech Team Development', 'Build robust, scalable systems with our experienced developers. From web applications to mobile apps, we deliver cutting-edge technology.', 150.00, 'Technology', 60, 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=400', 4.90, 88),
        ('s2', 'Data-driven Digital Marketing Campaigns', 'Drive growth with data-driven marketing strategies. Craft campaigns that convert, optimize ROI, and build digital brand presence.', 95.00, 'Digital Marketing', 60, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400', 4.80, 74),
        ('s3', 'Social Media & Community Management', 'Engage your audience with compelling social strategies. Create, manage, and optimize your social media presence to build community.', 75.00, 'Digital Marketing', 60, 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400', 4.75, 52),
        ('s4', 'SEO Copywriting & Content Writing', 'Tell your story with powerful words. High-quality SEO-optimized, engaging content that resonates with your audience and drives action.', 65.00, 'Content Writing', 60, 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400', 4.80, 43),
        ('s5', 'Branding, Logos & Visual Identity Kits', 'Build a memorable brand identity. From logo design to brand strategy, we create cohesive visual identities that make your business stand out.', 110.00, 'Branding', 60, 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400', 4.95, 61),
        ('s6', 'Digital Transformation & Tech Consulting', 'Navigate your digital transformation with expert guidance. Strategic consulting to align your business goals with actionable digital solutions.', 180.00, 'Consulting', 60, 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400', 4.90, 37)
      `);

      // Seed Expert Profiles
      const availAlex = JSON.stringify([
        { id: 'av1', dayOfWeek: 1, startTime: '09:00', endTime: '17:00', isBooked: false },
        { id: 'av2', dayOfWeek: 2, startTime: '09:00', endTime: '17:00', isBooked: false },
        { id: 'av3', dayOfWeek: 3, startTime: '09:00', endTime: '17:00', isBooked: true },
        { id: 'av4', dayOfWeek: 4, startTime: '09:00', endTime: '17:00', isBooked: false },
        { id: 'av5', dayOfWeek: 5, startTime: '09:00', endTime: '17:00', isBooked: false },
      ]);
      const availElena = JSON.stringify([
        { id: 'av6', dayOfWeek: 1, startTime: '10:00', endTime: '19:00', isBooked: false },
        { id: 'av7', dayOfWeek: 3, startTime: '10:00', endTime: '19:00', isBooked: false },
        { id: 'av8', dayOfWeek: 5, startTime: '10:00', endTime: '19:00', isBooked: false },
        { id: 'av9', dayOfWeek: 6, startTime: '11:00', endTime: '16:00', isBooked: false },
      ]);
      const availMarcus = JSON.stringify([
        { id: 'av10', dayOfWeek: 2, startTime: '09:00', endTime: '18:00', isBooked: false },
        { id: 'av11', dayOfWeek: 4, startTime: '09:00', endTime: '18:00', isBooked: false },
      ]);

      await pool.query(`
        INSERT INTO expert_profiles (id, user_id, title, bio, rating, review_count, earnings, approved, availability, services) VALUES
        ('ep1', 'e1', 'Lead Software Architect', 'Specializing in building robust, scalable full-stack applications, mobile apps, and custom technical infrastructure integrations for high-growth enterprises.', 4.90, 148, 12500.00, true, $1, '{"s1", "s6"}'),
        ('ep2', 'e2', 'Senior Marketing Director', 'Expert in data-driven growth strategies, SEO audits, ROI optimizations, and running end-to-end multi-channel marketing campaigns.', 4.85, 94, 7900.00, true, $2, '{"s2", "s3"}'),
        ('ep3', 'e3', 'Creative Branding Specialist', 'Crafting memorable visual brand identities, logo kits, social media visuals, and comprehensive strategy frameworks.', 4.95, 65, 3200.00, false, $3, '{"s4", "s5"}')
      `, [availAlex, availElena, availMarcus]);

      // Seed Bookings
      await pool.query(`
        INSERT INTO bookings (id, customer_id, customer_name, expert_id, expert_name, service_id, service_title, status, price, scheduled_at, created_at) VALUES
        ('b1', 'c1', 'Sarah Connor', 'e1', 'Alex Rivera', 's1', 'Dedicated Tech Team Development', 'confirmed', 150.00, CURRENT_TIMESTAMP + INTERVAL '2 days', CURRENT_TIMESTAMP - INTERVAL '6 days'),
        ('b2', 'c1', 'Sarah Connor', 'e2', 'Elena Rostova', 's2', 'Data-driven Digital Marketing Campaigns', 'completed', 95.00, CURRENT_TIMESTAMP - INTERVAL '4 days', CURRENT_TIMESTAMP - INTERVAL '8 days'),
        ('b3', 'c2', 'John Doe', 'e2', 'Elena Rostova', 's3', 'Social Media & Community Management', 'pending', 75.00, CURRENT_TIMESTAMP + INTERVAL '4 days', CURRENT_TIMESTAMP - INTERVAL '1 day')
      `);

      // Seed Notifications
      await pool.query(`
        INSERT INTO notifications (id, user_id, title, message, type, read) VALUES
        ('n1', 'e1', 'New Booking Request', 'Sarah Connor has requested Tech Team Development consulting.', 'info', false),
        ('n2', 'c1', 'Payment Successful', 'Invoice #INV-2947 has been paid successfully.', 'success', true),
        ('n3', 'e3', 'Account Verification Pending', 'Please upload your credentials for admin audit checks.', 'warning', false)
      `);

      // Seed Messages
      await pool.query(`
        INSERT INTO messages (id, conversation_id, sender_id, sender_name, sender_role, content, created_at) VALUES
        ('m1', 'conv1', 'c1', 'Sarah Connor', 'customer', 'Hello Alex, I would like to clarify if the development scope includes cross-platform build releases.', CURRENT_TIMESTAMP - INTERVAL '1 hour'),
        ('m2', 'conv1', 'e1', 'Alex Rivera', 'expert', 'Yes Sarah, we construct web and mobile bundles concurrently. App Store submissions are billed under separate support hours.', CURRENT_TIMESTAMP - INTERVAL '45 minutes'),
        ('m3', 'conv1', 'e1', 'Alex Rivera', 'expert', 'Hi Sarah, I will upload the kickoff documentation in 10 minutes.', CURRENT_TIMESTAMP - INTERVAL '30 minutes')
      `);

      console.log('Database seeded successfully.');
    } else {
      console.log('Database already has data. Skipping seed.');
    }

  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

initDatabase();
