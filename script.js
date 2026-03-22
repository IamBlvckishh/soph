document.addEventListener('DOMContentLoaded', () => {
    
    // Add active class to cover on load
    setTimeout(() => {
        document.querySelector('.magazine-cover').classList.add('active');
    }, 100);

    // Fade-in on Scroll
    const pages = document.querySelectorAll('.page');
    const observerOptions = { threshold: 0.15 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    pages.forEach(page => observer.observe(page));

    // Progress Bar
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById("progress-bar").style.width = scrolled + "%";
    });
});
