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

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.height, this.width)
    }

    // drawFrame(ctx){if (this instanceof Character) {
    //     ctx.beginPath();
    //     ctx.lineWidth = '2';
    //     ctx.strokeStyle = 'red';
    //     ctx.rect(this.x+50, this.y+110, this.width-80, this.height-180);
    //     // ctx.rect(this.x, this.y, this.width, this.height);
    //     ctx.stroke();
    // }
    // }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image()
            img.src = path;
            this.imageCache[path] = img;
        })
    }
}