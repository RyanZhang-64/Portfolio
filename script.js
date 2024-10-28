// Smooth scrolling for navigation items and project links
document.querySelectorAll('.nav-item, .project-link').forEach(item => {
    item.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });

});

const navItemContainers = document.querySelectorAll('.nav-item-container');

navItemContainers.forEach(container => {
    const navItem = container.querySelector('.nav-item');
    const sectionTarget = container.dataset.target;
    const iconName = container.dataset.icon || 'house-fill';
    const title = navItem.getAttribute('title');
    
    // Create icon element
    const iconElement = document.createElement('span');
    iconElement.classList.add('nav-icon');
    iconElement.innerHTML = `<i class="bi bi-${iconName}"></i>`;
    navItem.appendChild(iconElement);
    
    // Create text element for the capsule
    const textElement = document.createElement('span');
    textElement.classList.add('nav-text');
    textElement.textContent = title;
    navItem.appendChild(textElement);
    
    // Create a hidden element for width calculation
    const measureElement = document.createElement('span');
    measureElement.style.visibility = 'hidden';
    measureElement.style.position = 'absolute';
    measureElement.style.padding = '5px';
    measureElement.style.whiteSpace = 'nowrap';
    measureElement.textContent = title;
    document.body.appendChild(measureElement);
    
    // Calculate the required width for the expanded state
    const textWidth = measureElement.offsetWidth;
    const expandedWidth = textWidth + 10;
    navItem.style.setProperty('--expanded-width', `${expandedWidth}px`);
    
    // Remove the measuring element
    document.body.removeChild(measureElement);

    let showTextTimeout;
    let collapseTimeout;

    navItem.addEventListener('mouseenter', () => {
        clearTimeout(showTextTimeout);
        clearTimeout(collapseTimeout);
        
        iconElement.classList.add('hidden');
        textElement.classList.remove('visible');
        
        navItem.classList.add('expanded');
        showTextTimeout = setTimeout(() => {
            textElement.classList.add('visible');
        }, 150);
    });

    navItem.addEventListener('mouseleave', () => {
        clearTimeout(showTextTimeout);
        clearTimeout(collapseTimeout);
        
        textElement.classList.remove('visible');
        
        collapseTimeout = setTimeout(() => {
            navItem.classList.remove('expanded');
            iconElement.classList.remove('hidden');
        }, 150);
    });
});

const observerOptions = {
    // Trigger when section is 50% visible
    threshold: 0.5,
    
    // Optional: Add root margin if needed
    // rootMargin: '0px'
};

// Intersection Observer code remains the same as before, but update the handlers
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (sectionNavMap.has(entry.target)) {
            const navData = sectionNavMap.get(entry.target);
            const iconElement = navData.navItem.querySelector('.nav-icon');
            
            if (entry.isIntersecting) {
                entry.target.setAttribute('data-active', '');
                iconElement.classList.add('hidden');
                navData.navItem.classList.add('expanded');
                clearTimeout(navData.showTextTimeout);
                navData.showTextTimeout = setTimeout(() => {
                    navData.textElement.classList.add('visible');
                }, 150);
            } else {
                entry.target.removeAttribute('data-active');
                clearTimeout(navData.showTextTimeout);
                clearTimeout(navData.collapseTimeout);
                navData.textElement.classList.remove('visible');
                navData.collapseTimeout = setTimeout(() => {
                    navData.navItem.classList.remove('expanded');
                    iconElement.classList.remove('hidden');
                }, 150);
            }
        }
    });
}, observerOptions);

// Handle scroll event (debounced)
const logo = document.getElementById('name-logo');
const windowHeight = window.innerHeight;

// Debounce function to limit how often a function is called
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const handleScroll = debounce(() => {
    const scrollPosition = container.scrollTop;
    
    if (scrollPosition > 0) {
        logo.classList.add('visible');
    } else {
        logo.classList.remove('visible');
    }

    navItemContainers.forEach(container => {
        const navItem = container.querySelector('.nav-item');
        const targetId = container.getAttribute('data-target');

        if (targetId) {
            console.log("logged");
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const sectionTop = targetSection.offsetTop;
                // Check if the current section is in view
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + windowHeight) {
                    console.log("hello");
                    navItem.style.transform = 'scale(1.2)';
                } else {
                    navItem.style.transform = 'scale(1)';
                }
            }
        }
    });
}, 50);

