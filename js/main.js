/**
 * Main JS - Funcționalități comune, Notificări Toast & Lightbox de Lux
 * Studiu Individual 2 - Cozma Petru
 */

// Formatare valută
function formatLei(numar) {
    if (isNaN(numar)) return "0 lei";
    return Number(numar).toLocaleString("ro-RO", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " lei";
}

function formatEur(numar) {
    if (isNaN(numar)) return "0 €";
    return "€" + Number(numar).toLocaleString("ro-RO", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

// Sistem de Notificări Toast
function showToast(mesaj, tip = "info") {
    let container = document.getElementById("toastContainer");
    if (!container) {
        container = document.createElement("div");
        container.id = "toastContainer";
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast-msg toast-${tip}`;
    toast.innerHTML = `
        <span style="color: var(--gold-light);">✦</span>
        <span>${mesaj}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(100%)";
        toast.style.transition = "all 0.3s ease";
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// Meniu Mobil Responsive
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            mainNav.classList.toggle("open");
        });
    }

    // Inițializare Lightbox Global
    initGlobalLightbox();
    updateHeaderCounters();
});

// Actualizare contoare în header (nr. albume, ținute)
function updateHeaderCounters() {
    const albumeCount = document.getElementById("navAlbumsCount");
    if (albumeCount) {
        const albume = StorageManager.getAlbume();
        albumeCount.textContent = albume.length;
    }
}

// ==========================================================================
// LIGHTBOX GLOBAL DE PREZENTARE VESTIMENTARĂ
// ==========================================================================
let currentLightboxList = [];
let currentLightboxIndex = 0;

function initGlobalLightbox() {
    if (document.getElementById("globalLightbox")) return;

    const lbHtml = `
    <div id="globalLightbox" class="lightbox-overlay" aria-hidden="true">
        <div class="lightbox-modal">
            <button class="lightbox-close" id="lbClose" aria-label="Închide">&times;</button>
            <div class="lightbox-media">
                <img id="lbImage" src="" alt="Ținută Old Money">
            </div>
            <div class="lightbox-info">
                <div id="lbCategory" class="card-category">RALPH LAUREN COLLECTION</div>
                <h2 id="lbTitle" class="serif-title" style="margin-bottom: 0.5rem;">Denumire Piesă</h2>
                <div id="lbMaterial" class="card-material">100% Lână Virgină</div>
                <p id="lbDescription" style="margin: 1rem 0; font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary);"></p>
                <div class="card-price-row" style="margin-top: 1rem; border-top: 1px solid var(--border-beige); padding-top: 1rem;">
                    <div>
                        <div id="lbPrice" class="price-main">0 lei</div>
                        <div id="lbPriceEur" class="price-eur">€0</div>
                    </div>
                    <button id="lbAddToAlbumBtn" class="btn btn-gold btn-sm">
                        <span>+ Adaugă în Album</span>
                    </button>
                </div>
            </div>
            <button class="lightbox-nav-btn lightbox-prev" id="lbPrev" aria-label="Anterior">&#8249;</button>
            <button class="lightbox-nav-btn lightbox-next" id="lbNext" aria-label="Următor">&#8250;</button>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML("beforeend", lbHtml);

    const overlay = document.getElementById("globalLightbox");
    const closeBtn = document.getElementById("lbClose");
    const prevBtn = document.getElementById("lbPrev");
    const nextBtn = document.getElementById("lbNext");

    closeBtn.onclick = closeLightbox;
    overlay.onclick = (e) => {
        if (e.target === overlay) closeLightbox();
    };

    prevBtn.onclick = () => navigateLightbox(-1);
    nextBtn.onclick = () => navigateLightbox(1);

    document.addEventListener("keydown", (e) => {
        if (!overlay.classList.contains("active")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") navigateLightbox(-1);
        if (e.key === "ArrowRight") navigateLightbox(1);
    });

    const addBtn = document.getElementById("lbAddToAlbumBtn");
    addBtn.onclick = () => {
        const item = currentLightboxList[currentLightboxIndex];
        if (item) {
            adaugainAlbumRapid(item.id);
        }
    };
}

function openLightbox(list, index) {
    currentLightboxList = list;
    currentLightboxIndex = index;
    renderLightboxItem();
    const overlay = document.getElementById("globalLightbox");
    overlay.classList.add("active");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    const overlay = document.getElementById("globalLightbox");
    if (!overlay) return;
    overlay.classList.remove("active");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

function navigateLightbox(direction) {
    if (!currentLightboxList.length) return;
    currentLightboxIndex = (currentLightboxIndex + direction + currentLightboxList.length) % currentLightboxList.length;
    renderLightboxItem();
}

function renderLightboxItem() {
    const item = currentLightboxList[currentLightboxIndex];
    if (!item) return;

    document.getElementById("lbImage").src = item.img || "images/placeholder-fashion.svg";
    document.getElementById("lbCategory").textContent = (item.categorie || "OLD MONEY") + (item.sezon ? ` • ${item.sezon}` : "");
    document.getElementById("lbTitle").textContent = item.nume;
    document.getElementById("lbMaterial").textContent = item.material || item.stil || "Colecție Signature";
    document.getElementById("lbDescription").textContent = item.descriere || "O piesă de referință cu tăietură clasică pentru garderoba atemporală.";
    document.getElementById("lbPrice").textContent = formatLei(item.pret);
    document.getElementById("lbPriceEur").textContent = formatEur(item.pretEur || Math.round(item.pret / 5));
}

// Adăugare rapidă într-un album draft
function adaugainAlbumRapid(produsId) {
    let draft = StorageManager.get(STORAGE_KEYS.DRAFT_ALBUM, {
        titlu: "Albumul Meu Old Money",
        subtitlu: "Lookbook Personalizat Ralph Lauren",
        curator: "Curator Independent",
        tema: "racing-green",
        layout: "lookbook",
        tipar: "Cinzel",
        elemente: []
    });

    if (!draft.elemente.includes(produsId)) {
        draft.elemente.push(produsId);
        StorageManager.set(STORAGE_KEYS.DRAFT_ALBUM, draft);
        showToast("Ținuta a fost adăugată în albumul tău curent!", "success");
    } else {
        showToast("Această ținută se află deja în albumul tău curent.", "info");
    }
}
