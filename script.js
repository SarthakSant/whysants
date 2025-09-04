document.addEventListener('DOMContentLoaded', () => {

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        followerX += (mouseX - followerX) * 0.05;
        followerY += (mouseY - followerY) * 0.05;

        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
        cursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Smooth scrolling for anchor links
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

    // Intersection Observer for scroll-in animations
    const observeElements = document.querySelectorAll('.collection-item, .philosophy p, .section-title');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    observeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });


    // --- NEW: AJAX Form Submission for Formspree ---
    const form = document.querySelector('.notify-form');
    const formButton = form.querySelector('button');
    const originalButtonText = formButton.innerHTML;

    async function handleFormSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        formButton.innerHTML = '...'; // Indicate processing
        
        try {
            const response = await fetch(event.target.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success! Show the checkmark
                formButton.innerHTML = '✓';
                formButton.style.color = '#4CAF50'; // Green color for success
                form.reset();
                
                // Optional: Reset button after a few seconds
                setTimeout(() => {
                    formButton.innerHTML = originalButtonText;
                    formButton.style.color = ''; // Reset color
                }, 4000);

            } else {
                // Handle server errors
                formButton.innerHTML = 'Error';
                formButton.style.color = '#F44336'; // Red for error
            }
        } catch (error) {
            // Handle network errors
            console.error('Form submission error:', error);
            formButton.innerHTML = 'Error';
            formButton.style.color = '#F44336';
        }
    }

    form.addEventListener('submit', handleFormSubmit);

});

