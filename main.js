// --- 1. Animasi Scroll Reveal ---
const revealElements = document.querySelectorAll('.scroll-reveal');

function checkReveal() {
    for (let el of revealElements) {
        const rect = el.getBoundingClientRect();
        // Konten bakal muncul kalau udah masuk jangkauan layar
        const isVisible = rect.top < window.innerHeight - 50; 
        if (isVisible) {
            el.classList.add('revealed');
        }
    }
}

// Cek saat web baru dibuka dan saat di-scroll
window.addEventListener('load', checkReveal);
window.addEventListener('scroll', checkReveal);
checkReveal(); // Panggil sekali buat jaga-jaga


// --- 2. Menu Dropdown untuk Mode HP ---
const menuToggle = document.getElementById('menuToggle');
const menuDropdown = document.getElementById('menuDropdown');
const menuClose = document.getElementById('menuClose');

if (menuToggle && menuDropdown && menuClose) {
    // Buka menu
    menuToggle.addEventListener('click', () => {
        menuDropdown.classList.add('show');
    });

    // Tutup menu pake tombol X
    menuClose.addEventListener('click', () => {
        menuDropdown.classList.remove('show');
    });

    // Tutup menu kalau user klik sembarang tempat di luar menu
    document.addEventListener('click', (e) => {
        if (!menuDropdown.contains(e.target) && !menuToggle.contains(e.target)) {
            menuDropdown.classList.remove('show');
        }
    });
}


// --- 3. Easter Egg (Klik Judul Keluar Emoji) ---
const title = document.getElementById('iepeasTitle');

function createFallingEmoji(emoji, xPos) {
    const el = document.createElement('div');
    el.className = 'falling-emoji';
    el.textContent = emoji;
    el.style.left = (xPos !== undefined ? xPos : Math.random() * window.innerWidth) + 'px';
    
    const duration = 1.5 + Math.random() * 2; // Kecepatan jatuh random
    el.style.animationDuration = duration + 's';
    document.body.appendChild(el);
    
    // Hapus emoji setelah selesai jatuh biar HTML ga kepenuhan
    setTimeout(() => el.remove(), duration * 1000);
}

if (title) {
    title.addEventListener('click', () => {
        const count = 20 + Math.floor(Math.random() * 10); // Jumlah emoji
        const emojis = ['✈️', '🌟', '⭐', '🚀', '🛸', '💫', '🌠'];
        
        for (let i = 0; i < count; i++) {
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            const randomX = Math.random() * window.innerWidth;
            
            // Bikin efek jatuhnya ga barengan
            setTimeout(() => createFallingEmoji(randomEmoji, randomX), Math.random() * 400);
        }
    });
}
