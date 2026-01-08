import { Project } from "@shared/schema";
import { Link } from "wouter";
import { ArrowUpRight, Smartphone, Globe } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative flex flex-col h-full bg-secondary rounded-2xl overflow-hidden border border-white/5 hover:border-primary/30 transition-colors"
    >
      <div className="relative aspect-video overflow-hidden bg-black/50">
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60" />
        
        <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-primary border border-primary/20 shadow-lg">
          {project.category}
        </div>
      </div>

      <div className="flex-1 p-6 md:p-8 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          {project.platform?.includes("Mobile") || project.category === "Mobile App" ? (
            <Smartphone className="w-5 h-5 text-muted-foreground" />
          ) : (
            <Globe className="w-5 h-5 text-muted-foreground" />
          )}
          <span className="text-sm text-muted-foreground font-medium">
            {project.platform || "Cross-platform"}
          </span>
        </div>

        <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground line-clamp-3 mb-6 flex-1">
          {project.description}
        </p>

        <Link 
          href={`/projects/${project.id}`}
          className="inline-flex items-center gap-2 text-white font-semibold group/link"
        >
          View Case Study
          <ArrowUpRight className="w-4 h-4 text-primary transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
        </Link>
      </div>
    </motion.div>
  );
}
