// Loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading-overlay');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Enhanced hover effect for info boxes with 3D transform
document.querySelectorAll('.info-box').forEach(box => {
    box.addEventListener('mousemove', (e) => {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xRotation = ((y - rect.height / 2) / rect.height) * 20;
        const yRotation = ((x - rect.width / 2) / rect.width) * 20;
        
        box.style.transform = `perspective(1000px) rotateX(${-xRotation}deg) rotateY(${yRotation}deg) scale(1.05)`;
    });
    
    box.addEventListener('mouseleave', () => {
        box.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Typing effect for name
const nameElement = document.querySelector('.sidebar h2');
const originalText = nameElement.textContent;
nameElement.innerHTML = '<span></span>';
const textSpan = nameElement.querySelector('span');

function typeWriter(text, i = 0) {
    if (i < text.length) {
        textSpan.textContent += text.charAt(i);
        setTimeout(() => typeWriter(text, i + 1), 100);
    }
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(() => typeWriter(originalText), 500);
});

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
let isDarkMode = true;

themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.style.background = isDarkMode ? '#1c1c1c' : '#f0f0f0';
    document.body.style.color = isDarkMode ? '#ffffff' : '#333333';
    themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    
    // Update other theme-dependent elements
    document.documentElement.style.setProperty('--bg-dark', isDarkMode ? '#1c1c1c' : '#f0f0f0');
    document.documentElement.style.setProperty('--bg-lighter', isDarkMode ? '#222' : '#ffffff');
    document.documentElement.style.setProperty('--card-bg', isDarkMode ? '#333' : '#ffffff');
    document.documentElement.style.setProperty('--text-light', isDarkMode ? '#ffffff' : '#333333');
});

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    const fab = document.querySelector('.fab');
    if (window.scrollY > 300) {
        fab.style.opacity = '1';
        fab.style.pointerEvents = 'auto';
    } else {
        fab.style.opacity = '0';
        fab.style.pointerEvents = 'none';
    }
});

// Add intersection observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.info-box').forEach(box => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(50px)';
    observer.observe(box);
});