import React from 'react';
import { School, Globe, Share2, Compass, Heart } from 'lucide-react';
import { PageType } from '../types';
import logoTibau from '../assets/logos/logo.png';
import profei from '../assets/logos/profei.jpeg';
import capeslogo from '../assets/logos/capes.png';
import cnpq from '../assets/logos/CNPQ.png';

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

          {/* Partnership badges & Logos */}
          <div className="space-y-4 pt-2">
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
              <div className="h-9 px-3 bg-white text-[#5f5e5e] text-[11px] font-bold rounded-lg border border-brand-border flex items-center justify-center shadow-xs">
                CNPQ
              </div>
            </div>

            {/* Carrossel de logos de apoio */}
            <div className="mt-5 overflow-hidden rounded-2xl ">
              <div className="flex items-center gap-4 px-3 py-3 whitespace-nowrap marquee-track">
                {[capeslogo, logoTibau, profei, cnpq, capeslogo, logoTibau, profei, cnpq].map((logo, index) => (
                  <div
                    key={`${logo}-${index}`}
                    className="flex h-20 min-w-[120px] items-center justify-center rounded-xl border border-gray-100 bg-white px-2 shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
                  >
                    <img src={logo} alt="Logo de apoio" className="max-h-14 w-auto object-contain" />
                  </div>
                ))}
              </div>
            </div>

            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }

              .marquee-track {
                width: max-content;
                animation: marquee 18s linear infinite;
              }

              .marquee-track:hover {
                animation-play-state: paused;
              }
            `}</style>

          </div>
        </div>

        {/* Footer Navigation columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-16 mt-4 md:mt-0">
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
        <div className="flex flex-col items-center gap-2 text-center sm:text-left">
          <p className="font-sans text-xs text-[#5f5e5e]" id="copyright-notice">
            © 2026 Gamificar para Incluir. Conteúdo autoral protegido nos termos da legislação aplicável.
          </p>
          <p className="font-sans text-[11px] text-[#5f5e5e] max-w-2xl leading-relaxed">
            O sistema segue o REA: você tem liberdade para reutilizar, revisar, remixar e redistribuir este material.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span className="hidden sm:block w-px h-4 bg-gray-300" aria-hidden="true" />
            <a
              href="https://creativecommons.org/licenses/by/4.0/deed.pt-br"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[11px] text-[#ff8c00] hover:text-[#e06f00] underline-offset-2 hover:underline"
              id="footer-license-link"
            >
              Licença: CC BY 4.0
            </a>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="w-px h-4 bg-gray-300" />
          <div className="flex items-center gap-1 text-[11px] text-gray-400">
            <span>Desenvolvimento web: </span>
            <span>Artemísia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}