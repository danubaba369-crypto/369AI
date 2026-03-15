import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useProjects } from "@/hooks/use-projects";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, X, Check, ExternalLink } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import type { Project, InsertProject } from "@shared/schema";

export default function Admin() {
  const [, setLocation] = useLocation();
  const { data: projects, isLoading } = useProjects();
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const isAuth = localStorage.getItem("admin_auth");
    if (isAuth !== "true") {
      setLocation("/login");
    }
  }, [setLocation]);

  const logout = () => {
    localStorage.removeItem("admin_auth");
    setLocation("/login");
  };

  const createMutation = useMutation({
    mutationFn: async (project: InsertProject) => {
      const res = await fetch(api.projects.create.path, {
        method: api.projects.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });
      if (!res.ok) throw new Error("Failed to create project");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setIsAddingProject(false);
      toast({ title: "Project created", description: "Successfully added new project." });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertProject> }) => {
      const res = await fetch(buildUrl(api.projects.update.path, { id }), {
        method: api.projects.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update project");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setEditingProject(null);
      toast({ title: "Project updated", description: "Successfully updated project details." });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(buildUrl(api.projects.delete.path, { id }), {
        method: api.projects.delete.method,
      });
      if (!res.ok) throw new Error("Failed to delete project");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({ title: "Project deleted", description: "Project has been removed." });
    },
  });

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: any = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      imageUrl: formData.get("imageUrl"),
      platform: formData.get("platform"),
      link: formData.get("link"),
      gallery: [], // Default to empty gallery for now
    };

    if (editingProject?.id) {
      updateMutation.mutate({ id: editingProject.id, data });
    } else {
      createMutation.mutate(data as InsertProject);
    }
  };

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-display font-bold text-white mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your portfolio projects and content.</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setIsAddingProject(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-white hover:text-black transition-all"
              >
                <Plus size={20} /> Add Project
              </button>
              <button
                onClick={logout}
                className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {projects?.map((project: Project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-secondary rounded-2xl border border-white/10 overflow-hidden group hover:border-primary/30 transition-all flex flex-col"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button 
                        onClick={() => setEditingProject(project)}
                        className="p-2 rounded-lg bg-black/50 backdrop-blur-md text-white hover:bg-primary transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this project?")) {
                            deleteMutation.mutate(project.id);
                          }
                        }}
                        className="p-2 rounded-lg bg-black/50 backdrop-blur-md text-white hover:bg-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="text-xs font-bold text-primary tracking-wider uppercase mb-2">{project.category}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="text-xs text-muted-foreground">{project.platform}</span>
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noreferrer" className="text-primary hover:text-white transition-colors">
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Modal for Adding/Editing */}
      <AnimatePresence>
        {(isAddingProject || editingProject) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setIsAddingProject(false); setEditingProject(null); }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-secondary border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-white">
                    {editingProject ? "Edit Project" : "Add New Project"}
                  </h2>
                  <button 
                    onClick={() => { setIsAddingProject(false); setEditingProject(null); }}
                    className="p-2 text-muted-foreground hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">Title</label>
                      <input 
                        name="title" 
                        defaultValue={editingProject?.title} 
                        required 
                        className="w-full px-4 py-3 rounded-xl bg-background border border-white/10 text-white focus:ring-2 focus:ring-primary/50 outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">Category</label>
                      <input 
                        name="category" 
                        defaultValue={editingProject?.category} 
                        required 
                        className="w-full px-4 py-3 rounded-xl bg-background border border-white/10 text-white focus:ring-2 focus:ring-primary/50 outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">Image URL</label>
                      <input 
                        name="imageUrl" 
                        defaultValue={editingProject?.imageUrl} 
                        required 
                        className="w-full px-4 py-3 rounded-xl bg-background border border-white/10 text-white focus:ring-2 focus:ring-primary/50 outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">Platform / Year</label>
                      <input 
                        name="platform" 
                        defaultValue={editingProject?.platform || ""} 
                        className="w-full px-4 py-3 rounded-xl bg-background border border-white/10 text-white focus:ring-2 focus:ring-primary/50 outline-none" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Project Link</label>
                    <input 
                      name="link" 
                      defaultValue={editingProject?.link || ""} 
                      className="w-full px-4 py-3 rounded-xl bg-background border border-white/10 text-white focus:ring-2 focus:ring-primary/50 outline-none" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Description</label>
                    <textarea 
                      name="description" 
                      rows={4} 
                      defaultValue={editingProject?.description} 
                      required 
                      className="w-full px-4 py-3 rounded-xl bg-background border border-white/10 text-white focus:ring-2 focus:ring-primary/50 outline-none resize-none"
                    ></textarea>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={createMutation.isPending || updateMutation.isPending}
                      className="flex-grow py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
                    >
                      {(createMutation.isPending || updateMutation.isPending) ? (
                        "Saving..."
                      ) : (
                        <><Check size={20} /> Save Project</>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setIsAddingProject(false); setEditingProject(null); }}
                      className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
