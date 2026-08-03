import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Game } from '../types';
import {
  Trash2, Edit2, PlusCircle, Save, X, LogOut,
  Search, Upload, ImageIcon, AlertTriangle, Loader2, Gamepad2, Layers
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase';

type ToastType = 'success' | 'error' | 'info';
interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

const CATEGORY_COLORS: Record<string, string> = {
  'Alfabetização': 'bg-orange-100 text-orange-700',
  'Inclusivo': 'bg-purple-100 text-purple-700',
  'Colaborativo': 'bg-blue-100 text-blue-700',
  'Linguagens': 'bg-emerald-100 text-emerald-700',
  'Letramento': 'bg-pink-100 text-pink-700',
};

export default function AdminPanel() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingGame, setEditingGame] = useState<Partial<Game> | null>(null);
  const [search, setSearch] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [pendingImageFile, setPendingImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { logout } = useAuth();

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    };
  }, [imagePreviewUrl]);

  useEffect(() => {
    fetchGames();
  }, []);

  const pushToast = (message: string, type: ToastType = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const fetchGames = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'games'));
      const data = querySnapshot.docs.map(d => ({
        id: d.id,
        ...d.data()
      })) as Game[];
      setGames(data);
    } catch (error) {
      console.error("Erro ao buscar jogos no Firebase", error);
      pushToast('Não foi possível carregar a lista de jogos.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (file: File | null) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      pushToast('Selecione um arquivo de imagem válido.', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      pushToast('A imagem deve ter no máximo 5MB.', 'error');
      return;
    }

    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    const localUrl = URL.createObjectURL(file);

    setPendingImageFile(file);
    setImagePreviewUrl(localUrl);
  };

  const clearPendingImage = () => {
    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    setPendingImageFile(null);
    setImagePreviewUrl(null);
    setEditingGame(prev => (prev ? { ...prev, image: undefined, imagePath: undefined } : prev));
  };

  const uploadPendingImage = (file: File): Promise<{ url: string; path: string }> => {
    return new Promise((resolve, reject) => {
      setUploading(true);
      setUploadProgress(0);

      const filePath = `games/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, filePath);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          setUploading(false);
          reject(error);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setUploading(false);
          setUploadProgress(0);
          resolve({ url, path: filePath });
        }
      );
    });
  };

  const handleSave = async () => {
    if (!editingGame?.name || !editingGame?.category) {
      pushToast('Preencha pelo menos o nome e a categoria!', 'error');
      return;
    }

    try {
      let gameData: Partial<Game> = { ...editingGame };
      const previousImagePath = (editingGame as any).imagePath;

      if (pendingImageFile) {
        try {
          const { url, path } = await uploadPendingImage(pendingImageFile);
          gameData = { ...gameData, image: url, imagePath: path } as any;
        } catch (uploadError) {
          console.error('Erro no upload da imagem:', uploadError);
          pushToast('Falha ao enviar a imagem. O jogo não foi salvo.', 'error');
          return; // não salva o documento se o upload falhar
        }
      }

      const cleanData = Object.fromEntries(
        Object.entries(gameData).filter(([_, value]) => value !== undefined)
      );
      delete cleanData.id;

      if (editingGame.id) {
        const gameRef = doc(db, 'games', editingGame.id);
        await updateDoc(gameRef, cleanData);
        pushToast('Jogo atualizado com sucesso!', 'success');
      } else {
        await addDoc(collection(db, 'games'), cleanData);
        pushToast('Jogo criado com sucesso!', 'success');
      }

      if (pendingImageFile && previousImagePath && previousImagePath !== (gameData as any).imagePath) {
        try {
          await deleteObject(ref(storage, previousImagePath));
        } catch {
        }
      }

      await fetchGames();
      closeForm();
    } catch (error: any) {
      console.error("Erro detalhado do Firebase:", error.code, error.message);
      pushToast(`Erro ao salvar: ${error.message}`, 'error');
    }
  };

  const closeForm = () => {
    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    setPendingImageFile(null);
    setImagePreviewUrl(null);
    setEditingGame(null);
  };

  const removeGame = async (game: Game) => {
    try {
      await deleteDoc(doc(db, 'games', game.id as string));
      // se a imagem foi enviada via Storage, apaga o arquivo também
      if ((game as any).imagePath) {
        try {
          await deleteObject(ref(storage, (game as any).imagePath));
        } catch {
        }
      }
      pushToast('Jogo removido.', 'success');
      fetchGames();
    } catch (error) {
      console.error("Erro ao deletar no Firebase", error);
      pushToast('Erro ao remover o jogo.', 'error');
    } finally {
      setConfirmDeleteId(null);
    }
  };

  const handleChange = (field: keyof Game, value: any) => {
    setEditingGame(prev => ({ ...prev, [field]: value }));
  };

  const filteredGames = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return games;
    return games.filter(g =>
      g.name?.toLowerCase().includes(term) ||
      g.category?.toLowerCase().includes(term) ||
      g.developer?.toLowerCase().includes(term)
    );
  }, [games, search]);

  const categoryCount = useMemo(() => {
    return new Set(games.map(g => g.category).filter(Boolean)).size;
  }, [games]);

  const gameToDelete = games.find(g => g.id === confirmDeleteId);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-80">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white animate-fade-in ${
              t.type === 'success' ? 'bg-emerald-600' : t.type === 'error' ? 'bg-red-600' : 'bg-gray-800'
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto py-8 px-6 text-left">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-[#1b1c1c]">Painel Administrativo</h1>
            <p className="text-sm text-gray-500 mt-1">Gerencie o catálogo de jogos da plataforma</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { setPendingImageFile(null); setImagePreviewUrl(null); setEditingGame({}); }}
              className="bg-[#ff8c00] text-white px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-[#904d00] transition-colors shadow-md"
            >
              <PlusCircle size={20} /> Novo Jogo
            </button>
            <button
              onClick={logout}
              className="bg-white border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-sm"
            >
              <LogOut size={20} /> Sair
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4 shadow-sm">
            <div className="p-3 rounded-xl bg-[#ff8c00]/10 text-[#ff8c00]"><Gamepad2 size={22} /></div>
            <div>
              <p className="text-2xl font-bold text-[#1b1c1c]">{games.length}</p>
              <p className="text-xs text-gray-500 font-medium">Jogos cadastrados</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4 shadow-sm">
            <div className="p-3 rounded-xl bg-blue-100 text-blue-600"><Layers size={22} /></div>
            <div>
              <p className="text-2xl font-bold text-[#1b1c1c]">{categoryCount}</p>
              <p className="text-xs text-gray-500 font-medium">Categorias em uso</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4 shadow-sm">
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600"><ImageIcon size={22} /></div>
            <div>
              <p className="text-2xl font-bold text-[#1b1c1c]">
                {games.filter(g => !!(g as any).imagePath).length}
              </p>
              <p className="text-xs text-gray-500 font-medium">Imagens no Storage</p>
            </div>
          </div>
        </div>

        {editingGame && (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200 mb-10">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-2xl font-display font-bold text-[#1b1c1c]">
                {editingGame.id ? 'Editar Jogo' : 'Adicionar Novo Jogo'}
              </h2>
              <button onClick={closeForm} className="text-gray-400 hover:text-red-500">
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-3 space-y-3">
                <h3 className="font-bold text-sm text-[#ff8c00] uppercase tracking-wider">Capa do Jogo</h3>
                <div className="flex items-center gap-5">
                  <div className="relative w-28 h-28 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 shrink-0">
                    {imagePreviewUrl || editingGame.image ? (
                      <img src={imagePreviewUrl || editingGame.image} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="text-gray-300" size={32} />
                    )}
                    {pendingImageFile && (
                      <span className="absolute bottom-1 left-1 right-1 text-center text-[9px] font-bold uppercase tracking-wide bg-amber-500 text-white rounded py-0.5">
                        Pendente
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => handleImageSelect(e.target.files?.[0] ?? null)}
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-60"
                      >
                        <Upload size={16} />
                        {pendingImageFile ? 'Trocar imagem' : 'Escolher da biblioteca'}
                      </button>
                      {pendingImageFile && (
                        <button
                          type="button"
                          onClick={clearPendingImage}
                          className="text-xs font-semibold text-gray-400 hover:text-red-500"
                        >
                          Remover
                        </button>
                      )}
                    </div>
                    {uploading && (
                      <div className="mt-3">
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#ff8c00] transition-all"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-gray-400 mt-1">Enviando ao salvar...</p>
                      </div>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      {pendingImageFile
                        ? 'Imagem selecionada localmente — só será enviada ao Storage quando você clicar em "Salvar Alterações".'
                        : 'JPG, PNG ou WebP · até 5MB. O upload só acontece ao salvar o jogo.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-3 space-y-4">
                <h3 className="font-bold text-sm text-[#ff8c00] uppercase tracking-wider">Informações Básicas</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text" placeholder="Nome do Jogo"
                    value={editingGame.name || ''}
                    onChange={e => handleChange('name', e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-[#ff8c00] outline-none"
                  />
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

              <div className="md:col-span-3 space-y-4">
                <h3 className="font-bold text-sm text-[#ff8c00] uppercase tracking-wider mt-2">Link e Estatísticas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text" placeholder="Link do Jogo (URL da página/download)"
                    value={editingGame.link || ''}
                    onChange={e => handleChange('link', e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg w-full text-sm focus:ring-2 focus:ring-[#ff8c00] outline-none"
                  />
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
              </div>

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
                onClick={closeForm}
                disabled={uploading}
                className="px-6 py-2.5 font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-60"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={uploading}
                className="px-6 py-2.5 bg-[#904d00] hover:bg-[#6c3900] text-white font-bold rounded-xl flex items-center gap-2 transition-colors shadow-md disabled:opacity-60"
              >
                {uploading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18}/>}
                {uploading ? 'Enviando imagem...' : 'Salvar Alterações'}
              </button>
            </div>
          </div>
        )}

        <div className="relative mb-4">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome, categoria ou desenvolvedor..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#ff8c00] outline-none text-sm shadow-sm"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-10 flex justify-center text-gray-400">
              <Loader2 className="animate-spin" size={28} />
            </div>
          ) : filteredGames.length === 0 ? (
            <div className="p-10 text-center text-gray-500 font-medium">
              {games.length === 0
                ? 'Nenhum jogo cadastrado. Clique em "Novo Jogo" para começar.'
                : 'Nenhum jogo encontrado para essa busca.'}
            </div>
          ) : (
            filteredGames.map(game => (
              <div key={game.id} className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100 last:border-0 hover:bg-orange-50/30 transition-colors">
                <div className="flex items-center gap-4 min-w-0">
                  <img src={game.image} alt={game.alt || game.name} className="w-16 h-16 rounded-xl object-cover shadow-sm border border-gray-200 shrink-0" />
                  <div className="min-w-0">
                    <h3 className="font-bold text-[#1b1c1c] text-lg leading-tight truncate">{game.name}</h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${CATEGORY_COLORS[game.category as string] || 'bg-gray-100 text-gray-600'}`}>
                        {game.category}
                      </span>
                      <span className="text-xs text-gray-500">• {game.developer || 'S/ Desenvolvedor'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => { setPendingImageFile(null); setImagePreviewUrl(null); setEditingGame(game); }}
                    className="p-2.5 text-[#ff8c00] hover:bg-[#ff8c00]/10 rounded-lg transition-colors"
                    title="Editar Jogo"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => setConfirmDeleteId(game.id as string)}
                    className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remover Jogo"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {gameToDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-red-100 text-red-600"><AlertTriangle size={22} /></div>
              <h3 className="font-bold text-lg text-[#1b1c1c]">Remover jogo?</h3>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Tem certeza que deseja remover <span className="font-semibold text-gray-700">{gameToDelete.name}</span>?
              Essa ação não pode ser desfeita.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => removeGame(gameToDelete)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors"
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}