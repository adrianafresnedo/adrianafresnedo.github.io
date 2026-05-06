/* ── Sticky nav ─────────────────────────────────────────────────────────── */
const nav = document.getElementById('main-nav');
const spacer = document.getElementById('nav-spacer');

const updateOffset = () => {
    nav.style.setProperty('--nav-offset', `${spacer.getBoundingClientRect().left}px`);
};

updateOffset();

window.addEventListener('resize', updateOffset, { passive: true });

const navBottom = nav.getBoundingClientRect().bottom + window.scrollY;

window.addEventListener('scroll', () => {
    const isSticky = window.scrollY > navBottom;
    nav.classList.toggle('sticky', isSticky);
}, { passive: true });


/* ── Scroll-reveal ───────────────────────────────────────────────────────── */
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('js-animate');

    const observer = new IntersectionObserver((entries) => {
        const entering = entries.filter(e => e.isIntersecting);
        entering.forEach((entry, batchIndex) => {
            entry.target.style.setProperty('--reveal-delay', `${batchIndex * 100}ms`);
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-card').forEach(card => observer.observe(card));
    document.querySelectorAll('.reveal-heading').forEach(el => observer.observe(el));
}

// ─── Loaded Reveal ───────────────────────────────────────────────────────
window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    loader.classList.add("d-none"); // Hides the loader
});

// ─── Tabbed content ───────────────────────────────────────────────────────
function switchTab(tabName) {
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
    });
    document.getElementById('pane-' + tabName).classList.add('active');
    document.getElementById('tab-' + tabName).classList.add('active');
    document.getElementById('tab-' + tabName).setAttribute('aria-selected', 'true');
}