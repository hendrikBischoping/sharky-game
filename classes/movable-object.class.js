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
        

    moveRight() {
        console.log('Moves right!');
        
    }
    moveLeft(){
        console.log('Moves left!');
    }
}