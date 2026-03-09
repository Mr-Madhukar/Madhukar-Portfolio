// ===== Portfolio Interactivity =====
"use strict";
// ===== Theme Toggle =====
var themeToggle = document.getElementById('theme-toggle');
var html = document.documentElement;
function setTheme(theme) {
    if (theme === 'light') {
        html.classList.add('light');
    }
    else {
        html.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
    var darkIcon = themeToggle.querySelector('.theme-icon-dark');
    var lightIcon = themeToggle.querySelector('.theme-icon-light');
    if (theme === 'light') {
        darkIcon.classList.add('hidden');
        lightIcon.classList.remove('hidden');
    }
    else {
        darkIcon.classList.remove('hidden');
        lightIcon.classList.add('hidden');
    }
}
// Initialize theme from localStorage
var savedTheme = localStorage.getItem('theme');
setTheme(savedTheme || 'dark');
themeToggle.addEventListener('click', function () {
    var current = html.classList.contains('light') ? 'light' : 'dark';
    setTheme(current === 'dark' ? 'light' : 'dark');
});
// ===== Mobile Hamburger Menu =====
var hamburger = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobile-menu');
var mobileLinks = document.querySelectorAll('.mobile-link');
var menuOpen = false;
function toggleMenu() {
    menuOpen = !menuOpen;
    if (menuOpen) {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        hamburger.classList.add('hamburger-open');
        document.body.style.overflow = 'hidden';
    }
    else {
        mobileMenu.classList.add('translate-x-full');
        mobileMenu.classList.remove('translate-x-0');
        hamburger.classList.remove('hamburger-open');
        document.body.style.overflow = '';
    }
}
hamburger.addEventListener('click', toggleMenu);
mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        if (menuOpen)
            toggleMenu();
    });
});
// ===== Navbar Scroll Effect =====
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    }
    else {
        navbar.classList.remove('navbar-scrolled');
    }
});
// ===== Active Nav Link Highlighting =====
var sections = document.querySelectorAll('section[id]');
var navLinks = document.querySelectorAll('.nav-link');
function highlightNav() {
    var scrollPos = window.scrollY + 120;
    sections.forEach(function (section) {
        var top = section.offsetTop;
        var height = section.offsetHeight;
        var id = section.getAttribute('id') || '';
        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(function (link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}
window.addEventListener('scroll', highlightNav);
// ===== Scroll Reveal Animation =====
var revealElements = document.querySelectorAll('.reveal-el');
var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, index) {
        if (entry.isIntersecting) {
            setTimeout(function () {
                entry.target.classList.add('revealed');
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revealElements.forEach(function (el) { return revealObserver.observe(el); });
// ===== Typing Effect =====
var typedTextEl = document.getElementById('typed-text');
var typingTexts = [
    'Full Stack Developer',
    'CSE Student',
    'MERN Stack Developer',
    'Tech Enthusiast',
    'Problem Solver'
];
var typingSpeed = 80;
var deleteSpeed = 40;
var pauseTime = 2000;
var textIndex = 0;
var charIndex = 0;
var isDeleting = false;
function typeEffect() {
    var currentText = typingTexts[textIndex];
    if (isDeleting) {
        typedTextEl.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    }
    else {
        typedTextEl.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    var delay = isDeleting ? deleteSpeed : typingSpeed;
    if (!isDeleting && charIndex === currentText.length) {
        delay = pauseTime;
        isDeleting = true;
    }
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        delay = 500;
    }
    setTimeout(typeEffect, delay);
}
// Start typing effect
typeEffect();
