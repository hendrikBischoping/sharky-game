let canvas;
let world;
let keyboard = new Keyboard();
let restartButton = document.getElementById('restartButton');

function startGame(){
    let startScreen = document.getElementById('startScreen');
    let startButton = document.getElementById('startButton');

    startScreen.classList.add ('d_none');
    startButton.classList.add ('d_none');
    restartButton.classList.add ('d_none');
    resumeGame();
}

function restartGame(){
    location.reload();
}

function showWinnerScreen(){
    let winnerScreen = document.getElementById('winnerScreen');
    winnerScreen.classList.remove ('d_none');
    restartButton.classList.remove ('d_none');
}

function showGameOverScreen(){
    let gameOverScreen = document.getElementById('gameOverScreen');
    gameOverScreen.classList.remove ('d_none');
    restartButton.classList.remove ('d_none');
}

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    
    window.addEventListener('keydown', (e) => {     
        console.log(e.keyCode);   
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
            keyboard.b = true;
        }
        if (e.keyCode == 70) {
            keyboard.f = true;
        }
        
    })
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
            keyboard.space = false;
        }
        if (e.keyCode == 68) {
            keyboard.b = false;
        }
        if (e.keyCode == 70) {
            keyboard.f = false;
        }
        if (e.keyCode == 27) {
            pauseAndContinue();
        }        
    })
}
setTimeout(() => {
    stopGame()
}, 200);