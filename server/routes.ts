import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

const allProjects = [
  {
    title: "Niswah Thrift Store",
    description: "A luxury bridal and formal wear e-commerce platform. Features premium collections, rental services, and elegant product storytelling for high-end fashion.",
    category: "E-commerce & Web Development",
    imageUrl: "/images/niswah/hero.png",
    gallery: [
      "/images/niswah/gallery1.png",
      "/images/niswah/gallery2.png",
      "/images/niswah/gallery3.png"
    ],
    platform: "2026 | Web Platform",
    link: "https://www.niswahthriftstore.com/"
  },
  {
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
    platform: "2025 | iOS/Android & Web",
    link: "https://play.google.com/store/apps/details?id=co.shopney.zamzamelectronics&hl=en"
  },
  {
    title: "Danube Properties",
    description: "A premium real estate platform featuring a high-performance mobile application (Danube One) and a comprehensive web portal for property management and investor relations.",
    category: "Mobile App & Web Development",
    imageUrl: "/images/danube-website.png",
    gallery: [
      "/images/danube-app-ios.png",
      "/images/danube-app-android.png"
    ],
    platform: "2025 | iOS/Android & Web",
    link: "https://danubeproperties.com/"
  },
  {
    title: "369AIventures - Identity Design",
    description: "A comprehensive brand identity showcase for 2025, featuring high-end logo designs for diverse sectors including retail, technology, and real estate.",
    category: "Identity Design & Branding",
    imageUrl: "/images/logos/ahsan-mobiles.png",
    gallery: [
      "/images/logos/al-hajj-mobiles.png",
      "/images/logos/al-hashir-real-estate.png",
      "/images/logos/game-world.png",
      "/images/logos/gamer-tech.png",
      "/images/logos/huniza-computer.png",
      "/images/logos/smart-mobiles.png",
      "/images/logos/real-estate-consultants.png"
    ],
    platform: "Branding / Year 2025",
    link: "#"
  },
  {
    title: "Social Media & Content Strategy",
    description: "Comprehensive social media management and content strategy for major brands. Handling high-traffic accounts across YouTube, Facebook, and TikTok.",
    category: "Social Media Management",
    imageUrl: "/images/social/zamzam-brothers-yt.png",
    gallery: [
      "/images/social/daily-dharti-yt.png",
      "/images/social/zr-bazzar-yt.png",
      "/images/social/369-ai-yt.png",
      "/images/social/danu-baba-yt.png",
      "/images/social/sohail-laptops-yt.png",
      "/images/social/zr-bazzar-fb.png",
      "/images/social/daily-dharti-fb.png",
      "/images/social/zamzam-electronics-fb.png",
      "/images/social/zamzam-brothers-tt.png"
    ],
    platform: "2025 | YT/FB/TikTok Management",
    link: "#"
  },
  {
    title: "Sohail Laptops Islamabad",
    description: "A professional e-commerce store for premium laptops and tech gear. Optimized for high performance and seamless user experience in the tech retail market.",
    category: "E-commerce & Web Development",
    imageUrl: "/images/sohail/hero.png",
    gallery: [
      "/images/sohail/gallery1.png",
      "/images/sohail/gallery2.png"
    ],
    platform: "2026 | Shopify Platform",
    link: "https://sohail-laptops.myshopify.com/"
  }
];

async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  const existingTitles = existingProjects.map(p => p.title);
  
  for (const project of allProjects) {
    if (!existingTitles.includes(project.title)) {
      await storage.createProject(project);
    }
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

  app.post(api.projects.create.path, async (req, res) => {
    try {
      const project = await storage.createProject(req.body);
      res.status(201).json(project);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  });

  app.patch(api.projects.update.path, async (req, res) => {
    try {
      const project = await storage.updateProject(Number(req.params.id), req.body);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      res.json(project);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  });

  app.delete(api.projects.delete.path, async (req, res) => {
    const success = await storage.deleteProject(Number(req.params.id));
    if (!success) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(204).send();
  });

  app.post(api.admin.login.path, async (req, res) => {
    const { password } = req.body;
    // Simple static password for now. In a real app, use environment variables.
    if (password === '369admin2025') {
      res.json({ success: true });
    } else {
      res.status(401).json({ message: 'Invalid password' });
    }
  });

  return httpServer;
}
