<?php
$pageTitle = "Albumele Mele & Colecții — Heritage & Polo";
$activePage = "albume";
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/data.php';
?>

<main>
    <section class="page-hero">
        <div class="container">
            <div class="hero-content">
                <span class="hero-subtitle">ARHIVA EDITORIALĂ PRIVATĂ</span>
                <h1>Colecțiile &amp; Albumele Tale Foto</h1>
                <p class="hero-desc">
                    Aici găsești toate lookbook-urile create în studio, alături de edițiile noastre curatoriate de semnătură. Răsfoiește paginile interactive, pornește un slideshow sau comandă tipărirea fizică legată în piele.
                </p>
            </div>
        </div>
    </section>

    <section class="container section-py">
        <!-- Bara superioară de acțiuni pentru colecții -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
            <div>
                <h2 style="font-size: 1.6rem; margin: 0;">Albume Salvate în Bibliotecă</h2>
                <p style="font-size: 0.9rem; color: var(--text-muted);">Sincronizate automat în memoria browserului tău.</p>
            </div>
            <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
                <label class="btn btn-outline btn-sm" style="cursor: pointer;">
                    <span>📥 Importă Album JSON</span>
                    <input type="file" id="importJsonInput" accept=".json" style="display: none;">
                </label>
                <a href="generator.php" class="btn btn-gold btn-sm">
                    <span>+ Album Nou în Studio</span>
                </a>
            </div>
        </div>

        <!-- Grilă de albume salvate -->
        <div id="albumsGridContainer" class="fashion-grid">
            <!-- Populat dinamic de js/lookbook.js -->
        </div>
    </section>
</main>

<script src="js/lookbook.js"></script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
