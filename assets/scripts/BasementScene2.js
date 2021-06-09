class BasementScene2 extends Phaser.Scene {
    constructor(){
        super("Basement2")
    }
   

    
    
    mind = {};

     

createSubtitle(subtitleText){
this.subtitle = this.add.text(config.width/2,(config.height/10)+150, subtitleText,
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
Dialogue(subText,playerText){
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

createPlayerSub(playerSubText,paddingLeft){
console.log("playersub-appear");
this.playerSub = this.add.text(this.fPlayer.x+paddingLeft,this.fPlayer.y-50, playerSubText,
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
      
       this.createCards();
       this.createPlayer();
        this.createArrows();
        this.createObjects();
        this.createPhysics();
        this.createSounds();
        
        console.log("basement2 loaded");
        
    }

   
    createBackground(){
        this.cameras.main.backgroundColor.setTo(255,255,255);
         
        this.add.sprite(0,0,"basement1").setOrigin(0, 0);
    }
    createCards(){
      
        this.cards =[];
        let positions = this.getCardsPositions();
        let level = 4;
        

   

 for (let value of config.cards) {
    
        this.cards.push(new Card(this, value, positions.pop(),level));
    
} 
this.input.on("gameobjectdown",this.onCardClicked, this);
    }  
    
    init(data)
    {
        console.log('init', data);
        this.mind = data.mind;
    }

onCardClicked(pointer, card) {
this.mind.quiz4 = card.value;

console.log(this.mind);

this.cards.forEach(card=>{
  card.destroyCards();
}) 

this.scene.start('Final',{mind:this.mind}); 

this.hideSubtitle();





}

    createPlayer(){
        let  player = this.add.sprite(0,480,"character","char1").setOrigin(0,0).setScale(2.5);
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
       let seedBag = this.add.sprite(-1650,(config.height/2)-100,"eyepainting").setOrigin(0,0).setScale(0.3);
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
            y: 350
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
        this.fSeedBag.destroy();
        
        alert("You pushed object on house2")
         this.createCards(); 
         this.createSubtitle("You can choose only one tree! Which do you like the most?");
         
        
    }

    update() {
        //MOVEMENT
            if(this.cursors.right.isDown){
            this.fPlayer.x +=4;
            this.fPlayer.anims.play('walk',true);
            }
            else if (this.cursors.left.isDown){
                this.fPlayer.x -=3	
                this.fPlayer.anims.play('walk',true);
                ;} 
                else {this.fPlayer.anims.stop();};

                if(this.fPlayer.x>=1200){
                    //!launching next scene, pushing Mind parameters
                    this.scene.start('Final',{mind:this.mind});  
                }
                if(this.fPlayer.x==4){
                    this.createSubtitle('Choose the portal and click on it! ')
                    alert('You found the portal room and realized that this is your chance. Your chance to ESCAPE FROM HIgh tech simulation. The only question is where do you want to go? you decide.')
                    
                    
                    this.fPlayer.x +=1;
                 
                    
                      
                }
            }
                
        }