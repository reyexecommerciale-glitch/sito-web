import { PageTransition } from '../components/PageTransition';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';
import { ProjectCard } from '../components/ProjectCard';

export function Home() {
  const { projects } = useProjects();

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary rounded-full mix-blend-screen filter blur-[128px] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full mix-blend-screen filter blur-[128px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-accent font-medium tracking-widest uppercase mb-6">Graphic Designer & Art Director</p>
            </motion.div>
            
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter leading-[0.9] mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              CRAFTING <br />
              <span className="text-gradient">VISUAL</span> <br />
              IDENTITIES.
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-text-muted max-w-2xl mb-12 font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              I transform concepts into compelling visual narratives. Specializing in brand identity, editorial design, and digital experiences.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Link 
                to="/work" 
                className="group relative px-8 py-4 bg-white text-primary font-medium rounded-full overflow-hidden transition-transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                <span className="relative flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  View Selected Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link 
                to="/contact" 
                className="px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-colors"
              >
                Let's Talk
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Selected Work Section */}
      <section className="py-24 md:py-32 relative z-10 bg-primary">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-16">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-display font-bold tracking-tighter"
            >
              SELECTED <br />
              <span className="text-text-muted">PROJECTS</span>
            </motion.h2>
            <Link to="/work" className="hidden md:flex items-center gap-2 text-accent hover:text-white transition-colors font-medium uppercase tracking-wider text-sm">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {projects.slice(0, 4).map((project, index) => (
              <div key={project.id} className={index % 2 !== 0 ? 'md:mt-24' : ''}>
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center md:hidden">
            <Link to="/work" className="flex items-center gap-2 text-accent hover:text-white transition-colors font-medium uppercase tracking-wider text-sm">
              View All Work <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Disciplines Section */}
      <section className="py-24 md:py-32 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold tracking-tighter mb-16"
          >
            CREATIVE <br />
            <span className="text-text-muted">DISCIPLINES</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Design & Art Direction', desc: 'Brand identities, editorial design, and digital experiences.', path: '/work/design', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop' },
              { title: 'Photography', desc: 'Portrait, commercial, and editorial photography.', path: '/work/photography', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop' },
              { title: 'Video Editing', desc: 'Commercials, music videos, and promotional content.', path: '/work/video', img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop' },
              { title: 'Music Production', desc: 'Audio engineering, mixing, and sound design.', path: '/work/music', img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop' }
            ].map((discipline, index) => (
              <motion.div
                key={discipline.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={discipline.path} className="group block relative overflow-hidden rounded-3xl aspect-video">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                  <img 
                    src={discipline.img} 
                    alt={discipline.title} 
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                    <h3 className="text-3xl font-display font-bold mb-2 group-hover:text-accent transition-colors">{discipline.title}</h3>
                    <p className="text-white/80 max-w-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      {discipline.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-24 overflow-hidden border-y border-white/10 bg-black/50">
        <div className="flex whitespace-nowrap">
          <motion.div 
            className="flex gap-8 items-center"
            animate={{ x: [0, -1500] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-8 items-center">
                <span className="text-6xl md:text-8xl font-display font-bold text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>BRANDING</span>
                <span className="text-accent text-4xl">✦</span>
                <span className="text-6xl md:text-8xl font-display font-bold text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>PHOTOGRAPHY</span>
                <span className="text-accent text-4xl">✦</span>
                <span className="text-6xl md:text-8xl font-display font-bold text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>VIDEO EDITING</span>
                <span className="text-accent text-4xl">✦</span>
                <span className="text-6xl md:text-8xl font-display font-bold text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>MUSIC PRODUCTION</span>
                <span className="text-accent text-4xl">✦</span>
                <span className="text-6xl md:text-8xl font-display font-bold text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>UI/UX</span>
                <span className="text-accent text-4xl">✦</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
