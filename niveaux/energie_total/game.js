const player = document.querySelector('.player');

// Préparer les sons
const shootSound = new Audio('piou-piou.mp3'); // son du tir
const hitSound = new Audio('toucher-explosion_point.mp3');     // son quand on touche
const missSound = new Audio('rater.mp3');   // son quand on rate

let gameStarted = false;
let timeLeft = 30;
let timerInterval = null;

// Créer la popup des règles
const rulesPopup = document.createElement('div');
rulesPopup.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 30px;
    border-radius: 10px;
    z-index: 10000;
    text-align: center;
    font-size: 18px;
`;
rulesPopup.innerHTML = `
    <h2>RÈGLES DU JEU</h2>
    <p>- Tir avec le clic gauche de la souris sur les éléments de la page</p>
    <p>- Tu as 30s pour faire le meilleur score</p>
    <p><strong>Clique n'importe où pour commencer !</strong></p>
`;
document.body.appendChild(rulesPopup);

// Créer l'affichage du timer
const timerDisplay = document.createElement('div');
timerDisplay.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    font-size: 24px;
    font-weight: bold;
    color: white;
    background: rgba(0, 0, 0, 0.7);
    padding: 10px 20px;
    border-radius: 5px;
    z-index: 9999;
    display: none;
`;
document.body.appendChild(timerDisplay);

function updateTimerDisplay() {
    timerDisplay.textContent = `⏱️ ${timeLeft}s`;
}

function startTimer() {
    timerDisplay.style.display = 'block';
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timerInterval);
    gameStarted = false;
    
    // Créer le bouton Next
    const nextButton = document.createElement('button');
    nextButton.textContent = 'NEXT ➔';
    nextButton.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #4CAF50;
        color: white;
        font-size: 24px;
        font-weight: bold;
        padding: 20px 40px;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        z-index: 10000;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
    `;
    
    nextButton.addEventListener('mouseenter', () => {
        nextButton.style.background = '#45a049';
    });
    
    nextButton.addEventListener('mouseleave', () => {
        nextButton.style.background = '#4CAF50';
    });
    
    nextButton.addEventListener('click', () => {
        window.location.href = 'file:///home/l45/Documents/La-nuit-de-l-info/niveaux/sheesh/index.html'; // Remplacez par l'URL de votre page
    });
    
    document.body.appendChild(nextButton);
}

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

    const speed = 10;
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
    // Premier clic : fermer la popup et démarrer le jeu
    if (!gameStarted) {
        rulesPopup.remove();
        gameStarted = true;
        startTimer();
    }
    
    // Empêcher de tirer après la fin du jeu
    if (timeLeft <= 0) return;
    
    const target = e.target;
    let targetElement = null;
    
    if (target !== document.body && target !== player && target !== timerDisplay) {
        targetElement = target;
    }
    
    const targetX = e.clientX - 10 + window.scrollX;
    const targetY = e.clientY - 10 + window.scrollY;
    
    shoot(targetX, targetY, targetElement);
});
