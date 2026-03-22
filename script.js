document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.scroll-container');
    const pages = document.querySelectorAll('.page');
    const progressBar = document.getElementById('progress-bar');
    
    let currentIndex = 0;

    function goToPage(index) {
        if (index < 0 || index >= pages.length) return;
        currentIndex = index;
        pages[currentIndex].scrollIntoView({ behavior: 'smooth' });
    }

    // Keyboard controls
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

    // Nav Buttons
    document.getElementById('nextBtn').onclick = () => goToPage(currentIndex + 1);
    document.getElementById('prevBtn').onclick = () => goToPage(currentIndex - 1);

    // Progress Bar & Index Sync
    container.addEventListener('scroll', () => {
        const scrolled = (container.scrollTop / (container.scrollHeight - container.clientHeight)) * 100;
        progressBar.style.width = scrolled + '%';
        currentIndex = Math.round(container.scrollTop / window.innerHeight);
    });

    // Shield
    document.addEventListener('contextmenu', e => e.preventDefault());
});
