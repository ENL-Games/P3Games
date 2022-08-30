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

      let txtTitle = this.add.text(canvasWidth / 2, 200, `SLIDING PUZZLE`);
      {
         txtTitle.setOrigin(0.5, 0.5);
         txtTitle.setStyle({
            font: "bold 100px Arial",
         });
         txtTitle.setColor(`#00ff00`);
         txtTitle.setStroke(`#000000`, 4);
      }

      let txtBtn_Start = this.add.text(canvasWidth / 2, canvasHeight - 120, `START`
         // , { fontFamily: 'NanumPen' }
         );
      {
         txtBtn_Start.setOrigin(0.5, 0.5);
         txtBtn_Start.setStyle({
            font: "bold 64px Arial"
         });
         txtBtn_Start.setColor(`#ffff00`);
         txtBtn_Start.setStroke(`#000000`, 2);
         const gradient = txtBtn_Start.context.createLinearGradient(0, 0, 0, txtBtn_Start.height);
         {
            gradient.addColorStop(0, '#ff974b');
            gradient.addColorStop(.5, '#fff435');
            gradient.addColorStop(1, '#ff9543');
         }
         txtBtn_Start.setFill(gradient);

         {
            gradient.addColorStop(0, '#ff974b');
            gradient.addColorStop(.5, '#fff435');
            gradient.addColorStop(1, '#ff9543');
         }

         {//event
            txtBtn_Start.setInteractive().on('pointerover', (pointer, localX, localY) => {
               txtBtn_Start.setScale(1.15, 1.15);
            });//이벤트 처리
            txtBtn_Start.setInteractive().on('pointerout', (pointer, localX, localY) => {
               txtBtn_Start.setScale(1, 1);
            });//이벤트 처리
      
            txtBtn_Start.setInteractive().on('pointerdown', (pointer, localX, localY) => {
               // console.log(`GAME START`);
               this.scene.start(`GameScene`);
            });//이벤트 처리
         }
      }
   }
}