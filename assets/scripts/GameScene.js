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
           theme : this.sound.add('theme'),
           windowssound: this.sound.add('windowssound')
            };

          /*   this.sounds.theme.play({
                volume: 0.05
            }); */
            
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

  this.sounds.complete.play();

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



/* cardInterpretations(){
    const tree1 = "You are a confident person. You are firmly on your feet, but it is not particularly important for you to understand the world around you. In doing so, you accept him as he is. Plus, you are a good friend, you care about other people. Also loyal and reliable. You often forget about yourself, but never about others!"
    const tree2 = "You are a determined person. Love to participate in new projects and in all endeavors. Moreover, you are not afraid of problems, you are not afraid of the unknown. Plus, you can participate in several projects, you like new experiences and new knowledge."
    const tree3 ="You are a dreamer, love to talk about the meaning of life. However, you are a sensitive person. You also like to make decisions on your own. Do not like advice and imposed opinions. You have tremendous inner strength that helps you guess the right decisions. But be careful in your dreams!"
    const tree4 ="You are an independent person. It is difficult for you to stay in one place, and it is also boring for you to be in the same job. Do you love to travel. Even if you do not have such an opportunity yet, you want to learn a lot of new things, enrich your life with new impressions. You also love to read and really relax with a good movie."
    const tree5 ="You combine originality, vulnerability and strength of nature. That being said, you are an incredibly honest person. Plus, you believe in true love, you are ready to look for it at least your whole life. Very romantic nature."
    const tree6 ="You are a loner. Love very much that everything would be your way. You don't need society, friends. You are your own best friend. Enjoy the loneliness. And also successful people inspire you!"

    const animal1="If you have chosen a bear, then you are very patient. You also have so much inner strength that you can calm anyone. At the same time, the people who pointed to the picture of the Bear are brave. If you are a mother or are just planning to become one, then your choice characterizes the qualities of a wonderful mother. As you know, cubs are with their mother for a long time. At the same time, she is not only caring, but also helps her children develop."
    const animal2="Нou are an optimistic and radiant person. You are able to give hope to others, help with advice or action. You also love change. Able to step out of their comfort zone when needed."
    const animal3="You are a self-sufficient person, with your own opinion and vision of the situation. You will not follow the crowd, your opinion can overpower the opinion of others. That being said, you have a wonderful intuition. Even manifestations of hidden abilities are possible."
    const animal4="Decent people, not capable of a mean act. Usually quiet, often in the shade. However, they will start to show activity if they meet with a competitor. At the same time, they love fair fights, fair victories."
    const animal5="You are a rational person. Also, you are not used to listening to your heart. At the same time, you make decisions, carefully considering and weighing everything. Emotional manifestations of yourself are alien to you."
    const animal6="You are a purposeful and strong-willed person, you like to set goals and follow them. at the same time, you are a freedom-loving person who loves travel, impressions. have an impressive inner strength."


    const eye1="You are open to everything new! You love acquaintances, but it is desirable that people themselves come into your life. However, you are not ready to share thoughts and ideas with them. Together with this, they are always able to come to the rescue. You also love various innovations, changes in life. At the same time, you are happy with the new experience and circumstances, no matter what!"
    const eye2="You are more of an introvert. They are ready to spend a lot of time alone. At the same time, you like to analyze different things, cause and effect. You are one of those people who think and analyze a lot. However, do not rush to share your views and discoveries."
    const eye3="You definitely love to stand out from the crowd! You are eccentric, and do not hide it! At the same time, your thoughts and actions are rarely similar to those around you. However, their opinion does not really bother you."
    const eye4="You can rightfully be called a secretive person. At the same time, you are not constant, others do not know “what you will throw out this time”. You are either not accepted or accepted as you are. At the same time, they do not understand yourself. However, they are in no hurry to trust you."
    const eye5="You can be called an emotional person. At the same time, you are acutely reacting to the reality around you. You can openly express your dissatisfaction or aggression without hiding your emotions. Tears are a common way of letting go for you."
    const eye6="You often look back at the past. Although you accept it, trusting people is still difficult for you! But you are a rather decisive person, you are good at solving problems and current tasks!"

    const portal1="You are a self-confident person, self-sufficient, with dignity. You are not specifically looking for love and friends. But at the same time, many people respect you, they are inspired by your example. You are also uncompromising and freedom-loving! Along with this, you are hardworking and persistent, your life is successful or close to it!"
    const portal2="You are a calm nature. Love the silence and loneliness! Love to be silent more than to speak. At the same time, we are ready to give advice and listen if necessary. Your help is appreciated, it always comes in handy. You feel comfortable in the company of friends and acquaintances. You are distinguished from others by your intelligence and sense of tact."
    const portal3="You can be called a person with a smile on your face. You are optimistic, full of strength and energy. You know that life needs to be appreciated, you take everything to the maximum. Love new knowledge, acquaintances. You are tolerant of other people's shortcomings. Trouble does not upset you, healthy competition is also about you. We are ready to admit our mistakes, enjoy life!"
    const portal4="Spontaneous and fickle person. Your mood often changes, in just a few minutes. You are a real rebel, your life is interesting and unpredictable. Your charisma, self-confidence attracts people. It is difficult to keep up with you, from this you become an even more interesting person."
    const portal5="You do not like complexity, you live a built life. You like consistency and serenity. Someone may call your life boring, but absolutely everything suits you. Why “complicate”? You value security and stability, and you won't trade it for any good."
    const portal6="You are a loner. Don't like to trust people. You have a few friends and you have enough. You don't like getting to know each other. You love minimalism and simplicity. Also, the inner world of a person is important to you. At the same time, how a person is dressed, what is rich in the material world is not important to you. Enjoy spending time in seclusion, devoting it to thoughts. The opinion of close people is important to you, but the rest are not interested."
} */

       







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



