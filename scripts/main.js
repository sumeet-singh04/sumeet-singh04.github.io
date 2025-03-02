document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.top-nav .nav-links ul li a, .hamburger-menu .menu-content ul li a');

    for (const link of links) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            const headerOffset = document.querySelector('.top-nav').offsetHeight;
            const elementPosition = targetElement.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    }

    const menuButton = document.querySelector('.hamburger-menu .menu-button');
    const menuContent = document.querySelector('.hamburger-menu .menu-content');

    menuButton.addEventListener('click', function() {
        menuContent.style.display = menuContent.style.display === 'flex' ? 'none' : 'flex';
    });

    // Trigger animation on scroll
    const jobs = document.querySelectorAll('.job');

    // Animate progress bar on scroll
    const progressBar = document.querySelector('.progress-bar');
    const progressPercentage = document.querySelector('.progress-percentage');

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollableHeight = documentHeight - windowHeight;

        const progress = (scrollPosition / scrollableHeight) * 100;
        progressBar.style.height = `${progress}%`;
        progressPercentage.textContent = `${Math.round(progress)}%`;
    });
});