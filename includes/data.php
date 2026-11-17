<?php
/**
 * Date inițiale PHP pentru Atelierul Heritage & Polo - Stil Old Money & Ralph Lauren
 * Studiu Individual 2 - Cozma Petru
 */

$DATE_PRODUSE = [
    [
        'id' => 1,
        'nume' => 'Sacou Tweed Herringbone Ralph Lauren',
        'categorie' => 'Sacouri & Tweed',
        'sezon' => 'Toamnă / Iarnă',
        'stil' => 'Ralph Lauren Purple Label',
        'material' => '100% Lână Harris Tweed Scoțiană',
        'pret' => 2890,
        'pretEur' => 580,
        'stoc' => 6,
        'cod' => 'RL-TWD-01',
        'img' => 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
        'descriere' => 'Croială clasică britanică cu rever crestat, nasturi din corn veritabil și buzunare cu clapetă. O piesă nemuritoare pentru plimbări la conac sau întâlniri de club.'
    ],
    [
        'id' => 2,
        'nume' => 'Pulover Cablat din Cașmir Ivory',
        'categorie' => 'Tricotaje & Cămăși',
        'sezon' => 'All-Season',
        'stil' => 'Old Money Tennis Club',
        'material' => '100% Cașmir Mongolian 4-ply',
        'pret' => 1650,
        'pretEur' => 330,
        'stoc' => 9,
        'cod' => 'RL-KNT-02',
        'img' => 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
        'descriere' => 'Iconicul pulover alb-fildeș cu împletitură torsadată cablată. Semnătura stilului preppy și a eleganței discrete de pe Coasta de Est a Americii.'
    ],
    [
        'id' => 3,
        'nume' => 'Palton Chesterfield din Lână & Cașmir Camel',
        'categorie' => 'Paltoane & Trench-uri',
        'sezon' => 'Toamnă / Iarnă',
        'stil' => 'Savile Row Bespoke',
        'material' => '90% Lână Virgină, 10% Cașmir',
        'pret' => 3950,
        'pretEur' => 790,
        'stoc' => 4,
        'cod' => 'RL-COT-03',
        'img' => 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
        'descriere' => 'Nuanță caldă de bej-camel nobil, închidere la două rânduri de nasturi, guler cu rever din catifea fină și siluetă structurată cu umeri impecabili.'
    ],
    [
        'id' => 4,
        'nume' => 'Costum Clasic Double-Breasted Navy Pinstripe',
        'categorie' => 'Eleganță & Black Tie',
        'sezon' => 'All-Season',
        'stil' => 'Mayfair Gentleman',
        'material' => '100% Lână Super 150s Merino',
        'pret' => 4600,
        'pretEur' => 920,
        'stoc' => 3,
        'cod' => 'RL-SUT-04',
        'img' => 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80',
        'descriere' => 'Costum marin de o autoritate discretă, cu dungi fine de cretă, talie accentuată și revere late ascuțite, inspirat din garderoba banchierilor londonezi.'
    ],
    [
        'id' => 5,
        'nume' => 'Cămașă Oxford Cotton Button-Down Albastră',
        'categorie' => 'Tricotaje & Cămăși',
        'sezon' => 'Primăvară / Vară',
        'stil' => 'Ivy League Heritage',
        'material' => '100% Bumbac Oxford Pima',
        'pret' => 780,
        'pretEur' => 155,
        'stoc' => 14,
        'cod' => 'RL-SHT-05',
        'img' => 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
        'descriere' => 'Guler button-down moale fără inserții rigide, textură distinctivă Oxford tip panama, cămașa indispensabilă stilului Ralph Lauren de fiecare zi.'
    ],
    [
        'id' => 6,
        'nume' => 'Rochie Clasic Minimalistă din Mătase & Lână',
        'categorie' => 'Rochii & Siluete',
        'sezon' => 'All-Season',
        'stil' => 'Quiet Luxury Dame',
        'material' => '65% Lână Fină, 35% Mătase Mulberry',
        'pret' => 3100,
        'pretEur' => 620,
        'stoc' => 5,
        'cod' => 'RL-DRS-06',
        'img' => 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
        'descriere' => 'Eleganță atemporală în tonuri neutre de bej-nisipiu, cordon în talie, falduri fluide și decolteu discret pentru ceaiul de după-amiază sau dineuri private.'
    ]
];

$DATE_ALBUME = [
    [
        'id' => 'alb-01',
        'titlu' => 'The Hamptons Polo & Coastal Heritage',
        'subtitlu' => 'Lookbook de Vară Ralph Lauren Collection',
        'curator' => 'Heritage & Co. Atelier',
        'dataCreare' => '2026-05-14',
        'tema' => 'marina-gold',
        'tipar' => 'Cinzel',
        'layout' => 'lookbook',
        'copertaImg' => 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
        'elemente' => [2, 5, 9, 11]
    ],
    [
        'id' => 'alb-02',
        'titlu' => 'Autumn in the Cotswolds: Tweed & Countryside',
        'subtitlu' => 'Colecția de Toamnă / Weekend la Conac',
        'curator' => 'Lord Montgomery Archive',
        'dataCreare' => '2026-09-22',
        'tema' => 'racing-green',
        'tipar' => 'Playfair Display',
        'layout' => 'masonry',
        'copertaImg' => 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
        'elemente' => [1, 3, 7, 10, 12]
    ]
];
