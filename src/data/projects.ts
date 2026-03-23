export type ProjectType = 'design' | 'photography' | 'video' | 'music';

export interface Project {
  id: string;
  title: string;
  type: ProjectType;
  category: string;
  client: string;
  year: string;
  description: string;
  coverImage: string;
  images: string[];
  role: string;
}

export const projects: Project[] = [
  {
    id: 'neon-nights',
    title: 'Neon Nights Festival',
    type: 'design',
    category: 'Brand Identity',
    client: 'Neon Nights LLC',
    year: '2025',
    description: 'Identità di marca completa e sistema visivo per un festival di musica elettronica. L\'obiettivo era catturare l\'energia della notte con vivaci accenti al neon su sfondi scuri, creando un\'esperienza coesa dai biglietti digitali al design fisico del palco.',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1470229722913-7c090b332f7f?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540039155732-d674d40d4e3d?q=80&w=2069&auto=format&fit=crop'
    ],
    role: 'Art Director & Lead Designer'
  },
  {
    id: 'aether-app',
    title: 'Aether Finance',
    type: 'design',
    category: 'UI/UX Design',
    client: 'Aether Tech',
    year: '2024',
    description: 'Una dashboard finanziaria in dark-mode progettata per i trader di criptovalute. L\'interfaccia si concentra sulla chiarezza dei dati mantenendo un\'estetica premium e high-tech attraverso il glassmorfismo e sottili gradienti viola.',
    coverImage: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2064&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2064&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1639762681485-074b7f4ec674?q=80&w=2070&auto=format&fit=crop'
    ],
    role: 'Lead Product Designer'
  },
  {
    id: 'lumiere',
    title: 'Lumière Cosmetics',
    type: 'design',
    category: 'Packaging Design',
    client: 'Lumière Paris',
    year: '2024',
    description: 'Design del packaging di lusso per una linea di prodotti per la cura della pelle di fascia alta. Il design utilizza neri profondi con stampa a caldo olografica per creare un\'esperienza di unboxing misteriosa ma elegante.',
    coverImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1974&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=2069&auto=format&fit=crop'
    ],
    role: 'Packaging Designer'
  },
  {
    id: 'void-magazine',
    title: 'VOID Magazine',
    type: 'design',
    category: 'Editorial Design',
    client: 'Independent',
    year: '2023',
    description: 'Una rivista di moda e cultura all\'avanguardia. Il layout editoriale rompe i tradizionali sistemi a griglia, utilizzando un ridimensionamento estremo della tipografia e un forte contrasto per creare tensione visiva.',
    coverImage: 'https://images.unsplash.com/photo-1585807468504-9400ee1f2474?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1585807468504-9400ee1f2474?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1557992260-ec58e38d363c?q=80&w=1974&auto=format&fit=crop'
    ],
    role: 'Editorial Designer'
  },
  {
    id: 'urban-echoes',
    title: 'Urban Echoes',
    type: 'photography',
    category: 'Photography',
    client: 'Gallery 124',
    year: '2025',
    description: 'Un\'esplorazione fotografica dell\'architettura brutalista e del degrado urbano nelle metropoli moderne. Scattata interamente su pellicola medio formato per catturare la cruda texture della città.',
    coverImage: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop'
    ],
    role: 'Lead Photographer'
  },
  {
    id: 'midnight-drive',
    title: 'Midnight Drive EP',
    type: 'music',
    category: 'Music Production',
    client: 'Starlight Records',
    year: '2024',
    description: 'Produzione audio completa, mixaggio e mastering per un EP synthwave di 5 tracce. Il progetto combina sintetizzatori analogici vintage con la moderna programmazione di batterie elettroniche per creare un paesaggio sonoro nostalgico ma incisivo.',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop'
    ],
    role: 'Music Producer & Audio Engineer'
  },
  {
    id: 'kinetic-flow',
    title: 'Kinetic Flow',
    type: 'video',
    category: 'Video Editing',
    client: 'Motion Athletics',
    year: '2024',
    description: 'Una campagna video promozionale ad alta energia per un marchio di abbigliamento sportivo. Il montaggio presenta tagli frenetici, speed ramping dinamico e sound design personalizzato per abbinarsi all\'intensità degli atleti.',
    coverImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop'
    ],
    role: 'Video Editor & Colorist'
  }
];
