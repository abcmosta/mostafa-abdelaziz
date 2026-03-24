document.addEventListener("DOMContentLoaded", () => {
    
    /* ==================================
       1. TYPEWRITER EFFECT
    ================================== */
    const typeWriterElement = document.getElementById('typewriter');
    const textToType = "E-Commerce ICQA | Logistics & Fulfillment Supervisor";
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < textToType.length) {
            typeWriterElement.innerHTML += textToType.charAt(charIndex);
            charIndex++;
            // Randomize typing speed slightly for realism
            setTimeout(typeWriter, Math.random() * 50 + 50); 
        }
    }
    
    // Start typing after a short delay
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
                observer.unobserve(entry.target); // Run once
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==================================
       3. ANIMATED COUNTERS (ACHIEVEMENTS)
    ================================== */
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const start = +counter.getAttribute('data-start'); // For counting down
                    const duration = 2000; // ms
                    const increment = (start - target) / (duration / 16); // 60fps
                    let current = start;

                    const updateCounter = () => {
                        current -= increment;
                        if (current > target) {
                            counter.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCounter();
                });
                hasCounted = true; // Prevent running again
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });

    const achievementsSection = document.getElementById('achievements');
    if (achievementsSection) {
        counterObserver.observe(achievementsSection);
    }

    /* ==================================
       4. NAVBAR SCROLL SPY & STYLING
    ================================== */
    const sections = document.querySelectorAll('section');
    const navLinksList = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        let current = '';
        
        // Add subtle shadow to navbar on scroll
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
       5. MOBILE MENU TOGGLE
    ================================== */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        // Simple hamburger animation
        hamburger.classList.toggle('toggle');
    });

    // Close menu when clicking a link
    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
        });
    });
});