document.addEventListener('DOMContentLoaded', function() {
    const jacketOverlay = document.getElementById('jacket-overlay');
    const jacketLeft = document.getElementById('jacket-left');
    const jacketRight = document.getElementById('jacket-right');
    const clickPrompt = document.getElementById('click-prompt');
    const animatedItems = document.querySelectorAll('.animate-item');

    jacketOverlay.addEventListener('click', () => {
        // Add 'opened' class to trigger CSS transition for the jacket
        jacketLeft.classList.add('opened');
        jacketRight.classList.add('opened');

        // Fade out the prompt
        clickPrompt.style.opacity = '0';

        // Stagger the animation for the content inside
        animatedItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, 500 + (index * 200)); // 500ms delay to let jacket open a bit
        });

        // After the animation, remove the overlay so content can be selected
        setTimeout(() => {
            jacketOverlay.style.display = 'none';
        }, 2000); // Should match the transition duration
    });
});