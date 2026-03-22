document.addEventListener('DOMContentLoaded', () => {
    // SHIELD: Disable right-click and dragging
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.querySelectorAll('img').forEach(img => {
        img.onmousedown = (e) => e.preventDefault();
    });

    // Reveal cover
    setTimeout(() => {
        document.body.classList.add('active');
        document.querySelector('.magazine-cover').classList.add('active');
    }, 200);

    // Intersection Observer for scroll reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.page').forEach(page => observer.observe(page));

    // Progress Bar
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById("progress-bar").style.width = scrolled + "%";
    });
});
