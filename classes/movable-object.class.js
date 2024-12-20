class MovableObject {
    x;
    y;
    img;
    height;
    width;
    imageCache = {};
    imageCacheStay = {};
    speed;
    otherDirection = false;
    speedY = 0.1;
    healthPoints;
    attackPoints
    //acceleration = 0.0005;

    applyGravity(){
        setInterval(() => {
            if (this.isAboveGropund()) {
                this.y += this.speedY;
                //this.speedY -=this.acceleration;
            }
        }), 1000 / 4
    }

    isAboveGropund(){
        return (this.y < 330)
    }

    loadImage(path) {
        this.img = new Image(); //'Image()' ist bereits vordefiniert von JS
        this.img.src = path;
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.height, this.width)
    }
    drawFrame(ctx){
        if (this instanceof Character || this instanceof PufferFish || this instanceof JellyFish || this instanceof Endboss) { //Zeichnet die Object.border nur noch bei den ausgewählten objekten
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "red";
            ctx.rect(this.x, this.y, this.height, this.width);
            ctx.stroke();
        }
    }

    loadImages(arr){                // läd alle Bilder in den Chache (Object)
        arr.forEach((path) => {                     // Funktion von ChatGPT erklären lassen
            let img = new Image()
        img.src = path;
        this.imageCache[path] = img;
        })
    }
        
    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        console.log('Moves right!');
        
    }
    moveLeft(){
        console.log('Moves left!');
    }
    isColliding(mo){
        return  (this.x + this.width) >= mo.x && this.x <= (mo.x + mo.width) && 
                (this.y + this.height) >= mo.y &&
                (this.y) <= (mo.y + mo.height);}
}