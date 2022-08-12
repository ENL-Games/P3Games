import Phaser from 'phaser';

export default class GameHUD extends Phaser.Scene {
   
   _text_Time!: Phaser.GameObjects.Text;
   _text_Score!: Phaser.GameObjects.Text;

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
   }
}