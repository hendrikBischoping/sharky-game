let canvas;
let world;
let keyboard = new Keyboard();
let btnUp = document.getElementById('');
let btnDown = document.getElementById('');
let btnLeft = document.getElementById('');
let btnRight = document.getElementById('');
let btnD = document.getElementById('');
let btnF = document.getElementById('');
let restartButton = document.getElementById('restartButton');
let openMenuBtn = document.getElementById('openMenuBtn');
let closeMenuBtn = document.getElementById('closeMenuBtn');
let instructions = document.getElementById('instructions');
let canvasContentRef = document.getElementById('canvasContent')
let fullscreenOn = document.getElementById('fullscreenOnBtn');
let fullscreenOff = document.getElementById('fullscreenOffBtn');
let canvasContent = document.getElementById('canvasContent');
let mainScreens = document.getElementById('mainScreens');
let winnerScreen = document.getElementById('winnerScreen');
let gameOverScreen = document.getElementById('gameOverScreen');
let startScreen = document.getElementById('startScreen');
let startButton = document.getElementById('startButton');
let soundOn = document.getElementById('toggleSoundOnBtn');
let soundOff = document.getElementById('toggleSoundOffBtn');
let controlArrows = document.getElementById('controlArrows');
let attackButtons = document.getElementById('attackButtons');
let gameStarted = false;
let gameOver = false;
let isMuted;
let isFullscreen = false;

function checkOrientation() {
    if (window.matchMedia("(orientation: portrait)").matches && window.innerWidth <= 768) {
        onPortraitMode();
    } else {
        onLandscapeMode();
    }
}

function onPortraitMode() {
    let turnMobileAdvice = document.getElementById('turnMobileAdvice');
    turnMobileAdvice.classList.remove('d_none')
}

function onLandscapeMode() {
    let turnMobileAdvice = document.getElementById('turnMobileAdvice');
    turnMobileAdvice.classList.add('d_none');
    if (window.innerWidth <= 768) {
        fullscreenOn.classList.add('d_none');
        attackButtons.classList.remove('d_none');
        controlArrows.classList.remove('d_none');
    } else {
        attackButtons.classList.add('d_none');
        controlArrows.classList.add('d_none');
    }
}

function startGame() {
    openMenuBtn.classList.remove('d_none');
    fullscreenOn.classList.remove('d_none');
    instructions.classList.add('d_none')
    startScreen.classList.add('d_none');
    startButton.classList.add('d_none');
    restartButton.classList.add('d_none');
    if (!isMuted) {
        soundOn.classList.remove('d_none');
    } else {soundOff.classList.remove('d_none');}
    resumeGame();
}

function openInstructions() {
    instructions.classList.remove('d_none')
    openMenuBtn.classList.add('d_none')
    closeMenuBtn.classList.remove('d_none')
    stopGame();
}

function showInstructions() {
    instructions.classList.add('instructionsOnHoverStart');
}

function hideInstructions() {
    instructions.classList.remove('instructionsOnHoverStart');
}

function closeInstructions() {
    resumeGame();
}

function restartGame() {
    location.reload();
}

function showWinnerScreen() {
    if (!isMuted) {
        world.youWinAudio.play();
    }
    mainScreens.classList.remove('d_none');
    winnerScreen.classList.remove('d_none');
    restartButton.classList.remove('d_none');
    openMenuBtn.classList.add('d_none')
    if (isFullscreen) {
        winnerScreen.classList.add('fullWinnerScreen')
    } else { winnerScreen.classList.remove('fullWinnerScreen') }
}

function showGameOverScreen() {
    if (!isMuted) {
        world.gameOverAudio.play();
    }
    mainScreens.classList.remove('d_none');
    gameOverScreen.classList.remove('d_none');
    restartButton.classList.remove('d_none');
    openMenuBtn.classList.add('d_none')
}

function getAllAudios() {
    if (!world) return [];
    return [
        world.underWaterAudio,
        world.bubbleShootAudio,
        world.bubbleKillAudio,
        world.bossHurtAudio,
        world.sharkyHurtAudio,
        world.bossSpawnAudio,
        world.itemCollectAudio,
        world.youWinAudio,
        world.gameOverAudio,
        world.bossAttackAudio
    ];
}

function switchTollgeSoundBtn() {
    soundOn.classList.toggle('d_none', !isMuted);
    soundOff.classList.toggle('d_none', isMuted);
    toggleSound();
}

