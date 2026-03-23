export type BlockType = 'hero' | 'text' | 'image' | 'gallery' | 'video' | 'projects';

export interface PageBlock {
  id: string;
  type: BlockType;
  content: any; // Flexible content based on type
}

export interface CustomPage {
  id: string;
  slug: string;
  title: string;
  blocks: PageBlock[];
}

export interface SiteContent {
  home: {
    heroTitleLine1: string;
    heroTitleLine2: string;
    heroTitleLine3: string;
    heroSubtitle: string;
    heroDescription: string;
    projectsTitleLine1: string;
    projectsTitleLine2: string;
    disciplinesTitleLine1: string;
    disciplinesTitleLine2: string;
    marqueeText: string;
    disciplinesJson: string;
    testimonialsTitle: string;
    testimonialsJson: string;
  };
  about: {
    titleLine1: string;
    titleLine2: string;
    descriptionPara1: string;
    descriptionPara2: string;
    descriptionPara3: string;
    imageUrl: string;
    expertiseTitle: string;
    expertiseJson: string;
  };
  work: {
    titleLine1: string;
    titleLine2: string;
    description: string;
    emptyStateText: string;
  };
  projectDetail: {
    backToText: string;
    clientLabel: string;
    roleLabel: string;
    yearLabel: string;
  };
  contact: {
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    subtitle: string;
    email: string;
    address: string;
  };
  footer: {
    name: string;
    instagram: string;
    behance: string;
    dribbble: string;
    linkedin: string;
    copyright: string;
  };
  customPages: CustomPage[];
}

export const defaultContent: SiteContent = {
  home: {
    heroTitleLine1: "CREAZIONE DI",
    heroTitleLine2: "IDENTITÀ",
    heroTitleLine3: "VISIVE.",
    heroSubtitle: "Graphic Designer & Art Director",
    heroDescription: "Trasformo i concetti in narrazioni visive avvincenti. Specializzato in brand identity, editorial design ed esperienze digitali.",
    projectsTitleLine1: "PROGETTI",
    projectsTitleLine2: "SELEZIONATI",
    disciplinesTitleLine1: "DISCIPLINE",
    disciplinesTitleLine2: "CREATIVE",
    marqueeText: "BRANDING ✦ FOTOGRAFIA ✦ VIDEO EDITING ✦ PRODUZIONE MUSICALE ✦ UI/UX ✦",
    disciplinesJson: JSON.stringify([
      { title: 'Design & Art Direction', desc: 'Identità di marca, design editoriale ed esperienze digitali.', path: '/work/design', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop' },
      { title: 'Fotografia', desc: 'Fotografia ritrattistica, commerciale ed editoriale.', path: '/work/photography', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop' },
      { title: 'Video Editing', desc: 'Spot pubblicitari, video musicali e contenuti promozionali.', path: '/work/video', img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop' },
      { title: 'Produzione Musicale', desc: 'Ingegneria del suono, mixaggio e sound design.', path: '/work/music', img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop' }
    ], null, 2),
    testimonialsTitle: "COSA DICONO I CLIENTI",
    testimonialsJson: JSON.stringify([
      { name: "Sarah Jenkins", quote: "Rey ha completamente trasformato la nostra brand identity. Il nuovo look è moderno, audace e cattura perfettamente la nostra visione." },
      { name: "David Chen", quote: "Un vero piacere lavorare con lui. L'attenzione ai dettagli e la direzione creativa hanno superato tutte le nostre aspettative." },
      { name: "Elena Rodriguez", quote: "La campagna video che Rey ha prodotto per noi è stata straordinaria. Ha generato un coinvolgimento record e ha davvero colpito il nostro pubblico." }
    ], null, 2),
  },
  about: {
    titleLine1: "CIAO, SONO",
    titleLine2: "REY.",
    descriptionPara1: "Sono un creativo multidisciplinare con base a New York. Con oltre 8 anni di esperienza, sono specializzato nella creazione di soluzioni visivamente sorprendenti e concettualmente guidate attraverso graphic design, fotografia, produzione musicale e video editing.",
    descriptionPara2: "Il mio approccio fonde pensiero strategico con un'estetica audace. Credo che un ottimo lavoro non debba solo essere bello da vedere o da ascoltare, ma debba comunicare, evocare emozioni e risolvere problemi.",
    descriptionPara3: "Che stia costruendo un brand da zero, producendo un'esperienza audiovisiva immersiva o dirigendo artisticamente una campagna, il mio obiettivo è sempre quello di creare un lavoro che si distingua e lasci un'impressione duratura.",
    imageUrl: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=2080&auto=format&fit=crop",
    expertiseTitle: "COMPETENZE",
    expertiseJson: JSON.stringify([
      { title: "Design & Art Direction", skills: ["Brand Identity", "UI/UX Design", "Tipografia", "Design Editoriale", "Packaging", "Figma", "Adobe CC"] },
      { title: "Fotografia", skills: ["Ritratti", "Fotografia Commerciale", "Fotoritocco", "Lightroom", "Capture One"] },
      { title: "Video Editing", skills: ["Montaggio Commerciale", "Color Grading", "Motion Graphics", "Premiere Pro", "DaVinci Resolve", "After Effects"] },
      { title: "Produzione Musicale", skills: ["Ingegneria del Suono", "Mix & Master", "Sound Design", "Ableton Live", "Logic Pro"] }
    ], null, 2),
  },
  work: {
    titleLine1: "TUTTI I",
    titleLine2: "LAVORI",
    description: "Una selezione curata dei miei progetti che spaziano tra brand identity, digital product design, fotografia, video editing e produzione musicale.",
    emptyStateText: "Altri progetti in arrivo presto.",
  },
  projectDetail: {
    backToText: "Torna a",
    clientLabel: "Cliente",
    roleLabel: "Ruolo",
    yearLabel: "Anno",
  },
  contact: {
    titleLine1: "CREIAMO",
    titleLine2: "INSIEME.",
    titleLine3: "",
    subtitle: "Attualmente disponibile per progetti freelance e collaborazioni entusiasmanti. Contattami e creiamo qualcosa di bellissimo.",
    email: "rey.exe.commerciale@outlook.it",
    address: "Brooklyn, New York",
  },
  footer: {
    name: "Rey Carbone",
    instagram: "#",
    behance: "#",
    dribbble: "#",
    linkedin: "#",
    copyright: "Tutti i diritti riservati.",
  },
  customPages: []
};
