export type Service = {
  id: string;
  num: string;
  name: string;
  description: string;
  points: number;
};

export type Tariff = {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  points: number;
  example: string;
  featured?: boolean;
};

export type FaqItem = {
  q: string;
  a: string;
  ofertaLink?: boolean;
};

export type SampleCarousel = {
  id: string;
  title: string;
  description: string;
  slides: Array<{
    src: string;
    alt: string;
  }>;
};

export type SampleStory = {
  id: string;
  title: string;
  type: 'story';
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Sample = SampleCarousel | SampleStory;

export const samples: Sample[] = [
  {
    id: 'psychologist-carousel',
    title: 'Вариант 1',
    description: 'Одна тема, два варианта оформления',
    slides: [
      { src: '/samples/Тестовое_психолог_карусель1.jpg', alt: 'Слайд 1 карусели о признаках выгорания' },
      { src: '/samples/Тестовое_психолог_карусель2.jpg', alt: 'Слайд 2 карусели о признаках выгорания' },
      { src: '/samples/Тестовое_психолог_карусель3.jpg', alt: 'Слайд 3 карусели о признаках выгорания' },
      { src: '/samples/Тестовое_психолог_карусель4.jpg', alt: 'Слайд 4 карусели о признаках выгорания' },
      { src: '/samples/Тестовое_психолог_карусель5.jpg', alt: 'Слайд 5 карусели о признаках выгорания' },
    ],
  },
  {
    id: 'psychologist-carousel-alternative',
    title: 'Вариант 2',
    description: 'Одна тема, два варианта оформления',
    slides: [
      { src: '/samples/1.png', alt: 'Слайд 1 альтернативной карусели о признаках выгорания' },
      { src: '/samples/2.png', alt: 'Слайд 2 альтернативной карусели о признаках выгорания' },
      { src: '/samples/3.png', alt: 'Слайд 3 альтернативной карусели о признаках выгорания' },
      { src: '/samples/4.png', alt: 'Слайд 4 альтернативной карусели о признаках выгорания' },
      { src: '/samples/5 copy.png', alt: 'Слайд 5 альтернативной карусели о признаках выгорания' },
    ],
  },
  {
    id: 'story-a',
    title: 'Вариант 1',
    type: 'story',
    src: '/samples/story-a.webp',
    alt: 'Сторис варианта 1 о трёх признаках выгорания',
    width: 1080,
    height: 1920,
  },
  {
    id: 'story-b',
    title: 'Вариант 2',
    type: 'story',
    src: '/samples/story-b.webp',
    alt: 'Сторис варианта 2 о трёх признаках выгорания',
    width: 1080,
    height: 1920,
  },
];

export const heroWorks = [
  { sampleId: 'psychologist-carousel', slideIndex: 0 },
  { sampleId: 'psychologist-carousel', slideIndex: 4 },
  { sampleId: 'psychologist-carousel-alternative', slideIndex: 0 },
  { sampleId: 'psychologist-carousel-alternative', slideIndex: 4 },
] as const;

export function isSampleCarousel(sample: Sample): sample is SampleCarousel {
  return !('type' in sample);
}

export const services: Service[] = [
  { id: 'post', num: '01', name: 'Пост, баннер', description: 'Картинка для ленты', points: 1 },
  { id: 'cover', num: '02', name: 'Обложка', description: 'Превью видео, вебинара, канала', points: 1 },
  { id: 'header', num: '03', name: 'Шапка и аватар', description: 'Оформление профиля', points: 1 },
  { id: 'stories', num: '04', name: 'Сторис', description: 'Серия до 5 кадров, 1080×1920', points: 1 },
  { id: 'adapt', num: '05', name: 'Адаптация макета', description: 'Готовый макет в другом формате', points: 1 },
  { id: 'carousel', num: '06', name: 'Карусель', description: 'До 10 слайдов, обычно 1080×1350', points: 3 },
  { id: 'lead', num: '07', name: 'Лид-магнит, чек-лист', description: 'PDF до 5 страниц', points: 3 },
  { id: 'guide', num: '08', name: 'PDF-гайд', description: 'До 10 страниц', points: 6 },
  { id: 'presentation', num: '09', name: 'Презентация', description: 'До 15 слайдов', points: 10 },
];

export const tariffs: Tariff[] = [
  {
    id: 'start',
    name: 'Старт',
    price: '14\u202F500',
    priceNum: 14500,
    points: 10,
    example: '2 карусели, 2 обложки, 2 поста',
  },
  {
    id: 'standard',
    name: 'Стандарт',
    price: '27\u202F000',
    priceNum: 27000,
    points: 20,
    example: '4 карусели, 4 обложки, 4 поста',
    featured: true,
  },
  {
    id: 'pro',
    name: 'Про',
    price: '44\u202F000',
    priceNum: 44000,
    points: 35,
    example: 'презентация, 5 каруселей, PDF-гайд, 4 обложки или поста',
  },
];

export const faq: FaqItem[] = [
  {
    q: 'Что считается одной задачей?',
    a: 'Один законченный результат одного типа, в одном формате и с одной целью, сделанный по готовому тексту и полному брифу. Включает до двух кругов правок.',
  },
  {
    q: 'Что такое правка?',
    a: 'Изменение текста, цвета, порядка слайдов или картинки внутри исходной задачи. Другая концепция или структура, другой формат или возврат после приёмки считаются новой задачей.',
  },
  {
    q: 'Как быстро я получу первый макет?',
    a: 'В течение 48 часов после того, как мы получили полный бриф. Правки делаем за 24 часа. Без полного брифа срок не идёт.',
  },
  {
    q: 'Что нужно прислать для задачи?',
    a: 'Цель, готовый текст, референсы, формат и размер, срок. Бриф мы собираем из ваших материалов вместе с вами.',
  },
  {
    q: 'Нужно ли самому писать тексты?',
    a: 'Да. Вы пишете, мы оформляем. Тексты и темы мы не пишем.',
  },
  {
    q: 'Что если я не использую все баллы?',
    a: 'Неиспользованные баллы не переносятся на следующий месяц.',
  },
  {
    q: 'А если в макете опечатка?',
    a: 'Опечатку по вине студии исправляем бесплатно в течение 7 дней.',
  },
  {
    q: 'Вы гарантируете рост подписчиков или продаж?',
    a: 'Нет. Мы продаём экономию времени, регулярность и единый стиль, а результат блога зависит от многих факторов.',
  },
  {
    q: 'Как происходит оплата?',
    a: 'Предоплата за месяц, без неё работа не начинается. Счёт и способ оплаты согласуем после заявки.',
  },
  {
    q: 'Что с возвратом и паузой?',
    a: 'Условия возврата и паузы описаны в оферте.',
    ofertaLink: true,
  } as FaqItem & { ofertaLink?: boolean },
];

export const steps = [
  {
    num: '01',
    title: 'Заявка',
    text: 'Вы оставляете заявку, мы отвечаем в течение 4 рабочих часов.',
  },
  {
    num: '02',
    title: 'Предоплата и онбординг',
    text: 'Оплачиваете месяц, заполняете анкету, мы создаём общий чат и папку с материалами. Это занимает до двух рабочих дней.',
  },
  {
    num: '03',
    title: 'Настройка тона',
    text: 'В первую неделю подбираем цвета, шрифты и шаблоны, чтобы блог выглядел как одна серия.',
  },
  {
    num: '04',
    title: 'Задачи',
    text: 'Вы присылаете готовый текст. Первый макет приходит в течение 48 часов после полного брифа, правки занимают до 24 часов.',
  },
  {
    num: '05',
    title: 'Отчёт',
    text: 'Раз в месяц присылаем отчёт: что сделано и сколько баллов использовано.',
  },
];

export const marqueeServices = [
  'Пост',
  'Обложка',
  'Шапка и аватар',
  'Сторис',
  'Адаптация макета',
  'Карусель',
  'Лид-магнит',
  'PDF-гайд',
  'Презентация',
];

export const stats = [
  { num: 48, suffix: '', label: 'часов до первого макета после полного брифа', accent: true },
  { num: 2, suffix: '', label: 'круга правок на каждую задачу', accent: false },
  { num: 9, suffix: '', label: 'видов работ в подписке', accent: false },
  { num: 4, suffix: '', label: 'рабочих часа на ответ по заявке', accent: false },
];

export const includedAll = [
  'До двух кругов правок на каждую задачу',
  'Первый макет за 48 часов после полного брифа',
  'Общий чат с командой',
  'Ежемесячный отчёт',
  'До трёх задач одновременно в работе',
  'Неиспользованные баллы не переносятся',
];

export function plural(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return many;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
}
