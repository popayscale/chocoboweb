/* script.js */

// Les images sont à la racine (B1.png, D1.png, etc.)
const config = {
    ArrowRight: { prefix: 'D', moveX: -10, moveY: 0 },
    ArrowLeft:  { prefix: 'G', moveX: 10,  moveY: 0 },
    ArrowUp:    { prefix: 'H', moveX: 0,   moveY: 10 },
    ArrowDown:  { prefix: 'B', moveX: 0,   moveY: -10 }
};

const VITESSE_LENTE = 150;
const VITESSE_RAPIDE = 50;

let currentFrame = 1;
let intervalId = null;
let currentDirectionKey = 'ArrowDown';
let isFast = false;

// Positions du décor
let bgPosX = 0;
let bgPosY = 0;

const imgElement = document.getElementById('perso-img');
const bgElement = document.getElementById('background');

function updateAll() {
    const dir = config[currentDirectionKey];
    
    // 1. Animation du personnage
    imgElement.src = `${dir.prefix}${currentFrame}.png`;
    currentFrame = (currentFrame % 4) + 1;

    // 2. Déplacement du décor (Parallaxe)
    // On multiplie le mouvement si on est en mode rapide
    const multiplier = isFast ? 3 : 1;
    bgPosX += dir.moveX * multiplier;
    bgPosY += dir.moveY * multiplier;

    bgElement.style.backgroundPosition = `${bgPosX}px ${bgPosY}px`;
}

function startAnimation(speed) {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(updateAll, speed);
}

document.addEventListener('keydown', (e) => {
    if (!config[e.key]) return;

    if (currentDirectionKey !== e.key) {
        currentDirectionKey = e.key;
        updateAll();
    }

    if (e.repeat && !isFast) {
        isFast = true;
        startAnimation(VITESSE_RAPIDE);
    }
});

document.addEventListener('keyup', (e) => {
    if (config[e.key]) {
        isFast = false;
        startAnimation(VITESSE_LENTE);
    }
});

// Lancement automatique
startAnimation(VITESSE_LENTE);