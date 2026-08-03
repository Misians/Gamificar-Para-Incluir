import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase'; // certifique-se de exportar `auth` no seu firebase.ts
import { Lock, Mail, User, KeyRound, Loader2, ShieldAlert } from 'lucide-react';

// Código extra de proteção. Sem ele, qualquer pessoa que ache a URL
// consegue criar um admin — o código é a única barreira real aqui.
// Configure no seu .env: VITE_ADMIN_SIGNUP_CODE=algo-dificil-de-adivinhar
const ADMIN_SIGNUP_CODE = (import.meta as any).env.VITE_ADMIN_SIGNUP_CODE as string | undefined;

export default function RegisterHidden() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!ADMIN_SIGNUP_CODE) {
      setError('Cadastro desabilitado: código de administração não configurado no servidor.');
      return;
    }
    if (secretCode !== ADMIN_SIGNUP_CODE) {
      setError('Código de acesso inválido.');
      return;
    }
    if (!name || !email || !password) {
      setError('Preencha todos os campos.');
      return;
    }
    if (password.length < 8) {
      setError('A senha precisa ter pelo menos 8 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credential.user, { displayName: name });

      // Registra o UID na coleção `admins`, usada pelas regras de segurança
      // do Firestore/Storage para liberar escrita apenas a administradores.
      await setDoc(doc(db, 'admins', credential.user.uid), {
        name,
        email,
        createdAt: serverTimestamp(),
      });

      navigate('/admin');
    } catch (err: any) {
      console.error('Erro ao criar admin:', err.code, err.message);
      if (err.code === 'auth/email-already-in-use') {
        setError('Esse e-mail já está cadastrado.');
      } else if (err.code === 'auth/weak-password') {
        setError('Senha muito fraca.');
      } else {
        setError('Não foi possível concluir o cadastro. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-[#ff8c00]/10 text-[#ff8c00]"><ShieldAlert size={22} /></div>
          <h1 className="text-xl font-display font-bold text-[#1b1c1c]">Cadastro de Administrador</h1>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Acesso restrito. Esse cadastro exige um código de administração válido.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text" placeholder="Nome completo"
              value={name} onChange={e => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#ff8c00] outline-none text-sm"
              autoComplete="name"
            />
          </div>

          <div className="relative">
            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email" placeholder="E-mail"
              value={email} onChange={e => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#ff8c00] outline-none text-sm"
              autoComplete="email"
            />
          </div>

          <div className="relative">
            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password" placeholder="Senha (mín. 8 caracteres)"
              value={password} onChange={e => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#ff8c00] outline-none text-sm"
              autoComplete="new-password"
            />
          </div>

          <div className="relative">
            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password" placeholder="Confirmar senha"
              value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#ff8c00] outline-none text-sm"
              autoComplete="new-password"
            />
          </div>

          <div className="relative">
            <KeyRound size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password" placeholder="Código de acesso administrativo"
              value={secretCode} onChange={e => setSecretCode(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#ff8c00] outline-none text-sm"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#904d00] hover:bg-[#6c3900] text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : null}
            {loading ? 'Criando conta...' : 'Criar conta de administrador'}
          </button>
        </form>
      </div>
    </div>
  );
}