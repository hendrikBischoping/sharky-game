class PufferFish extends MovableObject {
    x = 250;
    y = 270;
    width = 100;
    height = 100;

    constructor(){
        super().loadImage('./content/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png')

        this.x = 250 + Math.random() * 200;
    }
}
