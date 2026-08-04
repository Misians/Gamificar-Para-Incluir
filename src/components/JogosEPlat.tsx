import React from 'react'
import { Link2 } from 'lucide-react' // Usando lucide-react para o ícone

const JogosEPlat = () => {
  return (
    <div className="bg-white p-12  border border-orange-600 relative ">
      <div className="max-w-7xl mx-auto px-6 md:px-10"> 

      
      
      <div className="bg-amber-100 text-orange-900 px-4 py-1 rounded-full text-sm font-medium inline-block mb-6">
        INFORMAÇÃO
      </div>
      
      <h2 className="text-3xl font-bold text-slate-800 mb-6 leading-tight">
        Jogos e Plataformas<br />Digitais.
      </h2>
      
      <div className="w-1/4 h-1 bg-amber-400 mb-10 rounded-full" />
      
      <p className="text-lg text-slate-700 leading-relaxed max-w-4xl">
        Os jogos e objetos digitais indicados nesta plataforma pertencem aos seus 
        respectivos autores e desenvolvedores, são recursos externos. O 'Gamificar 
        para Incluir' atua como um guia pedagógico, organizando e indicando links 
        para os ambientes oficiais, sem reproduzir ou reivindicar autoria 
        sobre esses recursos. Os jogos serão direcionados aos endereços oficiais.
      </p>
      </div>
    </div>
  )
}

export default JogosEPlat