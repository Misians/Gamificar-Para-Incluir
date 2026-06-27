import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

// Seus Componentes Originais
import Header from './components/Header';
import Footer from './components/Footer';
import AccessibilityControls from './components/AccessibilityControls';
import CourseCatalog from './components/CourseCatalog';
import ContactForm from './components/ContactForm';
import GameDetails from './components/GameDetails';

// Novos Componentes e Contextos para Autenticação/Backend
import AdminPanel from './pages/adminPanel';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

// Hook antigo (pode manter para as rotas públicas temporariamente, ou refatorar para fetch)
import { useGames } from './hooks/useGames'; 

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [selectedGameId, setSelectedGameId] = useState<string>('eduedu');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Accessibility states
  const [fontSizeScale, setFontSizeScale] = useState<number>(1.0);
  const [highContrast, setHighContrast] = useState<boolean>(false);

  // Hook que você já tinha (buscando localmente os jogos para o catálogo público)
  const { games } = useGames();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  // Função adaptadora para não quebrar seu Header/Footer que usam setCurrentPage
  const handleSetCurrentPage = (page: string) => {
    if (page === 'catalog') navigate('/');
    else if (page === 'contact') navigate('/contact');
    else if (page === 'admin') navigate('/admin');
  };

  const handleSelectGame = (gameId: string) => {
    setSelectedGameId(gameId);
    navigate(`/game/${gameId}`);
  };

  // Oculta o Header, Footer e botões flutuantes na tela de Login
  const isLoginPage = location.pathname === '/login';

  return (
    <div 
      className={`min-h-screen flex flex-col font-sans transition-all duration-300 ${
        highContrast 
          ? 'bg-[#0f0f10] text-[#ffebcc] selection:bg-[#ff8c00] selection:text-[#000000]'
          : 'bg-[#fbf9f8] text-[#1b1c1c] selection:bg-[#ffdcc3] selection:text-[#2f1500]'
      }`}
      style={{ fontSize: `${fontSizeScale}em` }}
      id="inclusive-app-root"
    >
       
      {/* Esconde o header na tela de login */}
      {!isLoginPage && (
        <Header 
          currentPage={location.pathname === '/' ? 'catalog' : location.pathname.replace('/', '') as any}
          setCurrentPage={handleSetCurrentPage}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          highContrast={highContrast}
          onSetGameId={handleSelectGame}
        />
      )}

      {/* Floating vertical accessibility sidebar */}
      {!isLoginPage && (
        <AccessibilityControls 
          fontSizeScale={fontSizeScale}
          setFontSizeScale={setFontSizeScale}
          highContrast={highContrast}
          setHighContrast={setHighContrast}
        />
      )}

      {/* Botão de Acesso ao Admin */}
      {!isLoginPage && (
        <button
          onClick={() => navigate(location.pathname === '/admin' ? '/' : '/admin')}
          className={`fixed bottom-6 left-6 z-50 px-4 py-2 rounded-full font-bold shadow-lg transition-all ${
            highContrast ? 'bg-[#ff8c00] text-black' : 'bg-[#1b1c1c] text-white hover:bg-[#ff8c00]'
          }`}
        >
          {location.pathname === '/admin' ? '← Voltar ao Site' : '⚙️ Admin'}
        </button>
      )}

      {/* Main Dynamic View Content com React Router e AnimatePresence */}
      <main className="flex-1 w-full" id="main-content-flow">
        {/* Passamos location.pathname como key para a animação funcionar nas trocas de rota */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            
            {/* Rota do Catálogo */}
            <Route path="/" element={
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
                <CourseCatalog 
                  onSelectGame={handleSelectGame}
                  setCurrentPage={handleSetCurrentPage}
                  searchQuery={searchQuery}
                  games={games} 
                />
              </motion.div>
            } />

            {/* Rota de Detalhes do Jogo */}
            <Route path="/game/:id" element={
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.3 }}>
                <GameDetails 
                  gameId={selectedGameId}
                  onBack={() => navigate('/')}
                  games={games} 
                />
              </motion.div>
            } />

            {/* Rota de Contato */}
            <Route path="/contact" element={
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
                <ContactForm />
              </motion.div>
            } />

            {/* Rota de Login (Nova) */}
            <Route path="/login" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Login />
              </motion.div>
            } />

            {/* Rota do Painel Administrativo (Protegida) */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
                  <AdminPanel />
                  {/* Note que não passamos mais as props (games, addGame, etc) pois o próprio AdminPanel as consome do Django agora */}
                </motion.div>
              </ProtectedRoute>
            } />

            {/* Rota de fallback caso a URL não exista */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </AnimatePresence>
      </main>

      {/* Footer Navigation Columns */}
      {!isLoginPage && <Footer setCurrentPage={handleSetCurrentPage} />}

    </div>
  );
}

// O App principal apenas empacota os Provedores (Contexto e Rotas)
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}