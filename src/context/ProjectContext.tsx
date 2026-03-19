import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, projects as initialProjects } from '../data/projects';

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Project) => void;
  deleteProject: (id: string) => void;
}

const ProjectContext = createContext<ProjectContextType | null>(null);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('rey_projects');
    if (stored) {
      try {
        setProjects(JSON.parse(stored));
      } catch (e) {
        setProjects(initialProjects);
      }
    } else {
      setProjects(initialProjects);
      localStorage.setItem('rey_projects', JSON.stringify(initialProjects));
    }
  }, []);

  const addProject = (project: Project) => {
    const updated = [project, ...projects];
    setProjects(updated);
    localStorage.setItem('rey_projects', JSON.stringify(updated));
  };

  const updateProject = (id: string, updatedProject: Project) => {
    const updated = projects.map(p => p.id === id ? updatedProject : p);
    setProjects(updated);
    localStorage.setItem('rey_projects', JSON.stringify(updated));
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem('rey_projects', JSON.stringify(updated));
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, updateProject, deleteProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error('useProjects must be used within ProjectProvider');
  return context;
};
