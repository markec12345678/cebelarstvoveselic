export type Lang = 'sl' | 'en';

export interface TranslationStrings {
  nav: {
    home: string;
    story: string;
    products: string;
    process: string;
    testimonials: string;
    visit: string;
    faq: string;
    contact: string;
    order: string;
  };
  hero: {
    tagline: string;
    title: string;
    subtitle: string;
    cta: string;
    ctaSecondary: string;
    scrollHint: string;
  };
  about: {
    sectionTag: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
    stat4Value: string;
    stat4Label: string;
  };
  products: {
    sectionTag: string;
    title: string;
    subtitle: string;
    viewAll: string;
    fromPrice: string;
    perJar: string;
    addToCart: string;
    learnMore: string;
    items: Array<{
      name: string;
      nameEn: string;
      description: string;
      origin: string;
      taste: string;
      use: string;
      color: string;
      price: string;
      badge?: string;
    }>;
  };
  process: {
    sectionTag: string;
    title: string;
    subtitle: string;
    steps: Array<{
      title: string;
      description: string;
      detail: string;
      icon: string;
    }>;
  };
  testimonials: {
    sectionTag: string;
    title: string;
    subtitle: string;
    items: Array<{
      quote: string;
      name: string;
      location: string;
      type: string;
      rating: number;
    }>;
  };
  visit: {
    sectionTag: string;
    title: string;
    subtitle: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    cta: string;
    ctaSecondary: string;
    note: string;
  };
  faq: {
    sectionTag: string;
    title: string;
    subtitle: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  contact: {
    sectionTag: string;
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
    hoursDetail: string;
    mapAlt: string;
  };
  footer: {
    brandDesc: string;
    quickLinks: string;
    legal: string;
    contact: string;
    privacy: string;
    terms: string;
    cookies: string;
    rights: string;
    address: string;
    madeIn: string;
  };
  cookie: {
    title: string;
    description: string;
    accept: string;
    reject: string;
    settings: string;
    necessary: string;
    analytics: string;
    marketing: string;
    necessaryDesc: string;
    analyticsDesc: string;
    marketingDesc: string;
    save: string;
  };
  seasonal: {
    badge: string;
    message: string;
  };
  comparison: {
    sectionTag: string;
    title: string;
    subtitle: string;
    headers: {
      taste: string;
      color: string;
      origin: string;
      use: string;
      crystalSpeed: string;
      price: string;
    };
    sortLabels: {
      sortByTaste: string;
      sortByPrice: string;
      sortByColor: string;
      resetSort: string;
    };
    crystalSpeed: {
      slow: string;
      medium: string;
      fast: string;
    };
  };
  stats: {
    years: string;
    yearsLabel: string;
    hives: string;
    hivesLabel: string;
    varieties: string;
    varietiesLabel: string;
    organic: string;
    organicLabel: string;
    rating: string;
    ratingLabel: string;
    reviews: string;
    reviewsLabel: string;
  };
  promo: {
    spring: string;
    summer: string;
    autumn: string;
    winter: string;
    cta: string;
    dismiss: string;
  };
  gallery: {
    sectionTag: string;
    title: string;
    subtitle: string;
    imageOf: string;
    closeGallery: string;
    prev: string;
    next: string;
  };
  quality: {
    sectionTag: string;
    title: string;
    subtitle: string;
    pillars: Array<{
      title: string;
      description: string;
      details: string[];
    }>;
  };
  whatsapp: {
    tooltip: string;
  };
}

const translations: Record<Lang, TranslationStrings> = {
  sl: {
    nav: {
      home: 'Domov',
      story: 'Naša zgodba',
      products: 'Med',
      process: 'Postopek',
      testimonials: 'Izkušnje',
      visit: 'Obiščite nas',
      faq: 'Vprašanja',
      contact: 'Kontakt',
      order: 'Naročite',
    },
    hero: {
      tagline: 'Čebelarstvo Veselič — Bela krajina',
      title: 'Med iz srca Bele krajine',
      subtitle: 'Tri generacije čebelarjev. Sto panjev na čistih kraskih pašnikih. Vsak kozarec nosi pečat sonca, cvetja in rok, ki ga skrbno obdelujejo.',
      cta: 'Raziščite naše mede',
      ctaSecondary: 'Obiščite čebeljnjak',
      scrollHint: 'Odkrijte več',
    },
    about: {
      sectionTag: 'Naša zgodba',
      title: 'Od panja do vaše mize — z ljubeznijo do narave',
      paragraph1: 'Čebelarstvo Veselič iz Čurel pri Metliki thrives na treh generacijah znanja, prenesenega od očeta na sina. Jožef Veselič vzdržuje preko sto panjev, raztresenih po biodiverznih pašnikih Bele krajine — regije, znane po čistem zraku, neposkadnji kraski pokrajini in bogati cvetni raznolikosti, ki jo ponuja submediteransko podnebje na stiku z dinarskim svetom.',
      paragraph2: 'Naše čebele (Apis mellifera carnica, avtohtona slovenska čebela) pobirajo nektar na pašnikih, ki jih obdajajo bukovi gozdovi, kostanjevi sestoji, lipove aleje in divje cvetoče travnike. Ne uporabljamo antibiotikov pri zdravljenju čebel, ne dodajamo sladkorja med cvetenjem in ne toplimo medu nad 40 °C — tako ohranjamo vse naravne encime, antioksidante in aromatske spojine.',
      paragraph3: 'Naš med je certificiran po shemi Eko sklad, v skladu s predpisi EU o ekološkem kmetijstvu (Regula (EU) 2018/848) in označevanju živil (Regula (EU) 1169/2011). Vsak kozarec nosi številko lota, datum pakiranja in natančen geografski izvor.',
      stat1Value: '3',
      stat1Label: 'generacije tradicije',
      stat2Value: '100+',
      stat2Label: 'čebeljih panjev',
      stat3Value: '6',
      stat3Label: 'vrst medu',
      stat4Value: '100%',
      stat4Label: 'ekološko certificirano',
    },
    products: {
      sectionTag: 'Naš med',
      title: 'Šest sort medu, šest zgodb Bele krajine',
      subtitle: 'Vsaka vrsta medu odraža posebnost lokalnega cvetja in letnega časa. Izbirate lahko med akacijevim, lipovim, kostanjevim, mešanim medom cvetličnih pašnikov, gozdnim medom in medom brstov smreke.',
      viewAll: 'Vsi izdelki',
      fromPrice: 'od',
      perJar: '/ 450 g',
      addToCart: 'V košarico',
      learnMore: 'Več o sorti',
      items: [
        {
          name: 'Akacijev med',
          nameEn: 'Acacia Honey',
          description: 'Svetlo zlaten rumen, kristalizira se izredno počasi. Blage, cvetlične arome z milko vanilije. Idealen za sladkanje čajev, jaščeve jedi in sadne solate. Cvetoče območje: akacije v dolini reke Kolpe.',
          origin: 'Dolina reke Kolpe',
          taste: 'Mehko cvetličen, sladek z milkom vanilije',
          use: 'Čaj, jaščeve jedi, sadne solate',
          color: 'Svetlo zlaten',
          price: '9,80 €',
          badge: 'Najbolj prodajan',
        },
        {
          name: 'Lipov med',
          nameEn: 'Linden Honey',
          description: 'Zlato rumen s karakterističnim žlahtnim lipovim vonjem. Znana po blažilnih lastnostih za prehlad. Črpa nektar s starih lip ob poteh Bele krajine. Primerna za zimske čaje in sladice.',
          origin: 'Lipove aleje, Metlika',
          taste: 'Žlahten, mentolno-cvetličen okus',
          use: 'Zimski čaj, medene slaščice, topljenje',
          color: 'Zlato rumen',
          price: '10,50 €',
        },
        {
          name: 'Kostanjev med',
          nameEn: 'Chestnut Honey',
          description: 'Temno jantarni med z močnim, rahlo grenkastim okusom in bogato arozo kostanjevega gozda. Bogat z minerali in antioksidanti. Odličen za marinade, sirne krožnike in kulinarične eksperimente.',
          origin: 'Kostanjevi gozdovi, Semič',
          taste: 'Močan, rahlo grenkast, hlajajoč',
          use: 'Marinade, siri, kulinarične jedi',
          color: 'Temno jantarni',
          price: '11,90 €',
          badge: 'Bogat z minerali',
        },
        {
          name: 'Cvetlični med',
          nameEn: 'Wildflower Honey',
          description: 'Mešanica nektarja različnih divjih cvetov, ki cvetejo na kraskih pašnikih — robide, cvetlice, detelja, kamilica. Vsak kozarec je edinstven glede na letni čas in lokacijo panja. Poln okus z dolgotrajnim cvetličnim aftertasteom.',
          origin: 'Pašniki Bele krajine',
          taste: 'Poln cvetličen okus, bogata tekstura',
          use: 'Univerzalna uporaba, peka, namazi',
          color: 'Zlato do jantarni',
          price: '8,90 €',
        },
        {
          name: 'Gozdni med',
          nameEn: 'Forest Honey',
          description: 'Med, pridobljen iz medne rose (honeydew) listnih dreves — bukve, hrasta in jelke. Temen, gost in posebno bogat z encimi in minerali. Tradicionalno uporabljan za krepitev imunosti. Ima rahlo sladkano, lesno aromo.',
          origin: 'Bukovi in jelovi gozdovi, Bela krajina',
          taste: 'Lesna aromo, malce sladkana, gost',
          use: 'Imunost, peka črnega kruha, zdravilni namazi',
          color: 'Temno rjava do črna',
          price: '12,50 €',
          badge: 'Premium',
        },
        {
          name: 'Med brstov smreke',
          nameEn: 'Fir Honeydew Honey',
          description: 'Redka in iskana sorta, pridobljena iz brstov smreke v višjih legah Bele krajine. Zelo temen, z značilnim smolnatim okusom smreke. Izjemno bogat z antioksidanti in encimi. Skupina strokovnjakov ga uvršča med vrhunske mede v Sloveniji.',
          origin: 'Smrekovi gozdovi, Gorjanci',
          taste: 'Smolnat, karakterističen okus smreke',
          use: 'Zdravilne namaze, čaj, gourmet kuhanje',
          color: 'Zelo temen, skoraj črn',
          price: '14,90 €',
          badge: 'Redkost',
        },
      ],
    },
    process: {
      sectionTag: 'Naš postopek',
      title: 'Od cveta do kozarca — pot medu',
      subtitle: 'Vsak korak sledi ritmu narave. Brez pospeševanja, brez kompromisov. Naš postopek ohranja vse, kar med naredi živ — encime, arome, barve in zdravilne lastnosti.',
      steps: [
        {
          title: 'Postavitev panjev na pašnike',
          description: 'Panje postavljamo na skrbno izbrane lokacije po Beli krajini — od rečnih dolin Kolpe do strmih gozdnih pobočij Gorjancev. Vsaka lokacija ponuja drugačen cvetni profil.',
          detail: 'Izbira lokacije poteka na podlagi analize cvetnega koledarja, vremenskih napovedi in zgodovinskih podatkov o prinosih. Poskrbimo za minimalno oddaljenost med panji (2+ km od drugih čebelarjev) za zagotovitev pristnosti nektarja.',
          icon: 'map-pin',
        },
        {
          title: 'Nadzor in skrb za čebele',
          description: 'Redno pregledujemo panje, sledimo zdravju čebeljih družin in interveniramo le naravne metode — brez antibiotikov in kemikalij. Uporabljamo integrirano zaščito z maščobnimi kislinami in TIM obdelavo.',
          detail: 'Sledimo smernicam veterinarske službe RS in uporabljamo samo odobrena sredstva za varstvo čebel (oznake: CHS, ekološko). Vsa zdravljenja dokumentiramo v čebeljarskem dnevniku.',
          icon: 'heart-pulse',
        },
        {
          title: 'Medenje in izločanje medu',
          description: 'Ko so sati zapečateni in med zrel, skrbno odstranimo pokrovke in v centrigugi izločimo med pri temperaturi, ki ne preseže 38 °C — da ohranimo vse naravne encime.',
          detail: 'Merimo vlažnost medu (cilj < 18 %) z refraktometrom. Vsak panj pridobiva lastno številko za sledljivost. Med se takoj prefiltrira skozi jedilni filter in shranjuje v nerjaveče posode.',
          icon: 'droplets',
        },
        {
          title: 'Zorenje in stekleničenje',
          description: 'Med dozori v temperaturno kontroliranih prostorih najmanj 2 tedna. Nato ga ročno stekleničimo, označimo z datumom, lot številko in geografskim izvorom.',
          detail: 'Stekleničenje poteka v certificiranem prostoru v skladu s HACCP načeli. Vsak kozarec nosi etiketo s podrobnostmi: vrsta medu, neto količina, datum najboljše uporabe, številka Eko sklad certifikata, kontaktni podatki.',
          icon: 'package',
        },
        {
          title: 'Dostava in sledljivost',
          description: 'Med dostavljamo v reciklirani embalaži — po Sloveniji v 1–3 delovnih dneh, v EU v 5–7 dneh. Vsaka pošiljka vsebuje certifikat pristnosti in sledljivost do panja.',
          detail: 'Sledljivost zagotavljamo z QR kodo na etiketi, ki vodi do strani s podrobnostmi o panju, lokaciji pašnika, datumu medenja in analizah kakovosti (HMF, vlažnost, diastazna aktivnost).',
          icon: 'truck',
        },
      ],
    },
    testimonials: {
      sectionTag: 'Izkušnje strank',
      title: 'Kaj pravijo tisti, ki nam zaupajo',
      subtitle: 'Resnične izkušnje strank, ki so preizkusili naš med — od lokalnih prebivalcev Bele krajine do kupcev iz vse Slovenije in tujine.',
      items: [
        {
          quote: 'Ko sem prvič poskusil gozdni med Veselič, sem takoj poznal razliko. Ta med ni samo sladek — ima globino, teksturo, zgodbo. Vsak znak na etiketi pokaže, da ljudje resnično skrbijo za svoj izdelek.',
          name: 'Maja K.',
          location: 'Ljubljana',
          type: 'Dolgoletna stranka',
          rating: 5,
        },
        {
          quote: 'Zakon! Med brstov smreke je nekaj posebnega — okus je tako intenziven in avtentičen, da ga ne morete primerjati z ničimer iz trgovine. Uporabljam ga vsak dan v čaju.',
          name: 'Peter S.',
          location: 'Maribor',
          type: 'Kupec na spletu',
          rating: 5,
        },
        {
          quote: 'Obiskali smo čebelnjak Veselič z otroki — to je bila izjemna izkušnja. Jožef nam je vse pojasnil na način, razumljivem tudi za otroke. Otroci so bili navdušeni nad opazovanjem čebel.',
          name: 'Ana in Marko P.',
          location: 'Črnomelj',
          type: 'Obiskovalci domačije',
          rating: 5,
        },
        {
          quote: 'Kot kuhar uporabljam kostanjev med Veselič za marinade in sladice — gostota in okusna kompleksnost sta nekaj drugega. Priporočam ga vsem, ki iščejo med s karakterjem.',
          name: 'Luka M.',
          location: 'Koper',
          type: 'Profesionalni kuhar',
          rating: 5,
        },
        {
          quote: 'Naročam med za vso družino — od akacijevega za otroke do gozdnega za dedka. Embalaža je vedno brezhibna, dostava hitra, kakovost pa vsakič znova navdušujoča.',
          name: 'Nina B.',
          location: 'Novo mesto',
          type: 'Družinska stranka',
          rating: 5,
        },
      ],
    },
    visit: {
      sectionTag: 'Obiščite nas',
      title: 'Dobrodošli na naši čebelarski domačiji v Čurelah',
      subtitle: 'Izkusite čebelarstvo na prvi roki. Ogled panjev, degustacija vseh šestih sort medu, ogled čebelarske zbirke in tradicionalna belokranjska slovnost — vse na enem mestu.',
      feature1Title: 'Vodeni ogled čebeljaka',
      feature1Desc: 'Jožef Vas osebno popelje skozi čebeljnjak — od občutka dela čebel v panju do razlage naravnih procesov medenja. Varnostna oprema je priskrbljena. Trajanje: 60–90 minut.',
      feature2Title: 'Degustacija medu',
      feature2Desc: 'Okusite vseh šest sort medu z mlekom, orehi in tradicionalnimi belokranjskimi jedmi. Naučite se prepoznati razlike med sortami in odkriti svojo priljubljeno.',
      feature3Title: 'Dogodki za skupine',
      feature3Desc: 'Organiziramo obiske za šole, podjetja in turistične skupine. Na voljo so tudi delavnice izdelave sveč iz čebeljega voska in ustvarjalne delavnice za otroke.',
      cta: 'Rezervirajte obisk',
      ctaSecondary: 'Pokličite nas',
      note: 'Obiski na rezervacijo (najmanj 2 dni vnaprej) od aprila do septembra. Primeren za vse starosti.',
    },
    faq: {
      sectionTag: 'Pogosta vprašanja',
      title: 'Vse, kar vas zanima o našem medu',
      subtitle: 'Od načina pridelave do shranjevanja in dostave — odgovorili smo na najpogostejša vprašanja. Ne najdete odgovora? Kontaktirajte nas.',
      items: [
        {
          question: 'Ali je vaš med res 100 % ekološki?',
          answer: 'Da. Naš med je certificiran po shemi Eko sklad v skladu z EU uredbami o ekološkem kmetijstvu (EU) 2018/848. To pomeni: brez sintetičnih kemikalij, brez antibiotikov, brez dodanega sladkorja, brez segrevanja nad 40 °C. Certifikat je na voljo na zahtevo in na vsaki etiketi.',
        },
        {
          question: 'Kakšna je razlika med posameznimi vrstami medu?',
          answer: 'Vsaka vrsta izhaja iz različnega cvetnega vira: akacijev (akacije, blag okus, počasi kristalizira), lipov (lipa, žlahtna aroma), kostanjev (kostanj, močan okus, bogat z minerali), cvetlični (mešanica divjih cvetov), gozdni (medna rosa dreves, temen, encimski bogat) in med brstov smreke (smreka, redkost, zelo temen). Vsaka ima svoj okusni profil, barvo in uporabno vrednost.',
        },
        {
          question: 'Zakaj se med kristalizira in ali je to znak slabe kakovosti?',
          answer: 'Kristalizacija je naraven proces, ki potrjuje pristnost medu. Kristalizirani med ni slab — je pristen. Različne vrste kristalizirajo z različno hitrostjo: akacijev počasi, cvetlični zmerno, kostanjev hitreje. Če želite medu vrniti tekoče stanje, ga postavite v vodno kopel pri največ 40 °C — nikoli v mikrovalovno pečico.',
        },
        {
          question: 'Kako shranjujem med?',
          answer: 'Med shranjujte na sobni temperaturi (15–25 °C), stran od neposredne sončne svetlobe in vlage. Naših kozarcev ni treba hladiti. Pravilno shranjen med ima neomejen rok uporabe — vendar zaradi predpisov EU označujemo datum najboljše uporabe (običajno 2 leti od pakiranja).',
        },
        {
          question: 'Ali je med primeren za otroke?',
          answer: 'Med ni primeren za dojenčke mlajše od 12 mesecev zaradi tveganja botulizma. Za otroke, starejše od 1 leta, je med varen in zdrav. Naš akacijev med je najbolj priljubljen med otroci zaradi blagega okusa in počasne kristalizacije.',
        },
        {
          question: 'Kako poteka dostava?',
          answer: 'Po Sloveniji dostavljamo s Pošto Slovenije v 1–3 delovnih dneh (brezplačna dostava nad 35 €). V EU dostavljamo v 5–7 delovnih dneh (cena glede na državo). Vsa embalaža je reciklirana in zaščitena za transport. Vsaka pošiljka vsebuje certifikat pristnosti.',
        },
        {
          question: 'Ali organizirate obiske čebeljaka za skupine?',
          answer: 'Da. Organiziramo vodene obiske za posameznike, družine, šole in podjetja. Ogled vključuje sprehod med panji, opazovanje čebel (s varnostno opremo), degustacijo vseh sort medu in predstavitev čebelarskih tradicij. Obiski na rezervacijo, najmanj 2 dni vnaprej, od aprila do septembra.',
        },
        {
          question: 'Kakšna je vaša politika vračanja?',
          answer: 'Če niste zadovoljni z izdelkom, nam ga lahko vrnete v 14 dneh od prejema (neodprt kozarec). Poškodovane pošiljke javite v 48 urah — brezplačno zamenjamo. Vračilo poteka v skladu z zakonom o varstvu potrošnikov (ZVPot).',
        },
        {
          question: 'Ali ponujate med v večjih količinah ali podarilni sete?',
          answer: 'Da. Ponujamo družinske sete (3 ali 6 sort), podarilne košarice in veleprodajne količine za podjetja in gostinske objekte. Za naročila nad 50 kozarcev se obrnite na nas za specialno ponudbo.',
        },
        {
          question: 'Kako dosežete sledljivost do panja?',
          answer: 'Vsaka pošiljka vsebuje QR kodo, ki vodi na stran s podrobnostmi: lokacija panja (GPS koordinate), datum medenja, analize kakovosti (HMF, diastaza, vlažnost) in podatki o cvetnem viru. Sledljivost je del našega standarda kakovosti in Eko sklad certifikata.',
        },
        {
          question: 'Katero vrsto medu priporočate za začetnike?',
          answer: 'Za tiste, ki še ne poznate sveta medu, priporočamo akacijev med zaradi blagega, univerzalnega okusa. Za tiste, ki želite nekaj posebnega, poskusite med brstov smreke — edinstvena sorta, ki jo redko najdete pri drugih pridelovalcih.',
        },
      ],
    },
    contact: {
      sectionTag: 'Kontakt',
      title: 'Stopite v stik z nami',
      subtitle: 'Imate vprašanje, želite naročiti med ali rezervirati obisk? Pišite nam ali pokličite — odgovorimo v 24 urah.',
      nameLabel: 'Ime in priimek',
      namePlaceholder: 'npr. Jože Novak',
      emailLabel: 'Elektronska pošta',
      emailPlaceholder: 'npr. joze@email.si',
      subjectLabel: 'Zadeva',
      subjectPlaceholder: 'Npr. Naročilo medu, obisk čebeljaka, vprašanje',
      messageLabel: 'Sporočilo',
      messagePlaceholder: 'Opišite, kako vam lahko pomagamo ...',
      submit: 'Pošljite sporočilo',
      submitting: 'Pošiljam ...',
      success: 'Hvala! Vaše sporočilo smo prejeli. Odgovorili vam bomo v 24 urah.',
      error: 'Prišlo je do napake. Poskusite znova ali nas pokličite direktno.',
      address: 'Čebelarstvo Veselič, Jožef Veselič\nČurile 4a\n8330 Metlika, Bela krajina\nSlovenija',
      phone: '+386 41 234 567',
      email: 'info@cebelarstvo-veselic.si',
      hours: 'Otvoreni čas',
      hoursDetail: 'Pon–Pet: 8:00–17:00\nSob: 9:00–13:00\nNed: Zaprto\nObiski: po dogovoru',
      mapAlt: 'Lokacija čebelarstva Veselič v Čurelah pri Metliki',
    },
    footer: {
      brandDesc: 'Čebelarstvo Veselič — tri generacije čebelarjev iz Bele krajine. Ekološko certificiran med, pridobljen s srcem in znanjem, iz čistih kraskih pašnikov.',
      quickLinks: 'Hitri povezavi',
      legal: 'Pravne informacije',
      contact: 'Kontakt',
      privacy: 'Politika zasebnosti',
      terms: 'Splošni pogoji',
      cookies: 'Politika piškotkov',
      rights: 'Vse pravice pridržane.',
      address: 'Čebelarstvo Veselič, Čurile 4a, 8330 Metlika',
      madeIn: 'Z made in Bela krajina 🍯',
    },
    cookie: {
      title: 'Piškotki',
      description: 'Uporabljamo piškotke za izboljšanje vaše izkušnje, analitiko obiska in marketinške namene. Lahko izberete, katere kategorije želite omogočiti.',
      accept: 'Sprejmi vse',
      reject: 'Zavrni vse',
      settings: 'Nastavitve',
      necessary: 'Nujni',
      analytics: 'Analitični',
      marketing: 'Marketinški',
      necessaryDesc: 'Ti piškotki so nujni za delovanje spletne strani. Ne morejo biti izključeni.',
      analyticsDesc: 'Piškotki za anonimno analitiko obiska (Google Analytics 4). Pomagajo nam razumeti, kako uporabljate stran.',
      marketingDesc: 'Piškotki za oglaševalske namene (Facebook Pixel, Google Ads). Uporabljamo jih za merjenje učinkovitosti oglasov.',
      save: 'Shrani nastavitve',
    },
    seasonal: {
      badge: 'Sezonska razpoložljivost',
      message: 'Nekatere sorte so zaradi vremenskih razmer trenutno omejene. Kontaktirajte nas za trenutno razpoložljivost.',
    },
    comparison: {
      sectionTag: 'Primerjava sort',
      title: 'Kateri med je pravi za vas?',
      subtitle: 'Primerjajte vse šest sort medu po okusu, barvi, izvoru, uporabi in hitrosti kristalizacije. Najdite svoj idealni med.',
      headers: {
        taste: 'Okus',
        color: 'Barva',
        origin: 'Izvor',
        use: 'Uporaba',
        crystalSpeed: 'Kristalizacija',
        price: 'Cena',
      },
      sortLabels: {
        sortByTaste: 'Po sladkosti',
        sortByPrice: 'Po ceni',
        sortByColor: 'Po temnosti',
        resetSort: 'Privzeto',
      },
      crystalSpeed: {
        slow: 'Počasi',
        medium: 'Zmerno',
        fast: 'Hitro',
      },
    },
    stats: {
      years: '30',
      yearsLabel: 'let izkušenj',
      hives: '100',
      hivesLabel: 'čebeljih panjev',
      varieties: '6',
      varietiesLabel: 'vrst medu',
      organic: '100',
      organicLabel: '% ekološko',
      rating: '4.9',
      ratingLabel: 'povprečna ocena',
      reviews: '127',
      reviewsLabel: 'odgovorov strank',
    },
    promo: {
      spring: 'Pomladno čiščenje s čebeljim medom',
      summer: 'Poletna sezona obiskov čebeljaka!',
      autumn: 'Jesenski med brstov smreke je prispel!',
      winter: 'Božično podarilno pakiranje medu',
      cta: 'Razišči',
      dismiss: 'Zapri',
    },
    gallery: {
      sectionTag: 'Galerija',
      title: 'Tako izgleda naš čebeljarski svet',
      subtitle: 'Uživajte v pogledu na naš čebeljnjak, mede in čebelarsko domačijo v Beli krajini.',
      imageOf: 'Slika {current} od {total}',
      closeGallery: 'Zapri galerijo',
      prev: 'Prejšnja',
      next: 'Naslednja',
    },
    quality: {
      sectionTag: 'Kakovost',
      title: 'Zakaj je naš med drugačen',
      subtitle: 'Tri temelji naše kakovosti, ki ločijo naš med od vseh ostalih.',
      pillars: [
        {
          title: 'Surov in nepredelaven',
          description: 'Nikoli ne toplimo medu nad 40 °C. Ohranjamo vse naravne encime, antioksidante in arome — tako, kot jih je ustvarila narava.',
          details: ['Brez segrevanja nad 40 °C', 'Ohranjeni vsi naravni encimi', 'Brez dodanih sladkorjev ali konzervansov'],
        },
        {
          title: 'Certificiran ekološko',
          description: 'Naš med je certificiran po shemi Eko Sklad v skladu z EU uredbami o ekološkem kmetijstvu (EU) 2018/848.',
          details: ['Eko Sklad certifikat', 'EU regulativa (EU) 2018/848', 'Redna letna preverjanja kakovosti'],
        },
        {
          title: 'Eno izvorno poreklo',
          description: 'Ves med izhaja iz čistih kraskih pašnikov Bele krajine — regije s submediteranskim podnebjem in edinstveno cvetno raznolikostjo.',
          details: ['Bela krajina — Slovenija', 'Submediteransko podnebje', 'GPS sledljivost do panja'],
        },
      ],
    },
    whatsapp: {
      tooltip: 'Pišite nam na WhatsApp — odgovorimo v roku 1 ure',
    },
  },
  en: {
    nav: {
      home: 'Home',
      story: 'Our Story',
      products: 'Honey',
      process: 'Process',
      testimonials: 'Experiences',
      visit: 'Visit Us',
      faq: 'FAQ',
      contact: 'Contact',
      order: 'Order Now',
    },
    hero: {
      tagline: 'Čebelarstvo Veselič — Bela Krajina, Slovenia',
      title: 'Honey from the Heart of Bela Krajina',
      subtitle: 'Three generations of beekeepers. A hundred hives on pristine karst pastures. Every jar carries the seal of sunlight, wildflowers, and hands that tend them with care.',
      cta: 'Explore Our Honey',
      ctaSecondary: 'Visit the Apiary',
      scrollHint: 'Discover more',
    },
    about: {
      sectionTag: 'Our Story',
      title: 'From Hive to Your Table — Rooted in Love for Nature',
      paragraph1: 'Čebelarstvo Veselič from Čurile near Metlika thrives on three generations of knowledge, passed from father to son. Jožef Veselič tends over a hundred hives spread across the biodiverse pastures of Bela Krajina — a region renowned for its clean air, unspoiled karst landscape, and rich floral diversity nurtured by the sub-Mediterranean climate at the crossroads of the Dinaric world.',
      paragraph2: 'Our bees (Apis mellifera carnica, the native Slovenian honey bee) forage on pastures framed by beech forests, chestnut groves, linden avenues, and wildflower meadows. We use no antibiotics in bee treatment, add no sugar during the bloom, and never heat honey above 40 °C — preserving all natural enzymes, antioxidants, and aromatic compounds.',
      paragraph3: 'Our honey is certified under the Eko Sklad scheme, in compliance with EU organic farming regulations (Regulation (EU) 2018/848) and food labelling rules (Regulation (EU) 1169/2011). Every jar carries a lot number, packing date, and precise geographical origin.',
      stat1Value: '3',
      stat1Label: 'Generations of tradition',
      stat2Value: '100+',
      stat2Label: 'Beehives',
      stat3Value: '6',
      stat3Label: 'Honey varieties',
      stat4Value: '100%',
      stat4Label: 'Organic certified',
    },
    products: {
      sectionTag: 'Our Honey',
      title: 'Six Varieties, Six Stories of Bela Krajina',
      subtitle: 'Each honey variety reflects the uniqueness of local flora and the rhythm of the seasons. Choose from acacia, linden, chestnut, wildflower, forest, and fir honeydew honey.',
      viewAll: 'All Products',
      fromPrice: 'from',
      perJar: '/ 450 g',
      addToCart: 'Add to Cart',
      learnMore: 'Learn More',
      items: [
        {
          name: 'Acacia Honey',
          nameEn: 'Acacia Honey',
          description: 'Light golden yellow, crystallises extremely slowly. Delicate floral aroma with a hint of vanilla. Ideal for sweetening teas, dairy dishes, and fruit salads. Foraging area: acacia trees along the Kolpa River valley.',
          origin: 'Kolpa River Valley',
          taste: 'Delicate floral, sweet with vanilla hint',
          use: 'Tea, dairy dishes, fruit salads',
          color: 'Light golden',
          price: '€9.80',
          badge: 'Best Seller',
        },
        {
          name: 'Linden Honey',
          nameEn: 'Linden Honey',
          description: 'Golden yellow with the characteristic noble linden fragrance. Known for its soothing properties against colds. Sourced from ancient linden trees along the paths of Bela Krajina. Perfect for winter teas and desserts.',
          origin: 'Linden Avenues, Metlika',
          taste: 'Noble, slightly minty-floral',
          use: 'Winter tea, honey sweets, drizzling',
          color: 'Golden yellow',
          price: '€10.50',
        },
        {
          name: 'Chestnut Honey',
          nameEn: 'Chestnut Honey',
          description: 'Dark amber honey with a strong, slightly bitter taste and the rich aroma of chestnut forests. Rich in minerals and antioxidants. Excellent for marinades, cheese platters, and culinary experiments.',
          origin: 'Chestnut Forests, Semič',
          taste: 'Strong, slightly bitter, cooling',
          use: 'Marinades, cheeses, culinary dishes',
          color: 'Dark amber',
          price: '€11.90',
          badge: 'Mineral-Rich',
        },
        {
          name: 'Wildflower Honey',
          nameEn: 'Wildflower Honey',
          description: 'A blend of nectar from various wildflowers blooming on karst pastures — blackberries, cornflowers, clover, chamomile. Every jar is unique depending on the season and hive location. Full flavour with a lasting floral aftertaste.',
          origin: 'Bela Krajina Pastures',
          taste: 'Full floral flavour, rich texture',
          use: 'Versatile use, baking, spreads',
          color: 'Golden to amber',
          price: '€8.90',
        },
        {
          name: 'Forest Honey',
          nameEn: 'Forest Honey',
          description: 'Honey obtained from honeydew of broadleaf trees — beech, oak, and fir. Dark, dense, and exceptionally rich in enzymes and minerals. Traditionally used to boost immunity. Has a mildly sweet, woody aroma.',
          origin: 'Beech & Fir Forests, Bela Krajina',
          taste: 'Woody aroma, mildly sweet, dense',
          use: 'Immunity, black bread baking, healing spreads',
          color: 'Dark brown to black',
          price: '€12.50',
          badge: 'Premium',
        },
        {
          name: 'Fir Honeydew Honey',
          nameEn: 'Fir Honeydew Honey',
          description: 'A rare and sought-after variety, harvested from fir buds in the higher elevations of Bela Krajina. Very dark, with a characteristic resinous spruce flavour. Exceptionally rich in antioxidants and enzymes. Experts rank it among Slovenia\'s finest honeys.',
          origin: 'Spruce Forests, Gorjanci',
          taste: 'Resinous, characteristic spruce flavour',
          use: 'Healing spreads, tea, gourmet cooking',
          color: 'Very dark, almost black',
          price: '€14.90',
          badge: 'Rare Find',
        },
      ],
    },
    process: {
      sectionTag: 'Our Process',
      title: 'From Flower to Jar — The Journey of Honey',
      subtitle: 'Every step follows the rhythm of nature. No shortcuts, no compromises. Our process preserves everything that makes honey alive — enzymes, aromas, colours, and healing properties.',
      steps: [
        {
          title: 'Placing Hives on Pastures',
          description: 'We position hives on carefully selected locations throughout Bela Krajina — from the river valleys of Kolpa to the steep forest slopes of Gorjanci. Each location offers a different floral profile.',
          detail: 'Site selection is based on floral calendar analysis, weather forecasts, and historical yield data. We ensure minimal proximity to other beekeepers (2+ km) to guarantee nectar authenticity.',
          icon: 'map-pin',
        },
        {
          title: 'Hive Monitoring & Bee Care',
          description: 'We regularly inspect hives, monitor colony health, and intervene only with natural methods — no antibiotics or chemicals. We use integrated pest management with organic acids and formic acid treatment.',
          detail: 'We follow the guidelines of the Slovenian Veterinary Administration and use only approved bee protection products. All treatments are documented in the beekeeping logbook.',
          icon: 'heart-pulse',
        },
        {
          title: 'Harvesting & Extraction',
          description: 'When frames are capped and honey is ripe, we carefully remove cappings and extract honey in an extractor at temperatures not exceeding 38 °C — preserving all natural enzymes.',
          detail: 'We measure honey moisture (target < 18%) with a refractometer. Each hive receives its own tracking number for full traceability. Honey is immediately filtered through a food-grade filter and stored in stainless steel containers.',
          icon: 'droplets',
        },
        {
          title: 'Maturation & Bottling',
          description: 'Honey matures in temperature-controlled rooms for at least 2 weeks. We then hand-bottle each jar, labelling it with the date, lot number, and geographical origin.',
          detail: 'Bottling takes place in a certified facility following HACCP principles. Each jar carries a label with details: honey type, net weight, best-before date, Eko Sklad certificate number, and contact information.',
          icon: 'package',
        },
        {
          title: 'Delivery & Traceability',
          description: 'We deliver honey in recyclable packaging — within Slovenia in 1–3 business days, in the EU in 5–7 days. Every shipment includes a certificate of authenticity and traceability to the hive.',
          detail: 'Traceability is ensured through a QR code on each label, linking to a page with hive details, pasture location, harvest date, and quality analyses (HMF, moisture, diastase activity).',
          icon: 'truck',
        },
      ],
    },
    testimonials: {
      sectionTag: 'Customer Experiences',
      title: 'What Those Who Trust Us Say',
      subtitle: 'Real experiences from customers who have tried our honey — from local residents of Bela Krajina to buyers from across Slovenia and abroad.',
      items: [
        {
          quote: 'When I first tasted Veselič\'s forest honey, I immediately noticed the difference. This honey isn\'t just sweet — it has depth, texture, a story. Every detail on the label shows that people truly care about their product.',
          name: 'Maja K.',
          location: 'Ljubljana',
          type: 'Long-term Customer',
          rating: 5,
        },
        {
          quote: 'The fir honeydew honey is something special — the flavour is so intense and authentic that you can\'t compare it to anything from a supermarket. I use it every day in my tea.',
          name: 'Peter S.',
          location: 'Maribor',
          type: 'Online Buyer',
          rating: 5,
        },
        {
          quote: 'We visited the Veselič apiary with our children — it was an incredible experience. Jožef explained everything in a way that even children could understand. The kids were fascinated watching the bees.',
          name: 'Ana & Marko P.',
          location: 'Črnomelj',
          type: 'Farm Visitors',
          rating: 5,
        },
        {
          quote: 'As a chef, I use Veselič\'s chestnut honey for marinades and desserts — the density and flavour complexity are something else. I recommend it to anyone looking for honey with character.',
          name: 'Luka M.',
          location: 'Koper',
          type: 'Professional Chef',
          rating: 5,
        },
        {
          quote: 'I order honey for the whole family — from acacia for the kids to forest honey for grandpa. The packaging is always flawless, delivery fast, and the quality impresses me every single time.',
          name: 'Nina B.',
          location: 'Novo mesto',
          type: 'Family Customer',
          rating: 5,
        },
      ],
    },
    visit: {
      sectionTag: 'Visit Us',
      title: 'Welcome to Our Beekeeping Farm in Čurile',
      subtitle: 'Experience beekeeping firsthand. Hive tours, tasting of all six honey varieties, a beekeeping collection display, and traditional Bela Krajina hospitality — all in one place.',
      feature1Title: 'Guided Apiary Tour',
      feature1Desc: 'Jožef personally guides you through the apiary — from feeling the bees\' work inside the hive to explaining the natural processes of honey production. Safety equipment is provided. Duration: 60–90 minutes.',
      feature2Title: 'Honey Tasting',
      feature2Desc: 'Taste all six honey varieties paired with milk, walnuts, and traditional Bela Krajina dishes. Learn to recognise differences between varieties and discover your favourite.',
      feature3Title: 'Group Events',
      feature3Desc: 'We organise visits for schools, companies, and tourist groups. Beeswax candle-making workshops and creative workshops for children are also available.',
      cta: 'Book a Visit',
      ctaSecondary: 'Call Us',
      note: 'Visits by appointment (at least 2 days in advance) from April to September. Suitable for all ages.',
    },
    faq: {
      sectionTag: 'Frequently Asked Questions',
      title: 'Everything You Want to Know About Our Honey',
      subtitle: 'From production methods to storage and delivery — we\'ve answered the most common questions. Can\'t find what you\'re looking for? Contact us.',
      items: [
        {
          question: 'Is your honey truly 100% organic?',
          answer: 'Yes. Our honey is certified under the Eko Sklad scheme in compliance with EU organic farming regulations (EU) 2018/848. This means: no synthetic chemicals, no antibiotics, no added sugar, no heating above 40 °C. The certificate is available on request and on every label.',
        },
        {
          question: 'What is the difference between your honey varieties?',
          answer: 'Each variety comes from a different floral source: acacia (acacia trees, mild taste, crystallises slowly), linden (linden trees, noble aroma), chestnut (chestnut, strong taste, mineral-rich), wildflower (wildflower blend), forest (tree honeydew, dark, enzyme-rich), and fir honeydew (spruce buds, rare, very dark). Each has its own flavour profile, colour, and culinary value.',
        },
        {
          question: 'Why does honey crystallise and is this a sign of poor quality?',
          answer: 'Crystallisation is a natural process that confirms honey authenticity. Crystallised honey is not bad — it\'s genuine. Different varieties crystallise at different rates: acacia slowly, wildflower moderately, chestnut quickly. To return honey to liquid form, place it in a warm water bath at max 40 °C — never in a microwave.',
        },
        {
          question: 'How should I store honey?',
          answer: 'Store honey at room temperature (15–25 °C), away from direct sunlight and moisture. Our jars do not need refrigeration. Properly stored honey has an unlimited shelf life — however, EU regulations require us to label a best-before date (typically 2 years from packing).',
        },
        {
          question: 'Is honey safe for children?',
          answer: 'Honey is not suitable for infants under 12 months due to botulism risk. For children over 1 year, honey is safe and healthy. Our acacia honey is the most popular among children due to its mild taste and slow crystallisation.',
        },
        {
          question: 'How does delivery work?',
          answer: 'We deliver within Slovenia via Pošta Slovenije in 1–3 business days (free delivery over €35). EU delivery in 5–7 business days (price varies by country). All packaging is recycled and transport-protected. Every shipment includes a certificate of authenticity.',
        },
        {
          question: 'Do you organise group apiary visits?',
          answer: 'Yes. We organise guided visits for individuals, families, schools, and companies. The tour includes a walk among the hives, bee observation (with safety equipment), tasting of all honey varieties, and a presentation of beekeeping traditions. Visits by appointment, at least 2 days in advance, from April to September.',
        },
        {
          question: 'What is your return policy?',
          answer: 'If you are not satisfied with the product, you may return it within 14 days of receipt (unopened jar). Report damaged shipments within 48 hours — we replace them free of charge. Returns are processed in accordance with the Consumer Protection Act.',
        },
        {
          question: 'Do you offer honey in larger quantities or gift sets?',
          answer: 'Yes. We offer family sets (3 or 6 varieties), gift baskets, and wholesale quantities for businesses and hospitality venues. For orders over 50 jars, contact us for a special offer.',
        },
        {
          question: 'How do you achieve traceability to the hive?',
          answer: 'Every shipment includes a QR code linking to a page with details: hive location (GPS coordinates), harvest date, quality analyses (HMF, diastase, moisture), and floral source data. Traceability is part of our quality standard and Eko Sklad certification.',
        },
        {
          question: 'Which honey variety do you recommend for beginners?',
          answer: 'For those new to the world of honey, we recommend acacia honey for its mild, universal flavour. For something special, try the fir honeydew honey — a unique variety rarely found with other producers.',
        },
      ],
    },
    contact: {
      sectionTag: 'Contact',
      title: 'Get in Touch with Us',
      subtitle: 'Have a question, want to order honey, or book a visit? Write to us or call — we respond within 24 hours.',
      nameLabel: 'Full Name',
      namePlaceholder: 'e.g. Jože Novak',
      emailLabel: 'Email Address',
      emailPlaceholder: 'e.g. joze@email.si',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'e.g. Honey order, apiary visit, question',
      messageLabel: 'Message',
      messagePlaceholder: 'Describe how we can help you ...',
      submit: 'Send Message',
      submitting: 'Sending ...',
      success: 'Thank you! We received your message. We will respond within 24 hours.',
      error: 'Something went wrong. Please try again or call us directly.',
      address: 'Čebelarstvo Veselič, Jožef Veselič\nČurile 4a\n8330 Metlika, Bela Krajina\nSlovenia',
      phone: '+386 41 234 567',
      email: 'info@cebelarstvo-veselic.si',
      hours: 'Opening Hours',
      hoursDetail: 'Mon–Fri: 8:00–17:00\nSat: 9:00–13:00\nSun: Closed\nVisits: By appointment',
      mapAlt: 'Location of Čebelarstvo Veselič in Čurile near Metlika',
    },
    footer: {
      brandDesc: 'Čebelarstvo Veselič — three generations of beekeepers from Bela Krajina. Organic certified honey, produced with heart and knowledge, from pristine karst pastures.',
      quickLinks: 'Quick Links',
      legal: 'Legal',
      contact: 'Contact',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
      cookies: 'Cookie Policy',
      rights: 'All rights reserved.',
      address: 'Čebelarstvo Veselič, Čurile 4a, 8330 Metlika',
      madeIn: 'Made in Bela Krajina 🍯',
    },
    cookie: {
      title: 'Cookies',
      description: 'We use cookies to improve your experience, analyse site visits, and for marketing purposes. You can choose which categories to enable.',
      accept: 'Accept All',
      reject: 'Reject All',
      settings: 'Settings',
      necessary: 'Necessary',
      analytics: 'Analytics',
      marketing: 'Marketing',
      necessaryDesc: 'These cookies are essential for the website to function. They cannot be disabled.',
      analyticsDesc: 'Cookies for anonymous visit analytics (Google Analytics 4). They help us understand how you use the site.',
      marketingDesc: 'Cookies for advertising purposes (Facebook Pixel, Google Ads). We use them to measure ad effectiveness.',
      save: 'Save Settings',
    },
    seasonal: {
      badge: 'Seasonal Availability',
      message: 'Some varieties are currently limited due to weather conditions. Contact us for current availability.',
    },
    comparison: {
      sectionTag: 'Variety Comparison',
      title: 'Which Honey is Right for You?',
      subtitle: 'Compare all six honey varieties by taste, colour, origin, use case, and crystallisation speed. Find your perfect honey.',
      headers: {
        taste: 'Taste',
        color: 'Colour',
        origin: 'Origin',
        use: 'Best Use',
        crystalSpeed: 'Crystallisation',
        price: 'Price',
      },
      sortLabels: {
        sortByTaste: 'By Sweetness',
        sortByPrice: 'By Price',
        sortByColor: 'By Darkness',
        resetSort: 'Default',
      },
      crystalSpeed: {
        slow: 'Slow',
        medium: 'Medium',
        fast: 'Fast',
      },
    },
    stats: {
      years: '30',
      yearsLabel: 'Years of Experience',
      hives: '100',
      hivesLabel: 'Beehives',
      varieties: '6',
      varietiesLabel: 'Honey Varieties',
      organic: '100',
      organicLabel: '% Organic',
      rating: '4.9',
      ratingLabel: 'Average Rating',
      reviews: '127',
      reviewsLabel: 'Customer Reviews',
    },
    promo: {
      spring: 'Spring cleanse with honey',
      summer: 'Summer apiary visit season!',
      autumn: 'Fir honeydew honey has arrived!',
      winter: 'Christmas honey gift packaging',
      cta: 'Explore',
      dismiss: 'Close',
    },
    gallery: {
      sectionTag: 'Gallery',
      title: 'A Glimpse Into Our Beekeeping World',
      subtitle: 'Enjoy the views of our apiary, honey varieties, and beekeeping farm in Bela Krajina.',
      imageOf: 'Image {current} of {total}',
      closeGallery: 'Close gallery',
      prev: 'Previous',
      next: 'Next',
    },
    quality: {
      sectionTag: 'Quality',
      title: 'Why Our Honey is Different',
      subtitle: 'Three pillars of quality that set our honey apart from all others.',
      pillars: [
        {
          title: 'Raw & Unprocessed',
          description: 'We never heat honey above 40 °C. All natural enzymes, antioxidants, and aromas are preserved — exactly as nature created them.',
          details: ['No heating above 40 °C', 'All natural enzymes preserved', 'No added sugars or preservatives'],
        },
        {
          title: 'Certified Organic',
          description: 'Our honey is certified under the Eko Sklad scheme in compliance with EU organic farming regulations (EU) 2018/848.',
          details: ['Eko Sklad certificate', 'EU Regulation (EU) 2018/848', 'Regular annual quality audits'],
        },
        {
          title: 'Single-Origin',
          description: 'All honey comes from the pristine karst pastures of Bela Krajina — a region with sub-Mediterranean climate and unique floral diversity.',
          details: ['Bela Krajina — Slovenia', 'Sub-Mediterranean climate', 'GPS traceability to the hive'],
        },
      ],
    },
    whatsapp: {
      tooltip: 'Message us on WhatsApp — we reply within 1 hour',
    },
  },
};

export function getTranslations(lang: Lang): TranslationStrings {
  return translations[lang];
}

export default translations;
