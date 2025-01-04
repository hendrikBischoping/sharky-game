class BubbleItem extends CollectableItem{
    x = 0 + Math.random() * 2000;
    y = 470;
    width = 20;
    height = 20;
    speedY = 0.5;

    constructor(){
        super()
        this.loadImage('./content/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        //this.loadImage('./content/Alternative Grafiken - Sharkie/4. Marcadores/green/100_  copia 3.png')
        this.enableBuoyancy()
    }
    
    enableBuoyancy(){
        setInterval(() => {
            this.y -= this.speedY;
        }, 100 / 25);
    }
}