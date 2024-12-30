class Endboss extends Enemy {
    x = 0;
    y = 0;
    width = 300 * 1.5;
    height = 235 * 1.5;
    attackPoints = 15;
    healthPoints = 200;
    currentImage = 0;
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
    ENDBOSS_HURT = [
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Hurt/1.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Hurt/2.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Hurt/3.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Hurt/4.png',
    ];
    ENDBOSS_DEAD = [
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png',
    ]

    constructor(){
        super().loadImage(this.ENDBOSS_SPAWNING[0]);
        this.loadImages(this.ENDBOSS_SPAWNING);
        this.loadImages(this.ENDBOSS_SWIMMING);
        this.loadImages(this.ENDBOSS_HURT);
        this.loadImages(this.ENDBOSS_DEAD);
        this.x = 1600;
        
        this.spawnEndboss()
    }
    spawnEndboss() {
        //console.log('hello'+characterPosition);
        let currentFrame = 0;
        let spawningBoss = setInterval(() => {
            this.playAnimation(this.ENDBOSS_SPAWNING);
            currentFrame++;
            if (currentFrame >= this.ENDBOSS_SPAWNING.length) {
                clearInterval(spawningBoss);
                console.log('spawned');
                this.animate()
            }
        }, 10000 / 140);
    }

    animate(){
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.ENDBOSS_DEAD)
                this.y -= 20;
            } else if (this.isHurt()) {
                this.playAnimation(this.ENDBOSS_HURT)                
            }else {this.playAnimation(this.ENDBOSS_SWIMMING)}
            
        }, 10000 / 70);
    }
}