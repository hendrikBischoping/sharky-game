class JellyFish extends MovableObject {
    x = 180;
    y = 140;
    width = 150;
    height = 100;

    constructor(){
        super().loadImage('./content/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png')
        
        this.x = 250 + Math.random() * 200;
    }
}
