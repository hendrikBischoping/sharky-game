class Enemy extends MovableObject {
    constructor(){
        super();
    }
    
    raise(){
        setStoppableInterval(() => {{
                this.y -=1
                this.x *=0.9999999
            }
        }, 1000 / 25);
    }
}