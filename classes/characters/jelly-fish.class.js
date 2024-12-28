class JellyFish extends MovableObject {
    x = 180;
    y = 140;
    offsetX = 180;
    offsetY = 140;
    width = 80;
    height = 60;
    hitboxWidth = 80;
    hitboxHeigth = 60;
    healthPoints = 20;
    attackPoints = 6;
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
    ]
    currentImage = 0;

    constructor(){
        super().loadImage('./content/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
        
        this.x = 300 + Math.random() * 600;
        this.y = 0 + Math.random() * 400;
        this.loadImages(this.JELLYFISH_SWIMMING);
        this.loadImages(this.JELLYFISH_DEAD);
        
        this.animate()
    }

    animate(){

        setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.JELLYFISH_DEAD)
            } else {
            this.playAnimation(this.JELLYFISH_SWIMMING)
        }
        }, 10000 / 30);

        this.swimLeft()
    }

    swimLeft(){
        setInterval(() => {
            this.x -= 0;
        }, 1000 / 30)
    }
}
