import { LangCode } from "./i18n";

/**
 * The languages the header switcher actually offers. `translations` in i18n.ts
 * still covers sixteen codes for the blog, but only these ten can ever be the
 * active UI language, so the copy added here is complete for exactly these.
 */
export type UiLang = 'nl' | 'en' | 'fr' | 'de' | 'es' | 'sv' | 'no' | 'da' | 'fi' | 'ar';

export interface ExtraText {
  channels: {
    badge: string;
    catalogue: string;
    listed: string;
    eu: string; euItalic: string;
    world: string; worldItalic: string;
    ppv: string; ppvItalic: string;
  };
  hero: {
    months: (n: number) => string;
    freeBonus: (n: number) => string;
  };
  pricing: {
    quality: string;
    bestSeller: string;
    testPack1: string;
    testPack2: string;
    moShort: string;
    freeShort: string;
  };
  coverage: {
    badge: string;
    title: string;
    subtitle: string;
    contact: string;
    packages: string;
    waText: string;
  };
  payments: {
    bankWire: string;
    /** Prefilled WhatsApp message for the "need help installing" support button. */
    supportWaText: string;
  };
  reviews: {
    count: string;
    verified: string;
  };
  social: {
    follow: string;
    linkNotSet: string;
  };
}

const EXTRA: Record<UiLang, ExtraText> = {
  nl: {
    channels: {
      badge: '69K+ Zenders', catalogue: 'Zendercatalogus', listed: 'vermeld',
      eu: 'Europese', euItalic: 'Zenders.',
      world: 'Wereldwijde', worldItalic: 'Zenders.',
      ppv: 'PPV VIP', ppvItalic: 'Zenders EU.',
    },
    hero: { months: n => `${n} MAANDEN`, freeBonus: n => `+ ${n} MAANDEN GRATIS` },
    pricing: { quality: 'Max. kwaliteit', bestSeller: '★ BEST VERKOCHT', testPack1: 'IDEAAL OM', testPack2: 'TE TESTEN ★', moShort: 'MND', freeShort: 'GRATIS' },
    coverage: {
      badge: 'Dekking in heel Nederland',
      title: 'De #1 IPTV-dienst van Nederland',
      subtitle: 'Van Amsterdam tot Rotterdam, van Utrecht tot Den Haag — glasheldere streams op elk Nederlands netwerk (KPN, Ziggo, Odido, Delta). Nederlandstalige support, 24/7 bereikbaar.',
      contact: 'Contact opnemen', packages: 'Bekijk pakketten',
      waText: 'Hallo, ik wil graag meer weten over TOP IPTV KAUFEN.',
    },
    payments: { bankWire: 'Standaard bankoverschrijving', supportWaText: 'Hallo, ik heb hulp nodig bij de installatie van mijn TOP IPTV KAUFEN-abonnement.' },
    reviews: { count: 'reviews', verified: 'Geverifieerd' },
    social: { follow: 'Volg ons', linkNotSet: 'link nog niet ingesteld' },
  },
  en: {
    channels: {
      badge: '69K+ Channels', catalogue: 'Channel Catalogue', listed: 'listed',
      eu: 'European', euItalic: 'Channels.',
      world: 'Worldwide', worldItalic: 'Channels.',
      ppv: 'PPV VIP', ppvItalic: 'Channels EU.',
    },
    hero: { months: n => `${n} MONTHS`, freeBonus: n => `+ ${n} MONTHS FREE` },
    pricing: { quality: 'Max. quality', bestSeller: '★ BEST SELLER', testPack1: 'PERFECT FOR', testPack2: 'TESTING ★', moShort: 'MO', freeShort: 'FREE' },
    coverage: {
      badge: 'Coverage across the Netherlands',
      title: 'The #1 IPTV service in the Netherlands',
      subtitle: 'From Amsterdam to Rotterdam, from Utrecht to Den Haag — crystal-clear streams on every Dutch network (KPN, Ziggo, Odido, Delta). Dutch-speaking support, reachable 24/7.',
      contact: 'Get in touch', packages: 'View plans',
      waText: 'Hello, I would like to know more about TOP IPTV KAUFEN.',
    },
    payments: { bankWire: 'Standard bank wire', supportWaText: 'Hello, I need help setting up my TOP IPTV KAUFEN subscription.' },
    reviews: { count: 'reviews', verified: 'Verified' },
    social: { follow: 'Follow us', linkNotSet: 'link not configured' },
  },
  fr: {
    channels: {
      badge: '69K+ Chaînes', catalogue: 'Catalogue de chaînes', listed: 'répertoriées',
      eu: 'Chaînes', euItalic: 'européennes.',
      world: 'Chaînes', worldItalic: 'mondiales.',
      ppv: 'PPV VIP', ppvItalic: 'Chaînes UE.',
    },
    hero: { months: n => `${n} MOIS`, freeBonus: n => `+ ${n} MOIS OFFERTS` },
    pricing: { quality: 'Qualité max.', bestSeller: '★ BEST-SELLER', testPack1: 'IDÉAL POUR', testPack2: 'TESTER ★', moShort: 'MOIS', freeShort: 'OFFERT' },
    coverage: {
      badge: "Couverture dans tout le territoire néerlandais",
      title: "Le service IPTV n°1 des Pays-Bas",
      subtitle: "De Amsterdam à Rotterdam, de Utrecht à Den Haag — des flux d'une netteté parfaite sur tous les réseaux néerlandais (KPN, Ziggo, Odido, Delta). Support néerlandophone joignable 24h/24 et 7j/7.",
      contact: 'Nous contacter', packages: 'Voir les offres',
      waText: 'Bonjour, je souhaite en savoir plus sur TOP IPTV KAUFEN.',
    },
    payments: { bankWire: 'Virement bancaire standard', supportWaText: "Bonjour, j'ai besoin d'aide pour installer mon abonnement TOP IPTV KAUFEN." },
    reviews: { count: 'avis', verified: 'Vérifié' },
    social: { follow: 'Suivez-nous', linkNotSet: 'lien pas encore configuré' },
  },
  de: {
    channels: {
      badge: '69K+ Sender', catalogue: 'Senderkatalog', listed: 'gelistet',
      eu: 'Europäische', euItalic: 'Sender.',
      world: 'Weltweite', worldItalic: 'Sender.',
      ppv: 'PPV VIP', ppvItalic: 'Sender EU.',
    },
    hero: { months: n => `${n} MONATE`, freeBonus: n => `+ ${n} MONATE GRATIS` },
    pricing: { quality: 'Max. Qualität', bestSeller: '★ BESTSELLER', testPack1: 'PERFEKT ZUM', testPack2: 'TESTEN ★', moShort: 'MON', freeShort: 'GRATIS' },
    coverage: {
      badge: 'Abdeckung in den gesamten Niederlanden',
      title: 'Der IPTV-Dienst Nr. 1 in den Niederlanden',
      subtitle: 'Von Amsterdam bis Rotterdam, von Utrecht bis Den Haag — gestochen scharfe Streams in jedem niederländischen Netz (KPN, Ziggo, Odido, Delta). Niederländischsprachiger Support, rund um die Uhr erreichbar.',
      contact: 'Kontakt aufnehmen', packages: 'Pakete ansehen',
      waText: 'Hallo, ich möchte mehr über TOP IPTV KAUFEN erfahren.',
    },
    payments: { bankWire: 'Klassische Banküberweisung', supportWaText: 'Hallo, ich brauche Hilfe bei der Einrichtung meines TOP IPTV KAUFEN-Abonnements.' },
    reviews: { count: 'Bewertungen', verified: 'Verifiziert' },
    social: { follow: 'Folge uns', linkNotSet: 'Link noch nicht eingerichtet' },
  },
  es: {
    channels: {
      badge: '69K+ Canales', catalogue: 'Catálogo de canales', listed: 'listados',
      eu: 'Canales', euItalic: 'europeos.',
      world: 'Canales', worldItalic: 'mundiales.',
      ppv: 'PPV VIP', ppvItalic: 'Canales UE.',
    },
    hero: { months: n => `${n} MESES`, freeBonus: n => `+ ${n} MESES GRATIS` },
    pricing: { quality: 'Calidad máx.', bestSeller: '★ MÁS VENDIDO', testPack1: 'IDEAL PARA', testPack2: 'PROBAR ★', moShort: 'MES', freeShort: 'GRATIS' },
    coverage: {
      badge: 'Cobertura en todos los Países Bajos',
      title: 'El servicio IPTV n.º 1 de los Países Bajos',
      subtitle: 'De Ámsterdam a Róterdam, de La Haya a Utrecht — transmisiones nítidas en todas las redes neerlandesas (KPN, Ziggo, Odido, Delta). Soporte en neerlandés, disponible 24/7.',
      contact: 'Contactar', packages: 'Ver paquetes',
      waText: 'Hola, me gustaría saber más sobre TOP IPTV KAUFEN.',
    },
    payments: { bankWire: 'Transferencia bancaria estándar', supportWaText: 'Hola, necesito ayuda para configurar mi suscripción TOP IPTV KAUFEN.' },
    reviews: { count: 'reseñas', verified: 'Verificado' },
    social: { follow: 'Síguenos', linkNotSet: 'enlace no configurado' },
  },
  sv: {
    channels: {
      badge: '69K+ Kanaler', catalogue: 'Kanalkatalog', listed: 'listade',
      eu: 'Europeiska', euItalic: 'kanaler.',
      world: 'Globala', worldItalic: 'kanaler.',
      ppv: 'PPV VIP', ppvItalic: 'Kanaler EU.',
    },
    hero: { months: n => `${n} MÅNADER`, freeBonus: n => `+ ${n} MÅNADER GRATIS` },
    pricing: { quality: 'Max. kvalitet', bestSeller: '★ MEST SÅLD', testPack1: 'PERFEKT ATT', testPack2: 'TESTA ★', moShort: 'MÅN', freeShort: 'GRATIS' },
    coverage: {
      badge: 'Täckning i hela Tyskland',
      title: 'Tysklands IPTV-tjänst nr 1',
      subtitle: 'Från Amsterdam till Rotterdam, från Utrecht till Den Haag — kristallklara strömmar på alla tyska nät (KPN, Ziggo, Odido, Delta). Tysktalig support, tillgänglig dygnet runt.',
      contact: 'Kontakta oss', packages: 'Se paketen',
      waText: 'Hej, jag vill veta mer om TOP IPTV KAUFEN.',
    },
    payments: { bankWire: 'Vanlig banköverföring', supportWaText: 'Hej, jag behöver hjälp med att installera mitt TOP IPTV KAUFEN-abonnemang.' },
    reviews: { count: 'omdömen', verified: 'Verifierad' },
    social: { follow: 'Följ oss', linkNotSet: 'länk ej konfigurerad' },
  },
  no: {
    channels: {
      badge: '69K+ Kanaler', catalogue: 'Kanalkatalog', listed: 'oppført',
      eu: 'Europeiske', euItalic: 'kanaler.',
      world: 'Globale', worldItalic: 'kanaler.',
      ppv: 'PPV VIP', ppvItalic: 'Kanaler EU.',
    },
    hero: { months: n => `${n} MÅNEDER`, freeBonus: n => `+ ${n} MÅNEDER GRATIS` },
    pricing: { quality: 'Maks. kvalitet', bestSeller: '★ MEST SOLGT', testPack1: 'PERFEKT Å', testPack2: 'TESTE ★', moShort: 'MND', freeShort: 'GRATIS' },
    coverage: {
      badge: 'Dekning i hele Tyskland',
      title: 'Tysklands IPTV-tjeneste nr. 1',
      subtitle: 'Fra Amsterdam til Rotterdam, fra Utrecht til Den Haag — knivskarpe strømmer på alle tyske nett (KPN, Ziggo, Odido, Delta). Tysktalig support, tilgjengelig døgnet rundt.',
      contact: 'Ta kontakt', packages: 'Se pakkene',
      waText: 'Hei, jeg vil gjerne vite mer om TOP IPTV KAUFEN.',
    },
    payments: { bankWire: 'Vanlig bankoverføring', supportWaText: 'Hei, jeg trenger hjelp til å sette opp TOP IPTV KAUFEN-abonnementet mitt.' },
    reviews: { count: 'anmeldelser', verified: 'Verifisert' },
    social: { follow: 'Følg oss', linkNotSet: 'lenke ikke konfigurert' },
  },
  da: {
    channels: {
      badge: '69K+ Kanaler', catalogue: 'Kanalkatalog', listed: 'anført',
      eu: 'Europæiske', euItalic: 'kanaler.',
      world: 'Globale', worldItalic: 'kanaler.',
      ppv: 'PPV VIP', ppvItalic: 'Kanaler EU.',
    },
    hero: { months: n => `${n} MÅNEDER`, freeBonus: n => `+ ${n} MÅNEDER GRATIS` },
    pricing: { quality: 'Maks. kvalitet', bestSeller: '★ MEST SOLGTE', testPack1: 'PERFEKT AT', testPack2: 'TESTE ★', moShort: 'MDR', freeShort: 'GRATIS' },
    coverage: {
      badge: 'Dækning i hele Tyskland',
      title: 'Tysklands IPTV-tjeneste nr. 1',
      subtitle: 'Fra Hamborg til Rotterdam, fra Utrecht til Den Haag — knivskarpe streams på alle tyske net (KPN, Ziggo, Odido, Delta). Tysktalende support, tilgængelig døgnet rundt.',
      contact: 'Kontakt os', packages: 'Se pakkerne',
      waText: 'Hej, jeg vil gerne vide mere om TOP IPTV KAUFEN.',
    },
    payments: { bankWire: 'Almindelig bankoverførsel', supportWaText: 'Hej, jeg har brug for hjælp til at opsætte mit TOP IPTV KAUFEN-abonnement.' },
    reviews: { count: 'anmeldelser', verified: 'Verificeret' },
    social: { follow: 'Følg os', linkNotSet: 'link ikke konfigureret' },
  },
  fi: {
    channels: {
      badge: '69K+ Kanavaa', catalogue: 'Kanavaluettelo', listed: 'listattu',
      eu: 'Eurooppalaiset', euItalic: 'kanavat.',
      world: 'Maailmanlaajuiset', worldItalic: 'kanavat.',
      ppv: 'PPV VIP', ppvItalic: 'Kanavat EU.',
    },
    hero: { months: n => `${n} KUUKAUTTA`, freeBonus: n => `+ ${n} KUUKAUTTA ILMAISEKSI` },
    pricing: { quality: 'Maks. laatu', bestSeller: '★ MYYDYIN', testPack1: 'TÄYDELLINEN', testPack2: 'KOKEILUUN ★', moShort: 'KK', freeShort: 'ILMAINEN' },
    coverage: {
      badge: 'Kattavuus koko Saksassa',
      title: 'Saksan ykkös-IPTV-palvelu',
      subtitle: 'Hampurista Rotterdamiin, Utrechtistä Berliiniin — kristallinkirkkaat lähetykset kaikissa saksalaisissa verkoissa (KPN, Ziggo, Odido, Delta). Saksankielinen tuki, tavoitettavissa ympäri vuorokauden.',
      contact: 'Ota yhteyttä', packages: 'Katso paketit',
      waText: 'Hei, haluaisin tietää lisää TOP IPTV KAUFEN:stä.',
    },
    payments: { bankWire: 'Tavallinen tilisiirto', supportWaText: 'Hei, tarvitsen apua TOP IPTV KAUFEN-tilaukseni käyttöönotossa.' },
    reviews: { count: 'arvostelua', verified: 'Vahvistettu' },
    social: { follow: 'Seuraa meitä', linkNotSet: 'linkki ei ole määritetty' },
  },
  ar: {
    channels: {
      badge: '+69 ألف قناة', catalogue: 'دليل القنوات', listed: 'مدرجة',
      eu: 'القنوات', euItalic: 'الأوروبية.',
      world: 'القنوات', worldItalic: 'العالمية.',
      ppv: 'PPV VIP', ppvItalic: 'قنوات الاتحاد الأوروبي.',
    },
    hero: { months: n => `${n} شهراً`, freeBonus: n => `+ ${n} أشهر مجاناً` },
    pricing: { quality: 'أعلى جودة', bestSeller: '★ الأكثر مبيعاً', testPack1: 'مثالي', testPack2: 'للتجربة ★', moShort: 'شهر', freeShort: 'مجاناً' },
    coverage: {
      badge: 'تغطية في جميع أنحاء هولندا',
      title: 'خدمة IPTV رقم 1 في هولندا',
      subtitle: 'من أمستردام إلى روتردام، ومن لاهاي إلى أوترخت — بث بوضوح تام على كل الشبكات الهولندية (KPN وZiggo وOdido وDelta). دعم باللغة الهولندية متاح على مدار الساعة.',
      contact: 'تواصل معنا', packages: 'اطّلع على الباقات',
      waText: 'مرحباً، أود معرفة المزيد عن TOP IPTV KAUFEN.',
    },
    payments: { bankWire: 'تحويل بنكي عادي', supportWaText: 'مرحبًا، أحتاج إلى مساعدة في إعداد اشتراك TOP IPTV KAUFEN الخاص بي.' },
    reviews: { count: 'تقييمات', verified: 'موثّق' },
    social: { follow: 'تابعنا', linkNotSet: 'الرابط غير مهيأ' },
  },
};

/** Copy for `lang`, falling back to English for a code the switcher never offers. */
export function getExtra(lang: LangCode): ExtraText {
  return (EXTRA as Partial<Record<LangCode, ExtraText>>)[lang] ?? EXTRA.en;
}
