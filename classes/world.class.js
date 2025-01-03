class World {
    backgrounds = level1.backgrounds;
    barriers = level1.barriers;
    enemies = level1.enemies;
    enemy = new Enemy();
    level = level1;
    character = new Character();
    lifeBar = new LifeBar();
    bubbleBar = new BubbleBar();
    movableObject = new MovableObject();
    canShoot = true;
    canSpawn = true;
    bubbleItem = new BubbleItem();
    bubble = new ShootableObject();
    shootableObjects = [];
    bubbleItems = [];

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
        this.spawnBubbleItems();
    }

    run(){
        let loosesHp = setInterval(() => {
            this.checkCharakterCollisions(loosesHp);
        }, 1000);
        let hitEnemy = setInterval(() => {
            this.checkBubbleCollision(hitEnemy);
        }, 1000);
        let collectBubbleItem = setInterval(() => {
            this.checkItemCollisions(collectBubbleItem)
        }, 200)
    }
    spawnBubbleItems(){
            setInterval(() => {
                this.createBubbleItem()
            }, 500);
            
        }

    createShootableObject(){
        if (this.bubbleBar.percentage > 0) {
            this.bubbleBar.percentage -= 10
            console.log("bubbles sind", this.bubbleBar.percentage);
            
            this.canShoot = false;
            let bubble = new ShootableObject(this.character.x, this.character.y);
            this.shootableObjects.push(bubble);
            setTimeout(() => {
                this.canShoot = true;
            }, 500);
        }
    }

    createBubbleItem(){            
            this.canSpawn = false;
            let bubbleItem = new BubbleItem(200, 200);
            this.bubbleItems.push(bubbleItem);
            
            setTimeout(() => {
                this.canSpawn = true;
            }, 500);
    }

    checkCharakterCollisions(loosesHp) {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy) && this.character.healthPoints > 0 && enemy.healthPoints > 0) {                 //!!!!!!!!!!!  
                    this.character.hit(enemy.attackPoints);
                    // console.log(this.lifeBar.percentage);
                    // enemy.hit(this.character.attackPoints);
                    this.lifeBar.setPercentage(this.character.healthPoints)  
                }
                this.characterDied(loosesHp)
            });
    }
    
    checkItemCollisions(collectBubbleItem){
        this.bubbleItems.forEach((obj, index) => {
            if (obj.isColliding(this.character)){
                this.character.bubbles += 10
                if (this.character.bubbles >= 100) {
                    this.character.bubbles = 100
                }
                this.bubbleBar.percentage += 10
                if (this.bubbleBar.percentage >= 100) {
                    this.bubbleBar.percentage = 100
                }
                this.bubbleItems.splice(index, 1);
                this.bubbleBar.setPercentage(this.character.bubbles)
                console.log('Bubbles sine '+this.character.bubbles);
            }
        })
    }    

    checkBubbleCollision(bubble, hitEnemy) {
        this.level.enemies.forEach((enemy) => {
            this.shootableObjects.forEach((bubble) => {
                if (bubble.isColliding(enemy)) {
                    enemy.hit(bubble.attackPoints);
                    console.log('Enemy-HP:', enemy.healthPoints);
                    
                }
            });
            if (enemy.isColliding(bubble) && enemy.healthPoints > 0) {
                enemy.hit(bubble.attackPoints);
                console.log(bubble.x);
            }
        }, 1000);
        this.enemyDied(hitEnemy)
    }

    characterDied(loosesHp){
        if (this.character.healthPoints <= 0) {
            clearInterval(loosesHp);
            console.log('Sharky died!');
        }
    }

    enemyDied(hitEnemy){
        if (this.enemy.healthPoints <= 0) {
            clearInterval(hitEnemy);
            console.log('Enemy died!');
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
        this.addToMap(this.lifeBar);
        this.addToMap(this.bubbleBar);
        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.bubbleItems);
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