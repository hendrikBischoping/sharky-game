class World {
    backgrounds = [
        new BackgroundObject('./content/Alternative Grafiken - Sharkie/3. Background/Layers/5. Water/L.png', 0, 0, 0.01),
        new BackgroundObject('./content/Alternative Grafiken - Sharkie/3. Background/Layers/4.Fondo 2/L.png', 0, 0, 0.02),
        new BackgroundObject('./content/Alternative Grafiken - Sharkie/3. Background/Layers/3.Fondo 1/L.png', 0, 0, 0.03),
        new BackgroundObject('./content/Alternative Grafiken - Sharkie/3. Background/Layers/2. Floor/D.png', 0, 0, 0.04),
        new BackgroundObject('./content/Alternative Grafiken - Sharkie/3. Background/Layers/1. Light/COMPLETO.png', 0, 0, 0.035),
    ];
    barriers = [
        new BarrierOne()
    ]
    character = new Character();
    enemies = [
        new PufferFish(),
        new PufferFish(),
        new PufferFish(),
        new JellyFish(),
        new JellyFish(),
        new JellyFish(),
    ];

    canvas;
    ctx;    //definiert die Variable für den Context
    keyboard;  // wird später genauer zugewiesen

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
        this.addObjectsToMap(this.backgrounds);
        this.addObjectsToMap(this.barriers);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);

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

    addToMap(mo){                   //           !!           Spiegelung des Bildes führt zu freeze. 'SHARK_STAYING' verantwortlich?
        // if (mo.otherDirection) {
        //     this.ctx.save();
        //     this.ctx.translate(mo.width, 0)
        //     this.ctx.scale(-1, 1);
        //     mo.x = mo.x *-1
        // }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.height, mo.width)
        // if (mo.otherDirection) {
        //     mo.x = mo.x *-1
        //     this.cts.restore();
        // }
    }


}