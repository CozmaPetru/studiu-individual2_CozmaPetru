<?php
/**
 * Funcții utilitare PHP pentru Atelierul Heritage & Polo
 * Studiu Individual 2 - Cozma Petru
 */

function formatLeiPhp($numar) {
    return number_format($numar, 0, ',', '.') . ' lei';
}

function formatEurPhp($numar) {
    return '€' . number_format($numar, 0, ',', '.');
}

function getBaseUrl($isPhp = true) {
    return $isPhp ? '' : '';
}

function renderNavLinks($activePage = 'index', $isPhp = true) {
    $ext = $isPhp ? '.php' : '.html';
    $links = [
        'index' => ['label' => 'Acasă', 'url' => 'index' . $ext],
        'galerie' => ['label' => 'Galerie Ținute', 'url' => 'galerie' . $ext],
        'generator' => ['label' => '✦ Generator Albume', 'url' => 'generator' . $ext],
        'albume' => ['label' => 'Albumele Mele', 'url' => 'albume' . $ext],
        'inventar' => ['label' => 'Inventar & Foto', 'url' => 'inventar' . $ext],
        'comenzi' => ['label' => 'Comenzi Tipar', 'url' => 'comenzi' . $ext],
        'rapoarte' => ['label' => 'Rapoarte', 'url' => 'rapoarte' . $ext],
        'ghid-stil' => ['label' => 'Ghid de Stil', 'url' => 'ghid-stil' . $ext]
    ];

    $html = '';
    foreach ($links as $key => $item) {
        $isActive = ($key === $activePage) ? 'active' : '';
        $html .= '<a href="' . $item['url'] . '" class="nav-link ' . $isActive . '">' . $item['label'] . '</a>';
    }
    return $html;
}
