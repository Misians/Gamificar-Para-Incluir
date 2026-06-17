import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AccessibilityControls from './components/AccessibilityControls';
import CourseCatalog from './components/CourseCatalog';
import ContactForm from './components/ContactForm';
import GameDetails from './components/GameDetails';
import AdminPanel from './components/AdminPanel'; // IMPORT NOVO
import { useGames } from './hooks/useGames'; // IMPORT NOVO
import { PageType } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('catalog');
  const [selectedGameId, setSelectedGameId] = useState<string>('eduedu');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Accessibility states
  const [fontSizeScale, setFontSizeScale] = useState<number>(1.0);
  const [highContrast, setHighContrast] = useState<boolean>(false);

  // Hook gerenciador do catálogo de jogos (LocalStorage)
  const { games, addGame, updateGame, removeGame } = useGames();

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [currentPage]);

  const handleSelectGame = (gameId: string) => {
    setSelectedGameId(gameId);
    setCurrentPage('game-details');
  };

  return (
    <div 
      className={`min-h-screen flex flex-col font-sans transition-all duration-300 ${
        highContrast 
          ? 'bg-[#0f0f10] text-[#ffebcc] selection:bg-[#ff8c00] selection:text-[#000000]'
          : 'bg-[#fbf9f8] text-[#1b1c1c] selection:bg-[#ffdcc3] selection:text-[#2f1500]'
      }`}
      style={{ 
        // Adjust the base font scale dynamically
        fontSize: `${fontSizeScale}em` 
      }}
      id="inclusive-app-root"
    >
       
      {/* Header Navigation */}
      <Header 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        highContrast={highContrast}
        onSetGameId={(id) => {
          setSelectedGameId(id);
          setCurrentPage('game-details');
        }}
      />

      {/* Floating vertical accessibility sidebar */}
      <AccessibilityControls 
        fontSizeScale={fontSizeScale}
        setFontSizeScale={setFontSizeScale}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
      />

      {/* Botão de Acesso ao Admin (Apenas para desenvolvimento/gerenciamento) */}
      <button
        onClick={() => setCurrentPage(currentPage === 'admin' ? 'catalog' : 'admin')}
        className={`fixed bottom-6 left-6 z-50 px-4 py-2 rounded-full font-bold shadow-lg transition-all ${
          highContrast ? 'bg-[#ff8c00] text-black' : 'bg-[#1b1c1c] text-white hover:bg-[#ff8c00]'
        }`}
      >
        {currentPage === 'admin' ? '← Voltar ao Site' : '⚙️ Admin'}
      </button>

      {/* Main Dynamic View Content */}
      <main className="flex-1 w-full" id="main-content-flow">
        <AnimatePresence mode="wait">
          {currentPage === 'catalog' && (
            <motion.div
              key="catalog"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <CourseCatalog 
                onSelectGame={handleSelectGame}
                setCurrentPage={setCurrentPage}
                searchQuery={searchQuery}
                games={games} // Passando os jogos dinâmicos
              />
            </motion.div>
          )}

          {currentPage === 'game-details' && (
            <motion.div
              key="game-details"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <GameDetails 
                gameId={selectedGameId}
                onBack={() => setCurrentPage('catalog')}
                games={games} // Passando os jogos dinâmicos
              />
            </motion.div>
          )}

          {currentPage === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <ContactForm />
            </motion.div>
          )}

          {/* Rota do Painel Administrativo */}
          {currentPage === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <AdminPanel 
                games={games} 
                addGame={addGame} 
                updateGame={updateGame} 
                removeGame={removeGame} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Navigation Columns */}
      <Footer setCurrentPage={setCurrentPage} />

    </div>
  );
}