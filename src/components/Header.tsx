import React, { useState } from 'react';
import { School, Search, Bell, Accessibility, User, CheckCircle, Flame } from 'lucide-react';
import { PageType } from '../types';

interface HeaderProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSetGameId: (id: string) => void;
}

export default function Header({
  currentPage,
  setCurrentPage,
  searchQuery,
  setSearchQuery,
  onSetGameId,
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="sticky top-0 left-0 right-0 z-40 bg-white border-b border-brand-border" id="app-header">
      <div className="flex justify-between items-center h-20 px-6 md:px-10 max-w-7xl mx-auto w-full">
        
        {/* Brand Logo - Inclusive Learning */}
        <div 
          onClick={() => setCurrentPage('catalog')}
          className="flex items-center gap-3 cursor-pointer group"
          id="header-logo-container"
        >
          <div className="bg-brand-primary-container p-2 rounded-lg group-hover:bg-brand-primary transition-all duration-300">
            <School className="text-white text-2xl h-6 w-6" />
          </div>
          <span className="font-display text-xl md:text-2xl font-bold text-brand-primary tracking-tight">
            GAMIFICAR PARA INCLUIR
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-[#5f5e5e]" id="desktop-navigation">
          <button
            onClick={() => setCurrentPage('catalog')}
            className={`font-semibold text-sm pb-1 border-b-2 transition-all ${
              currentPage === 'catalog' || currentPage === 'game-details'
                ? 'text-[#904d00] border-[#904d00]'
                : 'border-transparent hover:text-[#904d00]'
            }`}
            id="nav-link-catalog"
          >
            Catálogo
          </button>
          <button
            onClick={() => {
              setCurrentPage('catalog');
              // Scroll to the guide anchor
              setTimeout(() => {
                const stepSection = document.getElementById('com-usar-guia');
                if (stepSection) {
                  stepSection.scrollIntoView({ behavior: 'smooth' });
                }
              }, 100);
            }}
            className="font-semibold text-sm border-b-2 border-transparent hover:text-[#904d00] hover:border-[#904d00] pb-1 transition-all"
            id="nav-link-resources"
          >
            Pilares do DUA
          </button>

          <button
            onClick={() => {
              setCurrentPage('catalog');
              setTimeout(() => {
                const foundersSection = document.getElementById('founders-section');
                if (foundersSection) {
                  foundersSection.scrollIntoView({ behavior: 'smooth' });
                }
              }, 100);
            }}
            className="font-semibold text-sm border-b-2 border-transparent hover:text-[#904d00] hover:border-[#904d00] pb-1 transition-all"
            id="nav-link-community"
          >
            Idealizadores
          </button>
          <button
            onClick={() => {
              setCurrentPage('contact');
            }}
            className={`font-semibold text-sm pb-1 border-b-2 transition-all ${
              currentPage === 'contact'
                ? 'text-[#904d00] border-[#904d00]'
                : 'border-transparent hover:text-[#904d00]'
            }`}
            id="nav-link-courses"
          >
            Fale Conosco
          </button>
        </nav>

      </div>
    </header>
  );

  function unredStateAvatar() {
    return (
      <span className="text-xs font-bold">P</span>
    );
  }
}
