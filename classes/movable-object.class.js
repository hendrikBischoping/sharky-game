class MovableObject extends DrawableObject{
    speed;
    otherDirection = false;
    speedY = 0.05;
    healthPoints;
    attackPoints;
    lastHit = 0;
    gameIsRunning = true;
    checkGameOver(){
        if (this.gameIsRunning) {
            console.log('GO');
            //return
        } else{console.log('STOP');}
    }
    
    applyGravity(heightDiff){
        setStoppableInterval(() => {
            if (this.isAboveGropund(heightDiff)) {
                this.y += this.speedY;
            }
        }), 1000 / 4
    }

    isAboveGropund(heightDiff){
        return (this.y < heightDiff)
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
            this.lastHit = new Date().getTime();                   
        }
        if (this.healthPoints <= 0){
            this.healthPoints = 0
        }
    }

    isHurt(){
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.2;
    }

    isDead(){
        return this.healthPoints <= 0;
    }
}