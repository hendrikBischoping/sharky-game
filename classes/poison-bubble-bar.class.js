class PoisonBubbleBar extends StatusBar{
    y = 50;
    percentage = 0;

    POISON_BUBBLE_BAR_IMAGES = [
        './content/Alternative Grafiken - Sharkie/4. Marcadores/green/poisoned bubbles/100_ copia 3.png',
        './content/Alternative Grafiken - Sharkie/4. Marcadores/green/poisoned bubbles/80_ copia 2.png',
        './content/Alternative Grafiken - Sharkie/4. Marcadores/green/poisoned bubbles/60_ copia 2.png',
        './content/Alternative Grafiken - Sharkie/4. Marcadores/green/poisoned bubbles/40_ copia 2.png',
        './content/Alternative Grafiken - Sharkie/4. Marcadores/green/poisoned bubbles/20_ copia 3.png',
        './content/Alternative Grafiken - Sharkie/4. Marcadores/green/poisoned bubbles/0_ copia 2.png',
    ]
    constructor(){
        super();
        this.loadImages(this.POISON_BUBBLE_BAR_IMAGES);
        this.x = 20;
        this.y = 75
        this.width = 50;
        this.height = 180;
        this.setPercentage(this.percentage, this.POISON_BUBBLE_BAR_IMAGES);
    }
    
    setPercentage(percentage, imageSet = this.POISON_BUBBLE_BAR_IMAGES){ //imageSet = this.IMAGES setzt "this.IMAGES" als default ein
        this.percentage = percentage;
        if (!imageSet || !Array.isArray(imageSet)) {    //prüft, ob "imageSet" definiert ist
            console.error('Invalid image set:', imageSet); //error falls nicht definiert
            return;
        }
        let path = imageSet[this.resolveImageIndex(percentage)];
        
        this.img = this.imageCache[path];
    }
}