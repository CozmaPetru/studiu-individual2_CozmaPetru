<?php
$pageTitle = "Studio Generator de Albume Foto — Heritage & Polo";
$activePage = "generator";
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/data.php';
?>

<main>
    <section class="page-hero">
        <div class="container">
            <div class="hero-content">
                <span class="hero-subtitle">STUDIO DE CREAȚIE FOTOGRAFICĂ &bull; BESPOKE ALBUM</span>
                <h1>Generatorul Interactiv de Albume</h1>
                <p class="hero-desc">
                    Personalizează fiecare detaliu al lookbook-ului tău: alege tema cromatică a coperții, tiparul nobiliar, selectează piese din garderoba Ralph Lauren sau încarcă fotografii proprii.
                </p>
            </div>
        </div>
    </section>

    <section class="container">
        <div class="studio-layout">
            <!-- Panoul de configurare (Stânga) -->
            <aside class="studio-sidebar">
                <!-- Pasul 1: Identitate & Copertă -->
                <div class="studio-step-title">
                    <span class="step-num">1</span>
                    <span>Identitate &amp; Copertă Album</span>
                </div>

                <div class="form-group">
                    <label for="albumTitlu">Titlu Album Foto *</label>
                    <input type="text" id="albumTitlu" class="form-control" placeholder="ex: Toamna în Cotswolds">
                </div>

                <div class="form-group">
                    <label for="albumSubtitlu">Subtitlu / Ediție</label>
                    <input type="text" id="albumSubtitlu" class="form-control" placeholder="ex: Lookbook Vintage Ralph Lauren">
                </div>

                <div class="form-group">
                    <label for="albumCurator">Nume Curator / Autor</label>
                    <input type="text" id="albumCurator" class="form-control" placeholder="ex: Cozma Petru">
                </div>

                <div class="form-group">
                    <label>Temă Cromatică Copertă</label>
                    <div class="theme-picker">
                        <div class="theme-swatch theme-emerald active" data-theme="racing-green" title="British Racing Green">Verde</div>
                        <div class="theme-swatch theme-navy" data-theme="navy" title="Regal Navy Blue">Bleumarin</div>
                        <div class="theme-swatch theme-burgundy" data-theme="burgundy" title="Imperial Burgundy">Bordo</div>
                        <div class="theme-swatch theme-camel" data-theme="camel" title="Saddle Brown">Cafeniu</div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="albumTipar">Tipografie &amp; Font Titlu</label>
                    <select id="albumTipar" class="form-control">
                        <option value="Cinzel">Cinzel (Clasic Regal Majuscul)</option>
                        <option value="Playfair Display">Playfair Display (Editorial Vogue)</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="albumDescriere">Prefață / Notă Editorială</label>
                    <textarea id="albumDescriere" rows="2" class="form-control" placeholder="Scurtă descriere a esteticii și inspirației albumului..."></textarea>
                </div>

                <!-- Pasul 2: Selecție & Upload Fotografii -->
                <div class="studio-step-title" style="margin-top: 2rem;">
                    <span class="step-num">2</span>
                    <span>Fotografii în Album (<span id="selectedCountBadge">0</span>)</span>
                </div>

                <!-- Upload Foto Proprii Drag & Drop -->
                <div class="upload-dropzone" id="albumDropzone">
                    <div class="upload-icon">📷</div>
                    <div style="font-size: 0.9rem; font-weight: 600; color: var(--emerald-primary);">
                        Încarcă Fotografii Proprii
                    </div>
                    <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">
                        Trage imaginile aici sau apasă pentru a alege din calculator (JPG, PNG)
                    </div>
                    <input type="file" id="albumFileInput" accept="image/*">
                </div>

                <div class="form-group">
                    <label>Alege din Garderoba Old Money (Apasă pe imagini):</label>
                    <div id="wardrobeSelector" class="wardrobe-selector">
                        <!-- Populat dinamic -->
                    </div>
                </div>

                <div class="form-group">
                    <label>Ordine Planșe Selectate:</label>
                    <div id="selectedItemsList" style="max-height: 220px; overflow-y: auto;">
                        <!-- Populat dinamic -->
                    </div>
                </div>

                <!-- Pasul 3: Format Layout -->
                <div class="studio-step-title" style="margin-top: 2rem;">
                    <span class="step-num">3</span>
                    <span>Stil Prezentare Paginare</span>
                </div>

                <div class="layout-picker" style="margin-bottom: 1.5rem;">
                    <div class="layout-opt active" data-layout="lookbook">
                        📖 Lookbook Editorial
                    </div>
                    <div class="layout-opt" data-layout="masonry">
                        🏛 Mozaic Masonry
                    </div>
                    <div class="layout-opt" data-layout="polaroid">
                        🎞 Polaroid Vintage
                    </div>
                    <div class="layout-opt" data-layout="grid">
                        ▦ Grilă Clasic 3x4
                    </div>
                </div>

                <!-- Acțiuni Finale Studio -->
                <div style="display: flex; flex-direction: column; gap: 0.6rem;">
                    <button id="btnSaveAlbum" class="btn btn-gold" style="width: 100%;">
                        <span>💾 Salvează în Albumele Mele</span>
                    </button>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                        <button id="btnPrintAlbum" class="btn btn-outline" style="width: 100%;" title="Exportă ca PDF sau tipărește">
                            <span>🖨 Tipar / PDF</span>
                        </button>
                        <button id="btnExportJson" class="btn btn-outline" style="width: 100%;" title="Descarcă fișier JSON">
                            <span>📥 JSON</span>
                        </button>
                    </div>
                    <button id="btnOrderAlbumBook" class="btn btn-primary" style="width: 100%; margin-top: 0.5rem;">
                        <span>📖 Comandă Volum Fizic de Lux</span>
                    </button>
                </div>
            </aside>

            <!-- Scena de Previzualizare în Timp Real (Dreapta) -->
            <section class="album-preview-stage">
                <div class="preview-toolbar">
                    <div style="display: flex; align-items: center; gap: 0.6rem;">
                        <img src="images/crest.svg" style="width: 24px; height: 24px;">
                        <span style="font-family: var(--font-heading); font-size: 0.95rem; font-weight: 700; color: var(--emerald-primary);">
                            PREVIZUALIZARE ALBUM EDITORIAL
                        </span>
                    </div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">
                        Actualizare în timp real &bull; Mod Tipar Activ
                    </div>
                </div>

                <!-- Zona unde se randează albumul -->
                <div id="albumPreviewStage">
                    <!-- Populat dinamic de js/generator.js -->
                </div>
            </section>
        </div>
    </section>
</main>

<script src="js/generator.js"></script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
