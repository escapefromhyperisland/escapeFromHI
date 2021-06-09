class StartScene extends Phaser.Scene{
    constructor() {
        super('Start');
        
    }

    

create(){
    console.log('StartScene loaded');
    this.createBackground();
    this.createStart();
    this.setEvents();
    
  
}
createBackground(){
    this.add.sprite(0,0,"bg").setOrigin(0, 0);
}

createStart() {
    
   
    this.startButton = this.add.text(config.width/2,config.height/2,'Tap to start',{
        font:'40px',
        fill:"#ffffff"
    });
    this.startButton.setOrigin(0.6,0);
}


setEvents(){
    this.input.on("pointerdown", ()=>this.scene.start('Game'))
}

}
