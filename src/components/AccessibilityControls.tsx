import React, { useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, Contrast, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

declare global {
  interface Window {
    VLibras: any;
  }
}

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    vw?: string;
    'vw-access-button'?: string;
    'vw-plugin-wrapper'?: string;
  }
}

interface AccessibilityControlsProps {
  fontSizeScale: number;
  setFontSizeScale: (updater: (prev: number) => number) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
}

export default function AccessibilityControls({
  fontSizeScale,
  setFontSizeScale,
  highContrast,
  setHighContrast,
}: AccessibilityControlsProps) {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [spokenAssistant, setSpokenAssistant] = useState(false);
  const [librasActive, setLibrasActive] = useState(false);

  // Inicializa o script do VLibras
  useEffect(() => {
    const scriptId = 'vlibras-script';
    const existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
      script.async = true;
      script.onload = () => {
        if (window.VLibras) {
          new window.VLibras.Widget('https://vlibras.gov.br/app');
        }
      };
      document.body.appendChild(script);
    } else {
      const wrapper = document.querySelector('[vw-plugin-wrapper]');
      if (window.VLibras && wrapper && wrapper.innerHTML === '') {
        new window.VLibras.Widget('https://vlibras.gov.br/app');
      }
    }
  }, []);


  useEffect(() => {
    if (!('speechSynthesis' in window)) return;

    let timeoutId: NodeJS.Timeout;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Pega o texto, ou o aria-label, ou o title do elemento
      const textToRead = target.innerText || target.getAttribute('aria-label') || target.title;

      // Filtra para não ler espaços vazios ou a própria estrutura do VLibras
      if (textToRead && textToRead.trim() !== '' && !target.closest('[vw="true"]')) {
        
        // Cancela a fala anterior para não encavalar o áudio
        window.speechSynthesis.cancel();

        // Adiciona um pequeno atraso (debounce) para não ler se o usuário só passar o mouse rápido
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          const utterance = new SpeechSynthesisUtterance(textToRead);
          utterance.lang = 'pt-BR'; // Força o idioma para português
          utterance.rate = 0.8; // Velocidade da fala (1 é o normal, 1.2 é um pouco mais dinâmico)
          utterance.pitch = 1.5; // Tom da voz
          
          window.speechSynthesis.speak(utterance);
        }, 200);
      }
    };

    if (spokenAssistant) {
      document.addEventListener('mouseover', handleMouseOver);
    } else {
      window.speechSynthesis.cancel();
      document.removeEventListener('mouseover', handleMouseOver);
    }

    return () => {
      clearTimeout(timeoutId);
      window.speechSynthesis.cancel();
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [spokenAssistant]);

  const handleIncreaseFont = () => {
    setFontSizeScale((prev) => Math.min(prev + 0.1, 1.4));
  };

  const handleDecreaseFont = () => {
    setFontSizeScale((prev) => Math.max(prev - 0.1, 0.85));
  };

  const handleToggleVLibras = () => {
    setLibrasActive(!librasActive);
    const vlibrasButton = document.querySelector('[vw-access-button]') as HTMLElement;
    if (vlibrasButton) {
      vlibrasButton.click();
    }
  };

  return (
    <>
      <div vw="true" className="enabled">
        <div vw-access-button="true" className="active" style={{ display: 'none' }}></div>
        <div vw-plugin-wrapper="true">
          <div className="vw-plugin-top-wrapper"></div>
        </div>
      </div>

      <aside 
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 p-2.5 rounded-l-2xl border-y border-l bg-white/95 shadow-xl border-brand-border"
        aria-label="Controles de Acessibilidade"
        id="accessibility-aside"
      >
        <button
          onClick={handleIncreaseFont}
          className="w-12 h-12 flex flex-col items-center justify-center rounded-xl bg-brand-surface-container-low hover:bg-brand-primary-container hover:text-white transition-all text-[#1b1c1c] font-bold text-sm"
          title="Aumentar Fonte"
          aria-label="Botão para Aumentar a Fonte"
        >
          <span className="text-xs">A+</span>
          <ZoomIn size={16} className="mt-0.5" />
        </button>

        <button
          onClick={handleDecreaseFont}
          className="w-12 h-12 flex flex-col items-center justify-center rounded-xl bg-brand-surface-container-low hover:bg-brand-primary-container hover:text-white transition-all text-[#1b1c1c] font-bold text-sm"
          title="Diminuir Fonte"
          aria-label="Botão para Diminuir a Fonte"
        >
          <span className="text-xs">A-</span>
          <ZoomOut size={16} className="mt-0.5" />
        </button>

        <button
          onClick={() => setHighContrast(!highContrast)}
          className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all ${
            highContrast
              ? 'bg-[#1b1c1c] text-[#ff8c00] ring-2 ring-[#ff8c00]'
              : 'bg-brand-surface-container-low hover:bg-[#1b1c1c] hover:text-white text-[#1b1c1c]'
          }`}
          title="Alternar Alto Contraste"
          aria-label="Botão para Alternar Alto Contraste"
        >
          <Contrast size={20} />
        </button>

        <button
          onClick={handleToggleVLibras}
          className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all ${
            librasActive
              ? 'bg-brand-primary-container text-white ring-2 ring-brand-primary'
              : 'bg-brand-surface-container-low hover:bg-brand-primary-container hover:text-white text-[#1b1c1c]'
          }`}
          title="Ativar suporte em VLibras"
          aria-label="Botão para Ativar suporte em VLibras"
        >
          <span className="text-xs font-bold font-mono">LIBRAS</span>
        </button>

        <button
          onClick={() => setShowSettingsModal(!showSettingsModal)}
          className="w-12 h-12 flex items-center justify-center rounded-xl bg-brand-surface-container-low hover:bg-brand-primary-container hover:text-white transition-all text-[#1b1c1c]"
          title="Mais opções de acessibilidade"
          aria-label="Botão para abrir mais opções de acessibilidade"
        >
          <MessageSquare size={20} />
        </button>
      </aside>

      <AnimatePresence>
        {showSettingsModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="fixed bottom-6 right-16 z-50 max-w-sm w-80 bg-white rounded-2xl shadow-2xl border border-brand-border p-5"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h4 className="font-display font-bold text-brand-primary">Acessibilidade Extra</h4>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xs px-2 py-0.5 rounded border border-gray-200"
                aria-label="Fechar painel de acessibilidade"
              >
                Fechar
              </button>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              Esta plataforma segue estritamente os princípios do <strong>Desenho Universal para Aprendizagem (DUA)</strong>.
            </p>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => setSpokenAssistant(!spokenAssistant)}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                  spokenAssistant
                    ? 'bg-brand-primary text-white border-transparent'
                    : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
                }`}
                aria-label={spokenAssistant ? "Desativar Leitor de Tela" : "Ativar Leitor de Tela"}
              >
                <MessageSquare size={14} />
                {spokenAssistant ? '🔊 Leitor de Tela Ativado' : '🔇 Ativar Leitor de Tela'}
              </button>
              
              <div className="p-2.5 bg-brand-primary-fixed/30 rounded-lg text-center text-xs text-brand-on-primary-fixed border border-brand-outline-variant/60" aria-live="polite">
                Escala atual de zoom: <strong className="font-mono text-sm">{Math.round(fontSizeScale * 100)}%</strong>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}