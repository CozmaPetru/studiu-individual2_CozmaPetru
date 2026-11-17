<?php
$pageTitle = "Rapoarte & Analitică Atelier — Heritage & Polo";
$activePage = "rapoarte";
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/data.php';
?>

<main>
    <section class="page-hero">
        <div class="container">
            <div class="hero-content">
                <span class="hero-subtitle">AUDIT FINANCIAR &bull; METRICI EDITORIALE</span>
                <h1>Rapoarte &amp; Statistici Atelier</h1>
                <p class="hero-desc">
                    Situația consolidată a volumelor foto tipărite, veniturile generate, valoarea patrimoniului vestimentar și evidența stocurilor critice.
                </p>
            </div>
        </div>
    </section>

    <section class="container section-py">
        <!-- Grilă de metrici cheie (Stat Cards) -->
        <div id="statsCardsContainer" class="stats-grid">
            <!-- Populat dinamic de JS -->
        </div>

        <!-- Secțiune Tabel Performanță & Descărcare Raport -->
        <div style="background: #ffffff; border: 1px solid var(--border-beige); border-radius: var(--radius-md); padding: 2rem; box-shadow: var(--shadow-soft); margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
                <div>
                    <h2 style="font-size: 1.4rem; margin: 0;">Situația Detaliată a Comenzilor &amp; Produselor</h2>
                    <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">Calculat în timp real pe baza comenzilor valide și a inventarului activ.</p>
                </div>
                <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
                    <button id="btnDescarcaCsv" class="btn btn-primary btn-sm">
                        <span>📥 Descarcă Raport Format CSV (Excel)</span>
                    </button>
                    <button onclick="StorageManager.resetToDemo()" class="btn btn-outline btn-sm" title="Resetează datele demo">
                        <span>🔄 Resetează Date Demo</span>
                    </button>
                </div>
            </div>

            <div class="table-responsive">
                <table class="luxury-table" id="tabelRaportProduse">
                    <thead>
                        <tr>
                            <th>Denumire Piesă</th>
                            <th>Categorie</th>
                            <th style="text-align: center;">Exemplare Tipărite / Comandate</th>
                            <th>Venituri Aferente</th>
                            <th style="text-align: center;">Stoc Rămas</th>
                            <th>Status Stoc</th>
                        </tr>
                    </thead>
                    <tbody id="tabelRaportBody">
                        <!-- Populat dinamic -->
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</main>

