export type AchievementDocument = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
};

export const achievementDocuments: AchievementDocument[] = [
  {
    id: "higher-education",
    title: "Высшее строительное образование",
    subtitle: "Профильное высшее образование по строительному направлению.",
    image: "/achievements/vysshee-obrazovanie.png",
  },
  {
    id: "nrs-nostroy",
    title: "НРС НОСТРОЙ",
    subtitle: "Подтверждение включения в Национальный реестр специалистов.",
    image: "/achievements/nrs-nostroy.jpg",
  },
  {
    id: "construction-supervision",
    title: "Строительный надзор и контроль",
    subtitle: "Повышение квалификации по строительному контролю и надзору.",
    image: "/achievements/udostoverenie-stroynadzor.png",
  },
  {
    id: "pto-support",
    title: "ПТО и технологическое обеспечение",
    subtitle: "Подготовка и сопровождение производственно-технической документации.",
    image: "/achievements/udostoverenie-pto.png",
  },
  {
    id: "construction-organization",
    title: "Организация строительства",
    subtitle: "Повышение квалификации по организации строительного процесса.",
    image: "/achievements/udostoverenie-organizatsiya-stroitelstva.png",
  },
  {
    id: "builders-day-award",
    title: "Почетная грамота",
    subtitle: "Отраслевое поощрение ко Дню строителя.",
    image: "/achievements/pochetnaya-gramota-den-stroitelya.png",
  },
  {
    id: "rzhdstroy-award",
    title: "Почетная грамота",
    subtitle: "Почетная грамота от РЖДстрой.",
    image: "/achievements/pochetnaya-gramota-rzhdstroy.png",
  },
  {
    id: "rzhdstroy-gratitude",
    title: "Благодарность",
    subtitle: "Благодарность от РЖДстрой за профессиональную работу.",
    image: "/achievements/blagodarnost-rzhdstroy.png",
  },
];
