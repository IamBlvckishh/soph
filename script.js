document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.scroll-container');
    const pages = document.querySelectorAll('.page');
    const cursor = document.getElementById('custom-cursor');
    const cursorText = document.querySelector('.cursor-text');
    let currentIndex = 0;

    // 1. CURSOR MOVEMENT & HOVER LOGIC
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // Check for hidden message targets
        const target = e.target.closest('.image-wrapper[data-caption]');
        if (target) {
            cursor.classList.add('active');
            cursorText.textContent = target.getAttribute('data-caption');
        } else {
            cursor.classList.remove('active');
            cursorText.textContent = '';
        }

        // Parallax logic for active images
        const activeImg = document.querySelector('.page.active img');
        if (activeImg) {
            const x = (window.innerWidth / 2 - e.pageX) / 50;
            const y = (window.innerHeight / 2 - e.pageY) / 50;
            activeImg.style.transform = `translate(${x}px, ${y}px)`;
        }
    });

    // 2. SCROLL NAVIGATION
    function goToPage(index) {
        if (index < 0 || index >= pages.length) return;
        currentIndex = index;
        pages[currentIndex].scrollIntoView({ behavior: 'smooth' });
    }

    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'ArrowDown') {
            e.preventDefault();
            goToPage(currentIndex + 1);
        }
    });

    // 3. OBSERVER FOR REVEAL
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.5 });

    pages.forEach(page => observer.observe(page));
});
