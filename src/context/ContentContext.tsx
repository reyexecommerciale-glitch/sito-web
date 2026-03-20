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
          work: { ...defaultContent.work, ...parsed.work },
          projectDetail: { ...defaultContent.projectDetail, ...parsed.projectDetail },
          customPages: parsed.customPages || [],
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
    setContent(prevContent => {
      let updatedContentValue;
      
      const currentSectionValue = prevContent[section];
      const resolvedNewContent = typeof newSectionContent === 'function' 
        ? newSectionContent(currentSectionValue) 
        : newSectionContent;
      
      if (section === 'customPages') {
        updatedContentValue = Array.isArray(resolvedNewContent) ? resolvedNewContent : [];
      } else {
        updatedContentValue = Array.isArray(resolvedNewContent)
          ? resolvedNewContent
          : {
              ...currentSectionValue,
              ...resolvedNewContent
            };
      }

      const updated = {
        ...prevContent,
        [section]: updatedContentValue
      };
      
      localStorage.setItem('rey_site_content', JSON.stringify(updated));
      return updated;
    });
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
