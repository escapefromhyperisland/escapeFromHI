
class Card extends Phaser.GameObjects.Sprite {
    constructor(scene,value,position,level) {
        super(scene, position.x, position.y, level + 'card' + value);
        this.scene = scene;
        this.value = value;
        this.level = level;
        this.scene.add.existing(this);
        this.setInteractive();
       
        
        
    }
     destroyCards(){
        this.scene.tweens.add({
            targets:this,
            scaleX: 0,
            ease: 'Linear',
            duration:300
             
        

        })
    }  
       
}