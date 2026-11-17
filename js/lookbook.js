/**
 * Lookbook JS - Vizualizator Colecții & Albume Salvate
 * Studiu Individual 2 - Cozma Petru
 */

let viewerAlbum = null;
let viewerCurrentPageIndex = 0;
let slideshowInterval = null;

document.addEventListener("DOMContentLoaded", () => {
    renderAlbumsList();
    initViewerModal();
    initImportJson();
});

// Randare listă de albume salvate
function renderAlbumsList() {
    const container = document.getElementById("albumsGridContainer");
    if (!container) return;

    const albume = StorageManager.getAlbume();
    const produse = StorageManager.getProduse();

    if (albume.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: #fff; border: 1px solid var(--border-beige); border-radius: var(--radius-md);">
                <p style="font-size: 1.15rem; color: var(--text-muted); margin-bottom: 1.2rem;">
                    Nu există încă niciun album foto salvat.
                </p>
                <a href="${isPhp() ? 'generator.php' : 'generator.html'}" class="btn btn-gold">
                    <span>+ Creează primul tău album Old Money</span>
                </a>
            </div>
        `;
        return;
    }

    container.innerHTML = albume.map(a => {
        // Obține copertă sau prima fotografie
        let coverImg = a.copertaImg;
        if (!coverImg && a.elemente && a.elemente.length) {
            const p = produse.find(item => item.id == a.elemente[0]);
            if (p) coverImg = p.img;
        }
        if (!coverImg) coverImg = "images/placeholder-fashion.svg";

        return `
            <div class="fashion-card album-card" data-id="${a.id}">
                <div class="card-media" onclick="openAlbumViewer('${a.id}')">
                    <img src="${coverImg}" alt="${a.titlu}" loading="lazy">
                    <span class="card-badge">${a.elemente ? a.elemente.length : 0} Fotografii</span>
                    <span class="card-stock" style="background: rgba(18, 45, 33, 0.85); color: var(--gold-light);">
                        ${a.tipar || 'Cinzel'}
                    </span>
                </div>
                <div class="card-body">
                    <div class="card-category">CURATOR: ${a.curator || 'HERITAGE ATELIER'}</div>
                    <h3 class="card-title" onclick="openAlbumViewer('${a.id}')" style="cursor: pointer;">
                        ${a.titlu}
                    </h3>
                    <p class="card-material" style="margin-bottom: 0.8rem;">
                        ${a.subtitlu || 'Ediție Signature Old Money'}
                    </p>
                    <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem;">
                        Creat la: ${a.dataCreare || 'Arhivă'} • Format: ${a.layout ? a.layout.toUpperCase() : 'LOOKBOOK'}
                    </div>
                    <div class="card-actions" style="margin-top: auto; display: flex; flex-wrap: wrap; gap: 0.4rem;">
                        <button class="btn btn-primary btn-sm" onclick="openAlbumViewer('${a.id}')" style="flex: 1;">
                            <span>👁 Răsfoiește</span>
                        </button>
                        <a href="${isPhp() ? 'generator.php' : 'generator.html'}?edit=${a.id}" class="btn btn-outline btn-sm" title="Editează în generator">
                            ✎
                        </a>
                        <a href="${isPhp() ? 'comenzi.php' : 'comenzi.html'}?albumId=${a.id}" class="btn btn-gold btn-sm" title="Comandă tipărire fizică">
                            📖 Comandă
                        </a>
                        <button class="btn btn-outline btn-sm" onclick="stergeAlbum('${a.id}')" style="color: var(--danger-red); border-color: var(--border-beige);" title="Șterge album">
                            🗑
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join("");
}

function isPhp() {
    return window.location.pathname.endsWith(".php");
}

// Ștergere album
window.stergeAlbum = function(id) {
    if (confirm("Sigur doriți să ștergeți acest album foto din colecție?")) {
        StorageManager.deleteAlbum(id);
        renderAlbumsList();
        updateHeaderCounters();
        showToast("Albumul a fost șters.", "info");
    }
};

// ==========================================================================
// MODAL VIZUALIZATOR INTERACTIV DE ALBUM (LOOKBOOK FLIP / SLIDESHOW)
// ==========================================================================
function initViewerModal() {
    if (document.getElementById("albumViewerModal")) return;

    const modalHtml = `
    <div id="albumViewerModal" class="lightbox-overlay" style="padding: 1rem;" aria-hidden="true">
        <div style="position: relative; width: 100%; max-width: 1100px; height: 92vh; background: #ffffff; border-radius: var(--radius-md); border: 2px solid var(--gold-primary); display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 25px 60px rgba(0,0,0,0.45);">
            <!-- Bara de sus a vizualizatorului -->
            <div style="background: var(--emerald-dark); color: var(--gold-light); padding: 0.8rem 1.5rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-gold);">
                <div style="display: flex; align-items: center; gap: 0.8rem;">
                    <img src="images/crest.svg" style="width: 28px; height: 28px;">
                    <div>
                        <div id="viewAlbumTitle" style="font-family: var(--font-heading); font-size: 1.05rem; font-weight: 700;">Titlu Album</div>
                        <div id="viewAlbumMeta" style="font-size: 0.75rem; color: rgba(255,255,255,0.7);">Curator &bull; Data</div>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 0.8rem;">
                    <button id="viewSlideshowToggle" class="btn btn-outline-gold btn-sm">▶ Slideshow</button>
                    <button id="viewPrintBtn" class="btn btn-gold btn-sm">🖨 Tipărește</button>
                    <button id="viewCloseBtn" style="background: none; border: none; color: #fff; font-size: 1.8rem; cursor: pointer; line-height: 1;">&times;</button>
                </div>
            </div>

            <!-- Zona centrală a paginii curente -->
            <div id="viewerPageContent" style="flex: 1; overflow-y: auto; padding: 2rem; display: flex; align-items: center; justify-content: center; background: var(--bg-cream);">
                <!-- Se injectează dinamic pagina curentă -->
            </div>

            <!-- Bara inferioară de paginare -->
            <div style="background: #ffffff; border-top: 1px solid var(--border-beige); padding: 0.7rem 1.5rem; display: flex; align-items: center; justify-content: space-between;">
                <button id="viewPrevPage" class="btn btn-outline btn-sm">&#8592; Pagina Anterioară</button>
                <div id="viewPaginationText" style="font-family: var(--font-heading); font-size: 0.9rem; color: var(--emerald-primary); font-weight: 600;">
                    Copertă
                </div>
                <button id="viewNextPage" class="btn btn-outline btn-sm">Pagina Următoare &#8594;</button>
            </div>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHtml);

    document.getElementById("viewCloseBtn").onclick = closeAlbumViewer;
    document.getElementById("viewPrevPage").onclick = () => stepViewerPage(-1);
    document.getElementById("viewNextPage").onclick = () => stepViewerPage(1);
    document.getElementById("viewPrintBtn").onclick = () => window.print();

    const slideBtn = document.getElementById("viewSlideshowToggle");
    slideBtn.onclick = () => {
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
            slideshowInterval = null;
            slideBtn.textContent = "▶ Slideshow";
            showToast("Slideshow oprit.", "info");
        } else {
            slideshowInterval = setInterval(() => stepViewerPage(1), 3500);
            slideBtn.textContent = "⏸ Pauză";
            showToast("Slideshow pornit (schimbare la fiecare 3.5 secunde).", "info");
        }
    };

    document.addEventListener("keydown", (e) => {
        const modal = document.getElementById("albumViewerModal");
        if (!modal || !modal.classList.contains("active")) return;
        if (e.key === "Escape") closeAlbumViewer();
        if (e.key === "ArrowLeft") stepViewerPage(-1);
        if (e.key === "ArrowRight") stepViewerPage(1);
    });
}

window.openAlbumViewer = function(albumId) {
    const albume = StorageManager.getAlbume();
    viewerAlbum = albume.find(a => a.id == albumId);
    if (!viewerAlbum) return;

    viewerCurrentPageIndex = 0; // 0 = Copertă, 1..N = pagini
    const modal = document.getElementById("albumViewerModal");
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    document.getElementById("viewAlbumTitle").textContent = viewerAlbum.titlu;
    document.getElementById("viewAlbumMeta").textContent = `Curator: ${viewerAlbum.curator || 'Heritage'} • ${viewerAlbum.elemente.length} fotografii`;

    renderViewerCurrentPage();
};

function closeAlbumViewer() {
    const modal = document.getElementById("albumViewerModal");
    if (!modal) return;
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
        document.getElementById("viewSlideshowToggle").textContent = "▶ Slideshow";
    }
}

function stepViewerPage(direction) {
    if (!viewerAlbum) return;
    const totalPages = viewerAlbum.elemente.length + 1; // Copertă + imagini
    viewerCurrentPageIndex = (viewerCurrentPageIndex + direction + totalPages) % totalPages;
    renderViewerCurrentPage();
}

function renderViewerCurrentPage() {
    const content = document.getElementById("viewerPageContent");
    const pagText = document.getElementById("viewPaginationText");
    const totalPages = viewerAlbum.elemente.length + 1;

    if (viewerCurrentPageIndex === 0) {
        // Pagina de Copertă
        pagText.textContent = `Copertă (1 din ${totalPages})`;
        content.innerHTML = `
            <div style="width: 100%; max-width: 650px; background: var(--emerald-primary); color: var(--gold-light); padding: 4rem 2rem; text-align: center; border: 4px double var(--gold-primary); border-radius: var(--radius-sm); box-shadow: var(--shadow-elevated);">
                <img src="images/crest.svg" style="width: 75px; margin: 0 auto 1.5rem; display: block;">
                <div style="font-size: 0.8rem; letter-spacing: 0.25em; text-transform: uppercase; margin-bottom: 1rem; opacity: 0.85;">
                    HERITAGE &amp; POLO • BESPOKE ARCHIVE
                </div>
                <h1 style="color: var(--gold-light); font-size: 2.2rem; margin-bottom: 0.6rem; font-family: '${viewerAlbum.tipar || 'Cinzel'}', serif;">
                    ${viewerAlbum.titlu}
                </h1>
                <div style="font-family: var(--font-editorial); font-style: italic; font-size: 1.2rem; opacity: 0.9; margin-bottom: 2rem;">
                    ${viewerAlbum.subtitlu || 'Colecție Vintage de Lux'}
                </div>
                <div style="width: 80px; height: 1px; background: var(--gold-primary); margin: 1.5rem auto;"></div>
                <p style="font-size: 0.95rem; color: rgba(255,255,255,0.8); line-height: 1.6; max-width: 500px; margin: 0 auto 2rem;">
                    ${viewerAlbum.descriere || 'O cronică vizuală a eleganței atemporale.'}
                </p>
                <div style="font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.7);">
                    Curator: <strong>${viewerAlbum.curator}</strong> • Anul ${viewerAlbum.dataCreare || '2026'}
                </div>
            </div>
        `;
    } else {
        // Pagină cu fotografie din album
        const itemIdx = viewerCurrentPageIndex - 1;
        pagText.textContent = `Planșa ${itemIdx + 1} din ${viewerAlbum.elemente.length}`;

        const itemId = viewerAlbum.elemente[itemIdx];
        const produse = StorageManager.getProduse();
        const p = produse.find(x => x.id == itemId) || {
            nume: "Fotografie Personalizată",
            categorie: "Old Money Style",
            material: "Țesătură Fină",
            descriere: "O piesă deosebită din garderoba de referință.",
            img: "images/placeholder-fashion.svg"
        };

        content.innerHTML = `
            <div style="display: grid; grid-template-columns: 1.1fr 1fr; gap: 3rem; max-width: 900px; width: 100%; align-items: center; background: #fff; padding: 2.5rem; border-radius: var(--radius-sm); border: 1px solid var(--border-beige); box-shadow: var(--shadow-soft);">
                <div style="aspect-ratio: 4/5; overflow: hidden; border-radius: var(--radius-sm); border: 1px solid var(--border-beige); box-shadow: var(--shadow-soft);">
                    <img src="${p.img || 'images/placeholder-fashion.svg'}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div>
                    <div style="font-size: 0.8rem; letter-spacing: 0.15em; color: var(--gold-dim); text-transform: uppercase; font-weight: 700; margin-bottom: 0.5rem;">
                        PLANȘA N°. ${String(itemIdx + 1).padStart(2, '0')} &bull; ${p.categorie}
                    </div>
                    <h2 style="font-family: '${viewerAlbum.tipar || 'Cinzel'}', serif; font-size: 1.8rem; margin-bottom: 1rem; color: var(--emerald-primary);">
                        ${p.nume}
                    </h2>
                    <p style="font-family: var(--font-editorial); font-style: italic; font-size: 1.1rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem;">
                        "${p.descriere || 'Tăietură impecabilă inspirată din tradiția vestimentară aristocrată britanică.'}"
                    </p>
                    <div style="border-top: 1px solid var(--border-beige); padding-top: 1rem; font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">
                        <div><strong>Material Nobil:</strong> ${p.material || 'Lână & Cașmir natural'}</div>
                        <div><strong>Sezon / Stil:</strong> ${p.sezon || p.stil || 'Heritage'}</div>
                        ${p.pret > 0 ? `<div><strong>Preț Estimativ:</strong> ${formatLei(p.pret)} (${formatEur(p.pretEur || Math.round(p.pret/5))})</div>` : ''}
                    </div>
                </div>
            </div>
        `;
    }
}

// Import Album din fișier JSON
function initImportJson() {
    const importInput = document.getElementById("importJsonInput");
    if (!importInput) return;

    importInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const parsed = JSON.parse(event.target.result);
                if (!parsed.titlu || !parsed.elemente) {
                    alert("Fișierul JSON nu are structura unui album valid.");
                    return;
                }
                parsed.id = "alb-" + Date.now();
                StorageManager.saveAlbum(parsed);
                renderAlbumsList();
                updateHeaderCounters();
                showToast(`Albumul "${parsed.titlu}" a fost importat cu succes!`, "success");
            } catch (err) {
                alert("Eroare la parsarea fișierului JSON.");
            }
        };
        reader.readAsText(file);
        e.target.value = "";
    });
}
