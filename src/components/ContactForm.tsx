import React, { useState } from 'react';
import { Mail, MapPin, MessageSquare, PhoneCall, CheckCircle, Send, Instagram, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import uernfoto from '../assets/uern.jpeg';
export default function ContactForm() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: 'Suporte Técnico',
    mensagem: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome.trim() || !formData.email.trim() || !formData.mensagem.trim()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formPayload = new FormData();
      formPayload.append('name', formData.nome.trim());
      formPayload.append('email', formData.email.trim());
      formPayload.append('subject', `Contato - ${formData.assunto}`);
      formPayload.append('message', formData.mensagem.trim());

      const response = await fetch('https://formsubmit.co/ajax/alinebcbrum@gmail.com', {
        method: 'POST',
        body: formPayload,
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar mensagem');
      }

      setSubmitStatus('success');
      setFormData({
        nome: '',
        email: '',
        assunto: 'Suporte Técnico',
        mensagem: '',
      });
    } catch (error) {
      setSubmitStatus('error');
      const mailtoLink = `mailto:alinebcbrum@gmail.com?subject=${encodeURIComponent(`Contato - ${formData.assunto}`)}&body=${encodeURIComponent(`Nome: ${formData.nome.trim()}\nE-mail: ${formData.email.trim()}\n\nMensagem:\n${formData.mensagem.trim()}`)}`;
      window.location.href = mailtoLink;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in" id="contact-page-container">
      
      {/* Hero & Contact Section */}
      <section className="relative min-h-[750px] flex items-center py-20 bg-cover bg-center overflow-hidden">
        {/* Cinematic Backdrop background Image absolute banner */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbQSUZXw5gW4v3FMh54hydwXyCMexuJBlFYOR5y2udsQaAbaDs2UH79tq38VpZFKshLRfWGappBlHkX9hfz_WVSLuZkvXLkhepB6h0g2WjDKA70oMdp9bBGUyD-y19AClmiaGq3IfeXgo7I8wyoWg9RTAAAiaGHunjnc1S7SzXL01RjtmL6tUDSPNS5GYdPk8jx_i9_izOiIB9Abfn9JUKmY9bzhYKimjm6jKWFILGR1dWxeCQBMOd_MOr5dERlv36YWdkeTlC1UeN"
            alt="Crianças sorridentes colaborando juntas com tecnologia lúdica"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/75 backdrop-blur-[3px]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
            
            {/* Left Column: Glassmorphic Contact Form */}
            <div className="lg:col-span-7 bg-white/95 p-8 md:p-12 rounded-[28px] border border-[#ddc1ae]/40 shadow-2xl relative text-left">
              <span className="text-[#904d00] text-xs font-bold uppercase tracking-widest">Suporte Integrado</span>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold text-[#1b1c1c] mb-2 mt-1">Contate-nos</h1>
              <p className="font-sans text-sm md:text-base text-[#5f5e5e] mb-8 leading-relaxed">
                Estamos prontos para auxiliar você, pais ou administradores públicos a estruturar caminhos inclusivos. Preencha o formulário para agendar um alinhamento.
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-6" id="web-contact-form">
                
                {submitStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2"
                  >
                    <CheckCircle className="text-emerald-500 shrink-0" size={18} />
                    <span>Mensagem enviada com sucesso! Logo retornaremos por e-mail.</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm"
                  >
                    Preencha todos os campos obrigatórios (Nome, E-mail, Mensagem).
                  </motion.div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-sans text-[11px] font-bold text-gray-500 uppercase tracking-wider block">NOME COMPLETO *</label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      placeholder="Seu nome completo"
                      className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-[#ff8c00] focus:ring-2 focus:ring-orange-500/10 focus:outline-none transition-all text-sm text-[#1b1c1c] bg-white"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="font-sans text-[11px] font-bold text-gray-500 uppercase tracking-wider block">E-MAIL DO TRABALHO *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@exemplo.com"
                      className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-[#ff8c00] focus:ring-2 focus:ring-orange-500/10 focus:outline-none transition-all text-sm text-[#1b1c1c] bg-white"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-sans text-[11px] font-bold text-gray-500 uppercase tracking-wider block">ASSUNTO PRINCIPAL</label>
                  <select
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-[#ff8c00] focus:ring-2 focus:ring-orange-500/10 focus:outline-none transition-all text-sm text-[#1b1c1c] bg-white cursor-pointer"
                    disabled={isSubmitting}
                  >
                    <option value="Suporte Técnico">Suporte Técnico ou Acessibilidade</option>
                    <option value="Parcerias Escolares">Parcerias e Adensamento Escolar</option>
                    <option value="Dúvidas sobre Jogos">Dúvidas sobre Jogos / DUA</option>
                    <option value="Sugestões de Conteúdo">Sugestão de Novo Conteúdo</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="font-sans text-[11px] font-bold text-gray-500 uppercase tracking-wider block">SUA MENSAGEM *</label>
                  <textarea
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleInputChange}
                    placeholder="Como podemos ajudar a sua instituição hoje?"
                    rows={4}
                    className="w-full p-4 rounded-xl border border-gray-300 focus:border-[#ff8c00] focus:ring-2 focus:ring-orange-500/10 focus:outline-none transition-all text-sm text-[#1b1c1c] bg-white"
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto h-12 px-8 bg-[#ff8c00] hover:bg-[#904d00] text-white font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 shadow-lg shadow-orange-500/15 uppercase tracking-wider text-xs"
                >
                  {isSubmitting ? (
                    <span>Enviando...</span>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Enviar Mensagem</span>
                    </>
                  )}
                </button>

              </form>
            </div>

            {/* Right Column: Dynamic Support Channel Buttons */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="bg-white/95 p-8 md:p-10 rounded-[24px] border border-[#ddc1ae]/30 shadow-xl">
                <h2 className="font-display text-xl font-bold text-[#1b1c1c] mb-6">Canais de Atendimento</h2>
                
                <div className="space-y-4">
                  {/* Whatsapp link */}
                  <a
                    href="https://wa.me/5584991761178"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-200 hover:border-emerald-500 hover:shadow-md transition-all duration-300"
                    id="link-whatsapp"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 flex items-center justify-center bg-[#25D366]/10 text-[#25D366] rounded-full shrink-0">
                        <MessageSquare size={22} className="fill-[#25D366]/5" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">WHATSAPP</p>
                        <p className="font-sans text-xs md:text-sm font-semibold text-[#1b1c1c] group-hover:text-emerald-600">Conversar agora</p>
                      </div>
                    </div>
                    <ExternalLink size={14} className="text-gray-400 group-hover:text-emerald-500 transition-colors" />
                  </a>

                  {/* Instagram Link */}
                  <a
                    href="https://www.instagram.com/alinebcbrum.aa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-200 hover:border-pink-500 hover:shadow-md transition-all duration-300"
                    id="link-instagram"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 flex items-center justify-center bg-[#E4405F]/10 text-[#E4405F] rounded-full shrink-0">
                        <Instagram size={22} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">INSTAGRAM</p>
                        <p className="font-sans text-xs md:text-sm font-semibold text-[#1b1c1c] group-hover:text-pink-600">Seguir @alinebcbrum.aa</p>
                      </div>
                    </div>
                    <ExternalLink size={14} className="text-gray-400 group-hover:text-pink-500 transition-colors" />
                  </a>
                </div>

                {/* Additional static address detail items */}
                <div className="mt-8 pt-8 border-t border-gray-100 space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-brand-surface-container-low rounded-xl text-[#904d00] shrink-0">
                      <Mail size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Direto</p>
                      <p className="font-sans text-xs md:text-sm text-[#1b1c1c] font-medium">alinebcbrum@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-brand-surface-container-low rounded-xl text-[#904d00] shrink-0">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sede do Projeto</p>
                      <p className="font-sans text-xs md:text-sm text-[#1b1c1c] font-medium leading-normal">
                        Tibau do Sul
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              <div className="bg-white/95 p-8 md:p-10 rounded-[24px] border border-[#ddc1ae]/30 shadow-xl">
                <h2 className="font-display text-xl font-bold text-[#1b1c1c] mb-6">Autoria e Créditos</h2>
                <div className="space-y-6 text-sm text-[#5f5e5e] leading-relaxed">
                  <div>
                    <h3 className="font-semibold text-sm text-[#1b1c1c] uppercase tracking-wider mb-2">Autoria e responsabilidade pelo conteúdo</h3>
                    <p className="font-bold text-[#1b1c1c]">Aline Benevides Câmara Brum</p>
                    <p>Professora-pesquisadora</p>
                    <p>Mestrado Profissional em Educação Inclusiva – PROFEI</p>
                    <p>Universidade do Estado do Rio Grande do Norte – UERN</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm text-[#1b1c1c] uppercase tracking-wider mb-2">Orientação Acadêmica</h3>
                    <p>Orientadora: Dra. Francisca Maria Gomes Cabral</p>
                    <p>Coorientador: Dr. Raul Benites Paradeda</p>
                    <p>Programa de Mestrado Profissional em Educação Inclusiva – PROFEI/UERN</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm text-[#1b1c1c] uppercase tracking-wider mb-2">Desenvolvimento do Gamificar para Incluir</h3>
                    <p>Pesquisa, produção textual, organização pedagógica e curadoria dos conteúdos: Aline Benevides Câmara Brum</p>
                    <p>Orientação da pesquisa acadêmica, produção textual e organização pedagógica: Dra. Francisca Maria Gomes Cabral Soares</p>
                    <p>Orientação da curadoria de conteúdos, plataformas e jogos, e orientação para o desenvolvimento web: Dr. Raul Benites Paradeda</p>
                    <p>Desenvolvimento web: Artemísia</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm text-[#1b1c1c] uppercase tracking-wider mb-2">Projeto Educacional “Gamificar para Incluir”</h3>
                    <p>Recurso Educacional desenvolvido no âmbito do Mestrado Profissional em Educação Inclusiva – PROFEI, da Universidade do Estado do Rio Grande do Norte – UERN voltado à construção e ao compartilhamento de práticas, estratégias e recursos pedagógicos que articulam gamificação, alfabetização e princípios do Desenho Universal para a Aprendizagem (DUA), buscando favorecer a participação e as diferentes formas de aprender.</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm text-[#1b1c1c] uppercase tracking-wider mb-2">Direitos autorais e uso do conteúdo</h3>
                    <p>Os textos e materiais autorais disponibilizados no Gamificar para Incluir destinam-se prioritariamente a fins educacionais, formativos e de pesquisa. É permitida a utilização e a reprodução dos conteúdos autorais para fins educacionais e não comerciais, desde que sejam preservados os créditos e devidamente indicada a fonte.</p>
                    <p className="font-semibold">Referência sugerida: BRUM, Aline Benevides Câmara. Gamificar para Incluir. Produto Educacional. Mestrado Profissional em Educação Inclusiva – PROFEI/UERN, 2026. Disponível em: [endereço eletrônico do site]. Acesso em: [dia mês ano].</p>
                    <p>Não é permitida a reprodução, alteração ou utilização comercial de materiais de terceiros presentes neste site em desacordo com as respectivas licenças e direitos autorais.</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm text-[#1b1c1c] uppercase tracking-wider mb-2">Contato</h3>
                    <p>E-mail: alinebcbrum@gmail.com</p>
                    <p>Site: Gamificar para Incluir</p>
                    <p>Endereço eletrônico: [endereço do site]</p>
                    <p className="font-semibold">© 2026 Gamificar para Incluir. Conteúdo autoral protegido nos termos da legislação aplicável.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Corporate Location Details / Asymmetric Layout Section */}
      <section className="py-20 bg-[#fbf9f8] border-b border-gray-100 text-left">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-[#904d00]" id="location-label">ONDE ESTAMOS</span>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-[#1b1c1c]}">
                Venha nos visitar ou agende uma reunião presencial
              </h2>
              
              <p className="font-sans text-xs md:text-sm text-[#5f5e5e] leading-relaxed">
                Nossa matriz de pesquisa e inovação para acessibilidade está estabelecida na UERN MOSSORÓ, onde temos a base do PROFEI e laboratórios para te atender da melhor forma.
              </p>

              <div className="space-y-3.5">
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-[#ff8c00]" />
                  <span className="font-sans text-xs md:text-sm text-[#1b1c1c] font-medium">Ambiente 100% inclusivo e adaptado</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-[#ff8c00]" />
                  <span className="font-sans text-xs md:text-sm text-[#1b1c1c] font-medium">Profissionais da educação inclusiva</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-[#ff8c00]" />
                  <span className="font-sans text-xs md:text-sm text-[#1b1c1c] font-medium">Estacionamento grátuito</span>
                </div>
              </div>
            </div>

            {/* Asymmetric Map placeholder block illustrating building */}
            <div className="relative group">
              <div className="absolute -inset-3 bg-[#ffdcc3]/40 rounded-[32px] transform rotate-1 group-hover:rotate-0 transition-transform duration-500" />
              <div className="relative overflow-hidden rounded-[26px] h-96 shadow-lg border border-gray-200">
                <img
                  src={uernfoto}
                  alt="Sede corporativa arquitetônica sustentável com amplos painéis de vidro e jardim vertical da Inclusive Learning"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  id="hq-structural-banner"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
