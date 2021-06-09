class FinalScene extends Phaser.Scene {
    constructor(){
        super("Final")
    }
   

    
    
    mind = {};

     

createSubtitle(subtitleText){
this.subtitle = this.add.text(config.width/2,config.height/10, subtitleText,
{
font:"25px",
fill: "#000",
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
this.subtitle.setOrigin(0.5,1);
this.subtitle.setAlpha(1);


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
        setTimeout(() => alert("Congratulations! you have completed the simulation. As a reward I'll tell you what kind of person you are"), 500)
        setTimeout(() =>  this.finalResult(), 1000);

        
        console.log(this.mind);
        this.createBackground(); 
        this.createEnd();
        this.createObjects();
        this.createSounds();    
    }

    finalResult(){

            const tree1 = "You are a confident person. You are firmly on your feet, but it is not particularly important for you to understand the world around you. In doing so, you accept him as he is. Plus, you are a good friend, you care about other people. Also loyal and reliable. You often forget about yourself, but never about others!"
    const tree2 = "You are a determined person. Love to participate in new projects and in all endeavors. Moreover, you are not afraid of problems, you are not afraid of the unknown. Plus, you can participate in several projects, you like new experiences and new knowledge."
    const tree3 ="You are a dreamer, love to talk about the meaning of life. However, you are a sensitive person. You also like to make decisions on your own. Do not like advice and imposed opinions. You have tremendous inner strength that helps you guess the right decisions. But be careful in your dreams!"
    const tree4 ="You are an independent person. It is difficult for you to stay in one place, and it is also boring for you to be in the same job. Do you love to travel. Even if you do not have such an opportunity yet, you want to learn a lot of new things, enrich your life with new impressions. You also love to read and really relax with a good movie."
    const tree5 ="You combine originality, vulnerability and strength of nature. That being said, you are an incredibly honest person. Plus, you believe in true love, you are ready to look for it at least your whole life. Very romantic nature."
    const tree6 ="You are a loner. Love very much that everything would be your way. You don't need society, friends. You are your own best friend. Enjoy the loneliness. And also successful people inspire you!"

    const animal1="You are very patient. You also have so much inner strength that you can calm anyone. At the same time, the people who pointed to the picture of the Bear are brave. If you are a mother or are just planning to become one, then your choice characterizes the qualities of a wonderful mother. As you know, cubs are with their mother for a long time. At the same time, she is not only caring, but also helps her children develop."
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

            if (this.mind.quiz1 = 1){confirm(`${tree1} Is it Correct?`)}
            else if (this.mind.quiz1 = 2){confirm(`${tree2} Is it Correct?`)}
            else if (this.mind.quiz1 = 3){confirm(`${tree3} Is it Correct?`)}
            else if (this.mind.quiz1 = 4){confirm(`${tree4} Is it Correct?`)}
            else if (this.mind.quiz1 = 5){confirm(`${tree5} Is it Correct?`)}
            else if (this.mind.quiz1 = 6){confirm(`${tree6} Is it Correct?`)}

            if (this.mind.quiz2 = 1){confirm(`${animal1} Is it Correct?`)}
            else if (this.mind.quiz2 = 2){confirm(`${animal2} Is it Correct?`)}
            else if (this.mind.quiz2 = 3){confirm(`${animal3} Is it Correct?`)}
            else if (this.mind.quiz2 = 4){confirm(`${animal4} Is it Correct?`)}
            else if (this.mind.quiz2 = 5){confirm(`${animal5} Is it Correct?`)}
            else if (this.mind.quiz2 = 6){confirm(`${animal6} Is it Correct?`)}

            if (this.mind.quiz3 = 1){confirm(`${eye1} Is it Correct?`)}
            else if (this.mind.quiz3 = 2){confirm(`${eye2} Is it Correct?`)}
            else if (this.mind.quiz3 = 3){confirm(`${eye3} Is it Correct?`)}
            else if (this.mind.quiz3 = 4){confirm(`${eye4} Is it Correct?`)}
            else if (this.mind.quiz3 = 5){confirm(`${eye5} Is it Correct?`)}
            else if (this.mind.quiz3 = 6){confirm(`${eye6} Is it Correct?`)}

            if (this.mind.quiz4 = 1){confirm(`${portal1} Is it Correct?`)}
            else if (this.mind.quiz4 = 2){confirm(`${portal2} Is it Correct?`)}
            else if (this.mind.quiz4 = 3){confirm(`${portal3} Is it Correct?`)}
            else if (this.mind.quiz4 = 4){confirm(`${portal4} Is it Correct?`)}
            else if (this.mind.quiz4 = 5){confirm(`${portal5} Is it Correct?`)}
            else if (this.mind.quiz4 = 6){confirm(`${portal6} Is it Correct?`)}

            alert("Thank you for playing the game!")
        }
    createBackground(){
        this.cameras.main.backgroundColor.setTo(255,255,255);
        /* this.add.sprite(0,0,"bg").setOrigin(0, 0); */
         
        /* this.add.sprite(0,0,"basement1").setOrigin(0, 0); */
    }
    
    init(data)
    {
        console.log('init', data);
        this.mind = data.mind;
    }



    createEnd() {
    
   
        this.startButton = this.add.text(config.width/2,config.height/2,'THE END',{
            font:'40px',
            fill:"#000"
        });
        this.startButton.setOrigin(0.6,0);
    }
   
setEvents(){
    this.input.on("pointerdown", ()=>window.parent.postMessage('nextLevel'))
}
   

    createObjects(){
       let seedBag = this.add.sprite(-1650,(config.height/2)-100,"eyepainting").setOrigin(0,0).setScale(0.3);
       this.fSeedBag= seedBag;
       
    }
   



  



  

   
                
        }
