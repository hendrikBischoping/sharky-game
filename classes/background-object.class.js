class BackgroundObject extends MovableObject {
    width = 480;
    height = 1440;
    drift;
    constructor(imagePath, x, y, drift){ //imagePath steht als Variable für alle individuellen Hintergründe hintereinander
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.drift = drift;
    // this.driftLeft();
    }
    driftLeft(){
        setInterval(() => {
            this.x -= drift;
        }, 1000 / 60)
    }
}