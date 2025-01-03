class StatusBar extends DrawableObject{
    y;
    percentage;

    setPercentage(percentage, imageSet){ //imageSet = this.IMAGES setzt "this.IMAGES" als default ein
        this.percentage = percentage;
        if (!imageSet || !Array.isArray(imageSet)) {    //prüft, ob "imageSet" definiert ist
            console.error('Invalid image set:', imageSet); //error falls nicht definiert
            return;
        }
        let path = imageSet[this.resolveImageIndex(percentage)];
        
        this.img = this.imageCache[path];
    }

    resolveImageIndex(percentage){
        if (percentage ==100) {
            return 0;
        }else if (percentage >=80) {
            return 1;
        }else if (percentage >=60) {
            return 2;
        }else if (percentage >=40) {
            return 3;
        }else if (percentage >=20) {
            return 4;
        }else {
            return 5;
        }
    }
}