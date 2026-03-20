import { useParams, Link } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { motion } from 'motion/react';
import { useProjects } from '../context/ProjectContext';
import { useContent } from '../context/ContentContext';
import { ProjectCard } from '../components/ProjectCard';

export function Work() {
  const { category } = useParams<{ category: string }>();
  const { projects } = useProjects();
  const { content } = useContent();
  
  const validCategories = ['design', 'photography', 'video', 'music'];
  const currentCategory = category && validCategories.includes(category) ? category : null;
  
  const filteredProjects = currentCategory 
    ? projects.filter(p => p.type === currentCategory)
    : projects;

  const title = currentCategory ? currentCategory.toUpperCase() : 'ALL WORK';

  const categories = [
    { name: 'All', path: '/work' },
    { name: 'Design', path: '/work/design' },
    { name: 'Photography', path: '/work/photography' },
    { name: 'Video', path: '/work/video' },
    { name: 'Music', path: '/work/music' },
  ];

  return (
    <PageTransition>
      <section className="pt-32 pb-24 md:pt-48 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter mb-6">
              {currentCategory ? (
                <>{title}</>
              ) : (
                <>{content.work.titleLine1} <span className="text-gradient">{content.work.titleLine2}</span></>
              )}
            </h1>
            <p className="text-xl text-text-muted max-w-2xl font-light mb-12">
              {content.work.description}
            </p>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-4">
              {categories.map(cat => {
                const isActive = (currentCategory === cat.name.toLowerCase()) || (!currentCategory && cat.name === 'All');
                return (
                  <Link 
                    key={cat.name} 
                    to={cat.path}
                    className={`px-6 py-2 rounded-full border transition-all duration-300 ${
                      isActive
                        ? 'bg-white text-primary border-white font-medium'
                        : 'border-white/20 text-text-muted hover:text-white hover:border-white/50'
                    }`}
                  >
                    {cat.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {filteredProjects.map((project, index) => (
                <div key={project.id} className={index % 2 !== 0 ? 'md:mt-24' : ''}>
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center text-text-muted">
              <p className="text-xl">{content.work.emptyStateText}</p>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
