import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PageTransition } from '../components/PageTransition';
import { motion } from 'motion/react';
import { Lock } from 'lucide-react';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    const result = await login(email, password);
    
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      let errorMessage = result.error || 'Credenziali non valide';
      
      // Controllo specifico per errori di rete o configurazione mancante
      if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
        errorMessage = 'Errore di rete: Verifica di aver inserito VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY nei Secrets (⚙️ in alto a destra) e che l\'URL sia corretto.';
      }
      
      setError(errorMessage);
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <section className="min-h-screen flex items-center justify-center pt-20 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-8 md:p-12 rounded-3xl w-full max-w-md relative overflow-hidden"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full glass flex items-center justify-center text-accent mx-auto mb-6">
              <Lock size={28} />
            </div>
            <h1 className="text-3xl font-display font-bold mb-2">Admin Access</h1>
            <p className="text-text-muted text-sm">Area riservata per Rey Carbone</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2 uppercase tracking-wider">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                placeholder="Inserisci email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2 uppercase tracking-wider">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                placeholder="Inserisci password"
                required
              />
            </div>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-white text-primary font-medium rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-70"
            >
              {isSubmitting ? 'Accesso in corso...' : 'Accedi'}
            </button>
          </form>
        </motion.div>
      </section>
    </PageTransition>
  );
}
