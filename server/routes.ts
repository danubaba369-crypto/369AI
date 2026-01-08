import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    await storage.createProject({
      title: "ZamZam Electronics",
      description: "A comprehensive e-commerce solution featuring a mobile application and a responsive website. The platform includes real estate and perfume sections, demonstrating versatile development capabilities.",
      category: "Mobile App & Web Development",
      imageUrl: "/images/zamzam-poster.png",
      gallery: [
        "/images/zamzam-website.png",
        "/images/zamzam-banner.png",
        "/images/zamzam-perfumes.png",
        "/images/danube-properties.png",
        "/images/zamzam-features.png"
      ],
      platform: "iOS/Android & Web",
      link: "https://play.google.com/store/apps/details?id=co.shopney.zamzamelectronics&hl=en"
    });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed the database
  await seedDatabase();

  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const project = await storage.getProject(Number(req.params.id));
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  });

  return httpServer;
}
