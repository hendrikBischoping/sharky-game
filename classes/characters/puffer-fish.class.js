class PufferFish extends Enemy {
    x = 180;
    y = 140;
    offsetX = 180;
    offsetY = 140;
    width = 60;
    height = 60;
    hitboxWidth = 60;
    hitboxHeigth = 60;
    healthPoints = 20;
    attackPoints = 4;
    PUFFERFISH_SWIMMING = [
        './content/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
    ];
    PUFFERFISH_DEAD = [
        './content/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png',
        './content/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png',
    ];
    currentImage = 0;

    constructor(){
        super().loadImage('./content/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');

        this.x = 300 + Math.random() * 2000;
        this.y = 0 + Math.random() * 400;
        this.loadImages(this.PUFFERFISH_SWIMMING);
        this.loadImages(this.PUFFERFISH_DEAD);

        this.animate()
    }

    animate(){

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.PUFFERFISH_DEAD);
                this.raise()
                setTimeout(() => {
                }, 200);
            } else {this.playAnimation(this.PUFFERFISH_SWIMMING)}
        }, 10000 / 30);

        this.swimLeft()
    }

    swimLeft(){
        setInterval(() => {
            this.x -= 0.7;
        }, 1000 / 30)
    }
}