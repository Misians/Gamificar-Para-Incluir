import React, { useState } from 'react';
import { Game } from '../types';
import { Trash2, Edit2, PlusCircle, Save } from 'lucide-react';

interface AdminPanelProps {
  games: Game[];
  addGame: (game: Game) => void;
  updateGame: (game: Game) => void;
  removeGame: (id: string) => void;
}

export default function AdminPanel({ games, addGame, updateGame, removeGame }: AdminPanelProps) {
  const [editingGame, setEditingGame] = useState<Partial<Game> | null>(null);

  const handleSave = () => {
    if (!editingGame?.name || !editingGame?.category) {
      alert("Preencha pelo menos o nome e a categoria!");
      return;
    }

    if (editingGame.id) {
      updateGame(editingGame as Game);
    } else {
      addGame(editingGame as Game);
    }
    setEditingGame(null); // Fecha o formulário
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold text-[#904d00]">Painel Administrativo</h1>
        <button 
          onClick={() => setEditingGame({})} // Abre o form vazio
          className="bg-[#ff8c00] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#904d00] transition-colors"
        >
          <PlusCircle size={20} /> Novo Jogo
        </button>
      </div>

      {/* Formulário de Edição/Criação */}
      {editingGame && (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-8 space-y-4">
          <h2 className="text-xl font-bold mb-4">{editingGame.id ? 'Editar Jogo' : 'Adicionar Novo Jogo'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" placeholder="Nome do Jogo" 
              value={editingGame.name || ''} 
              onChange={e => setEditingGame({...editingGame, name: e.target.value})}
              className="border p-2 rounded w-full"
            />
            <input 
              type="text" placeholder="Categoria (ex: Inclusivo)" 
              value={editingGame.category || ''} 
              onChange={e => setEditingGame({...editingGame, category: e.target.value})}
              className="border p-2 rounded w-full"
            />
            <input 
              type="text" placeholder="URL da Imagem" 
              value={editingGame.image || ''} 
              onChange={e => setEditingGame({...editingGame, image: e.target.value})}
              className="border p-2 rounded w-full md:col-span-2"
            />
            <textarea 
              placeholder="Descrição curta" 
              value={editingGame.description || ''} 
              onChange={e => setEditingGame({...editingGame, description: e.target.value})}
              className="border p-2 rounded w-full md:col-span-2"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={() => setEditingGame(null)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded">Cancelar</button>
            <button onClick={handleSave} className="px-4 py-2 bg-[#904d00] text-white rounded flex items-center gap-2"><Save size={16}/> Salvar</button>
          </div>
        </div>
      )}

      {/* Lista de Jogos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {games.map(game => (
          <div key={game.id} className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-gray-50">
            <div className="flex items-center gap-4">
              <img src={game.image} alt={game.alt} className="w-12 h-12 rounded object-cover" />
              <div>
                <h3 className="font-bold text-[#1b1c1c]">{game.name}</h3>
                <span className="text-xs text-gray-500">{game.category}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditingGame(game)} className="p-2 text-blue-600 hover:bg-blue-50 rounded" title="Editar">
                <Edit2 size={18} />
              </button>
              <button onClick={() => removeGame(game.id)} className="p-2 text-red-600 hover:bg-red-50 rounded" title="Remover">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}