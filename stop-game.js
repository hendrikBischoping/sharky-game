let intervalIds = [];
let intervalData = [];
let timeoutIds = [];
let timeoutData = [];
let pause = false;
underWaterAudio = new Audio('content/Sounds/underWater.mp3');

/**
 * calls all setted intervals of the project to start/stop them at once
 * @param {function} fn - any function that contains a setted interval
 * @param {number} time - the exact timestamp when the interval got stopped to continue from there later
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalData.push({ id, fn, time });
    
}

/**
 * calls all setted timeouts of the project to start/stop them at once
 * @param {function} fn - any function that contains a setted timeout
 * @param {number} time - the exact timestamp when the timeout got stopped to continue from there later
 */
function setStoppableTimeout(fn, time) {
    let startTime = Date.now();
    let id = setTimeout(() => {
        fn();
        timeoutData = timeoutData.filter(data => data.id !== id);
    }, time);
    timeoutData.push({ id, fn, time, startTime });
}

/** pauses / stops the game */
function stopGame() {
    pause = true;
    underWaterAudio.pause();
    intervalData.forEach(data => clearInterval(data.id));
    timeoutData.forEach(data => {
        let passed = Date.now() - data.startTime;
        data.remainingTime = data.time - passed;
    });
}

/** resumes the game */
function resumeGame() {
    pause = false;
    intervalData.forEach(data => {
        data.id = setInterval(data.fn, data.time);
    });
    timeoutData.forEach(data => {
        let id = setTimeout(() => {
            data.fn();
            timeoutData = timeoutData.filter(d => d.id !== id);
        }, data.remainingTime);
        data.id = id;
        data.startTime = Date.now();
    });
}

/** toggles if the game is paused or not */
function pauseAndContinue() {
    instructions.classList.toggle ('d_none')
    if (!pause) {
        stopGame();
        openMenuBtn.classList.add('d_none')
        closeMenuBtn.classList.remove('d_none')
    } else {
        resumeGame();
        openMenuBtn.classList.remove('d_none')
        closeMenuBtn.classList.add('d_none')
    }
}