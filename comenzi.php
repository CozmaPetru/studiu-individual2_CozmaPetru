<?php
$pageTitle = "Comenzi Tipar Albume Foto de Lux — Heritage & Polo";
$activePage = "comenzi";
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/data.php';
?>

<main>
    <section class="page-hero">
        <div class="container">
            <div class="hero-content">
                <span class="hero-subtitle">LEGĂTORIE DE ARTĂ &bull; TIPAR ARTIZANAL</span>
                <h1>Comandă Tipărirea Fizică a Albumului</h1>
                <p class="hero-desc">
                    Transformă lookbook-ul tău digital într-un volum tangibil de colecție, legat manual în pânză englezească de in sau piele naturală finisată cu foiță de aur.
                </p>
            </div>
        </div>
    </section>

    <section class="container section-py">
        <!-- Formular Comandă Nouă -->
        <div style="background: #ffffff; border: 1px solid var(--border-beige); border-radius: var(--radius-md); padding: 2rem; box-shadow: var(--shadow-soft); margin-bottom: 3rem;">
            <div style="display: flex; align-items: center; gap: 0.8rem; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-beige); padding-bottom: 1rem;">
                <img src="images/crest.svg" style="width: 32px; height: 32px;">
                <div>
                    <h2 style="font-size: 1.4rem; margin: 0;">Plasează o Comandă de Volum Fizic</h2>
                    <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">Alege albumul din arhivă, tipul de finisaj și datele de livrare.</p>
                </div>
            </div>

            <form id="formComandaTipar">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.2rem; margin-bottom: 1.5rem;">
                    <div class="form-group">
                        <label for="comClient">Nume Client &amp; Titulatură *</label>
                        <input type="text" id="comClient" name="client" required placeholder="ex: Lord Alistair Sterling sau Cozma Petru">
                    </div>

                    <div class="form-group">
                        <label for="comEmail">Adresă Email Corespondență *</label>
                        <input type="email" id="comEmail" name="email" required placeholder="ex: client@estate.com">
                    </div>

                    <div class="form-group">
                        <label for="comAlbum">Album de Tipărit *</label>
                        <select id="comAlbum" name="albumId" required>
                            <!-- Populat dinamic din albumele existente -->
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="comFinisaj">Finisaj Legătorie de Lux *</label>
                        <select id="comFinisaj" name="finisaj" required>
                            <option value="Hardcover Linen Regal cu Foiță Aurie" data-pret="189">
                                Hardcover Linen Regal cu Foiță Aurie (189 lei)
                            </option>
                            <option value="Legătură din Piele Naturală Maro Cognac" data-pret="299" selected>
                                Legătură din Piele Naturală Maro Cognac (299 lei)
                            </option>
                            <option value="Ediție Regală în Cutie de Catifea Smarald" data-pret="399">
                                Ediție Regală în Cutie de Catifea Smarald (399 lei)
                            </option>
                            <option value="Lookbook Editorial Softcover" data-pret="119">
                                Lookbook Editorial Softcover (119 lei)
                            </option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="comCantitate">Număr Exemplare (buc.) *</label>
                        <input type="number" id="comCantitate" name="cantitate" min="1" max="50" value="1" required>
                    </div>

                    <div class="form-group">
                        <label for="comAdresa">Adresă Expediție Conac / Rezidență *</label>
                        <input type="text" id="comAdresa" name="adresa" required placeholder="ex: Bulevardul Ștefan cel Mare 105, Chișinău">
                    </div>
                </div>

                <!-- Sumar Cost Comandă -->
                <div style="background: var(--bg-parchment); border: 1px solid var(--border-beige); border-radius: var(--radius-sm); padding: 1.2rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
                    <div>
                        <div style="font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--gold-dim); font-weight: 700;">TOTAL ESTIMAT TIPAR &amp; EXPEDIȚIE</div>
                        <div id="comandaTotalAfisat" style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 700; color: var(--emerald-primary);">
                            299 lei
                        </div>
                    </div>
                    <button type="submit" class="btn btn-gold btn-lg">
                        <span>✦ Înregistrează Comanda</span>
                    </button>
                </div>
            </form>
        </div>

        <!-- Tabel Istoric Comenzi -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; flex-wrap: wrap; gap: 1rem;">
            <div>
                <h2 style="font-size: 1.5rem; margin: 0;">Istoric Comenzi Tipar Albume</h2>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">Poți schimba statusul fiecărei comenzi din meniul derulant (Nouă, În Tipar, Livrată, Anulată).</p>
            </div>
        </div>

        <div class="table-responsive">
            <table class="luxury-table" id="tabelComenzi">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Client &amp; Contact</th>
                        <th>Album Solicitat</th>
                        <th>Finisaj Legătorie</th>
                        <th style="text-align: center;">Ex.</th>
                        <th>Total</th>
                        <th style="width: 150px;">Stare Comandă</th>
                    </tr>
                </thead>
                <tbody id="tabelComenziBody">
                    <!-- Populat dinamic -->
                </tbody>
            </table>
        </div>
    </section>
