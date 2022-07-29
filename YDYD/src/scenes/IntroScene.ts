import Phaser from 'phaser';

export default class IntroScene extends Phaser.Scene {
   constructor() {
      super({ key: 'IntroScene' })
   }

   preload() {
   }

   create() {
      let canvasWidth = this.sys.canvas.width;
      let canvasHeight = this.sys.canvas.height;

      this.add.image(canvasWidth / 2, canvasHeight / 2, 'bg-intro');
   }
}