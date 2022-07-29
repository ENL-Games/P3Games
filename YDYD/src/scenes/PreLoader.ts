import Phaser from "phaser";

export default class PreLoader extends Phaser.Scene {
   constructor() {
      super("PreLoader");
   }

   preload() {
      this.load.image('bg-intro', 'assets/bg-intro.png');
   }

   create() {
      this.scene.start('IntroScene');
   }
}