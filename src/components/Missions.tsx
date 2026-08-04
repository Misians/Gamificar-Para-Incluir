import React, { useEffect, useState } from 'react';
import { Mission } from '../types'; // Importe os dados e tipos
import { missionsData } from '../mockData.tsx';

export default function JornadaLeitores() {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [viewerImage, setViewerImage] = useState<string | null>(null);

  // Bloqueia o scroll do body enquanto o modal da missão estiver aberto
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (selectedMission) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = prev;
    }
    return () => { document.body.style.overflow = prev; };
  }, [selectedMission]);

  // Tecla Escape: fecha primeiro o visualizador, depois o modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (viewerImage) setViewerImage(null);
        else if (selectedMission) setSelectedMission(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [viewerImage, selectedMission]);

  return (
    <div className="p-8 font-sans bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 leading-tight text-orange-600 ">MISSÕES LEITURA A JORNADA DOS SUPER LEITORES</h2>
      <p className="text-lg text-gray-700 mb-6 leading-relaxed ">
        As missões fazem parte de uma jornada de aprendizagem baseada em gamificação e nos princípios do Desenho Universal para a Aprendizagem (DUA), promovendo desafios, diferentes formas de participação e uma experiência inclusiva, envolvente e significativa para todos.
      </p>
      
      {/* Container da Trilha (Timeline) */}
      <div className="flex items-center justify-between overflow-x-auto">
        {missionsData.map((mission) => (
          <div 
            key={mission.id} 
            className="flex flex-col max-w-[120px] min-h-[100px] items-center text-center cursor-pointer min-w-[120px] transition-transform hover:scale-105"
            onClick={() => setSelectedMission(mission)}
          >
            {/* Círculo com o número e ícone */}
            <div className="relative w-20 h-20 rounded-full border-4 border-orange-400 flex items-center justify-center bg-white shadow-md">
              <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-white font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {mission.id}
              </span>
              
              {/* Renderiza o ícone SVG aqui */}
              {mission.icon} 
              
            </div>
            <p className="mt-4 text-xs font-bold text-gray-700 uppercase tracking-wide">
              {mission.subtitle}
            </p>
          </div>
        ))}
      </div>

      {/* Modal / Box de Detalhes */}
      {selectedMission && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedMission(null); }}
        >
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative">
            
            {/* Botão de Fechar */}
            <button 
              onClick={() => setSelectedMission(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
            >
              &times;
            </button>

            {/* Cabeçalho do Modal */}
            <div className="border-b-2 border-orange-500 pb-4 mb-6">
              <h3 className="text-xl font-bold text-gray-800">{selectedMission.title}</h3>
              <h4 className="text-2xl font-black text-orange-600">{selectedMission.subtitle}</h4>
            </div>

            {/* Corpo do Conteúdo */}
            <div className="space-y-6 text-gray-700">
              
              <section>
                <h5 className="font-bold text-lg mb-2 text-orange-500">O que aconteceu nesta etapa?</h5>
                <p className="leading-relaxed">{selectedMission.details.whatHappened}</p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section>
                  <h5 className="font-bold text-lg mb-2 text-orange-500">Objetivos</h5>
                  <ul className="list-disc pl-5 space-y-1">
                    {/* Adicionado ?. para evitar erros se objectives for undefined */}
                    {selectedMission.details.objectives?.map((obj, i) => <li key={i}>{obj}</li>)}
                  </ul>
                </section>
                <section>
                  <h5 className="font-bold text-lg mb-2 text-orange-500">Recursos utilizados</h5>
                  <ul className="list-disc pl-5 space-y-1">
                    {/* Adicionado ?. para recursos */}
                    {selectedMission.details.resources?.map((res, i) => <li key={i}>{res}</li>)}
                  </ul>
                </section>
              </div>

                {/* Renderização Condicional e Dinâmica de Imagens com possibilidade de expandir e baixar */}
                {selectedMission.details.contentImages && selectedMission.details.contentImages.length > 0 && (
                  <section className="my-8">
                     <h5 className="font-bold text-lg mb-4 text-orange-500">Registros da Missão</h5>
                     <div className="flex flex-wrap gap-4">
                       {selectedMission.details.contentImages.map((imgSrc, index) => (
                         <button
                           key={index}
                           type="button"
                           onClick={() => setViewerImage(imgSrc)}
                           className="rounded-lg overflow-hidden p-0 border-0 bg-transparent cursor-pointer"
                           aria-label={`Abrir imagem ${index + 1}`}
                         >
                           <img
                             src={imgSrc}
                             alt={`Registro ${index + 1}`}
                             className="rounded-lg shadow-sm object-contain"
                             style={{ width: 320, height: 'auto' }}
                           />
                         </button>
                       ))}
                     </div>
                  </section>
                )}

                {/* Visualizador de imagem (lightbox) */}
                {viewerImage && (
                  <div
                    className="fixed inset-0 z-60 bg-black bg-opacity-80 flex items-center justify-center p-6"
                    onClick={(e) => { if (e.target === e.currentTarget) setViewerImage(null); }}
                  >
                    <div className="relative max-w-[90vw] max-h-[90vh] w-full flex flex-col items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setViewerImage(null)}
                        className="absolute top-2 right-2 text-white bg-black/30 rounded-full w-10 h-10 flex items-center justify-center"
                        aria-label="Fechar visualizador"
                      >
                        ×
                      </button>

                      <img src={viewerImage} alt="Visualização" className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-lg" />

                      <div className="mt-2 flex gap-2">
                        <a href={viewerImage} download className="px-4 py-2 bg-white text-[#ff8c00] font-bold rounded-lg shadow">Baixar imagem</a>
                        <a href={viewerImage} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-transparent border border-white text-white rounded-lg">Abrir original</a>
                      </div>
                    </div>
                  </div>
                )}

              <section>
                <h5 className="font-bold text-lg mb-2 text-orange-500">O que observamos?</h5>
                <p className="leading-relaxed">{selectedMission.details.observations}</p>
              </section>

              {/* Seção de replicação com checagem segura */}
              {selectedMission.details.replication && (
                <section className="bg-orange-50 p-6 rounded-lg">
                  <h5 className="font-bold text-lg mb-4 text-orange-600">Como replicar esta missão?</h5>
                  <p><strong>Tempo estimado:</strong> {selectedMission.details.replication.time}</p>
                  
                  <div className="mt-4">
                    <strong className="block mb-2">Materiais necessários:</strong>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedMission.details.replication.materials?.map((mat, i) => <li key={i}>{mat}</li>)}
                    </ul>
                  </div>
                  
                  <div className="mt-4">
                    <strong className="block mb-2">Passo a passo:</strong>
                    <ol className="list-decimal pl-5 space-y-2">
                      {selectedMission.details.replication.steps?.map((step, i) => <li key={i}>{step}</li>)}
                    </ol>
                  </div>
                </section>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section>
                  <h5 className="font-bold text-lg mb-2 text-orange-500">Possibilidades de acessibilização (DUA)</h5>
                  <ul className="list-disc pl-5 space-y-1">
                    {/* Adicionado ?. para acessibilidade */}
                    {selectedMission.details.accessibility?.map((acc, i) => <li key={i}>{acc}</li>)}
                  </ul>
                </section>
                <section>
                  <h5 className="font-bold text-lg mb-2 text-orange-500">Habilidades da BNCC</h5>
                  <ul className="list-disc pl-5 space-y-1">
                    {/* Adicionado ?. para habilidades da BNCC */}
                    {selectedMission.details.bnccSkills?.map((skill, i) => <li key={i}>{skill}</li>)}
                  </ul>
                </section>
              </div>

              <section className="bg-yellow-50 p-4 border-l-4 border-yellow-400 rounded">
                <h5 className="font-bold text-lg mb-2 text-yellow-700">Dicas para professores</h5>
                <p className="leading-relaxed">{selectedMission.details.teacherTips}</p>
              </section>

            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}