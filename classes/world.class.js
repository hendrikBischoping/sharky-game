class World {
    canvas;
    ctx;
    keyboard;
    camera_x = 200;
    backgrounds = level1.backgrounds;
    barriers = level1.barriers;
    enemies = level1.enemies;
    endboss = level1.endboss;
    level = level1;
    movableObject = new MovableObject();
    character = new Character();
    enemy = new Enemy();
    lifeBar = new LifeBar();
    bossBar = new BossBar();
    bubbleBar = new BubbleBar();
    poisonBubbleBar = new PoisonBubbleBar();
    canShoot = true;
    canSpawn = true;
    dropIndex = 1;
    gameScreens = [];
    shootableAirBubbles = [];
    shootablePoisonBubbles = [];
    heartItems = [];
    bubbleItems = [];
    poisonBubbleItems = [];
    underWaterAudio = new Audio('content/Sounds/underWater.mp3');
    bubbleShootAudio = new Audio('content/Sounds/bubbleshoot.mp3');
    bubbleKillAudio = new Audio('content/Sounds/bubblekill.mp3');
    bossHurtAudio = new Audio('content/Sounds/bossHurt.mp3');
    sharkyHurtAudio = new Audio('content/Sounds/sharkyHurt.mp3');
    bossSpawnAudio = new Audio('content/Sounds/bossSpawnt.mp3');
    itemCollectAudio = new Audio('content/Sounds/itemCollect.mp3');
    youWinAudio = new Audio('content/Sounds/youWin.mp3');
    gameOverAudio = new Audio('content/Sounds/gameOver.mp3');
    bossAttackAudio = new Audio('content/Sounds/bossAttack.mp3');

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.spawnBubbleItems();
        this.gameStarted = false;
    }

    /** intervals thas observes their depenting status */
    run(){
        let loosesHp = setStoppableInterval(() => {
            this.checkCharakterCollisions(loosesHp);
        }, 1000);
        setStoppableInterval(() => {
            this.checkAirBubbleCollision();
        }, 100);
        setStoppableInterval(() => {
            this.checkPoisonBubbleCollision();
        }, 100);
        setStoppableInterval(() => {
            this.checkBubbleItemCollisions();
        }, 200);
        setStoppableInterval(() => {
             this.checkForEndbossSpawn()
        }, 200);
    }
    
    /** returns a boolean-value depening on local storage to set/unset mute */
    getIsMuted() {
        return JSON.parse(localStorage.getItem("isMuted"));
    }

    /** creates a bubble-item every 500ms */
    spawnBubbleItems(){
        setStoppableInterval(() => {
                this.createBubbleItem();
            }, 500);
            
    }

    /** checks if any bubble item collides with Sharky so Sharky can collect it */
    checkBubbleItemCollisions(){
        this.bubbleItems.forEach((item, index) => {
            if (item.isColliding(this.character) && this.character.bubbles < 100 && this.bubbleBar.percentage < 100){
                if (!this.getIsMuted()) {
                    this.itemCollectAudio.play();
                }
                this.character.bubbles += 20
                this.bubbleBar.percentage += 20
                this.bubbleItems.splice(index, 1);
                this.bubbleBar.setPercentage(this.bubbleBar.percentage)
            }
        })
        if (!this.getIsMuted()) {
            this.underWaterAudio.play();
        }
    }

    /** checks if any poison item collides with Sharky so Sharky can collect it */
    checkPoisonBubbleItemCollisions(){
        this.poisonBubbleItems.forEach((item, index) => {
            if (item.isColliding(this.character) && this.character.poisonBubbles < 100 && this.poisonBubbleBar.percentage < 100){
                if (!this.getIsMuted()) {
                    this.itemCollectAudio.play();
                }
                this.character.poisonBubbles += 20
                this.poisonBubbleBar.percentage += 20
                this.poisonBubbleItems.splice(index, 1);
                this.poisonBubbleBar.setPercentage(this.poisonBubbleBar.percentage)
            }
        })
    }

    /** checks if any heart item collides with Sharky so Sharky can collect it */
    checkHeartItemCollisions(){
        this.heartItems.forEach((item, index) => {
            if (item.isColliding(this.character) && this.character.healthPoints < 100 && this.lifeBar.percentage < 100){
                if (!this.getIsMuted()) {
                    this.itemCollectAudio.play();
                }
                this.character.healthPoints += 20
                this.lifeBar.percentage += 20
                this.heartItems.splice(index, 1);
                this.lifeBar.setPercentage(this.lifeBar.percentage)
            }
        })
    }

    /** plays bubble shoot audio depending on mute */
    checkBubbleShootAudio() {
        if (!this.getIsMuted()) {
            this.bubbleShootAudio.play();             
        }
    }

    /** creates an air bubble in front of sharky and recalculates remaining shootable bubbles and bubble bar */
    createShootableAir(){
        if (this.bubbleBar.percentage > 0) {
            this.bubbleBar.percentage -= 20;
            this.character.bubbles -= 20;
            this.bubbleBar.setPercentage(this.bubbleBar.percentage);
            this.canShoot = false;
            let bubble = new ShootableAir(this.character.x, this.character.y);
            this.shootableAirBubbles.push(bubble);
            this.checkBubbleShootAudio();
            setStoppableTimeout(() => {
                this.canShoot = true;
            }, 500);
        }
    }

    /** creates a poison bubble in front of sharky and recalculates remaining shootable poison bubbles and poison bubble bar */
    createShootablePoison(){
        if (this.poisonBubbleBar.percentage > 0) {
            this.poisonBubbleBar.percentage -= 20;
            this.character.poisonBubbles -= 20;
            this.poisonBubbleBar.setPercentage(this.poisonBubbleBar.percentage);
            this.canShoot = false;
            let poisonBubble = new ShootablePoison(this.character.x, this.character.y);
            this.shootablePoisonBubbles.push(poisonBubble);
            if (!this.getIsMuted()) {
                this.bubbleShootAudio.play();
            }
            setStoppableTimeout(() => {
                this.canShoot = true;
            }, 500);
        }
    }

    /** creates a new bubble item every 100 ms */
    createBubbleItem(){            
            this.canSpawn = false;
            let bubbleItem = new BubbleItem(200, 200);
            this.bubbleItems.push(bubbleItem);
            setStoppableTimeout(() => {
                this.canSpawn = true;
            }, 100);
    }

    /**
     * randomises the dropped item when enemy dies (10% no item)
     * @param {object} enemy - every enemy that got killed by sharky (except endboss)
     */
    createRandomItem(enemy){
        let randomChoice = Math.random();
        if (randomChoice <= 0.4) {
            this.createHeartItem(enemy);
        }
        if(randomChoice >= 0.5) {
            this.createPoisonItem(enemy);
        }
    }
    
    /**
     * lets an enemy drop a heart item
     * @param {object} enemy - every enemy that got killed by sharky (except endboss)
     */
    createHeartItem(enemy) {
        let heartItem = new HeartItem(enemy.x, enemy.y);
        this.heartItems.push(heartItem);
        setStoppableInterval(() => {
            this.checkHeartItemCollisions()
        }, 200);
    }

    /**
     * lets an enemy drop a poison item 
     * @param {object} enemy - every enemy that got killed by sharky (except endboss)
     */
    createPoisonItem(enemy){
        let poisonItem = new PoisonItem(enemy.x, enemy.y);
        this.poisonBubbleItems.push(poisonItem);
        setStoppableInterval(() => {
        this.checkPoisonBubbleItemCollisions()
        }, 200);
    }

    /** checks if any enemy is colliding with a shot air bubble */
    checkAirBubbleCollision() {
        for (let i = this.level.enemies.length - 1; i >= 0; i--) {
            let enemy = this.level.enemies[i];
            for (let j = this.shootableAirBubbles.length - 1; j >= 0; j--) {
                let currentBubble = this.shootableAirBubbles[j];
                if (currentBubble.isColliding(enemy)) {
                    if (enemy.endboss && !this.getIsMuted()) {
                        this.bossHurtAudio.play();
                    }
                    let ap = currentBubble.attackPoints;
                    enemy.hit(ap);                  
                    this.updateEndbossBar(enemy, ap);
                    this.despawnFloatingObjects(this.shootableAirBubbles, currentBubble, j, currentBubble.y);
                }
            }
            this.enemyDied(enemy, i);
        }
    }

    /** checks if endboss is colliding with a shot poison bubble */
    checkPoisonBubbleCollision() {
        for (let i = this.level.enemies.length - 1; i >= 0; i--) {
            let enemy = this.level.enemies[i];
            for (let j = this.shootablePoisonBubbles.length - 1; j >= 0; j--) {
                let currentBubble = this.shootablePoisonBubbles[j];
                if (currentBubble.isColliding(enemy) && enemy.endboss) {
                    if (!this.getIsMuted()) {
                        this.bossHurtAudio.play();
                    }
                    let ap = currentBubble.attackPoints;
                    enemy.hit(ap);
                    this.updateEndbossBar(enemy,ap);
                    this.despawnFloatingObjects(this.shootablePoisonBubbles, currentBubble, j, currentBubble.y);
                }
            }
            this.enemyDied(enemy, i);
        }
    }

    /** spawns endboss depending on Sharkies x-coordinate (x >= 1400) */
    checkForEndbossSpawn() {
            if (this.character.x >= 1400 && !enemies.endbossSpawned) {
                if (!this.getIsMuted()) {
                    this.bossSpawnAudio.play();
                }
                    this.enemies.push(new Endboss)
                enemies.endbossSpawned = true;
                setTimeout(() => {
                    this.gameOver()
                    document.getElementById('endbossAway').classList.remove('d_none')
                }, 22000);
            }
    }

    /**
     * renders boss bar frame depending on endboss health points
     * @param {array} enemy - contains all enemies of level 1
     * @param {*} ap - attackpoints of sharkies poison bubbles
     */
    updateEndbossBar(enemy, ap){
        if (enemy.endboss){
            this.bossBar.percentage -= ap/5;
            this.bossBar.setPercentage(this.bossBar.percentage)
        }
    }
    
    /**
     * checks if any enemy has died to trigger another Function depending on enemy-type
     * @param {array} enemy - contains all enemies of level 1
     * @param {*} index - individual index of the depending enemy to splice it at a certant level
     */
    enemyDied(enemy, index){
        if (enemy.healthPoints <= 0 && !enemy.itemSpawned && !enemy.endboss) {
            if (!this.getIsMuted()) {
                this.bubbleKillAudio.play();
            }
            this.createRandomItem(enemy)
            enemy.itemSpawned = true;
        }
        if (enemy.healthPoints <= 0) {
            this.despawnFloatingObjects(this.level.enemies, enemy, index, -100);
        }
        if (enemy.healthPoints <= 0 && enemy.endboss) {
            this.youWon();
        }
    }

    /** stops the game and renders 'winner screen' */
    youWon(){
        setStoppableInterval(() => {
            showWinnerScreen();
            stopGame();
        }, 1000);
    }

    /**
     * checks Sharkies life-status depending on health points
     * @param {number} loosesHp - amount of health points sharky lost by a hit
     */
    characterDied(loosesHp){
        if (this.character.healthPoints <= 0) {            
            this.gameOver();
            clearInterval(loosesHp);
        }
    }
    
    /** stops the game and renders 'game-over screen' */
    gameOver(){
        setStoppableInterval(() => {
            showGameOverScreen();
            stopGame();
            this.gameOver = true;
        }, 1000);
    }

    /**
     * checks if Sharky is colliding with any enemy to trigger depending functions
     * @param {number} loosesHp - amount of health points sharky lost by a hit
     */
    checkCharakterCollisions(loosesHp) {
            this.level.enemies.forEach((enemy) => {
                if (this.character.sharkyIsColliding(enemy) && this.character.healthPoints > 0 && enemy.healthPoints > 0) {
                    if (!this.getIsMuted()) {
                        this.sharkyHurtAudio.play();
                    }
                    this.character.hit(enemy.attackPoints);
                    this.lifeBar.setPercentage(this.character.healthPoints)                    
                } 
                else {this.characterDied(loosesHp)}  
            });
    }

    /**
     * despawns (splices) floating objects like dead enemies as soon as they leave the window
     * @param {array} objArr - contains all enemies of level 1
     * @param {object} obj - single enemy that got killed
     * @param {number} index - individual index of the depending enemy to splice it at a certant level
     * @param {number} value - value of the increasing y-coordinate of a dead enemy
     */
    despawnFloatingObjects(objArr, obj, index, value){
        if (obj.y <= value) {
            objArr.splice(index, 1)
        }
        if (obj.healthPoints<= 0) {
            this.dropIndex = 1;
        }
    }
    
    /** implements a world-object into Sharky */
    setWorld(){
        this.character.world = this;
    }

    /** draws static content into Canvas (like backgrounds and status bars) */
    drawStaticContent(){
        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.backgrounds);
        this.addObjectsToMap(this.barriers);
        this.ctx.translate(-this.camera_x, 0)
        this.addToMap(this.lifeBar);
        this.addToMap(this.bubbleBar);
        this.addToMap(this.poisonBubbleBar);
        if (enemies.endbossSpawned) {
            this.addToMap(this.bossBar);
        }
    }

    /** draws dynamic content into Canvas (all movable objects) */
    drawDynamicContent(){
        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.bubbleItems);
        this.addObjectsToMap(this.poisonBubbleItems);
        this.addObjectsToMap(this.heartItems);
        this.addObjectsToMap(this.shootableAirBubbles);
        this.addObjectsToMap(this.shootablePoisonBubbles);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0)
    }

    /** contains functions to draws whole content into Canvas */
    draw(){        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawStaticContent();
        this.drawDynamicContent();
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    /**
     * supportive function to draw multiple onjects into canvas
     * @param {array} objects - array of all different objects that need to be added into the canvas
     */
    addObjectsToMap(objects){
        objects.forEach(object => {
            this.addToMap(object)
        });
    }
    
    /**
     * supportive function to draw a single object into canvas
     * @param {object} mo - a single objects that need to be added into the canvas
     */
    addToMap(mo){
        if (mo.otherDirection) {
        this.flipImage(mo);
        }
            mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageback(mo);
        }        
    }

    /**
     * mirrors images (when Sharky changes swim direction)
     * @param {object} mo - any movable object that can change its direction
     */
    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0)
        this.ctx.scale(-1, 1);
        mo.x = mo.x *-1
    }
    
    /**
     * mirrors images back into default (when Sharky changes swim direction again)
     * @param {object} mo - any movable object that can change its direction
     */
    flipImageback(mo){
        mo.x = mo.x *-1
        this.ctx.restore();
    }    
}