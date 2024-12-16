class BarrierOne extends MovableObject {
    y = 0;
    width = 480;
    height = 480;
    constructor(){
        super().loadImage('./content/Alternative Grafiken - Sharkie/3. Background/Barrier/1.png')
        this.x = 380 + Math.random() * 200;
    }
} 