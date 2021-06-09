class BootScene extends Phaser.Scene{
    constructor() {
        super('Boot');
        
    }

    preload(){
        this.load.image('bg','assets/sprites/windows.png');
    }

create(){
    this.add.sprite(0,0,"bg").setOrigin(0, 0);
    console.log("booted")
    this.scene.start('Preload');
   
}




}