import { Game, Review, Founder } from './types';
import aline from './assets/team/aline.jpeg';
import raul from './assets/team/raul.jpeg';
import francisca from './assets/team/francisca.jpeg';
import misia from './assets/team/misia.jpeg';
import Alan from './assets/team/alan.jpeg';

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    text: 'O uso do Minecraft na minha aula de história mudou a forma como meus alunos autistas interagem. A barreira da comunicação social diminuiu drasticamente através das construções coletivas.',
    author: 'Ana Maria Silva',
    role: 'Professora de História - 6º Ano',
    avatarInitials: 'AM'
  },
  {
    id: 'rev-2',
    text: 'Implementar o DUA com ferramentas digitais me permitiu atingir alunos que antes ficavam isolados no fundo da sala. Agora todos se sentem protagonistas do seu próprio aprendizado.',
    author: 'Ricardo Santos',
    role: 'Coordenador Pedagógico',
    avatarInitials: 'RS'
  },
  {
    id: 'rev-3',
    text: 'Utilizar jogos adaptativos como o EduEdu transformou as dificuldades de alfabetização em vitórias diárias. O cansaço deu lugar ao entusiasmo de descobrir novas sílabas e palavras.',
    author: 'Claúdia Mendes',
    role: 'Professora do Ensino Fundamental I',
    avatarInitials: 'CM'
  }
];

export const FOUNDERS_DATA: Founder[] = [
  {
    name: 'Aline Benevides Câmara Brum',
    role: 'Professora-pesquisadora • Mestrado Profissional em Educação Inclusiva – PROFEI/UERN',
    avatar: aline,
    Linkedin: '',
    lattesLink:'http://lattes.cnpq.br/5486867621729687',
    bio: 'Autoria e responsabilidade pelo conteúdo do projeto Gamificar para Incluir.'
  },
  {
    name: 'Dra. Francisca Maria Gomes Cabral',
    role: 'Orientadora acadêmica • PROFEI/UERN',
    avatar: francisca,
    Linkedin: '',
    lattesLink:'http://lattes.cnpq.br/2652883967281153',
    bio: 'Orientadora da pesquisa acadêmica, produção textual e organização pedagógica.'
  },
  {
    name: 'Dr. Raul Benites Paradeda',
    role: 'Coorientador acadêmico • PROFEI/UERN',
    avatar: raul,
    Linkedin: 'https://www.linkedin.com/in/raul-paradeda/?isSelfProfile=false',
    lattesLink:'http://lattes.cnpq.br/7719675103212706',
    bio: 'Orientador da curadoria de conteúdos, plataformas e jogos, e orientação para o desenvolvimento web.'
  },
  {
    name: 'Artemísia Kimberlly Marques da Silva',
    role: 'Desenvolvedora e Mestranda - PPgCC ',
    avatar: misia,
    Linkedin: 'https://br.linkedin.com/in/artem%C3%ADsia-kimberlly-87322a1b7',
    lattesLink:'http://lattes.cnpq.br/7854607386223805',
    bio: 'Colaboradora no desenvolvimento do projeto.'
  }
];
