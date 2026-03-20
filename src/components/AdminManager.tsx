import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { UserPlus, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';

export function AdminManager() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      setMessage({
        type: 'success',
        text: 'Amministratore creato con successo! Se hai la conferma via email attivata su Supabase, il nuovo utente dovrà confermare l\'indirizzo prima di poter accedere.'
      });
      setEmail('');
      setPassword('');
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.message || 'Errore durante la creazione dell\'amministratore'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass rounded-3xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-6">
        <div className="p-3 bg-accent/20 text-accent rounded-xl">
          <Shield size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold">Gestione Amministratori</h2>
          <p className="text-text-muted text-sm mt-1">Aggiungi nuovi account con privilegi di amministrazione</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <UserPlus size={18} /> Nuovo Amministratore
          </h3>
          
          <form onSubmit={handleCreateAdmin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                placeholder="admin@tuodominio.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                placeholder="Minimo 6 caratteri"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !email || password.length < 6}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary font-medium rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? 'Creazione in corso...' : 'Crea Amministratore'}
            </button>
          </form>

          {message && (
            <div className={`mt-6 p-4 rounded-xl flex items-start gap-3 ${
              message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
              {message.type === 'success' ? <CheckCircle2 size={20} className="shrink-0 mt-0.5" /> : <AlertCircle size={20} className="shrink-0 mt-0.5" />}
              <p className="text-sm leading-relaxed">{message.text}</p>
            </div>
          )}
        </div>

        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 h-fit">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <AlertCircle size={18} className="text-accent" /> Informazioni Importanti
          </h3>
          <ul className="space-y-4 text-sm text-text-muted">
            <li className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2"></div>
              <p>I nuovi amministratori avranno accesso completo a questa dashboard, inclusa la modifica dei progetti e dei testi del sito.</p>
            </li>
            <li className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2"></div>
              <p>Se hai disabilitato la conferma via email nelle impostazioni di Supabase, la creazione di un nuovo utente potrebbe disconnetterti temporaneamente. In tal caso, basterà fare nuovamente il login.</p>
            </li>
            <li className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2"></div>
              <p>Per rimuovere un amministratore o cambiare la sua password, dovrai accedere direttamente alla console del tuo progetto su Supabase (sezione Authentication).</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
