import React, { useState } from 'react';
import { Mission } from '../types'; // Importe os dados e tipos
import { missionsData } from '../mockData.tsx';

export default function JornadaLeitores() {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  return (
    <div className="p-8 font-sans">
      <h2 className="text-2xl font-bold text-orange-600 mb-2">MISSÕES LEITURA A JORNADA DOS SUPER LEITORES</h2>
      <p className="text-sm text-gray-700 mb-6 leading-relaxed">
        As missões fazem parte de uma jornada de aprendizagem baseada em gamificação e nos princípios do Desenho Universal para a Aprendizagem (DUA), promovendo desafios, diferentes formas de participação e uma experiência inclusiva, envolvente e significativa para todos.
      </p>
      
      {/* Container da Trilha (Timeline) */}
      <div className="flex items-center justify-between overflow-x-auto">
        {missionsData.map((mission) => (
          <div 
            key={mission.id} 
            className="flex flex-col items-center text-center cursor-pointer min-w-[120px] transition-transform hover:scale-105"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
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

              {/* Renderização Condicional e Dinâmica de Imagens - Checagem segura de tamanho */}
              {selectedMission.details.contentImages && selectedMission.details.contentImages.length > 0 && (
                <section className="my-8">
                   <h5 className="font-bold text-lg mb-4 text-orange-500">Registros da Missão</h5>
                   <div className="flex flex-wrap gap-4">
                     {selectedMission.details.contentImages.map((imgSrc, index) => (
                       <img 
                         key={index} 
                         src={imgSrc} 
                         alt={`Registro ${index + 1}`} 
                         className="rounded-lg shadow-sm w-full md:w-[48%] object-cover h-48"
                       />
                     ))}
                   </div>
                </section>
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