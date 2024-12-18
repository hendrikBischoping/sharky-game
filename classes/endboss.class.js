class Endboss extends MovableObject {
    ENDBOSS_SWIMMING = [
        'content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/1.png',
        'content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/2.png',
        'content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/3.png',
        'content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/4.png',
        'content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/5.png',
        'content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/6.png',
        'content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/7.png',
        'content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/8.png',
        'content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/9.png',
        'content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/10.png',
        'content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/11.png',
        'content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/12.png',
        'content/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/13.png'
    ];

    constructor(){
        super().loadImage(this.ENDBOSS_SWIMMING[0]);
        this.loadImages(this.ENDBOSS_SWIMMING);
    }
}