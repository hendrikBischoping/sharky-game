class World {
    backgrounds = level1.backgrounds;
    barriers = level1.barriers;
    enemies = level1.enemies;
    level = level1;
    character = new Character();
    statusBar = new StatusBar();
    shootableObjects = [];

    canvas;
    ctx;    //definiert die Variable für den Context
    keyboard;  // wird später genauer zugewiesen
    camera_x = 200;

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext("2d"); //implementiert den 2-D-Context ist das canvas
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw(); //führt die funktion 'draw()' von weiter unter aus
        this.setWorld();
        this.run();
    }

    run(){
        let loosesHp = setInterval(()=> {
            this.checkShootObject();
            this.checkCollisions(loosesHp);
        }, 500);
    }

    checkShootObject(){
        if (this.keyboard.b) {
            let bubble = new ShootableObject(this.character.x, this.character.y);
            this.shootableObjects.push(bubble);
        }
    }

    checkCollisions(loosesHp) {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy) && this.character.healthPoints > 0) {
                    this.character.hit(enemy.attackPoints);
                    console.log('Sharky-HP:'+this.character.healthPoints);  
                    this.statusBar.setPercentage(this.character.healthPoints)  
                }                
                this.characterDied(loosesHp)
                });
    }

    characterDied(loosesHp){
        if (this.character.healthPoints <= 0) {
            clearInterval(loosesHp);
            console.log('Sharky died!');
    }
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
        this.ctx.translate(-this.camera_x, 0)
        // Space for fixed objects
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.shootableObjects);

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
        this.flipImage(mo);
        }
            mo.draw(this.ctx);
            mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageback(mo);
        }        
    }

    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0)
        this.ctx.scale(-1, 1);
        mo.x = mo.x *-1
    }

    flipImageback(mo){
        mo.x = mo.x *-1
        this.ctx.restore();
    }
}