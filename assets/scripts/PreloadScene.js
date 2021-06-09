class PreloadScene extends Phaser.Scene{
    constructor() {
        super('Preload');
       
    }

    preload(){
        
        this.load.image("forest","assets/sprites/ForestRS.png");
        this.load.image("house1","assets/sprites/HouseEDRS.png");
        this.load.image("house2","assets/sprites/House2Bg.png");
        this.load.image("house3","assets/sprites/HouseBsdRS.png");
        this.load.image("basement1","assets/sprites/BasementNoPortalsRS.png");
        this.load.image("basement2","assets/sprites/basementPortalsRS.png");

        this.load.atlas('character','assets/sprites/character.png',"assets/sprites/character.json");
            this.load.image("player","assets/sprites/player.png")
            this.load.image("eyepainting","assets/sprites/EyePainting.png")

            this.load.image("bag","assets/sprites/seedBag.png");
            this.load.image("rabbit","assets/sprites/Rabbit.png");
            this.load.image('card', 'assets/sprites/card.png');

            this.load.image('1card1', 'assets/sprites/card1.png');
            this.load.image('1card2', 'assets/sprites/card2.png');
            this.load.image('1card3', 'assets/sprites/card3.png');
            this.load.image('1card4', 'assets/sprites/card4.png');
            this.load.image('1card5', 'assets/sprites/card5.png');
            this.load.image('1card6', 'assets/sprites/card6.png');

            this.load.image('2card1', 'assets/sprites/2card1.png');
            this.load.image('2card2', 'assets/sprites/2card2.png');
            this.load.image('2card3', 'assets/sprites/2card3.png');
            this.load.image('2card4', 'assets/sprites/2card4.png');
            this.load.image('2card5', 'assets/sprites/2card5.png');
            this.load.image('2card6', 'assets/sprites/2card6.png');

            this.load.image('3card1', 'assets/sprites/3card1.png');
            this.load.image('3card2', 'assets/sprites/3card2.png');
            this.load.image('3card3', 'assets/sprites/3card3.png');
            this.load.image('3card4', 'assets/sprites/3card4.png');
            this.load.image('3card5', 'assets/sprites/3card5.png');
            this.load.image('3card6', 'assets/sprites/3card6.png');

            this.load.image('4card1', 'assets/sprites/4card1.png');
            this.load.image('4card2', 'assets/sprites/4card2.png');
            this.load.image('4card3', 'assets/sprites/4card3.png');
            this.load.image('4card4', 'assets/sprites/4card4.png');
            this.load.image('4card5', 'assets/sprites/4card5.png');
            this.load.image('4card6', 'assets/sprites/4card6.png');



            this.load.audio('theme','assets/sounds/theme.mp3');
            this.load.audio('windowssound','assets/sounds/winxp.mp3');
            this.load.audio('complete','assets/sounds/complete.mp3');
            this.load.audio('success','assets/sounds/success.mp3');
            this.load.audio('card','assets/sounds/card.mp3');
        console.log('preloadAssets');

    }

create(){
   console.log('preload assets done');
   this.scene.start('Start');
}





}
