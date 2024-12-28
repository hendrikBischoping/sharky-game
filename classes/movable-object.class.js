class MovableObject extends DrawableObject{
    speed;
    otherDirection = false;
    speedY = 0.1;
    healthPoints;
    attackPoints;
    lastHit = 0;
    
    applyGravity(){
        setInterval(() => {
            if (this.isAboveGropund()) {
                this.y += this.speedY;
                //this.speedY -=this.acceleration;
            }
        }), 1000 / 4
    }

    isAboveGropund(){
        return (this.y < 310)
    }
        
    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
    isColliding(mo){
            return  (this.x + this.width) >= mo.x &&
                    this.x <= (mo.x + mo.width) && 
                    (this.y + this.height) >= mo.y &&
                    (this.y) <= (mo.y + mo.height);
        }

    hit(attackPoints){
        this.healthPoints -= attackPoints;
        if (this.healthPoints > 0) {
            this.lastHit = new Date().getTime(); // speichert Zeit in Zahlenform 
        }
    }

    isHurt(){
        let timePassed = new Date().getTime() - this.lastHit; // Differenz in ms
        timePassed = timePassed / 1000; // ms => s
        return timePassed < 0.2;  // returnd true, wenn letzter Hit innerhalb der letzten 5 s stattfand
    }

    isDead(){
        return this.healthPoints <= 0;
    }
}