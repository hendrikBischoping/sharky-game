class PoisonBubbleBar extends StatusBar{
    y = 50;
    percentage = 100;

    /** status frames ob Sharkies poison-bubble-bar */
    POISON_BUBBLE_BAR_IMAGES = [
        './content/Alternative Grafiken - Sharkie/4. Marcadores/green/poisoned bubbles/100_ copia 3.png',
        './content/Alternative Grafiken - Sharkie/4. Marcadores/green/poisoned bubbles/80_ copia 2.png',
        './content/Alternative Grafiken - Sharkie/4. Marcadores/green/poisoned bubbles/60_ copia 2.png',
        './content/Alternative Grafiken - Sharkie/4. Marcadores/green/poisoned bubbles/40_ copia 2.png',
        './content/Alternative Grafiken - Sharkie/4. Marcadores/green/poisoned bubbles/20_ copia 3.png',
        './content/Alternative Grafiken - Sharkie/4. Marcadores/green/poisoned bubbles/0_ copia 2.png',
    ];

    constructor(){
        super();
        this.loadImages(this.POISON_BUBBLE_BAR_IMAGES);
        this.x = 20;
        this.y = 75
        this.width = 50;
        this.height = 180;
        this.setPercentage(this.percentage, this.POISON_BUBBLE_BAR_IMAGES);
    }
    
    /**
     * renders the right status frames depending on Sharkies available poison-bubbles
     * @param {number} percentage - available poison-bubbles in percent
     * @param {object} imageSet - image of poison-bubble-bar relative to percentage
     * @returns - stops function in case of error
     */
    setPercentage(percentage, imageSet = this.POISON_BUBBLE_BAR_IMAGES){
        this.percentage = percentage;
        if (!imageSet || !Array.isArray(imageSet)) {
            console.error('Invalid image set:', imageSet);
            return;
        }
        let path = imageSet[this.resolveImageIndex(percentage)];
        this.img = this.imageCache[path];
    }
}