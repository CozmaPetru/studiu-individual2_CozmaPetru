/**
 * Date inițiale pentru Atelierul Heritage & Polo - Stil Old Money & Ralph Lauren
 * Studiu Individual 2 - Cozma Petru
 */

const DATE_INITIALE_PRODUSE = [
    {
        id: 1,
        nume: "Sacou Tweed Herringbone Ralph Lauren",
        categorie: "Sacouri & Tweed",
        sezon: "Toamnă / Iarnă",
        stil: "Ralph Lauren Purple Label",
        material: "100% Lână Harris Tweed Scoțiană",
        pret: 2890,
        pretEur: 580,
        stoc: 6,
        cod: "RL-TWD-01",
        img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
        descriere: "Croială clasică britanică cu rever crestat, nasturi din corn veritabil și buzunare cu clapetă. O piesă nemuritoare pentru plimbări la conac sau întâlniri de club."
    },
    {
        id: 2,
        nume: "Pulover Cablat din Cașmir Ivory",
        categorie: "Tricotaje & Cămăși",
        sezon: "All-Season",
        stil: "Old Money Tennis Club",
        material: "100% Cașmir Mongolian 4-ply",
        pret: 1650,
        pretEur: 330,
        stoc: 9,
        cod: "RL-KNT-02",
        img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
        descriere: "Iconicul pulover alb-fildeș cu împletitură torsadată cablată. Semnătura stilului preppy și a eleganței discrete de pe Coasta de Est a Americii."
    },
    {
        id: 3,
        nume: "Palton Chesterfield din Lână & Cașmir Camel",
        categorie: "Paltoane & Trench-uri",
        sezon: "Toamnă / Iarnă",
        stil: "Savile Row Bespoke",
        material: "90% Lână Virgină, 10% Cașmir",
        pret: 3950,
        pretEur: 790,
        stoc: 4,
        cod: "RL-COT-03",
        img: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
        descriere: "Nuanță caldă de bej-camel nobil, închidere la două rânduri de nasturi, guler cu rever din catifea fină și siluetă structurată cu umeri impecabili."
    },
    {
        id: 4,
        nume: "Costum Clasic Double-Breasted Navy Pinstripe",
        categorie: "Eleganță & Black Tie",
        sezon: "All-Season",
        stil: "Mayfair Gentleman",
        material: "100% Lână Super 150s Merino",
        pret: 4600,
        pretEur: 920,
        stoc: 3,
        cod: "RL-SUT-04",
        img: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80",
        descriere: "Costum marin de o autoritate discretă, cu dungi fine de cretă, talie accentuată și revere late ascuțite, inspirat din garderoba banchierilor londonezi."
    },
    {
        id: 5,
        nume: "Cămașă Oxford Cotton Button-Down Albastră",
        categorie: "Tricotaje & Cămăși",
        sezon: "Primăvară / Vară",
        stil: "Ivy League Heritage",
        material: "100% Bumbac Oxford Pima",
        pret: 780,
        pretEur: 155,
        stoc: 14,
        cod: "RL-SHT-05",
        img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
        descriere: "Guler button-down moale fără inserții rigide, textură distinctivă Oxford tip panama, cămașa indispensabilă stilului Ralph Lauren de fiecare zi."
    },
    {
        id: 6,
        nume: "Rochie Clasic Minimalistă din Mătase & Lână",
        categorie: "Rochii & Siluete",
        sezon: "All-Season",
        stil: "Quiet Luxury Dame",
        material: "65% Lână Fină, 35% Mătase Mulberry",
        pret: 3100,
        pretEur: 620,
        stoc: 5,
        cod: "RL-DRS-06",
        img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
        descriere: "Eleganță atemporală în tonuri neutre de bej-nisipiu, cordon în talie, falduri fluide și decolteu discret pentru ceaiul de după-amiază sau dineuri private."
    },
    {
        id: 7,
        nume: "Jachetă de Călărie Equestrian Waxed Olive",
        categorie: "Paltoane & Trench-uri",
        sezon: "Toamnă",
        stil: "Cotswolds Country Club",
        material: "Bumbac Cerat Rezistent la Ploaie & Căptușeală Tartan",
        pret: 2450,
        pretEur: 490,
        stoc: 7,
        cod: "RL-EQT-07",
        img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
        descriere: "Guler din reiat cafeniu închis, capse de alamă aurită, buzunare supradimensionate pentru mănuși de călărie și finisaj rezistent la intemperii."
    },
    {
        id: 8,
        nume: "Smoking din Catifea Neagră & Rever Mătase",
        categorie: "Eleganță & Black Tie",
        sezon: "Iarnă / Seri de Gală",
        stil: "Black Tie Royal",
        material: "100% Catifea de Bumbac & Satin Duchesse",
        pret: 5200,
        pretEur: 1040,
        stoc: 2,
        cod: "RL-SMK-08",
        img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
        descriere: "Sacou de seară opulent dar rafinat, cu nasturi îmbrăcați în mătase, căptușeală cu monogramă jacquard și tivuri executate manual."
    },
    {
        id: 9,
        nume: "Pantaloni Gurkha din In & Bumbac Nisipiu",
        categorie: "Stil Riviera & In",
        sezon: "Primăvară / Vară",
        stil: "French Riviera Luxury",
        material: "70% In Belgian, 30% Bumbac Egiptean",
        pret: 1150,
        pretEur: 230,
        stoc: 11,
        cod: "RL-PNT-09",
        img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80",
        descriere: "Talie înaltă cu bentițe duble laterale de ajustare și cataramă de bronz, pense adânci duble și croi drept aerisit pentru vacanțe la Portofino."
    },
    {
        id: 10,
        nume: "Pantofi Loafers Penny din Piele Cordovan Borș",
        categorie: "Accesorii & Piele",
        sezon: "All-Season",
        stil: "Old Money Footwear",
        material: "Piele Shell Cordovan Horween",
        pret: 2900,
        pretEur: 580,
        stoc: 5,
        cod: "RL-SHS-10",
        img: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80",
        descriere: "Cusuți manual prin metoda Goodyear welted, lustruiți la un luciu intens de vișiniu închis (Color #8), talpă dublă de piele tăbăcită vegetal."
    },
    {
        id: 11,
        nume: "Ceas Clasic Tank cu Cadran Aurit & Curea Croco",
        categorie: "Accesorii & Piele",
        sezon: "All-Season",
        stil: "Vintage Horology",
        material: "Carcasă Oțel Placat cu Aur 18k, Mecanism Automatic",
        pret: 6500,
        pretEur: 1300,
        stoc: 3,
        cod: "RL-WAT-11",
        img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
        descriere: "Formă dreptunghiulară cu numere romane stil Art Deco, limbi din oțel albăstrit și coroană cu cabochon din safir veritabil."
    },
    {
        id: 12,
        nume: "Eșarfă din Mătase Twill cu Motiv Ecvestru",
        categorie: "Accesorii & Piele",
        sezon: "All-Season",
        stil: "Polo Club Equestrian",
        material: "100% Mătase Naturală Twill 14mm",
        pret: 620,
        pretEur: 124,
        stoc: 15,
        cod: "RL-ACC-12",
        img: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80",
        descriere: "Margini rulate și tivite manual de meșteșugari italieni, imprimeu nobil cu harnașamente aurii, potcoave și verde de curse englezesc."
    }
];

