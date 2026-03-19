import { PageTransition } from '../components/PageTransition';
import { motion } from 'motion/react';
import { ArrowRight, Mail, MapPin, CheckCircle2, Loader2 } from 'lucide-react';
import { useState, FormEvent, ChangeEvent } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate API call for form submission
    setTimeout(() => {
      window.location.href = `mailto:hello@reycarbone.design?subject=Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${encodeURIComponent(formData.email)}`;
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }, 800);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <PageTransition>
      <section className="pt-32 pb-24 md:pt-48 md:pb-32 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter mb-6">
                LET'S <br />
                <span className="text-gradient">CREATE</span> <br />
                TOGETHER.
              </h1>
              <p className="text-xl text-text-muted font-light mb-12 max-w-md">
                Currently available for freelance projects and exciting collaborations. Reach out and let's make something beautiful.
              </p>

              <div className="space-y-8">
                <div className="flex items-center gap-4 text-lg">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-accent">
                    <Mail size={20} />
                  </div>
                  <a href="mailto:hello@reycarbone.design" className="hover:text-accent transition-colors">
                    hello@reycarbone.design
                  </a>
                </div>
                <div className="flex items-center gap-4 text-lg">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-accent">
                    <MapPin size={20} />
                  </div>
                  <span className="text-text-muted">Brooklyn, New York</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass p-8 md:p-12 rounded-3xl relative overflow-hidden"
            >
              {/* Success Overlay */}
              <motion.div 
                initial={{ opacity: 0, pointerEvents: 'none' }}
                animate={{ 
                  opacity: status === 'success' ? 1 : 0,
                  pointerEvents: status === 'success' ? 'auto' : 'none'
                }}
                className="absolute inset-0 bg-primary/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-8"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: status === 'success' ? 1 : 0.8 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                >
                  <CheckCircle2 size={64} className="text-accent mb-6 mx-auto" />
                  <h3 className="text-3xl font-display font-bold mb-2">Message Sent!</h3>
                  <p className="text-text-muted">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                </motion.div>
              </motion.div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-muted mb-2 uppercase tracking-wider">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-2 uppercase tracking-wider">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-muted mb-2 uppercase tracking-wider">Message</label>
                  <textarea 
                    id="message" 
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full group relative px-8 py-4 bg-white text-primary font-medium rounded-xl overflow-hidden transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
                >
                  <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                  <span className="relative flex items-center justify-center gap-2 group-hover:text-white transition-colors duration-300">
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        Send Message <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
