import Phaser from "phaser";

export default class PreLoader extends Phaser.Scene {
   constructor() {
      super(LoadConfig);
   }

   preload() {
      this.load.image('bg-intro', 'assets/bg-intro.png');

      this.load.image('bg-game', 'assets/bg-game.png');

      this.load.image('yd-kkang', 'assets/yd-kkang.png');
      this.load.spritesheet('puzzle-kkang', 'assets/yd-kkang.png', { frameWidth: 150, frameHeight: 150 });
   }

   create() {
      this.scene.start(
         'IntroScene'
         // 'GameScene'
         );
   }
}

const LoadConfig = {
   key: "PreLoader",
};