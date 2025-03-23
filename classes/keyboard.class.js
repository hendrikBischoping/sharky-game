class Keyboard {
    up = false;
    down = false;
    left = false;
    right = false;
    repel = false;
    space = false;
    d = false;
    f = false;
    btnUp = document.getElementById('');
    btnDown = document.getElementById('');
    btnLeft = document.getElementById('');
    btnRight = document.getElementById('');
    btnD = document.getElementById('');
    btnF = document.getElementById('');

    /** observes several keys on keydown */
    observeKeysOnDown() {
        window.addEventListener('keydown', (e) => {
            this.observeRightOnDown(e);
            this.observeLeftOnDown(e);
            this.observeUpOnDown(e);
            this.observeDownOnDown(e);
            this.observeSpaceOnDown(e);
            this.observeDOnDown(e);
            this.observeFOnDown(e);
            this.observeEscOnDown(e);
        });
    }

    /** observes key on down */
    observeRightOnDown(e) {
        if (e.keyCode == 39) {
            this.right = true;
        }
    }

    /** observes key on down */
    observeLeftOnDown(e) {
        if (e.keyCode == 37) {
            this.left = true;
        }
    }

    /** observes key on down */
    observeUpOnDown(e) {
        if (e.keyCode == 38) {
            this.up = true;
        }
    }

    /** observes key on down */
    observeDownOnDown(e) {
        if (e.keyCode == 40) {
            this.down = true;
        }
    }

    /** observes key on down */
    observeSpaceOnDown(e) {
        if (e.keyCode == 32) {
            this.space = true;
        }
    }

    /** observes key on down */
    observeDOnDown(e) {
        if (e.keyCode == 68) {
            this.d = true;
        }
    }

    /** observes key on down */
    observeFOnDown(e) {
        if (e.keyCode == 70) {
            this.f = true;
        }
    }

    observeEscOnDown(e) {
        if (e.keyCode == 27 && isFullscreen) {
            startScreen.classList.remove('fullStartScreen');
            canvas.classList.add('canvasDefault');
            closeFullscreen();
        }
    }

    /** observes several keys on keyup */
    observeKeysOnUp() {
        window.addEventListener('keyup', (e) => {
            this.observeRightOnUp(e)
            this.observeLeftOnUp(e)
            this.observeUpOnUp(e)
            this.observeDownOnUp(e)
            this.observeSpaceOnUp(e)
            this.observeDOnUp(e)
            this.observeFOnUp(e)
        });
    }

    /** observes key on up */
    observeRightOnUp(e) {
        if (e.keyCode == 39) {
            this.right = false;
        }
    }

    /** observes key on up */
    observeLeftOnUp(e) {
        if (e.keyCode == 37) {
            this.left = false;
        }
    }

    /** observes key on up */
    observeUpOnUp(e) {
        if (e.keyCode == 38) {
            this.up = false;
        }
    }

    /** observes key on up */
    observeDownOnUp(e) {
        if (e.keyCode == 40) {
            this.down = false;
        }
    }

    /** observes key on up */
    observeSpaceOnUp(e) {
        if (e.keyCode == 32) {
            pauseAndContinue();
        }
    }

    /** observes key on up */
    observeDOnUp(e) {
        if (e.keyCode == 68) {
            this.d = false;
        }
    }

    /** observes key on up */
    observeFOnUp(e) {
        if (e.keyCode == 70) {
            this.f = false;
        }
    }

    /** observes mobile button on touch */
    observeButtonUp(){
        btnUp.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.up = true;
        });
    
        btnUp.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.up = false;
        });
    }

    /** observes mobile button on touch */
    observeButtonDown(){
        btnDown.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.down = true;
        });
    
        btnDown.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.down = false;
        });
    }

    /** observes mobile button on touch */
    observeButtonLeft(){
        btnLeft.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.left = true;
        });
    
        btnLeft.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.left = false;
        });
    }

    /** observes mobile button on touch */
    observeButtonRight(){
        btnRight.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.right = true;
        });
    
        btnRight.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.right = false;
        });
    }

    /** observes mobile button on touch */
    observeButtonD(){
        btnD.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.d = true;
        });
    
        btnD.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.d = false;
        });
    }

    /** observes mobile button on touch */
    observeButtonF(){
        btnF.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.f = true;
        });
    
        btnF.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.f = false;
        });
    }

    /** contains all observer functions for mobile buttons */
    observeControlButtonsMobile(){
        this.observeButtonUp();
        this.observeButtonDown();
        this.observeButtonLeft();
        this.observeButtonRight();
        this.observeButtonD();
        this.observeButtonF();
    }
}