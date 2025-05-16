import { Router, Request, Response } from "express";
import { db, initializeAdminUser } from "./admin-db";
import * as schema from "@shared/admin-schema";
import { eq, desc, count } from "drizzle-orm";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(process.cwd(), 'client/public/uploads');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + uuidv4();
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, GIF and WebP are allowed.') as any);
    }
  }
});

// Initialize admin routes
export async function initializeAdminRoutes() {
  const router = Router();
  
  // Initialize admin user and settings
  await initializeAdminUser();
  
  // Authentication endpoint
  router.post("/api/admin/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: "Username and password are required"
        });
      }
      
      const users = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
      
      if (users.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials"
        });
      }
      
      const user = users[0];
      
      // In production, use proper password comparison with hashing
      if (user.password !== password) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials"
        });
      }
      
      // Update last login time
      await db.update(adminUsers)
        .set({ lastLogin: new Date() })
        .where(eq(adminUsers.id, user.id));
      
      // Create session (without sensitive data)
      const userSession = {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        role: user.role
      };
      
      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: userSession
      });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred during login"
      });
    }
  });
  
  // Dashboard analytics endpoint
  router.get("/api/admin/dashboard", async (req: Request, res: Response) => {
    try {
      // Get the current date
      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      // This week range (Sunday to Saturday)
      const day = now.getDay(); // 0 = Sunday, 6 = Saturday
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - day);
      weekStart.setHours(0, 0, 0, 0);
      
      // Calculate stats
      const totalVisits = await db.select({ count: count() }).from(websiteVisits);
      
      const todayVisits = await db.select({ count: count() })
        .from(websiteVisits)
        .where(visit => visit.visitDate.gte(todayStart));
      
      const weekVisits = await db.select({ count: count() })
        .from(websiteVisits)
        .where(visit => visit.visitDate.gte(weekStart));
      
      // Get recent inquiries
      const recentInquiries = await db
        .select()
        .from(schema.contactSubmissions)
        .orderBy(desc(schema.contactSubmissions.createdAt))
        .limit(5);
      
      // Get popular pages
      const popularPages = await db
        .select({
          pageVisited: websiteVisits.pageVisited,
          count: count()
        })
        .from(websiteVisits)
        .groupBy(websiteVisits.pageVisited)
        .orderBy(desc(count()))
        .limit(5);
      
      // Calculate percentage increase from last week
      const previousWeekStart = new Date(weekStart);
      previousWeekStart.setDate(previousWeekStart.getDate() - 7);
      
      const previousWeekVisits = await db.select({ count: count() })
        .from(websiteVisits)
        .where(visit => 
          visit.visitDate.gte(previousWeekStart) &&
          visit.visitDate.lt(weekStart)
        );
      
      let visitIncrease = 0;
      if (previousWeekVisits[0].count > 0) {
        visitIncrease = ((weekVisits[0].count - previousWeekVisits[0].count) / previousWeekVisits[0].count) * 100;
      }
      
      return res.status(200).json({
        success: true,
        data: {
          visits: {
            total: totalVisits[0].count,
            today: todayVisits[0].count,
            thisWeek: weekVisits[0].count,
            percentageIncrease: visitIncrease.toFixed(2)
          },
          inquiries: {
            recent: recentInquiries,
            total: recentInquiries.length
          },
          popularPages: popularPages
        }
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while fetching dashboard data"
      });
    }
  });
  
  // Content management endpoints
  router.get("/api/admin/blog", async (req: Request, res: Response) => {
    try {
      const posts = await db
        .select()
        .from(blogPosts)
        .orderBy(desc(blogPosts.createdAt));
      
      return res.status(200).json({
        success: true,
        data: posts
      });
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while fetching blog posts"
      });
    }
  });
  
  router.post("/api/admin/blog", async (req: Request, res: Response) => {
    try {
      const { title, content, excerpt, featuredImage, published, tags } = req.body;
      
      if (!title || !content) {
        return res.status(400).json({
          success: false,
          message: "Title and content are required"
        });
      }
      
      // Generate slug from title
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      
      const [newPost] = await db
        .insert(blogPosts)
        .values({
          title,
          slug,
          content,
          excerpt: excerpt || null,
          authorId: 1, // Default to admin
          featuredImage: featuredImage || null,
          published: published || false,
          tags: tags || [],
          publishedAt: published ? new Date() : null
        })
        .returning();
      
      return res.status(201).json({
        success: true,
        message: "Blog post created successfully",
        data: newPost
      });
    } catch (error) {
      console.error("Error creating blog post:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while creating the blog post"
      });
    }
  });
  
  router.get("/api/admin/blog/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      const [post] = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.id, parseInt(id)));
      
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Blog post not found"
        });
      }
      
      return res.status(200).json({
        success: true,
        data: post
      });
    } catch (error) {
      console.error("Error fetching blog post:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while fetching the blog post"
      });
    }
  });
  
  router.put("/api/admin/blog/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { title, content, excerpt, featuredImage, published, tags } = req.body;
      
      if (!title || !content) {
        return res.status(400).json({
          success: false,
          message: "Title and content are required"
        });
      }
      
      // Get existing post
      const [existingPost] = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.id, parseInt(id)));
      
      if (!existingPost) {
        return res.status(404).json({
          success: false,
          message: "Blog post not found"
        });
      }
      
      // If publishing status changed, update publishedAt date
      const publishedAt = !existingPost.published && published ? new Date() : existingPost.publishedAt;
      
      const [updatedPost] = await db
        .update(blogPosts)
        .set({
          title,
          content,
          excerpt: excerpt || null,
          featuredImage: featuredImage || null,
          published: published || false,
          tags: tags || [],
          publishedAt,
          updatedAt: new Date()
        })
        .where(eq(blogPosts.id, parseInt(id)))
        .returning();
      
      return res.status(200).json({
        success: true,
        message: "Blog post updated successfully",
        data: updatedPost
      });
    } catch (error) {
      console.error("Error updating blog post:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the blog post"
      });
    }
  });
  
  router.delete("/api/admin/blog/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      await db
        .delete(blogPosts)
        .where(eq(blogPosts.id, parseInt(id)));
      
      return res.status(200).json({
        success: true,
        message: "Blog post deleted successfully"
      });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the blog post"
      });
    }
  });
  
  // Media library endpoints
  router.get("/api/admin/media", async (req: Request, res: Response) => {
    try {
      const media = await db
        .select()
        .from(mediaItems)
        .orderBy(desc(mediaItems.createdAt));
      
      return res.status(200).json({
        success: true,
        data: media
      });
    } catch (error) {
      console.error("Error fetching media items:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while fetching media items"
      });
    }
  });
  
  router.post("/api/admin/media/upload", upload.single('file'), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded"
        });
      }
      
      const { description, alt } = req.body;
      const file = req.file;
      
      // Save file info to database
      const [newMedia] = await db
        .insert(mediaItems)
        .values({
          fileName: file.originalname,
          fileType: file.mimetype,
          fileSize: file.size,
          filePath: `/uploads/${file.filename}`,
          description: description || null,
          alt: alt || null,
          uploadedBy: 1, // Default to admin
          metadata: {
            dimensions: { width: 0, height: 0 }, // This would be populated with actual dimensions
            uploadedFrom: req.headers['user-agent']
          }
        })
        .returning();
      
      return res.status(201).json({
        success: true,
        message: "File uploaded successfully",
        data: newMedia
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while uploading the file"
      });
    }
  });
  
  router.delete("/api/admin/media/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      // Get file info before deleting
      const [mediaItem] = await db
        .select()
        .from(mediaItems)
        .where(eq(mediaItems.id, parseInt(id)));
      
      if (!mediaItem) {
        return res.status(404).json({
          success: false,
          message: "Media item not found"
        });
      }
      
      // Delete file from disk
      const filePath = path.join(process.cwd(), 'client/public', mediaItem.filePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      
      // Delete from database
      await db
        .delete(mediaItems)
        .where(eq(mediaItems.id, parseInt(id)));
      
      return res.status(200).json({
        success: true,
        message: "Media item deleted successfully"
      });
    } catch (error) {
      console.error("Error deleting media item:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the media item"
      });
    }
  });
  
  router.put("/api/admin/media/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { description, alt } = req.body;
      
      const [updatedMedia] = await db
        .update(mediaItems)
        .set({
          description,
          alt,
          updatedAt: new Date()
        })
        .where(eq(mediaItems.id, parseInt(id)))
        .returning();
      
      if (!updatedMedia) {
        return res.status(404).json({
          success: false,
          message: "Media item not found"
        });
      }
      
      return res.status(200).json({
        success: true,
        message: "Media item updated successfully",
        data: updatedMedia
      });
    } catch (error) {
      console.error("Error updating media item:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the media item"
      });
    }
  });
  
  // Settings endpoints
  router.get("/api/admin/settings", async (req: Request, res: Response) => {
    try {
      const settings = await db.select().from(siteSettings);
      
      const formattedSettings = settings.reduce((result, setting) => {
        result[setting.settingKey] = {
          value: setting.settingValue,
          type: setting.settingType,
          label: setting.label,
          description: setting.description,
          category: setting.category
        };
        return result;
      }, {} as Record<string, any>);
      
      return res.status(200).json({
        success: true,
        data: formattedSettings
      });
    } catch (error) {
      console.error("Error fetching settings:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while fetching settings"
      });
    }
  });
  
  router.put("/api/admin/settings", async (req: Request, res: Response) => {
    try {
      const { settings } = req.body;
      
      if (!settings || typeof settings !== 'object') {
        return res.status(400).json({
          success: false,
          message: "Settings object is required"
        });
      }
      
      // Update each setting
      for (const [key, value] of Object.entries(settings)) {
        await db
          .update(siteSettings)
          .set({
            settingValue: value as string,
            updatedAt: new Date(),
            updatedBy: 1 // Default to admin
          })
          .where(eq(siteSettings.settingKey, key));
      }
      
      return res.status(200).json({
        success: true,
        message: "Settings updated successfully"
      });
    } catch (error) {
      console.error("Error updating settings:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating settings"
      });
    }
  });
  
  // Track page visits
  router.post("/api/track-visit", async (req: Request, res: Response) => {
    try {
      const { visitorId, pageVisited, referrer } = req.body;
      
      if (!visitorId || !pageVisited) {
        return res.status(400).json({
          success: false,
          message: "Visitor ID and page visited are required"
        });
      }
      
      // Add page visit to database
      await db.insert(websiteVisits).values({
        visitorId,
        pageVisited,
        referrer: referrer || null,
        userAgent: req.headers['user-agent'] || null,
        ipAddress: req.ip || null
      });
      
      return res.status(200).json({
        success: true,
        message: "Visit tracked successfully"
      });
    } catch (error) {
      console.error("Error tracking page visit:", error);
      // Don't fail the request, just log the error
      return res.status(200).json({
        success: true
      });
    }
  });
  
  return router;
}