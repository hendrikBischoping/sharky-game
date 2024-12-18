class World {
    backgrounds = level1.backgrounds;
    barriers = level1.barriers;
    enemies = level1.enemies;
    character = new Character();

    canvas;
    ctx;    //definiert die Variable für den Context
    keyboard;  // wird später genauer zugewiesen
    camera_x = 0;

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext("2d"); //implementiert den 2-D-Context ist das canvas
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw(); //führt die funktion 'draw()' von weiter unter aus
        this.setWorld();
    }

    setWorld(){
        this.character.world = this; // übergibt den Wert der Welt (in welcher sich "character" befindet, an "character", um auf dieser Ebene auf Informationen aus "world" zugreifen zu können, wie zb. "keyboard")
    }

    draw(){        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // löscht dein vormaligen Inhalt (frame/Bild) des Canvas, bevor der neue Inhalt geladen wird

        this.ctx.translate(this.camera_x, 0)

        this.addObjectsToMap(this.backgrounds);
        this.addObjectsToMap(this.barriers);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);

        this.ctx.translate(-this.camera_x, 0)

        let self = this;
        requestAnimationFrame(function() {  //läd die Funktion "draw()" relativ zur Leistung der Grafikkarte neu (FPS)
            self.draw(); // funktionen innerhalb von methoden kennen kein "this" mehr, daher "let self = this"
        });
    }

    addObjectsToMap(objects){
        objects.forEach(object => {
            this.addToMap(object)
        });
    }

    addToMap(mo){
         if (mo.otherDirection) {
             this.ctx.save();
             this.ctx.translate(mo.width, 0)
             this.ctx.scale(-1, 1);
             mo.x = mo.x *-1
         }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.height, mo.width)
         if (mo.otherDirection) {
             mo.x = mo.x *-1
             this.ctx.restore();
         }
    }


}