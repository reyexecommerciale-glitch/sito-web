import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, Trash2 } from 'lucide-react';
import { Project, ProjectType } from '../data/projects';

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
  projectToEdit?: Project | null;
}

const emptyProject: Project = {
  id: '',
  title: '',
  type: 'design',
  category: '',
  client: '',
  year: new Date().getFullYear().toString(),
  description: '',
  coverImage: '',
  images: [],
  role: ''
};

export function ProjectFormModal({ isOpen, onClose, onSave, projectToEdit }: ProjectFormModalProps) {
  const [formData, setFormData] = useState<Project>(emptyProject);
  const [isCompressing, setIsCompressing] = useState(false);

  useEffect(() => {
    if (projectToEdit) {
      setFormData(projectToEdit);
    } else {
      setFormData(emptyProject);
    }
  }, [projectToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Auto-generate ID from title if it's a new project
      ...(name === 'title' && !projectToEdit ? { id: value.toLowerCase().replace(/[^a-z0-9]+/g, '-') } : {})
    }));
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200;
          let scaleSize = 1;
          if (img.width > MAX_WIDTH) {
            scaleSize = MAX_WIDTH / img.width;
          }
          canvas.width = img.width * scaleSize;
          canvas.height = img.height * scaleSize;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', 0.7)); // Compress to 70% quality JPEG
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'coverImage' | 'images') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsCompressing(true);
    
    try {
      if (field === 'coverImage') {
        const compressed = await compressImage(files[0]);
        setFormData(prev => ({ ...prev, coverImage: compressed }));
      } else {
        const compressedImages = await Promise.all(Array.from(files).map(compressImage));
        setFormData(prev => ({ ...prev, images: [...prev.images, ...compressedImages] }));
      }
    } catch (error) {
      console.error("Error compressing image", error);
      alert("Errore durante il caricamento dell'immagine.");
    } finally {
      setIsCompressing(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.coverImage) {
      alert("Titolo e Immagine di copertina sono obbligatori.");
      return;
    }
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass rounded-3xl p-6 md:p-8 shadow-2xl"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X size={20} />
          </button>

          <h2 className="text-3xl font-display font-bold mb-8">
            {projectToEdit ? 'Modifica Progetto' : 'Nuovo Progetto'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Titolo</label>
                <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">ID (URL Slug)</label>
                <input required type="text" name="id" value={formData.id} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Tipo</label>
                <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none">
                  <option value="design">Design</option>
                  <option value="photography">Fotografia</option>
                  <option value="video">Video</option>
                  <option value="music">Musica</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Categoria (es. Brand Identity)</label>
                <input required type="text" name="category" value={formData.category} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Cliente</label>
                <input type="text" name="client" value={formData.client} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Anno</label>
                <input type="text" name="year" value={formData.year} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none" />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-muted mb-2">Ruolo</label>
                <input type="text" name="role" value={formData.role} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-muted mb-2">Descrizione</label>
                <textarea required name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none resize-none" />
              </div>

              {/* Cover Image */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-muted mb-2">Immagine di Copertina</label>
                <div className="flex items-center gap-4">
                  {formData.coverImage && (
                    <img src={formData.coverImage} alt="Cover preview" className="w-24 h-24 object-cover rounded-xl border border-white/10" />
                  )}
                  <label className="flex-1 flex flex-col items-center justify-center h-24 border-2 border-dashed border-white/20 rounded-xl hover:border-accent hover:bg-white/5 transition-colors cursor-pointer">
                    <Upload size={24} className="text-text-muted mb-2" />
                    <span className="text-sm text-text-muted">Carica immagine</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'coverImage')} />
                  </label>
                </div>
              </div>

              {/* Gallery Images */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-muted mb-2">Galleria Immagini</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  {formData.images.map((img, index) => (
                    <div key={index} className="relative group aspect-square">
                      <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover rounded-xl border border-white/10" />
                      <button 
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-white/20 rounded-xl hover:border-accent hover:bg-white/5 transition-colors cursor-pointer">
                    <Upload size={24} className="text-text-muted mb-2" />
                    <span className="text-xs text-text-muted text-center px-2">Aggiungi immagini</span>
                    <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleImageUpload(e, 'images')} />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
              <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl font-medium text-text-muted hover:text-white transition-colors">
                Annulla
              </button>
              <button type="submit" disabled={isCompressing} className="px-8 py-3 bg-white text-primary rounded-xl font-medium hover:bg-gray-200 transition-colors disabled:opacity-50">
                {isCompressing ? 'Elaborazione...' : 'Salva Progetto'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
