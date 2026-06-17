import { useState, useEffect } from 'react';
import { Game } from '../types';
import { GAMES_DATA } from '../data'; // Ajuste o caminho de onde está seu GAMES_DATA

export function useGames() {
  // Inicializa o estado buscando do localStorage ou do arquivo estático
  const [games, setGames] = useState<Game[]>(() => {
    const savedGames = localStorage.getItem('@InclusiveLearning:games');
    if (savedGames) {
      return JSON.parse(savedGames);
    }
    return GAMES_DATA;
  });

  // Toda vez que a lista de jogos mudar, salva no localStorage
  useEffect(() => {
    localStorage.setItem('@InclusiveLearning:games', JSON.stringify(games));
  }, [games]);

  const addGame = (newGame: Game) => {
    setGames([...games, { ...newGame, id: crypto.randomUUID() }]); // Gera um ID único
  };

  const updateGame = (updatedGame: Game) => {
    setGames(games.map(g => g.id === updatedGame.id ? updatedGame : g));
  };

  const removeGame = (id: string) => {
    setGames(games.filter(g => g.id !== id));
  };

  return { games, addGame, updateGame, removeGame };
}