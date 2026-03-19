import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl aspect-[4/5] md:aspect-[3/4] bg-white/5"
    >
      <Link to={`/project/${project.id}`} className="block w-full h-full">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />
        
        <motion.img 
          src={project.coverImage} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent opacity-80 z-20" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 z-30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <p className="text-accent font-medium text-sm tracking-wider uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {project.category}
          </p>
          <h3 className="text-3xl font-display font-bold text-white mb-2">
            {project.title}
          </h3>
          <div className="w-12 h-1 bg-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-200" />
        </div>
      </Link>
    </motion.div>
  );
}
