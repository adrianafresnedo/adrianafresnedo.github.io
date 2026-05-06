const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbTitle = document.getElementById('lb-title');
const lbCount = document.getElementById('lb-counter');
const lbClose = document.getElementById('lightbox-close');
const lbPrev = document.getElementById('lightbox-prev');
const lbNext = document.getElementById('lightbox-next');
let current = 0;
let triggerEl = null;

/* Gallery items — keyboard accessible */
const items = [];
images.forEach((img, i) => {
    const button = document.createElement('button');
    button.className = 'item card-white reveal-card mb-3';
    button.setAttribute('aria-label', `Open ${img.title}`);
    button.innerHTML = `
    <span class="item-img-wrap">
      <img src="${img.src}" alt="${img.title}" loading="lazy">
    </span>
    <span class="item-caption">
      <span class="item-title">${img.title}</span>
    </span>`;
    button.addEventListener('click', () => openLightbox(i, button));
    button.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(i, button); } });
    gallery.appendChild(button);
    items.push(button);
});

/* Focus trap */
const FOCUSABLE = 'button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function trapFocus(e) {
    const focusable = Array.from(lightbox.querySelectorAll(FOCUSABLE));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
}

function openLightbox(i, el, focusTarget = lbClose) {
    current = i;
    triggerEl = el;
    lbImg.src = images[i].src;
    lbImg.alt = images[i].title;
    lbTitle.textContent = images[i].title;
    lbCount.textContent = String(i + 1).padStart(2, '0') + ' / ' + String(images.length).padStart(2, '0');
    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.classList.add('active');
    lightbox.addEventListener('keydown', trapFocus);
    focusTarget.focus();
}

function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.removeEventListener('keydown', trapFocus);
    if (triggerEl) { triggerEl.focus(); triggerEl = null; }
}

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', () => openLightbox((current - 1 + images.length) % images.length, triggerEl, lbPrev));
lbNext.addEventListener('click', () => openLightbox((current + 1) % images.length, triggerEl, lbNext));

lightbox.addEventListener('click', e => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-wrap')) closeLightbox();
});

document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') { closeLightbox(); }
    if (e.key === 'ArrowLeft') openLightbox((current - 1 + images.length) % images.length, triggerEl);
    if (e.key === 'ArrowRight') openLightbox((current + 1) % images.length, triggerEl);
});