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

      let txtTitle = this.add.text(canvasWidth / 2, 200, `터치 터치`);
      {
         txtTitle.setOrigin(0.5, 0.5);
         txtTitle.setStyle({
            font: "bold 150px Arial"
         });

         txtTitle.setColor(`#00ff00`);
      }
   }
}