/**
 * Generator JS - Motorul Interactiv pentru Generarea Albumelor Foto
 * Studiu Individual 2 - Cozma Petru
 */

let draftAlbum = {
    id: "alb-" + Date.now(),
    titlu: "Toamna în Conacul Englezesc",
    subtitlu: "Colecția Vintage & Stil Ralph Lauren",
    curator: "Cozma Petru",
    dataCreare: new Date().toISOString().split("T")[0],
    tema: "racing-green",
    tipar: "Cinzel",
    layout: "lookbook",
    copertaImg: "",
    descriere: "Un album foto dedicat eleganței clasice, hainelor din lână Harris Tweed, cașmirului și stilului de viață aristocratic.",
    elemente: [1, 2, 3, 5] // ID-uri sau obiecte foto personalizate
};

// Încărcare date la inițializare
document.addEventListener("DOMContentLoaded", () => {
    // Verifică dacă edităm un album existent din URL (ex: generator.html?edit=alb-01)
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get("edit");
    if (editId) {
        const gasit = StorageManager.getAlbumById(editId);
        if (gasit) {
            draftAlbum = JSON.parse(JSON.stringify(gasit));
            showToast(`Albumul "${draftAlbum.titlu}" a fost încărcat pentru editare.`, "info");
        }
    } else {
        // Încarcă draftul salvat dacă există
        const salvat = StorageManager.get(STORAGE_KEYS.DRAFT_ALBUM, null);
        if (salvat && salvat.elemente && salvat.elemente.length) {
            draftAlbum = salvat;
        }
    }

    initControls();
    renderWardrobeSelector();
    renderSelectedList();
    renderPreview();
});

// Inițializare controale formular
function initControls() {
    const inputTitlu = document.getElementById("albumTitlu");
    const inputSubtitlu = document.getElementById("albumSubtitlu");
    const inputCurator = document.getElementById("albumCurator");
    const selectTipar = document.getElementById("albumTipar");
    const txtDescriere = document.getElementById("albumDescriere");

    if (inputTitlu) {
        inputTitlu.value = draftAlbum.titlu || "";
        inputTitlu.addEventListener("input", (e) => {
            draftAlbum.titlu = e.target.value.trim() || "Album Fără Titlu";
            syncDraft();
            renderPreview();
        });
    }

    if (inputSubtitlu) {
        inputSubtitlu.value = draftAlbum.subtitlu || "";
        inputSubtitlu.addEventListener("input", (e) => {
            draftAlbum.subtitlu = e.target.value.trim();
            syncDraft();
            renderPreview();
        });
    }

    if (inputCurator) {
        inputCurator.value = draftAlbum.curator || "";
        inputCurator.addEventListener("input", (e) => {
            draftAlbum.curator = e.target.value.trim() || "Curator Anonim";
            syncDraft();
            renderPreview();
        });
    }

    if (selectTipar) {
        selectTipar.value = draftAlbum.tipar || "Cinzel";
        selectTipar.addEventListener("change", (e) => {
            draftAlbum.tipar = e.target.value;
            syncDraft();
            renderPreview();
        });
    }

    if (txtDescriere) {
        txtDescriere.value = draftAlbum.descriere || "";
        txtDescriere.addEventListener("input", (e) => {
            draftAlbum.descriere = e.target.value.trim();
            syncDraft();
            renderPreview();
        });
    }

    // Swatches Temă
    document.querySelectorAll(".theme-swatch").forEach(swatch => {
        swatch.classList.toggle("active", swatch.dataset.theme === draftAlbum.tema);
        swatch.addEventListener("click", () => {
            document.querySelectorAll(".theme-swatch").forEach(s => s.classList.remove("active"));
            swatch.classList.add("active");
            draftAlbum.tema = swatch.dataset.theme;
            syncDraft();
            renderPreview();
        });
    });

    // Butoane Layout
    document.querySelectorAll(".layout-opt").forEach(opt => {
        opt.classList.toggle("active", opt.dataset.layout === draftAlbum.layout);
        opt.addEventListener("click", () => {
            document.querySelectorAll(".layout-opt").forEach(o => o.classList.remove("active"));
            opt.classList.add("active");
            draftAlbum.layout = opt.dataset.layout;
            syncDraft();
            renderPreview();
        });
    });

    // Drag and Drop Upload Zonă
    const dropzone = document.getElementById("albumDropzone");
    const fileInput = document.getElementById("albumFileInput");

    if (dropzone && fileInput) {
        dropzone.addEventListener("click", () => fileInput.click());

        dropzone.addEventListener("dragover", (e) => {
            e.preventDefault();
            dropzone.style.borderColor = "var(--gold-primary)";
            dropzone.style.background = "rgba(197, 160, 89, 0.2)";
        });

        dropzone.addEventListener("dragleave", () => {
            dropzone.style.borderColor = "";
            dropzone.style.background = "";
        });

        dropzone.addEventListener("drop", async (e) => {
            e.preventDefault();
            dropzone.style.borderColor = "";
            dropzone.style.background = "";
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                await adaugaFotoProprie(e.dataTransfer.files[0]);
            }
        });

        fileInput.addEventListener("change", async (e) => {
            if (e.target.files && e.target.files[0]) {
                await adaugaFotoProprie(e.target.files[0]);
                e.target.value = "";
            }
        });
    }

    // Butoane acțiune principale
    const btnSave = document.getElementById("btnSaveAlbum");
    if (btnSave) btnSave.addEventListener("click", salveazaAlbumulInColecie);

    const btnPrint = document.getElementById("btnPrintAlbum");
    if (btnPrint) btnPrint.addEventListener("click", () => window.print());

    const btnJson = document.getElementById("btnExportJson");
    if (btnJson) btnJson.addEventListener("click", exportaJson);

    const btnOrder = document.getElementById("btnOrderAlbumBook");
    if (btnOrder) {
        btnOrder.addEventListener("click", () => {
            // Salvează mai întâi
            StorageManager.saveAlbum(draftAlbum);
            // Redirecționează către pagina de comenzi
            const targetPage = window.location.pathname.endsWith(".php") ? "comenzi.php" : "comenzi.html";
            window.location.href = `${targetPage}?albumId=${draftAlbum.id}`;
        });
    }
}

