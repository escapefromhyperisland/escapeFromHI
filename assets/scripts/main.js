




let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scene: [BootScene,PreloadScene,StartScene,GameScene,ForestScene,HouseScene1, HouseScene2,HouseScene3,BasementScene1,BasementScene2,FinalScene],
    "physics": {default: "arcade"},
    rows:1,
    cols: 6,
    cards: [1, 2, 3, 4, 5, 6],
   
   
};
let game = new Phaser.Game(config);

