import { useParams, Link, Navigate } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { useProjects } from '../context/ProjectContext';
import { useContent } from '../context/ContentContext';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { projects } = useProjects();
  const { content } = useContent();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  return (
    <PageTransition>
      <article className="pt-24 pb-32">
        {/* Hero Image */}
        <div className="w-full h-[60vh] md:h-[80vh] relative">
          <motion.img 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            src={project.coverImage} 
            alt={project.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-7xl mx-auto">
            <Link to={`/work/${project.type}`} className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors">
              <ArrowLeft size={16} /> {content.projectDetail.backToText} {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-accent font-medium tracking-widest uppercase mb-4">{project.category}</p>
              <h1 className="text-4xl md:text-7xl font-display font-bold tracking-tighter text-white">
                {project.title}
              </h1>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 md:mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Project Info */}
            <div className="lg:col-span-4 order-2 lg:order-1">
              <div className="glass p-8 rounded-2xl sticky top-32">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm text-text-muted uppercase tracking-wider mb-1">{content.projectDetail.clientLabel}</h4>
                    <p className="text-lg font-medium">{project.client}</p>
                  </div>
                  <div className="w-full h-px bg-white/10" />
                  <div>
                    <h4 className="text-sm text-text-muted uppercase tracking-wider mb-1">{content.projectDetail.roleLabel}</h4>
                    <p className="text-lg font-medium">{project.role}</p>
                  </div>
                  <div className="w-full h-px bg-white/10" />
                  <div>
                    <h4 className="text-sm text-text-muted uppercase tracking-wider mb-1">{content.projectDetail.yearLabel}</h4>
                    <p className="text-lg font-medium">{project.year}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Description & Images */}
            <div className="lg:col-span-8 order-1 lg:order-2">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xl md:text-2xl text-text-muted font-light leading-relaxed mb-16"
              >
                {project.description}
              </motion.p>

              <div className="space-y-8 md:space-y-16">
                {project.images.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                  >
                    <img 
                      src={img} 
                      alt={`${project.title} detail ${idx + 1}`} 
                      className="w-full rounded-2xl"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </PageTransition>
  );
}
