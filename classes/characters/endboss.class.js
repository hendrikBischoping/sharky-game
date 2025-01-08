class Endboss extends Enemy {
    x = 0;
    y = 0;
    width = 300 * 1.5;
    height = 235 * 1.5;
    attackPoints = 15;
    healthPoints = 700;
    currentImage = 0;
    canSpawn = false;
    endboss = true;
    bossAttackAudio = new Audio('content/Sounds/bossAttack.mp3');
    isAttacking = false;

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

    ENDBOSS_ATTACK = [
        'content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/1.png',
        'content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/2.png',
        'content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/3.png',
        'content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/4.png',
        'content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/5.png',
        'content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/6.png',
    ]

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
    ];

    constructor(){
        super().loadImage(this.ENDBOSS_SPAWNING[0]);
        this.loadImages(this.ENDBOSS_SPAWNING);
        this.loadImages(this.ENDBOSS_SWIMMING);
        this.loadImages(this.ENDBOSS_HURT);
        this.loadImages(this.ENDBOSS_ATTACK);
        this.loadImages(this.ENDBOSS_DEAD);
        this.x = 2000;
        this.spawnEndboss()
    }

    spawnEndboss() {
        let currentFrame = 0;
        let spawningBoss = setInterval(() => {
            this.playAnimation(this.ENDBOSS_SPAWNING);
            currentFrame++;
            if (currentFrame >= this.ENDBOSS_SPAWNING.length) {
                clearInterval(spawningBoss);
                this.randomizeAttacking();
                this.animate();
            }
        }, 10000 / 140);
    }

    animate(){
        setStoppableInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.ENDBOSS_DEAD)
                this.y -= 10;
            } else if (this.isHurt()) {
                this.playAnimation(this.ENDBOSS_HURT)                
            }else if (this.isAttacking) {
                this.endbossAttacking()
            } else {this.endbossSwimming()}
        }, 10000 / 70);
    }
    endbossSwimming(){
        this.playAnimation(this.ENDBOSS_SWIMMING);
        this.x-=5;
    }

    randomizeAttacking(){        
        setTimeout(() => {
            this.isAttacking = true;
            this.randomizeAttacking()
        }, 3000 + Math.random() * 2000);
    }
    
    endbossAttacking(){
        let currentFrame = 0;
        this.bossAttackAudio.play()
        let animationInterval = setInterval(() => {
            this.isAttacking = false;
            this.playAnimation(this.ENDBOSS_ATTACK);
            currentFrame++;
            // this.x -= 15;
            if (currentFrame >= this.ENDBOSS_ATTACK.length) {

                clearInterval(animationInterval);
            }
        }, 100);
    }

    freezeBoss(){
        if (gameOver) {
            console.log('Over');
            
        }
    }
}
