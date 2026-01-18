// Directions et animations perso
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

// Positions décor
let posBack = 0;
let posMid = 0;
let posFront = 0;

const imgElement = document.getElementById('perso-img');
const back = document.querySelector('.back');
const mid = document.querySelector('.mid');
const front = document.querySelector('.front');

function updateAll() {
    const dir = config[currentDirectionKey];

    // Animation personnage
    imgElement.src = `${dir.prefix}${currentFrame}.png`;
    currentFrame = (currentFrame % 4) + 1;

    const multiplier = isFast ? 3 : 1;

    // Parallax (vitesses différentes)
    posBack  += dir.moveX * 0.2 * multiplier;
    posMid   += dir.moveX * 0.5 * multiplier;
    posFront += dir.moveX * 1.0 * multiplier;

    back.style.backgroundPositionX  = posBack + "px";
    mid.style.backgroundPositionX   = posMid + "px";
    front.style.backgroundPositionX = posFront + "px";
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

// Lancement
startAnimation(VITESSE_LENTE);
