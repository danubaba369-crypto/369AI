import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useProjects } from "@/hooks/use-projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Smartphone, Code, Database, ChevronRight, Globe } from "lucide-react";

// Images from user request
import heroBg from "/images/zamzam-banner.png"; // Assuming dynamic for now based on instructions, but imported as string for src

export default function Home() {
  const { data: projects, isLoading } = useProjects();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Available for new projects
              </div>
              <h1 className="text-5xl lg:text-7xl font-display font-bold text-white leading-[1.1] mb-6">
                369 AI <br />
                <span className="text-gradient">Ventures</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Expert software engineering solutions by 369 AI Ventures. Specializing in high-performance mobile applications for ZamZam Electronics and beyond.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/projects"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-white hover:text-black transition-all hover:translate-y-[-2px] hover:shadow-lg hover:shadow-primary/25"
                >
                  View Our Work
                </Link>
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-sm"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)] bg-secondary aspect-[4/3] group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent z-10 pointer-events-none" />
                <img 
                  src="/images/zamzam-poster.png" 
                  alt="ZamZam Poster" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-secondary/80 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl max-w-xs">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Mobile Expert</h4>
                    <p className="text-xs text-muted-foreground">iOS & Android Solutions</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-secondary/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">What I Do</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Delivering end-to-end development services from concept to deployment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Smartphone className="w-8 h-8 text-primary" />,
                title: "Mobile Development",
                description: "Native and cross-platform mobile apps built with React Native and Flutter. Performance-first approach."
              },
              {
                icon: <Globe className="w-8 h-8 text-primary" />,
                title: "E-commerce Solutions",
                description: "Full-scale online stores with real-time inventory, secure checkout, and multi-category management as seen in ZamZam Electronics."
              },
              {
                icon: <Database className="w-8 h-8 text-primary" />,
                title: "Social Media Management",
                description: "Comprehensive content strategy and account management for high-traffic brands on YouTube, Facebook, and TikTok."
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-secondary border border-white/5 hover:border-primary/20 transition-all group"
              >
                <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">Featured Work</h2>
              <p className="text-muted-foreground">Showcasing recent success stories</p>
            </div>
            <Link 
              href="/projects" 
              className="hidden md:inline-flex items-center gap-2 text-primary hover:text-white transition-colors font-medium"
            >
              View All Projects <ArrowRight size={18} />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-secondary rounded-2xl h-[400px] animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {projects?.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center md:hidden">
            <Link 
              href="/projects" 
              className="inline-flex items-center gap-2 text-primary font-medium"
            >
              View All Projects <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="max-w-4xl mx-auto px-4 relative text-center">
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6">
            Ready to bring your ideas to life?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Let's discuss how we can build something amazing for your business.
          </p>
          <a 
            href="https://wa.me/923205992687"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-white hover:text-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            Start a Conversation
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
