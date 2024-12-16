class BarrierOne extends MovableObject {
    y = -150;
    width = 800;
    height = 800;
    constructor(){
        super().loadImage('./content/Alternative Grafiken - Sharkie/3. Background/Barrier/1.png')
        this.x = 380 + Math.random() * 200;
        this.driftLeft();
    }

    driftLeft(){
        setInterval(() => {
            this.x -= 0.5;
        }, 1000 / 60)
    }
} 