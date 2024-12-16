class Character extends MovableObject {
    x = 20;
    y = 200;
    width = 280;
    height = 320;
    constructor(){
        super().loadImage('./content/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/1.png')
    }
    
    jump(){
        console.log('jump!');
        
    }
} 