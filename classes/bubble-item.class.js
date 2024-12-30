class BubbleItem extends MovableObject{
    x = 410;
    y = 390;
    width = 20;
    height = 20;
    speedY = 0.5;

    constructor(){
        super().loadImage('./content/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.enableBuoyancy()
    }

    enableBuoyancy(){
        setInterval(() => {
            this.y -= this.speedY;
        }, 100 / 25);
    }
    //setInterval(() => {
    //    
    //}, 500)
}