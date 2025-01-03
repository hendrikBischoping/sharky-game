class CollectableItem extends MovableObject {
    bubbleBar = new BubbleBar();

    checkItemCollision(){
        this.bubbleItems.forEach((bubble) => {
            console.log(x);
            
            if (this.character.isColliding(bubble)){
                this.bubbleBar.percentage += 10
                console.log(this.bubbleBar.percentage+"% Bubbles");
                
            }
        })
    }
}