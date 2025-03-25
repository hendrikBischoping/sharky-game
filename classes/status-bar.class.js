class StatusBar extends DrawableObject{
    y;
    percentage;

    /**
     * renders any status bar depenting on its status percentage (life bar depenting on health points)
     * @param {number} percentage - available healthpoints or items in percent
     * @param {object} imageSet - image of status-bar relative to percentage
     * @returns - stops function in case of error
     */
    setPercentage(percentage, imageSet){
        this.percentage = percentage;
        if (!imageSet || !Array.isArray(imageSet)) {
            console.error('Invalid image set:', imageSet);
            return;
        }
        let path = imageSet[this.resolveImageIndex(percentage)];
        this.img = this.imageCache[path];
    }

    /**
     * chooses the return value depenting on its status percentage
     * @param {number} percentage - available healthpoints or items in percent
     * @returns the value that leads to the depending image of status-bar
     */
    resolveImageIndex(percentage){
        if (percentage >=100) {
            return 0;
        }else if (percentage >=75) {
            return 1;
        }else if (percentage >=50) {
            return 2;
        }else if (percentage >=25) {
            return 3;
        }else if (percentage >0) {
            return 4;
        }else {
            return 5;
        }
    }
}