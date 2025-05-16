import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Website visits tracking
export const websiteVisits = pgTable("website_visits", {
  id: serial("id").primaryKey(),
  visitorId: text("visitor_id").notNull(),
  pageVisited: text("page_visited").notNull(),
  visitDate: timestamp("visit_date").defaultNow().notNull(),
  referrer: text("referrer"),
  userAgent: text("user_agent"),
  ipAddress: text("ip_address")
});

export const insertVisitSchema = createInsertSchema(websiteVisits).pick({
  visitorId: true,
  pageVisited: true,
  referrer: true,
  userAgent: true,
  ipAddress: true
});

export type InsertVisit = z.infer<typeof insertVisitSchema>;
export type Visit = typeof websiteVisits.$inferSelect;

// Blog posts
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  authorId: integer("author_id").notNull(),
  featuredImage: text("featured_image"),
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  publishedAt: timestamp("published_at"),
  tags: text("tags").array()
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).pick({
  title: true,
  slug: true,
  content: true,
  excerpt: true,
  authorId: true,
  featuredImage: true,
  published: true,
  tags: true
});

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

// Media items
export const mediaItems = pgTable("media_items", {
  id: serial("id").primaryKey(),
  fileName: text("file_name").notNull(),
  fileType: text("file_type").notNull(),
  fileSize: integer("file_size").notNull(),
  filePath: text("file_path").notNull().unique(),
  description: text("description"),
  alt: text("alt"),
  uploadedBy: integer("uploaded_by").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  metadata: jsonb("metadata")
});

export const insertMediaItemSchema = createInsertSchema(mediaItems).pick({
  fileName: true,
  fileType: true,
  fileSize: true,
  filePath: true,
  description: true,
  alt: true,
  uploadedBy: true,
  metadata: true
});

export type InsertMediaItem = z.infer<typeof insertMediaItemSchema>;
export type MediaItem = typeof mediaItems.$inferSelect;

// Admin users
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull(),
  lastLogin: timestamp("last_login"),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertAdminUserSchema = createInsertSchema(adminUsers).pick({
  username: true,
  password: true,
  fullName: true,
  email: true,
  role: true,
  active: true
});

export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type AdminUser = typeof adminUsers.$inferSelect;

// Site settings
export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  settingKey: text("setting_key").notNull().unique(),
  settingValue: text("setting_value"),
  settingType: text("setting_type").notNull(),
  label: text("label").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  updatedBy: integer("updated_by").notNull()
});

export const insertSiteSettingSchema = createInsertSchema(siteSettings).pick({
  settingKey: true,
  settingValue: true,
  settingType: true,
  label: true,
  description: true,
  category: true,
  updatedBy: true
});

export type InsertSiteSetting = z.infer<typeof insertSiteSettingSchema>;
export type SiteSetting = typeof siteSettings.$inferSelect;