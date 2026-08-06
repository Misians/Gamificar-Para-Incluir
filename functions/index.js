import { onRequest } from 'firebase-functions/v2/https';
import admin from 'firebase-admin';
import nodemailer from 'nodemailer';

admin.initializeApp();

const EMAIL_FROM = process.env.EMAIL_FROM || 'artemisiakmds@gmail.com';
const EMAIL_TO = process.env.EMAIL_TO || 'artemisiakmds@gmail.com';
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_SECURE = process.env.SMTP_SECURE === 'true';

const transporter = SMTP_HOST
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })
  : null;

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const recentRequests = new Map();

function getClientIp(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.ip ||
    'unknown'
  );
}

function isRateLimited(req) {
  const ip = getClientIp(req);
  const now = Date.now();
  const entry = recentRequests.get(ip);

  if (!entry) {
    recentRequests.set(ip, { count: 1, start: now });
    return false;
  }

  if (now - entry.start > RATE_LIMIT_WINDOW_MS) {
    recentRequests.set(ip, { count: 1, start: now });
    return false;
  }

  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  return false;
}

export const contactForm = onRequest({ cors: ['https://gamificarparaincluir-81675.web.app', 'https://gamificarparaincluir-81675.firebaseapp.com', 'http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173'] }, async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, message: 'Method not allowed' });
    return;
  }

  if (isRateLimited(req)) {
    res.status(429).json({ ok: false, message: 'Muitas tentativas. Tente novamente mais tarde.' });
    return;
  }

  const body = req.body || {};
  const name = body.name ?? body.nome ?? '';
  const email = body.email ?? body.mail ?? '';
  const subject = body.subject ?? body.assunto ?? '';
  const message = body.message ?? body.mensagem ?? '';

  if (!name || !email || !message) {
    res.status(400).json({ ok: false, message: 'Campos obrigatórios ausentes.' });
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(String(email))) {
    res.status(400).json({ ok: false, message: 'E-mail inválido.' });
    return;
  }

  const text = `Nome: ${String(name)}\nE-mail: ${String(email)}\nAssunto: ${String(subject || 'Contato')}\n\nMensagem:\n${String(message)}`;

  try {
    if (!transporter) {
      console.error('SMTP not configured');
      res.status(500).json({ ok: false, message: 'Envio de e-mail não configurado.' });
      return;
    }

    await transporter.sendMail({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      replyTo: email,
      subject: `Contato do site - ${String(subject || 'Contato')}`,
      text,
    });

    res.status(200).json({ ok: true, message: 'Mensagem enviada com sucesso.' });
  } catch (error) {
    console.error('Error sending email', error);
    res.status(500).json({ ok: false, message: 'Erro ao enviar e-mail.' });
  }
});