</main>

<script>
    const STARI_COMANDA = ["Nouă", "În Tipar", "Expediată", "Livrată", "Anulată"];

    document.addEventListener("DOMContentLoaded", () => {
        initSelectAlbume();
        renderTabelComenzi();
        calculeazaTotalComanda();

        document.getElementById("comFinisaj").addEventListener("change", calculeazaTotalComanda);
        document.getElementById("comCantitate").addEventListener("input", calculeazaTotalComanda);

        document.getElementById("formComandaTipar").addEventListener("submit", (e) => {
            e.preventDefault();
            const form = e.target;
            const albume = StorageManager.getAlbume();
            const albumSelectat = albume.find(a => a.id == form.albumId.value);
            const selectFinisaj = form.finisaj;
            const optSelectata = selectFinisaj.options[selectFinisaj.selectedIndex];
            const pretUnitar = Number(optSelectata.dataset.pret) || 189;
            const cantitate = Math.max(1, parseInt(form.cantitate.value, 10) || 1);

            const comandaNoua = {
                id: Date.now(),
                client: form.client.value.trim(),
                email: form.email.value.trim(),
                albumId: form.albumId.value,
                albumTitlu: albumSelectat ? albumSelectat.titlu : "Album Colecție",
                finisaj: form.finisaj.value,
                pretUnitar: pretUnitar,
                cantitate: cantitate,
                total: pretUnitar * cantitate,
                stare: "Nouă",
                data: new Date().toISOString().split("T")[0],
                adresa: form.adresa.value.trim()
            };

            StorageManager.addComanda(comandaNoua);
            form.reset();
            form.cantitate.value = 1;
            calculeazaTotalComanda();
            renderTabelComenzi();
            showToast(`Comanda pentru "${comandaNoua.albumTitlu}" a fost înregistrată!`, "success");
        });
    });

    function initSelectAlbume() {
        const select = document.getElementById("comAlbum");
        const albume = StorageManager.getAlbume();

        const urlParams = new URLSearchParams(window.location.search);
        const preselectedId = urlParams.get("albumId");

        select.innerHTML = albume.map(a => `
            <option value="${a.id}" ${a.id == preselectedId ? 'selected' : ''}>
                ${a.titlu} (${a.elemente ? a.elemente.length : 0} pagini &bull; ${a.curator || 'Heritage'})
            </option>
        `).join("");

        if (albume.length === 0) {
            select.innerHTML = `<option value="">Niciun album creat încă - mergi la Generator</option>`;
        }
    }

    function calculeazaTotalComanda() {
        const selectFinisaj = document.getElementById("comFinisaj");
        const opt = selectFinisaj.options[selectFinisaj.selectedIndex];
        const pretUnitar = opt ? Number(opt.dataset.pret) : 299;
        const cantitate = Math.max(1, parseInt(document.getElementById("comCantitate").value, 10) || 1);
        const total = pretUnitar * cantitate;
        document.getElementById("comandaTotalAfisat").textContent = formatLei(total);
    }

    function renderTabelComenzi() {
        const comenzi = StorageManager.getComenzi();
        const tbody = document.getElementById("tabelComenziBody");

        if (comenzi.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align: center; padding: 3rem; color: var(--text-muted);">
                        Nicio comandă înregistrată încă.
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = comenzi.map(c => `
            <tr>
                <td style="white-space: nowrap; font-size: 0.85rem; color: var(--text-muted);">
                    ${c.data || '2026-11-17'}
                </td>
                <td>
                    <strong style="color: var(--emerald-primary); display: block;">${c.client}</strong>
                    <small style="color: var(--text-muted);">${c.email || ''}</small>
                </td>
                <td>
                    <span style="font-weight: 600; color: var(--emerald-primary);">${c.albumTitlu || 'Album Foto'}</span>
                </td>
                <td style="font-size: 0.85rem; color: var(--text-secondary);">
                    ${c.finisaj}
                </td>
                <td style="text-align: center; font-weight: 700;">
                    ${c.cantitate}
                </td>
                <td style="font-weight: 700; color: var(--emerald-primary); white-space: nowrap;">
                    ${formatLei(c.total)}
                </td>
                <td>
                    <select data-id="${c.id}" class="comanda-stare-select" style="padding: 0.25rem 0.5rem; font-size: 0.82rem; border-radius: var(--radius-sm); font-weight: 600;">
                        ${STARI_COMANDA.map(s => `
                            <option value="${s}" ${s === c.stare ? 'selected' : ''}>${s}</option>
                        `).join("")}
                    </select>
                </td>
            </tr>
        `).join("");

        tbody.querySelectorAll(".comanda-stare-select").forEach(select => {
            select.addEventListener("change", () => {
                const id = select.dataset.id;
                const nouaStare = select.value;
                StorageManager.updateStareComanda(id, nouaStare);
                showToast(`Starea comenzii a fost actualizată în "${nouaStare}".`, "info");
            });
        });
    }
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
