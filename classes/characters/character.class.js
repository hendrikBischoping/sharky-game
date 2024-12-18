class Character extends MovableObject {
    x = 15;
    y = 100;
    width = 280;
    height = 320;
    speed = 8;
    imgStay;
    SHARKY_SWIMMING = [                                                               //nach erstem 'super()' reicht für jedes weitere 'super()' ein 'this.'
        './content/Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/1.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/2.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/3.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/4.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/5.png',
        './content/Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/6.png',
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
        './content/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/18.png',
    ];
    currentImage = 0;
    currentImageStay = 0;
    world;

    constructor(){
        super().loadImage('./content/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.SHARKY_SWIMMING);

        this.animate()
        //this.checkPositionX()
    }

    animate(){
        setInterval(() => {
            if(this.world.keyboard.right){
                this.x += this.speed;
                this.otherDirection = false;
                if(this.x >= 2001)
                    {this.x = 2000}
            }
            if (this.world.keyboard.left){
                this.x -= this.speed;
                this.otherDirection = true;
                if(this.x < 1)
                    {this.x = 0}
            }
            if (this.world.keyboard.up){
                this.y -= this.speed;
                if(this.y < -125)
                    {this.y = -126}
            }
            if (this.world.keyboard.down){
                this.y += this.speed;
                if(this.y > 270)
                    {this.y = 270}
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
        
        setInterval(() => {
            if (this.world.keyboard.right || this.world.keyboard.left || this.world.keyboard.up || this.world.keyboard.down) {
               this.playAnimation(this.SHARKY_SWIMMING)
            } else {
                this.playAnimation(this.SHARKY_STAYING)
            }
        }, 140);
    }
    // checkPositionX(){
    //     if (this.x = 1300) {
    //         characterPosition = this.x;
    //         console.log(characterPosition);
            
    //         return {characterPosition}
    //     }
    // }
} 