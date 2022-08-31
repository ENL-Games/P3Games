import Phaser from "phaser";

export default class PreLoader extends Phaser.Scene {
   constructor() {
      super(LoadConfig);
   }

   preload() {
      this.load.image('bg-intro', 'assets/bg-intro.png');

      this.load.image('bg-game', 'assets/bg-game.png');
      this.load.image('yd-kkang', 'assets/yd-kkang.png');
   }

   create() {
      this.scene.start('IntroScene');
   }
}

const LoadConfig = {
   key: "PreLoader",
};