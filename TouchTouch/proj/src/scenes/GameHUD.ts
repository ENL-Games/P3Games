import Phaser from 'phaser';

export default class GameHUD extends Phaser.Scene {
   
   _text_Time!: Phaser.GameObjects.Text;
   _text_Score!: Phaser.GameObjects.Text;

   _curtain_OX!: Phaser.GameObjects.Rectangle;
   _img_OO!: Phaser.GameObjects.Image;
   _img_XX!: Phaser.GameObjects.Image;

   constructor() {
      super({ key: 'GameHUD' });
   }

   preload() {}

   create() {
      let canvasWidth = this.sys.canvas.width;
      let canvasHeight = this.sys.canvas.height;

      this._text_Time = this.add.text(canvasWidth / 2, 52, `0`);
      {
         this._text_Time.setOrigin(0.5, 0.5);
         this._text_Time.setStyle({
            font: "bold 40px Arial",
         });
         this._text_Time.setColor(`#00ff00`);
      }

      this._text_Score = this.add.text(canvasWidth / 2, 118, `SCORE: ${0}`);
      {
         this._text_Score.setOrigin(0.5, 0.5);
         this._text_Score.setStyle({
            font: "bold 32px Arial",
         });
      }

      this._curtain_OX = this.add.rectangle(canvasWidth / 2, canvasHeight / 2, canvasWidth, canvasHeight
         , 0x000000);
      {
         this._curtain_OX.setAlpha(0.3);

         this._curtain_OX.setInteractive().on('pointerdown', (pointer, localX, localY) => {
            // console.log("예외처리");
         });//이벤트 처리

         // curtain.setVisible(false);
      }

      this._img_OO = this.add.image(canvasWidth / 2, canvasHeight / 2, `ui-oo`);
      this._img_XX = this.add.image(canvasWidth / 2, canvasHeight / 2, `ui-xx`);
      {
         this._img_OO.setVisible(false);
         this._img_XX.setVisible(false);
      }
   }
}