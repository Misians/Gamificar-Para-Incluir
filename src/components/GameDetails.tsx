import React, { useState } from 'react';
import { ArrowLeft, Star, Download, Check, ShieldAlert, X } from 'lucide-react';
import { Game } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface GameDetailsProps {
  gameId: string;
  onBack: () => void;
  games: Game[]; // Adicionado!
}

export default function GameDetails({ gameId, onBack, games }: GameDetailsProps) {
  // Agora busca na lista dinâmica de jogos
  const game = games.find((g) => g.id === gameId) || games[0];

  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Fallback screenshot gallery specifically mapping EduEdu
  const edueduScreenshots = [
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSUxhIhHfhsf4VIK507W5VktZoY5nOX6gxQEIbtEXRkZTctPIc0lV3OL4bz2dCcxfRr7-a6n7_DMKU77SxbBDuyv80jESznZeB1XETkl3_hO36vNtuiCEVuJcHqzNql5DA28RuE_0132ZusXV7MwwdFev_P5NF2QkaC-osacFoaKBXushqjJd9xeEaTa9dTKQ_jvO0m7-gSTrwJbjbAqgxdWDt3yYfxwmTZ1n85_PyfHiRC4TXmnOY71tloTo0amQQFrc5pkLmAEoJ',
      title: 'Ambiente Floresta Mágica',
      description: 'Exploração visual lúdica onde cada som de animal introduz uma vogal do alfabeto.'
    },
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJxoZ9wMZqJ1us2XDCYZeablXzf_AMxFgElZAHHRXlMiDnZaJ--2QdZICjQ5Q8ZBkijS9qxnjoK-QIzHX8Tn0mzUtXz-F_NLdWC7_kFs6FYSOKh7muflx0y-5uINFUjOT7mH7QXsV6NNkr7PjvJwaq1uUbCPh21m11jpG3s-MFLX8zBYRDkev3n3oE6RFHWYoqbRhmTiX_IdVZqQ9Wjd49kZEXsqvsURYTxH9vKrmEhpZb8SgE5buz3huEQwpVUV8SqrRx2H7bgg92',
      title: 'Construção Clicável de Sílabas',
      description: 'Mecanismo assistivo onde blocos pulsam para orientar silabários sequenciais.'
    },
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCL9WT3dLC-5PzS_Dclk2f-wAwPHwtryt7iKNzw71sO66-iVBAdQjkzEWOyKpxZWYE7dm_Rrf9XBr2A-DT70XZhayd8ygbgey31QwJTPvl22jsjR9kqU7y-D-UsLCQVhidh0lR0npv5ldngTLgp_ZnHjKW50uGJY_Y-JKp2f9E6dz-1Bklfq-eeYuXmE59blMlNIg_bB-YF5MBmqnEG3QOm-En_epbIVJbcPBXHgEuSgH_ENNlQ9bJjRiFzLDGzpfDqTSzWdASgz_sY',
      title: 'Métricas e Evolução em Tempo Real',
      description: 'Relatório estruturado para coordenação acompanhar a trilha cognitiva do estudante.'
    }
  ];

  const handleSimulateDownload = () => {
    if (isDownloading || downloadSuccess) return;
    setIsDownloading(true);
    setDownloadProgress(0);
    
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          setDownloadSuccess(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  if (!game) return <div>Jogo não encontrado.</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 animate-fade-in text-left" id="game-detail-view">
      
      {/* Navigate Back Link */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#5f5e5e] hover:text-[#904d00] transition-colors mb-8 group"
        id="btn-back-to-catalog"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span>Voltar ao Catálogo</span>
      </button>

      {/* Hero Banner Grid & Title Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12">
        
        {/* Main Cover Illustration */}
        <div className="lg:col-span-7 relative rounded-[32px] overflow-hidden border border-gray-100 shadow-xl bg-white group aspect-video">
          <img
            src={game.image}
            alt={game.alt}
            className="w-full h-full object-cover group-hover:scale-101 transition-all duration-700"
            id="game-detail-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/95 text-[#904d00] font-bold text-xs uppercase tracking-wider rounded-xl border border-[#ddc1ae]/30 shadow-xs">
              {game.category}
            </span>
          </div>
        </div>

        {/* Dynamic game titles Info Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <span className="text-[11px] uppercase font-bold text-[#ff8c00] tracking-widest">{game.developer}</span>
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

          <p className="font-sans text-xs md:text-sm text-[#5f5e5e] leading-relaxed">
            {game.longDescription}
          </p>

          {/* Quick specs columns */}
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
              <span className="font-sans text-xs font-bold text-[#1b1c1c]">{game.languages?.join(', ') || 'Português'}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block">VERSÃO</span>
              <span className="font-sans text-xs font-semibold text-[#1b1c1c]">{game.version}</span>
            </div>
          </div>

          {/* Dynamic Simulative install downloader drawer */}
          <div className="pt-6 border-t border-gray-100">
            {downloadSuccess ? (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 text-xs md:text-sm flex items-center gap-3">
                <Check size={18} className="text-emerald-500 font-bold shrink-0" />
                <div>
                  <p className="font-bold">Recurso pronto para download!</p>
                  <p className="text-[11px] text-[#5f5e5e] mt-0.5">O arquivo zip com planos de aula e links de instalação foi entregue.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={handleSimulateDownload}
                  disabled={isDownloading}
                  className="w-full py-4 bg-[#ff8c00] hover:bg-[#904d00] disabled:bg-gray-200 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/10"
                  id="btn-download-trigger"
                >
                  <Download size={16} />
                  <span>{isDownloading ? 'Preparando Pacote...' : 'Fazer Download do Guia Escolar'}</span>
                </button>

                {isDownloading && (
                  <div className="space-y-1.5 p-3 rounded-lg bg-gray-50 border border-gray-100">
                    <div className="flex justify-between text-[11px] font-bold text-brand-primary">
                      <span>Progresso do Download</span>
                      <span>{downloadProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-brand-primary-container transition-all duration-200"
                        style={{ width: `${downloadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Clickable Screenshot Gallery Row */}
      <section className="py-10 border-t border-gray-100" id="screenshot-gallery-section">
        <h3 className="font-display text-lg font-bold text-[#1b1c1c] mb-6">Capturas do Jogo</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6" id="screenshots-grid">
          {edueduScreenshots.map((shot, idx) => (
            <div 
              key={idx}
              onClick={() => setSelectedScreenshot(shot.url)}
              className="group cursor-zoom-in relative rounded-2xl overflow-hidden border border-gray-200 h-44 shadow-xs hover:shadow-lg hover:border-[#ff8c00]/50 transition-all duration-300"
              title="Clique para ampliar captura"
            >
              <img
                src={shot.url}
                alt={shot.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 text-left">
                <h5 className="text-white text-xs font-bold font-display">{shot.title}</h5>
                <p className="text-gray-300 text-[10px] line-clamp-1 mt-0.5">{shot.description}</p>
              </div>
              
              <div className="absolute top-2 right-2 bg-black/55 hover:bg-[#ff8c00] text-white p-1 rounded-md text-[10px]">
                Ampliar
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DUA Integration guidelines panel */}
      <section className="py-10 border-t border-gray-100 container" id="dua-guideline-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12" id="grid-proposals-dua">
          
          <div className="space-y-6">
            <h3 className="font-display text-lg font-bold text-[#1b1c1c]">Diretrizes de Aplicação Escolar com DUA</h3>
            
            <p className="text-xs md:text-sm text-[#5f5e5e] leading-relaxed">
              Para obter o máximo de aproveitamento pedagógico do <strong>{game.name}</strong> seguindo o Desenho Universal de Aprendizagem, propomos a seguinte estruturação:
            </p>

            <div className="space-y-4">
              <div className="flex gap-3 text-left">
                <div className="w-6 h-6 rounded-full bg-[#fbf9f8] text-[#ff8c00] border border-gray-200 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</div>
                <div>
                  <h4 className="font-bold text-xs text-[#1b1c1c]">Sensibilização Prévia</h4>
                  <p className="text-[11px] text-[#5f5e5e] mt-1 leading-normal">Habilite o jogo em sessões iniciais curtas de 15 minutos, focando na motricidade fina.</p>
                </div>
              </div>
              
              <div className="flex gap-3 text-left">
                <div className="w-6 h-6 rounded-full bg-[#fbf9f8] text-[#ff8c00] border border-gray-200 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</div>
                <div>
                  <h4 className="font-bold text-xs text-[#1b1c1c]">Múltiplos Meios de Controle</h4>
                  <p className="text-[11px] text-[#5f5e5e] mt-1 leading-normal">Permita o uso de teclados externos ou canetas de toque para autistas com barreiras físicas.</p>
                </div>
              </div>

              <div className="flex gap-3 text-left">
                <div className="w-6 h-6 rounded-full bg-[#fbf9f8] text-[#ff8c00] border border-gray-200 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</div>
                <div>
                  <h4 className="font-bold text-xs text-[#1b1c1c]">Acompanhamento e Feedback</h4>
                  <p className="text-[11px] text-[#5f5e5e] mt-1 leading-normal">Crie momentos de verbalização onde a criança explica sua vitória no jogo, consolidando a meta linguística.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Requirements & Advisory support alert */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 text-left space-y-6 shadow-xs">
            <h4 className="font-display font-bold text-sm text-[#1b1c1c]">Especificações Técnicas</h4>
            
            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between pb-2 border-b">
                <span className="text-gray-500">Desenvolvedor Original</span>
                <span className="font-bold text-[#1b1c1c]">{game.developer}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-gray-500">Requisito de Sistema</span>
                <span className="font-bold text-[#1b1c1c]">iOS 12+ / Android 7.0+</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-gray-500">Modos de Jogo</span>
                <span className="font-bold text-[#1b1c1c]">Singleplayer Adaptativo</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-gray-500">Apoio Pedagógico</span>
                <span className="font-bold text-brand-primary">Língua Portuguesa (BNCC)</span>
              </div>
            </div>

            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs flex gap-2.5">
              <ShieldAlert className="text-amber-600 shrink-0 mt-0.5" size={16} />
              <p className="leading-relaxed">
                Este jogo não contém anúncios de terceiros ou microtransações, tornando-o plenamente seguro para uso livre no ambiente escolar.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Full Screen Image Lightbox Modal */}
      <AnimatePresence>
        {selectedScreenshot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedScreenshot(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col justify-center items-center p-4 cursor-zoom-out"
            id="screenshot-lightbox"
          >
            <div className="absolute top-6 right-6 text-white text-xs bg-white/20 px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <X size={14} />
              <span>Fechar</span>
            </div>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing click inside
              className="max-w-4xl w-full text-center space-y-4"
            >
              <img
                src={selectedScreenshot}
                alt="Visualização expandida captura em alta resolução"
                className="max-h-[75vh] mx-auto rounded-2xl border-2 border-white/10 shadow-2xl"
              />
              <p className="text-white font-sans text-xs md:text-sm">
                Toque em qualquer área para voltar à página de detalhes do jogo.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}