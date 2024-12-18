class JellyFish extends MovableObject {
    x = 180;
    y = 140;
    width = 150;
    height = 100;
    JELLYFISH_SWIMMING = [
        './content/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png',
    ];
    currentImage = 0;

    constructor(){
        super().loadImage('./content/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
        
        this.x = 300 + Math.random() * 600;
        this.y = 110 + Math.random() * 50;
        this.loadImages(this.JELLYFISH_SWIMMING);
        
        this.animate()
    }

    animate(){

        setInterval(() => {
            this.playAnimation(this.JELLYFISH_SWIMMING)
        }, 10000 / 30);

        this.swimLeft()
    }

    swimLeft(){
        setInterval(() => {
            this.x -= 0.5;
        }, 1000 / 30)
    }
}
