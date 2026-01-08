import { useRoute } from "wouter";
import { useProject } from "@/hooks/use-projects";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { ArrowLeft, ExternalLink, Smartphone, Globe, Calendar, Layers } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectDetail() {
  const [, params] = useRoute("/projects/:id");
  const id = params ? parseInt(params.id) : 0;
  const { data: project, isLoading } = useProject(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <Link href="/projects" className="text-primary hover:underline">Return to Portfolio</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <article className="pt-32 pb-24">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <Link 
            href="/projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={18} /> Back to Projects
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div>
              <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-sm font-medium mb-4">
                {project.category}
              </div>
              <h1 className="text-4xl lg:text-6xl font-display font-bold text-white mb-6">
                {project.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <a 
                href={project.link || "#"} 
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-white hover:text-black transition-all ${!project.link && "opacity-50 cursor-not-allowed pointer-events-none"}`}
              >
                Visit Live Project <ExternalLink size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Main Image */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-auto object-cover max-h-[700px]"
            />
          </motion.div>
        </div>

        {/* Project Info Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-secondary rounded-2xl border border-white/5">
              <div className="flex items-center gap-3 mb-2 text-primary">
                <Layers size={24} />
                <span className="font-bold">Platform</span>
              </div>
              <p className="text-white font-medium">{project.platform || "Web & Mobile"}</p>
            </div>
            
            <div className="p-6 bg-secondary rounded-2xl border border-white/5">
              <div className="flex items-center gap-3 mb-2 text-primary">
                <Globe size={24} />
                <span className="font-bold">Category</span>
              </div>
              <p className="text-white font-medium">{project.category}</p>
            </div>

            <div className="p-6 bg-secondary rounded-2xl border border-white/5">
              <div className="flex items-center gap-3 mb-2 text-primary">
                <Calendar size={24} />
                <span className="font-bold">Year</span>
              </div>
              <p className="text-white font-medium">2024</p>
            </div>

            <div className="p-6 bg-secondary rounded-2xl border border-white/5">
              <div className="flex items-center gap-3 mb-2 text-primary">
                <Smartphone size={24} />
                <span className="font-bold">Status</span>
              </div>
              <p className="text-white font-medium">Completed</p>
            </div>
          </div>
        </div>

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-display font-bold text-white mb-12">Project Gallery</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {project.gallery.map((img, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl overflow-hidden border border-white/5 group bg-secondary"
                >
                  <img 
                    src={img} 
                    alt={`Gallery ${i + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </article>

      <Footer />
    </div>
  );
}
