<?php
$pageTitle = "Heritage & Polo — Old Money Atelier & Photo Album Generator";
$activePage = "index";
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/data.php';
?>

<main>
    <!-- Hero Section Impunător -->
    <section class="page-hero" style="padding: 5rem 0 4.5rem;">
        <div class="container">
            <div class="hero-content">
                <span class="hero-subtitle">ESTETICA ARISTOCRATĂ &bull; QUIET LUXURY</span>
                <h1>Arta Eleganței Nemuritoare:<br>Generator de Albume Foto Old Money</h1>
                <p class="hero-desc">
                    Inspirat din universul iconic Ralph Lauren Purple Label, cluburile de polo britanice și conacele din Cotswolds. Creează albume foto editoriale de excepție din piese vestimentare nemuritoare din tweed, cașmir și in.
                </p>
                <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 2rem;">
                    <a href="generator.php" class="btn btn-gold btn-lg">
                        <span>✦ Deschide Generatorul de Albume</span>
                    </a>
                    <a href="galerie.php" class="btn btn-outline-gold btn-lg">
                        <span>Explorează Galeria de Ținute</span>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Bară de Valori & Cifre de Referință -->
    <section style="background: var(--bg-parchment); border-bottom: 1px solid var(--border-beige); padding: 1.5rem 0;">
        <div class="container">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; text-align: center;">
                <div>
                    <div style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 700; color: var(--emerald-primary);">100%</div>
                    <div style="font-size: 0.82rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em;">Personalizabil (Copertă &amp; Layout)</div>
                </div>
                <div>
                    <div style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 700; color: var(--emerald-primary);">4 Stiluri</div>
                    <div style="font-size: 0.82rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em;">Lookbook, Masonry, Polaroid &amp; Grid</div>
                </div>
                <div>
                    <div style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 700; color: var(--emerald-primary);">Export Multi-Format</div>
                    <div style="font-size: 0.82rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em;">Tipar PDF, JSON &amp; Livrare Fizică</div>
                </div>
                <div>
                    <div style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 700; color: var(--emerald-primary);">Ralph Lauren</div>
                    <div style="font-size: 0.82rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em;">Estetică Clasică Old Money</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Secțiune: Albume de Semnătură Predefinite -->
    <section class="section-py">
        <div class="container">
            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
                <div>
                    <span class="card-category">COLECȚII CURATORIATE</span>
                    <h2>Albume Foto de Semnătură</h2>
                    <p>Descoperă lookbook-urile noastre tematice inspirate din sezoanele aristocratice.</p>
                </div>
                <a href="albume.php" class="btn btn-outline">Vezi Toate Albumele &#8594;</a>
            </div>

            <div class="fashion-grid" id="homeFeaturedAlbums">
                <!-- Se populează dinamic cu JavaScript prin StorageManager -->
            </div>
        </div>
    </section>

    <!-- Secțiune: Mini-Generator Rapid în 3 Pași -->
    <section class="section-py" style="background: var(--bg-parchment); border-top: 1px solid var(--border-beige); border-bottom: 1px solid var(--border-beige);">
        <div class="container">
            <div style="max-width: 850px; margin: 0 auto; text-align: center; margin-bottom: 2.5rem;">
                <img src="images/crest.svg" alt="Crest" style="width: 50px; margin-bottom: 1rem;">
                <span class="card-category">CREAȚIE BESPOKE INSTANTANEE</span>
                <h2>Generează un Album Foto în Câteva Minute</h2>
                <p>Selectează tema cromatică, adaugă piesele vestimentare preferate sau încarcă fotografii proprii pentru un lookbook demn de o casă editorială de prestigiu.</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
                <div style="background: #ffffff; padding: 2rem; border-radius: var(--radius-md); border: 1px solid var(--border-beige); text-align: center; box-shadow: var(--shadow-soft);">
                    <div class="step-num" style="margin: 0 auto 1rem; width: 32px; height: 32px; font-size: 1rem;">1</div>
                    <h3 style="font-size: 1.15rem; margin-bottom: 0.5rem;">Alege Titlul &amp; Coperta</h3>
                    <p style="font-size: 0.9rem;">Personalizează titlul de copertă, fontul editorial (Cinzel sau Playfair) și nuanța heraldică (Racing Green, Navy, Burgundy sau Camel).</p>
                </div>

                <div style="background: #ffffff; padding: 2rem; border-radius: var(--radius-md); border: 1px solid var(--border-beige); text-align: center; box-shadow: var(--shadow-soft);">
                    <div class="step-num" style="margin: 0 auto 1rem; width: 32px; height: 32px; font-size: 1rem;">2</div>
                    <h3 style="font-size: 1.15rem; margin-bottom: 0.5rem;">Selectează Ținutele</h3>
                    <p style="font-size: 0.9rem;">Alege din catalogul nostru piese din tweed, cașmir sau in, ori încarcă propriile fotografii vestimentare comprimate automat.</p>
                </div>

                <div style="background: #ffffff; padding: 2rem; border-radius: var(--radius-md); border: 1px solid var(--border-beige); text-align: center; box-shadow: var(--shadow-soft);">
                    <div class="step-num" style="margin: 0 auto 1rem; width: 32px; height: 32px; font-size: 1rem;">3</div>
                    <h3 style="font-size: 1.15rem; margin-bottom: 0.5rem;">Exportă &amp; Răsfoiește</h3>
                    <p style="font-size: 0.9rem;">Răsfoiește albumul în mod interactiv, exportă-l în format PDF de tipar, descarcă fișierul de configurare sau comandă volumul legat în piele.</p>
                </div>
            </div>

            <div style="text-align: center;">
                <a href="generator.php" class="btn btn-gold btn-lg">
                    <span>Lansează Generatorul de Albume Foto &#8594;</span>
                </a>
            </div>
        </div>
    </section>

    <!-- Citate & Manifest Estetic Old Money -->
    <section class="section-py">
        <div class="container" style="max-width: 900px; text-align: center;">
            <span class="card-category">FILOSOFIA ATELIERULUI</span>
            <blockquote style="font-family: var(--font-editorial); font-style: italic; font-size: 1.5rem; color: var(--emerald-primary); line-height: 1.6; margin: 1.5rem 0;">
                „Nu creez simple haine, creez vise și o moștenire culturală. Stilul este ceva foarte individual, foarte personal, iar în viața modernă, eleganța autentică vine din atemporalitate și respect pentru calitate.”
            </blockquote>
            <div style="font-family: var(--font-heading); font-size: 1rem; letter-spacing: 0.1em; color: var(--gold-dim); font-weight: 700;">
                RALPH LAUREN &bull; INSPIRAȚIE VESTIMENTARĂ
            </div>
        </div>
    </section>
