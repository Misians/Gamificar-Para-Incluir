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
    role: 'Educadora e mestranda pelo PROFEI na Universidade do Estado do Rio Grande do Norte (UERN)',
    avatar: aline,
    Linkedin: '',
    lattesLink:'http://lattes.cnpq.br/5486867621729687',
    bio: 'Pesquisadora em tecnologias assistivas e métodos pedagógicos integrados para inclusão.'
  },
  {
    name: 'Dra. Francisca Maria Gomes Cabral',
    role: 'Professora orientadora do projeto pela Universidade do Estado do Rio Grande do Norte (UERN)',
    avatar: francisca,
    Linkedin: '',
    lattesLink:'http://lattes.cnpq.br/2652883967281153',
    bio: 'Especialista em processos cognitivos infantis com foco em engajamento emocional.'
  },
  {
    name: 'Dr. Raul Benites Paradeda',
    role: 'Professor co-orientador do projeto pela Universidade do Estado do Rio Grande do Norte (UERN)',
    avatar: raul,
    Linkedin: '',
    lattesLink:'http://lattes.cnpq.br/7719675103212706',
    bio: 'Arquiteto de jogos e mestre em designs lúdicos voltados para engajamento e inclusão.'
  },
  {
    name: 'Artemísia Kimberlly Marques da Silva',
    role: 'Mestranda pelo PPgCC pela UERN e UFERSA responsável pelo desenvolvimento web do projeto',
    avatar: misia,
    Linkedin: 'https://br.linkedin.com/in/artem%C3%ADsia-kimberlly-87322a1b7',
    lattesLink:'http://lattes.cnpq.br/7854607386223805',
    bio: 'Desenvolvedora web com foco em acessibilidade e experiência do usuário, buscando soluções inclusivas para todos.'
  },
  {
    name: 'Dr. Alan de Oliveira Santana',
    role: 'Professor co-orientador do projeto pela Universidade do Estado do Rio Grande do Norte (UERN)',
    avatar: Alan,
    Linkedin: '',
    lattesLink: 'http://lattes.cnpq.br/7875175032115307',
    bio: 'Arquiteto de jogos e mestre em designs lúdicos voltados para engajamento e inclusão.'
  }
];
