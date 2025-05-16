import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission route
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const contactData = insertContactSchema.parse(req.body);
      
      // Store the contact submission
      await storage.createContactSubmission(contactData);
      
      // Return success
      return res.status(200).json({
        success: true,
        message: "Contact form submitted successfully"
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          success: false,
          message: validationError.message
        });
      }
      
      console.error("Error submitting contact form:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to submit contact form"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
