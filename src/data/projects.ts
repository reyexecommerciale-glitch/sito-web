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
    description: 'Complete brand identity and visual system for an electronic music festival. The goal was to capture the energy of the night with vibrant neon accents against deep dark backgrounds, creating a cohesive experience from digital tickets to physical stage design.',
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
    description: 'A dark-mode first financial dashboard designed for crypto traders. The interface focuses on data clarity while maintaining a premium, high-tech aesthetic through glassmorphism and subtle purple gradients.',
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
    description: 'Luxury packaging design for a high-end skincare line. The design utilizes deep blacks with holographic foil stamping to create a mysterious yet elegant unboxing experience.',
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
    description: 'An avant-garde fashion and culture magazine. The editorial layout breaks traditional grid systems, using extreme typography scaling and stark contrast to create visual tension.',
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
    description: 'A photographic exploration of brutalist architecture and urban decay in modern metropolises. Shot entirely on medium format film to capture the raw texture of the city.',
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
    description: 'Full audio production, mixing, and mastering for a 5-track synthwave EP. The project combines vintage analog synthesizers with modern electronic drum sequencing to create a nostalgic yet punchy soundscape.',
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
    description: 'A high-energy promotional campaign video for an athletic wear brand. The editing features fast-paced cuts, dynamic speed ramping, and custom sound design to match the intensity of the athletes.',
    coverImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop'
    ],
    role: 'Video Editor & Colorist'
  }
];
