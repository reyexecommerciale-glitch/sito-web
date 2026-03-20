import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, projects as initialProjects } from '../data/projects';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Project) => Promise<void>;
  updateProject: (id: string, project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  refreshProjects: () => Promise<void>;
  isLoading: boolean;
  error?: string | null;
}

const ProjectContext = createContext<ProjectContextType | null>(null);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    refreshProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshProjects = async () => {
    setIsLoading(true);
    setError(null);

    if (isSupabaseConfigured) {
      const { data, error: fetchError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (!fetchError && data) {
        setProjects(data as Project[]);
        localStorage.setItem('rey_projects', JSON.stringify(data));
        setIsLoading(false);
        return;
      }

      if (fetchError) {
        console.error('Errore caricando i progetti da Supabase:', fetchError.message);
        setError(fetchError.message);
      }
    }

    // fallback a localStorage
    const stored = localStorage.getItem('rey_projects');
    if (stored) {
      try {
        setProjects(JSON.parse(stored));
        setIsLoading(false);
        return;
      } catch (e) {
        // continue
      }
    }

    setProjects(initialProjects);
    localStorage.setItem('rey_projects', JSON.stringify(initialProjects));
    setIsLoading(false);
  };

  const addProject = async (project: Project) => {
    const updated = [project, ...projects];
    setProjects(updated);
    localStorage.setItem('rey_projects', JSON.stringify(updated));

    if (isSupabaseConfigured) {
      const { error: saveError } = await supabase.from('projects').upsert(project);
      if (saveError) {
        console.error('Errore salvando progetto:', saveError.message);
        setError(saveError.message);
      }
    }
  };

  const updateProject = async (id: string, updatedProject: Project) => {
    const updated = projects.map(p => p.id === id ? updatedProject : p);
    setProjects(updated);
    localStorage.setItem('rey_projects', JSON.stringify(updated));

    if (isSupabaseConfigured) {
      const { error: saveError } = await supabase.from('projects').upsert(updatedProject);
      if (saveError) {
        console.error('Errore aggiornando progetto:', saveError.message);
        setError(saveError.message);
      }
    }
  };

  const deleteProject = async (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem('rey_projects', JSON.stringify(updated));

    if (isSupabaseConfigured) {
      const { error: delError } = await supabase.from('projects').delete().eq('id', id);
      if (delError) {
        console.error('Errore eliminando progetto:', delError.message);
        setError(delError.message);
      }
    }
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, updateProject, deleteProject, refreshProjects, isLoading, error }}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error('useProjects must be used within ProjectProvider');
  return context;
};
