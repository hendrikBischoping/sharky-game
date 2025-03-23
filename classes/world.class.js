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

    toggleMute() {
        this.isMuted = !this.isMuted;
        this.allAudios.forEach(audio => {
            audio.volume = isMuted ? 0 : 1;
        });
    }

    spawnBubbleItems(){
        setStoppableInterval(() => {
                this.createBubbleItem();
            }, 500);
            
    }

    checkBubbleItemCollisions(){
        this.bubbleItems.forEach((item, index) => {
            if (item.isColliding(this.character) && this.character.bubbles < 100 && this.bubbleBar.percentage < 100){
                if (!this.isMuted) {
                    this.itemCollectAudio.play();
                }
                this.character.bubbles += 20
                this.bubbleBar.percentage += 20
                this.bubbleItems.splice(index, 1);
                this.bubbleBar.setPercentage(this.bubbleBar.percentage)
            }
        })
        if (!isMuted) {
            this.underWaterAudio.play();
        }
    }

    checkPoisonBubbleItemCollisions(){
        this.poisonBubbleItems.forEach((item, index) => {
            if (item.isColliding(this.character) && this.character.poisonBubbles < 100 && this.poisonBubbleBar.percentage < 100){
                if (!this.isMuted) {
                    this.itemCollectAudio.play();
                }
                this.character.poisonBubbles += 20
                this.poisonBubbleBar.percentage += 20
                this.poisonBubbleItems.splice(index, 1);
                this.poisonBubbleBar.setPercentage(this.poisonBubbleBar.percentage)
            }
        })
    }

    checkHeartItemCollisions(){
        this.heartItems.forEach((item, index) => {
            if (item.isColliding(this.character) && this.character.healthPoints < 100 && this.lifeBar.percentage < 100){
                if (!this.isMuted) {
                    this.itemCollectAudio.play();
                }
                this.character.healthPoints += 20
                this.lifeBar.percentage += 20
                this.heartItems.splice(index, 1);
                this.lifeBar.setPercentage(this.lifeBar.percentage)
            }
        })
    }

    createShootableAir(){
        if (this.bubbleBar.percentage > 0) {
            this.bubbleBar.percentage -= 20;
            this.character.bubbles -= 20;
            this.bubbleBar.setPercentage(this.bubbleBar.percentage);
            this.canShoot = false;
            let bubble = new ShootableAir(this.character.x, this.character.y);
            this.shootableAirBubbles.push(bubble);
            if (!this.isMuted) {
                this.bubbleShootAudio.play();
            }
            setStoppableTimeout(() => {
                this.canShoot = true;
            }, 500);
        }
    }

    createShootablePoison(){
        if (this.poisonBubbleBar.percentage > 0) {
            this.poisonBubbleBar.percentage -= 20;
            this.character.poisonBubbles -= 20;
            this.poisonBubbleBar.setPercentage(this.poisonBubbleBar.percentage);
            this.canShoot = false;
            let poisonBubble = new ShootablePoison(this.character.x, this.character.y);
            this.shootablePoisonBubbles.push(poisonBubble);
            if (!this.isMuted) {
                this.bubbleShootAudio.play();
            }
            setStoppableTimeout(() => {
                this.canShoot = true;
            }, 500);
        }
    }

    createBubbleItem(){            
            this.canSpawn = false;
            let bubbleItem = new BubbleItem(200, 200);
            this.bubbleItems.push(bubbleItem);
            setStoppableTimeout(() => {
                this.canSpawn = true;
            }, 100);
    }

    createRandomItem(enemy){
        let randomChoice = Math.random();
        if (randomChoice <= 0.4) {
            this.createHeartItem(enemy);
        }
        if(randomChoice >= 0.5) {
            this.createPoisonItem(enemy);
        }
    }
    
    createHeartItem(enemy) {
        let heartItem = new HeartItem(enemy.x, enemy.y);
        this.heartItems.push(heartItem);
        setStoppableInterval(() => {
            this.checkHeartItemCollisions()
        }, 200);
    }

    createPoisonItem(enemy){
        let poisonItem = new PoisonItem(enemy.x, enemy.y);
        this.poisonBubbleItems.push(poisonItem);
        setStoppableInterval(() => {
        this.checkPoisonBubbleItemCollisions()
        }, 200);
    }

    checkAirBubbleCollision() {
        for (let i = this.level.enemies.length - 1; i >= 0; i--) {
            let enemy = this.level.enemies[i];
            for (let j = this.shootableAirBubbles.length - 1; j >= 0; j--) {
                let currentBubble = this.shootableAirBubbles[j];
                if (currentBubble.isColliding(enemy)) {
                    if (enemy.endboss && !this.isMuted) {
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

    checkPoisonBubbleCollision() {
        for (let i = this.level.enemies.length - 1; i >= 0; i--) {
            let enemy = this.level.enemies[i];
            for (let j = this.shootablePoisonBubbles.length - 1; j >= 0; j--) {
                let currentBubble = this.shootablePoisonBubbles[j];
                if (currentBubble.isColliding(enemy) && enemy.endboss) {
                    if (!this.isMuted) {
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

    checkForEndbossSpawn() {
            if (this.character.x >= 1400 && !enemies.endbossSpawned) {
                if (!this.isMuted) {
                    this.bossSpawnAudio.play();
                }
                    this.enemies.push(new Endboss)
                enemies.endbossSpawned = true;
            }
    }

    updateEndbossBar(enemy, ap){
        if (enemy.endboss){
            this.bossBar.percentage -= ap/5;
            this.bossBar.setPercentage(this.bossBar.percentage)
        }
    }
    
    enemyDied(enemy, index){
        if (enemy.healthPoints <= 0 && !enemy.itemSpawned && !enemy.endboss) {
            if (!this.isMuted) {
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

    youWon(){
        setStoppableInterval(() => {
            showWinnerScreen();
            stopGame();
        }, 1000);
    }

    characterDied(loosesHp){
        if (this.character.healthPoints <= 0) {            
            this.gameOver();
            clearInterval(loosesHp);
        }
    }
    
    gameOver(){
        setStoppableInterval(() => {
            showGameOverScreen();
            stopGame();
            this.gameOver = true;
        }, 1000);
    }

    checkCharakterCollisions(loosesHp) {
            this.level.enemies.forEach((enemy) => {
                if (this.character.sharkyIsColliding(enemy) && this.character.healthPoints > 0 && enemy.healthPoints > 0) {
                    if (!this.isMuted) {
                        this.sharkyHurtAudio.play();
                    }
                    this.character.hit(enemy.attackPoints);
                    this.lifeBar.setPercentage(this.character.healthPoints)                    
                } 
                else {this.characterDied(loosesHp)}  
            });
    }

    despawnFloatingObjects(objArr, obj, index, value){
        if (obj.y <= value) {
            objArr.splice(index, 1)
        }
        if (obj.healthPoints<= 0) {
            this.dropIndex = 1;
        }
    }
    
    setWorld(){
        this.character.world = this;
    }

    draw(){        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.backgrounds);
        this.addObjectsToMap(this.barriers);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0)
        this.addToMap(this.lifeBar);
        this.addToMap(this.bubbleBar);
        this.addToMap(this.poisonBubbleBar);
        if (enemies.endbossSpawned) {
            this.addToMap(this.bossBar);
        }
        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.bubbleItems);
        this.addObjectsToMap(this.poisonBubbleItems);
        this.addObjectsToMap(this.heartItems);
        this.addObjectsToMap(this.shootableAirBubbles);
        this.addObjectsToMap(this.shootablePoisonBubbles);
        this.ctx.translate(-this.camera_x, 0)
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
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
            // mo.drawFrame(this.ctx);

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