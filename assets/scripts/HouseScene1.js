class HouseScene1 extends Phaser.Scene {
    constructor(){
        super("House1")
    }
   

    
    
    mind = {};

     

createSubtitle(subtitleText){
this.subtitle = this.add.text(config.width/2,config.height/10, subtitleText,
{
font:"25px",
fill: "#ffffff",
stroke:"#000",

strokeThickness: 3,
align: "center",
padding: 10,
border:100,
wordwrap: {
width: config.width,
useAdvancedWrap: true
}
});

/*  this.time.addEvent({ delay: 2000, callback: this.hideSubtitle, callbackScope: this }); */
this.subtitle.setOrigin(0.5,1);
this.subtitle.setAlpha(1);


}
/* Dialogue(subText,playerText){
this.createSubtitle(subText);

this.time.addEvent({ 
    delay: 2000, 
    callback: this.hideSubtitle,
    callbackScope: this
     });

     setTimeout(() => this.createPlayerSub(playerText), 500)


this.time.addEvent({ 
    delay: 1000, 
    callback: this.hidePlayerSub, 
    callbackScope: this 
});





}
 */
createPlayerSub(playerSubText){
console.log("playersub-appear");
this.playerSub = this.add.text(this.fPlayer.x,this.fPlayer.y-50, playerSubText,
    {
        font:"25px",
    fill: "#ffffff",
    stroke:"#000",
    
    strokeThickness: 3,
    align: "center",
    padding: 10,
    border:100,
    wordwrap: {
        width: config.width,
    useAdvancedWrap: true
    }
    
});this.playerSub.setAlpha(1);

}
/* hidePlayerSub(){
this.playerSub.setAlpha(0);
} */

hideSubtitle() {
 this.subtitle.setAlpha(0);
 //while 
}


    createSounds() {
        this.sounds = {
        card : this.sound.add('card'),
        success : this.sound.add('success'),
        complete : this.sound.add('complete'),
       theme : this.sound.add('theme'),
       windowssound: this.sound.add('windowssound')
        };

      /*   this.sounds.theme.play({
            volume: 0.05
        }); */
        
    }
   
    create(){
        
        this.createBackground(); 
        this.createPlayer();
       
        this.createArrows();
        this.createObjects();
        this.createPhysics();
        this.createSounds();
        
        console.log("house1 loaded");
    }
    init(data)
    {
        console.log('init', data);
        this.mind = data.mind;
    }
   
    createBackground(){
        this.cameras.main.backgroundColor.setTo(255,255,255);
         
        this.add.sprite(0,0,"house1").setOrigin(0, 0);
    }

    createPlayer(){
        let  player = this.add.sprite(0,580,"character","char1").setOrigin(0,0).setScale(2.5);
        this.fPlayer = player ;
       const frames = this.anims.generateFrameNames('character',{
           prefix: 'char',
           start: 1,
           end: 8 
       });

       this.fPlayer.anims.create({
           key: 'walk',
           frames,
           frameRate: 10,
           repeat: -1
       });
       
       
       

    }
   

    createArrows(){
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    createObjects(){
       let seedBag = this.add.sprite(-100,580,"bag").setOrigin(0,0);
       this.fSeedBag= seedBag;
    }
//! cards
getCardsPositions() {
let positions = [];
let cardTexture = this.textures.get('card').getSourceImage();
let cardWidth = cardTexture.width + 4;
let cardHeight = cardTexture.height + 4;
let offsetX = (this.sys.game.config.width - cardWidth * config.cols) / 2 + cardWidth/2;
let offsetY = (this.sys.game.config.height - cardHeight * config.rows)/2 + cardHeight/2;

for (let row = 0; row < config.rows; row++) {
    for (let col = 0; col < config.cols; col++) {
        positions.push({
            x: offsetX + col * cardWidth,
            y: offsetY + row * cardHeight,
        });
    }
}

return positions;
}




  
//!add physics
    createPhysics(){
        this.physics.add.existing(this.fPlayer);
    this.physics.add.existing(this.fSeedBag);
    this.physics.add.overlap(this.fPlayer,this.fSeedBag,this.hit,null, this);
    }



    hit(){
        this.fSeedBag.x = -100;
        
        alert("You have found bunch of seedbags! On each of them there is a label with a picture of a tree. choose the one you want to plant.Ok?")
         this.createCards(); 
         this.createSubtitle("You can choose only one tree! Which do you like the most?");
         
        
    }

    update() {
        //MOVEMENT
            if(this.cursors.right.isDown){
            this.fPlayer.x +=5;
         
            this.fPlayer.anims.play('walk',true);
            }
            else if (this.cursors.left.isDown){
                this.fPlayer.x -=3	
                this.fPlayer.anims.play('walk',true);
                ;} 
                else {this.fPlayer.anims.stop();};

                if(this.fPlayer.x>=1279){
                    //!launching next scene, pushing Mind parameters
                    this.scene.start('House2',{mind:this.mind});  
                }
                if(this.fPlayer.x==200){
                    console.log("200")
                    this.createPlayerSub("Nothing here! I think I can just walk through")
                    this.fPlayer.x +=1;
                 
                    
                      
                }
                
        }

        

}
