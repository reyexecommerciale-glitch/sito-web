import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="py-12 border-t border-white/10 mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-2xl font-display font-bold tracking-tighter">
          REY<span className="text-accent">.</span>
        </div>
        
        <div className="flex gap-6 text-sm text-text-muted">
          <a href="#" className="hover:text-accent transition-colors">Instagram</a>
          <a href="#" className="hover:text-accent transition-colors">Behance</a>
          <a href="#" className="hover:text-accent transition-colors">Dribbble</a>
          <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
        </div>
        
        <div className="text-sm text-text-muted flex items-center gap-3">
          &copy; {new Date().getFullYear()} Rey Carbone. All rights reserved.
          <Link to="/admin/login" className="w-2 h-2 rounded-full bg-white/10 hover:bg-accent transition-colors" title="Admin Login" />
        </div>
      </div>
    </footer>
  );
}
