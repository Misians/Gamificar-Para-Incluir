// src/hooks/useGames.ts
import { useState, useEffect } from 'react';
import { Game } from '../types';

const API_URL = 'https://backend-gamificar-para-incluir.onrender.com/api/games/';

export function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Busca os jogos quando o site carrega
  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      setLoading(true);
      
      // Faz o GET na rota pública do Django
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error('Falha ao carregar os jogos do servidor.');
      }

      const data = await response.json();
      setGames(data);
    } catch (err: any) {
      console.error("Erro na API:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Retornamos os jogos, e também o estado de loading e erro caso você queira 
  // colocar um "Carregando..." no seu App.tsx no futuro.
  return { games, loading, error, refetchGames: fetchGames };
}