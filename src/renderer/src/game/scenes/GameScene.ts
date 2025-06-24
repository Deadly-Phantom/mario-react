// src/game/scenes/GameScene.ts
import { gameStoreActions } from '@renderer/store/useGameStore';
import Phaser from 'phaser';
// Import the actions from our store

export class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private coins!: Phaser.Physics.Arcade.Group; // Add a coins group

  constructor() {
    super('GameScene');
  }

  preload() {
    // Let's create some simple textures for our placeholders
    const graphics = this.make.graphics({ x: 0, y: 0 });

    // Platform texture (a brown rectangle)
    graphics.fillStyle(0x654321, 1);
    graphics.fillRect(0, 0, 128, 32);
    graphics.generateTexture('platform', 128, 32);

    // Player texture (a red square)
    graphics.fillStyle(0xff0000, 1);
    graphics.fillRect(0, 0, 32, 48);
    graphics.generateTexture('player', 32, 48);

    // Coin texture (a yellow circle)
    graphics.fillStyle(0xffff00, 1);
    graphics.fillCircle(12, 12, 12);
    graphics.generateTexture('coin', 24, 24);

    graphics.destroy();
  }

  create() {
    this.add.rectangle(400, 300, 800, 600, 0x87ceeb).setScrollFactor(0);

    this.platforms = this.physics.add.staticGroup();
    // Use our new 'platform' texture
    this.platforms.create(400, 584, 'platform').setScale(6.25, 1).refreshBody(); // Ground
    this.platforms.create(600, 400, 'platform');
    this.platforms.create(50, 250, 'platform');
    this.platforms.create(750, 220, 'platform');

    this.player = this.physics.add.sprite(100, 450, 'player');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    if (this.input.keyboard){
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    // Create a group for coins
    this.coins = this.physics.add.group({
      key: 'coin',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    this.coins.children.iterate((child) => {
      const c = child as Phaser.Physics.Arcade.Sprite;
      c.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      return true;
    });

    // --- Colliders ---
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.coins, this.platforms);

    // Check for player overlap with coins
    this.physics.add.overlap(this.player, this.coins, () => this.collectCoin, undefined, this);

    this.cameras.main.setBounds(0, 0, 800, 600);
    this.physics.world.setBounds(0, 0, 800, 600);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
  }

  // The callback for when a player collects a coin
  private collectCoin(player: Phaser.Types.Physics.Arcade.GameObjectWithBody, coin: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
    const c = coin as Phaser.Physics.Arcade.Sprite;
    c.disableBody(true, true);

    // Use our Zustand action to update the score!
    gameStoreActions.incrementScore(10);

    if (this.coins.countActive(true) === 0) {
      // A new batch of coins to collect
      this.coins.children.iterate((child) => {
        const c = child as Phaser.Physics.Arcade.Sprite;
        c.enableBody(true, c.x, 0, true, true);
        return true;
      });
    }
  }

  update() {
    // ... (the update logic is the same as before)
    if (!this.cursors) return;

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
    } else {
      this.player.setVelocityX(0);
    }
    if (this.cursors.up.isDown && this.player.body?.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}