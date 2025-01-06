class Character extends MovableObject {
    name = 'Sharky';
    x = 0;
    y = -80;
    offsetX = 107;
    offsetY = 49;
    width = 230;
    height = 250;
    hitboxWidth = 61;
    hitboxHeigth = 153;
    speed = 8;
    imgStay;f
    healthPoints = 100;
    attackPoints = 0;
    bubbles = 100;
    poisonBubbles = 0;
    animationRunning = false;


    SHARKY_SWIMMING = [                                                               //nach erstem 'super()' reicht für jedes weitere 'super()' ein 'this.'
        './content/Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/1.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/2.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/3.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/4.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/5.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/6.png'
    ];

    SHARKY_STAYING = [                                                               //nach erstem 'super()' reicht für jedes weitere 'super()' ein 'this.'
        './content/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/1.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/2.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/3.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/4.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/5.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/6.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/7.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/8.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/9.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/10.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/11.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/12.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/13.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/14.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/15.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/16.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/17.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/18.png'
    ];
    POISON_HIT = [
        './content/Alternative Grafiken - Sharkie/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/5.Hurt/1.Poisoned/4.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/5.Hurt/1.Poisoned/5.png'
    ];
    FIN_HIT = [
        './content/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Fin slap/1.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Fin slap/3.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Fin slap/4.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Fin slap/5.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Fin slap/6.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Fin slap/7.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Fin slap/8.png',
    ];
    BLOWS_BUBBLE = [
        './content/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
    ];
    DIES_OF_POISON = [
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00000.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00001.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00002.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00003.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00004.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00005.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00006.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00007.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00008.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00009.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00010.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00011.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00006.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00007.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00008.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00009.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00010.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00011.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00006.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00007.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00008.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00009.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00010.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00011.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00011.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00011.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00011.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00011.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00011.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00011.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00011.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00011.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00011.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00011.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00011.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00011.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00011.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00011.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00011.png',
    ];

    currentImage = 0;
    currentImageStay = 0;
    world;

    constructor(){
        super().loadImage('./content/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.SHARKY_SWIMMING);
        this.loadImages(this.SHARKY_STAYING);
        this.loadImages(this.DIES_OF_POISON);
        this.loadImages(this.POISON_HIT);
        this.loadImages(this.FIN_HIT);
        this.loadImages(this.BLOWS_BUBBLE);

        this.animate()
        this.applyGravity(310)
    }

    animate(){
        setStoppableInterval(() => {
            if(this.world.keyboard.right && this.healthPoints > 0){
                this.x += this.speed;
                this.otherDirection = false;
                if(this.x >= 2001)
                    {this.x = 2000}
            }
            if (this.world.keyboard.left && this.healthPoints > 0){
                this.x -= this.speed;
                this.otherDirection = true;
                if(this.x < 1)
                    {this.x = 0}
            }
            if (this.world.keyboard.up && this.healthPoints > 0){
                this.y -= this.speed;
                if(this.y < -80)
                    {this.y = -81}
            }
            if (this.world.keyboard.down && this.healthPoints > 0){
                this.y += this.speed;
                if(this.y > 310)
                    {this.y = 309}
            }
            if (this.world.keyboard.b && this.world.canShoot && this.healthPoints > 0) {
                this.world.createShootableAir()
                
            }
            if (this.world.keyboard.f && this.world.canShoot && this.healthPoints > 0) {
                this.world.createShootablePoison()
                console.log('poison-bubble');
                
            }
            this.world.camera_x = -this.x;
        }, 1000 / 60)

        this.SHARKY_SWIMMING.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
        
        this.SHARKY_STAYING.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
        
        setStoppableInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.DIES_OF_POISON)
            } else if(this.isHurt()) {
                this.playAnimation(this.POISON_HIT)
            }else if (this.world.keyboard.right || this.world.keyboard.left || this.world.keyboard.up || this.world.keyboard.down) {
               this.playAnimation(this.SHARKY_SWIMMING)
            } else {
                this.playAnimation(this.SHARKY_STAYING)
            }
        }, 140);
    }
}