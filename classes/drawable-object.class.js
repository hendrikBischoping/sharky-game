class DrawableObject {
    x;
    y;
    offsetX;
    offsetY;
    img;
    height;
    width;
    hitboxWidth;
    hitboxHeigth;
    imageCache = {};
    imageCacheStay = {};

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.height, this.width)
    }

    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image()
        img.src = path;
        this.imageCache[path] = img;
        })
    }

    drawFrame(ctx){
        if (this instanceof BossBar){
            ctx.beginPath();
            ctx.lineWidth = "-0";
            ctx.strokeStyle = "lightblue";
            ctx.rect(this.x, this.y, this.height, this.width);
            ctx.stroke();
        }
    }
}