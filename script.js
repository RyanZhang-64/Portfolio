// Smooth scrolling for navigation items and project links
document.querySelectorAll('.nav-item, .project-link').forEach(item => {
    item.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

// Select important elements
const container = document.querySelector('.container-snap');
const navItemContainers = document.querySelectorAll('.nav-item-container');
const navItems = document.querySelectorAll('.nav-item');

// Animation settings
const animationDuration = 300; // in milliseconds
const delayBetweenCircles = 100;

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

// Handle scroll event (debounced)
const logo = document.getElementById('name-logo');
const windowHeight = window.innerHeight;

const handleScroll = debounce(() => {
    const scrollPosition = container.scrollTop;
    
    if (scrollPosition > 0) {
        logo.classList.add('visible');
    } else {
        logo.classList.remove('visible');
    }

    navItemContainers.forEach(container => {
        const navItem = container.querySelector('.nav-item');
        const smallCircles = container.querySelectorAll('.small-circle');
        const targetId = container.getAttribute('data-target');

        if (targetId) {
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const sectionTop = targetSection.offsetTop;
                // Check if the current section is in view
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + windowHeight) {
                    navItem.style.transform = 'scale(1.2)';
                    triggerShowSmallCircles(smallCircles);
                } else {
                    navItem.style.transform = 'scale(1)';
                    triggerHideSmallCircles(smallCircles);
                }
            }
        }
    });
}, 50);

// Add scroll event listener
container.addEventListener('scroll', handleScroll);

// Functions to show and hide small circles
function triggerShowSmallCircles(circles) {
    circles.forEach((circle, index) => {
        clearTimeout(circle.hideTimeout);
        circle.showTimeout = setTimeout(() => {
            circle.classList.add('fade-in');
        }, (circles.length - 1 - index) * delayBetweenCircles);
    });
}

function triggerHideSmallCircles(circles) {
    circles.forEach((circle, index) => {
        clearTimeout(circle.showTimeout);
        circle.hideTimeout = setTimeout(() => {
            circle.classList.remove('fade-in');
        }, index * delayBetweenCircles);
    });
}

// Add hover and click effects for nav items and small circles
navItemContainers.forEach(container => {
    const navItem = container.querySelector('.nav-item');
    const smallCircles = container.querySelectorAll('.small-circle');
    let isHovering = false;

    navItem.addEventListener('mouseenter', () => {
        isHovering = true;
        triggerShowSmallCircles(smallCircles);
    });

    container.addEventListener('mouseleave', () => {
        isHovering = false;
        setTimeout(() => {
            if (!isHovering) {
                triggerHideSmallCircles(smallCircles);
            }
        }, animationDuration);
    });

    smallCircles.forEach((circle, index) => {
        circle.addEventListener('click', (event) => {
            if (event.target.classList.contains('fade-in')) {
                console.log(`Clicked small circle ${index + 1} for ${container.getAttribute('data-target')}`);
            }
        });
    });
});

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