class BackgroundObject extends MovableObject {
    width = 480;
    height = 1440;
    constructor(imagePath, x, y){ //imagePath steht als Variable für alle individuellen Hintergründe hintereinander
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}