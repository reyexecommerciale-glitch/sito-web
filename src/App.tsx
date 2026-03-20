import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { ProjectDetail } from './pages/ProjectDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import { ContentProvider } from './context/ContentContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { CustomPageViewer } from './pages/CustomPageViewer';
import backgroundVideo from './assets/background.mp4';

export default function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <ContentProvider>
        <ProjectProvider>
          <div className="min-h-screen flex flex-col relative overflow-hidden">
            {/* Global video background */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
              <video
                className="w-full h-full object-cover"
                src={backgroundVideo}
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/65 to-black/75" />
            </div>

            <Navbar />
            <main className="flex-grow">
              <AnimatePresence mode="wait">
                {/* @ts-ignore - React Router v6 types don't include key, but AnimatePresence needs it */}
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Home />} />
                  <Route path="/work" element={<Work />} />
                  <Route path="/work/:category" element={<Work />} />
                  <Route path="/project/:id" element={<ProjectDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/dashboard" element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                  
                  {/* Catch-all for custom pages */}
                  <Route path="/p/:slug" element={<CustomPageViewer />} />
                </Routes>
              </AnimatePresence>
            </main>
            <Footer />
          </div>
        </ProjectProvider>
      </ContentProvider>
    </AuthProvider>
  );
}
