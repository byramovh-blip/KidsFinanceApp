export interface QuizQuestion {
  id: number;
  question: {
    az: string;
    en: string;
    ru: string;
  };
  options: {
    az: string[];
    en: string[];
    ru: string[];
  };
  correctAnswer: number;
  ageGroup: '8-12' | '13-17' | '18+';
  points: number;
}

export const quizQuestions: QuizQuestion[] = [
  // 8-12 age group
  {
    id: 1,
    question: {
      az: 'Bank kartınızın PIN kodunu kimlərlə paylaşmalısınız?',
      en: 'Who should you share your bank card PIN code with?',
      ru: 'С кем вы должны делиться PIN-кодом вашей банковской карты?',
    },
    options: {
      az: ['Heç kimlə', 'Dostlarımla', 'Müəllimimlə', 'İnternet dostlarımla'],
      en: ['No one', 'With friends', 'With teacher', 'With internet friends'],
      ru: ['Ни с кем', 'С друзьями', 'С учителем', 'С интернет-друзьями'],
    },
    correctAnswer: 0,
    ageGroup: '8-12',
    points: 10,
  },
  {
    id: 2,
    question: {
      az: 'İnternetdə pul xərcləməzdən əvvəl nə etməlisiniz?',
      en: 'What should you do before spending money online?',
      ru: 'Что вы должны сделать перед тратой денег в интернете?',
    },
    options: {
      az: ['Valideynimlə danışmalıyam', 'Dərhal ödəməliyəm', 'Heç nə etməməliyəm', 'Dostlarıma soruşmalıyam'],
      en: ['Talk to my parents', 'Pay immediately', 'Do nothing', 'Ask friends'],
      ru: ['Поговорить с родителями', 'Заплатить немедленно', 'Ничего не делать', 'Спросить друзей'],
    },
    correctAnswer: 0,
    ageGroup: '8-12',
    points: 10,
  },
  {
    id: 3,
    question: {
      az: 'Kimsə sizə pulsuz pul vəd edərsə nə etməlisiniz?',
      en: 'What should you do if someone promises you free money?',
      ru: 'Что делать, если кто-то обещает вам бесплатные деньги?',
    },
    options: {
      az: ['Şübhə etməli və böyüklərimə deməliyəm', 'Dərhal qəbul etməliyəm', 'Dostlarıma danışmalıyam', 'Məlumatlarımı verməliyəm'],
      en: ['Be suspicious and tell adults', 'Accept immediately', 'Tell friends', 'Give my information'],
      ru: ['Быть подозрительным и сказать взрослым', 'Принять немедленно', 'Рассказать друзьям', 'Дать мою информацию'],
    },
    correctAnswer: 0,
    ageGroup: '8-12',
    points: 10,
  },
  {
    id: 4,
    question: {
      az: 'Pul yığmaq üçün ən yaxşı yer hansıdır?',
      en: 'What is the best place to save money?',
      ru: 'Какое лучшее место для сбережения денег?',
    },
    options: {
      az: ['Bank hesabı', 'Yastığın altında', 'Oyuncağımda', 'Dostumda'],
      en: ['Bank account', 'Under pillow', 'In my toy', 'With a friend'],
      ru: ['Банковский счет', 'Под подушкой', 'В моей игрушке', 'У друга'],
    },
    correctAnswer: 0,
    ageGroup: '8-12',
    points: 10,
  },
  
  // 13-17 age group
  {
    id: 5,
    question: {
      az: 'Onlayn alış-veriş edərkən hansı təhlükəsizlik elementinə diqqət etməlisiniz?',
      en: 'What security element should you look for when shopping online?',
      ru: 'На какой элемент безопасности следует обратить внимание при покупках онлайн?',
    },
    options: {
      az: ['HTTPS və kilid işarəsi', 'Rəngli dizayn', 'Böyük şriftlər', 'Çox reklam'],
      en: ['HTTPS and lock icon', 'Colorful design', 'Large fonts', 'Many ads'],
      ru: ['HTTPS и значок замка', 'Красочный дизайн', 'Крупные шрифты', 'Много рекламы'],
    },
    correctAnswer: 0,
    ageGroup: '13-17',
    points: 15,
  },
  {
    id: 6,
    question: {
      az: 'Phishing nədir?',
      en: 'What is phishing?',
      ru: 'Что такое фишинг?',
    },
    options: {
      az: ['Şəxsi məlumatları oğurlamaq üçün aldatma', 'Balıq tutma növü', 'Onlayn oyun', 'Bank xidməti'],
      en: ['Deception to steal personal information', 'Type of fishing', 'Online game', 'Banking service'],
      ru: ['Обман для кражи личной информации', 'Вид рыбалки', 'Онлайн игра', 'Банковский сервис'],
    },
    correctAnswer: 0,
    ageGroup: '13-17',
    points: 15,
  },
  {
    id: 7,
    question: {
      az: 'Güclü şifrə necə olmalıdır?',
      en: 'How should a strong password be?',
      ru: 'Каким должен быть надежный пароль?',
    },
    options: {
      az: ['Hərf, rəqəm və simvollardan ibarət, uzun', 'Sadə və qısa', 'Doğum tarixim', 'Adım'],
      en: ['Long with letters, numbers and symbols', 'Simple and short', 'My birth date', 'My name'],
      ru: ['Длинный с буквами, цифрами и символами', 'Простой и короткий', 'Моя дата рождения', 'Мое имя'],
    },
    correctAnswer: 0,
    ageGroup: '13-17',
    points: 15,
  },
  {
    id: 8,
    question: {
      az: 'İki faktorlu autentifikasiya (2FA) nə üçün vacibdir?',
      en: 'Why is two-factor authentication (2FA) important?',
      ru: 'Почему важна двухфакторная аутентификация (2FA)?',
    },
    options: {
      az: ['Əlavə təhlükəsizlik təbəqəsi yaradır', 'Sürəti artırır', 'Pulsuz pul verir', 'Reklam göstərir'],
      en: ['Creates additional security layer', 'Increases speed', 'Gives free money', 'Shows ads'],
      ru: ['Создает дополнительный уровень безопасности', 'Увеличивает скорость', 'Дает бесплатные деньги', 'Показывает рекламу'],
    },
    correctAnswer: 0,
    ageGroup: '13-17',
    points: 15,
  },
  
  // 18+ age group
  {
    id: 9,
    question: {
      az: 'Hansı maliyyə fırıldaqçılığı növü ən geniş yayılıb?',
      en: 'Which type of financial fraud is most common?',
      ru: 'Какой тип финансового мошенничества наиболее распространен?',
    },
    options: {
      az: ['Sosial mühəndislik və phishing', 'Fiziki oğurluq', 'ATM partlatma', 'Bank qarətçiliyi'],
      en: ['Social engineering and phishing', 'Physical theft', 'ATM blasting', 'Bank robbery'],
      ru: ['Социальная инженерия и фишинг', 'Физическая кража', 'Взрыв банкоматов', 'Ограбление банка'],
    },
    correctAnswer: 0,
    ageGroup: '18+',
    points: 20,
  },
  {
    id: 10,
    question: {
      az: 'Kredit kartı məlumatlarını hansı halda verməməlisiniz?',
      en: 'When should you NOT give credit card information?',
      ru: 'Когда НЕ следует давать информацию о кредитной карте?',
    },
    options: {
      az: ['Telefon zəngi ilə soruşduqda', 'Təhlükəsiz saytda', 'Bankın tətbiqində', 'Şəxsən bankda'],
      en: ['When asked via phone call', 'On secure website', 'In bank app', 'In person at bank'],
      ru: ['При запросе по телефону', 'На защищенном сайте', 'В приложении банка', 'Лично в банке'],
    },
    correctAnswer: 0,
    ageGroup: '18+',
    points: 20,
  },
  {
    id: 11,
    question: {
      az: 'Maliyyə portfelini diversifikasiya etmək nə deməkdir?',
      en: 'What does diversifying a financial portfolio mean?',
      ru: 'Что означает диверсификация финансового портфеля?',
    },
    options: {
      az: ['Riski azaltmaq üçün müxtəlif aktivlərdə investisiya', 'Bütün pulu bir yerdə saxlamaq', 'Yalnız nağd saxlamaq', 'Heç nə etməmək'],
      en: ['Investing in various assets to reduce risk', 'Keeping all money in one place', 'Keeping only cash', 'Doing nothing'],
      ru: ['Инвестирование в различные активы для снижения риска', 'Хранение всех денег в одном месте', 'Хранение только наличных', 'Ничего не делать'],
    },
    correctAnswer: 0,
    ageGroup: '18+',
    points: 20,
  },
  {
    id: 12,
    question: {
      az: 'Kriptoвалюta fırıldaqçılığından qorunmaq üçün nə etməlisiniz?',
      en: 'What should you do to protect from cryptocurrency fraud?',
      ru: 'Что делать для защиты от мошенничества с криптовалютой?',
    },
    options: {
      az: ['Təsdiq olunmuş platformalar istifadə edin və araşdırma aparın', 'Hər kəsə etibar edin', 'Tələsmə ilə investisiya edin', 'Şəxsi açarları paylaşın'],
      en: ['Use verified platforms and do research', 'Trust everyone', 'Invest hastily', 'Share private keys'],
      ru: ['Использовать проверенные платформы и проводить исследования', 'Доверять всем', 'Инвестировать поспешно', 'Делиться приватными ключами'],
    },
    correctAnswer: 0,
    ageGroup: '18+',
    points: 20,
  },
];

export const getQuestionsByAgeGroup = (ageGroup: '8-12' | '13-17' | '18+'): QuizQuestion[] => {
  return quizQuestions.filter(q => q.ageGroup === ageGroup);
};
