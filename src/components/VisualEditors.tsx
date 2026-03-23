import React, { useState } from 'react';
import { Plus, Trash2, GripVertical, Image as ImageIcon } from 'lucide-react';

interface DisciplinesEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function DisciplinesEditor({ value, onChange }: DisciplinesEditorProps) {
  let items: any[] = [];
  try {
    items = JSON.parse(value);
  } catch (e) {
    items = [];
  }

  const updateItem = (index: number, field: string, val: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: val };
    onChange(JSON.stringify(newItems, null, 2));
  };

  const addItem = () => {
    const newItems = [...items, { title: 'Nuova Disciplina', desc: 'Descrizione', path: '/work/design', img: '' }];
    onChange(JSON.stringify(newItems, null, 2));
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(JSON.stringify(newItems, null, 2));
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4 relative group">
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="absolute top-4 right-4 p-2 text-text-muted hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
            title="Elimina"
          >
            <Trash2 size={18} />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">Titolo</label>
              <input
                type="text"
                value={item.title || ''}
                onChange={(e) => updateItem(index, 'title', e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">Percorso (URL)</label>
              <input
                type="text"
                value={item.path || ''}
                onChange={(e) => updateItem(index, 'path', e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-text-muted mb-1">Descrizione</label>
              <textarea
                value={item.desc || ''}
                onChange={(e) => updateItem(index, 'desc', e.target.value)}
                rows={2}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-text-muted mb-1">URL Immagine</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={item.img || ''}
                  onChange={(e) => updateItem(index, 'img', e.target.value)}
                  className="flex-1 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
                />
                {item.img && (
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-white/10">
                    <img src={item.img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors text-sm"
      >
        <Plus size={16} /> Aggiungi Disciplina
      </button>
    </div>
  );
}

interface ExpertiseEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function ExpertiseEditor({ value, onChange }: ExpertiseEditorProps) {
  let items: any[] = [];
  try {
    items = JSON.parse(value);
  } catch (e) {
    items = [];
  }

  const updateItemTitle = (index: number, val: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], title: val };
    onChange(JSON.stringify(newItems, null, 2));
  };

  const updateItemSkills = (index: number, skillsStr: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], skills: skillsStr.split(',').map(s => s.trim()).filter(Boolean) };
    onChange(JSON.stringify(newItems, null, 2));
  };

  const addItem = () => {
    const newItems = [...items, { title: 'Nuova Competenza', skills: ['Skill 1', 'Skill 2'] }];
    onChange(JSON.stringify(newItems, null, 2));
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(JSON.stringify(newItems, null, 2));
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4 relative group">
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="absolute top-4 right-4 p-2 text-text-muted hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
            title="Elimina"
          >
            <Trash2 size={18} />
          </button>
          
          <div className="grid grid-cols-1 gap-4 pr-10">
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">Area di Competenza</label>
              <input
                type="text"
                value={item.title || ''}
                onChange={(e) => updateItemTitle(index, e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">Skills (separate da virgola)</label>
              <input
                type="text"
                value={(item.skills || []).join(', ')}
                onChange={(e) => updateItemSkills(index, e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
                placeholder="es. Brand Identity, UI/UX Design, Typography"
              />
            </div>
          </div>
        </div>
      ))}
      
      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors text-sm"
      >
        <Plus size={16} /> Aggiungi Area di Competenza
      </button>
    </div>
  );
}

interface TestimonialsEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function TestimonialsEditor({ value, onChange }: TestimonialsEditorProps) {
  let items: any[] = [];
  try {
    items = JSON.parse(value);
  } catch (e) {
    items = [];
  }

  const updateItem = (index: number, field: string, val: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: val };
    onChange(JSON.stringify(newItems, null, 2));
  };

  const addItem = () => {
    const newItems = [...items, { name: 'Nuovo Cliente', quote: 'Testimonianza...' }];
    onChange(JSON.stringify(newItems, null, 2));
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(JSON.stringify(newItems, null, 2));
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4 relative group">
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="absolute top-4 right-4 p-2 text-text-muted hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
            title="Elimina"
          >
            <Trash2 size={18} />
          </button>
          
          <div className="grid grid-cols-1 gap-4 pr-10">
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">Nome Cliente</label>
              <input
                type="text"
                value={item.name || ''}
                onChange={(e) => updateItem(index, 'name', e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">Testimonianza</label>
              <textarea
                value={item.quote || ''}
                onChange={(e) => updateItem(index, 'quote', e.target.value)}
                rows={3}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
              />
            </div>
          </div>
        </div>
      ))}
      
      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors text-sm"
      >
        <Plus size={16} /> Aggiungi Testimonianza
      </button>
    </div>
  );
}
