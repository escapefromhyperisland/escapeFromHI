class GameScene extends Phaser.Scene {
        constructor(){
            super("Game")
        }
       

        
        
        mind = {
            
        };

         /* fadePicture() {

            this.scene.tweens.add({
                targets:this,
                scaleX: 0,
                ease: 'Linear',
                duration:300
                 
            
    
            })
        
        } */

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
hidePlayerSub(){
    this.playerSub.setAlpha(0);
} 

hideSubtitle() {
     this.subtitle.setAlpha(0);
     //while 
}


        createSounds() {
            this.sounds = {
            card : this.sound.add('card'),
            success : this.sound.add('success'),
            complete : this.sound.add('complete'),
           street : this.sound.add('street'),
           windowssound: this.sound.add('windowssound')
            };

          /*  this.sounds.street.play({
                volume: 0.5
            });  */
            
        }
       
        create(){
            setTimeout(() => alert("After a shot of the vaccine, you passed out and woke up in a world strangely reminiscent of a windows desktop. You suspect that your mind has fallen into a simulation, displaced from the body by the soulless mind of the microchip.No matter what, you are still alive, which means that the machine needs you for some reason..."), 500)
            this.createBackground(); 
            this.createPlayer();
            
            this.createArrows();
            this.createObjects();
            this.createPhysics();
            this.createSounds();
            this.sounds.windowssound.play();
            console.log("gamescene loaded");
        }

        createText(){
             this.add.text(10,330,"LOL",{
                 font:"36px",
                 fill: "#ffffff"
             });
        }

        createCards(){
            this.sounds.card.play();
            this.cards =[];
            let positions = this.getCardsPositions();
            let level =1;
            

       

     for (let value of config.cards) {
        
            this.cards.push(new Card(this, value, positions.pop(),level));
        
    } 
    this.input.on("gameobjectdown",this.onCardClicked, this);
        }  
        
       
onCardClicked(pointer, card) {
  this.mind.quiz1 = card.value;

console.log(this.mind);

  this.cards.forEach(card=>{
      card.destroyCards();
  }) 

  this.sounds.card.play();

  this.hideSubtitle();
  this.createSubtitle("Hmmm. Interesting choice. Now you should go this way =>>");
  
    
    
   
}
         
/* cardRemove(card){
    card.destroyCards();
} */
        createBackground(){
            this.cameras.main.backgroundColor.setTo(255,255,255);
             
            this.add.sprite(0,0,"bg").setOrigin(0, 0);
        }

        createPlayer(){
            let  player = this.add.sprite(0,580,"character","char1").setOrigin(0,0);
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
           let seedBag = this.add.sprite(1000,580,"bag").setOrigin(0,0);
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
            this.hidePlayerSub();
            alert("You have found bunch of seedbags! On each of them there is a label with a picture of a tree. choose the one you want to plant.Ok?")
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

                    if(this.fPlayer.x>=1279){
                        //!launching next scene, pushing Mind parameters
                        this.scene.start('Forest',{mind:this.mind});  
                    }
                    if(this.fPlayer.x==200){
                        console.log('200');
                        this.fPlayer.x +=1;
                       
                       /*  this.createSubtitle("reached x=200");
                        this.createPlayerSub("TESTTESTTEST"); */
                        this.createPlayerSub("Damn Bill Gates! I hope this world is not running on Vista")
                          
                    }
                   
                    
                    
            }

      
           

}



