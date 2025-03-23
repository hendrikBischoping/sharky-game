let canvas;
let world;
let keyboard = new Keyboard();
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

/** checks if a mobile device is oriented in profile or landscape direction */
function checkOrientation() {
    if (window.matchMedia("(orientation: portrait)").matches && window.innerWidth <= 768) {
        onPortraitMode();
    } else {
        onLandscapeMode();
    }
}

/** shows 'turn device message' when device is in portrait mode */
function onPortraitMode() {
    let turnMobileAdvice = document.getElementById('turnMobileAdvice');
    turnMobileAdvice.classList.remove('d_none')
}

/** removes 'turn device message' and adds control buttons when device is in landscape mode */
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

/** changes from start screen into new game */
function startGame() {
    openMenuBtn.classList.remove('d_none');
    fullscreenOn.classList.remove('d_none');
    instructions.classList.add('d_none')
    startScreen.classList.add('d_none');
    startButton.classList.add('d_none');
    restartButton.classList.add('d_none');
    if (!isMuted) {
        soundOn.classList.remove('d_none');
    } else { soundOff.classList.remove('d_none'); }
    resumeGame();
}

/** pauses the game and shows instructions like button description */
function openInstructions() {
    instructions.classList.remove('d_none')
    openMenuBtn.classList.add('d_none')
    closeMenuBtn.classList.remove('d_none')
    stopGame();
}

/** shows instructions on mouse over in start screen */
function showInstructions() {
    instructions.classList.add('instructionsOnHoverStart');
}

/** hides instructions on mouse leave in start screen */
function hideInstructions() {
    instructions.classList.remove('instructionsOnHoverStart');
}

/** resumes the game closes instructions*/
function closeInstructions() {
    resumeGame();
}

/** starts a new game via page reload */
function restartGame() {
    location.reload();
}

/** stops game and shows winner screen after win */
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

/** stops game and shows game over screen after death */
function showGameOverScreen() {
    if (!isMuted) {
        world.gameOverAudio.play();
    }
    mainScreens.classList.remove('d_none');
    gameOverScreen.classList.remove('d_none');
    restartButton.classList.remove('d_none');
    openMenuBtn.classList.add('d_none')
}

/** addresses all sounds (to toggle mute) */
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

/** toggles visibility of un-/mute buttons*/
function switchToggleSoundBtn() {
    soundOn.classList.toggle('d_none', !isMuted);
    soundOff.classList.toggle('d_none', isMuted);
    toggleSound();
}

/** toggles visibility of un-/mute buttons and saves mute status in local storage*/
function saveSoundDataLocal() {
    if (isMuted) {
        soundOn.classList.add('d_none');
        soundOff.classList.remove('d_none');
        localStorage.setItem("isMuted", JSON.stringify(true));
    } else {
        localStorage.setItem("isMuted", JSON.stringify(false));
        soundOn.classList.remove('d_none');
        soundOff.classList.add('d_none');
    }
}

/** toggles all ingame sounds at once */
function toggleSound() {
    isMuted = !isMuted;
    this.saveSoundDataLocal();
    let allAudios = getAllAudios();
    allAudios.forEach((audio) => {
        if (audio) {
            audio.muted = isMuted;
        }
    });
}

/** toggles fullscreen on desktop-device */
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
    isFullscreen = !isFullscreen;
}

/** enters fullscreen */
function openFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { /* Safari */
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE11 */
        element.msRequestFullscreen();
    }
    startScreen.classList.add('fullStartScreen')
    resizeCanvasContent();
}

/** leaves fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
    startScreen.classList.remove('fullStartScreen')

    resetCanvasSize();
}

/** resices content to fulscreen (height, width) */
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

/** resices content back to default size */
function resetCanvasSize() {
    let canvas = document.getElementById('canvas');
    canvas.style.width = "720px";
    canvas.style.height = "480px";
}

/** queries the status of mute from local storage */
function queryMuteStatusLocal() {
    if (localStorage.getItem("isMuted") === null) {
        localStorage.setItem("isMuted", JSON.stringify(false));
    }
    isMuted = JSON.parse(localStorage.getItem("isMuted"));
}

/** initialises general content ob the page */
function init() {
    this.queryMuteStatusLocal();
    console.log(isMuted);
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    setInterval(() => {
        checkOrientation();
    }, 500);
    keyboard.observeKeysOnDown();
    keyboard.observeKeysOnUp();
    keyboard.observeControlButtonsMobile();
}

setTimeout(() => {
    stopGame()
}, 500);