<?php
if (!isset($pageTitle)) $pageTitle = "Heritage & Polo — Old Money Atelier & Photo Album Generator";
if (!isset($activePage)) $activePage = "index";
require_once __DIR__ . '/functions.php';
?>
<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($pageTitle) ?></title>
    <!-- Meta tag-uri SEO & Social -->
    <meta name="description" content="Generator de albume foto vestimentare în stilul Old Money & Ralph Lauren. Creează lookbook-uri rafinate, explorează colecții de tweed, cașmir și comandă albume fizice tipărite.">
    <meta name="author" content="Cozma Petru">
    <link rel="icon" type="image/svg+xml" href="images/crest.svg">
    <!-- Stiluri CSS -->
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/print.css" media="print">
</head>
<body>

    <!-- Bară superioară de anunț nobiliar -->
    <div class="top-announcement">
        ✦ EDISIUNE LIMITATĂ • OLD MONEY COUTURE &amp; BESPOKE PHOTO ALBUM STUDIO • EST. 1967 ✦
    </div>

    <!-- Header & Navigație Principală -->
    <header class="site-header">
        <div class="header-inner">
            <a href="index.php" class="brand-link">
                <img src="images/logo.svg" alt="Heritage &amp; Polo Logo" class="brand-logo-img">
            </a>

            <!-- Meniu Navigație Desktop & Mobil -->
            <nav id="mainNav" class="main-nav">
                <?= renderNavLinks($activePage, true) ?>
            </nav>

            <!-- Acțiuni Header & Contoare -->
            <div class="nav-actions">
                <a href="albume.php" class="btn btn-outline btn-sm" title="Albumele Mele Salvate">
                    <span>Colecții</span>
                    <span id="navAlbumsCount" class="badge-counter">3</span>
                </a>
                <a href="generator.php" class="btn btn-gold btn-sm">
                    <span>+ Creează Album</span>
                </a>
                <button id="menuToggle" class="menu-toggle" aria-label="Deschide Meniul">
                    <span></span><span></span><span></span>
                </button>
            </div>
        </div>
    </header>
