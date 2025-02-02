class BackgroundObject extends MovableObject {
    width = 480;
    height = 1440;
    drift;
    
    constructor(imagePath, x, y, drift){
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.drift = drift;
        // this.driftLeft();
    }

    driftLeft(){
        setStoppableInterval(() => {
            this.x -= drift;
        }, 1000 / 60)
    }
}