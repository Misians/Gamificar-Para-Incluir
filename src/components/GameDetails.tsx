import React from 'react';
import { ArrowLeft, Star, Download } from 'lucide-react';
import { Game } from '../types';

interface GameDetailsProps {
  gameId: string;
  onBack: () => void;
  games: Game[];
}

export default function GameDetails({ gameId, onBack, games }: GameDetailsProps) {
  const game = games.find((g) => g.id === gameId) || games[0];

  if (!game) return <div>Jogo não encontrado.</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 animate-fade-in text-left" id="game-detail-view">
      
      {/* Botão Voltar */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#5f5e5e] hover:text-[#904d00] transition-colors mb-8 group"
        id="btn-back-to-catalog"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span>Voltar ao Catálogo</span>
      </button>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12">
        
        {/* Capa do Jogo */}
        <div className="lg:col-span-7 relative rounded-[32px] overflow-hidden border border-gray-100 shadow-xl bg-white group aspect-video">
          <img
            src={game.image}
            alt={game.alt}
            className="w-full h-full object-cover group-hover:scale-101 transition-all duration-700"
            id="game-detail-cover"
          />
          <div className="absolute top-4 left-4">
            <span 
              className="px-3 py-1 font-bold text-xs uppercase tracking-wider rounded-xl border shadow-xs"
              style={{ 
                backgroundColor: game.tagBg, 
                color: game.tagColor,
                borderColor: `${game.tagColor}40`
              }}
            >
              {game.category}
            </span>
          </div>
        </div>

        {/* Informações Dinâmicas */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <span className="text-[11px] uppercase font-bold text-[#ff8c00] tracking-widest">
              {game.developer}
            </span>
            <h1 className="font-display text-3xl font-extrabold text-[#1b1c1c] leading-none" id="game-detail-name">
              {game.name}
            </h1>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star, idx) => (
                  <Star 
                    key={idx} 
                    size={14} 
                    className={`${idx < Math.floor(game.rating) ? 'text-amber-500 fill-amber-300' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="text-xs font-bold text-gray-700 ml-1 mt-0.5">{game.rating}</span>
              </div>
              <span className="text-xs text-[#5f5e5e]">•</span>
              <span className="text-xs font-mono font-bold text-gray-500">{game.reviewsCount}</span>
            </div>
          </div>

          {/* Descrições */}
          <div className="space-y-4">
            <p className="font-sans text-sm font-semibold text-[#1b1c1c]">
              {game.description}
            </p>
            <p className="font-sans text-xs md:text-sm text-[#5f5e5e] leading-relaxed">
              {game.longDescription}
            </p>
          </div>

          {/* Especificações Técnicas */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block">PLATAFORMA</span>
              <span className="font-sans text-xs font-bold text-[#1b1c1c]">{game.platform}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block">TAMANHO</span>
              <span className="font-sans text-xs font-bold text-[#1b1c1c]">{game.size}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block">IDIOMAS</span>
              <span className="font-sans text-xs font-bold text-[#1b1c1c]">
                {game.languages?.join(', ')}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block">VERSÃO</span>
              <span className="font-sans text-xs font-semibold text-[#1b1c1c]">{game.version}</span>
            </div>
          </div>

          {/* Link para a página de Download */}
          <div className="pt-6 border-t border-gray-100">
            <a
              href={game.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-[#ff8c00] hover:bg-[#904d00] text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/10"
              id="btn-download-link"
            >
              <Download size={16} />
              <span>Ir para a Página de Download</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}