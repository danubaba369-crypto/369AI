import { pgTable, text, serial, varchar, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // "Mobile App" | "Web Development"
  imageUrl: text("image_url").notNull(),
  gallery: text("gallery").array(), // Array of image URLs
  platform: text("platform"), // e.g. "iOS/Android", "Web"
  link: text("link"),
});

export const insertProjectSchema = createInsertSchema(projects);

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
