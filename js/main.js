// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Initialize particles.js
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#007bff'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#007bff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    const htmlElement = document.documentElement;
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    function setTheme(theme) {
        htmlElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDarkScheme.matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-bs-theme');
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    // Dynamic Greeting
    function setGreeting() {
        const hour = new Date().getHours();
        const greetingElement = document.getElementById('greeting');
        let greeting;
        
        if (hour >= 5 && hour < 12) {
            greeting = "Good Morning! 🌅";
        } else if (hour >= 12 && hour < 18) {
            greeting = "Good Afternoon! ☀️";
        } else {
            greeting = "Good Evening! 🌙";
        }
        
        greetingElement.textContent = greeting;
    }

    // Typing Animation
    const texts = [
        "I'm a Full Stack Developer 💻",
        "I Build Modern Web Applications 🚀",
        "I Love Creating User-Friendly Interfaces ✨",
        "I Turn Ideas into Reality 💡"
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function typeText() {
        const typedTextElement = document.querySelector('.typed-text');
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingDelay = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingDelay = 500; // Pause before next text
        }
        
        setTimeout(typeText, typingDelay);
    }

    // Set initial greeting
    setGreeting();
    
    // Update greeting every minute
    setInterval(setGreeting, 60000);
    
    // Start typing animation
    setTimeout(typeText, 1000);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize Isotope for project filtering
    const grid = document.querySelector('.portfolio-grid');
    if (grid) {
        const iso = new Isotope(grid, {
            itemSelector: '.col-md-4',
            layoutMode: 'fitRows'
        });

        document.querySelector('.filters').addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const filterValue = e.target.getAttribute('data-filter');
                iso.arrange({ filter: filterValue === '*' ? null : filterValue });

                document.querySelectorAll('.filters .btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
            }
        });
    }

    // Animate skill bars when they come into view
    const animateSkills = () => {
        const skills = document.querySelectorAll('.progress-bar');
        skills.forEach(skill => {
            const width = skill.style.width;
            skill.style.width = '0%';
            skill.style.width = width;
        });
    };

    // Back to top button
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Navbar background change on scroll
    const navbar = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow');
        } else {
            navbar.classList.remove('shadow');
        }
    });

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Animate skill tags on scroll
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
    });

    // Add hover effect to floating cards
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero-section');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });

    // Animate timeline items on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    const animateTimeline = () => {
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const itemBottom = item.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight * 0.8 && itemBottom > 0) {
                item.classList.add('show');
            }
        });
    };
    
    window.addEventListener('scroll', animateTimeline);
    animateTimeline();

    // Add interactive cube controls
    const cube = document.querySelector('.cube');
    if (cube) {
        let rotateX = 0;
        let rotateY = 0;
        let isMouseDown = false;
        let startX, startY;

        cube.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            startX = e.pageX - rotateY;
            startY = e.pageY - rotateX;
            cube.style.animationPlayState = 'paused';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isMouseDown) return;
            
            rotateY = e.pageX - startX;
            rotateX = e.pageY - startY;
            
            cube.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
        });

        document.addEventListener('mouseup', () => {
            isMouseDown = false;
            cube.style.animationPlayState = 'running';
        });
    }

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            button.appendChild(ripple);
            setTimeout(() => ripple.remove(), 1000);
        });
    });

    // Scroll Progress Indicator
    function updateScrollProgress() {
        const scrollProgress = document.querySelector('.scroll-progress');
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        const progress = `${(scrolled / scrollable) * 100}%`;
        scrollProgress.style.width = progress;
    }

    // Add scroll event listener for progress bar
    window.addEventListener('scroll', updateScrollProgress);

    // Custom cursor
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
        cursorDot.style.display = 'none';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.display = 'block';
        cursorDot.style.display = 'block';
    });
}); 