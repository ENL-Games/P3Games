import Phaser from "phaser";

export default class PreLoader extends Phaser.Scene {
   constructor() {
      super("PreLoader");
   }

   preload() {
      this.load.image('block-boss', 'assets/block-boss.png');
      this.load.image('block-boss-cracked', 'assets/block-boss-cracked.png');
      this.load.image('block-cat', 'assets/block-cat.png');
      this.load.image('block-cat-cracked', 'assets/block-cat-cracked.png');
      this.load.image('block-gob', 'assets/block-gob.png');
      this.load.image('block-boss-cracked', 'assets/block-boss-cracked.png');
   }

   create() {
      this.scene.start('IntroScene');
   }
}