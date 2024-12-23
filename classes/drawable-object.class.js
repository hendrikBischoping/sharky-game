class DrawableObject {
    x;
    y;
    img;
    height;
    width;
    imageCache = {};
    imageCacheStay = {};


    loadImage(path) {
        this.img = new Image(); //'Image()' ist bereits vordefiniert von JS
        this.img.src = path;
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.height, this.width)
    }

    loadImages(arr){                // läd alle Bilder in den Chache (Object)
        arr.forEach((path) => {                     // Funktion von ChatGPT erklären lassen
            let img = new Image()
        img.src = path;
        this.imageCache[path] = img;
        })
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
}