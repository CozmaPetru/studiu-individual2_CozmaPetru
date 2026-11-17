# HERITAGE & POLO — Old Money Wardrobe & Bespoke Photo Album Generator

**Studiul Individual Nr. 2**  
**Disciplina:** AMPS (Arhitectura și Modelarea Proceselor Software)  
**Autor / Student:** Cozma Petru  
**Tematică:** Generator de albume foto vestimentare în stilul **Old Money & Ralph Lauren (Quiet Luxury, Tweed, Cașmir, Savile Row)**  

---

## 1. Analiza Site-ului de Referință și Îmbunătățirile Aportate

Site-ul de referință indicat ([Gale Boutique](https://parfeniinga.github.io/Studiul_Individual_2_Magazin_De_Haine/)) a fost structurat în jurul a 4 panouri comutabile:
1. **Galerie** (filtre de tip chips pe categorii, carduri de produse, lightbox mărit);
2. **Inventar** (formular de adăugare produs cu compresie foto pe canvas, tabel de stoc cu actualizare dinamică);
3. **Comenzi** (plasare comenzi produse, tabel istoric cu status Nouă / Livrată / Anulată);
4. **Rapoarte** (statistici cifrice, tabel de vânzări pe produs, descărcare fișier CSV).

### Ce am adus în plus și cum am rafinat conceptul:
* **Nu este un simplu landing page sau single-page**: S-a dezvoltat un **website multi-pagină autentic**, cu navigație dedicată între pagini distincte.
* **Sarcina specifică: Generator de Albume Foto**: Am integrat un studio complet interactiv (`generator.html` / `generator.php`) care permite construirea de la zero a albumelor foto tematice (titlu nobiliar, font editorial, 4 palete cromatice heraldice, 4 moduri de layout, adăugare fotografii din catalog sau upload propriu, reordonare și export PDF/Print/JSON).
* **Colecții & Lookbook Viewer Interactiv**: Pagină dedicată (`albume.html` / `albume.php`) pentru răsfoirea albumelor salvate, prevăzută cu mod **Slideshow automat** și răsfoire filă cu filă.
* **Stilizare Unică Old Money / Ralph Lauren**: O identitate vizuală nobilă inspirată din campaniile clasice Ralph Lauren Purple Label și cluburile de polo britanice:
  - Paletă cromatică: *British Racing Green*, *Regal Navy*, *Imperial Burgundy*, *Saddle Brown*, *Champagne Gold* și *Warm Alabaster*;
  - Tipografie de prestigiu: **Cinzel** (font serif majuscul nobiliar) și **Playfair Display** (font editorial clasic de revistă);
  - Monogramă heraldică și blazon vectorizate SVG (`images/logo.svg`, `images/crest.svg`).
* **Arhitectură Dublă HTML & PHP**:
  - Pagini `.html` pentru funcționare 100% nativă pe **GitHub Pages** (fără erori de server);
  - Pagini `.php` cu structură modulară (`includes/header.php`, `includes/footer.php`, `includes/data.php`, `includes/functions.php`) pentru rulare pe servere web (Apache / XAMPP / PHP CLI).

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

---

## 3. Funcționalitățile Cheie ale Aplicației

### A. Generatorul de Albume Foto (`generator.html` / `generator.php`)
* **Personalizare Copertă**: Titlu album, subtitlu de ediție, nume curator/autor, notă editorială;
* **Selecție Temă Cromatică**: *British Racing Green*, *Regal Navy*, *Imperial Burgundy*, *Saddle Camel*;
* **Alegere Tipar / Font**: *Cinzel* sau *Playfair Display*;
* **Selecție Fotografii**: Adăugare piese vestimentare din catalog prin click sau încărcare fotografii proprii cu compresie Canvas;
* **Ordonare & Reorganizare**: Butoane de mutare sus/jos și eliminare planșe din album;
* **4 Moduri de Aspect Paginare**:
  1. *Lookbook Editorial*: Layout două coloane cu număr de planșă, imagine nobilă, notă de stil și detalii material;
  2. *Mozaic Masonry*: Dinamism vizual asimetric de revistă de modă;
  3. *Polaroid Vintage*: Rame foto albe cu tentă nostalgică;
  4. *Grilă Clasic 3x4*: Organizare curată și armonioasă.
* **Previzualizare în Timp Real**: Modificările se reflectă instantaneu în panoul din dreapta;
* **Opțiuni de Export**:
  - Salvare în memoria browserului (*Albumele Mele*);
  - Tipărire sau Salvare ca **fișier PDF** (cu antet și stiluri speciale prin `css/print.css`);
  - Descarcă configurația în **format JSON**;
  - Trimitere directă către comanda unui volum fizic tipărit.

### B. Galeria Vestimentară Old Money (`galerie.html` / `galerie.php`)
* Peste 12 ținute atent alese (Sacou Tweed Herringbone Ralph Lauren, Pulover Cablat Cașmir Ivory, Palton Chesterfield Camel, Costum Double-Breasted Navy, Cămașă Oxford Pima, etc.);
* Filtrare instantanee prin butoane chips pe categorii;
* Căutare în timp real după nume, material, stil sau descriere;
* Sortare după preț (crescător/descrescător) și alfabetic;
* Lightbox fullscreen cu detalii complete, navigare prin săgeți și tastatură (ESC, Stânga, Dreapta);
* Buton de adăugare rapidă a ținutei în albumul de lucru curent.

### C. Albumele Mele & Lookbook Viewer (`albume.html` / `albume.php`)
* Listă completă a albumelor salvate și a edițiilor predefinite;
* Deschidere vizualizator cu **răsfoire filă cu filă** (Copertă -> Planșele albumului);
* Mod **Slideshow Automat** (avansare automată la fiecare 3.5 secunde);
* Buton de re-editare directă a albumului în Generator;
* Import albume din fișiere JSON locale.

### D. Inventar & Studio Foto (`inventar.html` / `inventar.php`)
* Formular complet pentru înregistrarea de ținute noi;
* Încărcare de fotografii cu **optimizare și redimensionare automată prin HTML5 Canvas** (pentru a proteja memoria browserului și a preveni depășirea cotei LocalStorage);
* Tabel de evidență cu editarea stocului direct în celulă;
* Alertă vizuală pentru stoc critic ($\le$ 3 bucăți) și epuizat;
* Ștergere piese din catalog cu dialog de confirmare.

### E. Comenzi Tipar Albume (`comenzi.html` / `comenzi.php`)
* Formular pentru comandarea unui volum tipărit fizic;
* Selecție album din lista de albume salvate;
* 4 opțiuni de legătorie de artă (Hardcover Linen Regal, Piele Naturală Maro Cognac, Cutie Catifea Smarald, Lookbook Softcover);
* Calcul automat al sumei totale în timp real;
* Tabel istoric comenzi cu actualizarea dinamică a stării (*Nouă*, *În Tipar*, *Expediată*, *Livrată*, *Anulată*).

### F. Rapoarte & Analitică (`rapoarte.html` / `rapoarte.php`)
* Carduri sintetice de audit: Venituri totale din comenzi, Număr albume create, Valoare patrimoniu stoc, Piese cu stoc critic;
* Tabel detaliat al performanței pe fiecare produs;
* Buton de **Descărcare Raport CSV** (formatat cu UTF-8 BOM pentru a se deschide fără erori de diacritice în Microsoft Excel).

---

## 4. Instrucțiuni de Rulare & Găzduire

### A. Rulare pe GitHub Pages (Versiunea Statică HTML)
1. Inițializați depozitul git și încărcați fișierele pe GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Heritage & Polo Album Generator"
   git branch -M main
   git remote add origin https://github.com/<utilizator>/<nume-repo>.git
   git push -u origin main
   ```
2. În setările depozitului GitHub (*Settings -> Pages*), la secțiunea **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **main** / folder: **/ (root)**
   - Apăsați **Save**.
3. În câteva momente site-ul va fi live la adresa:  
   `https://<utilizator>.github.io/<nume-repo>/`

### B. Rulare Locală cu PHP
Puteți lansa serverul integrat PHP cu o singură comandă în terminal:
```bash
php -S localhost:8000
```
Apoi deschideți browserul la adresa [http://localhost:8000/index.php](http://localhost:8000/index.php).

---

## 5. Tehnologii Utilizate
* **HTML5**: Structură semantică, formulare interactive, API FileReader;
* **CSS3**: Variabile CSS (Custom Properties), CSS Grid, Flexbox, media queries responsive, animații subtile, stiluri de tipar `@media print`;
* **JavaScript (ES6+)**: Arhitectură modulară, persistență `LocalStorage`, manipulare `HTML5 Canvas` pentru compresie grafică, export Blob CSV/JSON, Lightbox;
* **PHP 8+**: Componente modulare server-side (`include`/`require`), structuri de date asociative, generare dinamică a legăturilor de navigație.
