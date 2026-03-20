import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { useProjects } from '../context/ProjectContext';
import { PageTransition } from '../components/PageTransition';
import { ProjectCard } from '../components/ProjectCard';

export function CustomPageViewer() {
  const { slug } = useParams<{ slug: string }>();
  const { content } = useContent();
  const { projects } = useProjects();
  
  const page = content.customPages?.find(p => p.slug === slug);
  
  if (!page) {
    return <Navigate to="/" replace />;
  }

  return (
    <PageTransition>
      <div className="pt-32 pb-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {page.blocks.map((block) => {
            switch (block.type) {
              case 'hero':
                return (
                  <div key={block.id} className="mb-24 relative rounded-3xl overflow-hidden bg-white/5">
                    {block.content.image && (
                      <div className="absolute inset-0 z-0">
                        <img src={block.content.image} alt="" className="w-full h-full object-cover opacity-30" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                      </div>
                    )}
                    <div className="relative z-10 p-12 md:p-24 text-center">
                      {block.content.subtitle && (
                        <p className="text-accent font-medium tracking-wider uppercase mb-6">
                          {block.content.subtitle}
                        </p>
                      )}
                      {block.content.title && (
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold">
                          {block.content.title}
                        </h1>
                      )}
                    </div>
                  </div>
                );
              
              case 'text':
                return (
                  <div key={block.id} className="mb-16 max-w-3xl mx-auto">
                    <p className="text-lg md:text-xl text-text-muted leading-relaxed whitespace-pre-wrap">
                      {block.content.text}
                    </p>
                  </div>
                );
              
              case 'image':
                return (
                  <div key={block.id} className="mb-16">
                    {block.content.url && (
                      <figure>
                        <img src={block.content.url} alt={block.content.caption || ''} className="w-full rounded-2xl" referrerPolicy="no-referrer" />
                        {block.content.caption && (
                          <figcaption className="text-center text-sm text-text-muted mt-4">
                            {block.content.caption}
                          </figcaption>
                        )}
                      </figure>
                    )}
                  </div>
                );
                
              case 'gallery':
                return (
                  <div key={block.id} className="mb-16">
                    {Array.isArray(block.content.images) && block.content.images.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {block.content.images.map((url: string, index: number) => (
                          <div key={index} className="aspect-square rounded-xl overflow-hidden">
                            <img src={url} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
                
              case 'video':
                return (
                  <div key={block.id} className="mb-16">
                    {block.content.url && (
                      <div className="aspect-video rounded-2xl overflow-hidden bg-black/20">
                        {block.content.url.includes('youtube.com') || block.content.url.includes('youtu.be') ? (
                          <iframe 
                            src={`https://www.youtube.com/embed/${block.content.url.split('v=')[1]?.split('&')[0] || block.content.url.split('youtu.be/')[1]}`} 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                            className="w-full h-full"
                          ></iframe>
                        ) : block.content.url.includes('vimeo.com') ? (
                          <iframe 
                            src={`https://player.vimeo.com/video/${block.content.url.split('vimeo.com/')[1]}`} 
                            title="Vimeo video player" 
                            frameBorder="0" 
                            allow="autoplay; fullscreen; picture-in-picture" 
                            allowFullScreen
                            className="w-full h-full"
                          ></iframe>
                        ) : (
                          <video src={block.content.url} controls className="w-full h-full object-cover" />
                        )}
                      </div>
                    )}
                  </div>
                );
              
              case 'projects':
                return (
                  <div key={block.id} className="mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                      {projects.map((project, index) => (
                        <div key={project.id} className={index % 2 !== 0 ? 'md:mt-24' : ''}>
                          <ProjectCard project={project} index={index} />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              
              default:
                return null;
            }
          })}
        </div>
      </div>
    </PageTransition>
  );
}
