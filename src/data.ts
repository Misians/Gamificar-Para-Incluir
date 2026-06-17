import { Game, Review, Founder } from './types';
import aline from './assets/team/aline.jpeg';
import raul from './assets/team/raul.jpeg';
import francisca from './assets/team/francisca.jpeg';


export const GAMES_DATA: Game[] = [
  {
    id: 'eduedu',
    name: 'EduEdu',
    platform: 'Android & iOS',
    category: 'Alfabetização',
    tagBg: 'bg-[#fffdcc3] text-[#2f1500]',
    tagColor: 'text-[#ff8c00]',
    description: 'Ferramenta completa para auxiliar crianças no processo de alfabetização de forma lúdica.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsc_rB-6E7i59-h2rea2wtIrUwm4ojDhHA8FLw4qXR7YL84btQ2aeTQdEMyyOEY4JNlNAmc5XCQSiRBbnOC8qmt66PtIIuPl12oPmnE4TzjH_PXxFruHb8pyBu5Y2LWM15s6tXhoFeJfHV5QDs84CK-g4e_doVAZtRActAdn6NtA-yj1Wt_4jDOUIOh079VFYZwuEq_OG6Fi_W63iS1tvYkVhPH75W7l3uljygTI2ip_2SQ8OWY9HpSbBEb4y6XPMXN9EhD5sibN6z',
    alt: 'Ilustração do ambiente de floresta mágica do EduEdu',
    rating: 4.8,
    reviewsCount: '1.2k avaliações',
    version: 'v4.2.1 (Jan 2024)',
    size: '128 MB',
    languages: ['Português', 'Inglês'],
    developer: 'Instituto ABCD',
    longDescription: 'O EduEdu é uma ferramenta pedagógica completa desenvolvida para auxiliar crianças no processo de alfabetização. Através de uma jornada gamificada, os alunos exploram fonemas, grafemas e a construção de palavras de forma lúdica e estruturada. O aplicativo adapta o nível de dificuldade com base no desempenho real da criança, garantindo que o aprendizado seja sempre desafiador, mas nunca frustrante.'
  },
  {
    id: 'minecraft',
    name: 'Minecraft: Edição Educativa',
    platform: 'PC & Tablet',
    category: 'Inclusivo',
    tagBg: 'bg-[#ffdcc3] text-[#2f1500]',
    tagColor: 'text-[#904d00]',
    description: 'Plataforma baseada em blocos e exploração 3D para exercitar a criatividade e o trabalho em equipe.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArXTlYUV1ExK_G789-3UDVkOvVD-8Js3C6nMIggU9w9e3IJkIpnGweFL4y5jH1uJO00RXt8e77rRTeJvP0MXS-HrqA20MONmQVKYBFg0kgYwY-3s6jMqAgkt3GZkkBTmtkzmxAm8vbstUdIZeJmeU7L2Hj-htECTavRjjJ1WDmMdRR616sgZ-naOEcoYdKPMSB7yQr2aqJjmzXXPpHfnDrCDDb_nj9oSo8BaISC80l-3aGLoOq2SChiwDL1xSV0VXdOuiof_7B8JPQ',
    alt: 'Imagem com blocos em 3D do Minecraft Education',
    rating: 4.9,
    reviewsCount: '3.4k avaliações',
    version: 'v1.20.12 (Mar 2025)',
    size: '350 MB',
    languages: ['Português', 'Inglês', 'Espanhol', 'Francês'],
    developer: 'Mojang Studios',
    longDescription: 'Minecraft: Education Edition é uma plataforma de aprendizagem baseada em jogos que oferece aos educadores uma maneira transformadora de engajar os alunos usando o Minecraft e fortalecer suas habilidades de colaboração, resolução de problemas e comunicação digital.'
  },
  {
    id: 'matific',
    name: 'Matific: Aventuras Matemáticas',
    platform: 'Web & Tablet',
    category: 'Matemática',
    tagBg: 'bg-[#ffdcc3] text-[#2f1500]',
    tagColor: 'text-[#ff8c00]',
    description: 'Minijogos interativos e atividades estimulantes para ensinar conceitos matemáticos visualmente.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD86UvPt_UM08Zb3rIHdgnbihzlfRQZf6kMGMxvreWcHbTDWOj6PrIrU-_YGNH2ahd5wf-sY9F9_krAPa0TBCT1BGphNSjyMYZce1qJ23LvkxFPB-O8_-t3MWHYjQxKzHBSm-XMQkE835jz55PqQoM-d3aMBZV96ZlmvzYeqveWdHR0OuLIB8MHGPmehCOM3kRmE0Qvvj3eKIL47eZtO1YrCzjlAzNYzgwgYQ_n7fr8bZHIDCHbBHDZ8RIdwG6HIKgnLyxmmcjR3D8y',
    alt: 'Visual de quebra-cabeças matemáticos da Matific',
    rating: 4.7,
    reviewsCount: '850 avaliações',
    version: 'v5.0.4 (Dez 2024)',
    size: 'N/A (Web)',
    languages: ['Português', 'Espanhol', 'Inglês'],
    developer: 'Matific Inc.',
    longDescription: 'A Matific é uma plataforma premiada que oferece atividades matemáticas interativas no formato de minijogos cativantes. Seu algoritmo inteligente seleciona as atividades ideais para apoiar o plano de aula do professor e atender às necessidades personalizadas de aprendizagem dos estudantes.'
  },
  {
    id: 'roblox',
    name: 'Roblox: Criando Mundos',
    platform: 'iOS & Android',
    category: 'Colaborativo',
    tagBg: 'bg-[#ffdcc3] text-[#2f1500]',
    tagColor: 'text-[#904d00]',
    description: 'Estúdio de programação e design para cocriação de experiências virtuais inclusivas em 3D.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRKNREm8LG-02Y3jx1RcZDiKfKgEJ2ZStOEBfKAlvdwwQp74cKGHcgXN8hWrTG7_ANzuN2O3l_MqjF9TGiixx-zhj7QmLjbR1SC_D3uVwKkBJAIfNYasHUmt9u494wglCZcSZ1K-2XEU737N-YFHxCXBSwNZBi-x2ZSjFxWSQP814ST7-MOsWokiUFYlgiA6FxX2gWcPfKjY7L-_vQ7hi6FbvEs0R9k0A0QBaAW5JrwiIiCLAJ0gXy0lhi1ue2sYka6MR4ZwAaDcl4',
    alt: 'Visual do laboratório tecnológico do Roblox Education',
    rating: 4.6,
    reviewsCount: '2.1k avaliações',
    version: 'v2.610.0 (Fev 2025)',
    size: '145 MB',
    languages: ['Português', 'Inglês', 'Espanhol'],
    developer: 'Roblox Corporation',
    longDescription: 'Roblox Education empodera alunos e educadores a criarem mundos 3D imersivos. Ao apoiar o raciocínio computacional, design de jogos cooperativos e habilidades de resolução de problemas, os alunos aprendem conceitos fundamentais de lógica trabalhando juntos no mesmo ecossistema.'
  },
  {
    id: 'duolingo',
    name: 'Duolingo for Schools',
    platform: 'Android & iOS',
    category: 'Linguagens',
    tagBg: 'bg-[#ffdcc3] text-[#2f1500]',
    tagColor: 'text-[#ff8c00]',
    description: 'Ensino de idiomas através de uma trilha gamificada altamente motivadora e adaptativa para escolas.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBc5AQ_0SEBBIPCGGNbOug63tSVW2R3TzGRY1ySQTbon2xU5qfnHubq-5G9bhdQGIOnMhVGUT6VFuEJ0leBbvg3qL_ERVOvOD63PgKK-hHSn3wK4LiT_1h6-_t8aVMzmAIk0dDDmyU9fftHmoYL5wpN7-wt6wwRzAEqPOmW_vanLpRZiYo26ukcU-JMnwf42Sv7egrBOwOj4uJbNz8fXpfp2l02d5bILs-5eA2rIgPgo5vrUnAp_z4mqRPy091BgxOk7WvvpgzDAvCb',
    alt: 'Celular exibindo interface do Duolingo com a carismática coruja Duo',
    rating: 4.8,
    reviewsCount: '5k avaliações',
    version: 'v5.132.4 (Abril 2025)',
    size: '80 MB',
    languages: ['Português', 'Inglês', 'Espanhol', 'Italiano', 'Alemão'],
    developer: 'Duolingo Inc.',
    longDescription: 'Duolingo for Schools traz toda a eficácia da gamificação adaptativa do Duolingo clássico de forma estruturada para salas de aula do mundo todo. Os professores podem gerar caminhos específicos para os alunos e acompanhar diariamente a proficiência de leitura, escuta e fala.'
  }
];

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
  }
];
