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
    attackPoints = 14;
    currentImage = 0;

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

    constructor(){
        super().loadImage('./content/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.x = 600 + Math.random() * 4000;
        this.y = 0 + Math.random() * 400;
        this.loadImages(this.PUFFERFISH_SWIMMING);
        this.loadImages(this.PUFFERFISH_DEAD);

        this.animate()
    }

    animate(){
        setStoppableInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.PUFFERFISH_DEAD);
                this.raise()
                setStoppableTimeout(() => {
                }, 200);
            } else {this.playAnimation(this.PUFFERFISH_SWIMMING)}
        }, 10000 / 30);

        this.swimLeft()
    }

    swimLeft(){
        setStoppableInterval(() => {
            this.x -= 1 + 1.5 * Math.random();
        }, 1000 / 30)
    }
}