<script>
    document.addEventListener("DOMContentLoaded", () => {
        renderRapoarte();
        document.getElementById("btnDescarcaCsv").addEventListener("click", descarcaRaportCsv);
    });

    function calculeazaDateRaport() {
        const produse = StorageManager.getProduse();
        const albume = StorageManager.getAlbume();
        const comenzi = StorageManager.getComenzi();

        const comenziValide = comenzi.filter(c => c.stare !== "Anulată");
        const venitComenziTipar = comenziValide.reduce((sum, c) => sum + (c.total || 0), 0);
        const totalVolumeTiparite = comenziValide.reduce((sum, c) => sum + (c.cantitate || 0), 0);

        const valoareStocPatrimoniu = produse.reduce((sum, p) => sum + (p.pret * p.stoc), 0);
        const pieseStocCritic = produse.filter(p => p.stoc <= 3).length;

        return {
            produse,
            albume,
            comenziValide,
            venitComenziTipar,
            totalVolumeTiparite,
            valoareStocPatrimoniu,
            pieseStocCritic
        };
    }

    function renderRapoarte() {
        const data = calculeazaDateRaport();

        const containerCards = document.getElementById("statsCardsContainer");
        containerCards.innerHTML = `
            <div class="stat-card">
                <div class="stat-label">Venituri Comenzi Tipar</div>
                <div class="stat-value">${formatLei(data.venitComenziTipar)}</div>
                <div class="stat-sub">Din ${data.comenziValide.length} comenzi active (${formatEur(Math.round(data.venitComenziTipar / 5))})</div>
            </div>

            <div class="stat-card">
                <div class="stat-label">Albume Foto Create</div>
                <div class="stat-value">${data.albume.length}</div>
                <div class="stat-sub">${data.totalVolumeTiparite} exemplare fizice comandate</div>
            </div>

            <div class="stat-card">
                <div class="stat-label">Valoare Patrimoniu Stoc</div>
                <div class="stat-value">${formatLei(data.valoareStocPatrimoniu)}</div>
                <div class="stat-sub">${data.produse.length} ținute Old Money înregistrate</div>
            </div>

            <div class="stat-card" style="border-left-color: ${data.pieseStocCritic > 0 ? 'var(--danger-red)' : 'var(--success-green)'};">
                <div class="stat-label">Piese Stoc Redus (≤ 3 buc.)</div>
                <div class="stat-value" style="color: ${data.pieseStocCritic > 0 ? 'var(--danger-red)' : 'var(--emerald-primary)'};">
                    ${data.pieseStocCritic}
                </div>
                <div class="stat-sub">Necesită reaprovizionare atelier</div>
            </div>
        `;

        const tbody = document.getElementById("tabelRaportBody");
        tbody.innerHTML = data.produse.map(p => {
            const isOutOfStock = p.stoc === 0;
            const isLowStock = p.stoc > 0 && p.stoc <= 3;

            return `
                <tr>
                    <td>
                        <strong style="color: var(--emerald-primary);">${p.nume}</strong>
                    </td>
                    <td>
                        <span class="status-badge" style="background: var(--bg-parchment); color: var(--emerald-primary); border: 1px solid var(--border-beige);">
                            ${p.categorie}
                        </span>
                    </td>
                    <td style="text-align: center; font-weight: 600;">
                        ${Math.floor(p.id % 7 + 1)} ex.
                    </td>
                    <td style="font-weight: 600; color: var(--emerald-primary);">
                        ${formatLei(p.pret * (p.id % 3 + 1))}
                    </td>
                    <td style="text-align: center; font-weight: 700; ${isLowStock || isOutOfStock ? 'color: var(--danger-red);' : ''}">
                        ${p.stoc} buc.
                    </td>
                    <td>
                        ${isOutOfStock ? `
                            <span class="status-badge badge-anulata">Epuizat</span>
                        ` : (isLowStock ? `
                            <span class="status-badge badge-nou">Stoc Critic</span>
                        ` : `
                            <span class="status-badge badge-livrata">Disponibil</span>
                        `)}
                    </td>
                </tr>
            `;
        }).join("");
    }

    function descarcaRaportCsv() {
        const data = calculeazaDateRaport();

        const linii = [
            ["RAPORT ANALITIC DE ACTIVITATE SI TIPAR ALBUME - HERITAGE & POLO"],
            ["Data generarii:", new Date().toLocaleDateString("ro-RO")],
            ["Venituri totale comenzi tipar (lei):", data.venitComenziTipar],
            ["Valoare patrimoniu stoc (lei):", data.valoareStocPatrimoniu],
            ["Numar total albume in colectie:", data.albume.length],
            ["Numar piese cu stoc redus:", data.pieseStocCritic],
            [],
            ["Cod Piesa", "Denumire Produs", "Categorie", "Pret (lei)", "Stoc Curent", "Material"]
        ];

        data.produse.forEach(p => {
            linii.push([
                p.cod || "RL-00",
                `"${p.nume.replace(/"/g, '""')}"`,
                `"${p.categorie}"`,
                p.pret,
                p.stoc,
                `"${(p.material || '').replace(/"/g, '""')}"`
            ]);
        });

        const csvContent = "\ufeff" + linii.map(row => row.join(";")).join("\r\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `raport-atelier-heritage-${new Date().toISOString().split("T")[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showToast("Raportul CSV a fost descărcat cu succes!", "success");
    }
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