const ALBUME_PREDEFINITE = [
    {
        id: "alb-01",
        titlu: "The Hamptons Polo & Coastal Heritage",
        subtitlu: "Lookbook de Vară Ralph Lauren Collection",
        curator: "Heritage & Co. Atelier",
        dataCreare: "2026-05-14",
        tema: "marina-gold",
        tipar: "Cinzel",
        layout: "lookbook",
        copertaImg: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
        descriere: "O explorare a stilului de viață maritim și a partidelor de polo din Long Island: pulovere cablate din cașmir fin, pantaloni albi din in și cămăși Oxford lejere.",
        elemente: [2, 5, 9, 11]
    },
    {
        id: "alb-02",
        titlu: "Autumn in the Cotswolds: Tweed & Countryside",
        subtitlu: "Colecția de Toamnă / Weekend la Conac",
        curator: "Lord Montgomery Archive",
        dataCreare: "2026-09-22",
        tema: "racing-green",
        tipar: "Playfair Display",
        layout: "masonry",
        copertaImg: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
        descriere: "Nuanțe de pământ, lână Harris Tweed, jachete cerate rezistente la ceață și cizme de călărie în culori bogate de coniac și verde britanic.",
        elemente: [1, 3, 7, 10, 12]
    },
    {
        id: "alb-03",
        titlu: "Savile Row & Black Tie Soirée",
        subtitlu: "Eleganță Ceremonială & Costume Bespoke",
        curator: "Atelier Haute Couture",
        dataCreare: "2026-11-02",
        tema: "midnight-black",
        tipar: "Cinzel",
        layout: "polaroid",
        copertaImg: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
        descriere: "Codul vestimentar al celor mai distinse saloane de gală: catifea neagră, satin lucios, ceasuri elvețiene discrete și rochii fluide din mătase pură.",
        elemente: [4, 6, 8, 11]
    }
];

const FINISAJE_ALBUM = [
    {
        id: "fin-linen",
        nume: "Hardcover Linen Regal cu Foiță Aurie",
        pret: 189,
        descriere: "Copertă tare îmbrăcată în pânză de in natural englezesc, titlu embosat cu foiță aurie de 22k și hârtie mată foto 250g/mp."
    },
    {
        id: "fin-leather",
        nume: "Legătură din Piele Naturală Maro Cognac",
        pret: 299,
        descriere: "Piele veritabilă lucrată manual de legători de cărți, cusături ton-pe-ton și colțuri de alamă vintage aurită."
    },
    {
        id: "fin-velvet",
        nume: "Ediție Regală în Cutie de Catifea Smarald",
        pret: 399,
        descriere: "Album masiv de colecție prezentat într-o casetă capitonată cu catifea verde regal și certificat de autenticitate inserat."
    },
    {
        id: "fin-soft",
        nume: "Lookbook Editorial Softcover",
        pret: 119,
        descriere: "Revistă de colecție format A4 cu copertă laminată mată soft-touch și finisaj de galerie de artă."
    }
];
