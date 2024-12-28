class ShootableObject extends MovableObject {
    acceleration = 0.8;

    constructor(x, y){
        super().loadImage('./content/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 60;
        this.shoot();
    }

    shoot(){
        this.speedY = 10;
        this.applyBuoyancy();
        setInterval(() => {
            this.x +=8;
        }, 40)
    }

    applyBuoyancy(){
        setInterval(() => {
            if (this.isAboveGropund() || this.speedY > 0){
                this.y +=this.speedY;
                this.speedY -= this.acceleration
            }
        }, 1000 / 25);
    }
}