function toggleSound() {
    isMuted = !isMuted;
    if (isMuted) {
        soundOn.classList.add('d_none');
        soundOff.classList.remove('d_none');
        localStorage.setItem("isMuted", JSON.stringify(true));
    } else {localStorage.setItem("isMuted", JSON.stringify(false));
        soundOn.classList.remove('d_none');
        soundOff.classList.add('d_none');}
    let allAudios = getAllAudios();
    allAudios.forEach((audio) => {
        if (audio) {
            audio.muted = isMuted;
        }
    });
}

function switchToggleFullscreenBtn() {

    if (!isFullscreen) {
        openFullscreen(canvasContent);
        fullscreenOn.classList.add('d_none');
        fullscreenOff.classList.remove('d_none');
    } else {
        closeFullscreen();
        fullscreenOff.classList.add('d_none');
        fullscreenOn.classList.remove('d_none');
    }

    isFullscreen = !isFullscreen; // Fullscreen-Status umschalten
}

function openFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { /* Safari */
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE11 */
        element.msRequestFullscreen();
    }
    startScreen.classList.add('fullStartScreen')

    resizeCanvasContent(); // Größe des Canvas anpassen
}

/* Vollbildmodus verlassen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
    startScreen.classList.remove('fullStartScreen')

    resetCanvasSize(); // Standardgröße wiederherstellen
}

function resizeCanvasContent() {
    let canvas = document.getElementById('canvas');

    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    let aspectRatio = 720 / 480;
    let newWidth = screenWidth;
    let newHeight = newWidth / aspectRatio;

    if (newHeight > screenHeight) {
        newHeight = screenHeight;
        newWidth = newHeight * aspectRatio;
    }

    canvas.style.width = `${newWidth}px`;
    canvas.style.height = `${newHeight}px`;
}

function resetCanvasSize() {
    let canvas = document.getElementById('canvas');
    canvas.style.width = "720px";
    canvas.style.height = "480px";
}

function calcHitbox(x, y) {
    this.calcNewX(x);
    this.calcNewY(y);
}

function init() {
    if (localStorage.getItem("isMuted") === null) {
        localStorage.setItem("isMuted", JSON.stringify(false));
    }
    isMuted = JSON.parse(localStorage.getItem("isMuted"));
    console.log(isMuted);    
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    setInterval(() => {

        checkOrientation();

    }, 500);
    window.addEventListener('keydown', (e) => {
        if (e.keyCode == 39) {
            keyboard.right = true;
        }
        if (e.keyCode == 37) {
            keyboard.left = true;
        }
        if (e.keyCode == 38) {
            keyboard.up = true;
        }
        if (e.keyCode == 40) {
            keyboard.down = true;
        }
        if (e.keyCode == 32) {
            keyboard.space = true;
        }
        if (e.keyCode == 68) {
            keyboard.d = true;
        }
        if (e.keyCode == 70) {
            keyboard.f = true;
        } if (e.keyCode == 27 && isFullscreen) {
            startScreen.classList.remove('fullStartScreen');
            canvas.classList.add('canvasDefault');
            closeFullscreen();
        }
    });

    window.addEventListener('keyup', (e) => {
        if (e.keyCode == 39) {
            keyboard.right = false;
        }
        if (e.keyCode == 37) {
            keyboard.left = false;
        }
        if (e.keyCode == 38) {
            keyboard.up = false
        }
        if (e.keyCode == 40) {
            keyboard.down = false;
        }
        if (e.keyCode == 32) {
            pauseAndContinue();
        }
        if (e.keyCode == 68) {
            keyboard.d = false;
        }
        if (e.keyCode == 70) {
            keyboard.f = false;
        }
    });

    this.btnUp.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.up = true;
    });

    this.btnUp.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.up = false;
    });

    this.btnDown.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.down = true;
    });

    this.btnDown.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.down = false;
    });

    this.btnLeft.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.left = true;
    });

    this.btnLeft.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.left = false;
    });

    this.btnRight.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.right = true;
    });

    this.btnRight.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.right = false;
    });

    this.btnD.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.d = true;
    });

    this.btnD.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.d = false;
    });

    this.btnF.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.f = true;
    });

    this.btnF.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.f = false;
    });
}

setTimeout(() => {
    stopGame()
}, 200);