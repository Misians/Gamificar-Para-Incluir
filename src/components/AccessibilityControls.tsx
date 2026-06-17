import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Contrast, HelpCircle, Eye, EyeOff, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
  const [showLibrasModal, setShowLibrasModal] = useState(false);
  const [spokenAssistant, setSpokenAssistant] = useState(false);
  const [librasActive, setLibrasActive] = useState(false);

  // Accessible boundary zoom
  const handleIncreaseFont = () => {
    setFontSizeScale((prev) => Math.min(prev + 0.1, 1.4));
  };

  const handleDecreaseFont = () => {
    setFontSizeScale((prev) => Math.max(prev - 0.1, 0.85));
  };

  return (
    <>
      {/* Side Control buttons - Floats on right side beautifully */}
      <aside 
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 p-2.5 rounded-l-2xl border-y border-l bg-white/95 shadow-xl border-brand-border"
        aria-label="Acessibilidade"
        id="accessibility-aside"
      >
        <button
          onClick={handleIncreaseFont}
          className="w-12 h-12 flex flex-col items-center justify-center rounded-xl bg-brand-surface-container-low hover:bg-brand-primary-container hover:text-white transition-all text-[#1b1c1c] font-bold text-sm"
          title="Aumentar Fonte (A+)"
          aria-label="Aumentar Fonte"
          id="btn-font-plus"
        >
          <span className="text-xs">A+</span>
          <ZoomIn size={16} className="mt-0.5" />
        </button>

        <button
          onClick={handleDecreaseFont}
          className="w-12 h-12 flex flex-col items-center justify-center rounded-xl bg-brand-surface-container-low hover:bg-brand-primary-container hover:text-white transition-all text-[#1b1c1c] font-bold text-sm"
          title="Diminuir Fonte (A-)"
          aria-label="Diminuir Fonte"
          id="btn-font-minus"
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
          aria-label="Alternar Alto Contraste"
          id="btn-contrast"
        >
          <Contrast size={20} />
        </button>

        <button
          onClick={() => {
            setLibrasActive(!librasActive);
            setShowLibrasModal(true);
          }}
          className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all ${
            librasActive
              ? 'bg-brand-primary-container text-white ring-2 ring-brand-primary'
              : 'bg-brand-surface-container-low hover:bg-brand-primary-container hover:text-white text-[#1b1c1c]'
          }`}
          title="Suporte em Libras"
          aria-label="Suporte em Libras"
          id="btn-libras"
        >
          {/* Custom visually friendly hands simulation */}
          <span className="text-xs font-bold font-mono">LIBRAS</span>
        </button>
      </aside>

      {/* Libras / Accessibility Panel Modal */}
      <AnimatePresence>
        {showLibrasModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="fixed bottom-6 right-16 z-50 max-w-sm w-80 bg-white rounded-2xl shadow-2xl border border-brand-border p-5"
            id="libras-support-panel"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h4 className="font-display font-bold text-brand-primary" id="support-panel-title">Assistente de Acessibilidade</h4>
              </div>
              <button
                onClick={() => {
                  setShowLibrasModal(false);
                  setLibrasActive(false);
                }}
                className="text-gray-400 hover:text-gray-600 text-xs px-2 py-0.5 rounded border border-gray-200"
                id="close-libras-panel"
              >
                Fechar
              </button>
            </div>

            <div className="bg-brand-surface-container-low rounded-xl p-4 text-center border mb-3">
              {/* Virtual Libras avatar container or helpful notice */}
              <div className="aspect-video bg-[#303031] rounded-lg flex flex-col items-center justify-center text-white relative overflow-hidden">
                <span className="text-xs bg-[#ff8c00] text-white px-2 py-0.5 rounded absolute top-2 left-2 uppercase tracking-wide font-mono font-bold">Libras Ativo</span>
                <p className="text-3xl animate-bounce">👋👐</p>
                <p className="text-xs text-gray-300 mt-2">Traduzindo conteúdo para Libras...</p>
              </div>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              Esta plataforma segue estritamente os princípios do <strong>Desenho Universal para Aprendizagem (DUA)</strong>. Use os controles para adaptar as fontes e contrastes de acordo com suas necessidades.
            </p>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => setSpokenAssistant(!spokenAssistant)}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                  spokenAssistant
                    ? 'bg-brand-primary text-white border-transparent'
                    : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
                }`}
                id="toggle-spoken-assist"
              >
                <MessageSquare size={14} />
                {spokenAssistant ? '🔊 Leitor de Tela Ativado' : '🔇 Ativar Leitor de Tela (Demo)'}
              </button>
              
              <div className="p-2.5 bg-brand-primary-fixed/30 rounded-lg text-center text-xs text-brand-on-primary-fixed border border-brand-outline-variant/60">
                Escala atual de zoom: <strong className="font-mono text-sm">{Math.round(fontSizeScale * 100)}%</strong>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
