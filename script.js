document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.scroll-container');
    const pages = document.querySelectorAll('.page');
    const cursor = document.getElementById('custom-cursor');
    const cursorText = document.querySelector('.cursor-text');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    // CURSOR & PARALLAX
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        const hoverTarget = e.target.closest('.image-wrapper[data-caption]');
        if (hoverTarget) {
            cursor.classList.add('active');
            cursorText.textContent = hoverTarget.getAttribute('data-caption');
        } else {
            cursor.classList.remove('active');
        }

        const activeImg = document.querySelector('.page.active img:not(.hero-img)');
        if (activeImg) {
            const x = (window.innerWidth / 2 - e.pageX) / 50;
            const y = (window.innerHeight / 2 - e.pageY) / 50;
            activeImg.style.transform = `translate(${x}px, ${y}px)`;
        }
    });

    // NAVIGATION FUNCTION
    function scrollToIndex(index) {
        if (index >= 0 && index < pages.length) {
            pages[index].scrollIntoView({ behavior: 'smooth' });
        }
    }

    function getCurrentIndex() {
        return Math.round(container.scrollTop / window.innerHeight);
    }

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        scrollToIndex(getCurrentIndex() + 1);
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        scrollToIndex(getCurrentIndex() - 1);
    });

    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'ArrowDown') {
            e.preventDefault();
            scrollToIndex(getCurrentIndex() + 1);
        }
        if (e.code === 'ArrowUp') {
            e.preventDefault();
            scrollToIndex(getCurrentIndex() - 1);
        }
    });

    // REVEAL ANIMATIONS
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                pages.forEach(p => p.classList.remove('active'));
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.6 });

    pages.forEach(page => observer.observe(page));

    // PROGRESS BAR
    container.addEventListener('scroll', () => {
        const scrolled = (container.scrollTop / (container.scrollHeight - container.clientHeight)) * 100;
        document.getElementById("progress-bar").style.width = scrolled + "%";
    });
});
