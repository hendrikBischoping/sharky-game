class JellyFish extends Enemy {
    x;
    y;
    offsetX = 180;
    offsetY = 140;
    width = 80;
    height = 60;
    hitboxWidth = 80;
    hitboxHeigth = 60;
    healthPoints = 10;
    attackPoints = 16;
    name = 'Jelly Fish';
    currentImage = 0;

    JELLYFISH_SWIMMING = [
        './content/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png',
    ];

    JELLYFISH_DEAD = [
        './content/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Dead/Lila/L4.png',
    ];

    constructor(){
        super().loadImage('./content/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
        
        this.x = 600 + Math.random() * 4000;
        this.y = 0 + Math.random() * 400;
        this.loadImages(this.JELLYFISH_SWIMMING);
        this.loadImages(this.JELLYFISH_DEAD);
        
        this.animate()
    }

    animate(){
        this.swimLeft()
        setStoppableInterval(() => {
            if (this.isDead()) {
                //this.applyBuoyancy();     swimLeft interval vorher beenden ?
                this.playAnimation(this.JELLYFISH_DEAD);
                this.raise()
                setStoppableTimeout(() => {
                }, 200);
            } else {
            this.playAnimation(this.JELLYFISH_SWIMMING)
        }
        }, 10000 / 40);

    }

    swimLeft(){
        setStoppableInterval(() => {
            this.x -= 1 + 1.1 * Math.random();
        }, 1000 / 30)
    }
}
