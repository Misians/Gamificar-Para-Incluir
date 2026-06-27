// src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://backend-gamificar-para-incluir.onrender.com/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Credenciais inválidas!');
      }

      const data = await response.json();
      login(data.access); // Salva o token no contexto e localStorage
      navigate('/admin'); // Redireciona para o painel
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-display font-bold text-[#904d00] text-center mb-6">
          Acesso Restrito
        </h2>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-center text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Usuário</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-[#ff8c00] outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-[#ff8c00] outline-none"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-[#ff8c00] hover:bg-[#904d00] text-white font-bold py-3 rounded-xl transition-colors shadow-md mt-4"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}