import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SiteContent, defaultContent } from '../data/content';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface ContentContextType {
  content: SiteContent;
  updateContent: (section: keyof SiteContent, newSectionContent: any) => Promise<void>;
  refreshContent: () => Promise<void>;
  isLoading: boolean;
  error?: string | null;
}

const ContentContext = createContext<ContentContextType | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    refreshContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mergeWithDefaults = (incoming: any): SiteContent => ({
    home: { ...defaultContent.home, ...incoming?.home },
    about: { ...defaultContent.about, ...incoming?.about },
    contact: { ...defaultContent.contact, ...incoming?.contact },
    footer: { ...defaultContent.footer, ...incoming?.footer },
    work: { ...defaultContent.work, ...incoming?.work },
    projectDetail: { ...defaultContent.projectDetail, ...incoming?.projectDetail },
    customPages: incoming?.customPages || [],
  });

  const refreshContent = async () => {
    setIsLoading(true);
    setError(null);

    // 1) prova Supabase se configurato
    if (isSupabaseConfigured) {
      const { data, error: fetchError } = await supabase
        .from('site_content')
        .select('data')
        .eq('id', 'site')
        .single();

      if (!fetchError && data?.data) {
        const merged = mergeWithDefaults(data.data);
        setContent(merged);
        localStorage.setItem('rey_site_content', JSON.stringify(merged));
        setIsLoading(false);
        return;
      }

      // PGRST116 = nessuna riga trovata
      if (fetchError && fetchError.code === 'PGRST116') {
        await supabase.from('site_content').upsert({ id: 'site', data: defaultContent });
        setContent(defaultContent);
        localStorage.setItem('rey_site_content', JSON.stringify(defaultContent));
        setIsLoading(false);
        return;
      }

      if (fetchError) {
        console.error('Errore caricando i contenuti da Supabase:', fetchError.message);
        setError(fetchError.message);
      }
    }

    // 2) fallback: localStorage
    const stored = localStorage.getItem('rey_site_content');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setContent(mergeWithDefaults(parsed));
        setIsLoading(false);
        return;
      } catch (e) {
        // continua
      }
    }

    // 3) fallback: default
    setContent(defaultContent);
    localStorage.setItem('rey_site_content', JSON.stringify(defaultContent));
    setIsLoading(false);
  };

  const updateContent = async (section: keyof SiteContent, newSectionContent: any) => {
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

    if (isSupabaseConfigured) {
      const updated = localStorage.getItem('rey_site_content');
      if (updated) {
        await supabase.from('site_content').upsert({ id: 'site', data: JSON.parse(updated) });
      }
    }
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, refreshContent, isLoading, error }}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within ContentProvider');
  return context;
};
