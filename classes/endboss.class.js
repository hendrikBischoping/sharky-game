class Endboss extends MovableObject {
    x = 0;
    y = 0;
    width = 300 * 1.2;
    height = 235 * 1.2;
    ENDBOSS_SPAWNING = [
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/10.png'
    ];
    currentImage = 0;
    ENDBOSS_SWIMMING = [
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/1.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/2.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/3.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/4.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/5.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/6.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/7.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/8.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/9.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/10.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/11.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/12.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/13.png'
    ];
    currentImage = 0;

    constructor(){
        super().loadImage(this.ENDBOSS_SPAWNING[0]);
        this.loadImages(this.ENDBOSS_SPAWNING);
        this.loadImages(this.ENDBOSS_SWIMMING);
        this.x = 500;
        
        this.spawnEndboss()
    }
    spawnEndboss() {
        //console.log('hello'+characterPosition);
        let currentFrame = 0;
        let intervalId = setInterval(() => {
            this.playAnimation(this.ENDBOSS_SPAWNING);
            currentFrame++;
            if (currentFrame >= this.ENDBOSS_SPAWNING.length) {
                clearInterval(intervalId);
                console.log('spawned');
                this.animate()
            }
        }, 10000 / 120);
        
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.ENDBOSS_SWIMMING)
        }, 10000 / 70);
    }
}