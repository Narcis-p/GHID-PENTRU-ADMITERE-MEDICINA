document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.lectie-card');
    const bgAnimation = document.querySelector('.background-animation');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const color = window.getComputedStyle(card).backgroundColor;
            bgAnimation.style.backgroundColor = color;
        });
        card.addEventListener('mouseleave', () => {
            bgAnimation.style.backgroundColor = 'transparent';
        });
    });
});