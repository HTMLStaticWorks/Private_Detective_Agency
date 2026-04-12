/**
 * main.js - Global interactions for Veritas Investigations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const htmlElement = document.documentElement;
    
    // Check local storage for preference
    if (localStorage.getItem('theme') === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        updateDarkModeIcon(true);
    }

    darkModeToggle?.addEventListener('click', () => {
        const isDark = htmlElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            htmlElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            updateDarkModeIcon(false);
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateDarkModeIcon(true);
        }
    });

    function updateDarkModeIcon(isDark) {
        const icon = darkModeToggle?.querySelector('i');
        if (icon) {
            icon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
        }
    }

    // RTL Toggle
    const rtlToggle = document.getElementById('rtl-toggle');
    if (localStorage.getItem('dir') === 'rtl') {
        htmlElement.setAttribute('dir', 'rtl');
        updateRTLText(true);
    }

    rtlToggle?.addEventListener('click', () => {
        const isRtl = htmlElement.getAttribute('dir') === 'rtl';
        if (isRtl) {
            htmlElement.removeAttribute('dir');
            localStorage.setItem('dir', 'ltr');
            updateRTLText(false);
        } else {
            htmlElement.setAttribute('dir', 'rtl');
            localStorage.setItem('dir', 'rtl');
            updateRTLText(true);
        }
    });

    function updateRTLText(isRtl) {
        if (rtlToggle) {
            rtlToggle.textContent = isRtl ? 'LTR' : 'RTL';
        }
    }

    // Sticky Navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('sticky-top', 'shadow-sm');
        } else {
            navbar?.classList.remove('sticky-top', 'shadow-sm');
        }
    });

    // Mobile Menu Close on link click
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('navbarNav');
    if (menuToggle) {
        const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle:false});
        navLinks.forEach((l) => {
            l.addEventListener('click', () => { 
                if(window.innerWidth < 992) {
                    bsCollapse.hide();
                }
            });
        });
    }

    // Back to Top Button Implementation
    if (!document.body.classList.contains('dashboard-page')) {
        // Inject button into body
        const backToTopBtn = document.createElement('a');
        backToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.setAttribute('href', '#');
        backToTopBtn.setAttribute('title', 'Back to Top');
        document.body.appendChild(backToTopBtn);

        // Show/Hide button on scroll
        const handleScroll = () => {
            const scrollPos = window.scrollY;
            if (scrollPos > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Scroll to top on click
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Password Visibility Toggle
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const passwordInput = document.getElementById(targetId);
            const icon = this.querySelector('i');
            
            if (passwordInput) {
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    icon.classList.remove('bi-eye');
                    icon.classList.add('bi-eye-slash');
                } else {
                    passwordInput.type = 'password';
                    icon.classList.remove('bi-eye-slash');
                    icon.classList.add('bi-eye');
                }
            }
        });
    });
});


