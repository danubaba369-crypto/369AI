import { useRoute } from "wouter";
import { useProject } from "@/hooks/use-projects";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { ArrowLeft, ExternalLink, Globe, Info, Layers, CheckCircle } from "lucide-react";
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <CheckCircle size={24} />
                <span className="font-bold">Status</span>
              </div>
              <p className="text-white font-medium">Completed</p>
            </div>
          </div>
        </div>

        {/* Project Description & Details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="bg-secondary/50 rounded-3xl p-8 lg:p-12 border border-white/5">
            <div className="flex items-center gap-3 mb-6 text-primary">
              <Info size={28} />
              <h2 className="text-2xl font-display font-bold text-white">Project Information</h2>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                This project was developed by 369AIventures to deliver a high-performance solution tailored to the client's specific needs. Our team focused on creating an intuitive user experience, robust backend architecture, and a visually stunning interface that aligns with modern industry standards.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-white font-bold mb-4">Key Features</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Custom Design Architecture
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Responsive Across All Devices
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      High Performance Optimization
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-4">Our Approach</h3>
                  <p className="text-muted-foreground">
                    Leveraging the latest technologies, we ensured that {project.title} provides a seamless experience for its users while maintaining the brand's premium identity.
                  </p>
                </div>
              </div>
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
