import React, { useState, useEffect } from 'react';
import { Game } from '../types';
import { Trash2, Edit2, PlusCircle, Save, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API_URL = 'https://backend-gamificar-para-incluir.onrender.com/api/games/';

export default function AdminPanel() {
  const [games, setGames] = useState<Game[]>([]);
  const [editingGame, setEditingGame] = useState<Partial<Game> | null>(null);
  const { token, logout } = useAuth();

  // Buscar os jogos da API quando o componente montar
  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error("Erro ao buscar jogos", error);
    }
  };

  const handleSave = async () => {
    if (!editingGame?.name || !editingGame?.category) {
      alert("Preencha pelo menos o nome e a categoria!");
      return;
    }

    const isUpdating = !!editingGame.id;
    const url = isUpdating ? `${API_URL}${editingGame.id}/` : API_URL;
    const method = isUpdating ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Injeta o token aqui
        },
        body: JSON.stringify(editingGame)
      });

      if (response.ok) {
        fetchGames(); // Recarrega a lista
        setEditingGame(null); // Fecha o form
      } else {
        alert("Erro ao salvar o jogo.");
      }
    } catch (error) {
      console.error("Erro ao salvar", error);
    }
  };

  const removeGame = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja deletar este jogo?")) return;

    try {
      const response = await fetch(`${API_URL}${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}` // Exige token para deletar
        }
      });

      if (response.ok) {
        fetchGames(); // Atualiza a lista removendo o item
      }
    } catch (error) {
      console.error("Erro ao deletar", error);
    }
  };

  const handleChange = (field: keyof Game, value: any) => {
    setEditingGame((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 animate-fade-in text-left">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold text-[#904d00]">Painel Administrativo</h1>
        <div className="flex gap-4">
          <button 
            onClick={() => setEditingGame({})} 
            className="bg-[#ff8c00] text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-[#904d00] transition-colors shadow-md"
          >
            <PlusCircle size={20} /> Novo Jogo
          </button>
          <button 
            onClick={logout} 
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-300 transition-colors shadow-sm"
          >
            <LogOut size={20} /> Sair
          </button>
        </div>
      </div>

      {/* Formulário de Edição/Criação */}
      {editingGame && (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200 mb-10">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-2xl font-display font-bold text-[#1b1c1c]">
              {editingGame.id ? 'Editar Jogo' : 'Adicionar Novo Jogo'}
            </h2>
            <button onClick={() => setEditingGame(null)} className="text-gray-400 hover:text-red-500">
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bloco 1: Informações Básicas */}
            <div className="md:col-span-3 space-y-4">
              <h3 className="font-bold text-sm text-[#ff8c00] uppercase tracking-wider">Informações Básicas</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input 
                  type="text" placeholder="Nome do Jogo" 
                  value={editingGame.name || ''} 
                  onChange={e => handleChange('name', e.target.value)}
                  className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-[#ff8c00] outline-none"
                />
                
                {/* SELECT DE CATEGORIA ADICIONADO AQUI */}
                <select
                  value={editingGame.category || ''}
                  onChange={e => handleChange('category', e.target.value)}
                  className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-[#ff8c00] outline-none bg-white text-gray-700"
                >
                  <option value="" disabled>Selecione uma Categoria</option>
                  <option value="Alfabetização">Alfabetização</option>
                  <option value="Inclusivo">Inclusivo</option>
                  <option value="Colaborativo">Colaborativo</option>
                  <option value="Linguagens">Linguagens</option>
                  <option value="Letramento">Letramento</option>
                </select>

                <input 
                  type="text" placeholder="Desenvolvedor (ex: Instituto Alfa)" 
                  value={editingGame.developer || ''} 
                  onChange={e => handleChange('developer', e.target.value)}
                  className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-[#ff8c00] outline-none"
                />
              </div>
            </div>

            {/* Bloco 2: Especificações Técnicas */}
            <div className="md:col-span-3 space-y-4">
              <h3 className="font-bold text-sm text-[#ff8c00] uppercase tracking-wider mt-2">Especificações Técnicas</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <input 
                  type="text" placeholder="Plataforma (ex: Web, Android)" 
                  value={editingGame.platform || ''} 
                  onChange={e => handleChange('platform', e.target.value)}
                  className="border border-gray-300 p-3 rounded-lg w-full text-sm focus:ring-2 focus:ring-[#ff8c00] outline-none"
                />
                <input 
                  type="text" placeholder="Tamanho (ex: 45 MB)" 
                  value={editingGame.size || ''} 
                  onChange={e => handleChange('size', e.target.value)}
                  className="border border-gray-300 p-3 rounded-lg w-full text-sm focus:ring-2 focus:ring-[#ff8c00] outline-none"
                />
                <input 
                  type="text" placeholder="Versão (ex: 1.0.2)" 
                  value={editingGame.version || ''} 
                  onChange={e => handleChange('version', e.target.value)}
                  className="border border-gray-300 p-3 rounded-lg w-full text-sm focus:ring-2 focus:ring-[#ff8c00] outline-none"
                />
                <input 
                  type="text" placeholder="Idiomas (separados por vírgula)" 
                  value={editingGame.languages?.join(', ') || ''} 
                  onChange={e => handleChange('languages', e.target.value.split(',').map(s => s.trim()))}
                  className="border border-gray-300 p-3 rounded-lg w-full text-sm focus:ring-2 focus:ring-[#ff8c00] outline-none"
                />
              </div>
            </div>

            {/* Bloco 3: Mídia, Links e Avaliação */}
            <div className="md:col-span-3 space-y-4">
              <h3 className="font-bold text-sm text-[#ff8c00] uppercase tracking-wider mt-2">Mídia, Links e Estatísticas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" placeholder="URL da Capa (Imagem)" 
                  value={editingGame.image || ''} 
                  onChange={e => handleChange('image', e.target.value)}
                  className="border border-gray-300 p-3 rounded-lg w-full text-sm focus:ring-2 focus:ring-[#ff8c00] outline-none"
                />
                <input 
                  type="text" placeholder="Link do Jogo (URL da página/download)" 
                  value={editingGame.link || ''} 
                  onChange={e => handleChange('link', e.target.value)}
                  className="border border-gray-300 p-3 rounded-lg w-full text-sm focus:ring-2 focus:ring-[#ff8c00] outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="number" step="0.1" max="5" placeholder="Nota (ex: 4.8)" 
                  value={editingGame.rating || ''} 
                  onChange={e => handleChange('rating', parseFloat(e.target.value))}
                  className="border border-gray-300 p-3 rounded-lg w-full text-sm focus:ring-2 focus:ring-[#ff8c00] outline-none"
                />
                <input 
                  type="text" placeholder="Qtd. Avaliações (ex: +2k)" 
                  value={editingGame.reviewsCount || ''} 
                  onChange={e => handleChange('reviewsCount', e.target.value)}
                  className="border border-gray-300 p-3 rounded-lg w-full text-sm focus:ring-2 focus:ring-[#ff8c00] outline-none"
                />
              </div>
            </div>

            {/* Bloco 4: Descrições */}
            <div className="md:col-span-3 space-y-4">
              <h3 className="font-bold text-sm text-[#ff8c00] uppercase tracking-wider mt-2">Conteúdo Textual</h3>
              <textarea 
                placeholder="Descrição Curta (Aparece no Catálogo)" 
                value={editingGame.description || ''} 
                onChange={e => handleChange('description', e.target.value)}
                className="border border-gray-300 p-3 rounded-lg w-full h-20 text-sm focus:ring-2 focus:ring-[#ff8c00] outline-none"
              />
              <textarea 
                placeholder="Descrição Longa (Aparece na página de Detalhes do Jogo)" 
                value={editingGame.longDescription || ''} 
                onChange={e => handleChange('longDescription', e.target.value)}
                className="border border-gray-300 p-3 rounded-lg w-full h-32 text-sm focus:ring-2 focus:ring-[#ff8c00] outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
            <button 
              onClick={() => setEditingGame(null)} 
              className="px-6 py-2.5 font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button 
              onClick={handleSave} 
              className="px-6 py-2.5 bg-[#904d00] hover:bg-[#6c3900] text-white font-bold rounded-xl flex items-center gap-2 transition-colors shadow-md"
            >
              <Save size={18}/> Salvar Alterações
            </button>
          </div>
        </div>
      )}

      {/* Lista de Jogos (Visualização do Admin) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {games.map(game => (
          <div key={game.id} className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100 last:border-0 hover:bg-orange-50/30 transition-colors">
            <div className="flex items-center gap-4">
              <img src={game.image} alt={game.alt || game.name} className="w-16 h-16 rounded-xl object-cover shadow-sm border border-gray-200" />
              <div>
                <h3 className="font-bold text-[#1b1c1c] text-lg leading-tight">{game.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-[#ff8c00]/10 text-[#904d00] px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">
                    {game.category}
                  </span>
                  <span className="text-xs text-gray-500">• {game.developer || 'S/ Desenvolvedor'}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setEditingGame(game)} 
                className="p-2.5 text-[#ff8c00] hover:bg-[#ff8c00]/10 rounded-lg transition-colors" 
                title="Editar Jogo"
              >
                <Edit2 size={20} />
              </button>
              <button 
                onClick={() => removeGame(game.id)} 
                className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors" 
                title="Remover Jogo"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
        {games.length === 0 && (
          <div className="p-10 text-center text-gray-500 font-medium">
            Nenhum jogo cadastrado. Clique em "Novo Jogo" para começar.
          </div>
        )}
      </div>
    </div>
  );
}