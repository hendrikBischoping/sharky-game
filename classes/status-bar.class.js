class StatusBar extends DrawableObject {
    x = 10;
    y = 10;
    width = 50;
    height = 100
    percentage = 100;

    IMAGES = [
        './content/Alternative Grafiken - Sharkie/4. Marcadores/green/Life/100_  copia 2.png',
        './content/Alternative Grafiken - Sharkie/4. Marcadores/green/Life/80_  copia 3.png',
        './content/Alternative Grafiken - Sharkie/4. Marcadores/green/Life/60_  copia 3.png',
        './content/Alternative Grafiken - Sharkie/4. Marcadores/green/Life/40_  copia 3.png',
        './content/Alternative Grafiken - Sharkie/4. Marcadores/green/Life/20_ copia 4.png',
        './content/Alternative Grafiken - Sharkie/4. Marcadores/green/Life/0_  copia 3.png'
    ];


    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
        this.x = 20;
        this.y = 0;
        this.width = 50;
        this.height = 180;
        this.setPercentage(100);
    }

    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];

    }

    resolveImageIndex(){
        if (this.percentage ==100) {
            return 0;
        }else if (this.percentage >=80) {
            return 1;
        }else if (this.percentage >=60) {
            return 2;
        }else if (this.percentage >=40) {
            return 3;
        }else if (this.percentage >=20) {
            return 4;
        }else {
            return 5;
        }
    }
}