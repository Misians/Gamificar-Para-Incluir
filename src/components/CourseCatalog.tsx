import React, { useState } from 'react';
import { Sparkles, Lightbulb, Gamepad2, BarChart3, Eye, ArrowRight, UserCheck, Quote, ChevronRight } from 'lucide-react';
import { REVIEWS_DATA, FOUNDERS_DATA } from '../data'; // GAMES_DATA removido daqui
import { Game, PageType } from '../types';
import { motion } from 'motion/react';
import Missions from '../components/Missions.tsx'

interface CourseCatalogProps {
  onSelectGame: (gameId: string) => void;
  setCurrentPage: (page: PageType) => void;
  searchQuery: string;
  games: Game[]; // Adicionado!
}

export default function CourseCatalog({
  onSelectGame,
  setCurrentPage,
  searchQuery,
  games, // Recebendo os jogos por prop
}: CourseCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  // Agora filtra baseando-se na prop games
  const filteredGames = games.filter((game) => {
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeCategory === 'todos') return matchesSearch;
    return matchesSearch && game.category.toLowerCase() === activeCategory.toLowerCase();
  });

  const categories = ['todos', 'alfabetização', 'inclusivo', 'colaborativo', 'linguagens'];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="animate-fade-in" id="course-catalog-page">
      
      {/* 1. Hero Section */}
      <section className="relative py-16 md:py-24 bg-white overflow-hidden border-b border-gray-100" id="hero-section">
        {/* Decorative background element background */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#fbf9f8] rounded-l-[120px] -z-10 translate-x-20 opacity-70" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 md:space-y-8 text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffdcc3] text-[#2f1500] font-semibold text-xs md:text-sm">
              <Sparkles size={14} className="text-[#ff8c00]" />
              <span>Gamificação e Educação Inclusiva</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-5xl font-extrabold text-[#1b1c1c] leading-tight select-none">
              Gamificar para Incluir: <br />
              <span className="text-[#ff8c00] relative inline-block">
                Educação para Todos
                <span className="absolute left-0 bottom-1 w-full h-1 bg-[#fffcb3] -z-10" />
              </span>
            </h1>
            
            <p className="font-sans text-base md:text-lg text-[#5f5e5e] leading-relaxed max-w-xl">
              O Guia de Jogos Educativos Acessíveis apoia educadores na integração da gamificação escolar. Baseado nos princípios do Desenho Universal para a Aprendizagem (DUA), ele oferece orientações práticas para:
            </p>
            <ul className="list-disc list-inside text-sm md:text-base text-[#5f5e5e] max-w-xl leading-relaxed">
              <li>Acessibilizar recursos e atividades de forma sensível.</li>
              <li>Respeitar os diferentes ritmos e estilos de aprendizagem.</li>
              <li>Eliminar barreiras e valorizar o potencial de cada aluno.</li>
            </ul>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => scrollToSection('com-usar-guia')}
                className="px-8 py-4 bg-[#ff8c00] hover:bg-[#904d00] text-white font-bold rounded-2xl shadow-lg shadow-orange-500/10 transition-all transform hover:-translate-y-0.5"
                id="hero-explore-guide"
              >
                Explorar Guia
              </button>
              
              <button
                onClick={() => scrollToSection('catalogo-jogos')}
                className="px-8 py-4 border-2 border-[#ff8c00] hover:bg-[#ffdcc3]/40 text-[#904d00] font-bold rounded-2xl transition-all"
                id="hero-explore-catalog"
              >
                Ver Catálogo
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center items-center relative"
          >
            <div className="absolute w-[450px] h-[450px] bg-[#ffdcc3]/30 rounded-full blur-3xl -z-10" />
            
            {/* Main high quality 3D mockup */}
            <div className="relative rounded-3xl p-2 bg-white/40 backdrop-blur-xs border border-gray-100 shadow-2xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7dGiWJN57ApjeN-JQrd-szc9DK15FZH7MdZICD5oTNf-6zTXE-B1CgJN2ZBJKt1EwciCq1ekGoqc7-yUWb6yURQV4vxGxEqdSyeHnL_IqnnNxdZMZtciZASgilY08qUlVa9Wnj5gUz1kf4C5Du3YdhGJaiaqu1iSCWd69lhYINyx7QE7ykx6dOHAGqJD33VvtqyTOWjyHcgUYC8YGR8TvVXRLGemo7walIibCsOS00v7c3jpw-CUxNIH1KE1WkQs6A-yroLQuhxBC"
                alt="Ilustração 3D premium apresentando um notebook e dispositivo flutuando com elementos de jogos de puzzle inclusivos"
                className="w-full max-w-lg h-auto rounded-2xl object-cover hover:scale-103 transition-transform duration-500"
                id="hero-main-banner"
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. Como usar este guia Step-by-Step */}
      <section className="py-20 bg-[#fbf9f8] relative overflow-hidden" id="com-usar-guia">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-[#904d00] uppercase font-bold text-xs tracking-wider">Metodologia Simples</span>
            <h2 className="font-display text-3xl font-bold text-[#1b1c1c]" id="guide-sec-title">
              Como usar este guia
            </h2>
            <p className="text-sm md:text-base text-[#5f5e5e] max-w-2xl mx-auto">
              Siga estes passos recomendados para planejar e integrar jogos digitais na sua rotina de classe seguindo os pilares do DUA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="group relative p-8 bg-white border border-gray-100 rounded-3xl hover:border-[#ff8c00] transition-all duration-300 hover:shadow-xl">
              <div className="absolute -top-6 left-8 w-12 h-12 bg-[#ff8c00] text-white font-display font-extrabold text-[#ffffff] flex items-center justify-center rounded-2xl shadow-lg">
                1
              </div>
              <div className="mt-4 space-y-4 text-left">
                <div className="inline-flex p-3 rounded-2xl bg-[#ffdcc3]/30 text-[#904d00]">
                  <Lightbulb size={24} className="fill-[#ff8c00]/10 text-[#ff8c00]" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#1b1c1c]">Identifique Objetivos</h3>
                <p className="font-sans text-xs md:text-sm text-[#5f5e5e] leading-relaxed">
                  Defina com precisão as metas de aprendizagem e os desafios peculiares de acessibilidade em curso no seu grupo de estudantes.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative p-8 bg-white border border-gray-100 rounded-3xl hover:border-[#ff8c00] transition-all duration-300 hover:shadow-xl">
              <div className="absolute -top-6 left-8 w-12 h-12 bg-[#ff8c00] text-white font-display font-extrabold text-[#ffffff] flex items-center justify-center rounded-2xl shadow-lg">
                2
              </div>
              <div className="mt-4 space-y-4 text-left">
                <div className="inline-flex p-3 rounded-2xl bg-[#ffdcc3]/30 text-[#904d00]">
                  <Gamepad2 size={24} className="text-[#904d00]" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#1b1c1c]">Escolha o Jogo</h3>
                <p className="font-sans text-xs md:text-sm text-[#5f5e5e] leading-relaxed">
                  Selecione um jogo do nosso catálogo que oferte ricas possibilidades de representação de conteúdo e flexibilidade de controle.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative p-8 bg-white border border-gray-100 rounded-3xl hover:border-[#ff8c00] transition-all duration-300 hover:shadow-xl">
              <div className="absolute -top-6 left-8 w-12 h-12 bg-[#ff8c00] text-white font-display font-extrabold text-[#ffffff] flex items-center justify-center rounded-2xl shadow-lg">
                3
              </div>
              <div className="mt-4 space-y-4 text-left">
                <div className="inline-flex p-3 rounded-2xl bg-[#ffdcc3]/30 text-[#904d00]">
                  <BarChart3 size={24} className="text-[#ff8c00]" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#1b1c1c]">Avalie o Impacto</h3>
                <p className="font-sans text-xs md:text-sm text-[#5f5e5e] leading-relaxed">
                  Monitore o senso de agência e o progresso curricular do estudante, realinhando as estratégias baseando-se no feedback empírico.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. DUA 3 Pillars Section */}
      <section className="py-20 bg-white bg-pattern-dots" id="dua-pillars">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <div className="space-y-6 text-left">
              <span className="text-[#ff8c00] font-bold text-xs uppercase tracking-widest block">Metodologia Universal</span>
              <h2 className="font-display text-3xl font-extrabold text-[#1b1c1c] leading-tight">
                Os 3 Pilares do Desenho Universal para a Aprendizagem (DUA)
              </h2>
              <p className="font-sans text-sm md:text-base text-[#5f5e5e] leading-relaxed">
                O DUA é uma estrutura científica que orienta o design de materiais pedagógicos customizáveis para remover barreiras de recepção e expressão, estendendo as oportunidades cognitivas.
              </p>

              <div className="space-y-4">
                
                {/* Pillar 1 */}
                <div className="flex gap-4 items-start p-5 bg-[#fbf9f8] rounded-2xl border border-[#ddc1ae]/30">
                  <div className="bg-[#FFE5D4] p-3 rounded-xl text-[#ff8c00]">
                    <Sparkles size={20} className="fill-[#ff8c00]" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-[#1b1c1c]">Engajamento (O "porquê")</h4>
                    <p className="text-xs text-[#5f5e5e] mt-1">
                      Estimular o interesse, recrutar a motivação intrapessoal e otimizar a autonomia com desafios nivelados ao perfil do aluno.
                    </p>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="flex gap-4 items-start p-5 bg-[#fbf9f8] rounded-2xl border border-[#ddc1ae]/30">
                  <div className="bg-[#E3F2FD] p-3 rounded-xl text-[#2196F3]">
                    <Eye size={20} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-[#1b1c1c]">Representação (O "quê")</h4>
                    <p className="text-xs text-[#5f5e5e] mt-1">
                      Apresentar as informações sob múltiplos formatos complementares: áudio, texto estruturado, ilustrações acessíveis e tátil.
                    </p>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="flex gap-4 items-start p-5 bg-[#fbf9f8] rounded-2xl border border-[#ddc1ae]/30">
                  <div className="bg-[#E8F5E9] p-3 rounded-xl text-[#4CAF50]">
                    <UserCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-[#1b1c1c]">Ação e Expressão (O "como")</h4>
                    <p className="text-xs text-[#5f5e5e] mt-1">
                      Habilitar ferramentas alternativas para os estudantes exteriorizarem competências de raciocínio verbal, lógico e cinestésico.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Side illustration displaying students */}
            <div className="relative">
              <div className="absolute top-4 right-4 -inset-2 bg-[#ff8c00]/10 rounded-[40px] transform rotate-1 -z-10" />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-Kf-rpyeVQjZyRAn9NxtRUzJyuci8shEDd80SKe6b7ANO7zsN7G2NctsYcQ9jBY1ar4Os6Gw9crhr41gN-IcdKiI9BU-0Szesxx0mPihe_OUWN-BQwdEG8hw26Z9KCzCmnEpSN27dk2LJyWDzrBUS0guBvNr0CQJ1wAomUdIsS8D8xPkPBQd5CDh-CXc8HFoyq5qxyHH_c7svXreVI3N-daLRYyuGh7O6NDrYGH574K7Yvah0VQphmEWS8lPp6vmCau3iEpazo8xW"
                alt="Alunos de características diversas aprendendo juntos com computadores portáteis em sala de aula iluminada e amigável"
                className="rounded-[36px] shadow-xl w-full object-cover aspect-video sm:aspect-square"
                id="dua-classroom-image"
              />
            </div>

          </div>
        </div>
      </section>
<Missions/>
      {/* 4. Core Catalog Section */}
      <section className="py-20 bg-gray-50 border-y border-gray-100" id="catalogo-jogos">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div className="space-y-3 text-left">
              <h2 className="font-display text-3xl font-extrabold text-[#1b1c1c]" id="catalog-title">
                Catálogo de Ferramentas
              </h2>
              <p className="text-xs md:text-sm text-[#5f5e5e]">
                Soluções lúdicas pré-selecionadas de acordo com as diretrizes e taxonomias do DUA.
              </p>
            </div>

            {/* Quick functional category filters on the page */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-full border transition-all ${
                    activeCategory === cat
                      ? 'bg-[#ff8c00] text-white border-transparent'
                      : 'bg-white text-[#5f5e5e] hover:bg-gray-100 border-gray-200'
                  }`}
                >
                  {cat === 'todos' ? 'Todos' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Grid display with cards */}
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="games-grid">
              {filteredGames.map((game) => (
                <div
                  key={game.id}
                  className="bg-white rounded-[24px] overflow-hidden border border-gray-100 flex flex-col group hover:shadow-2xl transition-all duration-300"
                  id={`card-game-${game.id}`}
                >
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={game.image}
                      alt={game.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 bg-[#ff8c00] text-white text-[9px] font-bold rounded-md uppercase tracking-wider">
                        {game.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col justify-between text-left">
                    <div className="space-y-2">
                      <span className="text-[10px] text-gray-400 font-mono font-bold tracking-wider uppercase">
                        {game.platform}
                      </span>
                      <h4 className="font-display font-bold text-base text-[#1b1c1c] leading-tight line-clamp-1">
                        {game.name}
                      </h4>
                      <p className="font-sans text-xs text-[#5f5e5e] leading-relaxed line-clamp-3">
                        {game.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500">
                        <span>⭐</span>
                        <span>{game.rating}</span>
                      </div>
                      
                      <button
                        onClick={() => onSelectGame(game.id)}
                        className="px-4 py-2 bg-brand-primary-container hover:bg-brand-primary text-white text-xs font-bold rounded-xl flex items-center gap-1 transition-all"
                        id={`btn-know-${game.id}`}
                      >
                        <span>Conhecer</span>
                        <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 text-center rounded-3xl border border-dashed border-gray-200">
              <p className="text-[#5f5e5e] text-sm">Nenhuma ferramenta coincide com os filtros aplicados.</p>
              <button
                onClick={() => { setActiveCategory('todos'); }}
                className="mt-3 text-xs font-bold text-[#ff8c00] underline"
              >
                Limpar filtros de busca
              </button>
            </div>
          )}

          <div className="mt-12 text-center">
            <button
              onClick={() => setCurrentPage('contact')}
              className="inline-flex items-center gap-2 text-xs font-bold text-brand-primary hover:text-[#ff8c00] group/all"
              id="request-customization-btn"
            >
              <span>Precisa de uma ferramenta customizada para sua escola?</span>
              <span className="underline">Solicite contato</span>
              <ArrowRight size={12} className="group-hover/all:translate-x-1 transition-all" />
            </button>
          </div>

        </div>
      </section>

      

      {/* 5. Teachers' Testimonials/Reviews */}
      <section className="py-20 bg-white" id="testemunhos-docentes">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-display text-3xl font-bold text-[#1b1c1c]" id="reviews-sec-title">
              Vozes e Relatos dos Professores
            </h2>
            <p className="text-xs md:text-sm text-[#5f5e5e] max-w-2xl mx-auto">
              Veja o impacto transformador da introdução dos jogos e princípios inclusivos DUA relatado por quem vive a sala de aula.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS_DATA.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xs relative flex flex-col justify-between text-left group hover:border-[#ff8c00]/30 transition-all duration-300"
                id={`testimonial-${rev.id}`}
              >
                <Quote size={40} className="text-orange-500/10 absolute top-5 right-6" />
                
                <div className="relative space-y-4">
                  <p className="font-sans italic text-sm text-[#1b1c1c] leading-relaxed">
                    "{rev.text}"
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-50">
                  <div className="w-10 h-10 rounded-full bg-[#fbf9f8] border border-gray-200 text-brand-primary uppercase flex items-center justify-center font-bold text-xs">
                    {rev.avatarInitials}
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#1b1c1c]">{rev.author}</h5>
                    <p className="font-sans text-[10px] text-gray-500 mt-0.5">{rev.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Idealizadores do Projeto (Founders) */}
      <section className="py-20 bg-gray-50 border-t border-gray-100" id="founders-section">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-[#ff8c00] font-bold text-xs uppercase tracking-widest">Equipe Editorial & Apoio</span>
            <h2 className="font-display text-3xl font-extrabold text-[#1b1c1c]" id="founders-title">
              Idealizadores do Projeto
            </h2>
            <p className="text-xs md:text-sm text-[#5f5e5e] max-w-xl mx-auto">
              Pesquisadores e designers dedicados a conceber materiais acessíveis e lúdicos que garantam a aprendizagem plena.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {FOUNDERS_DATA.map((founder) => (
              <div
                key={founder.name}
                className="text-center space-y-4 group"
                id={`founder-${founder.name.toLowerCase().replace(/\s/g, '-')}`}
              >
                {/* Rounded avatar container */}
                <div className="w-40 h-40 mx-auto rounded-[38px] overflow-hidden border-2 border-transparent group-hover:border-[#ff8c00] shadow-lg group-hover:scale-103 transition-all duration-300">
                  <img
                    src={founder.avatar}
                    alt={`Retrato oficial da idealizadora ${founder.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-lg text-[#1b1c1c]">{founder.name}</h4>
                  <p className="font-mono text-xs font-bold text-[#ff8c00] uppercase tracking-wider">{founder.role}</p>
                  <p className="font-sans text-xs text-[#5f5e5e] max-w-xs mx-auto pt-1 leading-relaxed">
                    {founder.bio}
                  </p>
                  
                  {/* Digital links corrigidos usando a tag <a> */}
                  <div className="flex justify-center gap-2 pt-3">
                    <a
                      href={founder.lattesLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 px-2.5 rounded bg-white text-xs border border-gray-300 text-gray-600 hover:border-[#ff8c00] hover:text-[#ff8c00] transition-colors"
                      title="Currículo Lattes"
                    >
                      Lattes
                    </a>
                    <a
                      href={founder.Linkedin || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 px-2.5 rounded bg-white text-xs border border-gray-300 text-gray-600 hover:border-[#ff8c00] hover:text-[#ff8c00] transition-colors"
                      title="Acessar LinkedIn"
                    >
                      Linkedin
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}