export type CaseDocument = {
  id: string;
  title: string;
  pdf: string;
};

export type ProjectCase = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  documents: CaseDocument[];
};

export const nadvoitsyFoundationCase: ProjectCase = {
  id: "nadvoitsy-foundations",
  title: "Замена дефектных фундаментов навесов НВ1",
  subtitle: "Станция Надвоицы, объект Мурманск — Петрозаводск",
  description:
    "Подготовка и сопровождение исполнительной документации по скрытым работам на этапе замены дефектных фундаментов: демонтаж, бетонная подготовка, армирование и опалубка, анкеровка, бетонирование, исполнительные схемы и подтверждающие документы.",
  documents: [
    {
      id: "act-rtn-1-1",
      title: "АОСР РТН-1.1 — Демонтаж дефектных фундаментов",
      pdf: "/act_RTN_1_1_pages_18_20.pdf",
    },
    {
      id: "act-rtn-1-2",
      title: "АОСР РТН-1.2 — Бетонная подготовка",
      pdf: "/act_RTN_1_2_pages_21_26.pdf",
    },
    {
      id: "act-rtn-1-3",
      title: "АОСР РТН-1.3 — Армирование и опалубка",
      pdf: "/act_RTN_1_3_pages_27_32.pdf",
    },
    {
      id: "act-rtn-1-4",
      title: "АОСР РТН-1.4 — Анкеровка фундаментов",
      pdf: "/act_RTN_1_4_pages_33_36.pdf",
    },
    {
      id: "act-rtn-1-5",
      title: "АОСР РТН-1.5 — Бетонирование фундаментов",
      pdf: "/act_RTN_1_5_pages_37_42.pdf",
    },
  ],
};
