import React from 'react';
import { School, Globe, Share2, Compass, Heart } from 'lucide-react';
import { PageType } from '../types';

interface FooterProps {
  setCurrentPage: (page: PageType) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-surface-container border-t border-brand-border mt-16 transition-colors duration-300" id="app-footer">
      <div className="w-full py-16 px-6 md:px-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        
        {/* Company / Brand intro with badges */}
        <div className="space-y-6 max-w-sm">
          <div className="flex items-center gap-3 cursor-pointer" onClick={handleScrollToTop}>
            <div className="bg-[#ff8c00] p-2 rounded-lg">
              <School className="text-white h-5 w-5" />
            </div>
            <span className="font-display text-lg font-bold text-brand-primary">Gamificar Para Incluir</span>
          </div>
          
          <p className="font-sans text-sm text-[#5f5e5e] leading-relaxed">
            Inovando para criar caminhos de aprendizagem acessíveis, interativos e plenamente inclusivos para todos os perfis de alunos, baseado no Desenho Universal para a Aprendizagem (DUA).
          </p>

          {/* Partnership badges */}
          <div className="space-y-2">
            <p className="text-[10px] uppercase font-bold tracking-wider text-[#5f5e5e]">Realização e Apoio</p>
            <div className="flex flex-wrap gap-2">
              <div className="h-9 px-3 bg-white text-[#5f5e5e] text-[11px] font-bold rounded-lg border border-brand-border flex items-center justify-center shadow-xs">
                UERN
              </div>
              <div className="h-9 px-3 bg-white text-[#5f5e5e] text-[11px] font-bold rounded-lg border border-brand-border flex items-center justify-center shadow-xs">
                CAPES
              </div>
              <div className="h-9 px-3 bg-white text-[#5f5e5e] text-[11px] font-bold rounded-lg border border-brand-border flex items-center justify-center shadow-xs">
                Secretaria de educação de Tibau do Sul
              </div>
              <div className="h-9 px-3 bg-white text-[#5f5e5e] text-[11px] font-bold rounded-lg border border-brand-border flex items-center justify-center shadow-xs">
                PROFEI
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-16">
          <div className="space-y-4">
            <h5 className="font-display font-bold text-sm text-[#1b1c1c] tracking-tight">Plataforma</h5>
            <nav className="flex flex-col gap-2.5">
              <button 
                onClick={() => { setCurrentPage('catalog'); handleScrollToTop(); }}
                className="text-left text-xs text-[#5f5e5e] hover:text-[#904d00]"
                id="footer-link-catalog"
              >
                Catálogo de Jogos
              </button>
              <button 
                onClick={() => { setCurrentPage('catalog'); }}
                className="text-left text-xs text-[#5f5e5e] hover:text-[#904d00]"
                id="footer-link-courses"
              >
                Início & Guia
              </button>
              <button 
                onClick={() => { setCurrentPage('contact'); handleScrollToTop(); }}
                className="text-left text-xs text-[#5f5e5e] hover:text-[#904d00]"
                id="footer-link-resources"
              >
                Agendar Reunião
              </button>
            </nav>
          </div>

          <div className="space-y-4">
            <h5 className="font-display font-bold text-sm text-[#1b1c1c] tracking-tight">Legal</h5>
            <nav className="flex flex-col gap-2.5">
              <a href="#" className="text-xs text-[#5f5e5e] hover:text-[#904d00]" id="footer-link-accessibility">
                Declaração de Acessibilidade
              </a>
              <a href="#" className="text-xs text-[#5f5e5e] hover:text-[#904d00]" id="footer-link-privacy">
                Diretrizes de Privacidade
              </a>
              <a href="#" className="text-xs text-[#5f5e5e] hover:text-[#904d00]" id="footer-link-terms">
                Termos de Uso
              </a>
            </nav>
          </div>

          <div className="space-y-4">
            <h5 className="font-display font-bold text-sm text-[#1b1c1c] tracking-tight">Empresa e Canal</h5>
            <nav className="flex flex-col gap-2.5">
              <button 
                onClick={() => { setCurrentPage('contact'); handleScrollToTop(); }}
                className="text-left text-xs text-[#5f5e5e] hover:text-[#904d00]"
                id="footer-link-partnership"
              >
                Portal de Parceiros
              </button>
              <button 
                onClick={() => { setCurrentPage('contact'); handleScrollToTop(); }}
                className="text-left text-xs text-[#5f5e5e] hover:text-[#904d00]"
                id="footer-link-support"
              >
                Suporte de Inclusão
              </button>
            </nav>
          </div>
        </div>

      </div>

      {/* Under footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 border-t border-brand-border flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="font-sans text-xs text-[#5f5e5e]" id="copyright-notice">
          © 2026 GAMIFICAR PARA INCLUIR Platform. Publicado sob licença Creative Commons, permitindo uso e compartilhamento gratuito.
        </p>
        <div className="flex gap-4 items-center">
          <button 
            className="flex items-center gap-1.5 text-xs text-[#5f5e5e] hover:text-brand-primary-container"
            title="Compartilhar"
            onClick={() => alert('Obrigado por compartilhar o Inclusive Learning!')}
            id="share-icon-btn"
          >
            <Share2 size={14} />
            <span>Compartilhar</span>
          </button>
          <div className="w-px h-4 bg-gray-300" />
          <div className="flex items-center gap-1 text-[11px] text-gray-400">
            <span>Desenvolvido por </span>
            <span>@Misians</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
