# HERITAGE & POLO — Old Money Wardrobe & Bespoke Photo Album Generator

**Studiul Individual Nr. 2**  
**Disciplina:** AMPS (Arhitectura și Modelarea Proceselor Software)  
**Autor / Student:** Cozma Petru  
**Tematică:** Generator de albume foto vestimentare în stilul **Old Money & Ralph Lauren (Quiet Luxury, Tweed, Cașmir, Savile Row)**  

---

## 2. Structura Proiectului

```
studiu-individual2_CozmaPetru/
│
├── index.html                   # Pagina principală (Acasă) - GitHub Pages
├── index.php                    # Pagina principală - PHP Server
│
├── galerie.html                 # Galeria de ținute Old Money Ralph Lauren
├── galerie.php
│
├── generator.html               # Generatorul interactiv de albume foto (Sarcina cheie)
├── generator.php
│
├── albume.html                  # Albumele salvate & Lookbook viewer cu slideshow
├── albume.php
│
├── inventar.html                # Gestiune piese vestimentare, fotografii & stoc
├── inventar.php
│
├── comenzi.html                 # Comenzi tipărire albume fizice de lux
├── comenzi.php
│
├── rapoarte.html                # Audit analitic, statistici financiare & export CSV
├── rapoarte.php
│
├── ghid-stil.html               # Ghid de stil vestimentar Old Money & Ralph Lauren
├── ghid-stil.php
│
├── includes/                    # Componente modulare PHP
│   ├── header.php               # Antet comun, navigație dinamică și metatag-uri
│   ├── footer.php               # Subsol de lux, linkuri și credite
│   ├── data.php                 # Setul de date inițial în format PHP
│   └── functions.php            # Funcții utilitare de formatare și randare
│
├── css/
│   ├── style.css                # Sistemul complet de design Old Money & responsive
│   └── print.css                # Formatare dedicată pentru tipărire și export PDF
│
├── js/
│   ├── data.js                  # Colecția de ținute Ralph Lauren, descrieri și albume demo
│   ├── storage.js               # Manager sincronizare LocalStorage & compresie Canvas
│   ├── generator.js             # Motorul studio-ului de generare albume
│   ├── lookbook.js              # Vizualizatorul interactiv de răsfoire și slideshow
│   └── main.js                  # Lightbox de lux, notificări Toast și utilitare
│
├── images/
│   ├── logo.svg                 # Logo monogramă vectorială Heritage & Polo
│   ├── crest.svg                # Blazon heraldic nobil
│   └── placeholder-fashion.svg  # Imagine de rezervă vectorială
│
├── .gitignore                   # Excluderi fișiere temporare
└── README.md                    # Documentația completă a proiectului
```
## 5. Tehnologii Utilizate
* **HTML5**: Structură semantică, formulare interactive, API FileReader;
* **CSS3**: Variabile CSS (Custom Properties), CSS Grid, Flexbox, media queries responsive, animații subtile, stiluri de tipar `@media print`;
* **JavaScript (ES6+)**: Arhitectură modulară, persistență `LocalStorage`, manipulare `HTML5 Canvas` pentru compresie grafică, export Blob CSV/JSON, Lightbox;
* **PHP 8+**: Componente modulare server-side (`include`/`require`), structuri de date asociative, generare dinamică a legăturilor de navigație.
