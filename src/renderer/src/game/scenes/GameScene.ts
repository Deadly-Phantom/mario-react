// src/game/scenes/GameScene.ts
import { gameStoreActions } from '@renderer/store/useGameStore';
import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private coins!: Phaser.Physics.Arcade.Group;

  constructor() {
    super('GameScene');
  }

  preload() {
    // --- LOAD LOCAL ASSETS ---
    this.load.image('sky', '/assets/background.png');
    this.load.image('platform', '/assets/platform.png');
    this.load.image('coin', '/assets/coin.png');

    // Make sure 'player_sheet.png' is the EXACT filename in your public/assets folder!
    this.load.spritesheet('player', '/assets/player_sheet.png', {
      frameWidth: 72,
      frameHeight: 97,
    });
  }

  create() {
    // --- WORLD & CAMERA ---
    this.add.image(0, 0, 'sky').setOrigin(0, 0);

    // --- PLATFORMS ---
    this.platforms = this.physics.add.staticGroup();
    const ground = this.platforms.create(400, 568, 'platform') as Phaser.Physics.Arcade.Sprite;
    ground.setScale(2).refreshBody();

    this.platforms.create(600, 400, 'platform');
    this.platforms.create(50, 250, 'platform');
    this.platforms.create(750, 220, 'platform');

    // --- PLAYER ---
    // FIX: Add the 4th argument '3' to start the player on the 'idle' frame.
    this.player = this.physics.add.sprite(100, 450, 'player', 3);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.player.setScale(0.75);
    this.player.body?.setSize(this.player.width * 0.5, this.player.height * 0.9);

    // --- ANIMATIONS ---
    // FIX: Check if the 'walk' animation already exists before creating.
    // This helps prevent errors during hot-reloading.
    if (!this.anims.exists('walk')) {
      this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1,
      });
    }
    if (!this.anims.exists('idle')) {
      this.anims.create({
        key: 'idle',
        frames: [{ key: 'player', frame: 3 }],
        frameRate: 20,
      });
    }

    // --- COINS ---
    this.coins = this.physics.add.group({
      key: 'coin',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });
    this.coins.children.iterate((c) => {
      const child = c as Phaser.Physics.Arcade.Sprite;
      // FIX: Scale the coins to make them smaller.
      child.setScale(0.5);
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      return true;
    });

    // --- INPUT & COLLIDERS ---
    if (this.input.keyboard) {
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.coins, this.platforms);
    this.physics.add.overlap(this.player, this.coins, ()=>this.collectCoin, undefined, this);
  }

  // No changes needed in this function
  private collectCoin(_player: Phaser.Types.Physics.Arcade.GameObjectWithBody, coin: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
    const c = coin as Phaser.Physics.Arcade.Sprite;
    c.disableBody(true, true);
    gameStoreActions.incrementScore(10);
    if (this.coins.countActive(true) === 0) {
      this.coins.children.iterate((child) => {
        const c = child as Phaser.Physics.Arcade.Sprite;
        c.enableBody(true, c.x, 0, true, true);
        return true;
      });
    }
  }

  update() {
    // FIX: Add a guard clause to ensure player and its body/animations are ready.
    if (!this.cursors || !this.player?.body) {
      return;
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('walk', true);
      this.player.setFlipX(true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('walk', true);
      this.player.setFlipX(false);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('idle', true);
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}