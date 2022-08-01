import Phaser from "phaser";

export default class PreLoader extends Phaser.Scene {
   constructor() {
      super("PreLoader");
   }

   preload() {
      this.load.image('bg-intro', 'assets/bg-intro.png');

      this.load.image('bg-ppt-0', 'assets/bg-ppt-0.png');
      this.load.image('bg-ppt-1', 'assets/bg-ppt-1.png');
      this.load.image('bg-ppt-2', 'assets/bg-ppt-2.png');
      this.load.image('bg-ppt-3', 'assets/bg-ppt-3.png');

      this.load.image('bg-ingame-0', 'assets/bg-ingame-0.png');
      this.load.image('bg-ingame-1', 'assets/bg-ingame-1.png');
      this.load.image('bg-ingame-2', 'assets/bg-ingame-2.png');

      this.load.image('game-dialog-capgirl', 'assets/game-dialog-capgirl.png');
      this.load.image('game-dialog-sister', 'assets/game-dialog-sister.png');
   }

   create() {
      this.scene.start('IntroScene');
   }
}