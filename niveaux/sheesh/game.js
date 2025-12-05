const player = document.querySelector('.player');

// Préparer les sons
const shootSound = new Audio('piou-piou.mp3'); // son du tir
const hitSound = new Audio('toucher-explosion_point.mp3');     // son quand on touche
const missSound = new Audio('rater.mp3');   // son quand on rate

// Fonction pour tirer une balle vers une position ou un élément
function shoot(targetX, targetY, targetElement = null) {
    // Jouer le son de tir
    shootSound.currentTime = 0; // pour pouvoir le rejouer rapidement
    shootSound.play();

    const ball = document.createElement('div');
    ball.classList.add('ball');
    document.body.appendChild(ball);

    // Position initiale de la balle (au joueur)
    const startX = player.offsetLeft + player.offsetWidth / 2 - 60;
    const startY = player.offsetTop + player.offsetHeight / 2 - 70;
    ball.style.left = startX + 'px';
    ball.style.top = startY + 'px';

    const dx = targetX - startX;
    const dy = targetY - startY;
    const distance = Math.sqrt(dx*dx + dy*dy);
    const angle = 90 + Math.atan2(dy, dx) * 180 / Math.PI; // angle en degrés
    ball.style.transform = `rotate(${angle}deg)`;

    const speed = 20;
    let step = 0;

    function animate() {
        step += speed;
        const progress = step / distance;
        if (progress >= 1) {
            if (targetElement) {
                targetElement.remove(); // supprime la cible
                hitSound.currentTime = 0;
                hitSound.play(); // jouer son de touche
            } else {
                missSound.currentTime = 0;
                missSound.play(); // jouer son de raté
            }
            ball.remove(); // supprime toujours la balle
            return;
        }
        ball.style.left = startX + dx * progress + 'px';
        ball.style.top = startY + dy * progress + 'px';
        requestAnimationFrame(animate);
    }

    animate();
}

// Événement click sur toute la page
document.addEventListener('click', (e) => {
    const target = e.target;
    let targetElement = null;

    // Vérifie si le clic est sur une cible
    if (target !== document.body && target !== document.footer && target !== player) {
        targetElement = target;
    }

    const targetX = e.clientX - 10 + window.scrollX;
    const targetY = e.clientY - 10 + window.scrollY;

    shoot(targetX, targetY, targetElement);
});
