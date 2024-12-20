class PufferFish extends MovableObject {
    x = 180;
    y = 140;
    width = 60;
    height = 60;
    PUFFERFISH_SWIMMING = [
        './content/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
    ]
    currentImage = 0;

    constructor(){
        super().loadImage('./content/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');

        this.x = 300 + Math.random() * 600;
        this.y = 0 + Math.random() * 800;
        this.loadImages(this.PUFFERFISH_SWIMMING);

        this.animate()
    }

    animate(){

        setInterval(() => {
            this.playAnimation(this.PUFFERFISH_SWIMMING)
        }, 10000 / 30);

        this.swimLeft()
    }

    swimLeft(){
        setInterval(() => {
            this.x -= 0.7;
        }, 1000 / 30)
    }
}