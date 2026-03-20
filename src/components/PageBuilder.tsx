import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { CustomPage, PageBlock, BlockType } from '../data/content';
import { Plus, Trash2, Edit2, ChevronDown, ChevronUp, Save, X } from 'lucide-react';

export function PageBuilder() {
  const { content, updateContent } = useContent();
  const [pages, setPages] = useState<CustomPage[]>(content.customPages || []);
  const [editingPageId, setEditingPageId] = useState<string | null>(null);

  const savePages = (newPages: CustomPage[]) => {
    setPages(newPages);
    updateContent('customPages', newPages);
  };

  const handleAddPage = () => {
    const newPage: CustomPage = {
      id: Date.now().toString(),
      title: 'Nuova Pagina',
      slug: `nuova-pagina-${Date.now()}`,
      blocks: []
    };
    savePages([...pages, newPage]);
    setEditingPageId(newPage.id);
  };

  const handleDeletePage = (id: string) => {
    if (window.confirm('Sei sicuro di voler eliminare questa pagina?')) {
      savePages(pages.filter(p => p.id !== id));
      if (editingPageId === id) setEditingPageId(null);
    }
  };

  if (editingPageId) {
    const page = pages.find(p => p.id === editingPageId);
    if (!page) return null;
    return <PageEditor page={page} onSave={(updated) => {
      savePages(pages.map(p => p.id === updated.id ? updated : p));
      setEditingPageId(null);
    }} onCancel={() => setEditingPageId(null)} />;
  }

  return (
    <div className="glass rounded-3xl p-6 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-display font-bold">Pagine Personalizzate</h2>
          <p className="text-text-muted text-sm mt-1">Crea e gestisci nuove pagine per il tuo sito</p>
        </div>
        <button 
          onClick={handleAddPage}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/80 transition-colors text-sm md:text-base"
        >
          <Plus size={18} /> Nuova Pagina
        </button>
      </div>

      <div className="space-y-4">
        {pages.map(page => (
          <div key={page.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between hover:bg-white/10 transition-colors">
            <div>
              <h3 className="font-medium text-lg">{page.title}</h3>
              <p className="text-sm text-text-muted">/{page.slug}</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setEditingPageId(page.id)} className="p-2 hover:text-accent transition-colors" title="Modifica">
                <Edit2 size={18} />
              </button>
              <button onClick={() => handleDeletePage(page.id)} className="p-2 hover:text-red-400 transition-colors" title="Elimina">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        {pages.length === 0 && (
          <div className="text-center py-12 text-text-muted border border-dashed border-white/10 rounded-xl">
            Nessuna pagina personalizzata creata. Clicca su "Nuova Pagina" per iniziare.
          </div>
        )}
      </div>
    </div>
  );
}

function PageEditor({ page, onSave, onCancel }: { page: CustomPage, onSave: (p: CustomPage) => void, onCancel: () => void }) {
  const [editedPage, setEditedPage] = useState<CustomPage>(page);

  const handleAddBlock = (type: BlockType) => {
    const newBlock: PageBlock = {
      id: Date.now().toString(),
      type,
      content: getDefaultContentForType(type)
    };
    setEditedPage({ ...editedPage, blocks: [...editedPage.blocks, newBlock] });
  };

  const handleUpdateBlock = (blockId: string, newContent: any) => {
    setEditedPage({
      ...editedPage,
      blocks: editedPage.blocks.map(b => b.id === blockId ? { ...b, content: newContent } : b)
    });
  };

  const handleRemoveBlock = (blockId: string) => {
    setEditedPage({
      ...editedPage,
      blocks: editedPage.blocks.filter(b => b.id !== blockId)
    });
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === editedPage.blocks.length - 1) return;
    
    const newBlocks = [...editedPage.blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    
    setEditedPage({ ...editedPage, blocks: newBlocks });
  };

  return (
    <div className="glass rounded-3xl p-6 md:p-8">
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
        <h2 className="text-2xl font-display font-bold">Modifica Pagina</h2>
        <div className="flex gap-3">
          <button onClick={onCancel} className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            Annulla
          </button>
          <button onClick={() => onSave(editedPage)} className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/80 transition-colors">
            <Save size={18} /> Salva
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Titolo Pagina</label>
          <input
            type="text"
            value={editedPage.title}
            onChange={(e) => setEditedPage({ ...editedPage, title: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Slug (URL)</label>
          <input
            type="text"
            value={editedPage.slug}
            onChange={(e) => setEditedPage({ ...editedPage, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Contenuto (Blocchi)</h3>
        <div className="space-y-6">
          {editedPage.blocks.map((block, index) => (
            <div key={block.id} className="bg-white/5 border border-white/10 rounded-xl p-4 relative group">
              <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => moveBlock(index, 'up')} disabled={index === 0} className="p-1 hover:text-accent disabled:opacity-30"><ChevronUp size={18} /></button>
                <button onClick={() => moveBlock(index, 'down')} disabled={index === editedPage.blocks.length - 1} className="p-1 hover:text-accent disabled:opacity-30"><ChevronDown size={18} /></button>
                <button onClick={() => handleRemoveBlock(block.id)} className="p-1 hover:text-red-400 ml-2"><Trash2 size={18} /></button>
              </div>
              
              <div className="mb-4 text-xs font-bold uppercase tracking-wider text-accent">{block.type} Block</div>
              
              {block.type === 'hero' && (
                <div className="space-y-4">
                  <input type="text" placeholder="Titolo" value={block.content.title} onChange={(e) => handleUpdateBlock(block.id, { ...block.content, title: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
                  <input type="text" placeholder="Sottotitolo" value={block.content.subtitle} onChange={(e) => handleUpdateBlock(block.id, { ...block.content, subtitle: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
                  <input type="text" placeholder="URL Immagine Sfondo (opzionale)" value={block.content.image} onChange={(e) => handleUpdateBlock(block.id, { ...block.content, image: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
                </div>
              )}
              
              {block.type === 'text' && (
                <textarea rows={5} placeholder="Inserisci il testo qui..." value={block.content.text} onChange={(e) => handleUpdateBlock(block.id, { ...block.content, text: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
              )}
              
              {block.type === 'image' && (
                <div className="space-y-4">
                  <input type="text" placeholder="URL Immagine" value={block.content.url} onChange={(e) => handleUpdateBlock(block.id, { ...block.content, url: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
                  <input type="text" placeholder="Didascalia (opzionale)" value={block.content.caption} onChange={(e) => handleUpdateBlock(block.id, { ...block.content, caption: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
                  {block.content.url && <img src={block.content.url} alt="Preview" className="h-32 object-cover rounded-lg" referrerPolicy="no-referrer" />}
                </div>
              )}

              {block.type === 'gallery' && (
                <div className="space-y-4">
                  <div className="text-sm text-text-muted mb-2">Aggiungi URL delle immagini separati da virgola:</div>
                  <textarea 
                    rows={4} 
                    placeholder="https://image1.jpg, https://image2.jpg..." 
                    value={Array.isArray(block.content.images) ? block.content.images.join(', ') : ''} 
                    onChange={(e) => {
                      const urls = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                      handleUpdateBlock(block.id, { ...block.content, images: urls });
                    }} 
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" 
                  />
                  {Array.isArray(block.content.images) && block.content.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {block.content.images.map((url: string, i: number) => (
                        <img key={i} src={url} alt={`Preview ${i}`} className="w-full h-20 object-cover rounded-lg" referrerPolicy="no-referrer" />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {block.type === 'video' && (
                <div className="space-y-4">
                  <input type="text" placeholder="URL Video (YouTube, Vimeo, o MP4)" value={block.content.url} onChange={(e) => handleUpdateBlock(block.id, { ...block.content, url: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
                  <div className="text-xs text-text-muted">Inserisci l'URL di un video di YouTube, Vimeo, o un link diretto a un file MP4.</div>
                </div>
              )}

              {block.type === 'projects' && (
                <div className="text-sm text-text-muted">Mostrerà la griglia dei progetti del portfolio.</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="border border-dashed border-white/20 rounded-xl p-6 text-center">
        <h4 className="text-sm font-medium mb-4">Aggiungi un nuovo blocco</h4>
        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={() => handleAddBlock('hero')} className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 text-sm transition-colors">+ Hero Section</button>
          <button onClick={() => handleAddBlock('text')} className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 text-sm transition-colors">+ Testo</button>
          <button onClick={() => handleAddBlock('image')} className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 text-sm transition-colors">+ Immagine</button>
          <button onClick={() => handleAddBlock('gallery')} className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 text-sm transition-colors">+ Galleria</button>
          <button onClick={() => handleAddBlock('video')} className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 text-sm transition-colors">+ Video</button>
          <button onClick={() => handleAddBlock('projects')} className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 text-sm transition-colors">+ Griglia Progetti</button>
        </div>
      </div>
    </div>
  );
}

function getDefaultContentForType(type: BlockType) {
  switch (type) {
    case 'hero': return { title: 'Titolo', subtitle: 'Sottotitolo', image: '' };
    case 'text': return { text: 'Il tuo testo qui...' };
    case 'image': return { url: '', caption: '' };
    case 'gallery': return { images: [] };
    case 'video': return { url: '' };
    case 'projects': return {};
    default: return {};
  }
}
