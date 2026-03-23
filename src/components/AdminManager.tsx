import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useContent } from '../context/ContentContext';
import { UserPlus, Shield, AlertCircle, CheckCircle2, Key, Trash2 } from 'lucide-react';

export function AdminManager() {
  const { t } = useContent();
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

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('already registered') || error.message.includes('User already exists')) {
          throw new Error(t('admin.manager.createErrorDuplicate'));
        }
        throw error;
      }

      setMessage({
        type: 'success',
        text: t('admin.manager.createSuccess')
      });
      setEmail('');
      setPassword('');
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.message || t('admin.manager.createErrorGeneric')
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPasswordLoading(true);
    setPasswordMessage(null);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      setPasswordMessage({
        type: 'success',
        text: t('admin.manager.updateSuccess')
      });
      setNewPassword('');
    } catch (error: any) {
      setPasswordMessage({
        type: 'error',
        text: error.message || t('admin.manager.updateError')
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
          <h2 className="text-2xl font-display font-bold">{t('admin.manager.title')}</h2>
          <p className="text-text-muted text-sm mt-1">{t('admin.manager.subtitle')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <UserPlus size={18} /> {t('admin.manager.newAdmin')}
          </h3>
          
          <form onSubmit={handleCreateAdmin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">{t('admin.manager.email')}</label>
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
              <label className="block text-sm font-medium text-text-muted mb-2">{t('admin.manager.password')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                placeholder={t('admin.manager.passwordMin')}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !email || password.length < 6}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary font-medium rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? t('admin.manager.creatingBtn') : t('admin.manager.createBtn')}
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
              <Key size={18} /> {t('admin.manager.changePassword')}
            </h3>
            
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">{t('admin.manager.newPassword')}</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                  placeholder={t('admin.manager.passwordMin')}
                />
              </div>

              <button
                type="submit"
                disabled={isPasswordLoading || newPassword.length < 6}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {isPasswordLoading ? t('admin.manager.updatingBtn') : t('admin.manager.updateBtn')}
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
              <Trash2 size={18} /> {t('admin.manager.deleteTitle')}
            </h3>
            <p className="text-sm text-text-muted leading-relaxed mb-4">
              {t('admin.manager.deleteDesc1')}
            </p>
            <p className="text-sm text-text-muted leading-relaxed whitespace-pre-line">
              {t('admin.manager.deleteDesc2')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