// Bubble animation setup
const svg = document.getElementById('animation-container');
const originX = window.innerWidth * (7/8);
const originY = window.innerHeight * (1/3);
const fadeInThreshold = 100;
const maxBubbles = 20;
const bubbleInterval = 500; // Interval between bubble creations

// Initialize tooltips and start animations on window load
window.addEventListener('load', function() {
    // Initialize Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        console.log("done");
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    // Typing animation for name
    const text = "Ryan Zhang";
    const typedTextElement = document.getElementById('typed-text');
    let index = 0;

    function typeText() {
        if (index < text.length) {
            typedTextElement.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeText, 150); // Adjust typing speed here (milliseconds)
        }
    }

    typeText();
    setInterval(createBubble, bubbleInterval);
});

// Bubble creation and animation
const words = text.split(" ");
let currentIndex = 0;

function createBubble() {
    if (svg.childElementCount >= maxBubbles) return;

    const text = words[currentIndex];
    currentIndex = (currentIndex + 1) % words.length;
    const bubble = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    bubble.setAttribute('x', originX);
    bubble.setAttribute('y', originY);
    bubble.setAttribute('textAlign', 'center');
    bubble.setAttribute('fill', `rgba(, 0, 0, 0)`);
    bubble.setAttribute('class', 'bubble');
    bubble.textContent = text;

    svg.appendChild(bubble);

    const speed = 1 + Math.random();
    let opacity = 1;
    let horizontalDirection = Math.random() < 0.5 ? -1 : 1;
    let horizontalPosition = 0;

    function animateBubble() {
        const currentY = parseFloat(bubble.getAttribute('y'));
        const newY = currentY - speed;

        horizontalPosition += 0.5 * horizontalDirection;
        if (Math.abs(horizontalPosition) > 20) {
            horizontalDirection *= -1;
        }

        const newX = originX + horizontalPosition;

        if (newY < fadeInThreshold) {
            opacity = Math.min(1, opacity - 0.02);
        }

        bubble.setAttribute('x', newX);
        bubble.setAttribute('y', newY);
        bubble.setAttribute('fill', `rgba(255, 255, 255, ${opacity})`);

        if (newY > 0) {
            requestAnimationFrame(animateBubble);
        } else {
            svg.removeChild(bubble);
        }
    }

    animateBubble();
}

// Project image hover effect
document.addEventListener('DOMContentLoaded', (event) => {
    const project1 = document.querySelector('.project-1');
    const titleImage = document.getElementById('title-image');
    const colDiv = document.querySelector('.col-14');
    const titleArea = colDiv.querySelector('.title-area');
    const textElements = titleArea.querySelectorAll('h1, h3');

    project1.addEventListener('mouseenter', () => {
        titleImage.style.opacity = '1';
        textElements.forEach(el => {
            el.style.transition = 'opacity 0.5s';
            el.style.opacity = '0';
        });
    });

    project1.addEventListener('mouseleave', () => {
        titleImage.style.opacity = '0';
        textElements.forEach(el => {
            el.style.transition = 'opacity 0.5s';
            el.style.opacity = '1';
        });
    });

    var carousel = document.getElementById('carousel2');
    var textBlock = document.getElementById('beneath-carousel');

    carousel.addEventListener('slid.bs.carousel', function() {
        var activeSlide = this.querySelector('.carousel-item.active');
        var slideIndex = Array.from(activeSlide.parentNode.children).indexOf(activeSlide);

        if (slideIndex === 2) { // Index 2 corresponds to the third slide (0-based index)
            textBlock.style.opacity = '0';
            textBlock.style.pointerEvents = 'none';
            carousel.style.transform = 'translateY(20%)';
        } else {
            textBlock.style.opacity = '1';
            textBlock.style.pointerEvents = 'auto';
            carousel.style.transform = 'none';
        }
    });
});