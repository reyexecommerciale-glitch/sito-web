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
    heroTitleLine1: "CRAFTING",
    heroTitleLine2: "VISUAL",
    heroTitleLine3: "IDENTITIES.",
    heroSubtitle: "Graphic Designer & Art Director",
    heroDescription: "I transform concepts into compelling visual narratives. Specializing in brand identity, editorial design, and digital experiences.",
    projectsTitleLine1: "SELECTED",
    projectsTitleLine2: "PROJECTS",
    disciplinesTitleLine1: "CREATIVE",
    disciplinesTitleLine2: "DISCIPLINES",
    marqueeText: "BRANDING ✦ PHOTOGRAPHY ✦ VIDEO EDITING ✦ MUSIC PRODUCTION ✦ UI/UX ✦",
    disciplinesJson: JSON.stringify([
      { title: 'Design & Art Direction', desc: 'Brand identities, editorial design, and digital experiences.', path: '/work/design', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop' },
      { title: 'Photography', desc: 'Portrait, commercial, and editorial photography.', path: '/work/photography', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop' },
      { title: 'Video Editing', desc: 'Commercials, music videos, and promotional content.', path: '/work/video', img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop' },
      { title: 'Music Production', desc: 'Audio engineering, mixing, and sound design.', path: '/work/music', img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop' }
    ], null, 2),
  },
  about: {
    titleLine1: "HI, I'M",
    titleLine2: "REY.",
    descriptionPara1: "I am a multidisciplinary creative based in New York. With over 8 years of experience, I specialize in creating visually striking and conceptually driven solutions across graphic design, photography, music production, and video editing.",
    descriptionPara2: "My approach blends strategic thinking with bold aesthetics. I believe that great work doesn't just look or sound good—it communicates, evokes emotion, and solves problems.",
    descriptionPara3: "Whether I'm building a brand from scratch, producing an immersive audio-visual experience, or art directing a campaign, my goal is always to create work that stands out and leaves a lasting impression.",
    imageUrl: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=2080&auto=format&fit=crop",
    expertiseTitle: "EXPERTISE",
    expertiseJson: JSON.stringify([
      { title: "Design & Art Direction", skills: ["Brand Identity", "UI/UX Design", "Typography", "Editorial Design", "Packaging", "Figma", "Adobe CC"] },
      { title: "Photography", skills: ["Portrait Photography", "Commercial Photography", "Photo Retouching", "Lightroom", "Capture One"] },
      { title: "Video Editing", skills: ["Commercial Editing", "Color Grading", "Motion Graphics", "Premiere Pro", "DaVinci Resolve", "After Effects"] },
      { title: "Music Production", skills: ["Audio Engineering", "Mixing & Mastering", "Sound Design", "Ableton Live", "Logic Pro"] }
    ], null, 2),
  },
  work: {
    titleLine1: "ALL",
    titleLine2: "WORK",
    description: "A curated selection of my projects spanning brand identity, digital product design, photography, video editing, and music production.",
    emptyStateText: "More projects coming soon.",
  },
  projectDetail: {
    backToText: "Back to",
    clientLabel: "Client",
    roleLabel: "Role",
    yearLabel: "Year",
  },
  contact: {
    titleLine1: "LET'S",
    titleLine2: "CREATE",
    titleLine3: "TOGETHER.",
    subtitle: "Currently available for freelance projects and exciting collaborations. Reach out and let's make something beautiful.",
    email: "hello@reycarbone.design",
    address: "Brooklyn, New York",
  },
  footer: {
    name: "Rey Carbone",
    instagram: "#",
    behance: "#",
    dribbble: "#",
    linkedin: "#",
    copyright: "All rights reserved.",
  },
  customPages: []
};
