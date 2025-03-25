class MovableObject extends DrawableObject {
    speed;
    otherDirection = false;
    speedY = 0.05;
    healthPoints;
    attackPoints;
    lastHit = 0;

    /**
     * enables sinking of dropped items
     * @param {number} heightDiff - calculares the difference between an sinking object ans the lowest alowed y-coordinate
     */
    applyGravity(heightDiff) {
        setStoppableInterval(() => {
            if (this.isAboveGropund(heightDiff)) {
                this.y += this.speedY;
            }
        }), 1000 / 4
    }

    /**
     * checks height of objects, to prevent them falling out of the world
     * @param {number} heightDiff - the difference between an sinking object ans the lowest alowed y-coordinat
     * @returns - the difference between an sinking object ans the lowest alowed y-coordinat
     */
    isAboveGropund(heightDiff) {
        return (this.y < heightDiff)
    }

    /**
     * plays an animation depenting of the gotten images as array 
     * @param {array} images - contains all images that are needed to play an animation
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * checks if any type of movable object hits another one (hit box)
     * @param {object} mo - any movable object that can collide with another one
     * @returns - if two objects are colliding or not
     */
    isColliding(mo) {
        return (this.x + this.width) >= mo.x &&
            this.x <= (mo.x + mo.width) &&
            (this.y + this.height) >= mo.y &&
            (this.y) <= (mo.y + mo.height);
    }

    /**
     * checks if Sharky hits another movable object like item of enemy (smallers sharkies hitbox depenting of image-hight/-width)
     * @param {} mo - Sharky (in a smaller hitbox than its images to fit only 'visual collision')
     * @returns if Sharky is colliding with another movable object or not
     */
    sharkyIsColliding(mo) {
        return (this.x + this.width - 30) >= mo.x &&
            this.x + 50 <= (mo.x + mo.width) &&
            (this.y + this.height - 70) >= mo.y &&
            this.y + 110 <= (mo.y + mo.height);
    }

    /**
     * checks and recalculates health points of any charakter when gets hit
     * @param {number} attackPoints - attackpoints ob an object that hits another one
     */
    hit(attackPoints) {
        this.healthPoints -= attackPoints;

        if (this.healthPoints > 0) {
            this.lastHit = new Date().getTime();
        }
        if (this.healthPoints <= 0) {
            this.healthPoints = 0
        }
    }

    /** cooldown do not get hit frequently */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.2;
    }

    /** changes status of any charakter to dead */
    isDead() {
        return this.healthPoints <= 0;
    }
}