import { projects, type Project, type InsertProject } from "../shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db
      .insert(projects)
      .values(insertProject)
      .returning();
    return project;
  }

  async updateProject(id: number, insertProject: Partial<InsertProject>): Promise<Project | undefined> {
    const [project] = await db
      .update(projects)
      .set(insertProject)
      .where(eq(projects.id, id))
      .returning();
    return project;
  }

  async deleteProject(id: number): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id));
    return true; // Simple approach for now
  }
}

export class MemStorage implements IStorage {
  private projects: Map<number, Project>;
  private idCounter: number;

  constructor() {
    this.projects = new Map();
    this.idCounter = 1;

    // Seed some initial data for local preview
    this.seed();
  }

  private seed() {
    const initialProjects: InsertProject[] = [
      {
        title: "ZamZam Electronics E-commerce",
        description: "A high-performance e-commerce platform for electronic goods.",
        category: "E-commerce",
        imageUrl: "/images/zamzam-banner.png",
        gallery: [],
        platform: "Web & Mobile",
        link: "https://zamzamelectronics.com"
      },
      {
        title: "369AIventures - Identity Design",
        description: "A comprehensive brand identity showcase for 2025.",
        category: "Identity Design & Branding",
        imageUrl: "/images/logos/ahsan-mobiles.png",
        gallery: [],
        platform: "Design",
        link: "https://369AIventures.com/"
      }
    ];

    initialProjects.forEach(p => this.createProject(p as any));
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.idCounter++;
    const project: Project = { ...insertProject, id } as any;
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, insertProject: Partial<InsertProject>): Promise<Project | undefined> {
    const existing = this.projects.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...insertProject };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }
}

export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
