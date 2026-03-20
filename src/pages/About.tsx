import { PageTransition } from '../components/PageTransition';
import { motion } from 'motion/react';
import { useContent } from '../context/ContentContext';

export function About() {
  const { content } = useContent();

  return (
    <PageTransition>
      <section className="pt-32 pb-24 md:pt-48 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-8">
                {content.about.titleLine1} <span className="text-gradient">{content.about.titleLine2}</span>
              </h1>
              
              <div className="space-y-6 text-lg md:text-xl text-text-muted font-light">
                <p>{content.about.descriptionPara1}</p>
                <p>{content.about.descriptionPara2}</p>
                <p>{content.about.descriptionPara3}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary to-accent rounded-3xl transform rotate-3 opacity-50 blur-lg" />
              <img 
                src={content.about.imageUrl} 
                alt="Rey Carbone Studio" 
                className="relative z-10 rounded-3xl w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          <div className="mt-32">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-display font-bold tracking-tighter mb-16"
            >
              {content.about.expertiseTitle}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {(() => {
                try {
                  const expertiseCategories = JSON.parse(content.about.expertiseJson);
                  return expertiseCategories.map((category: any, catIndex: number) => (
                    <motion.div 
                      key={category.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIndex * 0.1 }}
                      className="glass p-8 rounded-3xl"
                    >
                      <h3 className="text-2xl font-display font-bold mb-6 text-accent">{category.title}</h3>
                      <div className="flex flex-wrap gap-3">
                        {category.skills.map((skill: string, index: number) => (
                          <div
                            key={skill}
                            className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/80 text-sm font-medium"
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ));
                } catch (e) {
                  return <p className="text-red-500">Error loading expertise data.</p>;
                }
              })()}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
