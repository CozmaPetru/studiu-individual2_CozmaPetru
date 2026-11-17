<?php
$pageTitle = "Inventar Garderobă & Studio Foto — Heritage & Polo";
$activePage = "inventar";
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/data.php';
?>

<main>
    <section class="page-hero">
        <div class="container">
            <div class="hero-content">
                <span class="hero-subtitle">ARHIVARE &bull; GESTIUNE COLECȚII</span>
                <h1>Inventarul Garderobei &amp; Studio Foto</h1>
                <p class="hero-desc">
                    Adaugă piese vestimentare noi cu fotografii de înaltă rezoluție comprimate inteligent prin Canvas, actualizează stocurile și menține catalogul de ținute Old Money mereu la zi.
                </p>
            </div>
        </div>
    </section>

    <section class="container section-py">
        <!-- Formular Adăugare Piesă Nouă -->
        <div style="background: #ffffff; border: 1px solid var(--border-beige); border-radius: var(--radius-md); padding: 2rem; box-shadow: var(--shadow-soft); margin-bottom: 3rem;">
            <div style="display: flex; align-items: center; gap: 0.8rem; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-beige); padding-bottom: 1rem;">
                <img src="images/crest.svg" style="width: 32px; height: 32px;">
                <div>
                    <h2 style="font-size: 1.4rem; margin: 0;">Adaugă Piesă Vestimentară / Fotografie Nouă</h2>
                    <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">Completează specificațiile piesei pentru a fi disponibilă în Galerie și în Generatorul de Albume.</p>
                </div>
            </div>

            <form id="formAdaugaProdus">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.2rem; margin-bottom: 1.5rem;">
                    <div class="form-group">
                        <label for="invNume">Nume Piesă Vestimentară *</label>
                        <input type="text" id="invNume" name="nume" required placeholder="ex: Sacou din In Albastru Riviera">
                    </div>

                    <div class="form-group">
                        <label for="invCategorie">Categorie / Album Tematic *</label>
                        <input type="text" id="invCategorie" name="categorie" list="categoriiList" required placeholder="ex: Sacouri & Tweed">
                        <datalist id="categoriiList">
                            <option value="Sacouri & Tweed">
                            <option value="Tricotaje & Cămăși">
                            <option value="Paltoane & Trench-uri">
                            <option value="Eleganță & Black Tie">
                            <option value="Rochii & Siluete">
                            <option value="Stil Riviera & In">
                            <option value="Accesorii & Piele">
                        </datalist>
                    </div>

                    <div class="form-group">
                        <label for="invPret">Preț Estimativ (lei) *</label>
                        <input type="number" id="invPret" name="pret" min="1" step="10" required placeholder="ex: 1850">
                    </div>

                    <div class="form-group">
                        <label for="invStoc">Stoc Disponibil (buc.) *</label>
                        <input type="number" id="invStoc" name="stoc" min="0" required placeholder="ex: 8" value="5">
                    </div>

                    <div class="form-group">
                        <label for="invMaterial">Material Nobil</label>
                        <input type="text" id="invMaterial" name="material" placeholder="ex: 100% Lână Virgină sau Cașmir">
                    </div>

                    <div class="form-group">
                        <label for="invFoto">Fotografie Piesă *</label>
                        <input type="file" id="invFoto" name="foto" accept="image/*" style="padding: 0.4rem 0;">
                    </div>
                </div>

                <div class="form-group" style="margin-bottom: 1.5rem;">
                    <label for="invDescriere">Descriere Editorială / Recomandare de Stil</label>
                    <input type="text" id="invDescriere" name="descriere" placeholder="Scurtă notă despre croială, inspirație sau ocazie de purtare...">
                </div>

                <div style="display: flex; justify-content: flex-end; gap: 0.8rem;">
                    <button type="reset" class="btn btn-outline btn-sm">Resetează Câmpurile</button>
                    <button type="submit" class="btn btn-gold">
                        <span>+ Înregistrează în Garderobă</span>
                    </button>
                </div>
            </form>
        </div>

        <!-- Tabelul Inventarului Curent -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem;">
            <div>
                <h2 style="font-size: 1.5rem; margin: 0;">Garderoba Curentă &amp; Fotografii de Arhivă</h2>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">Modifică stocul direct în căsuțele numerice (salvare automată).</p>
            </div>
            <div class="search-box" style="min-width: 240px;">
                <span class="search-icon">🔍</span>
                <input type="text" id="inventarSearchInput" placeholder="Filtrează inventarul...">
            </div>
        </div>

        <div class="table-responsive">
            <table class="luxury-table" id="tabelInventar">
                <thead>
                    <tr>
                        <th style="width: 70px;">Foto</th>
                        <th>Denumire Piesă &amp; Cod</th>
                        <th>Categorie</th>
                        <th>Material</th>
                        <th>Preț</th>
                        <th style="width: 110px;">Stoc Curent</th>
                        <th style="width: 140px; text-align: right;">Acțiuni</th>
                    </tr>
                </thead>
                <tbody id="tabelInventarBody">
                    <!-- Populat dinamic -->
                </tbody>
            </table>
        </div>
    </section>
</main>

