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

      let title = this.add.text(canvasWidth / 2, 200, `영도 2072`);
      {
         title.setOrigin(0.5, 0.5);
         title.setStroke(`#000000`, 8);
         title.setColor(`#00ff00`);
         title.setStyle({
            font: "bold 100px Arial"
         });
      }
   }
}