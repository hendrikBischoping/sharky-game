class BubbleBar extends StatusBar{
    y = 330;
    percentage = 100;

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
    
    setPercentage(percentage, imageSet = this.BUBBLE_BAR_IMAGES){ //imageSet = this.IMAGES setzt "this.IMAGES" als default ein
        this.percentage = percentage;
        if (!imageSet || !Array.isArray(imageSet)) {    //prüft, ob "imageSet" definiert ist
            console.error('Invalid image set:', imageSet); //error falls nicht definiert
            return;
        }
        let path = imageSet[this.resolveImageIndex(percentage)];
        
        this.img = this.imageCache[path];
    }
}