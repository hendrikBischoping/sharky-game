class HeartItem extends MovableObject{
    x;
    y;
    height = 35;
    width = 35;
    constructor(x, y){
        super().loadImage('./content/Alternative Grafiken - Sharkie/4. Marcadores/green/100_  copia 3.png');
        this.x = x;
        this.y = y;
        this.height = 45;
        this.width = 45;
        this.applyGravity(400)
    }
}