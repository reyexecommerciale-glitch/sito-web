import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { UserPlus, Shield, AlertCircle, CheckCircle2, Key, Trash2 } from 'lucide-react';

export function AdminManager() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [newPassword, setNewPassword] = useState('');
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    if (!isSupabaseConfigured) {
      setMessage({
        type: 'error',
        text: 'Configura Supabase (URL e anon key) per gestire gli admin.'
      });
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('already registered') || error.message.includes('User already exists')) {
          throw new Error('Un amministratore con questa email esiste già. Non è possibile creare duplicati.');
        }
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

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPasswordLoading(true);
    setPasswordMessage(null);

    if (!isSupabaseConfigured) {
      setPasswordMessage({
        type: 'error',
        text: 'Configura Supabase (URL e anon key) per gestire gli admin.'
      });
      setIsPasswordLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      setPasswordMessage({
        type: 'success',
        text: 'Password aggiornata con successo!'
      });
      setNewPassword('');
    } catch (error: any) {
      setPasswordMessage({
        type: 'error',
        text: error.message || 'Errore durante l\'aggiornamento della password'
      });
    } finally {
      setIsPasswordLoading(false);
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

        <div className="space-y-8">
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Key size={18} /> Cambia la tua Password
            </h3>
            
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Nuova Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                  placeholder="Minimo 6 caratteri"
                />
              </div>

              <button
                type="submit"
                disabled={isPasswordLoading || newPassword.length < 6}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {isPasswordLoading ? 'Aggiornamento...' : 'Aggiorna Password'}
              </button>
            </form>

            {passwordMessage && (
              <div className={`mt-4 p-4 rounded-xl flex items-start gap-3 ${
                passwordMessage.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}>
                {passwordMessage.type === 'success' ? <CheckCircle2 size={20} className="shrink-0 mt-0.5" /> : <AlertCircle size={20} className="shrink-0 mt-0.5" />}
                <p className="text-sm leading-relaxed">{passwordMessage.text}</p>
              </div>
            )}
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-red-400">
              <Trash2 size={18} /> Eliminazione Amministratori
            </h3>
            <p className="text-sm text-text-muted leading-relaxed mb-4">
              Per motivi di sicurezza imposti da Supabase, l'eliminazione di altri account amministratore non può essere effettuata direttamente da questa dashboard pubblica.
            </p>
            <p className="text-sm text-text-muted leading-relaxed">
              Per eliminare un amministratore:
              <br/>1. Accedi alla tua console Supabase
              <br/>2. Vai nella sezione <strong>Authentication</strong> &gt; <strong>Users</strong>
              <br/>3. Clicca sui tre puntini accanto all'utente e seleziona <strong>Delete user</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
