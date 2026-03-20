import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { SiteContent } from '../data/content';

export function ContentEditor() {
  const { content, updateContent } = useContent();
  const [activeSection, setActiveSection] = useState<keyof SiteContent>('home');
  const [formData, setFormData] = useState<any>(content[activeSection]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Update local form data when section changes
  React.useEffect(() => {
    setFormData(content[activeSection]);
  }, [activeSection, content]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate network delay
    setTimeout(() => {
      updateContent(activeSection, formData);
      setIsSaving(false);
      setSaveMessage('Modifiche salvate con successo!');
      setTimeout(() => setSaveMessage(''), 3000);
    }, 500);
  };

  const sections: { id: keyof SiteContent; label: string }[] = [
    { id: 'home', label: 'Home Page' },
    { id: 'about', label: 'Chi Sono (About)' },
    { id: 'work', label: 'Lavori (Work)' },
    { id: 'projectDetail', label: 'Dettaglio Progetto' },
    { id: 'contact', label: 'Contatti' },
    { id: 'footer', label: 'Footer & Social' },
  ];

  const renderFields = () => {
    if (!formData) return null;

    return Object.keys(formData).map((key) => {
      const isTextArea = key.includes('Description') || key.includes('Para') || key.includes('subtitle') || key.includes('Json');
      const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

      return (
        <div key={key} className="mb-4">
          <label className="block text-sm font-medium text-text-muted mb-2">{label}</label>
          {isTextArea ? (
            <textarea
              name={key}
              value={formData[key]}
              onChange={handleChange}
              rows={key.includes('Json') ? 12 : 4}
              className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors ${key.includes('Json') ? 'font-mono text-sm' : ''}`}
            />
          ) : (
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
            />
          )}
        </div>
      );
    });
  };

  return (
    <div className="glass rounded-3xl p-6 md:p-8">
      <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSection === section.id 
                ? 'bg-accent text-white' 
                : 'bg-white/5 text-text-muted hover:bg-white/10 hover:text-white'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6">
          {renderFields()}
        </div>

        <div className="mt-8 flex items-center gap-4">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 bg-white text-primary font-medium rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-70"
          >
            {isSaving ? 'Salvataggio...' : 'Salva Modifiche'}
          </button>
          
          {saveMessage && (
            <span className="text-green-400 text-sm font-medium">{saveMessage}</span>
          )}
        </div>
      </form>
    </div>
  );
}
