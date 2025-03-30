class Endboss extends Enemy {
    x = 0;
    y = 0;
    width = 300 * 1.5;
    height = 235 * 1.5;
    attackPoints = 25;
    healthPoints = 500;
    currentImage = 0;
    canSpawn = false;
    endboss = true;
    isAttacking = false;
    bossAttackAudio = new Audio('content/Sounds/bossAttack.mp3');
    endbossAway = document.getElementById('endbossAway');

    /** animationframes of endboss spawning*/
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

    /** animationframes of endboss swimming (default)*/
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

    /** animationframes of endboss atacking sharkie*/
    ENDBOSS_ATTACK = [
        'content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/1.png',
        'content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/2.png',
        'content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/3.png',
        'content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/4.png',
        'content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/5.png',
        'content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/6.png',
    ]

    /** animationframes of endboss gets hurt by sharkie/bubble*/
    ENDBOSS_HURT = [
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Hurt/1.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Hurt/2.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Hurt/3.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Hurt/4.png',
    ];

    /** animationframes of endboss dying*/
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

    constructor() {
        super().loadImage(this.ENDBOSS_SPAWNING[0]);
        this.loadImages(this.ENDBOSS_SPAWNING);
        this.loadImages(this.ENDBOSS_SWIMMING);
        this.loadImages(this.ENDBOSS_HURT);
        this.loadImages(this.ENDBOSS_ATTACK);
        this.loadImages(this.ENDBOSS_DEAD);
        this.x = 2000;
        this.spawnEndboss();
    }

    /** plays animation of spawning endboss */
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

    /**checks endboss status to play depending animation */
    animate() {
        setStoppableInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.ENDBOSS_DEAD)
                this.y -= 10;
            } else if (this.isHurt()) {
                this.playAnimation(this.ENDBOSS_HURT)
            } else if (this.isAttacking) {
                this.endbossAttacking()
            } else { this.endbossSwimming() }
        }, 10000 / 70);
    }

    /** swim-animation for sharkie */
    endbossSwimming() {
        this.playAnimation(this.ENDBOSS_SWIMMING);
        this.x -= 10;
    }

    /**calcularot to randomize endboss attacking-interval */
    randomizeAttacking() {
        setTimeout(() => {
            this.isAttacking = true;
            this.randomizeAttacking()
        }, 3000 + Math.random() * 1600);
    }

    /** attack-animation + sound for endboss */
    endbossAttacking() {
        let currentFrame = 0;
        if (!isMuted) {
            this.bossAttackAudio.play();
        }
        let animationInterval = setInterval(() => {
            this.isAttacking = false;
            this.playAnimation(this.ENDBOSS_ATTACK);
            currentFrame++;
            this.x -= 25;
            if (currentFrame >= this.ENDBOSS_ATTACK.length) {
                clearInterval(animationInterval);
            }
        }, 100);
    }
}