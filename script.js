document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Add active class to cover on load to trigger the Polaroid tilt animation
    setTimeout(() => {
        document.querySelector('.magazine-cover').classList.add('active');
    }, 200);

    // 2. Fade-in on Scroll Functionality
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

    // 3. Progress Bar Functionality
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById("progress-bar").style.width = scrolled + "%";
    });
});
