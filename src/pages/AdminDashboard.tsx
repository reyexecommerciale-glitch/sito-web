import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProjects } from '../context/ProjectContext';
import { PageTransition } from '../components/PageTransition';
import { LogOut, Plus, Edit2, Trash2, Layout, FileText, Users } from 'lucide-react';
import { ProjectFormModal } from '../components/ProjectFormModal';
import { ContentEditor } from '../components/ContentEditor';
import { AdminManager } from '../components/AdminManager';
import { Project } from '../data/projects';

export function AdminDashboard() {
  const { logout } = useAuth();
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  
  const [activeTab, setActiveTab] = useState<'projects' | 'content' | 'admins'>('projects');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleLogout = async () => {
    try {
      await logout();
      // Il redirect viene gestito in automatico da ProtectedRoute
      // che ci riporterà alla pagina di login quando isAuthenticated diventa false
    } catch (error) {
      console.error("Errore durante il logout:", error);
    }
  };

  const handleAddNew = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Sei sicuro di voler eliminare questo progetto?')) {
      deleteProject(id);
    }
  };

  const handleSaveProject = (project: Project) => {
    if (editingProject) {
      updateProject(project.id, project);
    } else {
      addProject(project);
    }
  };

  return (
    <PageTransition>
      <section className="pt-32 pb-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">Dashboard</h1>
              <p className="text-text-muted">Gestisci i progetti e i contenuti del tuo portfolio</p>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:text-accent transition-colors"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                activeTab === 'projects' 
                  ? 'bg-white text-primary' 
                  : 'bg-white/5 text-text-muted hover:bg-white/10 hover:text-white'
              }`}
            >
              <Layout size={20} /> Progetti
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                activeTab === 'content' 
                  ? 'bg-white text-primary' 
                  : 'bg-white/5 text-text-muted hover:bg-white/10 hover:text-white'
              }`}
            >
              <FileText size={20} /> Testi del Sito
            </button>
            <button
              onClick={() => setActiveTab('admins')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                activeTab === 'admins' 
                  ? 'bg-white text-primary' 
                  : 'bg-white/5 text-text-muted hover:bg-white/10 hover:text-white'
              }`}
            >
              <Users size={20} /> Gestione Admin
            </button>
          </div>

          {activeTab === 'projects' ? (
            <div className="glass rounded-3xl p-6 md:p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-display font-bold">Progetti</h2>
                <button 
                  onClick={handleAddNew}
                  className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/80 transition-colors text-sm md:text-base"
                >
                  <Plus size={18} /> Nuovo Progetto
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-white/10 text-text-muted text-sm uppercase tracking-wider">
                      <th className="pb-4 font-medium">Progetto</th>
                      <th className="pb-4 font-medium">Categoria</th>
                      <th className="pb-4 font-medium">Anno</th>
                      <th className="pb-4 font-medium text-right">Azioni</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project) => (
                      <tr key={project.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 flex items-center gap-4">
                          <img src={project.coverImage} alt={project.title} className="w-12 h-12 rounded-lg object-cover" />
                          <span className="font-medium">{project.title}</span>
                        </td>
                        <td className="py-4 text-text-muted capitalize">{project.type}</td>
                        <td className="py-4 text-text-muted">{project.year}</td>
                        <td className="py-4 text-right">
                          <div className="flex justify-end gap-3">
                            <button onClick={() => handleEdit(project)} className="p-2 hover:text-accent transition-colors" title="Modifica"><Edit2 size={18} /></button>
                            <button onClick={() => handleDelete(project.id)} className="p-2 hover:text-red-400 transition-colors" title="Elimina"><Trash2 size={18} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {projects.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-text-muted">
                          Nessun progetto trovato. Aggiungine uno nuovo!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeTab === 'content' ? (
            <ContentEditor />
          ) : (
            <AdminManager />
          )}
        </div>
      </section>

      {isModalOpen && (
        <ProjectFormModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveProject}
          projectToEdit={editingProject}
        />
      )}
    </PageTransition>
  );
}