</main>

<script>
    document.addEventListener("DOMContentLoaded", () => {
        const albume = StorageManager.getAlbume();
        const produse = StorageManager.getProduse();
        const container = document.getElementById("homeFeaturedAlbums");
        if (container) {
            container.innerHTML = albume.slice(0, 3).map(a => {
                let coverImg = a.copertaImg;
                if (!coverImg && a.elemente && a.elemente.length) {
                    const p = produse.find(item => item.id == a.elemente[0]);
                    if (p) coverImg = p.img;
                }
                if (!coverImg) coverImg = "images/placeholder-fashion.svg";

                return `
                    <div class="fashion-card">
                        <div class="card-media" onclick="window.location.href='albume.php'">
                            <img src="${coverImg}" alt="${a.titlu}" loading="lazy">
                            <span class="card-badge">${a.elemente ? a.elemente.length : 0} Fotografii</span>
                        </div>
                        <div class="card-body">
                            <div class="card-category">CURATOR: ${a.curator || 'HERITAGE'}</div>
                            <h3 class="card-title">${a.titlu}</h3>
                            <p class="card-material">${a.subtitlu || 'Ediție de colecție'}</p>
                            <div class="card-actions" style="margin-top: auto;">
                                <a href="albume.php" class="btn btn-primary btn-sm" style="flex: 1;">
                                    <span>👁 Răsfoiește Albumul</span>
                                </a>
                            </div>
                        </div>
                    </div>
                `;
            }).join("");
        }
    });
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
