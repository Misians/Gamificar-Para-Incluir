// src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { useAuth } from '../context/AuthContext';

// Lembre-se: O e-mail que você cadastrar precisa estar nesta lista para conseguir logar!
const ALLOWED_EMAILS = [
  'artemisiakmds@gmail.com',
  'alinebcbrum@gmail.com',
  'outro.admin@exemplo.com'
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const auth = getAuth(); 

  const checkEmailAllowed = async (userEmail: string | null) => {
    if (!userEmail || !ALLOWED_EMAILS.includes(userEmail)) {
      await signOut(auth);
      throw new Error('unauthorized');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await checkEmailAllowed(userCredential.user.email);
      
      if (login) login(userCredential.user.uid); 
      navigate('/admin'); 
    } catch (err: any) {
      console.error(err);
      if (err.message === 'unauthorized') {
        setError('Acesso negado: Este e-mail não tem permissão de administrador.');
      } else if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('E-mail ou senha inválidos!');
      } else {
        setError('Ocorreu um erro ao fazer login. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setMessage('');
    setLoading(true);
    
    const provider = new GoogleAuthProvider();

    try {
      const userCredential = await signInWithPopup(auth, provider);
      await checkEmailAllowed(userCredential.user.email);

      if (login) login(userCredential.user.uid);
      navigate('/admin');
    } catch (err: any) {
      console.error(err);
      if (err.message === 'unauthorized') {
        setError('Acesso negado: Sua conta Google não tem permissão de administrador.');
      } else if (err.code === 'auth/popup-closed-by-user') {
        setError('O login com Google foi cancelado.');
      } else {
        setError('Erro ao fazer login com o Google. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError('Por favor, digite seu e-mail no campo acima para recuperar a senha.');
      return;
    }

    if (!ALLOWED_EMAILS.includes(email)) {
      setError('Este e-mail não está cadastrado como administrador.');
      return;
    }

    setError('');
    setMessage('');
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('E-mail de recuperação enviado! Verifique sua caixa de entrada (e o spam).');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/user-not-found') {
        setError('Não há usuário cadastrado com este e-mail no Firebase.');
      } else {
        setError('Erro ao enviar e-mail de recuperação.');
      }
    } finally {
      setLoading(false);
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

        {message && (
          <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-4 text-center text-sm font-medium">
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">E-mail</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              required={!message}
            />
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#ff8c00] hover:bg-[#904d00] text-white font-bold py-3 rounded-xl transition-colors shadow-md mt-4 disabled:opacity-70"
          >
            {loading ? 'Processando...' : 'Entrar'}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between">
          <span className="border-b w-1/5 lg:w-1/4"></span>
          <span className="text-xs text-center text-gray-500 uppercase font-medium">Ou continue com</span>
          <span className="border-b w-1/5 lg:w-1/4"></span>
        </div>

        <button 
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 rounded-xl transition-colors shadow-sm mt-6 disabled:opacity-70"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Google
        </button>

        <div className="mt-6 flex flex-col gap-3 text-center">
          <button 
            type="button" 
            onClick={handleResetPassword}
            disabled={loading}
            className="text-sm font-medium text-gray-500 hover:text-[#ff8c00] transition-colors"
          >
            Esqueceu a senha?
          </button>
          
          {/* --- BOTÃO DE CADASTRO TEMPORÁRIO PARA DESENVOLVIMENTO --- */}
          <button 
            type="button" 
            onClick={() => navigate('/cadastro-secreto-admin-2026')}
            className="text-sm font-bold text-[#904d00] hover:text-[#ff8c00] transition-colors mt-4 p-2 bg-orange-50 rounded-lg border border-orange-100"
          >
            🔧 Criar conta (Modo Desenvolvedor)
          </button>

        </div>
      </div>
    </div>
  );
}