class LifeBar extends StatusBar {
    x = 10;
    y = 10;
    width = 50;
    height = 100
    percentage = 100;

    LIFE_BAR_IMAGES = [
        './content/Alternative Grafiken - Sharkie/4. Marcadores/green/Life/100_  copia 2.png',
        './content/Alternative Grafiken - Sharkie/4. Marcadores/green/Life/80_  copia 3.png',
        './content/Alternative Grafiken - Sharkie/4. Marcadores/green/Life/60_  copia 3.png',
        './content/Alternative Grafiken - Sharkie/4. Marcadores/green/Life/40_  copia 3.png',
        './content/Alternative Grafiken - Sharkie/4. Marcadores/green/Life/20_ copia 4.png',
        './content/Alternative Grafiken - Sharkie/4. Marcadores/green/Life/0_  copia 3.png'
    ];

    constructor(){
        super();
        this.loadImages(this.LIFE_BAR_IMAGES);
        this.x = 20;
        this.y = 0;
        this.width = 50;
        this.height = 180;
        this.setPercentage(this.percentage, this.LIFE_BAR_IMAGES);
    }
    
    setPercentage(percentage, imageSet = this.LIFE_BAR_IMAGES){
        this.percentage = percentage;
        if (!imageSet || !Array.isArray(imageSet)) {
            console.error('Invalid image set:', imageSet);
            return;
        }
        let path = imageSet[this.resolveImageIndex(percentage)];
        this.img = this.imageCache[path];
    }
}