// Sincronizare draft curent în LocalStorage
function syncDraft() {
    StorageManager.set(STORAGE_KEYS.DRAFT_ALBUM, draftAlbum);
}

// Încărcare fotografie proprie a utilizatorului cu compresie automată Canvas
async function adaugaFotoProprie(file) {
    try {
        showToast("Se optimizează fotografia...", "info");
        const b64 = await StorageManager.optimizeImage(file, 900, 0.85);
        if (!b64) return;

        const customId = "foto-" + Date.now();
        const customItem = {
            id: customId,
            nume: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ") || "Ținută Personalizată",
            categorie: "Încărcare Proprie",
            stil: "Old Money Aesthetic",
            material: "Colecție Privată",
            descriere: "Fotografie încărcată de utilizator pentru acest album foto.",
            pret: 0,
            img: b64
        };

        // Salvează și în lista generală de produse/fotografii
        StorageManager.saveProdus(customItem);
        // Adaugă în album
        draftAlbum.elemente.push(customId);
        syncDraft();
        renderWardrobeSelector();
        renderSelectedList();
        renderPreview();
        showToast("Fotografia ta a fost adăugată în album!", "success");
    } catch (err) {
        console.error(err);
        alert("Eroare la procesarea fotografiei. Încercați o altă imagine.");
    }
}

// Randare selector de piese din garderoba disponibilă
function renderWardrobeSelector() {
    const container = document.getElementById("wardrobeSelector");
    if (!container) return;

    const produse = StorageManager.getProduse();
    container.innerHTML = produse.map(p => {
        const isSelected = draftAlbum.elemente.includes(p.id);
        return `
            <div class="wardrobe-thumb ${isSelected ? 'selected' : ''}" 
                 data-id="${p.id}" 
                 title="${p.nume} (${p.categorie})">
                <img src="${p.img || 'images/placeholder-fashion.svg'}" alt="${p.nume}" loading="lazy">
            </div>
        `;
    }).join("");

    container.querySelectorAll(".wardrobe-thumb").forEach(thumb => {
        thumb.addEventListener("click", () => {
            const id = isNaN(thumb.dataset.id) ? thumb.dataset.id : Number(thumb.dataset.id);
            toggleElementInAlbum(id);
        });
    });
}

function toggleElementInAlbum(id) {
    const idx = draftAlbum.elemente.indexOf(id);
    if (idx >= 0) {
        draftAlbum.elemente.splice(idx, 1);
    } else {
        draftAlbum.elemente.push(id);
    }
    syncDraft();
    renderWardrobeSelector();
    renderSelectedList();
    renderPreview();
}

