var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: 0x8cd3ff,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 200
      }
    }
  },
  scene: [scene1]
};

var game = new Phaser.Game(config);
