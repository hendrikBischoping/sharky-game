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

    /**
     *  loads depending images for rendering into the canvas 
     * @param {string} path - path where the depending image is located
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * draws/renders loaded images into the canvas
     * @param {object} ctx - any object that need to be drawn into the canvas
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.height, this.width)
        
    }

    /**
     * loads depending images for rendering them as animation into the canvas
     * @param {array} arr - array of images / frames to render as an animation
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image()
            img.src = path;
            this.imageCache[path] = img;
        })
    }
}