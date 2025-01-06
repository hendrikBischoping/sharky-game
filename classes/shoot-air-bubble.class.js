class ShootableAir extends ShootableObject {
    x;
    y;
    attackPoints = 10;
    constructor(x, y){
        super().loadImage('./content/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x+180;
        this.y = y+150;
        this.height = 35;
        this.width = 35;
        this.shoot()
    }
}