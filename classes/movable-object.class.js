class MovableObject {
    x;
    y;
    img;
    height;
    width;
    imageCache = {};
    imageCacheStay = {};
    speed;
    otherDirection = false;

    loadImage(path) {
        this.img = new Image(); //'Image()' ist bereits vordefiniert von JS
        this.img.src = path;
    }

    loadImages(arr){                // läd alle Bilder in den Chache (Object)
        arr.forEach((path) => {                     // Funktion von ChatGPT erklären lassen
            let img = new Image()
        img.src = path;
        this.imageCache[path] = img;
        })
    }
        
    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        console.log('Moves right!');
        
    }
    moveLeft(){
        console.log('Moves left!');
    }
}