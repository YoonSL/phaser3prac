class scene1 extends Phaser.Scene {
  constructor() {
    super({ key: "scene1" });
  }

  init() {}

  preload() {
    this.load.image("ground", "../assets/ground.png");
    this.load.image("bomb", "../assets/bomb.png");
    this.load.spritesheet("dude", "../assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });
  }

  create() {
    this.score = 0;
    this.ground = this.physics.add.staticGroup();
    this.bombs = this.physics.add.group();
    this.bombs.enableBody = true;
    this.bombs.physicsBodyType = Phaser.Physics.ARCADE;
    this.bombs.createMultiple(5, "bomb");

    // this.bombs.scale.setAll(scale.x, 0.5);
    // this.bombs.scale.setAll("scale.y", 0.5);

    // this.bombs.setAll("outOfBoundsKill", true);
    // this.bombs.setAll("checkWorldBounds", true);

    this.ground
      .create(400, 563, "ground")
      .setScale(2.22, 1)
      .refreshBody();
    this.ground.create(630, 400, "ground");
    this.ground.create(150, 250, "ground");
    this.ground.create(750, 220, "ground");

    this.player = this.physics.add.sprite(100, 450, "dude");
    this.player.setCollideWorldBounds(true);
    // player.body.setGravityY(300);

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
    this.scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "#000"
    });
    this.cursors = this.input.keyboard.createCursorKeys();
    this.controls = {
      space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    };
    this.stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });

    // this.stars.children.iterate(function(child) {
    //   child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    // });

    this.physics.add.collider(this.player, this.ground);
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      null,
      this
    );
    this.physics.add.collider(this.stars, this.ground);
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);

      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play("turn");
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }

    if (this.controls.space.isDown) {
      this.shootBomb();
    }

    if (checkOverlap(this.bombs, this.stars)) {
      this.stars.kill();
    }
  }

  collectStar(player, star) {
    star.disableBody(true, true);

    this.score += 10;
    this.scoreText.setText("Score: " + this.score);
  }

  shootBomb() {
    if (this.time.now > this.shootTime) {
      bomb = bomb.getFirstExists(false);
      if (bomb) {
        this.bomb.rest(this.player.x, player.y);
        this.bomb.body.velocity.x = 300;

        this.shootTime = this.time.now + 900;
      }
    }
  }
}

//game.add.tileSprite(0,0,800,600,'starfield');
// this.ground.anchor.setTo(0.5, 0.5);
// this.ground.x = 560;
// this.ground.scale.setTo(-1, 1);
// this.ground.angle = 60;
// ground.anchor.setTo(0.5, 0.5);
// ground2.body.immovable = true;
// ground2.body.allowGravity = false;
//this.physics.add.existing(ground, true);
// this.add.sprite(400, 563, "ground").setScale(2.22, 1);
// ground = this.physics.add.staticGroup();
// ground2 = this.physics.add.staticGroup();
