document.addEventListener("DOMContentLoaded", () => {
    
    /* ==================================
       1. TYPEWRITER EFFECT
    ================================== */
    const typeWriterElement = document.getElementById('typewriter');
    const textToType = "Data-Driven Logistics & AI Automation";
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < textToType.length) {
            typeWriterElement.innerHTML += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, Math.random() * 50 + 50); 
        }
    }
    
    setTimeout(typeWriter, 500);

    /* ==================================
       2. SCROLL REVEAL ANIMATIONS
    ================================== */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==================================
       3. NAVBAR SCROLL SPY & STYLING
    ================================== */
    const sections = document.querySelectorAll('section');
    const navLinksList = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        let current = '';
        
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.5)";
        } else {
            navbar.style.boxShadow = "none";
        }

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    /* ==================================
       4. MOBILE MENU TOGGLE
    ================================== */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
    });

    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
        });
    });
});