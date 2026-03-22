document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.scroll-container');
    const pages = document.querySelectorAll('.page');
    const cursor = document.getElementById('custom-cursor');
    let currentIndex = 0;

    // 1. CUSTOM CURSOR LOGIC
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    });

    // 2. CLICK RIPPLE EFFECT
    document.addEventListener('mousedown', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'cursor-ripple';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        document.body.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
        cursor.style.transform += ' scale(0.7)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = cursor.style.transform.replace(' scale(0.7)', '');
    });

    // 3. PARALLAX EFFECT (Only on active page images)
    container.addEventListener('mousemove', (e) => {
        const activeImg = document.querySelector('.page.active img');
        if (activeImg) {
            const x = (window.innerWidth / 2 - e.pageX) / 45; // Subtle shift
            const y = (window.innerHeight / 2 - e.pageY) / 45;
            activeImg.style.transform = `translate(${x}px, ${y}px)`;
        }
    });

    // 4. NAVIGATION & SCROLL LOGIC
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
        if (e.code === 'ArrowUp') {
            e.preventDefault();
            goToPage(currentIndex - 1);
        }
    });

    document.getElementById('nextBtn').onclick = () => goToPage(currentIndex + 1);
    document.getElementById('prevBtn').onclick = () => goToPage(currentIndex - 1);

    // 5. OBSERVER & PROGRESS BAR
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
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