// Randare listă piese selectate cu opțiuni de reordonare și editare subtitlu
function renderSelectedList() {
    const container = document.getElementById("selectedItemsList");
    const countBadge = document.getElementById("selectedCountBadge");
    if (!container) return;

    if (countBadge) countBadge.textContent = draftAlbum.elemente.length;

    if (draftAlbum.elemente.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 1.5rem; color: var(--text-muted); font-size: 0.9rem;">
                Nicio fotografie selectată încă.<br>
                Alege fotografii din garderoba de mai sus sau încarcă poze proprii.
            </div>
        `;
        return;
    }

    const produse = StorageManager.getProduse();
    container.innerHTML = draftAlbum.elemente.map((id, index) => {
        const p = produse.find(item => item.id == id) || {
            id, nume: "Fotografie Personalizată", img: "images/placeholder-fashion.svg", categorie: "Old Money"
        };
        return `
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.6rem; padding: 0.5rem; background: var(--bg-cream); border: 1px solid var(--border-beige); border-radius: var(--radius-sm); margin-bottom: 0.4rem;">
                <img src="${p.img || 'images/placeholder-fashion.svg'}" style="width: 36px; height: 46px; object-fit: cover; border-radius: 2px;">
                <div style="flex: 1; min-width: 0;">
                    <div style="font-size: 0.82rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p.nume}</div>
                    <div style="font-size: 0.72rem; color: var(--gold-dim);">${p.categorie}</div>
                </div>
                <div style="display: flex; gap: 0.2rem;">
                    <button type="button" class="btn btn-outline btn-sm" onclick="moveElement(${index}, -1)" title="Mută mai sus" ${index === 0 ? 'disabled style="opacity:0.3"' : ''}>↑</button>
                    <button type="button" class="btn btn-outline btn-sm" onclick="moveElement(${index}, 1)" title="Mută mai jos" ${index === draftAlbum.elemente.length - 1 ? 'disabled style="opacity:0.3"' : ''}>↓</button>
                    <button type="button" class="btn btn-outline btn-sm" onclick="removeElement(${index})" style="color: var(--danger-red); border-color: var(--danger-red);" title="Elimină">&times;</button>
                </div>
            </div>
        `;
    }).join("");
}

// Mutare element în sus sau în jos în ordinea albumului
window.moveElement = function(index, dir) {
    const newIdx = index + dir;
    if (newIdx < 0 || newIdx >= draftAlbum.elemente.length) return;
    const temp = draftAlbum.elemente[index];
    draftAlbum.elemente[index] = draftAlbum.elemente[newIdx];
    draftAlbum.elemente[newIdx] = temp;
    syncDraft();
    renderSelectedList();
    renderPreview();
};

window.removeElement = function(index) {
    draftAlbum.elemente.splice(index, 1);
    syncDraft();
    renderWardrobeSelector();
    renderSelectedList();
    renderPreview();
};

// ==========================================================================
// PREVIZUALIZARE ALBUM ÎN TIMP REAL
// ==========================================================================
function renderPreview() {
    const stage = document.getElementById("albumPreviewStage");
    if (!stage) return;

    const themeColors = {
        "racing-green": { bg: "#122d21", text: "#dfb76c" },
        "navy": { bg: "#0c1926", text: "#dfb76c" },
        "burgundy": { bg: "#5b1d27", text: "#f4ede1" },
        "camel": { bg: "#6e472b", text: "#fbf8f2" }
    };

    const currentTheme = themeColors[draftAlbum.tema] || themeColors["racing-green"];
    const fontClass = draftAlbum.tipar === "Playfair Display" ? "font-editorial" : "font-heading";

    // Preluare produse selectate
    const toateProdusele = StorageManager.getProduse();
    const elementeDetaliate = draftAlbum.elemente.map(id => {
        return toateProdusele.find(p => p.id == id) || {
            id,
            nume: "Fotografie Elegance",
            categorie: "Old Money Style",
            material: "Custom Collection",
            descriere: "O captură vestimentară nobilă.",
            img: "images/placeholder-fashion.svg"
        };
    });

    let layoutHtml = "";

    if (draftAlbum.layout === "lookbook") {
        layoutHtml = `
            <div class="album-pages-container layout-lookbook">
                ${elementeDetaliate.map((p, idx) => `
                    <div class="lookbook-spread">
                        <div class="spread-image">
                            <img src="${p.img || 'images/placeholder-fashion.svg'}" alt="${p.nume}">
                        </div>
                        <div class="spread-info">
                            <div class="spread-plate-no">PLANȘA N°. ${String(idx + 1).padStart(2, '0')}</div>
                            <h3 class="spread-title" style="font-family: '${draftAlbum.tipar}', serif;">${p.nume}</h3>
                            <p class="spread-desc">${p.descriere || 'Rafinament atemporal prin detalii impecabile și țesături alese manual.'}</p>
                            <div class="spread-details">
                                <div><strong>Material:</strong> ${p.material || 'Lână & Cașmir de lux'}</div>
                                <div><strong>Stil:</strong> ${p.stil || p.categorie}</div>
                                ${p.pret > 0 ? `<div><strong>Valoare de arhivă:</strong> ${formatLei(p.pret)}</div>` : ''}
                            </div>
                        </div>
                    </div>
                `).join("")}
            </div>
        `;
    } else if (draftAlbum.layout === "masonry") {
        layoutHtml = `
            <div class="album-pages-container layout-masonry">
                ${elementeDetaliate.map((p, idx) => `
                    <div class="masonry-item">
                        <img src="${p.img || 'images/placeholder-fashion.svg'}" alt="${p.nume}">
                        <div class="masonry-caption">
                            <strong style="display:block; font-family: '${draftAlbum.tipar}', serif;">${p.nume}</strong>
                            <small style="color: var(--text-muted);">${p.categorie} • Planșa #${idx + 1}</small>
                        </div>
                    </div>
                `).join("")}
            </div>
        `;
    } else if (draftAlbum.layout === "polaroid") {
        layoutHtml = `
            <div class="album-pages-container layout-polaroid">
                ${elementeDetaliate.map((p, idx) => `
                    <div class="polaroid-card">
                        <img src="${p.img || 'images/placeholder-fashion.svg'}" alt="${p.nume}">
                        <div class="polaroid-caption">
                            <strong>${p.nume}</strong><br>
                            <span style="font-size: 0.8rem; color: var(--gold-dim); font-style: italic;">${p.categorie}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        `;
    } else { // layout-grid
        layoutHtml = `
            <div class="album-pages-container layout-grid">
                ${elementeDetaliate.map((p, idx) => `
                    <div class="grid-photo-card">
                        <img src="${p.img || 'images/placeholder-fashion.svg'}" alt="${p.nume}">
                        <div class="grid-photo-info">
                            <h4 style="font-size: 1rem; margin-bottom: 0.2rem; font-family: '${draftAlbum.tipar}', serif;">${p.nume}</h4>
                            <div style="font-size: 0.78rem; color: var(--gold-dim);">${p.categorie}</div>
                        </div>
                    </div>
                `).join("")}
            </div>
        `;
    }

    stage.innerHTML = `
        <div class="album-cover-display" style="background: ${currentTheme.bg}; color: ${currentTheme.text};">
            <img src="images/crest.svg" alt="Crest Heraldic" class="cover-crest">
            <div style="font-size: 0.75rem; letter-spacing: 0.25em; text-transform: uppercase; margin-bottom: 0.8rem; opacity: 0.85;">
                HERITAGE &amp; POLO • BESPOKE ARCHIVE
            </div>
            <h1 class="cover-title" style="font-family: '${draftAlbum.tipar}', serif;">${draftAlbum.titlu}</h1>
            <div class="cover-subtitle">${draftAlbum.subtitlu || ''}</div>
            <div style="width: 80px; height: 1px; background: var(--gold-primary); margin: 1.2rem auto;"></div>
            <div class="cover-curator">Curator: <strong>${draftAlbum.curator}</strong> • ${draftAlbum.dataCreare}</div>
        </div>

        ${draftAlbum.descriere ? `
            <div style="max-width: 650px; margin: 0 auto 2.5rem; text-align: center; font-family: var(--font-editorial); font-style: italic; font-size: 1.1rem; color: var(--text-secondary); line-height: 1.7;">
                "${draftAlbum.descriere}"
            </div>
        ` : ''}

        ${elementeDetaliate.length > 0 ? layoutHtml : `
            <div style="text-align: center; padding: 4rem 1rem; border: 2px dashed var(--border-beige); border-radius: var(--radius-md);">
                <p style="font-size: 1.1rem; color: var(--text-muted); margin-bottom: 1rem;">
                    Albumul tău nu are încă fotografii adăugate.
                </p>
                <p style="font-size: 0.9rem; color: var(--text-secondary);">
                    Selectează piese vestimentare din panoul din stânga pentru a construi lookbook-ul.
                </p>
            </div>
        `}
    `;
}

// Salvare album în biblioteca permanentă "Albumele Mele"
function salveazaAlbumulInColecie() {
    if (!draftAlbum.titlu) {
        alert("Vă rugăm să introduceți un titlu pentru album.");
        return;
    }
    if (draftAlbum.elemente.length === 0) {
        alert("Adăugați cel puțin o fotografie în album înainte de salvare.");
        return;
    }

    // Stabilire copertă (prima fotografie din album dacă nu e setată)
    const toateProdusele = StorageManager.getProduse();
    const prima = toateProdusele.find(p => p.id == draftAlbum.elemente[0]);
    if (prima && prima.img) {
        draftAlbum.copertaImg = prima.img;
    }

    StorageManager.saveAlbum(draftAlbum);
    showToast(`Albumul "${draftAlbum.titlu}" a fost salvat cu succes în colecțiile tale!`, "success");
    updateHeaderCounters();
}

// Export fișier JSON al albumului
function exportaJson() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(draftAlbum, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `album-${draftAlbum.titlu.toLowerCase().replace(/[^a-z0-9]/g, "-")}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Fișierul JSON al albumului a fost descărcat.", "info");
}
