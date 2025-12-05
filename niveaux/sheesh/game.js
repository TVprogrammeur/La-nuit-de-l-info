const player = document.querySelector('.player');

// Configuration
const LEVEL = 2; // NIVEAU 2

// Préparer les sons
const shootSound = new Audio('piou-piou.mp3');
const hitSound = new Audio('toucher-explosion_point.mp3');
const missSound = new Audio('rater.mp3');

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
    <h2>RÈGLES DU JEU - NIVEAU 2</h2>
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

// Créer l'affichage du score
const scoreDisplay = document.createElement('div');
scoreDisplay.style.cssText = `
    position: fixed;
    top: 20px;
    left: 20px;
    font-size: 24px;
    font-weight: bold;
    color: white;
    background: rgba(0, 0, 0, 0.7);
    padding: 10px 20px;
    border-radius: 5px;
    z-index: 9999;
    display: none;
`;
document.body.appendChild(scoreDisplay);

function updateScoreDisplay() {
    scoreDisplay.textContent = `🎯 Score: ${gameData.score}`;
}

function startTimer() {
    timerDisplay.style.display = 'block';
    scoreDisplay.style.display = 'block'; // AJOUTE CETTE LIGNE
    updateTimerDisplay();
    updateScoreDisplay(); // AJOUTE CETTE LIGNE
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function saveScore() {
    // Récupérer les scores de la session
    const level1Score = parseInt(sessionStorage.getItem('level1Score') || '0');
    const level2Score = parseInt(sessionStorage.getItem('level2Score') || '0');
    
    // Récupérer toutes les parties précédentes
    let allGames = JSON.parse(localStorage.getItem('allGames') || '[]');
    
    // Mettre à jour la dernière partie avec le score du niveau 2
    if (allGames.length > 0) {
        const lastGame = allGames[allGames.length - 1];
        lastGame.level2 = level2Score;
        lastGame.total = level1Score + level2Score;
    }
    
    // Sauvegarder dans localStorage
    localStorage.setItem('allGames', JSON.stringify(allGames));
    
    console.log('Score niveau 2 sauvegardé:', level2Score);
    console.log('Total de la partie:', level1Score + level2Score);
}

function endGame() {
    clearInterval(timerInterval);
    gameStarted = false;
    
    // Sauvegarder le score du niveau 2
    sessionStorage.setItem('level2Score', gameData.score);
    saveScore();
    
    // Créer le bouton Next (vers leaderboard)
    const nextButton = document.createElement('button');
    nextButton.textContent = 'VOIR LE CLASSEMENT 🏆';
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
        box-shif (targetElement) {
                targetElement.remove();
                hitSound.currentTime = 0;
                hitSound.play();
                gameData.score += 10;
                console.log("Score :", gameData.score);
            }adow: 0 4px 6px rgba(0,0,0,0.3);
    `;
    
    nextButton.addEventListener('mouseenter', () => {
        nextButton.style.background = '#45a049';
    });
    
    nextButton.addEventListener('mouseleave', () => {
        nextButton.style.background = '#4CAF50';
    });
    
    nextButton.addEventListener('click', () => {
        // Nettoyer la session après avoir vu le leaderboard
        sessionStorage.clear();
        window.location.href = '../leaderboard.html';
    });
    
    document.body.appendChild(nextButton);
}

let gameData = { score: 0 };

// Fonction pour tirer une balle vers une position ou un élément
function shoot(targetX, targetY, targetElement = null) {
    shootSound.currentTime = 0;
    shootSound.play();

    const ball = document.createElement('div');
    ball.classList.add('ball');
    document.body.appendChild(ball);

    const startX = player.offsetLeft + player.offsetWidth / 2 - 60;
    const startY = player.offsetTop + player.offsetHeight / 2 - 70;
    ball.style.left = startX + 'px';
    ball.style.top = startY + 'px';

    const dx = targetX - startX;
    const dy = targetY - startY;
    const distance = Math.sqrt(dx*dx + dy*dy);
    const angle = 90 + Math.atan2(dy, dx) * 180 / Math.PI;
    ball.style.transform = `rotate(${angle}deg)`;

    const speed = 10;
    let step = 0;

    function animate() {
        step += speed;
        const progress = step / distance;
        if (progress >= 1) {
            if (targetElement) {
                targetElement.remove();
                hitSound.currentTime = 0;
                hitSound.play();
                gameData.score += 10;
                updateScoreDisplay(); // AJOUTE CETTE LIGNE
                console.log("Score :", gameData.score);
            } else {
                missSound.currentTime = 0;
                missSound.play();
            }
            ball.remove();
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
    if (!gameStarted) {
        rulesPopup.remove();
        gameStarted = true;
        startTimer();
    }
    
    if (timeLeft <= 0) return;
    
    const target = e.target;
    let targetElement = null;
    
    if (target !== document.body && target !== player && target !== timerDisplay && target !== scoreDisplay) {
        targetElement = target;
    }
    
    const targetX = e.clientX - 10 + window.scrollX;
    const targetY = e.clientY - 10 + window.scrollY;
    
    shoot(targetX, targetY, targetElement);
});