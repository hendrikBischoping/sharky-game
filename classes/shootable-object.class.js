class ShootableObject extends MovableObject {
    acceleration = 0.6;
    attackPoints;

    constructor(){
        super();
        this.shoot()
    }

    /** spawns and moves a shootable object (like bubbles) */
    shoot(){
        this.speedY = 8;
        this.applyBuoyancy();
        setStoppableInterval(() => {
            this.x +=8;
        }, 1000 / 25)
    }

    /** shootable objects buoyance more and more */
    applyBuoyancy(){
        setStoppableInterval(() => {
            if (this.isAboveGropund()+100 || this.speedY > 0){
                this.y +=this.speedY;
                this.speedY -= this.acceleration
            }
        }, 1000 / 25);
    }
}