<script>
    let filtruInventarText = "";

    document.addEventListener("DOMContentLoaded", () => {
        renderTabelInventar();

        document.getElementById("inventarSearchInput").addEventListener("input", (e) => {
            filtruInventarText = e.target.value.toLowerCase().trim();
            renderTabelInventar();
        });

        document.getElementById("formAdaugaProdus").addEventListener("submit", async (e) => {
            e.preventDefault();
            const form = e.target;
            const fileInput = document.getElementById("invFoto");

            let imgData = null;
            if (fileInput.files && fileInput.files[0]) {
                showToast("Se optimizează fotografia cu Canvas...", "info");
                imgData = await StorageManager.optimizeImage(fileInput.files[0], 800, 0.82);
            } else {
                imgData = "images/placeholder-fashion.svg";
            }

            const produsNou = {
                id: Date.now(),
                cod: "RL-NEW-" + Math.floor(Math.random() * 899 + 100),
                nume: form.nume.value.trim(),
                categorie: form.categorie.value.trim(),
                pret: Number(form.pret.value),
                pretEur: Math.round(Number(form.pret.value) / 5),
                stoc: Number(form.stoc.value),
                material: form.material.value.trim() || "Țesătură Fină de Lux",
                descriere: form.descriere.value.trim() || "Piesă vestimentară adăugată în colecția privată.",
                img: imgData
            };

            StorageManager.saveProdus(produsNou);
            form.reset();
            renderTabelInventar();
            showToast(`Piesa "${produsNou.nume}" a fost adăugată în catalog!`, "success");
        });
    });

    function renderTabelInventar() {
        let produse = StorageManager.getProduse();

        if (filtruInventarText) {
            produse = produse.filter(p =>
                p.nume.toLowerCase().includes(filtruInventarText) ||
                p.categorie.toLowerCase().includes(filtruInventarText) ||
                (p.cod && p.cod.toLowerCase().includes(filtruInventarText)) ||
                (p.material && p.material.toLowerCase().includes(filtruInventarText))
            );
        }

        const tbody = document.getElementById("tabelInventarBody");

        if (produse.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align: center; padding: 3rem; color: var(--text-muted);">
                        Nicio piesă găsită în inventar.
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = produse.map((p, idx) => {
            const isOutOfStock = p.stoc === 0;
            const isLowStock = p.stoc > 0 && p.stoc <= 3;

            return `
                <tr>
                    <td>
                        <img src="${p.img || 'images/placeholder-fashion.svg'}" class="table-thumb" alt="${p.nume}" onclick="openLightbox(StorageManager.getProduse(), ${idx})" style="cursor: pointer;">
                    </td>
                    <td>
                        <strong style="color: var(--emerald-primary); display: block;">${p.nume}</strong>
                        <small style="color: var(--gold-dim); letter-spacing: 0.05em;">${p.cod || 'RL-HERITAGE'}</small>
                    </td>
                    <td>
                        <span class="status-badge" style="background: var(--bg-parchment); color: var(--emerald-primary); border: 1px solid var(--border-beige);">
                            ${p.categorie}
                        </span>
                    </td>
                    <td style="font-size: 0.85rem; color: var(--text-muted); font-style: italic;">
                        ${p.material || 'Lână & Cașmir'}
                    </td>
                    <td style="font-weight: 600; color: var(--emerald-primary); white-space: nowrap;">
                        ${formatLei(p.pret)}
                    </td>
                    <td>
                        <input type="number" min="0" value="${p.stoc}" data-id="${p.id}" class="inv-stoc-input" style="width: 70px; padding: 0.3rem 0.5rem; text-align: center; border-radius: var(--radius-sm); border: 1px solid ${isLowStock || isOutOfStock ? 'var(--danger-red)' : 'var(--border-beige)'}; ${isLowStock || isOutOfStock ? 'background: #fff3f3; color: var(--danger-red); font-weight: 700;' : ''}">
                    </td>
                    <td style="text-align: right; white-space: nowrap;">
                        <button class="btn btn-outline btn-sm" onclick="adaugainAlbumRapid(${p.id})" title="Adaugă în album curent" style="padding: 0.3rem 0.6rem;">
                            + Album
                        </button>
                        <button class="btn btn-outline btn-sm" onclick="stergeProdus(${p.id})" style="color: var(--danger-red); border-color: var(--border-beige); padding: 0.3rem 0.6rem;" title="Șterge din catalog">
                            🗑
                        </button>
                    </td>
                </tr>
            `;
        }).join("");

        tbody.querySelectorAll(".inv-stoc-input").forEach(input => {
            input.addEventListener("change", () => {
                const id = input.dataset.id;
                const val = Math.max(0, parseInt(input.value, 10) || 0);
                StorageManager.updateStoc(id, val);
                renderTabelInventar();
                showToast("Stocul a fost actualizat cu succes.", "info");
            });
        });
    }

    window.stergeProdus = function(id) {
        if (confirm("Sigur doriți să eliminați această piesă vestimentară din inventar?")) {
            StorageManager.deleteProdus(id);
            renderTabelInventar();
            showToast("Piesa vestimentară a fost eliminată.", "info");
        }
    };
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
