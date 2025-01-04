class PoisonItem extends MovableObject{
    x;
    y;
    height = 35;
    width = 35;
    constructor(x, y){
        super().loadImage('./content/Alternative Grafiken - Sharkie/4. Marcadores/green/100_ copia 5.png');
        this.x = x;
        this.y = y;
        this.height = 55;
        this.width = 55;
        this.applyGravity(400)
    }
}