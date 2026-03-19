import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X, Lock, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Design', path: '/work/design' },
    { name: 'Photography', path: '/work/photography' },
    { name: 'Video', path: '/work/video' },
    { name: 'Music', path: '/work/music' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4 glass' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="text-2xl font-display font-bold tracking-tighter z-50 relative">
          REY<span className="text-accent">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-accent ${
                location.pathname === link.path ? 'text-accent' : 'text-text-main'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="w-px h-4 bg-white/20 mx-2"></div>
          
          <Link 
            to={isAuthenticated ? "/admin/dashboard" : "/admin/login"}
            className="flex items-center gap-2 text-sm font-medium tracking-wide uppercase transition-colors text-text-muted hover:text-accent"
            title={isAuthenticated ? "Admin Dashboard" : "Admin Login"}
          >
            {isAuthenticated ? <Shield size={16} /> : <Lock size={16} />}
            <span className="hidden lg:inline">{isAuthenticated ? 'Admin' : 'Login'}</span>
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden z-50 relative text-text-main hover:text-accent transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Nav */}
        <motion.div 
          initial={false}
          animate={{ 
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? 'auto' : 'none'
          }}
          className="fixed inset-0 bg-primary/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8"
        >
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
              transition={{ delay: isOpen ? i * 0.1 : 0 }}
            >
              <Link 
                to={link.path}
                className={`text-4xl font-display font-bold tracking-tighter hover:text-accent transition-colors ${
                  location.pathname === link.path ? 'text-accent' : 'text-text-main'
                }`}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
            transition={{ delay: isOpen ? navLinks.length * 0.1 : 0 }}
            className="mt-8 pt-8 border-t border-white/10 w-3/4 text-center"
          >
            <Link 
              to={isAuthenticated ? "/admin/dashboard" : "/admin/login"}
              className="flex items-center justify-center gap-3 text-2xl font-display font-bold tracking-tighter text-text-muted hover:text-accent transition-colors"
            >
              {isAuthenticated ? <Shield size={24} /> : <Lock size={24} />}
              {isAuthenticated ? 'Admin Dashboard' : 'Admin Login'}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}
