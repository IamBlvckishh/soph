document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.scroll-container');
    const pages = document.querySelectorAll('.page');
    let currentIndex = 0;

    // SHIELD: Disable right-click and dragging
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.querySelectorAll('img').forEach(img => {
        img.onmousedown = (e) => e.preventDefault();
    });

    // NAVIGATION LOGIC
    function goToPage(index) {
        if (index < 0 || index >= pages.length) return;
        currentIndex = index;
        pages[currentIndex].scrollIntoView({ behavior: 'smooth' });
    }

    // Space Bar & Arrow Keys
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'ArrowDown') {
            e.preventDefault();
            goToPage(currentIndex + 1);
        }
        if (e.code === 'ArrowUp') {
            e.preventDefault();
            goToPage(currentIndex - 1);
        }
    });

    // Buttons
    document.getElementById('nextBtn').onclick = () => goToPage(currentIndex + 1);
    document.getElementById('prevBtn').onclick = () => goToPage(currentIndex - 1);

    // Reveal Logic & Progress Bar
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Sync current index based on visible page
                currentIndex = Array.from(pages).indexOf(entry.target);
            }
        });
    }, { threshold: 0.5 });

    pages.forEach(page => observer.observe(page));

    container.addEventListener('scroll', () => {
        const scrolled = (container.scrollTop / (container.scrollHeight - container.clientHeight)) * 100;
        document.getElementById("progress-bar").style.width = scrolled + "%";
    });
});
