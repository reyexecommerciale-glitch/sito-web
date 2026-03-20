import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

export function Footer() {
  const { content } = useContent();

  return (
    <footer className="py-12 border-t border-white/10 mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-2xl font-display font-bold tracking-tighter">
          {content.footer.name.split(' ')[0].toUpperCase()}<span className="text-accent">.</span>
        </div>
        
        <div className="flex gap-6 text-sm text-text-muted">
          {content.footer.instagram && <a href={content.footer.instagram} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">Instagram</a>}
          {content.footer.behance && <a href={content.footer.behance} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">Behance</a>}
          {content.footer.dribbble && <a href={content.footer.dribbble} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">Dribbble</a>}
          {content.footer.linkedin && <a href={content.footer.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">LinkedIn</a>}
        </div>
        
        <div className="text-sm text-text-muted flex items-center gap-3">
          &copy; {new Date().getFullYear()} {content.footer.name}. {content.footer.copyright}
          <Link to="/admin/login" className="w-2 h-2 rounded-full bg-white/10 hover:bg-accent transition-colors" title="Admin Login" />
        </div>
      </div>
    </footer>
  );
}
