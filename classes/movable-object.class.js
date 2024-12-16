class MovableObject {
    x;
    y;
    img;
    height;
    width;

    loadImage(path) {
        this.img = new Image(); //'Image()' ist bereits vordefiniert von JS
        this.img.src = path;
    }

    moveRight() {
        console.log('Moves right!');
        
    }
    moveLeft(){
        console.log('Moves left!');
    }
}