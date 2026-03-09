// ===== Portfolio Interactivity =====

// Type Definitions
interface TypingConfig {
    texts: string[];
    speed: number;
    deleteSpeed: number;
    pauseTime: number;
}

// ===== Theme Toggle =====
const themeToggle = document.getElementById('theme-toggle') as HTMLButtonElement;
const html = document.documentElement;

function setTheme(theme: 'dark' | 'light'): void {
    if (theme === 'light') {
        html.classList.add('light');
    } else {
        html.classList.remove('light');
    }
    localStorage.setItem('theme', theme);

    const darkIcon = themeToggle.querySelector('.theme-icon-dark') as HTMLElement;
    const lightIcon = themeToggle.querySelector('.theme-icon-light') as HTMLElement;
    if (theme === 'light') {
        darkIcon.classList.add('hidden');
        lightIcon.classList.remove('hidden');
    } else {
        darkIcon.classList.remove('hidden');
        lightIcon.classList.add('hidden');
    }
}

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
setTheme(savedTheme || 'dark');

themeToggle.addEventListener('click', () => {
    const current = html.classList.contains('light') ? 'light' : 'dark';
    setTheme(current === 'dark' ? 'light' : 'dark');
});

// ===== Mobile Hamburger Menu =====
const hamburger = document.getElementById('hamburger') as HTMLButtonElement;
const mobileMenu = document.getElementById('mobile-menu') as HTMLDivElement;
const mobileLinks = document.querySelectorAll('.mobile-link') as NodeListOf<HTMLAnchorElement>;
let menuOpen: boolean = false;

function toggleMenu(): void {
    menuOpen = !menuOpen;
    if (menuOpen) {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        hamburger.classList.add('hamburger-open');
        document.body.style.overflow = 'hidden';
    } else {
        mobileMenu.classList.add('translate-x-full');
        mobileMenu.classList.remove('translate-x-0');
        hamburger.classList.remove('hamburger-open');
        document.body.style.overflow = '';
    }
}

hamburger.addEventListener('click', toggleMenu);
mobileLinks.forEach((link: HTMLAnchorElement) => {
    link.addEventListener('click', () => {
        if (menuOpen) toggleMenu();
    });
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar') as HTMLElement;

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// ===== Active Nav Link Highlighting =====
const sections = document.querySelectorAll('section[id]') as NodeListOf<HTMLElement>;
const navLinks = document.querySelectorAll('.nav-link') as NodeListOf<HTMLAnchorElement>;

function highlightNav(): void {
    const scrollPos: number = window.scrollY + 120;

    sections.forEach((section: HTMLElement) => {
        const top: number = section.offsetTop;
        const height: number = section.offsetHeight;
        const id: string = section.getAttribute('id') || '';

        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach((link: HTMLAnchorElement) => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNav);

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll('.reveal-el') as NodeListOf<HTMLElement>;

const revealObserver = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry, index: number) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    (entry.target as HTMLElement).classList.add('revealed');
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

revealElements.forEach((el: HTMLElement) => revealObserver.observe(el));

// ===== Typing Effect =====
const typedTextEl = document.getElementById('typed-text') as HTMLSpanElement;

const typingConfig: TypingConfig = {
    texts: [
        'Full Stack Developer',
        'CSE Student',
        'MERN Stack Developer',
        'Tech Enthusiast',
        'Problem Solver'
    ],
    speed: 80,
    deleteSpeed: 40,
    pauseTime: 2000
};

let textIndex: number = 0;
let charIndex: number = 0;
let isDeleting: boolean = false;

function typeEffect(): void {
    const currentText: string = typingConfig.texts[textIndex];

    if (isDeleting) {
        typedTextEl.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextEl.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let delay: number = isDeleting ? typingConfig.deleteSpeed : typingConfig.speed;

    if (!isDeleting && charIndex === currentText.length) {
        delay = typingConfig.pauseTime;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingConfig.texts.length;
        delay = 500;
    }

    setTimeout(typeEffect, delay);
}

// Start typing effect
typeEffect();
