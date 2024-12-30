class Level {
    enemies;
    barriers;
    backgrounds;

    constructor(enemies, barriers, backgrounds){
        this.enemies = enemies; //level1 erster Array mit allen Gegnern
        this.barriers = barriers;
        this.backgrounds = backgrounds;
    }

    // despawnDeadEnemy(){
    //     for (let i = this.enemies.length - 1; i >= 0; i--) {
    //         if (this.enemies[i].healthpoints <= 0) {
    //             gegnerArray.splice(i, 1); // Element entfernen
    //         }
    //     }
    // }
}