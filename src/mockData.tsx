import { Mission } from './types';
import { 
  Type, Search, Puzzle, BookOpen, Laptop, Home, 
  Handshake, Gamepad2, ClipboardList, Crown 
} from 'lucide-react';

// Se preferir pode colocar uma cor padrão nos ícones via classe do Tailwind
const iconClass = "text-orange-600";
const iconSize = 40;

export const missionsData: Mission[] = [
  {
    id: 1,
    title: "MISSÃO 1",
    subtitle: "O CHAMADO DAS LETRAS",
    icon: <Type size={iconSize} className={iconClass} />,
    details: {
      whatHappened: "Antes de explorar jogos digitais e desafios de leitura, foi necessário descobrir como as crianças se relacionavam com as letras, os sons e a escrita. Nesta missão, apresentamos a narrativa 'A Jornada dos Super Leitores', organizamos o ambiente gamificado e convidamos as crianças a se tornarem protagonistas da aventura. A turma foi desafiada a ajudar a Floresta das Histórias, que havia perdido suas letras mágicas. A partir desse enredo, iniciamos as primeiras explorações do alfabeto.",
      objectives: [
        "Reconhecer letras do alfabeto;",
        "Diferenciar letras e números;",
        "Identificar letras do próprio nome;",
        "Desenvolver pertencimento à narrativa."
      ],
      resources: [
        "Painel da Jornada;",
        "Carta da missão;",
        "Música temática;",
        "Letras móveis;",
        "Recursos impressos e painel digital para ser projetado.",
        "Adesivo da missão",
        "Lembrança de conquista da Missão – Pulseira."
      ],
      observations: "As crianças utilizaram o próprio nome como principal referência para reconhecer letras. O ambiente gamificado despertou curiosidade, pertencimento e participação espontânea.",
      replication: {
        time: "1 a 2 aulas de 50 minutos.",
        materials: [
          "Letras móveis (EVA, papel ou plástico);",
          "Cartaz ou painel da jornada;",
          "Caixa ou envelope para a carta da missão;",
          "Música relacionada ao alfabeto;",
          "Imagens da narrativa (animais, floresta ou personagens)."
        ],
        steps: [
          "Organize a sala de forma diferente da rotina habitual, espalhando letras móveis pelo ambiente.",
          "Receba as crianças com uma música relacionada às letras e ao alfabeto.",
          "Apresente a narrativa da missão por meio da leitura da carta enviada pelos personagens da floresta.",
          "Convide a turma a procurar e separar apenas as letras encontradas no ambiente, diferenciando-as de números e outros símbolos.",
          "Promova uma roda de conversa sobre o que descobriram, incentivando que relacionem as letras encontradas aos próprios nomes.",
          "Apresente o painel da jornada e explique as etapas que serão percorridas ao longo das próximas missões.",
          "Finalize registrando as descobertas da turma e celebrando o início da Jornada dos Super Leitores."
        ]
      },
      accessibility: [
        "Utilizar letras ampliadas;",
        "Disponibilizar letras em diferentes materiais e texturas;",
        "Permitir respostas orais, apontamentos ou manipulação dos objetos;",
        "Trabalhar individualmente, em duplas ou pequenos grupos;",
        "Utilizar recursos visuais, sonoros e concretos simultaneamente."
      ],
      teacherTips: "Valorize todas as formas de participação. Algumas crianças demonstram interesse falando, enquanto outras observam, apontam, manipulam materiais ou acompanham os colegas.",
      bnccSkills: [
        "EF01LP04 – Distinguir letras do alfabeto de outros sinais gráficos.",
        "EF01LP05 – Reconhecer o sistema de escrita alfabética como representação dos sons da fala.",
        "EF01LP10 – Nomear as letras do alfabeto e recitá-lo na ordem das letras."
      ],
      contentImages: [
        "https://via.placeholder.com/300x200?text=Imagem+Atividade+1",
        "https://via.placeholder.com/300x200?text=Imagem+Atividade+2"
      ]
    }
  },
  {
    id: 2,
    title: "MISSÃO 2",
    subtitle: "A GRANDE DESCOBERTA",
    icon: <Search size={iconSize} className={iconClass} />,
    details: {
      whatHappened: "Após reconhecer as letras e compreender seu papel na Floresta das Histórias, os Super Leitores receberam uma nova missão: investigar pistas escondidas em imagens, palavras e sons. Como verdadeiros exploradores, as crianças precisavam observar atentamente os desafios para descobrir relações entre figuras, letras iniciais e palavras conhecidas. Mensagem da Missão: 'Todo grande explorador observa, escuta e descobre pistas. Cada som encontrado aproxima os Super Leitores dos segredos da Floresta das Histórias!'",
      objectives: [
        "Desenvolver a consciência fonológica;",
        "Relacionar imagem e palavra;",
        "Identificar sons iniciais das palavras;",
        "Ampliar o vocabulário oral;",
        "Perceber semelhanças e diferenças sonoras entre palavras."
      ],
      resources: [
        "Jogos digitais (Coquinhos: Letra Inicial e Completar Palavras / Escola Games: Palavras e Desenhos);",
        "Carta da missão;",
        "Fichas ilustradas com animais (Abelha, Baleia, Bode, Boi, etc);",
        "Letras móveis;",
        "Recursos audiovisuais."
      ],
      observations: "As crianças passaram a utilizar referências do cotidiano para justificar suas escolhas e começaram a perceber que as palavras possuem sons que podem ser identificados, comparados e agrupados.",
      replication: {
        time: "1 a 2 aulas de 50 minutos.",
        materials: [
          "Computador, tablet ou celular com acesso aos jogos;",
          "Cartões com imagens variadas;",
          "Sílabas que completem o nome das imagens;",
          "Painel ou quadro para registro coletivo;",
          "Caixa das descobertas (opcional)."
        ],
        steps: [
          "Apresente a carta da missão e o novo desafio da Floresta das Histórias.",
          "Organize as crianças em duplas ou pequenos grupos para favorecer a colaboração.",
          "Inicie uma conversa exploratória utilizando imagens conhecidas pelas crianças.",
          "Realize os jogos digitais propostos, estimulando que expliquem suas escolhas e compartilhem estratégias.",
          "Promova momentos de socialização para que as crianças contem como descobriram as respostas.",
          "Registre coletivamente as palavras exploradas e destaque os sons iniciais identificados.",
          "Atualize o painel da jornada e celebre as descobertas realizadas pela turma."
        ]
      },
      accessibility: [
        "Utilizar imagens ampliadas e com alto contraste;",
        "Disponibilizar apoio auditivo para identificação dos sons;",
        "Permitir respostas orais, por apontamento ou manipulação de letras móveis;",
        "Organizar atividades em diferentes níveis de complexidade;",
        "Favorecer trabalho colaborativo entre pares."
      ],
      teacherTips: "Evite focar apenas na resposta correta. Valorize os caminhos percorridos pelas crianças para chegar às respostas, incentivando que expliquem seus raciocínios.",
      bnccSkills: [
        "EF01LP05 – Reconhecer o sistema de escrita alfabética como representação dos sons da fala;",
        "EF01LP06 – Segmentar oralmente palavras em sílabas;",
        "EF01LP09 – Comparar palavras, identificando semelhanças e diferenças entre seus sons e sua escrita."
      ],
      contentImages: [
        "image.jpg",
        "https://via.placeholder.com/300x200?text=Jogos+Digitais+Missão+2"
      ]
    }
  },
  {
    id: 3,
    title: "MISSÃO 3",
    subtitle: "CÓDIGO DAS PALAVRAS",
    icon: <Puzzle size={iconSize} className={iconClass} />,
    details: {
      whatHappened: "Após recuperar pistas importantes da Floresta das Histórias, os Super Leitores receberam um novo desafio: decifrar mensagens secretas escondidas em códigos espalhados pelo reino encantado. Para avançar na jornada, as crianças precisavam observar letras, identificar palavras, interpretar pistas visuais e construir hipóteses.",
      objectives: [
        "Construir hipóteses sobre a escrita;",
        "Relacionar letras, sons e palavras;",
        "Reconhecer a importância da sequência das letras na formação das palavras;",
        "Desenvolver estratégias de leitura e decodificação;",
        "Fortalecer a oralidade e a argumentação;",
        "Favorecer a colaboração entre pares."
      ],
      resources: [
        "Códigos impressos (Alfabeto associado a emojis/figuras);",
        "Folha com mensagem secreta;",
        "Painel da Jornada dos Super Leitores;",
        "Carta da missão;",
        "Atividades impressas e quadro branco;",
        "Alfabeto ilustrado e recursos visuais para apoio."
      ],
      observations: "As crianças passaram a utilizar diferentes estratégias para decifrar palavras e mensagens. Muitas recorreram ao nome próprio, aos nomes dos colegas e às imagens. O trabalho em duplas favoreceu a colaboração e a construção coletiva da leitura.",
      replication: {
        time: "2 aulas de 50 minutos.",
        materials: [
          "Cartões com códigos e mensagens;",
          "Folhas impressas com desafios de leitura;",
          "Painel da jornada e quadro branco;",
          "Letras móveis (opcional);",
          "Recursos visuais de apoio."
        ],
        steps: [
          "Retome as missões anteriores utilizando o painel da jornada.",
          "Apresente a carta da missão explicando sobre as mensagens secretas.",
          "Organize a turma em duplas para favorecer a troca de estratégias.",
          "Apresente os códigos e desafie as crianças a descobrir as mensagens escondidas.",
          "Incentive que verbalizem suas hipóteses.",
          "Circule entre os grupos realizando mediações por meio de perguntas e pistas.",
          "Promova um momento coletivo para compartilhar as descobertas realizadas.",
          "Finalize atualizando o painel da jornada."
        ]
      },
      accessibility: [
        "Utilizar letras ampliadas e materiais com alto contraste;",
        "Disponibilizar apoio visual por meio de imagens e símbolos;",
        "Permitir respostas orais, apontamentos ou manipulação de letras móveis;",
        "Organizar grupos colaborativos com diferentes níveis de apoio;",
        "Oferecer desafios com graus variados de complexidade."
      ],
      teacherTips: "Valorize os processos de investigação e não apenas as respostas corretas. Os comentários e estratégias utilizadas revelam importantes pistas sobre como estão construindo conhecimentos.",
      bnccSkills: [
        "EF01LP05 – Reconhecer o sistema de escrita alfabética como representação dos sons da fala;",
        "EF01LP08 – Relacionar elementos sonoros das palavras com sua representação escrita;",
        "EF01LP09 – Comparar palavras identificando semelhanças e diferenças sonoras e gráficas;",
        "EF01LP12 – Reconhecer a separação das palavras na escrita."
      ],
      contentImages: []
    }
  },
  {
    id: 4,
    title: "MISSÃO 4",
    subtitle: "PEQUENOS LEITORES",
    icon: <BookOpen size={iconSize} className={iconClass} />,
    details: {
      whatHappened: "Os livros encantados da floresta começavam a reaparecer, mas era preciso fortalecer os poderes de leitura. Os estudantes assumiram oficialmente o papel de Pequenos Escritores e Leitores. A missão integrou recursos digitais, materiais manipuláveis e a construção do Livro do Super Leitor, no qual cada criança pôde falar sobre si.",
      objectives: [
        "Consolidar habilidades relacionadas à leitura inicial;",
        "Reconhecer letras e palavras com maior autonomia;",
        "Relacionar sons, imagens e escrita;",
        "Desenvolver estratégias de leitura por meio de recursos digitais e concretos;",
        "Favorecer a oralidade, a colaboração e a participação ativa das crianças;",
        "Ampliar as possibilidades de acesso à leitura a partir dos princípios do DUA."
      ],
      resources: [
        "Jogos Digitais: Ludo Primeiros Passos e Escola Games - Letrinhas;",
        "Livro do Super Leitor (folha de ofício dividida e grampeada);",
        "Fichas impressas e cartas da missão;",
        "Tampinhas com letras;",
        "Tablets, notebooks e painel da jornada."
      ],
      observations: "As crianças mobilizaram diferentes estratégias para resolver os desafios de escrita do livro e da leitura dos jogos digitais. A construção do Livro do Super Leitor produziu sentidos para a leitura, fortalecendo vínculos entre alfabetização e identidade.",
      replication: {
        time: "2 a 3 aulas de 50 minutos.",
        materials: [
          "Tablets ou computadores com acesso à internet;",
          "Folhas de ofício (para dobrar e grampear o livro);",
          "Tampinhas com letras para pareamento;",
          "Fichas impressas de suporte."
        ],
        steps: [
          "Organize os alunos em duplas, pequenos grupos ou rodízio por estações.",
          "Promova a exploração dos jogos digitais (Ludo Educativo e Escola Games).",
          "Distribua as folhas em branco e inicie a confecção do Livro do Super Leitor.",
          "Incentive a escrita sobre a família e os sonhos das crianças no livro.",
          "Realize uma roda de leitura e socialização para que apresentem suas criações aos animais da floresta."
        ]
      },
      accessibility: [
        "Uso simultâneo de interfaces digitais (tablets) e materiais concretos (tampinhas);",
        "Trabalho colaborativo em pares ou estações;",
        "Permitir que as crianças expressem a narrativa do seu livro de forma oral."
      ],
      teacherTips: "Permita que as crianças conversem sobre suas hipóteses, observem os colegas e utilizem diferentes recursos para resolver os desafios.",
      bnccSkills: [
        "EF01LP07 – Ler palavras e pequenos textos."
      ],
      contentImages: []
    }
  },
  {
    id: 5,
    title: "MISSÃO 5",
    subtitle: "EXPLORADORES DIGITAIS",
    icon: <Laptop size={iconSize} className={iconClass} />,
    details: {
      whatHappened: "Os Super Leitores receberam uma nova missão: explorar um território desconhecido, o Mundo Digital das Letras. A turma foi convidada a utilizar a plataforma EduEdu para vivenciar experiências de leitura e escrita mediadas por tecnologias digitais.",
      objectives: [
        "Ampliar experiências de leitura e escrita em ambientes digitais;",
        "Desenvolver estratégias de identificação de letras, palavras e sons;",
        "Utilizar recursos digitais como apoio à alfabetização;",
        "Favorecer a colaboração e a troca de estratégias entre os estudantes;",
        "Reconhecer diferentes formas de aprender e resolver desafios;",
        "Desenvolver autonomia na exploração de recursos tecnológicos."
      ],
      resources: [
        "Plataforma digital: EduEdu;",
        "Tablets e celulares;",
        "Painel da Jornada dos Super Leitores;",
        "Carta da missão;",
        "Recursos sonoros e visuais da plataforma."
      ],
      observations: "A chegada ao Mundo Digital despertou grande curiosidade. As crianças utilizaram múltiplas estratégias: algumas recorriam às imagens, outras aos sons, e muitas combinavam pistas visuais e auditivas. A aprendizagem ocorreu de forma colaborativa.",
      replication: {
        time: "2 aulas de 50 minutos.",
        materials: [
          "Tablets, celulares ou computadores com internet;",
          "Acesso à plataforma EduEdu;",
          "Painel da jornada e caixa de som;",
          "Cartões de apoio para mediação."
        ],
        steps: [
          "Retome as missões anteriores utilizando o painel da jornada.",
          "Converse sobre experiências prévias com tecnologias digitais e jogos.",
          "Apresente a narrativa da missão e a chegada ao Mundo Digital das Letras.",
          "Apresente a plataforma EduEdu e demonstre o funcionamento dos desafios.",
          "Organize as crianças em duplas ou pequenos grupos.",
          "Permita a exploração dos jogos.",
          "Circule realizando mediações por meio de perguntas.",
          "Ao final, promova uma roda de conversa para compartilhamento.",
          "Atualize o painel da jornada."
        ]
      },
      accessibility: [
        "Utilizar fones de ouvido quando necessário;",
        "Disponibilizar recursos visuais ampliados;",
        "Permitir respostas orais ou por apontamento;",
        "Organizar agrupamentos colaborativos;",
        "Oferecer apoio individualizado para navegação nos jogos;",
        "Explorar simultaneamente imagens, sons e textos."
      ],
      teacherTips: "Observe não apenas os acertos, mas os caminhos utilizados pelas crianças. Perguntas como 'Foi a imagem ou o som?' ajudam a tornar visíveis os processos de aprendizagem.",
      bnccSkills: [
        "EF01LP05 – Reconhecer o sistema de escrita alfabética como representação dos sons da fala;",
        "EF01LP07 – Ler palavras e pequenos textos com apoio de diferentes recursos;",
        "EF01LP09 – Comparar palavras identificando semelhanças e diferenças sonoras e gráficas;",
        "Competência Geral 5 – Cultura Digital."
      ],
      contentImages: []
    }
  },
  {
    id: 6,
    title: "MISSÃO 6",
    subtitle: "FAMÍLIA LEITORA",
    icon: <Home size={iconSize} className={iconClass} />,
    details: {
      whatHappened: "Os Super Leitores receberam a missão de levar a Jornada para dentro de casa. As crianças assumiram o papel de professoras dos jogos e desafios ensinando um familiar, fortalecendo a conexão escola/família.",
      objectives: [
        "Fortalecer a relação entre escola e família;",
        "Compartilhar aprendizagens construídas durante a jornada;",
        "Desenvolver autonomia e protagonismo infantil;",
        "Incentivar práticas de leitura e escrita em ambiente familiar;",
        "Valorizar a oralidade como ferramenta de comunicação e ensino;",
        "Ampliar os espaços de circulação das aprendizagens."
      ],
      resources: [
        "Carta da Missão enviada às famílias;",
        "Jogos utilizados nas missões anteriores;",
        "Painel da Jornada dos Super Leitores;",
        "Fotografias, vídeos, áudios e relatos enviados pelas famílias."
      ],
      observations: "As crianças demonstraram entusiasmo ao assumir o papel de mediadoras junto aos familiares. Mostraram confiança para explicar regras e organizar atividades.",
      replication: {
        time: "1 semana para realização em casa e 1 aula para socialização.",
        materials: [
          "Carta explicativa para as famílias;",
          "Jogos ou atividades já explorados pelos estudantes;",
          "Celular para registro (opcional);",
          "Painel da jornada;",
          "Espaço para socialização das experiências."
        ],
        steps: [
          "Converse com a turma sobre os jogos já realizados.",
          "Convide as crianças a escolherem uma atividade para ensinar em casa.",
          "Explique que serão as responsáveis por apresentar as regras.",
          "Envie a carta orientadora às famílias com sugestão de registro.",
          "Solicite que as famílias registrem por fotos, vídeos, áudios ou relatos.",
          "Na aula seguinte, reserve momento para as crianças compartilharem as experiências.",
          "Promova roda de conversa sobre os desafios e sentimentos vivenciados.",
          "Atualize o painel da jornada."
        ]
      },
      accessibility: [
        "Permitir diferentes formas de registro (foto, vídeo, áudio, desenho ou relato escrito);",
        "Adaptar os jogos às características de cada família;",
        "Possibilitar participação presencial ou remota dos familiares;",
        "Valorizar múltiplas formas de comunicação e expressão;",
        "Flexibilizar prazos e formas de devolutiva."
      ],
      teacherTips: "Valorize mais o processo do que a execução perfeita da atividade.",
      bnccSkills: [
        "EF01LP01 – Expressar-se em situações de intercâmbio oral;",
        "EF01LP19 – Relatar experiências pessoais e acontecimentos;",
        "EF15LP09 – Expressar-se oralmente com clareza em diferentes situações comunicativas;",
        "Competência Geral 8 e 10."
      ],
      contentImages: []
    }
  },
  {
    id: 7,
    title: "MISSÃO 7",
    subtitle: "COOPERAÇÃO",
    icon: <Handshake size={iconSize} className={iconClass} />,
    details: {
      whatHappened: "Após explorarem jogos, desafios digitais e experiências em família, os Super Leitores receberam uma nova missão: descobrir como a cooperação pode ajudar na construção das aprendizagens. A missão iniciou com uma roda de conversa sobre o significado de cooperar, refletindo sobre situações de ajuda mútua.",
      objectives: [
        "Compreender a cooperação como estratégia de aprendizagem;",
        "Desenvolver a consciência fonológica;",
        "Relacionar sons, letras e palavras;",
        "Construir hipóteses sobre a escrita;",
        "Ampliar a oralidade e a argumentação;",
        "Valorizar a participação e a colaboração entre os colegas."
      ],
      resources: [
        "Desafios digitais projetados no quadro;",
        "Atividades interativas de completar palavras a partir de imagens e pistas visuais;",
        "Projetor multimídia e Computador;",
        "Imagens ilustradas;",
        "Painel da Jornada dos Super Leitores;",
        "Folhas para registros e Roda de conversa."
      ],
      observations: "As crianças demonstraram compreender rapidamente a proposta, relacionando cooperação a atitudes de ajuda e compartilhamento. Houve intensa participação oral.",
      replication: {
        time: "1 a 2 aulas de 50 minutos.",
        materials: [
          "Computador e projetor;",
          "Apresentação com imagens e palavras incompletas;",
          "Caixa de som (opcional);",
          "Folhas para registros;",
          "Painel da jornada."
        ],
        steps: [
          "Organize a turma em roda e converse sobre o significado da cooperação.",
          "Incentive as crianças a compartilharem situações em que ajudaram ou foram ajudadas.",
          "Apresente os desafios digitais contendo imagens e palavras incompletas.",
          "Estimule a turma a construir hipóteses coletivamente, valorizando diferentes respostas.",
          "Incentive a verbalização dos sons das palavras (sílabas, letras e fonemas).",
          "Realize mediações por meio de perguntas para análise das pistas apresentadas.",
          "Promova momentos de troca e incentive que expliquem seus raciocínios.",
          "Finalize com uma roda de conversa sobre a contribuição da cooperação e atualize o painel."
        ]
      },
      accessibility: [
        "Utilizar imagens ampliadas e com alto contraste;",
        "Disponibilizar apoio visual e auditivo simultaneamente;",
        "Permitir respostas orais, gestuais ou por apontamento;",
        "Organizar grupos colaborativos com diferentes níveis de apoio;",
        "Oferecer múltiplas formas de participação durante os desafios."
      ],
      teacherTips: "Valorize as interações entre as crianças. Muitas vezes, as aprendizagens mais significativas surgem quando os estudantes explicam suas ideias, escutam os colegas e constroem respostas coletivamente.",
      bnccSkills: [
        "EF01LP05, EF01LP06, EF01LP09, EF15LP09, Competência Geral 9."
      ],
      contentImages: []
    }
  },
  {
    id: 8,
    title: "MISSÃO 8",
    subtitle: "DESAFIOS GAMIFICADOS",
    icon: <Gamepad2 size={iconSize} className={iconClass} />,
    details: {
      whatHappened: "Chegando à penúltima etapa, a missão foi ajudar os animais da Floresta Encantada a recuperar as últimas letras de seus nomes. A turma recordou as missões concluídas e refletiu sobre as estratégias aprendidas. Em seguida, participaram de uma sequência de desafios gamificados projetados no quadro.",
      objectives: [
        "Consolidar aprendizagens relacionadas à leitura e à escrita;",
        "Utilizar diferentes estratégias para identificar palavras;",
        "Desenvolver a consciência fonológica;",
        "Relacionar imagens, sons, letras e palavras;",
        "Resolver desafios utilizando conhecimentos construídos ao longo da jornada;",
        "Fortalecer a autonomia e a confiança diante das atividades de alfabetização."
      ],
      resources: [
        "Desafios gamificados projetados no quadro e atividades digitais;",
        "Projetor multimídia e Computador;",
        "Painel da Jornada dos Super Leitores;",
        "Distintivos da missão;",
        "Atividades impressas para registro individual;",
        "Recursos visuais relacionados à narrativa da floresta."
      ],
      observations: "As crianças passaram a utilizar estratégias mais elaboradas, recorrendo simultaneamente às imagens, aos sons, às letras e aos conhecimentos anteriores. A oralidade permaneceu como importante ferramenta.",
      replication: {
        time: "2 aulas de 50 minutos.",
        materials: [
          "Computador e projetor;",
          "Apresentação digital contendo imagens e palavras incompletas;",
          "Atividades impressas para registros;",
          "Distintivos ou adesivos de participação;",
          "Painel da jornada e Caixa de som (opcional)."
        ],
        steps: [
          "Retome a narrativa da Jornada e relembre as missões anteriores.",
          "Promova conversa sobre as estratégias para descobrir palavras.",
          "Apresente os desafios gamificados (imagens, letras incompletas e pistas).",
          "Incentive a participação oral e a colaboração para construção coletiva.",
          "Realize mediações por meio de perguntas sobre sons, letras e significados.",
          "Após os desafios coletivos, proponha registros individuais.",
          "Finalize com entrega de distintivos e atualização do painel.",
          "Promova autoavaliação sobre as estratégias utilizadas."
        ]
      },
      accessibility: [
        "Utilizar imagens ampliadas e de alto contraste;",
        "Disponibilizar pistas sonoras e visuais simultaneamente;",
        "Permitir respostas orais, gestuais ou escritas;",
        "Organizar agrupamentos colaborativos;",
        "Oferecer diferentes níveis de complexidade para os desafios;",
        "Utilizar recursos concretos para apoiar a identificação das palavras."
      ],
      teacherTips: "Esta missão funciona melhor quando é compreendida como um momento de consolidação.",
      bnccSkills: [
        "EF01LP05, EF01LP08, EF01LP09, EF01LP12, EF01LP13."
      ],
      contentImages: []
    }
  },
  {
    id: 9,
    title: "MISSÃO 9",
    subtitle: "SISTEMATIZAÇÃO DO APRENDIZADO",
    icon: <ClipboardList size={iconSize} className={iconClass} />,
    details: {
      whatHappened: "As crianças chegaram a uma missão especial: organizar e registrar tudo aquilo que haviam aprendido. Para ajudar os animais a preservar suas memórias, participaram de uma leitura coletiva de imagem seguida de produção escrita individual.",
      objectives: [
        "Sistematizar aprendizagens construídas durante a jornada;",
        "Produzir registros escritos a partir da leitura de imagem;",
        "Desenvolver a autoria e a expressão escrita;",
        "Relacionar oralidade, leitura e escrita;",
        "Fortalecer a consciência fonológica;",
        "Ampliar a autonomia diante dos desafios de escrita;",
        "Valorizar diferentes hipóteses e percursos de alfabetização."
      ],
      resources: [
        "Imagem temática com brincadeiras infantis;",
        "Atividade impressa para produção escrita;",
        "Painel da Jornada dos Super Leitores;",
        "Cartazes e registros das missões anteriores;",
        "Coroa simbólicas da jornada;",
        "Leitura coletiva, Roda de conversa e Produção escrita individual."
      ],
      observations: "As crianças participaram ativamente das discussões. Na produção escrita, recorreram à oralização das palavras (repetindo sons e sílabas).",
      replication: {
        time: "2 aulas de 50 minutos.",
        materials: [
          "Imagem temática para leitura coletiva;",
          "Folhas de produção escrita;",
          "Lápis e materiais de registro;",
          "Painel da jornada;",
          "Recursos visuais construídos durante as missões."
        ],
        steps: [
          "Retome a narrativa e relembre as conquistas da turma.",
          "Apresente a imagem detalhada e incentive a observação e percepções.",
          "Registre coletivamente palavras e ideias da conversa.",
          "Convide cada estudante a produzir seus registros individuais a partir da imagem.",
          "Durante a escrita, faça mediações (perguntas sobre sons, sílabas e letras).",
          "Valorize as hipóteses e peça explicações de raciocínio.",
          "Reserve momento para socialização e celebre os avanços."
        ]
      },
      accessibility: [
        "Utilizar imagens ampliadas e com alto contraste;",
        "Permitir registros por desenho, escrita, oralidade ou gravações de áudio;",
        "Disponibilizar apoio visual com letras móveis e alfabetos de consulta;",
        "Oferecer diferentes formas de participação durante a leitura coletiva;",
        "Utilizar recursos de ampliação para estudantes com baixa visão;",
        "Permitir produção colaborativa quando necessário."
      ],
      teacherTips: "O foco não deve estar apenas no produto final, mas nos caminhos percorridos. Observe as estratégias e hipóteses formuladas.",
      bnccSkills: [
        "EF01LP05, EF01LP12, EF01LP17, EF15LP09, EF15LP02."
      ],
      contentImages: []
    }
  },
  {
    id: 10,
    title: "MISSÃO 10",
    subtitle: "A GRANDE CELEBRAÇÃO DOS SUPER LEITORES",
    icon: <Crown size={iconSize} className={iconClass} />,
    details: {
      whatHappened: "Os Super Leitores chegaram à última missão. Reuniram-se para revisitar as experiências, observando o painel, os distintivos e as marcas do percurso. Ao final, os animais da floresta convidaram as crianças a integrarem a Rede dos Guardiões das Histórias, com a missão de levar livros e personagens para casa.",
      objectives: [
        "Sistematizar e revisitar as experiências vivenciadas;",
        "Verificar a realização das atividades avaliativas propostas;",
        "Identificar e organizar possíveis registros pendentes;",
        "Promover autoavaliação e reflexão sobre aprendizagens;",
        "Reconhecer conquistas individuais e coletivas;",
        "Fortalecer a autonomia e a confiança diante da leitura e escrita;",
        "Incentivar práticas leitoras e ampliar participação familiar;",
        "Reconhecer-se como Guardião das Histórias."
      ],
      resources: [
        "Painel da Jornada, Fichas avaliativas e Registros de missões;",
        "Distintivos, medalhas e Diploma de Super Leitor;",
        "Livros do acervo e Animais de pelúcia da Floresta;",
        "Sacola/mochila viajante da leitura;",
        "Ficha de acompanhamento das leituras em casa;",
        "Roda de conversa coletiva."
      ],
      observations: "As crianças demonstraram entusiasmo ao recordar o trajeto. A conferência das fichas favoreceu reflexões sobre o percurso individual.",
      replication: {
        time: "1 a 2 aulas de 50 minutos.",
        materials: [
          "Painel da jornada;",
          "Fichas avaliativas ou portfólios dos estudantes;",
          "Livros literários e Personagens/mascotes;",
          "Certificados, medalhas ou distintivos;",
          "Sacola viajante ou mochila da leitura."
        ],
        steps: [
          "Organize uma roda de conversa para retomada da Jornada.",
          "Convide as crianças a recordarem os desafios mais significativos.",
          "Revisite o painel e os registros do percurso.",
          "Realize a conferência das fichas avaliativas, identificando pendências.",
          "Promova autoavaliação (reflexão sobre conquistas e desafios).",
          "Compartilhe a conclusão da narrativa da Floresta Encantada.",
          "Apresente a Rede dos Guardiões das Histórias.",
          "Organize a escolha dos livros e dos animais que irão para casa.",
          "Oriente as famílias sobre a leitura compartilhada.",
          "Finalize com uma celebração coletiva das conquistas."
        ]
      },
      accessibility: [
        "Permitir diferentes formas de autoavaliação (oral, escrita, desenho, áudio ou vídeo);",
        "Disponibilizar recursos visuais e fotográficos para apoiar a retomada;",
        "Oferecer diferentes formas de participação durante reflexões;",
        "Adaptar os registros de leitura às necessidades dos estudantes;",
        "Valorizar múltiplas formas de expressão."
      ],
      teacherTips: "Esta não é apenas uma missão de encerramento, mas a oportunidade para tornar visíveis os percursos construídos, valorizando esforços e formas singulares de aprender.",
      bnccSkills: [
        "EF15LP09, EF15LP10, EF01LP17, Competências Gerais 8, 9, 10."
      ],
      contentImages: []
    }
  }
];