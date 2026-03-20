import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SiteContent, defaultContent } from '../data/content';

interface ContentContextType {
  content: SiteContent;
  updateContent: (section: keyof SiteContent, newSectionContent: any) => void;
}

const ContentContext = createContext<ContentContextType | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    const stored = localStorage.getItem('rey_site_content');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Merge with default to ensure all fields exist if schema changes
        setContent({
          home: { ...defaultContent.home, ...parsed.home },
          about: { ...defaultContent.about, ...parsed.about },
          contact: { ...defaultContent.contact, ...parsed.contact },
          footer: { ...defaultContent.footer, ...parsed.footer },
        });
      } catch (e) {
        setContent(defaultContent);
      }
    } else {
      setContent(defaultContent);
      localStorage.setItem('rey_site_content', JSON.stringify(defaultContent));
    }
  }, []);

  const updateContent = (section: keyof SiteContent, newSectionContent: any) => {
    const updated = {
      ...content,
      [section]: {
        ...content[section],
        ...newSectionContent
      }
    };
    setContent(updated);
    localStorage.setItem('rey_site_content', JSON.stringify(updated));
  };

  return (
    <ContentContext.Provider value={{ content, updateContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within ContentProvider');
  return context;
};
