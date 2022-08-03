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

      let txtBtn_Start = this.add.text(canvasWidth / 2, canvasHeight - 120, `START`);
      {
         txtBtn_Start.setOrigin(0.5, 0.5);
         txtBtn_Start.setStyle({
            font: "bold 64px Arial"
         });

         txtBtn_Start.setColor(`#ff0000`);
         {//event
            txtBtn_Start.setInteractive().on('pointerover', (pointer, localX, localY) => {
               txtBtn_Start.setScale(1.15, 1.15);
            });//이벤트 처리
            txtBtn_Start.setInteractive().on('pointerout', (pointer, localX, localY) => {
               txtBtn_Start.setScale(1, 1);
            });//이벤트 처리
      
            txtBtn_Start.setInteractive().on('pointerdown', (pointer, localX, localY) => {
            });//이벤트 처리
         }
      }
   }
}