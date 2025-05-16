import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/admin-schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });

// Initialize admin user if not exists
export async function initializeAdminUser() {
  try {
    // Check if admin user exists
    const existingAdmin = await db.select().from(schema.adminUsers).where((users) => 
      users.username.equals('swati001')
    );
    
    if (existingAdmin.length === 0) {
      // Create admin user
      await db.insert(schema.adminUsers).values({
        username: 'swati001',
        password: 'tandon@opkl', // In production, use a proper hashing method
        fullName: 'Swati Choudhary',
        email: 'Matchboxfusion@gmail.com',
        role: 'administrator',
        active: true
      });
      console.log('Admin user created successfully');
    }
    
    // Initialize default site settings
    const existingSettings = await db.select().from(schema.siteSettings);
    
    if (existingSettings.length === 0) {
      // Add default settings
      const defaultSettings = [
        {
          settingKey: 'site_title',
          settingValue: 'Matchbox~Fusion | Premium Event Management',
          settingType: 'text',
          label: 'Site Title',
          description: 'The title of the website',
          category: 'general',
          updatedBy: 1
        },
        {
          settingKey: 'contact_email',
          settingValue: 'Matchboxfusion@gmail.com',
          settingType: 'email',
          label: 'Contact Email',
          description: 'The primary contact email address',
          category: 'contact',
          updatedBy: 1
        },
        {
          settingKey: 'contact_phone',
          settingValue: '+91 81308 93001',
          settingType: 'text',
          label: 'Contact Phone',
          description: 'The primary contact phone number',
          category: 'contact',
          updatedBy: 1
        },
        {
          settingKey: 'contact_address',
          settingValue: 'Gurugram, Haryana, India',
          settingType: 'textarea',
          label: 'Contact Address',
          description: 'The physical address',
          category: 'contact',
          updatedBy: 1
        }
      ];
      
      for (const setting of defaultSettings) {
        await db.insert(schema.siteSettings).values(setting);
      }
      
      console.log('Default site settings created successfully');
    }
  } catch (error) {
    console.error('Error initializing admin data:', error);
  }
}