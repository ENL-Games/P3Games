import Phaser from "phaser";

export default class PreLoader extends Phaser.Scene {
   constructor() {
      super(LoadConfig);
   }

   preload() {
      this.load.image('bg-intro', 'assets/bg-intro.png');
   }

   create() {
      this.scene.start('IntroScene');
   }
}

const LoadConfig = {
   key: "PreLoader",
};