class ForestScene extends Phaser.Scene{
    constructor() {
        super('Forest');
        
    }

    
    createSounds() {
        this.sounds = {
        card : this.sound.add('card'),
        success : this.sound.add('success'),
        complete : this.sound.add('complete'),
       theme : this.sound.add('theme'),
       windowssound: this.sound.add('windowssound')
        };}

        createPlayerSub(playerSubText,paddingRight){
            console.log("playersub-appear");
            this.playerSub = this.add.text(this.fPlayer.x-paddingRight,this.fPlayer.y-50, playerSubText,
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
create(){
    
    this.createBackground()
            this.createPlayer();
            this.createArrows();
            this.createObjects();
            this.createPhysics();
            
            this.createSounds();
            console.log('forest loaded')
}
createBackground(){
    this.add.sprite(0,0,"forest").setOrigin(0, 0);
}


createCards(){
    this.cards =[];
    let positions = this.getCardsPositions();
    let level = 2;
    
for (let value of config.cards) {
    

    this.cards.push(new Card(this, value, positions.pop(),level));

} 
this.input.on("gameobjectdown",this.onCardClicked, this);
}  


onCardClicked(pointer, card) {
    this.mind.quiz2 = card.value;
  
  console.log(this.mind);
  
    this.cards.forEach(card=>{
        card.destroyCards();
    }) ;
  
    this.sounds.complete.play();
    this.createPlayerSub('Maybe I should check the house ',400)
   
  
    
    
      
      
     
  }

createPlayer(){
    let  player = this.add.sprite(0,600,"character","char1").setOrigin(0,0).setScale(2.2);;
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
   });}

createArrows(){
    this.cursors = this.input.keyboard.createCursorKeys();
}

createObjects(){
   /* let seedBag = this.add.sprite(950,555,"rabbit").setOrigin(0,0);
   this.fSeedBag= seedBag; */
   let seedBag = this.add.sprite(1000,650,"rabbit").setOrigin(0,0);
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

init(data)
{
    console.log('init', data);
    this.mind = data.mind;
}
hidePlayerSub(){
    this.playerSub.setAlpha(0);
    } 
hit(){
    this.fSeedBag.x = -100;
    alert('This cute little rabbit reminded you of your childhood then you sometimes dreamed of being an animal. You have found yourself wondering what kind of animal you would like to become')
     this.createCards(); 
     this.sounds.card.play();
     this.hidePlayerSub();
    
}
//!update method
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

            if(this.fPlayer.x>=1100){
                //!launching next scene, pushing Mind parameters
                
                this.scene.start('House1',{mind:this.mind});  
            }
            if(this.fPlayer.x==200){
               this.createPlayerSub("Aww. A house with two little rabbits! Cute!",1)
                this.fPlayer.x +=1;
              
                /* this.Dialogue("Subtitle","Plsyersub"); */
                  
            }
            
    }
}