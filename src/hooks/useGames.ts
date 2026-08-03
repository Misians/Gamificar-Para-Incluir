// src/hooks/useGames.ts
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Game } from '../types';
import { db } from '../firebase';

export function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGames();
  }, []);


  const fetchGames = async () => {
    try {
      setLoading(true);
      
      // Faz a busca na coleção "games" do Firestore
      const querySnapshot = await getDocs(collection(db, 'games'));
      
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Game[];

      setGames(data);
    } catch (err: any) {
      console.error("Erro no Firebase:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { games, loading, error, refetchGames: fetchGames };
}