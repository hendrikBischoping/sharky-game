class ShootableObject extends MovableObject {
    acceleration = 0.8;
    attackPoints = 20;

    constructor(x, y){
        super().loadImage('./content/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x+180;
        this.y = y+150;
        this.height = 35;
        this.width = 35;
        this.shoot()
    }

    shoot(){
        this.speedY = 10;
        this.applyBuoyancy();
        setInterval(() => {
            this.x +=8;
        }, 1000 / 25)
    }

    applyBuoyancy(){
        setInterval(() => {
            if (this.isAboveGropund()+100 || this.speedY > 0){
                this.y +=this.speedY;
                this.speedY -= this.acceleration
            }
        }, 1000 / 25);
    }

}