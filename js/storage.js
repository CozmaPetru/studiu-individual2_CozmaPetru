/**
 * Storage Manager - Gestiune sincronizată LocalStorage & Date Atelier
 * Studiu Individual 2 - Cozma Petru
 */

const STORAGE_KEYS = {
    PRODUSE: "heritage_produse_v1",
    ALBUME: "heritage_albume_v1",
    COMENZI: "heritage_comenzi_v1",
    DRAFT_ALBUM: "heritage_draft_album_v1"
};

const StorageManager = {
    // Citire sigură
    get(key, defaultValue) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) {
            console.warn(`Eroare la citirea cheii ${key}:`, e);
            return defaultValue;
        }
    },

    // Salvare sigură
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error(`Eroare la scrierea cheii ${key}:`, e);
            alert("Memoria browserului este plină. Te rugăm să folosești imagini de dimensiuni mai mici.");
            return false;
        }
    },

    // Inițializare depozit
    init() {
        if (!localStorage.getItem(STORAGE_KEYS.PRODUSE)) {
            this.set(STORAGE_KEYS.PRODUSE, DATE_INITIALE_PRODUSE);
        }
        if (!localStorage.getItem(STORAGE_KEYS.ALBUME)) {
            this.set(STORAGE_KEYS.ALBUME, ALBUME_PREDEFINITE);
        }
        if (!localStorage.getItem(STORAGE_KEYS.COMENZI)) {
            const comenziInitiale = [
                {
                    id: 101,
                    client: "Lord Alistair Sterling",
                    email: "a.sterling@cotswolds.uk",
                    albumId: "alb-02",
                    albumTitlu: "Autumn in the Cotswolds: Tweed & Countryside",
                    finisaj: "Legătură din Piele Naturală Maro Cognac",
                    pretUnitar: 299,
                    cantitate: 2,
                    total: 598,
                    stare: "Livrată",
                    data: "2026-10-18",
                    adresa: "Highclere Manor, Cotswolds, Marea Britanie"
                },
                {
                    id: 102,
                    client: "Lady Genevieve Dupont",
                    email: "genevieve@luxury-paris.fr",
                    albumId: "alb-01",
                    albumTitlu: "The Hamptons Polo & Coastal Heritage",
                    finisaj: "Hardcover Linen Regal cu Foiță Aurie",
                    pretUnitar: 189,
                    cantitate: 1,
                    total: 189,
                    stare: "În Tipar",
                    data: "2026-11-04",
                    adresa: "Avenue Montaigne 24, Paris, Franța"
                },
                {
                    id: 103,
                    client: "Baron von Richter",
                    email: "richter.estate@zurich.ch",
                    albumId: "alb-03",
                    albumTitlu: "Savile Row & Black Tie Soirée",
                    finisaj: "Ediție Regală în Cutie de Catifea Smarald",
                    pretUnitar: 399,
                    cantitate: 3,
                    total: 1197,
                    stare: "Nouă",
                    data: "2026-11-15",
                    adresa: "Bahnhofstrasse 12, Zürich, Elveția"
                }
            ];
            this.set(STORAGE_KEYS.COMENZI, comenziInitiale);
        }
    },

    // Resetare date la starea inițială
    resetToDemo() {
        if (confirm("Sigur doriți să resetați toate datele la colecția demo inițială? Modificările nesalvate se vor pierde.")) {
            localStorage.setItem(STORAGE_KEYS.PRODUSE, JSON.stringify(DATE_INITIALE_PRODUSE));
            localStorage.setItem(STORAGE_KEYS.ALBUME, JSON.stringify(ALBUME_PREDEFINITE));
            localStorage.removeItem(STORAGE_KEYS.DRAFT_ALBUM);
            window.location.reload();
        }
    },

    // --- OPERAȚIUNI PRODUSE / ȚINUTE ---
    getProduse() {
        return this.get(STORAGE_KEYS.PRODUSE, DATE_INITIALE_PRODUSE);
    },

    getProdusById(id) {
        return this.getProduse().find(p => p.id == id);
    },

    saveProdus(produs) {
        const produse = this.getProduse();
        const index = produse.findIndex(p => p.id == produs.id);
        if (index >= 0) {
            produse[index] = produs;
        } else {
            produse.unshift(produs);
        }
        this.set(STORAGE_KEYS.PRODUSE, produse);
        return produse;
    },

    deleteProdus(id) {
        let produse = this.getProduse();
        produse = produse.filter(p => p.id != id);
        this.set(STORAGE_KEYS.PRODUSE, produse);
        return produse;
    },

    updateStoc(id, stocNou) {
        const produse = this.getProduse();
        const p = produse.find(item => item.id == id);
        if (p) {
            p.stoc = Math.max(0, parseInt(stocNou, 10) || 0);
            this.set(STORAGE_KEYS.PRODUSE, produse);
        }
        return produse;
    },

    // --- OPERAȚIUNI ALBUME ---
    getAlbume() {
        return this.get(STORAGE_KEYS.ALBUME, ALBUME_PREDEFINITE);
    },

    getAlbumById(id) {
        return this.getAlbume().find(a => a.id == id);
    },

    saveAlbum(album) {
        const albume = this.getAlbume();
        const index = albume.findIndex(a => a.id == album.id);
        if (index >= 0) {
            albume[index] = album;
        } else {
            albume.unshift(album);
        }
        this.set(STORAGE_KEYS.ALBUME, albume);
        return albume;
    },

    deleteAlbum(id) {
        let albume = this.getAlbume();
        albume = albume.filter(a => a.id != id);
        this.set(STORAGE_KEYS.ALBUME, albume);
        return albume;
    },

    // --- OPERAȚIUNI COMENZI ---
    getComenzi() {
        return this.get(STORAGE_KEYS.COMENZI, []);
    },

    addComanda(comanda) {
        const comenzi = this.getComenzi();
        comenzi.unshift(comanda);
        this.set(STORAGE_KEYS.COMENZI, comenzi);
        return comenzi;
    },

    updateStareComanda(id, stareNoua) {
        const comenzi = this.getComenzi();
        const comanda = comenzi.find(c => c.id == id);
        if (comanda) {
            comanda.stare = stareNoua;
            this.set(STORAGE_KEYS.COMENZI, comenzi);
        }
        return comenzi;
    },

    // --- PROCESARE IMAGINI CU CANVAS ---
    // Reduce rezoluția imaginilor încărcate pentru a nu depăși cota LocalStorage (5MB)
    optimizeImage(file, maxWidth = 800, quality = 0.82) {
        return new Promise((resolve, reject) => {
            if (!file) return resolve(null);
            if (!file.type.startsWith("image/")) {
                alert("Fișierul selectat nu este o imagine validă.");
                return resolve(null);
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    let width = img.width;
                    let height = img.height;

                    if (width > maxWidth) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    }

                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, width, height);

                    const dataUrl = canvas.toDataURL("image/jpeg", quality);
                    resolve(dataUrl);
                };
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
};

// Execută inițializarea la încărcare
StorageManager.init();
