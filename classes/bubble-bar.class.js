class BubbleBar extends StatusBar{
    y = 30;
    percentage = 100;

    /** status frames ob Sharkies bubble-bar */
    BUBBLE_BAR_IMAGES = [
        './content/Alternative Grafiken - Sharkie/4. Marcadores/green/normal bubbles/100_ copia 4.png',
        './content/Alternative Grafiken - Sharkie/4. Marcadores/green/normal bubbles/80_  copia 4.png',
        './content/Alternative Grafiken - Sharkie/4. Marcadores/green/normal bubbles/60_  copia 4.png',
        './content/Alternative Grafiken - Sharkie/4. Marcadores/green/normal bubbles/40_  copia 4.png',
        './content/Alternative Grafiken - Sharkie/4. Marcadores/green/normal bubbles/20_  copia 2.png',
        './content/Alternative Grafiken - Sharkie/4. Marcadores/green/normal bubbles/0_  copia 4.png',
    ]

    constructor(){
        super();
        this.loadImages(this.BUBBLE_BAR_IMAGES);
        this.x = 20;
        this.y = 35
        this.width = 50;
        this.height = 180;
        this.setPercentage(this.percentage, this.BUBBLE_BAR_IMAGES);
    }
    
    /**
     * renders the right status frames depending on Sharkies available air-bubbles 
     * @param {number} percentage - available air-bubbles in percent
     * @param {object} imageSet - image of status bar relative to percentage
     * @returns - stops function in case of error
     */
    setPercentage(percentage, imageSet = this.BUBBLE_BAR_IMAGES){
        this.percentage = percentage;
        if (!imageSet || !Array.isArray(imageSet)) {
            console.error('Invalid image set:', imageSet);
            return;
        }
        let path = imageSet[this.resolveImageIndex(percentage)];
        this.img = this.imageCache[path];
    }
}