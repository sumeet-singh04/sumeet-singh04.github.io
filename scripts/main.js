document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.top-nav .nav-links ul li a, .hamburger-menu .menu-content ul li a');

    for (const link of links) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            window.scrollTo({
                top: targetElement.offsetTop,
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
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + window.innerHeight;
        jobs.forEach(job => {
            if (scrollPosition > job.offsetTop + job.offsetHeight / 2) {
                job.classList.add('animate');
            }
        });
    });

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