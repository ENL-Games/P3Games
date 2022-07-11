import Phaser from "phaser";

export default class PreLoader extends Phaser.Scene {
   constructor() {
      super("PreLoader");
   }

   preload() {
      this.load.image("bg-dend", 'assets/bg-dend.png');
      this.load.image("bg-sindo", 'assets/bg-sindo.png');
      this.load.image("bg-taw", 'assets/bg-taw.png');
   }

   create() {
      this.scene.start('GameScene');
   }
}