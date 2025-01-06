let intervalIds = [];
let intervalData = [];
let timeoutIds = [];
let timeoutData = [];
let pause = false;

function setStoppableInterval(fn, time){
    let id = setInterval(fn, time);
    intervalData.push({ id, fn, time });
}

function setStoppableTimeout(fn, time){
    let startTime = Date.now();
    let id = setTimeout(() => {
        fn();
        timeoutData = timeoutData.filter(data => data.id !== id);
    }, time);
    timeoutData.push({ id, fn, time, startTime });
}

function stopGame(){ //Intervalle und Timeouts beenden bzw. anhalten
    pause = true;
    intervalData.forEach(data => clearInterval(data.id));
    timeoutData.forEach(data => {
        let passed = Date.now() - data.startTime;
        data.remainingTime = data.time - passed;
    });
}

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

function pauseAndContinue(){
    if (!pause) {
        stopGame();
    } else {
        resumeGame();
    }
}