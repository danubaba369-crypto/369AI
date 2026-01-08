import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    await storage.createProject({
      title: "ZamZam Electronics",
      description: "A comprehensive e-commerce solution featuring a mobile application and a responsive website. The platform demonstrates versatile development capabilities across retail and luxury sectors.",
      category: "Mobile App & Web Development",
      imageUrl: "/images/zamzam-poster.png",
      gallery: [
        "/images/zamzam-website.png",
        "/images/zamzam-banner.png",
        "/images/zamzam-perfumes.png",
        "/images/zamzam-features.png"
      ],
      platform: "iOS/Android & Web",
      link: "https://play.google.com/store/apps/details?id=co.shopney.zamzamelectronics&hl=en"
    });
    await storage.createProject({
      title: "Danube Properties",
      description: "A premium real estate platform featuring a high-performance mobile application (Danube One) and a comprehensive web portal for property management and investor relations.",
      category: "Mobile App & Web Development",
      imageUrl: "/images/danube-website.png",
      gallery: [
        "/images/danube-app-ios.png",
        "/images/danube-app-android.png"
      ],
      platform: "iOS/Android & Web",
      link: "https://danubeproperties.com/"
    });
    await storage.createProject({
      title: "369 AI Ventures - Identity Design",
      description: "A comprehensive brand identity showcase for 2025, featuring high-end logo designs for diverse sectors including retail, technology, and real estate. Each design reflects our commitment to 'Fueling Vision with Value'.",
      category: "Identity Design & Branding",
      imageUrl: "/images/logos/ahsan-mobiles.png",
      gallery: [
        "/images/logos/al-hajj-mobiles.png",
        "/images/logos/al-hashir-real-estate.png",
        "/images/logos/game-world.png",
        "/images/logos/gamer-tech.png",
        "/images/logos/huniza-computer.png",
        "/images/logos/smart-mobiles.png"
      ],
      platform: "Branding / Year 2025",
      link: "#"
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
